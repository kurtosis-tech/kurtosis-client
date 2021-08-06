// We provide a visitor interface here so that:
//  1) all enum cases can be exhaustively handled
//  2) any changes in the enum will result in a compile break
interface V0CommandTypeVisitor {
	VisitLoadLambda: () => Error;
	VisitExecuteLambda: () => Error;
	VisitRegisterService: () => Error;
	VisitGenerateFiles: () => Error;
	VisitLoadStaticFiles: () => Error;
	VisitStartService: () => Error;
	VisitRemoveService: () => Error;
	VisitRepartition: () => Error;
	VisitExecCommand: () => Error;
	VisitWaitForEndpointAvailability: () => Error;
	VisitExecuteBulkCommands: () => Error;
}

type V0CommandType = string;

// vvvvvvvvvvvvvvvvvvvv Update the visitor whenever you add an enum value!!! vvvvvvvvvvvvvvvvvvvvvvvvvvv
const LoadLambdaCommandType: V0CommandType = "LOAD_LAMBDA";
const ExecuteLambdaCommandType: V0CommandType = "EXECUTE_LAMBDA";
const RegisterServiceCommandType: V0CommandType = "REGISTER_SERVICE";
const GenerateFilesCommandType: V0CommandType = "GENERATE_FILES";
const LoadStaticFilesCommandType: V0CommandType = "LOAD_STATIC_FILES";
const StartServiceCommandType: V0CommandType = "START_SERVICE";
const RemoveServiceCommandType: V0CommandType = "REMOVE_SERVICE";
const RepartitionCommandType: V0CommandType = "REPARTITION";
const ExecCommandCommandType: V0CommandType = "EXEC_COMMAND";
const WaitForEndpointAvailabilityCommandType: V0CommandType = "WAIT_FOR_ENDPOINT_AVAILABILITY";
const ExecuteBulkCommandsCommandType: V0CommandType = "EXECUTE_BULK_COMMANDS";
// ^^^^^^^^^^^^^^^^^^^^ Update the visitor whenever you add an enum value!!! ^^^^^^^^^^^^^^^^^^^^^^^^^^^

function AcceptVisitor(commandType: V0CommandType, visitor: V0CommandTypeVisitor): Error { //TODO - should commandType be a parameter or should this be defined as a method
	var err: Error;
	switch (commandType) {
	case LoadLambdaCommandType:
		err = visitor.VisitLoadLambda();
	case ExecuteLambdaCommandType:
		err = visitor.VisitExecuteLambda();
	case RegisterServiceCommandType:
		err = visitor.VisitRegisterService();
	case GenerateFilesCommandType:
		err = visitor.VisitGenerateFiles();
	case LoadStaticFilesCommandType:
		err = visitor.VisitLoadStaticFiles();
	case StartServiceCommandType:
		err = visitor.VisitStartService();
	case RemoveServiceCommandType:
		err = visitor.VisitRemoveService();
	case RepartitionCommandType:
		err = visitor.VisitRepartition();
	case ExecCommandCommandType:
		err = visitor.VisitExecCommand();
	case WaitForEndpointAvailabilityCommandType:
		err = visitor.VisitWaitForEndpointAvailability();
	case ExecuteBulkCommandsCommandType:
		err = visitor.VisitExecuteBulkCommands();
	default:
		return new Error("Unrecognized command type " + commandType)
	}
	if (err != null) { //TODO - why is this unreachable?
        return err;
	}
	return null;
}
