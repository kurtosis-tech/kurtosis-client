package bulk_command_execution

import (
	"encoding/json"
	"github.com/kurtosis-tech/kurtosis-client/golang/bulk_command_execution/v0_bulk_command_api"
	"github.com/palantir/stacktrace"
)

type deserializableBulkCommandsDocument struct {
	SchemaVersion SchemaVersion   `json:"schemaVersion"`
	BodyBytes     json.RawMessage `json:"body"`
}

type BulkCommandProcessor struct {
	v0CommandsVisitor v0_bulk_command_api.V0BulkCommandVisitor
}
func NewBulkCommandProcessor(v0CommandsVisitor v0_bulk_command_api.V0BulkCommandVisitor) *BulkCommandProcessor {
	return &BulkCommandProcessor{v0CommandsVisitor: v0CommandsVisitor}
}

func (processor BulkCommandProcessor) Process(serialized []byte) error {
	bulkCommandsDocument := new(deserializableBulkCommandsDocument)
	if err := json.Unmarshal(serialized, &bulkCommandsDocument); err != nil {
		return stacktrace.Propagate(err, "An error occurred deserializing the serialized bulk command bytes to check the schema version")
	}
	switch bulkCommandsDocument.SchemaVersion {
	case V0:
		if err := v0_bulk_command_api.Process(bulkCommandsDocument.BodyBytes, processor.v0CommandsVisitor); err != nil {
			return stacktrace.Propagate(err, "An error occurred processing the v%v commands", bulkCommandsDocument.SchemaVersion)
		}
	default:
		return stacktrace.NewError("Unrecognized schema version '%v'", bulkCommandsDocument.SchemaVersion)
	}
	return nil
}
