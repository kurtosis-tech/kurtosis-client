//package bulk_command_execution

//import (
	//"encoding/json" TODO - remove
import { V0BulkCommands } from "./v0_bulk_command_api/"; //TODO
import { SchemaVersion, V0 } from "./bulk_command_schema_version";
	//"github.com/palantir/stacktrace"
//)

const latestSchemaVersion = V0;

class VersionedBulkCommandsDocument {
	schemaVersion: SchemaVersion = `json:"schemaVersion"` //TODO - Don't understand what `json:"schemaVersion"` is?
}

class SerializableBulkCommandsDocument {
	VersionedBulkCommandsDocument
	Body	interface{}			`json:"body"` //TODO - Don't understand what `json:"body"` is?
}


class BulkCommandSerializer {

    constructor (){}

    public serialize(bulkCommands: V0BulkCommands): [Uint8Array | string, Error] {
        const toSerialize: SerializableBulkCommandsDocument = new SerializableBulkCommandsDocument (new VersionedBulkCommandsDocument(latestSchemaVersion), bulkCommands);
        const [bytes, err] = JSON.parse(toSerialize);
        if (err != null) {
            return [null, err]; //TODO - no personalized message => ("An error occurred serializing bulk commands to bytes")
        }
        return [bytes, null];
    }
}
