//package v0_bulk_command_api

//import (
	//"encoding/json" //TODO
import { LoadLambdaArgs } from "../../../kurtosis_core_rpc_api_binding/api_container_service_pb"
import {} from "../../../kurtosis_core_rpc_api_binding/api_container_service_grpc_pb";
import { newGetEmptyExecCommandArgs, newGetEmptyExecuteBulkCommandsArgs, newGetEmptyExecuteLambdaArgs, newGetEmptyGenerateFileArgs, newGetEmptyLoadLambdaArgs, newGetEmptyLoadStaticFilesArgs, newGetEmptyRegisterServiceArgs, newGetEmptyRemoveServiceArgs, newGetEmptyRepartitionArgs, newGetEmptyStartServiceArgs, newGetEmptyWaitForEndpointAvailabilityArgs } from "../../../lib/constructor_calls";
	//"github.com/palantir/stacktrace"
import * as proto from "proto";	//"google.golang.org/protobuf/proto" //TODO
import { ExecCommandArgs, ExecuteBulkCommandsArgs, ExecuteLambdaArgs, GenerateFilesArgs, LoadStaticFilesArgs, RegisterServiceArgs, RemoveServiceArgs, RepartitionArgs, StartServiceArgs, WaitForEndpointAvailabilityArgs } from "../../../kurtosis_core_rpc_api_bindings/api_container_service_pb";
//)

// ====================================================================================================
//                                   Command Arg Deserialization Visitor
// ====================================================================================================

// Visitor that will be used to deserialize command args into
class cmdArgDeserializingVisitor {
	private readonly bytesToDeserialize: string; //TODO - string okay to represent []byte here?
	private deserializedCommandArgsPtr: proto.Message; //TODO - import this correctly

    constructor (bytesToDeserialize: string) {
        this.bytesToDeserialize = bytesToDeserialize;
    }

    public visitLoadLambda(): Error {
        const args: LoadLambdaArgs = newGetEmptyLoadLambdaArgs();
        JSON.parse(this.bytesToDeserialize, args); //TODO - error checking (try and catch??)
        // if err := JSON.parse(this.bytesToDeserialize, args); err != nil { //TODO - remove
        //     return stacktrace.Propagate(err, "An error occurred deserializing the Lambda-loading args")
        // }
        this.deserializedCommandArgsPtr = args;
        return null;
    }

    public visitExecuteLambda(): Error {
    	const args: ExecuteLambdaArgs = newGetEmptyExecuteLambdaArgs();
        JSON.parse(this.bytesToDeserialize, args); //TODO - error checking (try and catch??)
    	// if err := json.Unmarshal(visitor.bytesToDeserialize, args); err != nil {
    	// 	return stacktrace.Propagate(err, "An error occurred deserializing the Lambda-executing args")
    	// }
    	this.deserializedCommandArgsPtr = args;
    	return null;
    }

    public visitRegisterService(): Error {
        const args: RegisterServiceArgs = newGetEmptyRegisterServiceArgs();
        JSON.parse(this.bytesToDeserialize, args); //TODO - error checking (try and catch??)
        // if err := json.Unmarshal(visitor.bytesToDeserialize, args); err != nil {
        //     return stacktrace.Propagate(err, "An error occurred deserializing the register service args")
        // }
        this.deserializedCommandArgsPtr = args;
        return null;
    }

    public visitGenerateFiles(): Error {
        const args: GenerateFilesArgs = newGetEmptyGenerateFileArgs();
        JSON.parse(this.bytesToDeserialize, args); //TODO - error checking (try and catch??)
        // if err := json.Unmarshal(visitor.bytesToDeserialize, args); err != nil {
        //     return stacktrace.Propagate(err, "An error occurred deserializing the generate files args")
        // }
        this.deserializedCommandArgsPtr = args;
        return null;
    }

    public visitLoadStaticFiles(): Error {
    	const args: LoadStaticFilesArgs = newGetEmptyLoadStaticFilesArgs();
    	// if err := json.Unmarshal(visitor.bytesToDeserialize, args); err != nil {
    	// 	return stacktrace.Propagate(err, "An error occurred deserializing the load static files args")
    	// }
        JSON.parse(this.bytesToDeserialize, args); //TODO - error checking (try and catch??)
        this.deserializedCommandArgsPtr = args;
        return null;
    }

    public visitStartService(): Error {
        const args: StartServiceArgs = newGetEmptyStartServiceArgs();
        // if err := json.Unmarshal(visitor.bytesToDeserialize, args); err != nil {
        //     return stacktrace.Propagate(err, "An error occurred deserializing the start service args")
        // }
        JSON.parse(this.bytesToDeserialize, args); //TODO - error checking (try and catch??)
        this.deserializedCommandArgsPtr = args;
        return null;
    }

    public visitRemoveService(): Error {
    	const args: RemoveServiceArgs = newGetEmptyRemoveServiceArgs();
    	// if err := json.Unmarshal(visitor.bytesToDeserialize, args); err != nil {
    	// 	return stacktrace.Propagate(err, "An error occurred deserializing the remove service args")
    	// }
        JSON.parse(this.bytesToDeserialize, args); //TODO - error checking (try and catch??)
        this.deserializedCommandArgsPtr = args;
        return null;
    }

    public visitRepartition(): Error {
    	const args: RepartitionArgs = newGetEmptyRepartitionArgs();
    	// if err := json.Unmarshal(visitor.bytesToDeserialize, args); err != nil {
    	// 	return stacktrace.Propagate(err, "An error occurred deserializing the repartition service args")
    	// }
        JSON.parse(this.bytesToDeserialize, args); //TODO - error checking (try and catch??)
        this.deserializedCommandArgsPtr = args;
        return null;
    }

    public visitExecCommand(): Error {
        const args: ExecCommandArgs = newGetEmptyExecCommandArgs();
        // if err := json.Unmarshal(visitor.bytesToDeserialize, args); err != nil {
        //     return stacktrace.Propagate(err, "An error occurred deserializing the exec command args")
        // }
        JSON.parse(this.bytesToDeserialize, args); //TODO - error checking (try and catch??)
        this.deserializedCommandArgsPtr = args;
        return null;
    }

    public visitWaitForEndpointAvailability(): Error {
    	const args: WaitForEndpointAvailabilityArgs = newGetEmptyWaitForEndpointAvailabilityArgs();
    	// if err := json.Unmarshal(visitor.bytesToDeserialize, args); err != nil {
    	// 	return stacktrace.Propagate(err, "An error occurred deserializing the endpoint availability-waiting args")
    	// }
        JSON.parse(this.bytesToDeserialize, args); //TODO - error checking (try and catch??)
        this.deserializedCommandArgsPtr = args;
        return null;
    }

    public visitExecuteBulkCommands(): Error {
        const args: ExecuteBulkCommandsArgs = newGetEmptyExecuteBulkCommandsArgs();
        // if err := json.Unmarshal(visitor.bytesToDeserialize, args); err != nil {
        //     return stacktrace.Propagate(err, "An error occurred deserializing the bulk command execution args")
        // }
        JSON.parse(this.bytesToDeserialize, args); //TODO - error checking (try and catch??)
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