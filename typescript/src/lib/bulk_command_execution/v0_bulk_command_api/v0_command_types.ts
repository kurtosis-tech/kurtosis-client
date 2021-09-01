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

// vvvvvvvvvvvvvvvvvvvv Update the visitor whenever you add an enum value!!! vvvvvvvvvvvvvvvvvvvvvvvvvvv
export enum V0CommandType {
	LoadLambda = "LOAD_LAMBDA",
	ExecuteLambda = "EXECUTE_LAMBDA",
	RegisterService = "REGISTER_SERVICE",
	GenerateFiles = "GENERATE_FILES",
	LoadStaticFiles = "LOAD_STATIC_FILES",
	StartService = "START_SERVICE",
	RemoveService = "REMOVE_SERVICE",
	Repartition = "REPARTITION",
	ExecCommand = "EXEC_COMMAND",
	WaitForEndpointAvailability = "WAIT_FOR_ENDPOINT_AVAILABILITY",
	ExecuteBulkCommands = "EXECUTE_BULK_COMMANDS"
}
// ^^^^^^^^^^^^^^^^^^^^ Update the visitor whenever you add an enum value!!! ^^^^^^^^^^^^^^^^^^^^^^^^^^^

export namespace V0CommandType {
	export function acceptVisitor(commandType: V0CommandType, visitor: V0CommandTypeVisitor): Result<null, Error> {
		let result: Result<null, Error>;
		switch (commandType) {
			case V0CommandType.LoadLambda:
				result = visitor.visitLoadLambda();
				break;
			case V0CommandType.ExecuteLambda:
				result = visitor.visitExecuteLambda();
				break;
			case V0CommandType.RegisterService:
				result = visitor.visitRegisterService();
				break;
			case V0CommandType.GenerateFiles:
				result = visitor.visitGenerateFiles();
				break;
			case V0CommandType.LoadStaticFiles:
				result = visitor.visitLoadStaticFiles();
				break;
			case V0CommandType.StartService:
				result = visitor.visitStartService();
				break;
			case V0CommandType.RemoveService:
				result = visitor.visitRemoveService();
				break;
			case V0CommandType.Repartition:
				result = visitor.visitRepartition();
				break;
			case V0CommandType.ExecCommand:
				result = visitor.visitExecCommand();
				break;
			case V0CommandType.WaitForEndpointAvailability:
				result = visitor.visitWaitForEndpointAvailability();
				break;
			case V0CommandType.ExecuteBulkCommands:
				result = visitor.visitExecuteBulkCommands();
				break;
			default:
				return err(new Error("Unrecognized command type " + commandType));
		}
		if (!result.isOk()) {
			return err(result.error);
		}
		return ok(null);
	}
}
