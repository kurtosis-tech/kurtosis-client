package bulk_command_execution

import (
	"encoding/json"
	"github.com/kurtosis-tech/kurtosis-client/golang/bulk_command_execution/v0_bulk_command_api"
	"github.com/palantir/stacktrace"
)

const (
	latestSchemaVersion = V0
)

type SerializableBulkCommandsDocument struct {
	SchemaVersion SchemaVersion	`json:"schemaVersion"`
	Body	interface{}			`json:"body"`
}

type BulkCommandSerializer struct {}

func NewBulkCommandSerializer() *BulkCommandSerializer {
	return &BulkCommandSerializer{}
}

func (serializer BulkCommandSerializer) Serialize(bulkCommands v0_bulk_command_api.V0BulkCommands) ([]byte, error) {
	toSerialize := SerializableBulkCommandsDocument{
		SchemaVersion: latestSchemaVersion,
		Body:          bulkCommands,
	}
	bytes, err := json.Marshal(toSerialize)
	if err != nil {
		return nil, stacktrace.Propagate(err, "An error occurred serializing bulk commands to bytes")
	}
	return bytes, nil
}


