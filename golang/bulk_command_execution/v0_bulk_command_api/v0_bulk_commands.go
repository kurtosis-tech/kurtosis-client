package v0_bulk_command_api

import (
	"encoding/json"
	"github.com/kurtosis-tech/kurtosis-client/golang/core_api_bindings"
	"github.com/palantir/stacktrace"
)

// ====================================================================================================
//                                   Command Arg Deserialization Visitor
// ====================================================================================================

// Visitor that will be used to deserialize command args into
type cmdArgDeserializingVisitor struct {
	bytesToDeserialize []byte
	deserializedCommandArgs interface{}
}

func newCmdArgDeserializingVisitor(bytesToDeserialize []byte) *cmdArgDeserializingVisitor {
	return &cmdArgDeserializingVisitor{bytesToDeserialize: bytesToDeserialize}
}

func (visitor cmdArgDeserializingVisitor) VisitRegisterServiceCommand() error {
	args := &core_api_bindings.RegisterServiceArgs{}
	if err := json.Unmarshal(visitor.bytesToDeserialize, args); err != nil {
		return stacktrace.Propagate(err, "An error occurred deserializing the register service args")
	}
	visitor.deserializedCommandArgs = args
	return nil
}

func (visitor cmdArgDeserializingVisitor) VisitGenerateFilesCommand() error {
	args := &core_api_bindings.GenerateFilesArgs{}
	if err := json.Unmarshal(visitor.bytesToDeserialize, args); err != nil {
		return stacktrace.Propagate(err, "An error occurred deserializing the generate files args")
	}
	visitor.deserializedCommandArgs = args
	return nil
}

func (visitor cmdArgDeserializingVisitor) VisitStartServiceCommand() error {
	args := &core_api_bindings.StartServiceArgs{}
	if err := json.Unmarshal(visitor.bytesToDeserialize, args); err != nil {
		return stacktrace.Propagate(err, "An error occurred deserializing the start service args")
	}
	visitor.deserializedCommandArgs = args
	return nil
}

func (visitor cmdArgDeserializingVisitor) VisitRemoveServiceCommand() error {
	args := &core_api_bindings.RemoveServiceArgs{}
	if err := json.Unmarshal(visitor.bytesToDeserialize, args); err != nil {
		return stacktrace.Propagate(err, "An error occurred deserializing the remove service args")
	}
	visitor.deserializedCommandArgs = args
	return nil
}

func (visitor cmdArgDeserializingVisitor) GetDeserializedCommandArgs() interface{} {
	return visitor.deserializedCommandArgs
}

// ====================================================================================================
//                                        Serializable Command
// ====================================================================================================

// Used for serializing
type V0SerializableCommand struct {
	Type V0CommandType `json:"type"`

	// The only allowed objects here are from the bindings generated from the .proto file
	Args interface{}	`json:"args"`
}

// A V0SerializableCommand knows how to deserialize itself, thanks to the "type" tag
func (cmd *V0SerializableCommand) UnmarshalJSON(bytes []byte) error {
	interstitialStruct := struct {
		Type      V0CommandType   `json:"type"`
		ArgsBytes json.RawMessage `json:"args"`
	}{}
	if err := json.Unmarshal(bytes, &interstitialStruct); err != nil {
		return stacktrace.Propagate(err, "An error occurred deserializing the bytes into a command")
	}

	cmdArgDeserializingVisitor := newCmdArgDeserializingVisitor(interstitialStruct.ArgsBytes)
	if err := cmd.Type.AcceptVisitor(cmdArgDeserializingVisitor); err != nil {
		return stacktrace.Propagate(err, "An error occurred accepting the command arg-deserializing visitor")
	}
	cmd.Args = cmdArgDeserializingVisitor.GetDeserializedCommandArgs()

	return nil
}


// ====================================================================================================
//                                   Bulk Commands Package
// ====================================================================================================

type V0BulkCommands struct {
	Commands []V0SerializableCommand `json:"commands"`
}
