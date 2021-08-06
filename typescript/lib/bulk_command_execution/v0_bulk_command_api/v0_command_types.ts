// We provide a visitor interface here so that:
//  1) all enum cases can be exhaustively handled
//  2) any changes in the enum will result in a compile break
interface V0CommandTypeVisitor {
	visitLoadLambda: () => Error;
	visitExecuteLambda: () => Error;
	visitRegisterService: () => Error;
	visitGenerateFiles: () => Error;
	visitLoadStaticFiles: () => Error;
	visitStartService: () => Error;
	visitRemoveService: () => Error;
	visitRepartition: () => Error;
	visitExecCommand: () => Error;
	visitWaitForEndpointAvailability: () => Error;
	visitExecuteBulkCommands: () => Error;
}

type V0CommandType = string;

// vvvvvvvvvvvvvvvvvvvv Update the visitor whenever you add an enum value!!! vvvvvvvvvvvvvvvvvvvvvvvvvvv
const loadLambdaCommandType: V0CommandType = "LOAD_LAMBDA";
const executeLambdaCommandType: V0CommandType = "EXECUTE_LAMBDA";
const registerServiceCommandType: V0CommandType = "REGISTER_SERVICE";
const generateFilesCommandType: V0CommandType = "GENERATE_FILES";
const loadStaticFilesCommandType: V0CommandType = "LOAD_STATIC_FILES";
const startServiceCommandType: V0CommandType = "START_SERVICE";
const removeServiceCommandType: V0CommandType = "REMOVE_SERVICE";
const repartitionCommandType: V0CommandType = "REPARTITION";
const execCommandCommandType: V0CommandType = "EXEC_COMMAND";
const waitForEndpointAvailabilityCommandType: V0CommandType = "WAIT_FOR_ENDPOINT_AVAILABILITY";
const executeBulkCommandsCommandType: V0CommandType = "EXECUTE_BULK_COMMANDS";
// ^^^^^^^^^^^^^^^^^^^^ Update the visitor whenever you add an enum value!!! ^^^^^^^^^^^^^^^^^^^^^^^^^^^

function AcceptVisitor(commandType: V0CommandType, visitor: V0CommandTypeVisitor): Error { //TODO - could commandType be a parameter or should this be defined as a method
	var err: Error;
	switch (commandType) {
	case loadLambdaCommandType:
		err = visitor.visitLoadLambda();
	case executeLambdaCommandType:
		err = visitor.visitExecuteLambda();
	case registerServiceCommandType:
		err = visitor.visitRegisterService();
	case generateFilesCommandType:
		err = visitor.visitGenerateFiles();
	case loadStaticFilesCommandType:
		err = visitor.visitLoadStaticFiles();
	case startServiceCommandType:
		err = visitor.visitStartService();
	case removeServiceCommandType:
		err = visitor.visitRemoveService();
	case repartitionCommandType:
		err = visitor.visitRepartition();
	case execCommandCommandType:
		err = visitor.visitExecCommand();
	case waitForEndpointAvailabilityCommandType:
		err = visitor.visitWaitForEndpointAvailability();
	case executeBulkCommandsCommandType:
		err = visitor.visitExecuteBulkCommands();
	default:
		return new Error("Unrecognized command type " + commandType)
	}
	//TODO - unreachable code from golang - REMOVE
    // if (err != null) { //TODO - this is probably not needed
    //     return err;
	// }
	// return null; //TODO - But this should still be required
}
