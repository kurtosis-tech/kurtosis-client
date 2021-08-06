import { V0BulkCommands } from "./v0_bulk_command_api/v0_bulk_commands";
import { SchemaVersion, V0 } from "./bulk_command_schema_version";

const latestSchemaVersion = V0;

class VersionedBulkCommandsDocument {
	private readonly schemaVersion: SchemaVersion;

    constructor(schemaVersion: SchemaVersion) {
        this.schemaVersion = schemaVersion; //TODO - how do I need `json:"schemaVersion"` in typescript? This is a struct tag in golang, and I think I can get rid of it
    }
}

class SerializableBulkCommandsDocument extends VersionedBulkCommandsDocument {
	private readonly body: V0BulkCommands //TODO - I should generalize this to any inteface?

    constructor(schemaVersion: SchemaVersion, body: V0BulkCommands) {
        super(schemaVersion);
        this.body = body; //TODO - same commetn about removing stuct tag since its go-specific
    }
}


class BulkCommandSerializer {

    constructor (){}

    public serialize(bulkCommands: V0BulkCommands): [Uint8Array | string, Error] {
        const toSerialize: SerializableBulkCommandsDocument = new SerializableBulkCommandsDocument(latestSchemaVersion, bulkCommands);
        
        var bytes;
        try {
            bytes = JSON.stringify(toSerialize);
        }
        catch (err) {
            return [null, err];
        }

        //TODO (try and catch error checking) _ REMOVE
        // if (err != null) { //TODO - How to deal with exception - JSON throws a SyntaxError exception if the string to parse is not valid JSON.
        //     return [null, err];
        // }

        return [bytes, null];
    }
}
