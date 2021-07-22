import * as bindingsJs from '../kurtosis_core_rpc_api_bindings/api_container_service_pb'; //TODO (comment) - I cannont merge with above line unfortunately, can only import one module at a time MAXIMUM
import { ServiceID } from './services/service';


export function newGetExecCommandArgs(serviceId: ServiceID, command: string[]): bindingsJs.ExecCommandArgs {
    let result = new bindingsJs.ExecCommandArgs(); //TODO (comment) - this was also a pointer
    result.setServiceId(serviceId);
    result.setCommandArgsList(command);

    return result;
}

export function newGetGenerateFilesArgs(serviceId: ServiceID, fileGenerationOpts: Map<string, bindingsJs.FileGenerationOptions>): bindingsJs.GenerateFilesArgs {
    let result = new bindingsJs.GenerateFilesArgs(); //TODO (comment) this was a pointer
    result.setServiceId(String(serviceId)); 
    for (let fileID in fileGenerationOpts) { // TODO - make sure this is an okay way to use instatiate the setter
        result.getFilesToGenerateMap().set(fileID, fileGenerationOpts[fileID]);
    }
    
    return result;
}

export function newGetLoadStaticFilesArgs(serviceId: ServiceID, staticFilesToCopyStringSet: Map<String, boolean>): bindingsJs.LoadStaticFilesArgs {
    let result = new bindingsJs.LoadStaticFilesArgs(); //TODO - (comment) pointer
    result.setServiceId(String(serviceId));
    for (let staticFildID in staticFilesToCopyStringSet) {
        result.getStaticFilesMap().set(staticFildID, staticFilesToCopyStringSet[staticFildID]) //TODO TODO TODO - how to do this line
    }

    return result;
}