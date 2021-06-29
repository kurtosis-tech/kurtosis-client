package v0_bulk_command_api

import "github.com/palantir/stacktrace"

// We provide a visitor interface here so that:
//  1) all enum cases can be exhaustively handled
//  2) any changes in the enum will result in a compile break
type V0CommandTypeVisitor interface {
	VisitRegisterServiceCommand() error
	VisitGenerateFilesCommand() error
	VisitStartServiceCommand() error
	VisitRemoveServiceCommand() error
}

type V0CommandType string
const (
	// vvvvvvvvvvvvvvvvvvvv Update the visitor whenever you add an enum value!!! vvvvvvvvvvvvvvvvvvvvvvvvvvv
	RegisterServiceCommandType V0CommandType = "REGISTER_SERVICE"
	GenerateFilesCommandType				 = "GENERATE_FILES"
	StartServiceCommandType                  = "START_SERVICE"
	RemoveServiceCommandType                 = "REMOVE_SERVICE"
	// TODO repartition
	// TODO exec command
	// ^^^^^^^^^^^^^^^^^^^^ Update the visitor whenever you add an enum value!!! ^^^^^^^^^^^^^^^^^^^^^^^^^^^
)
func (commandType V0CommandType) AcceptVisitor(visitor V0CommandTypeVisitor) error {
	var err error
	switch commandType {
	case RegisterServiceCommandType:
		err = visitor.VisitRegisterServiceCommand()
	case GenerateFilesCommandType:
		err = visitor.VisitGenerateFilesCommand()
	case StartServiceCommandType:
		err = visitor.VisitStartServiceCommand()
	case RemoveServiceCommandType:
		err = visitor.VisitRemoveServiceCommand()
	default:
		return stacktrace.NewError("Unrecognized command type '%v'", commandType)
	}
	if err != nil {
		return stacktrace.Propagate(err, "The visitor returned an error for command type '%v'", commandType)
	}
	return nil
}
