import { LoadLambdaArgs, ExecCommandArgs, ExecuteBulkCommandsArgs, ExecuteLambdaArgs, GenerateFilesArgs, LoadStaticFilesArgs, RegisterServiceArgs, RemoveServiceArgs, RepartitionArgs, StartServiceArgs, WaitForEndpointAvailabilityArgs } from "../../../kurtosis_core_rpc_api_bindings/api_container_service_pb";
import { V0CommandTypeVisitor, V0CommandType } from "./v0_command_types";
import { ok, err, Result } from "neverthrow";
import * as protobuf from "google-protobuf";

// ====================================================================================================
//                                   Command Arg Deserialization Visitor
// ====================================================================================================

// Visitor that will be used to deserialize command args into
class CmdArgDeserializingVisitor implements V0CommandTypeVisitor {
    private readonly bytesToDeserialize: string;
    private deserializedCommandArgsPtr: protobuf.Message;

    constructor (bytesToDeserialize: string) {
        this.bytesToDeserialize = bytesToDeserialize;
    }

    public visitLoadLambda(): Result<null, Error> {
        let args: LoadLambdaArgs;
       
        try {
            args = JSON.parse(this.bytesToDeserialize);
        } catch(jsonErr) {
            return err(jsonErr);
        }

        this.deserializedCommandArgsPtr = args;
        return ok(null);
    }

    public visitExecuteLambda(): Result<null, Error> {
    	let args: ExecuteLambdaArgs;
        
        try {
            args = JSON.parse(this.bytesToDeserialize);
        } catch(jsonErr) {
            return err(jsonErr);
        }

    	this.deserializedCommandArgsPtr = args;
    	return ok(null);
    }

    public visitRegisterService(): Result<null, Error> {
        let args: RegisterServiceArgs;
        
        try {
            args = JSON.parse(this.bytesToDeserialize);
        } catch(jsonErr) {
            return err(jsonErr);
        }

        this.deserializedCommandArgsPtr = args;
        return ok(null);
    }

    public visitGenerateFiles(): Result<null, Error> {
        let args: GenerateFilesArgs;
        
        try {
            args = JSON.parse(this.bytesToDeserialize);
        } catch(jsonErr) {
            return err(jsonErr);
        }

        this.deserializedCommandArgsPtr = args;
        return ok(null);
    }

    public visitLoadStaticFiles(): Result<null, Error> {
    	let args: LoadStaticFilesArgs;
    	 
        try {
            args = JSON.parse(this.bytesToDeserialize);
        } catch(jsonErr) {
            return err(jsonErr);
        }

        this.deserializedCommandArgsPtr = args;
        return ok(null);
    }

    public visitStartService(): Result<null, Error> {
        let args: StartServiceArgs;

        try {
            args = JSON.parse(this.bytesToDeserialize);
        } catch(jsonErr) {
            return err(jsonErr);
        }

        this.deserializedCommandArgsPtr = args;
        return ok(null);
    }

    public visitRemoveService(): Result<null, Error> {
    	let args: RemoveServiceArgs;
    	
        try {
            args = JSON.parse(this.bytesToDeserialize);
        } catch(jsonErr) {
            return err(jsonErr);
        }

        this.deserializedCommandArgsPtr = args;
        return ok(null);
    }

    public visitRepartition(): Result<null, Error> {
    	let args: RepartitionArgs;
    	
        try {
            args = JSON.parse(this.bytesToDeserialize);
        } catch(jsonErr) {
            return err(jsonErr);
        }

        this.deserializedCommandArgsPtr = args;
        return ok(null);
    }

    public visitExecCommand(): Result<null, Error> {
        let args: ExecCommandArgs;
     
        try {
            args = JSON.parse(this.bytesToDeserialize);
        } catch(jsonErr) {
            return err(jsonErr);
        }

        this.deserializedCommandArgsPtr = args;
        return ok(null);
    }

    public visitWaitForEndpointAvailability(): Result<null, Error> {
    	let args: WaitForEndpointAvailabilityArgs;
    	
        try {
            args = JSON.parse(this.bytesToDeserialize);
        } catch(jsonErr) {
            return err(jsonErr);
        }

        this.deserializedCommandArgsPtr = args;
        return ok(null);
    }

    public visitExecuteBulkCommands(): Result<null, Error> {
        let args: ExecuteBulkCommandsArgs;

        try {
            args = JSON.parse(this.bytesToDeserialize);
        } catch(jsonErr) {
            return err(jsonErr);
        }

        this.deserializedCommandArgsPtr = args;
        return ok(null);
    }

    public getDeserializedCommandArgs(): protobuf.Message {
        return this.deserializedCommandArgsPtr;
    }
}

// ====================================================================================================
//                                        Serializable Command
// ====================================================================================================

// Used for serializing
export class V0SerializableCommand {
    private readonly type: V0CommandType;
    
    // The only allowed objects here are from the bindings generated from the .proto file
    private readonly argsPtr: protobuf.Message;

    constructor (type: V0CommandType, argsPtr: protobuf.Message) {
        this.type = type;
        this.argsPtr = argsPtr;
    } 
       
    public getType(): V0CommandType {
        return this.type;
    }

    public getArgsPtr(): protobuf.Message {
        return this.argsPtr;
    }

}

// // ====================================================================================================
// //                                   Bulk Commands Package
// // ====================================================================================================

export class V0BulkCommands {
    private readonly commands: V0SerializableCommand[];

    constructor (commands: V0SerializableCommand[]) {
        this.commands = commands;
    }
}