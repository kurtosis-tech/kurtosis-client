import { LoadLambdaArgs } from "../../../kurtosis_core_rpc_api_bindings/api_container_service_pb"
import { newEmptyExecCommandArgs, newEmptyExecuteBulkCommandsArgs, newEmptyExecuteLambdaArgs, newEmptyGenerateFileArgs, newEmptyLoadLambdaArgs, newEmptyLoadStaticFilesArgs, newEmptyRegisterServiceArgs, newEmptyRemoveServiceArgs, newEmptyRepartitionArgs, newEmptyStartServiceArgs, newEmptyWaitForEndpointAvailabilityArgs } from "../../../lib/constructor_calls";
import { ExecCommandArgs, ExecuteBulkCommandsArgs, ExecuteLambdaArgs, GenerateFilesArgs, LoadStaticFilesArgs, RegisterServiceArgs, RemoveServiceArgs, RepartitionArgs, StartServiceArgs, WaitForEndpointAvailabilityArgs } from "../../../kurtosis_core_rpc_api_bindings/api_container_service_pb";
import * as proto from "protobufjs";

// ====================================================================================================
//                                   Command Arg Deserialization Visitor
// ====================================================================================================

// Visitor that will be used to deserialize command args into
class cmdArgDeserializingVisitor implements V0CommandTypeVisitor {
	private readonly bytesToDeserialize: string; //TODO (comment) - string because no byte type in typescript
	private deserializedCommandArgsPtr: proto.Message; //TODO - did I import the right protobuf

    constructor (bytesToDeserialize: string) {
        this.bytesToDeserialize = bytesToDeserialize;
    }

    public visitLoadLambda(): Error {
        let args: LoadLambdaArgs = newEmptyLoadLambdaArgs();
       
        try { //TODO - No callback, so not using promises for error checking. Is try and catch a good alternative?
            args = JSON.parse(this.bytesToDeserialize);
        } 
        catch(err) {
            return err;
        }
        
        // TODO TODO TODO - REMVOE
        // if err := JSON.parse(this.bytesToDeserialize, args); err != nil { //TODO - remove
        //     return stacktrace.Propagate(err, "An error occurred deserializing the Lambda-loading args")
        // }

        this.deserializedCommandArgsPtr = args; //TODO - compiling error, need to solve this
        return null;
    }

    public visitExecuteLambda(): Error {
    	let args: ExecuteLambdaArgs = newEmptyExecuteLambdaArgs();
        args = JSON.parse(this.bytesToDeserialize); 
        
        //TODO - error checking (try and catch??)
    	// if err := json.Unmarshal(visitor.bytesToDeserialize, args); err != nil {
    	// 	return stacktrace.Propagate(err, "An error occurred deserializing the Lambda-executing args")
    	// }

    	this.deserializedCommandArgsPtr = args;
    	return null;
    }

    public visitRegisterService(): Error {
        let args: RegisterServiceArgs = newEmptyRegisterServiceArgs();
        args = JSON.parse(this.bytesToDeserialize); 
        
        //TODO - error checking (try and catch??)
        // if err := json.Unmarshal(visitor.bytesToDeserialize, args); err != nil {
        //     return stacktrace.Propagate(err, "An error occurred deserializing the register service args")
        // }

        this.deserializedCommandArgsPtr = args;
        return null;
    }

    public visitGenerateFiles(): Error {
        let args: GenerateFilesArgs = newEmptyGenerateFileArgs();
        args = JSON.parse(this.bytesToDeserialize); 
        
        //TODO - error checking (try and catch??)
        // if err := json.Unmarshal(visitor.bytesToDeserialize, args); err != nil {
        //     return stacktrace.Propagate(err, "An error occurred deserializing the generate files args")
        // }

        this.deserializedCommandArgsPtr = args;
        return null;
    }

    public visitLoadStaticFiles(): Error {
    	let args: LoadStaticFilesArgs = newEmptyLoadStaticFilesArgs();
    	 
        //TODO - error checking (try and catch??)
        // if err := json.Unmarshal(visitor.bytesToDeserialize, args); err != nil {
    	// 	return stacktrace.Propagate(err, "An error occurred deserializing the load static files args")
    	// }

        args = JSON.parse(this.bytesToDeserialize);
        this.deserializedCommandArgsPtr = args;
        return null;
    }

    public visitStartService(): Error {
        let args: StartServiceArgs = newEmptyStartServiceArgs();

         //TODO - error checking (try and catch??)
        // if err := json.Unmarshal(visitor.bytesToDeserialize, args); err != nil {
        //     return stacktrace.Propagate(err, "An error occurred deserializing the start service args")
        // }

        args = JSON.parse(this.bytesToDeserialize);
        this.deserializedCommandArgsPtr = args;
        return null;
    }

    public visitRemoveService(): Error {
    	let args: RemoveServiceArgs = newEmptyRemoveServiceArgs();
    	
        //TODO - error checking (try and catch??)
        // if err := json.Unmarshal(visitor.bytesToDeserialize, args); err != nil {
    	// 	return stacktrace.Propagate(err, "An error occurred deserializing the remove service args")
    	// }

        args = JSON.parse(this.bytesToDeserialize);
        this.deserializedCommandArgsPtr = args;
        return null;
    }

    public visitRepartition(): Error {
    	let args: RepartitionArgs = newEmptyRepartitionArgs();
    	
        //TODO - error checking (try and catch??)
        // if err := json.Unmarshal(visitor.bytesToDeserialize, args); err != nil {
    	// 	return stacktrace.Propagate(err, "An error occurred deserializing the repartition service args")
    	// }

        args = JSON.parse(this.bytesToDeserialize);
        this.deserializedCommandArgsPtr = args;
        return null;
    }

    public visitExecCommand(): Error {
        let args: ExecCommandArgs = newEmptyExecCommandArgs();
     
        //TODO - error checking (try and catch??)
        // if err := json.Unmarshal(visitor.bytesToDeserialize, args); err != nil {
        //     return stacktrace.Propagate(err, "An error occurred deserializing the exec command args")
        // }
        
        args = JSON.parse(this.bytesToDeserialize);
        this.deserializedCommandArgsPtr = args;
        return null;
    }

    public visitWaitForEndpointAvailability(): Error {
    	let args: WaitForEndpointAvailabilityArgs = newEmptyWaitForEndpointAvailabilityArgs();
    	
         //TODO - error checking (try and catch??)
        // if err := json.Unmarshal(visitor.bytesToDeserialize, args); err != nil {
    	// 	return stacktrace.Propagate(err, "An error occurred deserializing the endpoint availability-waiting args")
    	// }

        args = JSON.parse(this.bytesToDeserialize);
        this.deserializedCommandArgsPtr = args;
        return null;
    }

    public visitExecuteBulkCommands(): Error {
        let args: ExecuteBulkCommandsArgs = newEmptyExecuteBulkCommandsArgs();

         //TODO - error checking (try and catch??)
        // if err := json.Unmarshal(visitor.bytesToDeserialize, args); err != nil {
        //     return stacktrace.Propagate(err, "An error occurred deserializing the bulk command execution args")
        // }

        args = JSON.parse(this.bytesToDeserialize);
        this.deserializedCommandArgsPtr = args;
        return null;
    }

    public getDeserializedCommandArgs(): proto.Message { //TODO - fix this import
        return this.deserializedCommandArgsPtr;
    }
}

// ====================================================================================================
//                                        Serializable Command
// ====================================================================================================

class interstitialStruct {
    private readonly type: V0CommandType;
    private argsBytes: string; //TODO - original type was json.RawMessage ;

    constructor(){}

    //TODO - getter and setter methods for the variables, instead of giving direct access ; is that an alright change from golang
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
	private argsPtr: proto.Message;

    // A V0SerializableCommand knows how to deserialize itself, thanks to the "type" tag
    public unmarshalJSON(bytes: string): Error { //TODO - changed type from byte[] to string

        const interstitialObj: interstitialStruct = new interstitialStruct();
        interstitialObj.setArgsBytes(JSON.parse(bytes)); //TODO (try and catch for error checking)

        const visitor: cmdArgDeserializingVisitor = new cmdArgDeserializingVisitor(interstitialObj.getArgsBytes());
        const err = AcceptVisitor(interstitialObj.getType(), visitor);
        if (err != null) {
            return err;
        }

        this.type = interstitialObj.getType();
        this.argsPtr = visitor.getDeserializedCommandArgs();

        return null;
    }

}


// // ====================================================================================================
// //                                   Bulk Commands Package
// // ====================================================================================================

export class V0BulkCommands {
	private readonly commands: V0SerializableCommand[];
}