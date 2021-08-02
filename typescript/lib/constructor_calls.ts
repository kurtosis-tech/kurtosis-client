import { ExecCommandArgs, GenerateFilesArgs, FileGenerationOptions, LoadStaticFilesArgs, LoadLambdaArgs, GetLambdaInfoArgs, RegisterStaticFilesArgs, RegisterFilesArtifactsArgs} from '../kurtosis_core_rpc_api_bindings/api_container_service_pb';
import { ServiceID } from './services/service';
import { LambdaID, LambdaContext } from "./modules/lambda_context";

// // ====================================================================================================
// //                                    Service Context
// // ====================================================================================================

export function newGetExecCommandArgs(serviceId: ServiceID, command: string[]): ExecCommandArgs {
    const result: ExecCommandArgs = new ExecCommandArgs();
    result.setServiceId(serviceId);
    result.setCommandArgsList(command);

    return result;
}

export function newGetGenerateFilesArgs(serviceId: ServiceID, fileGenerationOpts: Map<string, FileGenerationOptions>): GenerateFilesArgs {
    const result: GenerateFilesArgs = new GenerateFilesArgs();
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
    const result: LoadStaticFilesArgs = new LoadStaticFilesArgs();
    result.setServiceId(String(serviceId));
    const staticFilesMap = result.getStaticFilesMap();
    for (let staticFildID in staticFilesToCopyStringSet) {
        staticFilesMap.set(staticFildID, staticFilesToCopyStringSet[staticFildID]);
    }

    return result;
} 

// // ====================================================================================================
// //                                    Network Context
// // ====================================================================================================

export function newGetLoadLambdaArgs(lambdaId: LambdaID, image: string, serializedParams: string): LoadLambdaArgs {
    const result: LoadLambdaArgs = new LoadLambdaArgs();
    result.setLambdaId(String(lambdaId));
    result.setContainerImage(image);
    result.setSerializedParams(serializedParams);

    return result;
}

export function newGetLambdaInfoArgs(lambdaId: LambdaID): GetLambdaInfoArgs {
    const result: GetLambdaInfoArgs = new GetLambdaInfoArgs();
    result.setLambdaId(String(lambdaId));

    return result;
}

export function newRegisterStaticFilesArgs(strSet: Map<string, boolean>): RegisterStaticFilesArgs {
    const result: RegisterStaticFilesArgs = new RegisterStaticFilesArgs();
    const staticFilesSetMap: Map<string, boolean> = result.getStaticFilesSetMap();
    for (let staticFileID in strSet) {
        staticFilesSetMap.set(staticFileID, strSet[staticFileID]);
    }

    return result;
}

export function newRegisterFilesArtifactsArgs(filesArtifactIdStrsToUrls: Map<string, string>): RegisterFilesArtifactsArgs {
    const result: RegisterFilesArtifactsArgs = new RegisterFilesArtifactsArgs();
    const filesArtifactUrlsMap = result.getFilesArtifactUrlsMap();
    for (let fileArtificactID in filesArtifactUrlsMap) {
        filesArtifactUrlsMap.set(fileArtificactID, filesArtifactUrlsMap[fileArtificactID]);
    }
    return result;
}