/*
 * Copyright (c) 2020 - present Kurtosis Technologies LLC.
 * All Rights Reserved.
 */

//TODO - potentially change to asterisk since many imports for grpc bindings & constructor calls
import { ApiContainerServiceClient } from "../..//kurtosis_core_rpc_api_bindings/api_container_service_grpc_pb";
import { LoadLambdaArgs, GetLambdaInfoArgs, RegisterStaticFilesArgs, RegisterStaticFilesResponse, RegisterFilesArtifactsArgs, PortBinding, RegisterServiceArgs, RegisterServiceResponse, StartServiceArgs, GetServiceInfoArgs, GetServiceInfoResponse, RemoveServiceArgs, PartitionConnectionInfo, PartitionServices, PartitionConnections, RepartitionArgs, WaitForEndpointAvailabilityArgs, ExecuteBulkCommandsArgs, StartServiceResponse, GetLambdaInfoResponse } from "../..//kurtosis_core_rpc_api_bindings/api_container_service_pb";
import { LambdaID, LambdaContext } from "../modules/lambda_context";
import { ServiceID } from "../services/service";
import { ServiceContext, GeneratedFileFilepaths } from "../services/service_context";
import { StaticFileID, FilesArtifactID, ContainerCreationConfig } from "../services/container_creation_config"; 
import { ContainerRunConfig } from "../services/container_run_config";
import { newGetLoadLambdaArgs, newGetLambdaInfoArgs, newGetRegisterStaticFilesArgs, newGetRegisterFilesArtifactsArgs, newGetRegisterServiceArgs, newGetStartServiceArgs, newGetGetServiceInfoArgs, newGetRemoveServiceArgs, newGetPartitionServices, newGetPartitionConnections, newGetRepartitionArgs, newGetWaitForEndpointAvailabilityArgs, newGetExecuteBulkCommandsArgs } from "../constructor_calls";
import { okAsync, errAsync, ResultAsync, Result } from "neverthrow";
import * as winston from "winston";
	//"io" //TODO - remove
import * as path from "path";
import * as fs from 'fs';
import * as fsPromises from "fs/promises";
import * as grpc from "grpc";

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
            serializedParams: string): Promise<[LambdaContext, Error]> {
        const args: LoadLambdaArgs = newGetLoadLambdaArgs(lambdaId, image, serializedParams);
        
        // TODO TODO TODO - CALLBACK & ERROR-HANDLING (REMOVE)
        // // We proxy calls to Lambda modules via the API container, so actually no need to use the response here
        // _, err := networkCtx.client.LoadLambda(context.Background(), args)
        // if err !== nil {
        //     return nil, stacktrace.Propagate(err, "An error occurred loading new module '%v' with image '%v' and serialized params '%v'", lambdaId, image, serializedParams)
        // }

        const promiseAsync: Promise<ResultAsync<any, Error>> = new Promise((resolve, _unusedReject) => { //TODO - Repeating this promise format a lot, make a function for it?
            this.client.executeLambda(args, (_unusedError: grpc.ServiceError, response: any) => {
                resolve(okAsync(response));
            })
        });
        const promise: Result<any, Error> = await promiseAsync;
        if (!promise.isOk()) {
            return [null, promise.error];
        }

        const moduleCtx: LambdaContext = new LambdaContext(this.client, lambdaId);
        return [moduleCtx, null];
    }

    // Docs available at https://docs.kurtosistech.com/kurtosis-libs/lib-documentation
    public async getLambdaContext(lambdaId: LambdaID): Promise<[LambdaContext, Error]> {
        const args: GetLambdaInfoArgs = newGetLambdaInfoArgs(lambdaId);
        
        // TODO TODO TODO - CALLBACK & ERROR-HANDLING (REMOVE)
        // // NOTE: As of 2021-07-18, we actually don't use any of the info that comes back because the LambdaContext doesn't require it!
        // _, err := networkCtx.client.GetLambdaInfo(context.Background(), args)
        // if err !== nil {
        //     return nil, stacktrace.Propagate(err, "An error occurred getting info for Lambda '%v'", lambdaId)
        // }

        const promiseAsyncGetLambdaInfo: Promise<ResultAsync<GetLambdaInfoResponse, Error>> = new Promise((resolve, _unusedReject) => {
            this.client.getLambdaInfo(args, (_unusedError: grpc.ServiceError, response: GetLambdaInfoResponse) => {
                resolve(okAsync(response));
            })
        });
        const promiseGetLambdaInfo: Result<GetLambdaInfoResponse, Error> = await promiseAsyncGetLambdaInfo;
        if (!promiseGetLambdaInfo.isOk()) {
            return [null, promiseGetLambdaInfo.error];
        }

        const lambdaCtx: LambdaContext = new LambdaContext(this.client, lambdaId);
        return [lambdaCtx, null];
    }

    // Docs available at https://docs.kurtosistech.com/kurtosis-libs/lib-documentation
    public async registerStaticFiles(staticFileFilepaths: Map<StaticFileID, string>): Promise<Error> {
        const strSet: Map<string, boolean> = new Map();
        for (let [staticFileId, srcAbsFilepath] of staticFileFilepaths.entries()) {
            
            // Sanity-check that the source filepath exists
            const promiseAsyncSrcAbsFilepath: Promise<ResultAsync<fs.Stats, Error>> = new Promise((resolve, _unusedReject) => {
                fs.stat(srcAbsFilepath, (_unusedError: Error, response: fs.Stats) => { //TODO - should I be using fsPromises.stat() instead, I personally want to remain consistent with manually constructing promises
                    resolve(okAsync(response));
                })
            });
            const promiseSrcAbsFilepath: Result<fs.Stats, Error> = await promiseAsyncSrcAbsFilepath;
            if (!promiseSrcAbsFilepath.isOk()) {
                return new Error("Source filepath " + srcAbsFilepath + " associated with static file " + staticFileId + " doesn't exist");;
            }
            strSet[String(staticFileId)] = true;

            //TODO TODO TODO - REMOVE
            // fs.stat(srcAbsFilepath, (exists) => { //TODO - error returned inside function, not inside `registerStaticFiles`
            //     if (exists !== null) {
            //         return new Error("Source filepath " + srcAbsFilepath + " associated with static file " + staticFileId + " doesn't exist");
            //     } 
            // })
            // strSet[String(staticFileId)] = true;
        }

        const args: RegisterStaticFilesArgs = newGetRegisterStaticFilesArgs(strSet);
        
        // TODO TODO TODO - CALLBACK & ERROR-HANDLING (REMOVE)
        // resp, err := networkCtx.client.RegisterStaticFiles(context.Background(), args)
        // if err !== nil {
        //     return stacktrace.Propagate(err, "An error occurred registering static files: %+v", staticFileFilepaths)
        // }

        const promiseAsyncRegisterStaticFiles: Promise<ResultAsync<RegisterStaticFilesResponse, Error>> = new Promise((resolve, _unusedReject) => {
            this.client.registerStaticFiles(args, (_unusedError: grpc.ServiceError, response: RegisterStaticFilesResponse) => {
                resolve(okAsync(response));
            })
        });
        const promiseRegisterStaticFiles: Result<RegisterStaticFilesResponse, Error> = await promiseAsyncRegisterStaticFiles;
        if (!promiseRegisterStaticFiles.isOk()) {
            return promiseRegisterStaticFiles.error;
        }
        const resp: RegisterStaticFilesResponse = promiseRegisterStaticFiles.value;

        const staticFileDestRelativeFilepathsMap: Map<string, string> = resp.getStaticFileDestRelativeFilepathsMap();
        for (let [staticFileIdStr, destFilepathRelativeToEnclaveVolRoot] of staticFileDestRelativeFilepathsMap.entries()) {

            const staticFileId: StaticFileID = <StaticFileID>(staticFileIdStr);

            if (!staticFileFilepaths.has(staticFileId)) {
                return new Error("No source filepath found for static file " + staticFileId + "; this is a bug in Kurtosis");
            }
            const srcAbsFilepath: string = staticFileFilepaths[staticFileId];

            const destAbsFilepath: string = path.join(this.enclaveDataVolMountpoint, destFilepathRelativeToEnclaveVolRoot);
            
            const promiseAsyncDestAbsFilepath: Promise<ResultAsync<fs.Stats, Error>> = new Promise((resolve, _unusedReject) => {
                fs.stat(destAbsFilepath, (_unusedError: Error, response: fs.Stats) => { //TODO
                    resolve(okAsync(response));
                })
            });
            const promiseDestAbsFilepath: Result<fs.Stats, Error> = await promiseAsyncDestAbsFilepath;
            if (!promiseDestAbsFilepath.isOk()) {
                return new Error("The Kurtosis API asked us to copy static file " + staticFileId + " to path " + destFilepathRelativeToEnclaveVolRoot + 
                " in the enclave volume which means that an empty file should exist there, " + "but no file exists at that path - this is a bug in Kurtosis!");
            }
            
            //TODO TODO TODO - REMOVE
            // srcFp, err := os.Open(srcAbsFilepath) TODO => fs.open(srcAbsFilepath, 'r', ) (fs.open)
            // if err !== nil {
            //     return stacktrace.Propagate(err, "An error occurred opening static file '%v' source file '%v' for reading", staticFileId, srcAbsFilepath)
            // }
            // defer srcFp.Close() TODO => (fs.Close)

            // destFp, err := os.Create(destAbsFilepath) TODO => (fs.createReadStream maybe)
            // if err !== nil {
            //     return stacktrace.Propagate(err, "An error occurred opening static file '%v' destination file '%v' for writing", staticFileId, destAbsFilepath)
            // }
            // defer destFp.Close() TODO => (fs.Close)

            // if _, err := io.Copy(destFp, srcFp); err !== nil { TODO => (fs.copyFile)
            //     return stacktrace.Propagate(err, "An error occurred copying all the bytes from static file '%v' source filepath '%v' to destination filepath '%v'", staticFileId, srcAbsFilepath, destAbsFilepath)
            // }

            var srcFp: number;
            var destFp: number;
            try { //TODO (comment) - finally block meant to duplicate defer functionality
                
                const promiseAsyncSrcFp: Promise<ResultAsync<number, Error>> = new Promise((resolve, _unusedReject) => {
                    fs.open(srcAbsFilepath, 'r', (_unusedError: Error, response: number) => { //TODO + change response to "fd" for example?
                        resolve(okAsync(response));
                    })
                });
                const promiseSrcFp: Result<number, Error> = await promiseAsyncSrcFp;
                if (!promiseSrcFp.isOk()) {
                    return promiseSrcFp.error;
                }
                srcFp = promiseSrcFp.value;

                const promiseAsyncDestFp: Promise<ResultAsync<number, Error>> = new Promise((resolve, _unusedReject) => {
                    fs.open(destAbsFilepath, 'w', (_unusedError: Error, response: number) => {
                        resolve(okAsync(response));
                    })
                });
                const promiseDestFp: Result<number, Error> = await promiseAsyncDestFp;
                if (!promiseDestFp.isOk()) {
                    return promiseDestFp.error;
                }
                destFp = promiseDestFp.value;
    
                const promiseAsyncCopyFile: Promise<ResultAsync<number, Error>> = new Promise((_unUsedresolve, reject) => {
                    fs.copyFile(srcAbsFilepath, destAbsFilepath, (error: Error) => {
                        reject(errAsync(error)); //TOOD - doubts with what is done here
                    })
                });
                const promiseCopyFile: Result<number, Error> = await promiseAsyncCopyFile;
                if (promiseCopyFile.isErr()) {
                    return promiseCopyFile.error;
                }
            }   
            finally {
                fs.close(srcFp);
                fs.close(destFp)
            }

        }
        return null;
    }

    // Docs available at https://docs.kurtosistech.com/kurtosis-libs/lib-documentation
    public async registerFilesArtifacts(filesArtifactUrls: Map<FilesArtifactID, string>): Promise<Error> {
        const filesArtifactIdStrsToUrls: Map<string, string> = new Map();
        for (let [artifactId, url] of filesArtifactUrls.entries()) {
            filesArtifactIdStrsToUrls[String(artifactId)] = url;
        }
        const args: RegisterFilesArtifactsArgs = newGetRegisterFilesArtifactsArgs(filesArtifactIdStrsToUrls);
        
        // TODO TODO TODO - CALLBACK & ERROR-HANDLING (REMOVE)
        // if _, err := networkCtx.client.RegisterFilesArtifacts(context.Background(), args); err !== nil {
        //     return stacktrace.Propagate(err, "An error occurred registering files artifacts: %+v", filesArtifactUrls)
        // }

        const promiseAsyncRegisterFilesArtifacts: Promise<ResultAsync<any, Error>> = new Promise((resolve, _unusedReject) => { //TODO
            this.client.registerFilesArtifacts(args, (_unusedError: grpc.ServiceError, response: any) => {
                resolve(okAsync(response));
            })
        });
        const promiseRegisterFilesArtifacts: Result<any, Error> = await promiseAsyncRegisterFilesArtifacts;
        if (!promiseRegisterFilesArtifacts.isOk()) {
            return promiseRegisterFilesArtifacts.error;
        }

        return null;
    }

    // Docs available at https://docs.kurtosistech.com/kurtosis-libs/lib-documentation
    public async addService(
        serviceId: ServiceID,
        containerCreationConfig: ContainerCreationConfig,
        generateRunConfigFunc: (ipAddr: string, generatedFileFilepaths: Map<string, string>, staticFileFilepaths: Map<StaticFileID, string>) => [ContainerRunConfig, Error]
    ): Promise<[ServiceContext, Map<string, PortBinding>, Error]> {

        const [serviceContext, hostPortBindings, err] = await this.addServiceToPartition(
            serviceId,
            defaultPartitionId,
            containerCreationConfig,
            generateRunConfigFunc,
            )
        if (err !== null) {
            return [null, null, err]
        }

        return [serviceContext, hostPortBindings, null]
    }

    // Docs available at https://docs.kurtosistech.com/kurtosis-libs/lib-documentation
    public async addServiceToPartition(
        serviceId: ServiceID,
        partitionId: PartitionID,
        containerCreationConfig: ContainerCreationConfig,
        generateRunConfigFunc: (ipAddr: string, generatedFileFilepaths: Map<string, string>, staticFileFilepaths: Map<StaticFileID, string>) => [ContainerRunConfig, Error],
    ): Promise<[ServiceContext, Map<string, PortBinding>, Error]> {

        winston.info("Registering new service ID with Kurtosis API..."); //TODO logrus.Trace is meant for something for low level, but I could find winston.info to be closest to this
        const registerServiceArgs: RegisterServiceArgs = newGetRegisterServiceArgs(serviceId, partitionId);
        
        // TODO TODO TODO - CALLBACK & ERROR-HANDLING (Remove)
        // registerServiceResp, err := networkCtx.client.RegisterService(ctx, registerServiceArgs)
        // if err !== nil {
        //     return nil, nil, stacktrace.Propagate(
        //         err,
        //         "An error occurred registering service with ID '%v' with the Kurtosis API",
        //         serviceId)
        // }

        const promiseAsyncRegisterService: Promise<ResultAsync<RegisterServiceResponse, Error>> = new Promise((resolve, _unusedReject) => { //TODO
            this.client.registerService(registerServiceArgs, (_unusedError: grpc.ServiceError, response: RegisterServiceResponse) => {
                resolve(okAsync(response));
            })
        });
        const promiseRegisterService: Result<RegisterServiceResponse, Error> = await promiseAsyncRegisterService;
        if (!promiseRegisterService.isOk()) {
            return [null, null, promiseRegisterService.error];
        }
        const registerServiceResp: RegisterServiceResponse = promiseRegisterService.value;

        const serviceIpAddr = registerServiceResp.getIpAddr();

        const serviceContext: ServiceContext = new ServiceContext(
            this.client,
            serviceId,
            serviceIpAddr,
            this.enclaveDataVolMountpoint,
            containerCreationConfig.getKurtosisVolumeMountpoint());
        winston.info("New service successfully registered with Kurtosis API");

        winston.info("Loading static files into new service namespace...");
        const usedStaticFilesMap = containerCreationConfig.getUsedStaticFiles();
        //TODO new section to stick with a map, but this doens't feel productive though (4 lines below)
        const usedStaticFiles: Set<string> = new Set();
        for (let usedStaticFilesId in usedStaticFilesMap) {
            usedStaticFiles.add(usedStaticFilesId);
        }
        var [staticFileAbsFilepathsOnService, err] = serviceContext.loadStaticFiles(usedStaticFiles);
        if (err !== null) {
            return [ null, null, err];
        }
        winston.info("Successfully loaded static files");

        winston.info("Initializing generated files...");
        const filesToGenerate: Set<string> = new Set(); //TODO - make sure this is correct
        for (let fileId in containerCreationConfig.getFileGeneratingFuncs()) {
            //filesToGenerate[fileId] = true; //TODO - remove
            filesToGenerate.add(fileId);
        }
        var [generatedFileFilepaths, err] = serviceContext.generateFiles(filesToGenerate);
        if (err !== null) {
            return [null, null, err];
        }
        const generatedFileAbsFilepathsOnService: Map<string, string> = new Map();
        for (let [fileId, initializingFunc] of containerCreationConfig.getFileGeneratingFuncs().entries()) {

            if (!generatedFileFilepaths.has(fileId)) {
                return [null, null, err];
            }
            const filepaths: GeneratedFileFilepaths = generatedFileFilepaths[fileId];

            // TODO TODO TODO - Remove
            // fp, err := os.Create(filepaths.GetAbsoluteFilepathHere())
            // if err !== nil {
            //     return nil, nil, stacktrace.Propagate(err, "An error occurred opening file pointer for file '%v'", fileId)
            // }
            // if err := initializingFunc(fp); err !== nil {
            //     return nil, nil, stacktrace.Propagate(err, "The function to initialize file with ID '%v' returned an error", fileId)
            // }

            const promiseAsyncFp: Promise<ResultAsync<number, Error>> = new Promise((resolve, _unusedReject) => {
                fs.open(filepaths.getAbsoluteFilepathHere(), 'r', (_unusedError: Error, response: number) => { //TODO - is 'r' the correct mode?; shouldn't I be closing the file (like `defer fp.close()`)
                    resolve(okAsync(response));
                })
            });
            const promiseFp: Result<number, Error> = await promiseAsyncFp;
            if (!promiseFp.isOk()) {
                return [null, null, promiseFp.error];
            }
            const fp: number = promiseFp.value;
            var err = initializingFunc(promiseFp.value);
            if (err != null){
                return [null, null, err];
            }

            generatedFileAbsFilepathsOnService[fileId] = filepaths.getAbsoluteFilepathOnServiceContainer();
        }
        winston.info("Successfully initialized generated files in suite execution volume")

        var [containerRunConfig, err] = generateRunConfigFunc(serviceIpAddr, generatedFileAbsFilepathsOnService, staticFileAbsFilepathsOnService);
        if (err !== null) {
            return [null, null, err];
        }

        winston.info("Creating files artifact ID str -> mount dirpaths map...")
        const artifactIdStrToMountDirpath: Map<string, string> = new Map();
        for (let [filesArtifactId, mountDirpath] of containerCreationConfig.getFilesArtifactMountpoints().entries()) {

            artifactIdStrToMountDirpath[String(filesArtifactId)] = mountDirpath;
        }
        winston.info("Successfully created files artifact ID str -> mount dirpaths map")

        winston.info("Starting new service with Kurtosis API...")
        const startServiceArgs: StartServiceArgs = newGetStartServiceArgs(
            serviceId, 
            containerCreationConfig.getImage(), 
            containerCreationConfig.getUsedPortsSet(),
            containerRunConfig.getEntrypointOverrideArgs(),
            containerRunConfig.getCmdOverrideArgs(),
            containerRunConfig.getEnvironmentVariableOverrides(),
            containerCreationConfig.getKurtosisVolumeMountpoint(),
            artifactIdStrToMountDirpath);

        //TODO TODO TODO - CALLBACK & ERROR-HANDLING (REMOVE)
        // resp, err := this.client.StartService(ctx, startServiceArgs)
        // if err !== nil {
        //     return nil, nil, stacktrace.Propagate(err, "An error occurred starting the service with the Kurtosis API")
        // }

        const promiseAsyncStartService: Promise<ResultAsync<StartServiceResponse, Error>> = new Promise((resolve, _unusedReject) => {
            this.client.startService(startServiceArgs, (_unusedError: Error, response: StartServiceResponse) => {
                resolve(okAsync(response));
            })
        });
        const promiseStartService: Result<StartServiceResponse, Error> = await promiseAsyncStartService;
        if (!promiseStartService.isOk()) {
            return [null, null, promiseStartService.error];
        }

        winston.info("Successfully started service with Kurtosis API");

        const resp: StartServiceResponse = promiseStartService.value;
        return [serviceContext, resp.getUsedPortsHostPortBindingsMap(), null]
    }

    // Docs available at https://docs.kurtosistech.com/kurtosis-libs/lib-documentation
    public async getServiceContext(serviceId: ServiceID): Promise<[ServiceContext, Error]> {
        const getServiceInfoArgs: GetServiceInfoArgs = newGetGetServiceInfoArgs(serviceId);
        
        //TODO TODO TODO - CALLBACK & ERROR-HANDLING (REMOVE)
        // serviceResponse, err := networkCtx.client.GetServiceInfo(context.Background(), getServiceInfoArgs)
        // if err !== nil {
        //     return nil, stacktrace.Propagate(
        //         err,
        //         "An error occurred when trying to get info for service '%v'",
        //         serviceId)
        // }

        const promiseAsyncGetServiceInfo: Promise<ResultAsync<GetServiceInfoResponse, Error>> = new Promise((resolve, _unusedReject) => {
            this.client.getServiceInfo(getServiceInfoArgs, (_unusedError: Error, response: GetServiceInfoResponse) => {
                resolve(okAsync(response));
            })
        });
        const promiseGetServiceInfo: Result<GetServiceInfoResponse, Error> = await promiseAsyncGetServiceInfo;
        if (!promiseGetServiceInfo.isOk()) {
            return [null, promiseGetServiceInfo.error];
        }

        const serviceResponse: GetServiceInfoResponse = promiseGetServiceInfo.value;
        if (serviceResponse.getIpAddr() === "") {
            return [null, new Error(
                "Kurtosis API reported an empty IP address for service " + serviceId +  " - this should never happen, and is a bug with Kurtosis!",
                )
            ]
        }

        const enclaveDataVolMountDirpathOnSvcContainer: string = serviceResponse.getEnclaveDataVolumeMountDirpath();
        if (enclaveDataVolMountDirpathOnSvcContainer === "") {
            return [null, new Error(
                "Kurtosis API reported an empty enclave data volume directory path for service " + serviceId + " - this should never happen, and is a bug with Kurtosis!",
                )
            ]
        }

        const serviceContext: ServiceContext = new ServiceContext(
            this.client,
            serviceId,
            serviceResponse.getIpAddr(),
            this.enclaveDataVolMountpoint,
            enclaveDataVolMountDirpathOnSvcContainer,
        )

        return [serviceContext, null]
    }

    // Docs available at https://docs.kurtosistech.com/kurtosis-libs/lib-documentation
    public async removeService(serviceId: ServiceID, containerStopTimeoutSeconds: number): Promise<Error> {

        winston.debug("Removing service '%v'...", serviceId)
        // NOTE: This is kinda weird - when we remove a service we can never get it back so having a container
        //  stop timeout doesn't make much sense. It will make more sense when we can stop/start containers
        // Independent of adding/removing them from the network
        const args: RemoveServiceArgs = newGetRemoveServiceArgs(serviceId, containerStopTimeoutSeconds);
        
        // TODO TODO TODO - CALLBACK & ERROR-HANDLING (REMOVE)
        // if _, err := networkCtx.client.RemoveService(context.Background(), args); err !== nil {
        //     return stacktrace.Propagate(err, "An error occurred removing service '%v' from the network", serviceId)
        // }

        const promiseAsyncRemoveService: Promise<ResultAsync<any, Error>> = new Promise((resolve, _unusedReject) => {
            this.client.removeService(args, (_unusedError: Error, response: any) => {
                resolve(okAsync(response));
            })
        });
        const promiseRemoveService: Result<any, Error> = await promiseAsyncRemoveService;
        if (!promiseRemoveService.isOk()) {
            return promiseRemoveService.error;
        }

        winston.debug("Successfully removed service ID %v", serviceId)

        return null;
    }

    // Docs available at https://docs.kurtosistech.com/kurtosis-libs/lib-documentation
    public async repartitionNetwork(
        partitionServices: Map<PartitionID, Set<ServiceID>>,
        partitionConnections: Map<PartitionID, Map<PartitionID, PartitionConnectionInfo>>,
        defaultConnection: PartitionConnectionInfo): Promise<Error> {

        if (partitionServices === null) {
            return new Error("Partition services map cannot be nil");
        }
        if (defaultConnection === null) {
            return new Error("Default connection cannot be nil");
        }

        // Cover for lazy/confused users
        if (partitionConnections === null) {
            partitionConnections = new Map();
        }

        const reqPartitionServices: Map<string, PartitionServices> = new Map();
        for (let [partitionId, serviceIdSet] of partitionServices.entries()) {

            const serviceIdStrSet: Set<string> = new Set();
            for (let serviceId in serviceIdSet) {
                serviceIdStrSet.add(serviceId);
            }
            const partitionIdStr: string = String(partitionId);
            reqPartitionServices[partitionIdStr] = newGetPartitionServices(serviceIdStrSet);
        }

        const reqPartitionConns: Map<string, PartitionConnections> = new Map();
        for (let [partitionAId, partitionAConnsMap] of partitionConnections.entries()) {
            
            const partitionAConnsStrMap: Map<string, PartitionConnectionInfo> = new Map();
            for (let [partitionBId, connInfo] of partitionAConnsMap.entries()) {

                const partitionBIdStr: string = String(partitionBId);
                partitionAConnsStrMap[partitionBIdStr] = connInfo;
            }
            const partitionAConns: PartitionConnections = newGetPartitionConnections(partitionAConnsStrMap);
            const partitionAIdStr: string = String(partitionAId);
            reqPartitionConns[partitionAIdStr] = partitionAConns;
        }

        const repartitionArgs: RepartitionArgs = newGetRepartitionArgs(reqPartitionServices, reqPartitionConns, defaultConnection);

        // TODO TODO TODO - CALLBACK & ERROR-HANDLING (REMOVE)
        // if _, err := networkCtx.client.Repartition(context.Background(), repartitionArgs); err !== nil {
        //     return stacktrace.Propagate(err, "An error occurred repartitioning the test network")
        // }

        const promiseAsyncRepartition: Promise<ResultAsync<any, Error>> = new Promise((resolve, _unusedReject) => {
            this.client.repartition(repartitionArgs, (_unusedError: Error, response: any) => {
                resolve(okAsync(response));
            })
        });
        const promiseRepartition: Result<any, Error> = await promiseAsyncRepartition;
        if (!promiseRepartition.isOk()) {
            return promiseRepartition.error;
        }

        return null;
    }

    // Docs available at https://docs.kurtosistech.com/kurtosis-libs/lib-documentation
    public async waitForEndpointAvailability(
        serviceId: ServiceID,
        port: number, 
        path: string, 
        initialDelaySeconds: number, 
        retries: number, 
        retriesDelayMilliseconds: number, 
        bodyText: string): Promise<Error> {
        const availabilityArgs: WaitForEndpointAvailabilityArgs = newGetWaitForEndpointAvailabilityArgs(
            serviceId,
            port,
            path,
            initialDelaySeconds,
            retries,
            retriesDelayMilliseconds,
            bodyText);

        //TODO TODO TODO - CALLBACK & ERROR-HANDLING (REMOVE)
        // if _, err := networkCtx.client.WaitForEndpointAvailability(context.Background(), availabilityArgs); err !== nil {
        //     return stacktrace.Propagate(
        //         err,
        //         "Endpoint '%v' on port '%v' for service '%v' did not become available despite polling %v times with %v between polls",
        //         path,
        //         port,
        //         serviceId,
        //         retries,
        //         retriesDelayMilliseconds,
        //     )
        // }

        const promiseAsyncWaitForEndpointAvailability: Promise<ResultAsync<any, Error>> = new Promise((resolve, _unusedReject) => {
            this.client.waitForEndpointAvailability(availabilityArgs, (_unusedError: Error, response: any) => {
                resolve(okAsync(response));
            })
        });
        const promiseWaitForEndpointAvailability: Result<any, Error> = await promiseAsyncWaitForEndpointAvailability;
        if (!promiseWaitForEndpointAvailability.isOk()) {
            return promiseWaitForEndpointAvailability.error;
        }

        return null;
    }

    // Docs available at https://docs.kurtosistech.com/kurtosis-libs/lib-documentation
    public async executeBulkCommands(bulkCommandsJson: string): Promise<Error> {

        const args: ExecuteBulkCommandsArgs = newGetExecuteBulkCommandsArgs(bulkCommandsJson);
        
        // TODO TODO TODO - CALLBACK & ERROR-HANDLING (REMOVE)
        // if _, err := networkCtx.client.ExecuteBulkCommands(context.Background(), args); err !== nil {
        //     return stacktrace.Propagate(err, "An error occurred executing the following bulk commands: %v", bulkCommandsJson)
        // }

        const promiseAsyncExecuteBulkCommands: Promise<ResultAsync<any, Error>> = new Promise((resolve, _unusedReject) => {
            this.client.executeBulkCommands(args, (_unusedError: Error, response: any) => {
                resolve(okAsync(response));
            })
        });
        const promiseExecuteBulkCommands: Result<any, Error> = await promiseAsyncExecuteBulkCommands;
        if (!promiseExecuteBulkCommands.isOk()) {
            return promiseExecuteBulkCommands.error;
        }

        return null
    }
}