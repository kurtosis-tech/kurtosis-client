	//"encoding/json" TODO - remove
import { V0BulkCommands } from "./v0_bulk_command_api/v0_bulk_commands"; //TODO
import { SchemaVersion, V0 } from "./bulk_command_schema_version";

const latestSchemaVersion = V0;

class VersionedBulkCommandsDocument {
	private readonly schemaVersion: SchemaVersion; //TODO - Don't understand what `json:"schemaVersion"` is?
}

class SerializableBulkCommandsDocument extends VersionedBulkCommandsDocument {
	private readonly Body: interface			`json:"body"` //TODO - Don't understand what `json:"body"` is?
}


class BulkCommandSerializer {

    constructor (){}

    public serialize(bulkCommands: V0BulkCommands): [Uint8Array | string, Error] {
        const toSerialize: SerializableBulkCommandsDocument = new SerializableBulkCommandsDocument (new VersionedBulkCommandsDocument(latestSchemaVersion), bulkCommands);
        const [bytes, err] = JSON.parse(toSerialize);
        if (err != null) {
            return [null, err];
        }
        return [bytes, null];
    }
}
