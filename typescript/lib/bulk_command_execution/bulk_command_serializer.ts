import { V0BulkCommands } from "./v0_bulk_command_api/v0_bulk_commands";
import { SchemaVersion, V0 } from "./bulk_command_schema_version";
import { ok, err, Result } from "neverthrow";

const LATEST_SCHEMA_VERSION = V0;

class VersionedBulkCommandsDocument {
    private readonly schemaVersion: SchemaVersion;
    
    constructor(schemaVersion: SchemaVersion) {
        this.schemaVersion = schemaVersion;
    }
}

class SerializableBulkCommandsDocument extends VersionedBulkCommandsDocument {
    private readonly body: any;
    
    constructor(schemaVersion: SchemaVersion, body: V0BulkCommands) {
        super(schemaVersion);
        this.body = body;
    }
}


class BulkCommandSerializer {

    constructor (){}

    public serialize(bulkCommands: V0BulkCommands): Result<Uint8Array | string, Error> {
        const toSerialize: SerializableBulkCommandsDocument = new SerializableBulkCommandsDocument(LATEST_SCHEMA_VERSION, bulkCommands);
        
        var bytes: string;
        try {
            bytes = JSON.stringify(toSerialize);
        } catch (jsonErr) {
            return err(jsonErr);
        }

        return ok(bytes);
    }
}
