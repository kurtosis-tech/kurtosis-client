import { ExecCommandArgs, GenerateFilesArgs, FileGenerationOptions, LoadStaticFilesArgs, LoadLambdaArgs, ExecuteLambdaArgs, RegisterServiceArgs, StartServiceArgs, RemoveServiceArgs, RepartitionArgs, WaitForEndpointAvailabilityArgs, ExecuteBulkCommandsArgs } from '../kurtosis_core_rpc_api_bindings/api_container_service_pb';
import { LambdaID } from './modules/lambda_context';
import { ServiceID } from './services/service';


export function newGetExecCommandArgs(serviceId: ServiceID, command: string[]): ExecCommandArgs {
    const result = new ExecCommandArgs();
    result.setServiceId(serviceId);
    result.setCommandArgsList(command);

    return result;
}

export function newGetGenerateFilesArgs(serviceId: ServiceID, fileGenerationOpts: Map<string, FileGenerationOptions>): GenerateFilesArgs {
    const result = new GenerateFilesArgs();
    result.setServiceId(String(serviceId)); 
    for (let fileID in fileGenerationOpts) {
        result.getFilesToGenerateMap().set(fileID, fileGenerationOpts[fileID]);
    }
    
    return result;
}

export function newGetFileGenerationOptions(filesToGenerateSet: Set<string>): Map<string, FileGenerationOptions> {
    const result: Map<string, FileGenerationOptions> = new Map();
    for (let fileId in filesToGenerateSet) {
        result[fileId] = new FileGenerationOptions();
        result[fileId].setFileTypeToGenerate(FileGenerationOptions.FileTypeToGenerate.FILE);
    }

    return result;
}

export function newGetLoadStaticFilesArgs(serviceId: ServiceID, staticFilesToCopyStringSet: Map<String, boolean>): LoadStaticFilesArgs {
    const result = new LoadStaticFilesArgs();
    result.setServiceId(String(serviceId));
    const staticFilesMap = result.getStaticFilesMap();
    for (let staticFildID in staticFilesToCopyStringSet) {
        staticFilesMap.set(staticFildID, staticFilesToCopyStringSet[staticFildID]);
    }

    return result;
}

// // ====================================================================================================
// //                                    Bulk Commands
// // ====================================================================================================

export function newGetEmptyLoadLambdaArgs(): LoadLambdaArgs {
    const result: LoadLambdaArgs = new LoadLambdaArgs();

    return result;
}

export function newGetEmptyExecuteLambdaArgs(): ExecuteLambdaArgs {
    const result: ExecuteLambdaArgs = new ExecuteLambdaArgs();

    return result;
} 

export function newGetEmptyRegisterServiceArgs(): RegisterServiceArgs {
    const result: RegisterServiceArgs = new RegisterServiceArgs();

    return result;
} 

export function newGetEmptyGenerateFileArgs(): GenerateFilesArgs {
    const result: GenerateFilesArgs = new GenerateFilesArgs();

    return result;
} 

export function newGetEmptyLoadStaticFilesArgs(): LoadStaticFilesArgs {
    const result: LoadStaticFilesArgs = new LoadStaticFilesArgs();

    return result;
}

export function newGetEmptyStartServiceArgs(): StartServiceArgs {
    const result: StartServiceArgs = new StartServiceArgs();

    return result;
}

export function newGetEmptyRemoveServiceArgs(): RemoveServiceArgs {
    const result: RemoveServiceArgs = new RemoveServiceArgs();

    return result;
}

export function newGetEmptyRepartitionArgs(): RepartitionArgs {
    const result: RepartitionArgs = new RepartitionArgs();

    return result;
}

export function newGetEmptyExecCommandArgs(): ExecCommandArgs {
    const result: ExecCommandArgs = new ExecCommandArgs();

    return result;
}

export function newGetEmptyWaitForEndpointAvailabilityArgs(): WaitForEndpointAvailabilityArgs {
    const result: WaitForEndpointAvailabilityArgs = new WaitForEndpointAvailabilityArgs();

    return result;
}

export function newGetEmptyExecuteBulkCommandsArgs(): ExecuteBulkCommandsArgs {
    const result: ExecuteBulkCommandsArgs = new ExecuteBulkCommandsArgs();

    return result;
}
