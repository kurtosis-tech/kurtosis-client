//package bulk_command_execution

//import (
	"encoding/json"
import { V0BulkCommands } from "./v0_bulk_command_api/";
import { SchemaVersion, V0 } from "./bulk_command_schema_version";
	//"github.com/palantir/stacktrace"
//)

const latestSchemaVersion = V0;

class VersionedBulkCommandsDocument {
	schemaVersion: SchemaVersion = `json:"schemaVersion"`
}

type serializableBulkCommandsDocument struct {
	VersionedBulkCommandsDocument
	Body	interface{}			`json:"body"`
}

class BulkCommandSerializer {

    constructor (){}

    // public Serialize(bulkCommands: V0BulkCommands) [Uint8Array | string, Error] {
    //     toSerialize := serializableBulkCommandsDocument{
    //         VersionedBulkCommandsDocument: VersionedBulkCommandsDocument{
    //             SchemaVersion: latestSchemaVersion,
    //         },
    //         Body:                          bulkCommands,
    //     }
    //     const [bytes, err] := json.Marshal(toSerialize)
    //     if (err != null) {
    //         return null, stacktrace.Propagate(err, "An error occurred serializing bulk commands to bytes")
    //     }
    //     return [bytes, null]
    // }
}
