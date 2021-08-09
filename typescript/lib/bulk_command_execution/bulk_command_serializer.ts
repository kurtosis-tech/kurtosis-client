import { V0BulkCommands } from "./v0_bulk_command_api/v0_bulk_commands";
import { SchemaVersion, V0 } from "./bulk_command_schema_version";
import { ok, err, Result } from "neverthrow";

const latestSchemaVersion = V0;

class VersionedBulkCommandsDocument {
	private readonly schemaVersion: SchemaVersion;

    constructor(schemaVersion: SchemaVersion) {
        this.schemaVersion = schemaVersion; //TODO - do I need `json:"schemaVersion"` in typescript? This is a struct tag in golang, and I think I can get rid of it
    }
}

class SerializableBulkCommandsDocument extends VersionedBulkCommandsDocument {
	private readonly body: V0BulkCommands; //TODO - I should generalize this to any inteface? Need to look into this, or would need some kind of parent interface

    constructor(schemaVersion: SchemaVersion, body: V0BulkCommands) {
        super(schemaVersion);
        this.body = body; //TODO - same comment about removing struct tag since its go-specific
    }
}


class BulkCommandSerializer {

    constructor (){}

    public serialize(bulkCommands: V0BulkCommands): Result<Uint8Array | string, Error> {
        const toSerialize: SerializableBulkCommandsDocument = new SerializableBulkCommandsDocument(latestSchemaVersion, bulkCommands);
        
        var bytes: string;
        try {
            bytes = JSON.stringify(toSerialize);
        }
        catch (jsonErr) {
            return err(jsonErr);
        }

        return ok(bytes);
    }
}
