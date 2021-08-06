import { ExecCommandArgs, GenerateFilesArgs, FileGenerationOptions, LoadStaticFilesArgs, LoadLambdaArgs, GetLambdaInfoArgs, RegisterStaticFilesArgs, RegisterFilesArtifactsArgs, RegisterServiceArgs, StartServiceArgs, GetServiceInfoArgs, RemoveServiceArgs, PartitionServices, PartitionConnections, PartitionConnectionInfo, RepartitionArgs, WaitForEndpointAvailabilityArgs, ExecuteBulkCommandsArgs, ExecuteLambdaArgs } from '../kurtosis_core_rpc_api_bindings/api_container_service_pb'; //TODO - potentially change to asterisk since many imports
import { ServiceID } from './services/service';
import { PartitionID } from './networks/network_context';
import { LambdaID } from "./modules/lambda_context";

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
    result.setLambdaId(String(lambdaId)); //TODO - String(lambdaId) VS <string>lambdaId for type assertions (also seen "as")

    return result;
}

export function newGetRegisterStaticFilesArgs(strSet: Map<string, boolean>): RegisterStaticFilesArgs {
    const result: RegisterStaticFilesArgs = new RegisterStaticFilesArgs();
    const staticFilesSetMap: Map<string, boolean> = result.getStaticFilesSetMap();
    for (let staticFileID in strSet) {
        staticFilesSetMap.set(staticFileID, strSet[staticFileID]);
    }

    return result;
}

export function newGetRegisterFilesArtifactsArgs(filesArtifactIdStrsToUrls: Map<string, string>): RegisterFilesArtifactsArgs {
    const result: RegisterFilesArtifactsArgs = new RegisterFilesArtifactsArgs();
    const filesArtifactUrlsMap: Map<string, string> = result.getFilesArtifactUrlsMap();
    for (let fileArtificactID in filesArtifactUrlsMap) {
        filesArtifactUrlsMap.set(fileArtificactID, filesArtifactUrlsMap[fileArtificactID]);
    }
    return result;
}

export function newGetRegisterServiceArgs(serviceId: ServiceID, partitionId: PartitionID): RegisterServiceArgs {
    const result: RegisterServiceArgs = new RegisterServiceArgs();
    result.setServiceId(<string>serviceId);
    result.setPartitionId(<string>partitionId);

    return result;
}

export function newGetStartServiceArgs(
    serviceId: ServiceID, 
    dockerImage: string,
    usedPorts: Map<string, boolean>,
    entrypointArgs: string[],
    cmdArgs: string[],
    dockerEnvVars: Map<string, string>,
    enclaveDataVolMntDirpath: string,
    filesArtifactMountDirpaths: Map<string, string>): StartServiceArgs {
        const result: StartServiceArgs = new StartServiceArgs();
        result.setServiceId(String(serviceId));
        result.setDockerImage(dockerImage);
        const usedPortsMap: Map<string, boolean> = result.getUsedPortsMap();
        for (let portId in usedPorts) {
            usedPortsMap.set(portId, usedPorts[portId]);
        }
        const entrypointArgsArray: string[] = result.getEntrypointArgsList();
        for (let entryPoint in entrypointArgs) {
            entrypointArgsArray.push(entryPoint); //TODO - is this safe, considering arrays are fixed sized
        }
        const cmdArgsArray: string[] = result.getCmdArgsList();
        for (let cmdArg in cmdArgs) {
            cmdArgsArray.push(cmdArg); //TODO - is this safe, considering arrays are fixed sized
        }
        const dockerEnvVarArray: string[] = result.getDockerEnvVarsMap();
        for (let dockerEnvId in dockerEnvVars) {
            cmdArgsArray.push(dockerEnvId, dockerEnvVars[dockerEnvId]);
        }
        result.setEnclaveDataVolMntDirpath(enclaveDataVolMntDirpath);
        const filesArtificatMountDirpathsMap: Map<string, string> = result.getFilesArtifactMountDirpathsMap();
        for (let filesArtifactMountDirpathId in filesArtifactMountDirpaths) {
            filesArtificatMountDirpathsMap.set(filesArtifactMountDirpathId, filesArtifactMountDirpaths[filesArtifactMountDirpathId]);
        }

        return result;
}

export function newGetGetServiceInfoArgs(serviceId: ServiceID): GetServiceInfoArgs{
    const result: GetServiceInfoArgs = new GetServiceInfoArgs();
    result.setServiceId(String(serviceId));

    return result;
}

export function newGetRemoveServiceArgs(serviceId: ServiceID, containerStopTimeoutSeconds: number): RemoveServiceArgs {
    const result: RemoveServiceArgs = new RemoveServiceArgs();
    result.setServiceId(serviceId);
    result.setContainerStopTimeoutSeconds(containerStopTimeoutSeconds);

    return result;
}

export function newGetPartitionServices(serviceIdStrSet: Set<string>): PartitionServices{
    const result: PartitionServices = new PartitionServices();
    const partitionServicesMap: Map<string, boolean> = result.getServiceIdSetMap();
    for (let serviceIdStr in serviceIdStrSet) {
        partitionServicesMap.set(serviceIdStr, true); //TODO - make sure this is correct
    }

    return result;
}

export function newGetPartitionConnections(partitionAConnsStrMap: Map<string, PartitionConnectionInfo>): PartitionConnections {
    const result: PartitionConnections = new PartitionConnections();
    const partitionsMap: Map<string, PartitionConnectionInfo> = result.getConnectionInfoMap();
    for (let partitionId in partitionAConnsStrMap) {
        partitionsMap.set(partitionId, partitionAConnsStrMap[partitionId]);
    }

    return result;
}

export function newGetRepartitionArgs(
    partitionServices: Map<string, PartitionServices>, 
    partitionConns: Map<string, PartitionConnections>,
    defaultConnection: PartitionConnectionInfo): RepartitionArgs {
    const result: RepartitionArgs = new RepartitionArgs();
    const partitionServicesMap: Map<PartitionID, Map<ServiceID, boolean>> = new Map();
    for (let partitionServiceId in partitionServices) {
        partitionServicesMap.set(partitionServiceId, partitionServices[partitionServiceId]);
    };
    const partitionConnsMap: Map<PartitionID, Map<PartitionID, PartitionConnectionInfo>> = new Map();
    for (let partitionConnId in partitionConns) {
        partitionConnsMap.set(partitionConnId, partitionConns[partitionConnId]);
    };
    result.setDefaultConnection(defaultConnection);

    return result;
}

export function newGetWaitForEndpointAvailabilityArgs(
    serviceId: ServiceID,
    port: number, 
    path: string, 
    initialDelaySeconds: number, 
    retries: number, 
    retriesDelayMilliseconds: number, 
    bodyText: string): WaitForEndpointAvailabilityArgs {
        const result: WaitForEndpointAvailabilityArgs = new WaitForEndpointAvailabilityArgs();
        result.setServiceId(String(serviceId));
        result.setPort(port);
        result.setPath(path);
        result.setInitialDelaySeconds(initialDelaySeconds);
        result.setRetries(retries);
        result.setRetriesDelayMilliseconds(retriesDelayMilliseconds);
        result.setBodyText(bodyText);

        return result;
}

export function newGetExecuteBulkCommandsArgs(serializedCommands: string): ExecuteBulkCommandsArgs {
    const result: ExecuteBulkCommandsArgs = new ExecuteBulkCommandsArgs();
    result.setSerializedCommands(serializedCommands);

    return result;
}

export function newGetExecuteLambdaArgs(lamdaId: LambdaID, serializedParams: string): ExecuteLambdaArgs {
    const result: ExecuteLambdaArgs = new ExecuteLambdaArgs();
    result.setLambdaId(String(lamdaId));
    result.setSerializedParams(serializedParams);

    return result;
}