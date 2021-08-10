import { ExecCommandArgs, GenerateFilesArgs, FileGenerationOptions, LoadStaticFilesArgs, LoadLambdaArgs, GetLambdaInfoArgs, RegisterStaticFilesArgs, RegisterFilesArtifactsArgs, GetServiceInfoArgs, PartitionServices, PartitionConnections, PartitionConnectionInfo, RegisterServiceArgs, StartServiceArgs, RemoveServiceArgs, RepartitionArgs, WaitForEndpointAvailabilityArgs, ExecuteBulkCommandsArgs, ExecuteLambdaArgs } from '../kurtosis_core_rpc_api_bindings/api_container_service_pb';
import { ServiceID } from './services/service';
import { PartitionID } from './networks/network_context';
import { LambdaID } from "./modules/lambda_context";

// // ====================================================================================================
// //                                    Service Context
// // ====================================================================================================

export function newExecCommandArgs(serviceId: ServiceID, command: string[]): ExecCommandArgs {
    const result: ExecCommandArgs = new ExecCommandArgs();
    result.setServiceId(serviceId);
    result.setCommandArgsList(command);

    return result;
}

export function newGenerateFilesArgs(serviceId: ServiceID, fileGenerationOpts: Map<string, FileGenerationOptions>): GenerateFilesArgs {
    const result: GenerateFilesArgs = new GenerateFilesArgs();
    result.setServiceId(String(serviceId)); 
    for (let fileID in fileGenerationOpts) {
        result.getFilesToGenerateMap().set(fileID, fileGenerationOpts[fileID]);
    }
    
    return result;
}

export function newFileGenerationOptions(filesToGenerateSet: Set<string>): Map<string, FileGenerationOptions> {
    const result: Map<string, FileGenerationOptions> = new Map();
    for (let fileId in filesToGenerateSet) {
        result[fileId] = new FileGenerationOptions();
        result[fileId].setFileTypeToGenerate(FileGenerationOptions.FileTypeToGenerate.FILE);
    }

    return result;
}

export function newLoadStaticFilesArgs(serviceId: ServiceID, staticFilesToCopyStringSet: Map<String, boolean>): LoadStaticFilesArgs {
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

export function newLoadLambdaArgs(lambdaId: LambdaID, image: string, serializedParams: string): LoadLambdaArgs {
    const result: LoadLambdaArgs = new LoadLambdaArgs();
    result.setLambdaId(String(lambdaId));
    result.setContainerImage(image);
    result.setSerializedParams(serializedParams);

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
    const filesArtifactUrlsMap: Map<string, string> = result.getFilesArtifactUrlsMap();
    for (let fileArtificactID in filesArtifactIdStrsToUrls) {
        filesArtifactUrlsMap.set(fileArtificactID, filesArtifactIdStrsToUrls[fileArtificactID]);
    }
    return result;
}

export function newRegisterServiceArgs(serviceId: ServiceID, partitionId: PartitionID): RegisterServiceArgs {
    const result: RegisterServiceArgs = new RegisterServiceArgs();
    result.setServiceId(String(serviceId));
    result.setPartitionId(String(partitionId));

    return result;
}

export function newStartServiceArgs(
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
            entrypointArgsArray.push(entryPoint);
        }
        const cmdArgsArray: string[] = result.getCmdArgsList();
        for (let cmdArg in cmdArgs) {
            cmdArgsArray.push(cmdArg);
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

export function newGetServiceInfoArgs(serviceId: ServiceID): GetServiceInfoArgs{
    const result: GetServiceInfoArgs = new GetServiceInfoArgs();
    result.setServiceId(String(serviceId));

    return result;
}

export function newRemoveServiceArgs(serviceId: ServiceID, containerStopTimeoutSeconds: number): RemoveServiceArgs {
    const result: RemoveServiceArgs = new RemoveServiceArgs();
    result.setServiceId(serviceId);
    result.setContainerStopTimeoutSeconds(containerStopTimeoutSeconds);

    return result;
}

export function newPartitionServices(serviceIdStrSet: Set<string>): PartitionServices{
    const result: PartitionServices = new PartitionServices();
    const partitionServicesMap: Map<string, boolean> = result.getServiceIdSetMap();
    for (let serviceIdStr in serviceIdStrSet) {
        partitionServicesMap.set(serviceIdStr, true);
    }

    return result;
}

export function newRepartitionArgs(
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

export function newPartitionConnections(partitionAConnsStrMap: Map<string, PartitionConnectionInfo>): PartitionConnections {
    const result: PartitionConnections = new PartitionConnections();
    const partitionsMap: Map<string, PartitionConnectionInfo> = result.getConnectionInfoMap();
    for (let partitionId in partitionAConnsStrMap) {
        partitionsMap.set(partitionId, partitionAConnsStrMap[partitionId]);
    }

    return result;
}

export function newWaitForEndpointAvailabilityArgs(
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

export function newExecuteBulkCommandsArgs(serializedCommands: string): ExecuteBulkCommandsArgs {
    const result: ExecuteBulkCommandsArgs = new ExecuteBulkCommandsArgs();
    result.setSerializedCommands(serializedCommands);

    return result;
}

export function newExecuteLambdaArgs(lamdaId: LambdaID, serializedParams: string): ExecuteLambdaArgs {
    const result: ExecuteLambdaArgs = new ExecuteLambdaArgs();
    result.setLambdaId(String(lamdaId));
    result.setSerializedParams(serializedParams);

    return result;
}

// // ====================================================================================================
// //                                    Bulk Commands
// // ====================================================================================================

export function newEmptyLoadLambdaArgs(): LoadLambdaArgs {
    const result: LoadLambdaArgs = new LoadLambdaArgs();

    return result;
} 

export function newEmptyExecuteLambdaArgs(): ExecuteLambdaArgs {
    const result: ExecuteLambdaArgs = new ExecuteLambdaArgs();

    return result;
} 

export function newEmptyRegisterServiceArgs(): RegisterServiceArgs {
    const result: RegisterServiceArgs = new RegisterServiceArgs();

    return result;
} 

export function newEmptyGenerateFileArgs(): GenerateFilesArgs {
    const result: GenerateFilesArgs = new GenerateFilesArgs();

    return result;
} 

export function newEmptyLoadStaticFilesArgs(): LoadStaticFilesArgs {
    const result: LoadStaticFilesArgs = new LoadStaticFilesArgs();
    
    return result;
}

export function newLambdaInfoArgs(lambdaId: LambdaID): GetLambdaInfoArgs {
    const result: GetLambdaInfoArgs = new GetLambdaInfoArgs();
    result.setLambdaId(String(lambdaId));

    return result;
}

export function newEmptyStartServiceArgs(): StartServiceArgs {
    const result: StartServiceArgs = new StartServiceArgs();

    return result;
}

export function newEmptyRemoveServiceArgs(): RemoveServiceArgs {
    const result: RemoveServiceArgs = new RemoveServiceArgs();

    return result;
}

export function newEmptyRepartitionArgs(): RepartitionArgs {
    const result: RepartitionArgs = new RepartitionArgs();

    return result;
}

export function newEmptyExecCommandArgs(): ExecCommandArgs {
    const result: ExecCommandArgs = new ExecCommandArgs();
    
    return result;
}

export function newEmptyWaitForEndpointAvailabilityArgs(): WaitForEndpointAvailabilityArgs {
    const result: WaitForEndpointAvailabilityArgs = new WaitForEndpointAvailabilityArgs();
    
    return result;
}

export function newEmptyExecuteBulkCommandsArgs(): ExecuteBulkCommandsArgs {
    const result: ExecuteBulkCommandsArgs = new ExecuteBulkCommandsArgs();

    return result;
}
