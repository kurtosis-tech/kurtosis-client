/*
 * Copyright (c) 2020 - present Kurtosis Technologies LLC.
 * All Rights Reserved.
 */

import { ApiContainerServiceClient } from "../..//kurtosis_core_rpc_api_bindings/api_container_service_grpc_pb";
import { LoadLambdaArgs, GetLambdaInfoArgs, RegisterFilesArtifactsArgs, PortBinding, RegisterServiceArgs, RegisterServiceResponse, StartServiceArgs, GetServiceInfoArgs, GetServiceInfoResponse, RemoveServiceArgs, PartitionConnectionInfo, PartitionServices, PartitionConnections, RepartitionArgs, WaitForHttpGetEndpointAvailabilityArgs, WaitForHttpPostEndpointAvailabilityArgs, ExecuteBulkCommandsArgs, StartServiceResponse, GetLambdaInfoResponse, GetServicesResponse, GetLambdasResponse } from "../..//kurtosis_core_rpc_api_bindings/api_container_service_pb";
import { LambdaID, LambdaContext } from "../modules/lambda_context";
import { ServiceID} from "../services/service";
import { SharedPath } from "../services/shared_path";
import { ServiceContext} from "../services/service_context";
import { newLoadLambdaArgs, newGetLambdaInfoArgs, newRegisterFilesArtifactsArgs, newRegisterServiceArgs, newStartServiceArgs, newGetServiceInfoArgs, newRemoveServiceArgs, newPartitionServices, newPartitionConnections, newRepartitionArgs, newWaitForHttpGetEndpointAvailabilityArgs, newWaitForHttpPostEndpointAvailabilityArgs, newExecuteBulkCommandsArgs } from "../constructor_calls";
import { ok, err, Result } from "neverthrow";
import * as log from "loglevel";
import * as grpc from "grpc";
import * as path from "path"
import * as google_protobuf_empty_pb from "google-protobuf/google/protobuf/empty_pb";
import { ContainerConfig, FilesArtifactID } from "../services/container_config";

export type PartitionID = string;

// This will always resolve to the default partition ID (regardless of whether such a partition exists in the network,
//  or it was repartitioned away)
const DEFAULT_PARTITION_ID: PartitionID = "";
// The default enclave data volume name
const DEFAULT_KURTOSIS_VOLUME_MOUNTPOINT: string = "/kurtosis-enclave-data";

// Docs available at https://docs.kurtosistech.com/kurtosis-client/lib-documentation
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

    // Docs available at https://docs.kurtosistech.com/kurtosis-client/lib-documentation
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

    // Docs available at https://docs.kurtosistech.com/kurtosis-client/lib-documentation
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

    // Docs available at https://docs.kurtosistech.com/kurtosis-client/lib-documentation
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

    // Docs available at https://docs.kurtosistech.com/kurtosis-client/lib-documentation
    public async addService(
            serviceId: ServiceID,
            containerConfigSupplier: (sharedDirectory: SharedPath) => Result<ContainerConfig, Error>
        ): Promise<Result<[ServiceContext, Map<string, PortBinding>], Error>> {

        const resultAddServiceToPartition: Result<[ServiceContext, Map<string, PortBinding>], Error> = await this.addServiceToPartition(
            serviceId,
            DEFAULT_PARTITION_ID,
            containerConfigSupplier,
        );

        if (!resultAddServiceToPartition.isOk()) {
            return err(resultAddServiceToPartition.error);
        }

        return ok(resultAddServiceToPartition.value);
    }

    // Docs available at https://docs.kurtosistech.com/kurtosis-client/lib-documentation
    public async addServiceToPartition(
            serviceId: ServiceID,
            partitionId: PartitionID,
            containerConfigSupplier: (sharedDirectory: SharedPath) => Result<ContainerConfig, Error>
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

        log.trace("New service successfully registered with Kurtosis API");

        const relativeServiceDirpath: string = registerServiceResp.getRelativeServiceDirpath();

        const sharedDirectory = this.getSharedDirectory(relativeServiceDirpath)

        log.trace("Generating container config object using the container config supplier...")
        const containerConfigSupplierResult: Result<ContainerConfig, Error> = containerConfigSupplier(sharedDirectory);
        if (!containerConfigSupplierResult.isOk()){
            return err(containerConfigSupplierResult.error);
        }
        const containerConfig: ContainerConfig = containerConfigSupplierResult.value;
        log.trace("Container config object successfully generated")

        log.trace("Creating files artifact ID str -> mount dirpaths map...");
        const artifactIdStrToMountDirpath: Map<string, string> = new Map();
        for (const [filesArtifactId, mountDirpath] of containerConfig.getFilesArtifactMountpoints().entries()) {

            artifactIdStrToMountDirpath.set(String(filesArtifactId), mountDirpath);
        }
        log.trace("Successfully created files artifact ID str -> mount dirpaths map");

        log.trace("Starting new service with Kurtosis API...");
        const startServiceArgs: StartServiceArgs = newStartServiceArgs(
            serviceId, 
            containerConfig.getImage(), 
            containerConfig.getUsedPortsSet(),
            containerConfig.getEntrypointOverrideArgs(),
            containerConfig.getCmdOverrideArgs(),
            containerConfig.getEnvironmentVariableOverrides(),
            DEFAULT_KURTOSIS_VOLUME_MOUNTPOINT,
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
        const startServiceResponse: StartServiceResponse = resultStartService.value;
        log.trace("Successfully started service with Kurtosis API");

        const serviceContext: ServiceContext = new ServiceContext(
            this.client,
            serviceId,
            startServiceResponse.getIpAddress(),
            sharedDirectory);

        const resultMap: Map<string, PortBinding> = new Map();
        for (const [key, value] of startServiceResponse.getUsedPortsHostPortBindingsMap().entries()) {
            resultMap.set(key, value);
        }
        return ok<[ServiceContext, Map<string, PortBinding>], Error>([serviceContext, resultMap]);
    }

    // Docs available at https://docs.kurtosistech.com/kurtosis-client/lib-documentation
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

        const relativeServiceDirpath: string = serviceResponse.getRelativeServiceDirpath();
        if (relativeServiceDirpath === "") {
            return err(new Error(
                "Kurtosis API reported an empty relative service directory path for service " + serviceId + " - this should never happen, and is a bug with Kurtosis!",
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

        const sharedDirectory: SharedPath = this.getSharedDirectory(relativeServiceDirpath)

        const serviceContext: ServiceContext = new ServiceContext(
            this.client,
            serviceId,
            serviceResponse.getIpAddr(),
            sharedDirectory,
        );

        return ok(serviceContext);
    }

    // Docs available at https://docs.kurtosistech.com/kurtosis-client/lib-documentation
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

    // Docs available at https://docs.kurtosistech.com/kurtosis-client/lib-documentation
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

    // Docs available at https://docs.kurtosistech.com/kurtosis-client/lib-documentation
    public async waitForHttpGetEndpointAvailability(
        serviceId: ServiceID,
        port: number, 
        path: string,
        initialDelayMilliseconds: number, 
        retries: number, 
        retriesDelayMilliseconds: number, 
        bodyText: string): Promise<Result<null, Error>> {
    const availabilityArgs: WaitForHttpGetEndpointAvailabilityArgs = newWaitForHttpGetEndpointAvailabilityArgs(
        serviceId,
        port,
        path,
        initialDelayMilliseconds,
        retries,
        retriesDelayMilliseconds,
        bodyText);

    const promiseWaitForHttpGetEndpointAvailability: Promise<Result<null, Error>> = new Promise((resolve, _unusedReject) => {
        this.client.waitForHttpGetEndpointAvailability(availabilityArgs, (error: Error | null, _unusedResponse?: google_protobuf_empty_pb.Empty) => {
            if (error === null) {
                resolve(ok(null));
            } else {
                resolve(err(error));
            }
        })
    });
    const resultWaitForHttpGetEndpointAvailability: Result<null, Error> = await promiseWaitForHttpGetEndpointAvailability;
    if (!resultWaitForHttpGetEndpointAvailability.isOk()) {
        return err(resultWaitForHttpGetEndpointAvailability.error);
    }

    return ok(null);
}

    // Docs available at https://docs.kurtosistech.com/kurtosis-client/lib-documentation
    public async waitForHttpPostEndpointAvailability(
            serviceId: ServiceID,
            port: number, 
            path: string,
            requestBody: string,
            initialDelayMilliseconds: number, 
            retries: number, 
            retriesDelayMilliseconds: number, 
            bodyText: string): Promise<Result<null, Error>> {
        const availabilityArgs: WaitForHttpPostEndpointAvailabilityArgs = newWaitForHttpPostEndpointAvailabilityArgs(
            serviceId,
            port,
            path,
            requestBody,
            initialDelayMilliseconds,
            retries,
            retriesDelayMilliseconds,
            bodyText);

        const promiseWaitForHttpPostEndpointAvailability: Promise<Result<null, Error>> = new Promise((resolve, _unusedReject) => {
            this.client.waitForHttpPostEndpointAvailability(availabilityArgs, (error: Error | null, _unusedResponse?: google_protobuf_empty_pb.Empty) => {
                if (error === null) {
                    resolve(ok(null));
                } else {
                    resolve(err(error));
                }
            })
        });
        const resultWaitForHttpPostEndpointAvailability: Result<null, Error> = await promiseWaitForHttpPostEndpointAvailability;
        if (!resultWaitForHttpPostEndpointAvailability.isOk()) {
            return err(resultWaitForHttpPostEndpointAvailability.error);
        }

        return ok(null);
    }

    // Docs available at https://docs.kurtosistech.com/kurtosis-client/lib-documentation
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

    // Docs available at https://docs.kurtosistech.com/kurtosis-client/lib-documentation
    public async getServices(): Promise<Result<Set<ServiceID>, Error>> {
        const emptyArg: google_protobuf_empty_pb.Empty = new google_protobuf_empty_pb.Empty()
        
        const promiseGetServices: Promise<Result<GetServicesResponse, Error>> = new Promise((resolve, _unusedReject) => {
            this.client.getServices(emptyArg, (error: Error | null, response?: GetServicesResponse) => {
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

        const resultGetServices: Result<GetServicesResponse, Error> = await promiseGetServices;
        if (!resultGetServices.isOk()) {
            return err(resultGetServices.error);
        }

        const getServicesResponse: GetServicesResponse = resultGetServices.value;

        const serviceIDs: Set<ServiceID> = new Set<ServiceID>()

        getServicesResponse.getServiceIdsMap().forEach((value: boolean, key: string) => {
            serviceIDs.add(key)
        });

        return ok(serviceIDs)
    }

    // Docs available at https://docs.kurtosistech.com/kurtosis-client/lib-documentation
    public async getLambdas(): Promise<Result<Set<LambdaID>, Error>> {
        const emptyArg: google_protobuf_empty_pb.Empty = new google_protobuf_empty_pb.Empty()
        
        const promiseGetLambdas: Promise<Result<GetLambdasResponse, Error>> = new Promise((resolve, _unusedReject) => {
            this.client.getLambdas(emptyArg, (error: Error | null, response?: GetLambdasResponse) => {
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

        const resultGetLambdas: Result<GetLambdasResponse, Error> = await promiseGetLambdas;
        if (!resultGetLambdas.isOk()) {
            return err(resultGetLambdas.error);
        }

        const getLambdasResponse: GetLambdasResponse = resultGetLambdas.value;

        const lambdaIDs: Set<LambdaID> = new Set<LambdaID>()

        getLambdasResponse.getLambdaIdsMap().forEach((value: boolean, key: string) => {
            lambdaIDs.add(key)
        })

        return ok(lambdaIDs)
    }

    // ====================================================================================================
    //                                       Private helper functions
    // ====================================================================================================
    private getSharedDirectory(relativeServiceDirpath: string): SharedPath {

        const absFilepathOnThisContainer = path.join(this.enclaveDataVolMountpoint, relativeServiceDirpath);
        const absFilepathOnServiceContainer = path.join(DEFAULT_KURTOSIS_VOLUME_MOUNTPOINT, relativeServiceDirpath);

        const sharedDirectory = new SharedPath(absFilepathOnThisContainer, absFilepathOnServiceContainer);

        return sharedDirectory;
    }
}
