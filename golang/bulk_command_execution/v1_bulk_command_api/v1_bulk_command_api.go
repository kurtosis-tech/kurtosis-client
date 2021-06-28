package v1_bulk_command_api

import (
	"encoding/json"
	"github.com/kurtosis-tech/kurtosis-client/golang/core_api_bindings"
	"github.com/palantir/stacktrace"
)

type commandType string
const (
	registerServiceCommandType commandType = "REGISTER_SERVICE"
	startServiceCommandType                = "START_SERVICE"
)

// Used for serializing
type SerializableCommand struct {
	Type commandType `json:"type"`

	// The only allowed objects here are from the bindings generated from the .proto file
	Args interface{}	`json:"args"`
}
func (cmd *SerializableCommand) UnmarshalJSON(bytes []byte) error {
	interstitialStruct := struct {
		Type commandType		`json:"type"`
		ArgsBytes json.RawMessage	`json:"args"`
	}{}

	if err := json.Unmarshal(bytes, &interstitialStruct); err != nil {
		return stacktrace.Propagate(err, "An error occurred deserializing the bytes into a SerializableCommand")
	}

	cmd.Type = interstitialStruct.Type
	switch interstitialStruct.Type {
	case registerServiceCommandType:
		args := &core_api_bindings.RegisterServiceArgs{}
		if err := json.Unmarshal(interstitialStruct.ArgsBytes, args); err != nil {
			return stacktrace.Propagate(err, "An error occurred deserializing the register service args")
		}
		cmd.Args = args
	case startServiceCommandType:
		args := &core_api_bindings.StartServiceArgs{}
		if err := json.Unmarshal(interstitialStruct.ArgsBytes, args); err != nil {
			return stacktrace.Propagate(err, "An error occurred deserializing the start service args")
		}
		cmd.Args = args
	// TODO More types
	default:
		return stacktrace.NewError("Unrecognized command type '%v' when deserializing command", interstitialStruct.Type)
	}
	return nil
}

type V1BulkCommands struct {
	Commands []SerializableCommand `json:"commands"`
}

// Visitor for doing logic associated with each command
type V1BulkCommandVisitor interface {
	VisitRegisterServiceCommand(args *core_api_bindings.RegisterServiceArgs) error
	VisitStartServiceCommand(args *core_api_bindings.StartServiceArgs) error
}

type V1BulkCommandAPI struct {}

func NewV1BulkCommandAPI() *V1BulkCommandAPI {
	return &V1BulkCommandAPI{}
}

func (api V1BulkCommandAPI) Serialize(commands V1BulkCommands) ([]byte, error) {
	serialized, err := json.Marshal(commands)
	if err != nil {
		return nil, stacktrace.Propagate(err, "An error occurred serializing the bulk commands")
	}
	return serialized, nil
}

func (api V1BulkCommandAPI) Parse(serialized []byte, visitor V1BulkCommandVisitor) error {
	deserialized := new(V1BulkCommands)
	if err := json.Unmarshal(serialized, &deserialized); err != nil {
		return stacktrace.Propagate(err, "An error occurred deserializing the bulk commands object")
	}

	for idx, command := range deserialized.Commands {
		if err := parseAndExecuteCommand(command, visitor); err != nil {
			return stacktrace.Propagate(err, "An error occurred parsing and executing command #%v", idx)
		}
	}
	return nil
}

func parseAndExecuteCommand(command SerializableCommand, visitor V1BulkCommandVisitor) error {
	// TODO run pre-parser to translate service ID -> IP addresses

	switch command.Type {
	case registerServiceCommandType:
		args, ok := command.Args.(*core_api_bindings.RegisterServiceArgs)
		if !ok {
			return stacktrace.NewError("An error occurred downcasting the generic args object to register service args")
		}
		if err := visitor.VisitRegisterServiceCommand(args); err != nil {
			return stacktrace.Propagate(err, "An error occurred processing the register service command")
		}
	case startServiceCommandType:
		args, ok := command.Args.(*core_api_bindings.StartServiceArgs)
		if !ok {
			return stacktrace.NewError("An error occurred downcasting the generic args object to start service args")
		}
		if err := visitor.VisitStartServiceCommand(args); err != nil {
			return stacktrace.Propagate(err, "An error occurred processing the start service command")
		}
	default:
		return stacktrace.NewError("Unrecognized command type '%v'", command.Type)
	}

	return nil
}
