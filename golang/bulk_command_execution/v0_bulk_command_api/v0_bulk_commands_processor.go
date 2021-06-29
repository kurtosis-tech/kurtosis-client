package v0_bulk_command_api

import (
	"encoding/json"
	"github.com/kurtosis-tech/kurtosis-client/golang/core_api_bindings"
	"github.com/palantir/stacktrace"
)

func Process(serialized []byte, visitor V0BulkCommandVisitor) error {
	deserialized := new(V0BulkCommands)
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

func parseAndExecuteCommand(command V0SerializableCommand, visitor V0BulkCommandVisitor) error {
	// TODO run pre-parser to translate service ID -> IP addresses

	switch command.Type {
	case RegisterServiceCommandType:
		args, ok := command.Args.(*core_api_bindings.RegisterServiceArgs)
		if !ok {
			return stacktrace.NewError("An error occurred downcasting the generic args object to register service args")
		}
		if err := visitor.VisitRegisterServiceCommand(args); err != nil {
			return stacktrace.Propagate(err, "An error occurred processing the register service command")
		}
	case StartServiceCommandType:
		args, ok := command.Args.(*core_api_bindings.StartServiceArgs)
		if !ok {
			return stacktrace.NewError("An error occurred downcasting the generic args object to start service args")
		}
		if err := visitor.VisitStartServiceCommand(args); err != nil {
			return stacktrace.Propagate(err, "An error occurred processing the start service command")
		}
	case RemoveServiceCommandType:
		args, ok := command.Args.(*core_api_bindings.RemoveServiceArgs)
		if !ok {
			return stacktrace.NewError("An error occurred downcasting the generic args object to remove service args")
		}
		if err := visitor.VisitRemoveServiceCommand(args); err != nil {
			return stacktrace.Propagate(err, "An error occurred processing the remove service command")
		}
	default:
		return stacktrace.NewError("Unrecognized command type '%v'", command.Type)
	}

	return nil
}
