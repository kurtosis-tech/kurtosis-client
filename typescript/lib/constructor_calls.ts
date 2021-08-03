import { ExecCommandArgs, GenerateFilesArgs, FileGenerationOptions, LoadStaticFilesArgs } from '../kurtosis_core_rpc_api_bindings/api_container_service_pb';
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