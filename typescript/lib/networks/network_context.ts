/*
 * Copyright (c) 2020 - present Kurtosis Technologies LLC.
 * All Rights Reserved.
 */

import { ApiContainerServiceClient } from "../..//kurtosis_core_rpc_api_bindings/api_container_service_grpc_pb";
import { LoadLambdaArgs, GetLambdaInfoArgs, RegisterStaticFilesArgs, RegisterStaticFilesResponse, RegisterFilesArtifactsArgs, PortBinding, RegisterServiceArgs, RegisterServiceResponse, StartServiceArgs, GetServiceInfoArgs, GetServiceInfoResponse, RemoveServiceArgs, PartitionConnectionInfo, PartitionServices, PartitionConnections, RepartitionArgs, WaitForEndpointAvailabilityArgs, ExecuteBulkCommandsArgs, StartServiceResponse, GetLambdaInfoResponse } from "../..//kurtosis_core_rpc_api_bindings/api_container_service_pb";
import { LambdaID, LambdaContext } from "../modules/lambda_context";
import { ServiceID } from "../services/service";
import { ServiceContext, GeneratedFileFilepaths } from "../services/service_context";
import { StaticFileID, FilesArtifactID, ContainerCreationConfig } from "../services/container_creation_config"; 
import { ContainerRunConfig } from "../services/container_run_config";
import { newLoadLambdaArgs, newLambdaInfoArgs, newRegisterStaticFilesArgs, newRegisterFilesArtifactsArgs, newRegisterServiceArgs, newStartServiceArgs, newGetServiceInfoArgs, newRemoveServiceArgs, newPartitionServices, newPartitionConnections, newRepartitionArgs, newWaitForEndpointAvailabilityArgs, newExecuteBulkCommandsArgs } from "../constructor_calls";
import { okAsync, errAsync, ResultAsync, ok, err, Result } from "neverthrow";
import * as log from "loglevel";
import * as path from "path";
import * as fs from 'fs';
import * as fsPromises from "fs/promises";
import * as grpc from "grpc";
import * as google_protobuf_empty_pb from "google-protobuf/google/protobuf/empty_pb";

export type PartitionID = string;

// This will always resolve to the default partition ID (regardless of whether such a partition exists in the network,
//  or it was repartitioned away)
const defaultPartitionId: PartitionID = "";

// Docs available at https://docs.kurtosistech.com/kurtosis-libs/lib-documentation
class NetworkContext {
	private readonly client: ApiContainerServiceClient;

	// The location on the filesystem where this code is running where the enclave data volume is mounted
	private readonly enclaveDataVolMountpoint: string;


    /*
    Creates a new NetworkContext object with the given parameters.
    */
    constructor(
            client: ApiContainerServiceClient,
            enclaveDataVolMountpoint: string) {
                this.client = client;
                this.enclaveDataVolMountpoint = enclaveDataVolMountpoint;
    }

    // Docs available at https://docs.kurtosistech.com/kurtosis-libs/lib-documentation
    public async loadLambda(
            lambdaId: LambdaID,
            image: string,
            serializedParams: string): Promise<Result<LambdaContext, Error>> {
        const args: LoadLambdaArgs = newLoadLambdaArgs(lambdaId, image, serializedParams);
        
        const promiseLoadLambda: Promise<ResultAsync<google_protobuf_empty_pb, Error>> = new Promise((resolve, _unusedReject) => {
            this.client.loadLambda(args, (error: grpc.ServiceError, response: google_protobuf_empty_pb) => {
                if (error === null) {
                    resolve(okAsync(response));
                } else {
                    resolve(errAsync(error));
                }
            })
        });
        const resultLoadLambda: Result<google_protobuf_empty_pb, Error> = await promiseLoadLambda;
        if (!resultLoadLambda.isOk()) {
            return err(resultLoadLambda.error);
        }

        const moduleCtx: LambdaContext = new LambdaContext(this.client, lambdaId);
        return ok(moduleCtx);
    }

    // Docs available at https://docs.kurtosistech.com/kurtosis-libs/lib-documentation
    public async getLambdaContext(lambdaId: LambdaID): Promise<Result<LambdaContext, Error>> {
        const args: GetLambdaInfoArgs = newLambdaInfoArgs(lambdaId);
        
        const promiseGetLambdaInfo: Promise<ResultAsync<GetLambdaInfoResponse, Error>> = new Promise((resolve, _unusedReject) => {
            this.client.getLambdaInfo(args, (error: grpc.ServiceError, response: GetLambdaInfoResponse) => {
                if (error === null) {
                    resolve(okAsync(response));
                } else {
                    resolve(errAsync(error));
                }
            })
        });
        const resultGetLambdaInfo: Result<GetLambdaInfoResponse, Error> = await promiseGetLambdaInfo;
        if (!resultGetLambdaInfo.isOk()) {
            return err(resultGetLambdaInfo.error);
        }

        const lambdaCtx: LambdaContext = new LambdaContext(this.client, lambdaId);
        return ok(lambdaCtx);
    }

    // Docs available at https://docs.kurtosistech.com/kurtosis-libs/lib-documentation
    public async registerStaticFiles(staticFileFilepaths: Map<StaticFileID, string>): Promise<Result<null, Error>> {
        const strSet: Map<string, boolean> = new Map();
        for (let [staticFileId, srcAbsFilepath] of staticFileFilepaths.entries()) {
            
            // Sanity-check that the source filepath exists
            const promiseSrcAbsFilepath: Promise<fs.Stats> = fsPromises.stat(srcAbsFilepath);
            promiseSrcAbsFilepath.catch(() => { 
                return err(new Error("Source filepath " + srcAbsFilepath + " associated with static file " + staticFileId + " doesn't exist")); 
            })
            
            strSet[String(staticFileId)] = true;
        }

        const args: RegisterStaticFilesArgs = newRegisterStaticFilesArgs(strSet);
        
        const promiseRegisterStaticFiles: Promise<ResultAsync<RegisterStaticFilesResponse, Error>> = new Promise((resolve, _unusedReject) => {
            this.client.registerStaticFiles(args, (error: grpc.ServiceError, response: RegisterStaticFilesResponse) => {
                if (error === null) {
                    resolve(okAsync(response));
                } else {
                    resolve(errAsync(error));
                }
            })
        });
        const resultRegisterStaticFiles: Result<RegisterStaticFilesResponse, Error> = await promiseRegisterStaticFiles;
        if (!resultRegisterStaticFiles.isOk()) {
            return err(resultRegisterStaticFiles.error);
        }
        const resp: RegisterStaticFilesResponse = resultRegisterStaticFiles.value;

        const staticFileDestRelativeFilepathsMap: Map<string, string> = resp.getStaticFileDestRelativeFilepathsMap();
        for (let [staticFileIdStr, destFilepathRelativeToEnclaveVolRoot] of staticFileDestRelativeFilepathsMap.entries()) {

            const staticFileId: StaticFileID = <StaticFileID>(staticFileIdStr);

            if (!staticFileFilepaths.has(staticFileId)) {
                return err(new Error("No source filepath found for static file " + staticFileId + "; this is a bug in Kurtosis"));
            }
            const srcAbsFilepath: string = staticFileFilepaths[staticFileId];

            const destAbsFilepath: string = path.join(this.enclaveDataVolMountpoint, destFilepathRelativeToEnclaveVolRoot);
            
            const promiseDestAbsFilepath: Promise<fs.Stats> = fsPromises.stat(destAbsFilepath);
            promiseDestAbsFilepath.catch(() => { 
                return err(new Error("The Kurtosis API asked us to copy static file " + staticFileId + " to path " + destFilepathRelativeToEnclaveVolRoot + 
                " in the enclave volume which means that an empty file should exist there, " + "but no file exists at that path - this is a bug in Kurtosis!"));
            })

            
            var srcFp: number;
            var destFp: number;
            try { //TODO (comment) - finally block meant to duplicate defer functionality
                
                const promiseSrcFp: Promise<fsPromises.FileHandle> = fsPromises.open(srcAbsFilepath, 'r');
                promiseSrcFp.catch(error => { 
                    return err(error); 
                })
                const resultSrcFp: fsPromises.FileHandle = await promiseSrcFp;
                srcFp = resultSrcFp.fd;
                
                const promiseDestFp: Promise<fsPromises.FileHandle> = fsPromises.open(destAbsFilepath, 'w');
                promiseDestFp.catch(error => { 
                    return err(error); 
                })
                const resultDestFp: fsPromises.FileHandle = await promiseSrcFp;
                destFp = resultDestFp.fd;
    
                const promiseCopyFile: Promise<void> = fsPromises.copyFile(srcAbsFilepath, destAbsFilepath);
                promiseCopyFile.catch(error => { 
                    return err(error); 
                })
            }   
            finally {
                fs.close(srcFp);
                fs.close(destFp)
            }

        }
        return ok(null);
    }

    // Docs available at https://docs.kurtosistech.com/kurtosis-libs/lib-documentation
    public async registerFilesArtifacts(filesArtifactUrls: Map<FilesArtifactID, string>): Promise<Result<null,Error>> {
        const filesArtifactIdStrsToUrls: Map<string, string> = new Map();
        for (let [artifactId, url] of filesArtifactUrls.entries()) {
            filesArtifactIdStrsToUrls[String(artifactId)] = url;
        }
        const args: RegisterFilesArtifactsArgs = newRegisterFilesArtifactsArgs(filesArtifactIdStrsToUrls);
        
        const promiseRegisterFilesArtifacts: Promise<ResultAsync<google_protobuf_empty_pb, Error>> = new Promise((resolve, _unusedReject) => {
            this.client.registerFilesArtifacts(args, (error: grpc.ServiceError, response: google_protobuf_empty_pb) => {
                if (error === null) {
                    resolve(okAsync(response));
                } else {
                    resolve(errAsync(error));
                }
            })
        });
        const resultRegisterFilesArtifacts: Result<google_protobuf_empty_pb, Error> = await promiseRegisterFilesArtifacts;
        if (!resultRegisterFilesArtifacts.isOk()) {
            return err(resultRegisterFilesArtifacts.error);
        }

        return ok(null);
    }

    // Docs available at https://docs.kurtosistech.com/kurtosis-libs/lib-documentation
    public async addService(
        serviceId: ServiceID,
        containerCreationConfig: ContainerCreationConfig,
        generateRunConfigFunc: (ipAddr: string, generatedFileFilepaths: Map<string, string>, staticFileFilepaths: Map<StaticFileID, string>) => [ContainerRunConfig, Error]
    ): Promise<Result<[ServiceContext, Map<string, PortBinding>], Error>> {

        const resultAddServiceToPartition: Result<[ServiceContext, Map<string, PortBinding>], Error> = await this.addServiceToPartition(
            serviceId,
            defaultPartitionId,
            containerCreationConfig,
            generateRunConfigFunc,
        );

        if (!resultAddServiceToPartition.isOk()) {
            return err(resultAddServiceToPartition.error);
        }

        return ok(resultAddServiceToPartition.value);
    }

    // Docs available at https://docs.kurtosistech.com/kurtosis-libs/lib-documentation
    public async addServiceToPartition(
        serviceId: ServiceID,
        partitionId: PartitionID,
        containerCreationConfig: ContainerCreationConfig,
        generateRunConfigFunc: (ipAddr: string, generatedFileFilepaths: Map<string, string>, staticFileFilepaths: Map<StaticFileID, string>) => [ContainerRunConfig, Error],
    ): Promise<Result<[ServiceContext, Map<string, PortBinding>], Error>> {

        log.trace("Registering new service ID with Kurtosis API...");
        const registerServiceArgs: RegisterServiceArgs = newRegisterServiceArgs(serviceId, partitionId);

        const promiseRegisterService: Promise<ResultAsync<RegisterServiceResponse, Error>> = new Promise((resolve, _unusedReject) => {
            this.client.registerService(registerServiceArgs, (error: grpc.ServiceError, response: RegisterServiceResponse) => {
                if (error === null) {
                    resolve(okAsync(response));
                } else {
                    resolve(errAsync(error));
                }
            })
        });
        const resultRegisterService: Result<RegisterServiceResponse, Error> = await promiseRegisterService;
        if (!resultRegisterService.isOk()) {
            return err(resultRegisterService.error);
        }
        const registerServiceResp: RegisterServiceResponse = resultRegisterService.value;

        const serviceIpAddr = registerServiceResp.getIpAddr();

        const serviceContext: ServiceContext = new ServiceContext(
            this.client,
            serviceId,
            serviceIpAddr,
            this.enclaveDataVolMountpoint,
            containerCreationConfig.getKurtosisVolumeMountpoint());
        log.trace("New service successfully registered with Kurtosis API");

        log.trace("Loading static files into new service namespace...");
        const usedStaticFilesMap = containerCreationConfig.getUsedStaticFiles();

        const usedStaticFiles: Set<string> = new Set();
        for (let usedStaticFilesId in usedStaticFilesMap) {
            usedStaticFiles.add(usedStaticFilesId);
        }

        const resultLoadStaticFiles = await serviceContext.loadStaticFiles(usedStaticFiles); 
        if (!resultLoadStaticFiles.isOk()) {
            return err(resultLoadStaticFiles.error);
        }
        const staticFileAbsFilepathsOnService: Map<string, string> = resultLoadStaticFiles.value;
        log.trace("Successfully loaded static files");

        log.trace("Initializing generated files...");
        const filesToGenerate: Set<string> = new Set();
        for (let fileId in containerCreationConfig.getFileGeneratingFuncs()) {
            filesToGenerate.add(fileId);
        }
        const resultGenerateFiles = await serviceContext.generateFiles(filesToGenerate);
        if (!resultGenerateFiles.isOk()) {
            return err(resultGenerateFiles.error);
        }
        const generatedFileFilepaths: Map<string, GeneratedFileFilepaths> = resultGenerateFiles.value;
        const generatedFileAbsFilepathsOnService: Map<string, string> = new Map();
        for (let [fileId, initializingFunc] of containerCreationConfig.getFileGeneratingFuncs().entries()) {

            if (!generatedFileFilepaths.has(fileId)) {
                return err(new Error("Needed to initialize file for file ID " + fileId +  ", but no generated file filepaths were " +
                "found for that file ID; this is a Kurtosis bug"));
            }
            const filepaths: GeneratedFileFilepaths = generatedFileFilepaths[fileId];

            const promiseFp: Promise<fsPromises.FileHandle> = fsPromises.open(filepaths.getAbsoluteFilepathHere(), 'r'); //TODO - is 'r' the correct mode?; shouldn't I be closing the file (like `defer fp.close()`)
            promiseFp.catch(error => { 
                return err(error); 
            })
            const resultFp: fsPromises.FileHandle = await promiseFp;
            const fp: number = resultFp.fd;

            var initalizingFuncResult = initializingFunc(fp);
            if (!initalizingFuncResult.isOk()){
                return err(initalizingFuncResult.error);
            }

            generatedFileAbsFilepathsOnService[fileId] = filepaths.getAbsoluteFilepathOnServiceContainer();
        }
        log.trace("Successfully initialized generated files in suite execution volume");

        var [containerRunConfig, generateRunConfigFuncErr] = generateRunConfigFunc(serviceIpAddr, generatedFileAbsFilepathsOnService, staticFileAbsFilepathsOnService);
        if (generateRunConfigFuncErr !== null) {
            return err(generateRunConfigFuncErr);
        }

        log.trace("Creating files artifact ID str -> mount dirpaths map...");
        const artifactIdStrToMountDirpath: Map<string, string> = new Map();
        for (let [filesArtifactId, mountDirpath] of containerCreationConfig.getFilesArtifactMountpoints().entries()) {

            artifactIdStrToMountDirpath[String(filesArtifactId)] = mountDirpath;
        }
        log.trace("Successfully created files artifact ID str -> mount dirpaths map");

        log.trace("Starting new service with Kurtosis API...");
        const startServiceArgs: StartServiceArgs = newStartServiceArgs(
            serviceId, 
            containerCreationConfig.getImage(), 
            containerCreationConfig.getUsedPortsSet(),
            containerRunConfig.getEntrypointOverrideArgs(),
            containerRunConfig.getCmdOverrideArgs(),
            containerRunConfig.getEnvironmentVariableOverrides(),
            containerCreationConfig.getKurtosisVolumeMountpoint(),
            artifactIdStrToMountDirpath);

        const promiseStartService: Promise<ResultAsync<StartServiceResponse, Error>> = new Promise((resolve, _unusedReject) => {
            this.client.startService(startServiceArgs, (error: Error, response: StartServiceResponse) => {
                if (error === null) {
                    resolve(okAsync(response));
                } else {
                    resolve(errAsync(error));
                }
            })
        });
        const resultStartService: Result<StartServiceResponse, Error> = await promiseStartService;
        if (!resultStartService.isOk()) {
            return err(resultStartService.error);
        }

        log.trace("Successfully started service with Kurtosis API");

        const resp: StartServiceResponse = resultStartService.value;
        return ok([serviceContext, resp.getUsedPortsHostPortBindingsMap()]);
    }

    // Docs available at https://docs.kurtosistech.com/kurtosis-libs/lib-documentation
    public async getServiceContext(serviceId: ServiceID): Promise<Result<ServiceContext, Error>> {
        const getServiceInfoArgs: GetServiceInfoArgs = newGetServiceInfoArgs(serviceId);
        
        const promiseGetServiceInfo: Promise<ResultAsync<GetServiceInfoResponse, Error>> = new Promise((resolve, _unusedReject) => {
            this.client.getServiceInfo(getServiceInfoArgs, (error: Error, response: GetServiceInfoResponse) => {
                if (error === null) {
                    resolve(okAsync(response));
                } else {
                    resolve(errAsync(error));
                }
            })
        });
        const resultGetServiceInfo: Result<GetServiceInfoResponse, Error> = await promiseGetServiceInfo;
        if (!resultGetServiceInfo.isOk()) {
            return err(resultGetServiceInfo.error);
        }

        const serviceResponse: GetServiceInfoResponse = resultGetServiceInfo.value;
        if (serviceResponse.getIpAddr() === "") {
            return err(new Error(
                "Kurtosis API reported an empty IP address for service " + serviceId +  " - this should never happen, and is a bug with Kurtosis!",
                ) 
            );
        }

        const enclaveDataVolMountDirpathOnSvcContainer: string = serviceResponse.getEnclaveDataVolumeMountDirpath();
        if (enclaveDataVolMountDirpathOnSvcContainer === "") {
            return err(new Error(
                "Kurtosis API reported an empty enclave data volume directory path for service " + serviceId + " - this should never happen, and is a bug with Kurtosis!",
                )
            );
        }

        const serviceContext: ServiceContext = new ServiceContext(
            this.client,
            serviceId,
            serviceResponse.getIpAddr(),
            this.enclaveDataVolMountpoint,
            enclaveDataVolMountDirpathOnSvcContainer,
        )

        return ok(serviceContext);
    }

    // Docs available at https://docs.kurtosistech.com/kurtosis-libs/lib-documentation
    public async removeService(serviceId: ServiceID, containerStopTimeoutSeconds: number): Promise<Result<null, Error>> {

        log.debug("Removing service '%v'...", serviceId);
        // NOTE: This is kinda weird - when we remove a service we can never get it back so having a container
        //  stop timeout doesn't make much sense. It will make more sense when we can stop/start containers
        // Independent of adding/removing them from the network
        const args: RemoveServiceArgs = newRemoveServiceArgs(serviceId, containerStopTimeoutSeconds);
        
        const promiseRemoveService: Promise<ResultAsync<google_protobuf_empty_pb, Error>> = new Promise((resolve, _unusedReject) => {
            this.client.removeService(args, (error: Error, response: google_protobuf_empty_pb) => {
                if (error === null) {
                    resolve(okAsync(response));
                } else {
                    resolve(errAsync(error));
                }
            })
        });
        const resultRemoveService: Result<google_protobuf_empty_pb, Error> = await promiseRemoveService;
        if (!resultRemoveService.isOk()) {
            return err(resultRemoveService.error);
        }

        log.debug("Successfully removed service ID %v", serviceId);

        return ok(null);
    }

    // Docs available at https://docs.kurtosistech.com/kurtosis-libs/lib-documentation
    public async repartitionNetwork(
        partitionServices: Map<PartitionID, Set<ServiceID>>,
        partitionConnections: Map<PartitionID, Map<PartitionID, PartitionConnectionInfo>>,
        defaultConnection: PartitionConnectionInfo): Promise<Result<null, Error>> {

        if (partitionServices === null) {
            return err(new Error("Partition services map cannot be nil"));
        }
        if (defaultConnection === null) {
            return err(new Error("Default connection cannot be nil"));
        }

        // Cover for lazy/confused users
        if (partitionConnections === null) {
            partitionConnections = new Map();
        }

        const reqPartitionServices: Map<string, PartitionServices> = new Map();
        for (let [partitionId, serviceIdSet] of partitionServices.entries()) {

            const partitionIdStr: string = String(partitionId);
            reqPartitionServices[partitionIdStr] = newPartitionServices(serviceIdSet);
        }

        const reqPartitionConns: Map<string, PartitionConnections> = new Map();
        for (let [partitionAId, partitionAConnsMap] of partitionConnections.entries()) {
            
            const partitionAConnsStrMap: Map<string, PartitionConnectionInfo> = new Map();
            for (let [partitionBId, connInfo] of partitionAConnsMap.entries()) {

                const partitionBIdStr: string = String(partitionBId);
                partitionAConnsStrMap[partitionBIdStr] = connInfo;
            }
            const partitionAConns: PartitionConnections = newPartitionConnections(partitionAConnsStrMap);
            const partitionAIdStr: string = String(partitionAId);
            reqPartitionConns[partitionAIdStr] = partitionAConns;
        }

        const repartitionArgs: RepartitionArgs = newRepartitionArgs(reqPartitionServices, reqPartitionConns, defaultConnection);

        const promiseRepartition: Promise<ResultAsync<google_protobuf_empty_pb, Error>> = new Promise((resolve, _unusedReject) => {
            this.client.repartition(repartitionArgs, (error: Error, response: google_protobuf_empty_pb) => {
                if (error === null) {
                    resolve(okAsync(response));
                } else {
                    resolve(errAsync(error));
                }
            })
        });
        const resultRepartition: Result<google_protobuf_empty_pb, Error> = await promiseRepartition;
        if (!resultRepartition.isOk()) {
            return err(resultRepartition.error);
        }

        return ok(null);
    }

    // Docs available at https://docs.kurtosistech.com/kurtosis-libs/lib-documentation
    public async waitForEndpointAvailability(
        serviceId: ServiceID,
        port: number, 
        path: string, 
        initialDelaySeconds: number, 
        retries: number, 
        retriesDelayMilliseconds: number, 
        bodyText: string): Promise<Result<null, Error>> {
        const availabilityArgs: WaitForEndpointAvailabilityArgs = newWaitForEndpointAvailabilityArgs(
            serviceId,
            port,
            path,
            initialDelaySeconds,
            retries,
            retriesDelayMilliseconds,
            bodyText);

        const promiseWaitForEndpointAvailability: Promise<ResultAsync<google_protobuf_empty_pb, Error>> = new Promise((resolve, _unusedReject) => {
            this.client.waitForEndpointAvailability(availabilityArgs, (error: Error, response: google_protobuf_empty_pb) => {
                if (error === null) {
                    resolve(okAsync(response));
                } else {
                    resolve(errAsync(error));
                }
            })
        });
        const resultWaitForEndpointAvailability: Result<google_protobuf_empty_pb, Error> = await promiseWaitForEndpointAvailability;
        if (!resultWaitForEndpointAvailability.isOk()) {
            return err(resultWaitForEndpointAvailability.error);
        }

        return ok(null);
    }

    // Docs available at https://docs.kurtosistech.com/kurtosis-libs/lib-documentation
    public async executeBulkCommands(bulkCommandsJson: string): Promise<Result<null, Error>> {

        const args: ExecuteBulkCommandsArgs = newExecuteBulkCommandsArgs(bulkCommandsJson);
        
        const promiseExecuteBulkCommands: Promise<ResultAsync<google_protobuf_empty_pb, Error>> = new Promise((resolve, _unusedReject) => {
            this.client.executeBulkCommands(args, (error: Error, response: google_protobuf_empty_pb) => {
                if (error === null) {
                    resolve(okAsync(response));
                } else {
                    resolve(errAsync(error));
                }
            })
        });
        const resultExecuteBulkCommands: Result<google_protobuf_empty_pb, Error> = await promiseExecuteBulkCommands;
        if (!resultExecuteBulkCommands.isOk()) {
            return err(resultExecuteBulkCommands.error);
        }

        return ok(null);
    }
}