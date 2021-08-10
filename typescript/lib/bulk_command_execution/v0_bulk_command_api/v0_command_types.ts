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

//export type V0CommandType = string;

// vvvvvvvvvvvvvvvvvvvv Update the visitor whenever you add an enum value!!! vvvvvvvvvvvvvvvvvvvvvvvvvvv
export enum V0CommandType {
	loadLambdaCommandType = "LOAD_LAMBDA",
	executeLambdaCommandType = "EXECUTE_LAMBDA",
	registerServiceCommandType = "REGISTER_SERVICE",
	generateFilesCommandType = "GENERATE_FILES",
	loadStaticFilesCommandType = "LOAD_STATIC_FILES",
	startServiceCommandType = "START_SERVICE",
	removeServiceCommandType = "REMOVE_SERVICE",
	repartitionCommandType = "REPARTITION",
	execCommandCommandType = "EXEC_COMMAND",
	waitForEndpointAvailabilityCommandType = "WAIT_FOR_ENDPOINT_AVAILABILITY",
	executeBulkCommandsCommandType = "EXECUTE_BULK_COMMANDS"
}
// ^^^^^^^^^^^^^^^^^^^^ Update the visitor whenever you add an enum value!!! ^^^^^^^^^^^^^^^^^^^^^^^^^^^

export namespace V0CommandType {
	export function acceptVisitor(commandType: V0CommandType, visitor: V0CommandTypeVisitor): Result<null, Error> { //TODO - could V0CommandType be a parameter or should this be defined as a method inside V0CommandType class (I peronally believe former is good)
		var result: Result<null, Error>;
		var defaultErr: Error = null;
		switch (commandType) {
		case V0CommandType.loadLambdaCommandType:
			result = visitor.visitLoadLambda();
		case V0CommandType.executeLambdaCommandType:
			result = visitor.visitExecuteLambda();
		case V0CommandType.registerServiceCommandType:
			result = visitor.visitRegisterService();
		case V0CommandType.generateFilesCommandType:
			result = visitor.visitGenerateFiles();
		case V0CommandType.loadStaticFilesCommandType:
			result = visitor.visitLoadStaticFiles();
		case V0CommandType.startServiceCommandType:
			result = visitor.visitStartService();
		case V0CommandType.removeServiceCommandType:
			result = visitor.visitRemoveService();
		case V0CommandType.repartitionCommandType:
			result = visitor.visitRepartition();
		case V0CommandType.execCommandCommandType:
			result = visitor.visitExecCommand();
		case V0CommandType.waitForEndpointAvailabilityCommandType:
			result = visitor.visitWaitForEndpointAvailability();
		case V0CommandType.executeBulkCommandsCommandType:
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
}