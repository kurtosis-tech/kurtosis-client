import * as bindingsJs from '../kurtosis_core_rpc_api_bindings/api_container_service_pb';
import { ServiceID } from './services/service';


export function newGetExecCommandArgs(serviceId: ServiceID, command: string[]): bindingsJs.ExecCommandArgs {
    const result = new bindingsJs.ExecCommandArgs();
    result.setServiceId(serviceId);
    result.setCommandArgsList(command);

    return result;
}

export function newGetGenerateFilesArgs(serviceId: ServiceID, fileGenerationOpts: Map<string, bindingsJs.FileGenerationOptions>): bindingsJs.GenerateFilesArgs {
    const result = new bindingsJs.GenerateFilesArgs();
    result.setServiceId(String(serviceId)); 
    for (let fileID in fileGenerationOpts) { //TODO - changing the following to a const, I'm also certain we don't
        result.getFilesToGenerateMap().set(fileID, fileGenerationOpts[fileID]);
    }
    
    return result;
}

export function newGetLoadStaticFilesArgs(serviceId: ServiceID, staticFilesToCopyStringSet: Map<String, boolean>): bindingsJs.LoadStaticFilesArgs {
    const result = new bindingsJs.LoadStaticFilesArgs();
    result.setServiceId(String(serviceId));
    const staticFilesMap = result.getStaticFilesMap();
    for (let staticFildID in staticFilesToCopyStringSet) { //TODO - changing the following to a const, I'm also certain we don't
        staticFilesMap.set(staticFildID, staticFilesToCopyStringSet[staticFildID]);
    }

    return result;
}