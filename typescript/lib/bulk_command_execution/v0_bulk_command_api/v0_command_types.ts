import { ok, err, Result } from "neverthrow";

// We provide a visitor interface here so that:
//  1) all enum cases can be exhaustively handled
//  2) any changes in the enum will result in a compile break
export interface V0CommandTypeVisitor {
	visitLoadLambda: () => Result<null, Error>;
	visitExecuteLambda: () => Result<null, Error>;
	visitRegisterService: () => Result<null, Error>;
	visitGenerateFiles: () => Result<null, Error>;
	visitLoadStaticFiles: () => Result<null, Error>;
	visitStartService: () => Result<null, Error>;
	visitRemoveService: () => Result<null, Error>;
	visitRepartition: () => Result<null, Error>;
	visitExecCommand: () => Result<null, Error>;
	visitWaitForEndpointAvailability: () => Result<null, Error>;
	visitExecuteBulkCommands: () => Result<null, Error>;
}

export type V0CommandType = string;

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

export function acceptVisitor(commandType: V0CommandType, visitor: V0CommandTypeVisitor): Result<null, Error> { //TODO - could V0CommandType be a parameter or should this be defined as a method inside V0CommandType class (I peronally believe former is good)
	var result: Result<null, Error>;
    var defaultErr: Error = null;
	switch (commandType) {
	case loadLambdaCommandType:
		result = visitor.visitLoadLambda();
	case executeLambdaCommandType:
		result = visitor.visitExecuteLambda();
	case registerServiceCommandType:
		result = visitor.visitRegisterService();
	case generateFilesCommandType:
		result = visitor.visitGenerateFiles();
	case loadStaticFilesCommandType:
		result = visitor.visitLoadStaticFiles();
	case startServiceCommandType:
		result = visitor.visitStartService();
	case removeServiceCommandType:
		result = visitor.visitRemoveService();
	case repartitionCommandType:
		result = visitor.visitRepartition();
	case execCommandCommandType:
		result = visitor.visitExecCommand();
	case waitForEndpointAvailabilityCommandType:
		result = visitor.visitWaitForEndpointAvailability();
	case executeBulkCommandsCommandType:
		result = visitor.visitExecuteBulkCommands();
	default:
		defaultErr = new Error("Unrecognized command type " + commandType)
	}
	if (defaultErr !== null) {
		return err(defaultErr);
    }
    if (!result.isOk()) {
        return err(result.error);
	}
	return ok(null);
}
