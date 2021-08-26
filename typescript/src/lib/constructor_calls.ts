import { ExecCommandArgs, GenerateFilesArgs, FileGenerationOptions, LoadStaticFilesArgs, LoadLambdaArgs, GetLambdaInfoArgs, RegisterStaticFilesArgs, RegisterFilesArtifactsArgs, GetServiceInfoArgs, PartitionServices, PartitionConnections, PartitionConnectionInfo, RegisterServiceArgs, StartServiceArgs, RemoveServiceArgs, RepartitionArgs, WaitForEndpointAvailabilityArgs, ExecuteBulkCommandsArgs, ExecuteLambdaArgs } from '../kurtosis_core_rpc_api_bindings/api_container_service_pb';
import { ServiceID } from './services/service';
import { PartitionID } from './networks/network_context';
import { LambdaID } from "./modules/lambda_context";
import * as jspb from "google-protobuf";

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
    for (const [fileID, fileGenerationsOptions] of fileGenerationOpts.entries()) {
        result.getFilesToGenerateMap().set(fileID, fileGenerationsOptions);
    }
    
    return result;
}

export function newFileGenerationOptions(): FileGenerationOptions {
    const result: FileGenerationOptions = new FileGenerationOptions();
    result.setFileTypeToGenerate(FileGenerationOptions.FileTypeToGenerate.FILE);

    return result;
}

export function newLoadStaticFilesArgs(serviceId: ServiceID, staticFilesToCopyStringSet: Map<string, boolean>): LoadStaticFilesArgs {
    const result: LoadStaticFilesArgs = new LoadStaticFilesArgs();
    result.setServiceId(String(serviceId));
    const staticFilesMap: jspb.Map<string, boolean> = result.getStaticFilesMap();
    for (const staticFileID of staticFilesToCopyStringSet.keys()) {
        staticFilesMap.set(staticFileID, true);
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
    const staticFilesSetMap: jspb.Map<string, boolean> = result.getStaticFilesSetMap();
    for (const staticFileID of strSet.keys()) {
        staticFilesSetMap.set(staticFileID, true);
    }

    return result;
}

export function newRegisterFilesArtifactsArgs(filesArtifactIdStrsToUrls: Map<string, string>): RegisterFilesArtifactsArgs {
    const result: RegisterFilesArtifactsArgs = new RegisterFilesArtifactsArgs();
    const filesArtifactUrlsMap: jspb.Map<string, string> = result.getFilesArtifactUrlsMap();
    for (const [artifactId, artifactUrl] of filesArtifactIdStrsToUrls.entries()) {
        filesArtifactUrlsMap.set(artifactId, artifactUrl);
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
        usedPorts: Set<string>,
        entrypointArgs: string[],
        cmdArgs: string[],
        dockerEnvVars: Map<string, string>,
        enclaveDataVolMntDirpath: string,
        filesArtifactMountDirpaths: Map<string, string>): StartServiceArgs {
    const result: StartServiceArgs = new StartServiceArgs();
    result.setServiceId(String(serviceId));
    result.setDockerImage(dockerImage);
    const usedPortsMap: jspb.Map<string, boolean> = result.getUsedPortsMap();
    for (const portId of usedPorts) {
        usedPortsMap.set(portId, true);
    }
    const entrypointArgsArray: string[] = result.getEntrypointArgsList();
    for (const entryPoint of entrypointArgs) {
        entrypointArgsArray.push(entryPoint);
    }
    const cmdArgsArray: string[] = result.getCmdArgsList();
    for (const cmdArg of cmdArgs) {
        cmdArgsArray.push(cmdArg);
    }
    const dockerEnvVarArray: jspb.Map<string, string> = result.getDockerEnvVarsMap();
    for (const [name, value] of dockerEnvVars.entries()) {
        dockerEnvVarArray.set(name, value);
    }
    result.setEnclaveDataVolMntDirpath(enclaveDataVolMntDirpath);
    const filesArtificatMountDirpathsMap: jspb.Map<string, string> = result.getFilesArtifactMountDirpathsMap();
    for (const [artifactId, mountDirpath] of filesArtifactMountDirpaths.entries()) {
        filesArtificatMountDirpathsMap.set(artifactId, mountDirpath);
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
    const partitionServicesMap: jspb.Map<string, boolean> = result.getServiceIdSetMap();
    for (const serviceIdStr of serviceIdStrSet) {
        partitionServicesMap.set(serviceIdStr, true);
    }

    return result;
}

export function newRepartitionArgs(
        partitionServices: Map<string, PartitionServices>, 
        partitionConns: Map<string, PartitionConnections>,
        defaultConnection: PartitionConnectionInfo): RepartitionArgs {
    const result: RepartitionArgs = new RepartitionArgs();
    const partitionServicesMap: jspb.Map<string, PartitionServices> = result.getPartitionServicesMap();
    for (const [partitionServiceId, partitionId] of partitionServices.entries()) {
        partitionServicesMap.set(partitionServiceId, partitionId);
    };
    const partitionConnsMap: jspb.Map<string, PartitionConnections> = result.getPartitionConnectionsMap();
    for (const [partitionConnId, partitionConn] of partitionConns.entries()) {
        partitionConnsMap.set(partitionConnId, partitionConn);
    };
    result.setDefaultConnection(defaultConnection);

    return result;
}

export function newPartitionConnections(allConnectionInfo: Map<string, PartitionConnectionInfo>): PartitionConnections {
    const result: PartitionConnections = new PartitionConnections();
    const partitionsMap: jspb.Map<string, PartitionConnectionInfo> = result.getConnectionInfoMap();
    for (const [partitionId, connectionInfo] of allConnectionInfo.entries()) {
        partitionsMap.set(partitionId, connectionInfo);
    }

    return result;
}

export function newWaitForEndpointAvailabilityArgs(
        serviceId: ServiceID,
        httpMethod: WaitForEndpointAvailabilityArgs.HttpMethodMap[keyof WaitForEndpointAvailabilityArgs.HttpMethodMap],
        port: number, 
        path: string,
        requestBody: string,
        initialDelaySeconds: number, 
        retries: number, 
        retriesDelayMilliseconds: number, 
        bodyText: string): WaitForEndpointAvailabilityArgs {
    const result: WaitForEndpointAvailabilityArgs = new WaitForEndpointAvailabilityArgs();
    result.setServiceId(String(serviceId));
    result.setHttpMethod(httpMethod);
    result.setPort(port);
    result.setPath(path);
    result.setRequestBody(requestBody)
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

export function newGetLambdaInfoArgs(lambdaId: LambdaID): GetLambdaInfoArgs {
    const result: GetLambdaInfoArgs = new GetLambdaInfoArgs();
    result.setLambdaId(String(lambdaId));

    return result;
}