package v0_bulk_command_api

import (
	"encoding/json"
	"github.com/kurtosis-tech/kurtosis-client/golang/core_api_bindings"
	"github.com/palantir/stacktrace"
)

type V0CommandType string
const (
	RegisterServiceCommandType V0CommandType = "REGISTER_SERVICE"
	StartServiceCommandType                  = "START_SERVICE"
	RemoveServiceCommandType                 = "REMOVE_SERVICE"
	// TODO Generate files
	// TODO repartition
	// TODO exec command
)

type V0BulkCommands struct {
	Commands []V0SerializableCommand `json:"commands"`
}

// Used for serializing
type V0SerializableCommand struct {
	Type V0CommandType `json:"type"`

	// The only allowed objects here are from the bindings generated from the .proto file
	Args interface{}	`json:"args"`
}
func (cmd *V0SerializableCommand) UnmarshalJSON(bytes []byte) error {
	interstitialStruct := struct {
		Type      V0CommandType   `json:"type"`
		ArgsBytes json.RawMessage `json:"args"`
	}{}

	if err := json.Unmarshal(bytes, &interstitialStruct); err != nil {
		return stacktrace.Propagate(err, "An error occurred deserializing the bytes into a command")
	}

	cmd.Type = interstitialStruct.Type
	switch interstitialStruct.Type {
	case RegisterServiceCommandType:
		args := &core_api_bindings.RegisterServiceArgs{}
		if err := json.Unmarshal(interstitialStruct.ArgsBytes, args); err != nil {
			return stacktrace.Propagate(err, "An error occurred deserializing the register service args")
		}
		cmd.Args = args
	case StartServiceCommandType:
		args := &core_api_bindings.StartServiceArgs{}
		if err := json.Unmarshal(interstitialStruct.ArgsBytes, args); err != nil {
			return stacktrace.Propagate(err, "An error occurred deserializing the start service args")
		}
		cmd.Args = args
	case RemoveServiceCommandType:
		args := &core_api_bindings.RemoveServiceArgs{}
		if err := json.Unmarshal(interstitialStruct.ArgsBytes, args); err != nil {
			return stacktrace.Propagate(err, "An error occurred deserializing the remove service args")
		}
		cmd.Args = args
	default:
		return stacktrace.NewError("Unrecognized command type '%v' when deserializing command", interstitialStruct.Type)
	}
	return nil
}