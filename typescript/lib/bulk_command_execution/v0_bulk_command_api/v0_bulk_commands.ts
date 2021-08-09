import { LoadLambdaArgs } from "../../../kurtosis_core_rpc_api_bindings/api_container_service_pb";
import { newEmptyExecCommandArgs, newEmptyExecuteBulkCommandsArgs, newEmptyExecuteLambdaArgs, newEmptyGenerateFileArgs, newEmptyLoadLambdaArgs, newEmptyLoadStaticFilesArgs, newEmptyRegisterServiceArgs, newEmptyRemoveServiceArgs, newEmptyRepartitionArgs, newEmptyStartServiceArgs, newEmptyWaitForEndpointAvailabilityArgs } from "../../../lib/constructor_calls";
import { ExecCommandArgs, ExecuteBulkCommandsArgs, ExecuteLambdaArgs, GenerateFilesArgs, LoadStaticFilesArgs, RegisterServiceArgs, RemoveServiceArgs, RepartitionArgs, StartServiceArgs, WaitForEndpointAvailabilityArgs } from "../../../kurtosis_core_rpc_api_bindings/api_container_service_pb";
import { V0CommandTypeVisitor, V0CommandType, acceptVisitor } from "./v0_command_types";
import { ok, err, Result } from "neverthrow";
import * as jspb from "google-protobuf";

// ====================================================================================================
//                                   Command Arg Deserialization Visitor
// ====================================================================================================

// Visitor that will be used to deserialize command args into
class cmdArgDeserializingVisitor implements V0CommandTypeVisitor {
	private readonly bytesToDeserialize: string; //TODO (comment) - string because no byte type in typescript
	private deserializedCommandArgsPtr: jspb.Message;

    constructor (bytesToDeserialize: string) {
        this.bytesToDeserialize = bytesToDeserialize;
    }

    public visitLoadLambda(): Result<null, Error> {
        let args: LoadLambdaArgs = newEmptyLoadLambdaArgs();
       
        try {
            args = JSON.parse(this.bytesToDeserialize);
        } 
        catch(jsonErr) {
            return err(jsonErr);
        }

        this.deserializedCommandArgsPtr = args;
        return ok(null);
    }

    public visitExecuteLambda(): Result<null, Error> {
    	let args: ExecuteLambdaArgs = newEmptyExecuteLambdaArgs();
        
        try {
            args = JSON.parse(this.bytesToDeserialize);
        } 
        catch(jsonErr) {
            return err(jsonErr);
        }

    	this.deserializedCommandArgsPtr = args;
    	return ok(null);
    }

    public visitRegisterService(): Result<null, Error> {
        let args: RegisterServiceArgs = newEmptyRegisterServiceArgs();
        
        try {
            args = JSON.parse(this.bytesToDeserialize);
        } 
        catch(jsonErr) {
            return err(jsonErr);
        }

        this.deserializedCommandArgsPtr = args;
        return ok(null);
    }

    public visitGenerateFiles(): Result<null, Error> {
        let args: GenerateFilesArgs = newEmptyGenerateFileArgs();
        
        try {
            args = JSON.parse(this.bytesToDeserialize);
        } 
        catch(jsonErr) {
            return err(jsonErr);
        }

        this.deserializedCommandArgsPtr = args;
        return ok(null);
    }

    public visitLoadStaticFiles(): Result<null, Error> {
    	let args: LoadStaticFilesArgs = newEmptyLoadStaticFilesArgs();
    	 
        try {
            args = JSON.parse(this.bytesToDeserialize);
        } 
        catch(jsonErr) {
            return err(jsonErr);
        }

        this.deserializedCommandArgsPtr = args;
        return ok(null);
    }

    public visitStartService(): Result<null, Error> {
        let args: StartServiceArgs = newEmptyStartServiceArgs();

        try {
            args = JSON.parse(this.bytesToDeserialize);
        } 
        catch(jsonErr) {
            return err(jsonErr);
        }

        this.deserializedCommandArgsPtr = args;
        return ok(null);
    }

    public visitRemoveService(): Result<null, Error> {
    	let args: RemoveServiceArgs = newEmptyRemoveServiceArgs();
    	
        try {
            args = JSON.parse(this.bytesToDeserialize);
        } 
        catch(jsonErr) {
            return err(jsonErr);
        }

        this.deserializedCommandArgsPtr = args;
        return ok(null);
    }

    public visitRepartition(): Result<null, Error> {
    	let args: RepartitionArgs = newEmptyRepartitionArgs();
    	
        try {
            args = JSON.parse(this.bytesToDeserialize);
        } 
        catch(jsonErr) {
            return err(jsonErr);
        }

        this.deserializedCommandArgsPtr = args;
        return ok(null);
    }

    public visitExecCommand(): Result<null, Error> {
        let args: ExecCommandArgs = newEmptyExecCommandArgs();
     
        try {
            args = JSON.parse(this.bytesToDeserialize);
        } 
        catch(jsonErr) {
            return err(jsonErr);
        }

        this.deserializedCommandArgsPtr = args;
        return ok(null);
    }

    public visitWaitForEndpointAvailability(): Result<null, Error> {
    	let args: WaitForEndpointAvailabilityArgs = newEmptyWaitForEndpointAvailabilityArgs();
    	
        try {
            args = JSON.parse(this.bytesToDeserialize);
        } 
        catch(jsonErr) {
            return err(jsonErr);
        }

        args = JSON.parse(this.bytesToDeserialize);
        this.deserializedCommandArgsPtr = args;
        return ok(null);
    }

    public visitExecuteBulkCommands(): Result<null, Error> {
        let args: ExecuteBulkCommandsArgs = newEmptyExecuteBulkCommandsArgs();

        try {
            args = JSON.parse(this.bytesToDeserialize);
        } 
        catch(jsonErr) {
            return err(jsonErr);
        }

        this.deserializedCommandArgsPtr = args;
        return ok(null);
    }

    public getDeserializedCommandArgs(): jspb.Message {
        return this.deserializedCommandArgsPtr;
    }
}

// ====================================================================================================
//                                        Serializable Command
// ====================================================================================================

class interstitialStruct {
    private readonly type: V0CommandType;
    private argsBytes: string; //TODO (comment) - original type was json.RawMessage ; couldn't find equivalent in typescript

    constructor(){}

    //TODO (comment)- getter and setter instead of giving direct access is alright change from golang, is this okay?
    public getType(): V0CommandType {
        return this.type;
    }
    
    public getArgsBytes(): string {
        return this.argsBytes;
    }

    public setArgsBytes(newArgsBytes: string): void {
        this.argsBytes = newArgsBytes;
    }
}

// Used for serializing
export class V0SerializableCommand {
	private type: V0CommandType;

	// The only allowed objects here are from the bindings generated from the .proto file
	private argsPtr: jspb.Message;

    //TODO (comment) - added getter and setters instead of giving direct access, is this okay?
    public getType(): V0CommandType {
        return this.type;
    }

    public getArgsPtr(): jspb.Message {
        return this.argsPtr;
    }
    
    public setType(newType: V0CommandType): void {
        this.type = newType;
    }
    
    public setArgsPtr(newArgsPtr: jspb.Message): void {
        this.argsPtr = newArgsPtr;
    }
   
    // A V0SerializableCommand knows how to deserialize itself, thanks to the "type" tag
    public unmarshalJSON(bytes: string): Result<null, Error> { //TODO (comment) - changed type from byte[] to string

        const interstitialObj: interstitialStruct = new interstitialStruct();
        try {
            interstitialObj.setArgsBytes(JSON.parse(bytes));
        }
        catch(jsonErr) {
            return err(jsonErr);
        }

        const visitor: cmdArgDeserializingVisitor = new cmdArgDeserializingVisitor(interstitialObj.getArgsBytes());
        const resultAcceptVisitor = acceptVisitor(interstitialObj.getType(), visitor);
        if (!resultAcceptVisitor.isOk()) {
            return err(resultAcceptVisitor.error);
        }

        this.setType(interstitialObj.getType());
        this.setArgsPtr(visitor.getDeserializedCommandArgs());

        return ok(null);
    }

}


// // ====================================================================================================
// //                                   Bulk Commands Package
// // ====================================================================================================

export class V0BulkCommands {
	private readonly commands: V0SerializableCommand[];
}