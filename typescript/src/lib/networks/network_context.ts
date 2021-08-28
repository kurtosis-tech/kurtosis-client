/*
 * Copyright (c) 2020 - present Kurtosis Technologies LLC.
 * All Rights Reserved.
 */

import { ApiContainerServiceClient } from "../..//kurtosis_core_rpc_api_bindings/api_container_service_grpc_pb";
import { LoadLambdaArgs, GetLambdaInfoArgs, RegisterStaticFilesArgs, RegisterStaticFilesResponse, RegisterFilesArtifactsArgs, PortBinding, RegisterServiceArgs, RegisterServiceResponse, StartServiceArgs, GetServiceInfoArgs, GetServiceInfoResponse, RemoveServiceArgs, PartitionConnectionInfo, PartitionServices, PartitionConnections, RepartitionArgs, WaitForEndpointAvailabilityArgs, ExecuteBulkCommandsArgs, StartServiceResponse, GetLambdaInfoResponse } from "../../kurtosis_core_rpc_api_bindings/api_container_service_pb";
import { LambdaID, LambdaContext } from "../modules/lambda_context";
import { ServiceID } from "../services/service";
import { ServiceContext, GeneratedFileFilepaths } from "../services/service_context";
import { StaticFileID, FilesArtifactID, ContainerCreationConfig } from "../services/container_creation_config"; 
import { ContainerRunConfig } from "../services/container_run_config";
import { newLoadLambdaArgs, newGetLambdaInfoArgs, newRegisterStaticFilesArgs, newRegisterFilesArtifactsArgs, newRegisterServiceArgs, newStartServiceArgs, newGetServiceInfoArgs, newRemoveServiceArgs, newPartitionServices, newPartitionConnections, newRepartitionArgs, newWaitForEndpointAvailabilityArgs, newExecuteBulkCommandsArgs } from "../constructor_calls";
import { ok, err, Result } from "neverthrow";
import * as log from "loglevel";
import * as path from "path";
import * as fs from 'fs';
import * as grpc from "grpc";
import * as google_protobuf_empty_pb from "google-protobuf/google/protobuf/empty_pb";
import * as jspb from "google-protobuf";

export type PartitionID = string;

// This will always resolve to the default partition ID (regardless of whether such a partition exists in the network,
//  or it was repartitioned away)
const DEFAULT_PARTITION_ID: PartitionID = "";

// Docs available at https://docs.kurtosistech.com/kurtosis-libs/lib-documentation
export class NetworkContext {
    private readonly client: ApiContainerServiceClient;
    
    // The location on the filesystem where this code is running where the enclave data volume is mounted
    private readonly enclaveDataVolMountpoint: string;

    /*
    Creates a new NetworkContext object with the given parameters.
    */
    constructor(client: ApiContainerServiceClient, enclaveDataVolMountpoint: string) {
        this.client = client;
        this.enclaveDataVolMountpoint = enclaveDataVolMountpoint;
    }

    // Docs available at https://docs.kurtosistech.com/kurtosis-libs/lib-documentation
    public async loadLambda(
            lambdaId: LambdaID,
            image: string,
            serializedParams: string): Promise<Result<LambdaContext, Error>> {
        const args: LoadLambdaArgs = newLoadLambdaArgs(lambdaId, image, serializedParams);
        
        const promiseLoadLambda: Promise<Result<google_protobuf_empty_pb.Empty, Error>> = new Promise((resolve, _unusedReject) => {
            this.client.loadLambda(args, (error: grpc.ServiceError | null, response?: google_protobuf_empty_pb.Empty) => {
                if (error === null) {
                    if (!response) {
                        resolve(err(new Error("No error was encountered but the response was still falsy; this should never happen")));
                    } else {
                        resolve(ok(response!));
                    }
                } else {
                    resolve(err(error));
                }
            })
        });
        const resultLoadLambda: Result<google_protobuf_empty_pb.Empty, Error> = await promiseLoadLambda;
        if (!resultLoadLambda.isOk()) {
            return err(resultLoadLambda.error);
        }

        const moduleCtx: LambdaContext = new LambdaContext(this.client, lambdaId);
        return ok(moduleCtx);
    }

    // Docs available at https://docs.kurtosistech.com/kurtosis-libs/lib-documentation
    public async getLambdaContext(lambdaId: LambdaID): Promise<Result<LambdaContext, Error>> {
        const args: GetLambdaInfoArgs = newGetLambdaInfoArgs(lambdaId);
        
        const promiseGetLambdaInfo: Promise<Result<GetLambdaInfoResponse, Error>> = new Promise((resolve, _unusedReject) => {
            this.client.getLambdaInfo(args, (error: grpc.ServiceError | null, response?: GetLambdaInfoResponse) => {
                if (error === null) {
                    if (!response) {
                        resolve(err(new Error("No error was encountered but the response was still falsy; this should never happen")));
                    }
                    resolve(ok(response!));
                } else {
                    resolve(err(error));
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
        for (const [staticFileId, srcAbsFilepath] of staticFileFilepaths.entries()) {
            
            // Sanity-check that the source filepath exists
            const promiseStatSrcAbsFilepath: Promise<Result<fs.Stats, Error>> = new Promise((resolve, _unusedReject) => {
                fs.stat(srcAbsFilepath, (error: Error | null, response: fs.Stats) => {
                    if (error === null) {
                        resolve(ok(response));
                    } else {
                        resolve(err(error));
                    }
                })
            });
            const resultStatSrcAbsFilepath: Result<fs.Stats, Error> = await promiseStatSrcAbsFilepath;
            if (!resultStatSrcAbsFilepath.isOk()) {
                return err(new Error("Source filepath " + srcAbsFilepath + " associated with static file " + staticFileId + " doesn't exist"));
            }
            
            strSet.set(String(staticFileId), true);
        }

        const args: RegisterStaticFilesArgs = newRegisterStaticFilesArgs(strSet);
        
        const promiseRegisterStaticFiles: Promise<Result<RegisterStaticFilesResponse, Error>> = new Promise((resolve, _unusedReject) => {
            this.client.registerStaticFiles(args, (error: grpc.ServiceError | null, response?: RegisterStaticFilesResponse) => {
                if (error === null) {
                    if (!response) {
                        resolve(err(new Error("No error was encountered but the response was still falsy; this should never happen")));
                    } else {
                        resolve(ok(response!));
                    }
                } else {
                    resolve(err(error));
                }
            })
        });
        const resultRegisterStaticFiles: Result<RegisterStaticFilesResponse, Error> = await promiseRegisterStaticFiles;
        if (!resultRegisterStaticFiles.isOk()) {
            return err(resultRegisterStaticFiles.error);
        }
        const resp: RegisterStaticFilesResponse = resultRegisterStaticFiles.value;

        const staticFileDestRelativeFilepathsMap: jspb.Map<string, string> = resp.getStaticFileDestRelativeFilepathsMap();
        for (const [staticFileIdStr, destFilepathRelativeToEnclaveVolRoot] of staticFileDestRelativeFilepathsMap.entries()) {

            const staticFileId: StaticFileID = <StaticFileID>(staticFileIdStr);

            if (!staticFileFilepaths.has(staticFileId)) {
                return err(new Error("No source filepath found for static file " + staticFileId + "; this is a bug in Kurtosis"));
            }
            const srcAbsFilepath: string = staticFileFilepaths.get(staticFileId)!;

            const destAbsFilepath: string = path.join(this.enclaveDataVolMountpoint, destFilepathRelativeToEnclaveVolRoot);
            
            const promiseStatDestAbsFilepath: Promise<Result<fs.Stats, Error>> = new Promise((resolve, _unusedReject) => {
                fs.stat(destAbsFilepath, (error: Error | null, response: fs.Stats) => {
                    if (error === null) {
                        resolve(ok(response));
                    } else {
                        resolve(err(error));
                    }
                })
            });
            const resultStatDestAbsFilepath: Result<fs.Stats, Error> = await promiseStatDestAbsFilepath;
            if (!resultStatDestAbsFilepath.isOk()) {
                return err(new Error("The Kurtosis API asked us to copy static file " + staticFileId + " to path " + destFilepathRelativeToEnclaveVolRoot + 
                " in the enclave volume which means that an empty file should exist there, " + "but no file exists at that path - this is a bug in Kurtosis!"));
            }
    
            const promiseOpenSrcFp: Promise<Result<number, Error>> = new Promise((resolve, _unusedReject) => {
                fs.open(srcAbsFilepath, 'r', (error: Error | null, fd: number) => {
                    if (error === null) {
                        resolve(ok(fd));
                    } else {
                        resolve(err(error));
                    }
                })
            });
            const resultOpenSrcFp: Result<number, Error> = await promiseOpenSrcFp;
            if (!resultOpenSrcFp.isOk()) {
                return err(resultOpenSrcFp.error);
            }
            const srcFp: number = resultOpenSrcFp.value;
            
            try {

                const promiseOpenDestFp: Promise<Result<number, Error>> = new Promise((resolve, _unusedReject) => {
                    fs.open(destAbsFilepath, 'w', (error: Error | null, response: number) => {
                        if (error === null) {
                            resolve(ok(response));
                        } else {
                            resolve(err(error));
                        }
                    })
                });
                const resultOpenDestFp: Result<number, Error> = await promiseOpenDestFp;
                if (!resultOpenDestFp.isOk()) {
                    return err(resultOpenDestFp.error);
                }
                const destFp: number = resultOpenDestFp.value;

                try {

                    const promiseCopyFile: Promise<Result<null, Error>> = new Promise((resolve, _unusedReject) => {
                        fs.copyFile(srcAbsFilepath, destAbsFilepath, (error: Error | null) => {
                            if (error === null) {
                                resolve(ok(null));
                            } else {
                                resolve(err(error));
                            }
                        })
                    });
                    const resultCopyFile: Result<null, Error> = await promiseCopyFile;
                    if (!resultCopyFile.isOk()) {
                        return err(resultCopyFile.error);
                    }
                } finally {
                    fs.close(destFp);
                }

            } finally {
                fs.close(srcFp);
            }

        }
        return ok(null);
    }

    // Docs available at https://docs.kurtosistech.com/kurtosis-libs/lib-documentation
    public async registerFilesArtifacts(filesArtifactUrls: Map<FilesArtifactID, string>): Promise<Result<null,Error>> {
        const filesArtifactIdStrsToUrls: Map<string, string> = new Map();
        for (const [artifactId, url] of filesArtifactUrls.entries()) {
            filesArtifactIdStrsToUrls.set(String(artifactId), url);
        }
        const args: RegisterFilesArtifactsArgs = newRegisterFilesArtifactsArgs(filesArtifactIdStrsToUrls);
        
        const promiseRegisterFilesArtifacts: Promise<Result<google_protobuf_empty_pb.Empty, Error>> = new Promise((resolve, _unusedReject) => {
            this.client.registerFilesArtifacts(args, (error: grpc.ServiceError | null, response?: google_protobuf_empty_pb.Empty) => {
                if (error === null) {
                    if (!response) {
                        resolve(err(new Error("No error was encountered but the response was still falsy; this should never happen")));
                    } else {
                        resolve(ok(response!));
                    }
                } else {
                    resolve(err(error));
                }
            })
        });
        const resultRegisterFilesArtifacts: Result<google_protobuf_empty_pb.Empty, Error> = await promiseRegisterFilesArtifacts;
        if (!resultRegisterFilesArtifacts.isOk()) {
            return err(resultRegisterFilesArtifacts.error);
        }

        return ok(null);
    }

    // Docs available at https://docs.kurtosistech.com/kurtosis-libs/lib-documentation
    public async addService(
        serviceId: ServiceID,
        containerCreationConfig: ContainerCreationConfig,
        generateRunConfigFunc: (ipAddr: string, generatedFileFilepaths: Map<string, string>, staticFileFilepaths: Map<StaticFileID, string>) => Result<ContainerRunConfig, Error>
    ): Promise<Result<[ServiceContext, Map<string, PortBinding>], Error>> {

        const resultAddServiceToPartition: Result<[ServiceContext, Map<string, PortBinding>], Error> = await this.addServiceToPartition(
            serviceId,
            DEFAULT_PARTITION_ID,
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
            generateRunConfigFunc: (ipAddr: string, generatedFileFilepaths: Map<string, string>, staticFileFilepaths: Map<StaticFileID, string>) => Result<ContainerRunConfig, Error>,
            ): Promise<Result<[ServiceContext, Map<string, PortBinding>], Error>> {

        log.trace("Registering new service ID with Kurtosis API...");
        const registerServiceArgs: RegisterServiceArgs = newRegisterServiceArgs(serviceId, partitionId);

        const promiseRegisterService: Promise<Result<RegisterServiceResponse, Error>> = new Promise((resolve, _unusedReject) => {
            this.client.registerService(registerServiceArgs, (error: grpc.ServiceError | null, response?: RegisterServiceResponse) => {
                if (error === null) {
                    if (!response) {
                        resolve(err(new Error("No error was encountered but the response was still falsy; this should never happen")));
                    } else {
                        resolve(ok(response!));
                    }
                } else {
                    resolve(err(error));
                }
            })
        });
        const resultRegisterService: Result<RegisterServiceResponse, Error> = await promiseRegisterService;
        if (!resultRegisterService.isOk()) {
            return err(resultRegisterService.error);
        }
        const registerServiceResp: RegisterServiceResponse = resultRegisterService.value;

        const serviceIpAddr: string = registerServiceResp.getIpAddr();

        const serviceContext: ServiceContext = new ServiceContext(
            this.client,
            serviceId,
            serviceIpAddr,
            this.enclaveDataVolMountpoint,
            containerCreationConfig.getKurtosisVolumeMountpoint());
        log.trace("New service successfully registered with Kurtosis API");

        log.trace("Loading static files into new service namespace...");
        const usedStaticFilesMap: Set<string> = containerCreationConfig.getUsedStaticFiles();

        const usedStaticFiles: Set<string> = new Set();
        for (const usedStaticFilesId of usedStaticFilesMap) {
            usedStaticFiles.add(usedStaticFilesId);
        }

        const resultLoadStaticFiles: Result<Map<string, string>, Error> = await serviceContext.loadStaticFiles(usedStaticFiles); 
        if (!resultLoadStaticFiles.isOk()) {
            return err(resultLoadStaticFiles.error);
        }
        const staticFileAbsFilepathsOnService: Map<string, string> = resultLoadStaticFiles.value;
        log.trace("Successfully loaded static files");

        log.trace("Initializing generated files...");
        const filesToGenerate: Set<string> = new Set();
        for (const fileId of containerCreationConfig.getFileGeneratingFuncs().keys()) {
            filesToGenerate.add(fileId);
        }
        const resultGenerateFiles: Result<Map<string, GeneratedFileFilepaths>, Error> = await serviceContext.generateFiles(filesToGenerate);
        if (!resultGenerateFiles.isOk()) {
            return err(resultGenerateFiles.error);
        }
        const generatedFileFilepaths: Map<string, GeneratedFileFilepaths> = resultGenerateFiles.value;
        const generatedFileAbsFilepathsOnService: Map<string, string> = new Map();
        for (const [fileId, initializingFunc] of containerCreationConfig.getFileGeneratingFuncs().entries()) {

            if (!generatedFileFilepaths.has(fileId)) {
                return err(new Error("Needed to initialize file for file ID " + fileId +  ", but no generated file filepaths were " +
                "found for that file ID; this is a Kurtosis bug"));
            }
            const filepaths: GeneratedFileFilepaths = generatedFileFilepaths.get(fileId)!;

            const promiseOpenFp: Promise<Result<number, Error>> = new Promise((resolve, _unusedReject) => {
                fs.open(filepaths.getAbsoluteFilepathHere(), 'w', (error: Error | null, fd: number) => {
                    if (error === null) {
                        resolve(ok(fd));
                    } else {
                        resolve(err(error));
                    }
                })
            });
            const resultOpenFp: Result<number, Error> = await promiseOpenFp;
            if (!resultOpenFp.isOk()) {
                return err(resultOpenFp.error);
            }
            const fp: number = resultOpenFp.value;

            const initalizingFuncResult: Result<null, Error> = await initializingFunc(fp);
            if (!initalizingFuncResult.isOk()){
                return err(initalizingFuncResult.error);
            }

            generatedFileAbsFilepathsOnService.set(fileId, filepaths.getAbsoluteFilepathOnServiceContainer());
        }
        log.trace("Successfully initialized generated files in suite execution volume");

        const generateRunConfigFuncResult: Result<ContainerRunConfig, Error> = generateRunConfigFunc(serviceIpAddr, generatedFileAbsFilepathsOnService, staticFileAbsFilepathsOnService);
        if (!generateRunConfigFuncResult.isOk()) {
            return err(generateRunConfigFuncResult.error);
        }
        const containerRunConfig: ContainerRunConfig = generateRunConfigFuncResult.value;

        log.trace("Creating files artifact ID str -> mount dirpaths map...");
        const artifactIdStrToMountDirpath: Map<string, string> = new Map();
        for (const [filesArtifactId, mountDirpath] of containerCreationConfig.getFilesArtifactMountpoints().entries()) {

            artifactIdStrToMountDirpath.set(String(filesArtifactId), mountDirpath);
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

        const promiseStartService: Promise<Result<StartServiceResponse, Error>> = new Promise((resolve, _unusedReject) => {
            this.client.startService(startServiceArgs, (error: Error | null, response?: StartServiceResponse) => {
                if (error === null) {
                    if (!response) {
                        resolve(err(new Error("No error was encountered but the response was still falsy; this should never happen")));
                    } else {
                        resolve(ok(response!));
                    }
                } else {
                    resolve(err(error));
                }
            })
        });
        const resultStartService: Result<StartServiceResponse, Error> = await promiseStartService;
        if (!resultStartService.isOk()) {
            return err(resultStartService.error);
        }

        log.trace("Successfully started service with Kurtosis API");

        const resp: StartServiceResponse = resultStartService.value;
        const resultMap: Map<string, PortBinding> = new Map();
        for (const [key, value] of resp.getUsedPortsHostPortBindingsMap().entries()) {
            resultMap.set(key, value);
        }
        return ok<[ServiceContext, Map<string, PortBinding>], Error>([serviceContext, resultMap]);
    }

    // Docs available at https://docs.kurtosistech.com/kurtosis-libs/lib-documentation
    public async getServiceContext(serviceId: ServiceID): Promise<Result<ServiceContext, Error>> {
        const getServiceInfoArgs: GetServiceInfoArgs = newGetServiceInfoArgs(serviceId);
        
        const promiseGetServiceInfo: Promise<Result<GetServiceInfoResponse, Error>> = new Promise((resolve, _unusedReject) => {
            this.client.getServiceInfo(getServiceInfoArgs, (error: Error | null, response?: GetServiceInfoResponse) => {
                if (error === null) {
                    if (!response) {
                        resolve(err(new Error("No error was encountered but the response was still falsy; this should never happen")));
                    } else {
                        resolve(ok(response!));
                    }
                } else {
                    resolve(err(error));
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
        );

        return ok(serviceContext);
    }

    // Docs available at https://docs.kurtosistech.com/kurtosis-libs/lib-documentation
    public async removeService(serviceId: ServiceID, containerStopTimeoutSeconds: number): Promise<Result<null, Error>> {

        log.debug("Removing service '" + serviceId + "'...");
        // NOTE: This is kinda weird - when we remove a service we can never get it back so having a container
        //  stop timeout doesn't make much sense. It will make more sense when we can stop/start containers
        // Independent of adding/removing them from the network
        const args: RemoveServiceArgs = newRemoveServiceArgs(serviceId, containerStopTimeoutSeconds);
        
        const removeServicePromise: Promise<Result<null, Error>> = new Promise((resolve, _unusedReject) => {
            this.client.removeService(args, (error: Error | null, _unusedResponse?: google_protobuf_empty_pb.Empty) => {
                if (error === null) {
                    resolve(ok(null));
                } else {
                    resolve(err(error));
                }
            })
        });
        const resultRemoveService: Result<null, Error> = await removeServicePromise;
        if (!resultRemoveService.isOk()) {
            return err(resultRemoveService.error);
        }

        log.debug("Successfully removed service ID " + serviceId);

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
        for (const [partitionId, serviceIdSet] of partitionServices.entries()) {

            const partitionIdStr: string = String(partitionId);
            reqPartitionServices.set(partitionIdStr, newPartitionServices(serviceIdSet));
        }

        const reqPartitionConns: Map<string, PartitionConnections> = new Map();
        for (const [partitionAId, partitionAConnsMap] of partitionConnections.entries()) {
            
            const partitionAConnsStrMap: Map<string, PartitionConnectionInfo> = new Map();
            for (const [partitionBId, connInfo] of partitionAConnsMap.entries()) {

                const partitionBIdStr: string = String(partitionBId);
                partitionAConnsStrMap.set(partitionBIdStr, connInfo);
            }
            const partitionAConns: PartitionConnections = newPartitionConnections(partitionAConnsStrMap);
            const partitionAIdStr: string = String(partitionAId);
            reqPartitionConns.set(partitionAIdStr, partitionAConns);
        }

        const repartitionArgs: RepartitionArgs = newRepartitionArgs(reqPartitionServices, reqPartitionConns, defaultConnection);

        const promiseRepartition: Promise<Result<null, Error>> = new Promise((resolve, _unusedReject) => {
            this.client.repartition(repartitionArgs, (error: Error | null, _unusedResponse?: google_protobuf_empty_pb.Empty) => {
                if (error === null) {
                    resolve(ok(null));
                } else {
                    resolve(err(error));
                }
            })
        });
        const resultRepartition: Result<null, Error> = await promiseRepartition;
        if (!resultRepartition.isOk()) {
            return err(resultRepartition.error);
        }

        return ok(null);
    }

    // Docs available at https://docs.kurtosistech.com/kurtosis-libs/lib-documentation
    public async waitForEndpointAvailability(
            serviceId: ServiceID,
            httpMethod: WaitForEndpointAvailabilityArgs.HttpMethodMap[keyof WaitForEndpointAvailabilityArgs.HttpMethodMap],
            port: number, 
            path: string,
            requestBody: string,
            initialDelaySeconds: number, 
            retries: number, 
            retriesDelayMilliseconds: number, 
            bodyText: string): Promise<Result<null, Error>> {
        const availabilityArgs: WaitForEndpointAvailabilityArgs = newWaitForEndpointAvailabilityArgs(
            serviceId,
            httpMethod,
            port,
            path,
            requestBody,
            initialDelaySeconds,
            retries,
            retriesDelayMilliseconds,
            bodyText);

        const promiseWaitForEndpointAvailability: Promise<Result<null, Error>> = new Promise((resolve, _unusedReject) => {
            this.client.waitForEndpointAvailability(availabilityArgs, (error: Error | null, _unusedResponse?: google_protobuf_empty_pb.Empty) => {
                if (error === null) {
                    resolve(ok(null));
                } else {
                    resolve(err(error));
                }
            })
        });
        const resultWaitForEndpointAvailability: Result<null, Error> = await promiseWaitForEndpointAvailability;
        if (!resultWaitForEndpointAvailability.isOk()) {
            return err(resultWaitForEndpointAvailability.error);
        }

        return ok(null);
    }

    // Docs available at https://docs.kurtosistech.com/kurtosis-libs/lib-documentation
    public async executeBulkCommands(bulkCommandsJson: string): Promise<Result<null, Error>> {

        const args: ExecuteBulkCommandsArgs = newExecuteBulkCommandsArgs(bulkCommandsJson);
        
        const promiseExecuteBulkCommands: Promise<Result<null, Error>> = new Promise((resolve, _unusedReject) => {
            this.client.executeBulkCommands(args, (error: Error | null, _unusedResponse?: google_protobuf_empty_pb.Empty) => {
                if (error === null) {
                    resolve(ok(null));
                } else {
                    resolve(err(error));
                }
            })
        });
        const resultExecuteBulkCommands: Result<null, Error> = await promiseExecuteBulkCommands;
        if (!resultExecuteBulkCommands.isOk()) {
            return err(resultExecuteBulkCommands.error);
        }

        return ok(null);
    }
}