import { LoadLambdaArgs } from "../../../kurtosis_core_rpc_api_bindings/api_container_service_pb"
import { newGetEmptyExecCommandArgs, newGetEmptyExecuteBulkCommandsArgs, newGetEmptyExecuteLambdaArgs, newGetEmptyGenerateFileArgs, newGetEmptyLoadLambdaArgs, newGetEmptyLoadStaticFilesArgs, newGetEmptyRegisterServiceArgs, newGetEmptyRemoveServiceArgs, newGetEmptyRepartitionArgs, newGetEmptyStartServiceArgs, newGetEmptyWaitForEndpointAvailabilityArgs } from "../../../lib/constructor_calls";
import { ExecCommandArgs, ExecuteBulkCommandsArgs, ExecuteLambdaArgs, GenerateFilesArgs, LoadStaticFilesArgs, RegisterServiceArgs, RemoveServiceArgs, RepartitionArgs, StartServiceArgs, WaitForEndpointAvailabilityArgs } from "../../../kurtosis_core_rpc_api_bindings/api_container_service_pb";
import * as proto from "protobufjs";

// ====================================================================================================
//                                   Command Arg Deserialization Visitor
// ====================================================================================================

// Visitor that will be used to deserialize command args into
class cmdArgDeserializingVisitor {
	private readonly bytesToDeserialize: string; //TODO (comment) - string because no byte type in typescript
	private deserializedCommandArgsPtr: proto.Message; //TODO - did I import the right protobuf

    constructor (bytesToDeserialize: string) {
        this.bytesToDeserialize = bytesToDeserialize;
    }

    public visitLoadLambda(): Error {
        let args: LoadLambdaArgs = newGetEmptyLoadLambdaArgs();
       
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

        this.deserializedCommandArgsPtr = args; //TODO...
        return null;
    }

    public visitExecuteLambda(): Error {
    	let args: ExecuteLambdaArgs = newGetEmptyExecuteLambdaArgs();
        args = JSON.parse(this.bytesToDeserialize); 
        
        //TODO - error checking (try and catch??)
    	// if err := json.Unmarshal(visitor.bytesToDeserialize, args); err != nil {
    	// 	return stacktrace.Propagate(err, "An error occurred deserializing the Lambda-executing args")
    	// }

    	this.deserializedCommandArgsPtr = args;
    	return null;
    }

    public visitRegisterService(): Error {
        let args: RegisterServiceArgs = newGetEmptyRegisterServiceArgs();
        args = JSON.parse(this.bytesToDeserialize); 
        
        //TODO - error checking (try and catch??)
        // if err := json.Unmarshal(visitor.bytesToDeserialize, args); err != nil {
        //     return stacktrace.Propagate(err, "An error occurred deserializing the register service args")
        // }

        this.deserializedCommandArgsPtr = args;
        return null;
    }

    public visitGenerateFiles(): Error {
        let args: GenerateFilesArgs = newGetEmptyGenerateFileArgs();
        args = JSON.parse(this.bytesToDeserialize); 
        
        //TODO - error checking (try and catch??)
        // if err := json.Unmarshal(visitor.bytesToDeserialize, args); err != nil {
        //     return stacktrace.Propagate(err, "An error occurred deserializing the generate files args")
        // }

        this.deserializedCommandArgsPtr = args;
        return null;
    }

    public visitLoadStaticFiles(): Error {
    	let args: LoadStaticFilesArgs = newGetEmptyLoadStaticFilesArgs();
    	 
        //TODO - error checking (try and catch??)
        // if err := json.Unmarshal(visitor.bytesToDeserialize, args); err != nil {
    	// 	return stacktrace.Propagate(err, "An error occurred deserializing the load static files args")
    	// }

        args = JSON.parse(this.bytesToDeserialize);
        this.deserializedCommandArgsPtr = args;
        return null;
    }

    public visitStartService(): Error {
        let args: StartServiceArgs = newGetEmptyStartServiceArgs();

         //TODO - error checking (try and catch??)
        // if err := json.Unmarshal(visitor.bytesToDeserialize, args); err != nil {
        //     return stacktrace.Propagate(err, "An error occurred deserializing the start service args")
        // }

        args = JSON.parse(this.bytesToDeserialize);
        this.deserializedCommandArgsPtr = args;
        return null;
    }

    public visitRemoveService(): Error {
    	let args: RemoveServiceArgs = newGetEmptyRemoveServiceArgs();
    	
        //TODO - error checking (try and catch??)
        // if err := json.Unmarshal(visitor.bytesToDeserialize, args); err != nil {
    	// 	return stacktrace.Propagate(err, "An error occurred deserializing the remove service args")
    	// }

        args = JSON.parse(this.bytesToDeserialize);
        this.deserializedCommandArgsPtr = args;
        return null;
    }

    public visitRepartition(): Error {
    	let args: RepartitionArgs = newGetEmptyRepartitionArgs();
    	
        //TODO - error checking (try and catch??)
        // if err := json.Unmarshal(visitor.bytesToDeserialize, args); err != nil {
    	// 	return stacktrace.Propagate(err, "An error occurred deserializing the repartition service args")
    	// }

        args = JSON.parse(this.bytesToDeserialize);
        this.deserializedCommandArgsPtr = args;
        return null;
    }

    public visitExecCommand(): Error {
        let args: ExecCommandArgs = newGetEmptyExecCommandArgs();
     
        //TODO - error checking (try and catch??)
        // if err := json.Unmarshal(visitor.bytesToDeserialize, args); err != nil {
        //     return stacktrace.Propagate(err, "An error occurred deserializing the exec command args")
        // }
        
        args = JSON.parse(this.bytesToDeserialize);
        this.deserializedCommandArgsPtr = args;
        return null;
    }

    public visitWaitForEndpointAvailability(): Error {
    	let args: WaitForEndpointAvailabilityArgs = newGetEmptyWaitForEndpointAvailabilityArgs();
    	
         //TODO - error checking (try and catch??)
        // if err := json.Unmarshal(visitor.bytesToDeserialize, args); err != nil {
    	// 	return stacktrace.Propagate(err, "An error occurred deserializing the endpoint availability-waiting args")
    	// }

        args = JSON.parse(this.bytesToDeserialize);
        this.deserializedCommandArgsPtr = args;
        return null;
    }

    public visitExecuteBulkCommands(): Error {
        let args: ExecuteBulkCommandsArgs = newGetEmptyExecuteBulkCommandsArgs();

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

// Used for serializing
export class V0SerializableCommand {
	private readonly Type V0CommandType `json:"type"` //TODO

	// The only allowed objects here are from the bindings generated from the .proto file
	private readonly ArgsPtr proto.Message `json:"args"` //TODO

    // A V0SerializableCommand knows how to deserialize itself, thanks to the "type" tag
    public unmarshalJSON(bytes: byte[]): Error {
        interstitialStruct := struct { //TODO
            Type      V0CommandType   `json:"type"`
            ArgsBytes json.RawMessage `json:"args"`
        }{}
        // if err := json.Unmarshal(bytes, &interstitialStruct); err != nil {
        //     return stacktrace.Propagate(err, "An error occurred deserializing the bytes into a command")
        // }s
        JSON.parse(bytes, ) //TODO

        // visitor := newCmdArgDeserializingVisitor(interstitialStruct.ArgsBytes)
        // if err := interstitialStruct.Type.AcceptVisitor(visitor); err != nil {
        //     return stacktrace.Propagate(err, "An error occurred deserializing command with the following JSON:\n%v", string(bytes))
        // }

        this.Type = interstitialStruct.Type
        this.ArgsPtr = visitor.GetDeserializedCommandArgs()

        return null;
    }

}


// // ====================================================================================================
// //                                   Bulk Commands Package
// // ====================================================================================================

export class V0BulkCommands {
	Commands []V0SerializableCommand `json:"commands"` //TODO
}