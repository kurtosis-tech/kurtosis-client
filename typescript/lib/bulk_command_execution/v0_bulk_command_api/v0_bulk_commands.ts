//package v0_bulk_command_api

//import (
	//"encoding/json" //TODO
import { LoadLambdaArgs } from "../../../kurtosis_core_rpc_api_binding/api_container_service_pb"
import {} from "../../../kurtosis_core_rpc_api_binding/api_container_service_grpc_pb";
	//"github.com/palantir/stacktrace"
import * as proto from "proto";	//"google.golang.org/protobuf/proto" //TODO
//)

// ====================================================================================================
//                                   Command Arg Deserialization Visitor
// ====================================================================================================

// Visitor that will be used to deserialize command args into
class cmdArgDeserializingVisitor {
	private readonly bytesToDeserialize: string; //TODO - string okay to represent []byte here?
	private readonly deserializedCommandArgsPtr: proto.Message; //TODO - how to import

    constructor (bytesToDeserialize: string) {
        this.bytesToDeserialize = bytesToDeserialize;
    }

    public VisitLoadLambda(): Error {
        const args: LoadLambdaArgs = &kurtosis_core_rpc_api_bindings.LoadLambdaArgs{}
        if err := json.Unmarshal(visitor.bytesToDeserialize, args); err != nil {
            return stacktrace.Propagate(err, "An error occurred deserializing the Lambda-loading args")
        }
        visitor.deserializedCommandArgsPtr = args
        return null;
    }

// func (visitor *cmdArgDeserializingVisitor) VisitExecuteLambda() error {
// 	args := &kurtosis_core_rpc_api_bindings.ExecuteLambdaArgs{}
// 	if err := json.Unmarshal(visitor.bytesToDeserialize, args); err != nil {
// 		return stacktrace.Propagate(err, "An error occurred deserializing the Lambda-executing args")
// 	}
// 	visitor.deserializedCommandArgsPtr = args
// 	return nil
// }

// func (visitor *cmdArgDeserializingVisitor) VisitRegisterService() error {
// 	args := &kurtosis_core_rpc_api_bindings.RegisterServiceArgs{}
// 	if err := json.Unmarshal(visitor.bytesToDeserialize, args); err != nil {
// 		return stacktrace.Propagate(err, "An error occurred deserializing the register service args")
// 	}
// 	visitor.deserializedCommandArgsPtr = args
// 	return nil
// }

// func (visitor *cmdArgDeserializingVisitor) VisitGenerateFiles() error {
// 	args := &kurtosis_core_rpc_api_bindings.GenerateFilesArgs{}
// 	if err := json.Unmarshal(visitor.bytesToDeserialize, args); err != nil {
// 		return stacktrace.Propagate(err, "An error occurred deserializing the generate files args")
// 	}
// 	visitor.deserializedCommandArgsPtr = args
// 	return nil
// }

// func (visitor *cmdArgDeserializingVisitor) VisitLoadStaticFiles() error {
// 	args := &kurtosis_core_rpc_api_bindings.LoadStaticFilesArgs{}
// 	if err := json.Unmarshal(visitor.bytesToDeserialize, args); err != nil {
// 		return stacktrace.Propagate(err, "An error occurred deserializing the load static files args")
// 	}
// 	visitor.deserializedCommandArgsPtr = args
// 	return nil
// }

// func (visitor *cmdArgDeserializingVisitor) VisitStartService() error {
// 	args := &kurtosis_core_rpc_api_bindings.StartServiceArgs{}
// 	if err := json.Unmarshal(visitor.bytesToDeserialize, args); err != nil {
// 		return stacktrace.Propagate(err, "An error occurred deserializing the start service args")
// 	}
// 	visitor.deserializedCommandArgsPtr = args
// 	return nil
// }

// func (visitor *cmdArgDeserializingVisitor) VisitRemoveService() error {
// 	args := &kurtosis_core_rpc_api_bindings.RemoveServiceArgs{}
// 	if err := json.Unmarshal(visitor.bytesToDeserialize, args); err != nil {
// 		return stacktrace.Propagate(err, "An error occurred deserializing the remove service args")
// 	}
// 	visitor.deserializedCommandArgsPtr = args
// 	return nil
// }

// func (visitor *cmdArgDeserializingVisitor) VisitRepartition() error {
// 	args := &kurtosis_core_rpc_api_bindings.RepartitionArgs{}
// 	if err := json.Unmarshal(visitor.bytesToDeserialize, args); err != nil {
// 		return stacktrace.Propagate(err, "An error occurred deserializing the repartition service args")
// 	}
// 	visitor.deserializedCommandArgsPtr = args
// 	return nil
// }

// func (visitor *cmdArgDeserializingVisitor) VisitExecCommand() error {
// 	args := &kurtosis_core_rpc_api_bindings.ExecCommandArgs{}
// 	if err := json.Unmarshal(visitor.bytesToDeserialize, args); err != nil {
// 		return stacktrace.Propagate(err, "An error occurred deserializing the exec command args")
// 	}
// 	visitor.deserializedCommandArgsPtr = args
// 	return nil
// }

// func (visitor *cmdArgDeserializingVisitor) VisitWaitForEndpointAvailability() error {
// 	args := &kurtosis_core_rpc_api_bindings.WaitForEndpointAvailabilityArgs{}
// 	if err := json.Unmarshal(visitor.bytesToDeserialize, args); err != nil {
// 		return stacktrace.Propagate(err, "An error occurred deserializing the endpoint availability-waiting args")
// 	}
// 	visitor.deserializedCommandArgsPtr = args
// 	return nil
// }

// func (visitor *cmdArgDeserializingVisitor) VisitExecuteBulkCommands() error {
// 	args := &kurtosis_core_rpc_api_bindings.ExecuteBulkCommandsArgs{}
// 	if err := json.Unmarshal(visitor.bytesToDeserialize, args); err != nil {
// 		return stacktrace.Propagate(err, "An error occurred deserializing the bulk command execution args")
// 	}
// 	visitor.deserializedCommandArgsPtr = args
// 	return nil
// }

// func (visitor *cmdArgDeserializingVisitor) GetDeserializedCommandArgs() proto.Message {
// 	return visitor.deserializedCommandArgsPtr
// }
}

// // ====================================================================================================
// //                                        Serializable Command
// // ====================================================================================================

// // Used for serializing
// type V0SerializableCommand struct {
// 	Type V0CommandType `json:"type"`

// 	// The only allowed objects here are from the bindings generated from the .proto file
// 	ArgsPtr proto.Message `json:"args"`
// }

// // A V0SerializableCommand knows how to deserialize itself, thanks to the "type" tag
// func (cmd *V0SerializableCommand) UnmarshalJSON(bytes []byte) error {
// 	interstitialStruct := struct {
// 		Type      V0CommandType   `json:"type"`
// 		ArgsBytes json.RawMessage `json:"args"`
// 	}{}
// 	if err := json.Unmarshal(bytes, &interstitialStruct); err != nil {
// 		return stacktrace.Propagate(err, "An error occurred deserializing the bytes into a command")
// 	}

// 	visitor := newCmdArgDeserializingVisitor(interstitialStruct.ArgsBytes)
// 	if err := interstitialStruct.Type.AcceptVisitor(visitor); err != nil {
// 		return stacktrace.Propagate(err, "An error occurred deserializing command with the following JSON:\n%v", string(bytes))
// 	}

// 	cmd.Type = interstitialStruct.Type
// 	cmd.ArgsPtr = visitor.GetDeserializedCommandArgs()

// 	return nil
// }


// // ====================================================================================================
// //                                   Bulk Commands Package
// // ====================================================================================================

// type V0BulkCommands struct {
// 	Commands []V0SerializableCommand `json:"commands"`
// }
}