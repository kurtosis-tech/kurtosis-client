/*
 * Copyright (c) 2020 - present Kurtosis Technologies LLC.
 * All Rights Reserved.
 */

//package networks

//import (
	//"context"
import { ApiContainerServiceClient } from "../..//kurtosis_core_rpc_api_bindings/api_container_service_grpc_pb";
import { LoadLambdaArgs, GetLambdaInfoArgs, RegisterStaticFilesArgs, RegisterStaticFilesResponse, RegisterFilesArtifactsArgs, PortBinding, RegisterServiceArgs, RegisterServiceResponse, StartServiceArgs, GetServiceInfoArgs, GetServiceInfoResponse, RemoveServiceArgs, PartitionConnectionInfo, PartitionServices, PartitionConnections, RepartitionArgs, WaitForEndpointAvailabilityArgs, ExecuteBulkCommandsArgs, StartServiceResponse } from "../..//kurtosis_core_rpc_api_bindings/api_container_service_pb"; //TODO - potentially change to asterisk since many imports
import { LambdaID, LambdaContext } from "../modules/lambda_context";
import { ServiceID } from "../services/service";
import { ServiceContext, GeneratedFileFilepaths } from "../services/service_context";
import { StaticFileID, FilesArtifactID, ContainerCreationConfig } from "../services/container_creation_config"; 
import { ContainerRunConfig } from "../services/container_run_config";
import { newGetLoadLambdaArgs, newGetLambdaInfoArgs, newRegisterStaticFilesArgs, newRegisterFilesArtifactsArgs, newRegisterServiceArgs, newStartServiceArgs, newGetServiceInfoArgs, newRemoveServiceArgs, newPartitionServices, newPartitionConnections, newRepartitionArgs, newWaitForEndpointAvailabilityArgs, newExecuteBulkCommandsArgs } from "../constructor_calls"; //TODO - potentially change to asterisk since many imports
	//"github.com/palantir/stacktrace" TOOD
import * as winston from "winston";
	//"io" //TODO - remove
import * as path from "path";
import * as fs from 'fs';
import * as fsPromises from "fs/promises";
//)

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
    public loadLambda(
            lambdaId: LambdaID,
            image: string,
            serializedParams: string): [LambdaContext, Error] {
        const args: LoadLambdaArgs = newGetLoadLambdaArgs(lambdaId, image, serializedParams);
        // TODO TODO TODO - CALLBACK & ERROR-HANDLING
        // // We proxy calls to Lambda modules via the API container, so actually no need to use the response here
        // _, err := networkCtx.client.LoadLambda(context.Background(), args)
        // if err !== nil {
        //     return nil, stacktrace.Propagate(err, "An error occurred loading new module '%v' with image '%v' and serialized params '%v'", lambdaId, image, serializedParams)
        // }
        const moduleCtx: LambdaContext = new LambdaContext(this.client, lambdaId); //TODO - move to constructor calls?
        return [moduleCtx, null];
    }

    // Docs available at https://docs.kurtosistech.com/kurtosis-libs/lib-documentation
    public getLambdaContext(lambdaId: LambdaID): [LambdaContext, Error] {
        const args: GetLambdaInfoArgs = newGetLambdaInfoArgs(lambdaId);
        // TODO TODO TODO - CALLBACK & ERROR-HANDLING
        // // NOTE: As of 2021-07-18, we actually don't use any of the info that comes back because the LambdaContext doesn't require it!
        // _, err := networkCtx.client.GetLambdaInfo(context.Background(), args)
        // if err !== nil {
        //     return nil, stacktrace.Propagate(err, "An error occurred getting info for Lambda '%v'", lambdaId)
        // }
        const lambdaCtx: LambdaContext = new LambdaContext(this.client, lambdaId); //TODO - move to constructor calls?
        return [lambdaCtx, null];
    }

    // Docs available at https://docs.kurtosistech.com/kurtosis-libs/lib-documentation
    public registerStaticFiles(staticFileFilepaths: Map<StaticFileID, string>): Error {
        const strSet: Map<string, boolean> = new Map();
        for (let [staticFileId, srcAbsFilepath] of staticFileFilepaths.entries()) {
            
            // Sanity-check that the source filepath exists
            const filepathExsits: (path: string) => Promise<fs.Stats> = async (path: string) => {
                const stats: fs.Stats = await fsPromises.stat(path);
                return stats;
            }

            filepathExsits(srcAbsFilepath).catch( err => {
                return new Error("Source filepath " + srcAbsFilepath + " associated with static file " + staticFileId + " doesn't exist");
            });
            strSet[String(staticFileId)] = true;

            //TODO TODO TODO - Remove
            // fs.stat(srcAbsFilepath, (exists) => { //TODO - error returned inside function, not inside `registerStaticFiles`
            //     if (exists !== null) {
            //         return new Error("Source filepath " + srcAbsFilepath + " associated with static file " + staticFileId + " doesn't exist");
            //     } 
            // })
            // strSet[String(staticFileId)] = true;
        }

        const args: RegisterStaticFilesArgs = newRegisterStaticFilesArgs(strSet);
        // TODO TODO TODO - CALLBACK & ERROR-HANDLING
        // resp, err := networkCtx.client.RegisterStaticFiles(context.Background(), args)
        // if err !== nil {
        //     return stacktrace.Propagate(err, "An error occurred registering static files: %+v", staticFileFilepaths)
        // }
        let resp: RegisterStaticFilesResponse; //TODO - remove
        const staticFileDestRelativeFilepathsMap: Map<string, string> = resp.getStaticFileDestRelativeFilepathsMap();
        for (let [staticFileIdStr, destFilepathRelativeToEnclaveVolRoot] of staticFileDestRelativeFilepathsMap.entries()) {

            const staticFileId: StaticFileID = <StaticFileID>(staticFileIdStr);

            if (!staticFileFilepaths.has(staticFileId)) {
                return new Error("No source filepath found for static file " + staticFileId + "; this is a bug in Kurtosis");
            }
            const srcAbsFilepath: string = staticFileFilepaths[staticFileId];

            const destAbsFilepath: string = path.join(this.enclaveDataVolMountpoint, destFilepathRelativeToEnclaveVolRoot);
            fs.stat(destAbsFilepath, (exists) => {
                if (exists !== null) {
                    return new Error("The Kurtosis API asked us to copy static file " + staticFileId + " to path " + destFilepathRelativeToEnclaveVolRoot + 
                    " in the enclave volume which means that an empty file should exist there, " + "but no file exists at that path - this is a bug in Kurtosis!");
                }
            })
            //TODO TODO TODO
            // srcFp, err := os.Open(srcAbsFilepath) TODO => fs.open(srcAbsFilepath, 'r', ) (fs.open)
            // srcFp, err := os.Open(srcAbsFilepath)
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

        }
        return null;
    }

    // Docs available at https://docs.kurtosistech.com/kurtosis-libs/lib-documentation
    public registerFilesArtifacts(filesArtifactUrls: Map<FilesArtifactID, string>): Error {
        const filesArtifactIdStrsToUrls: Map<string, string> = new Map();
        for (let [artifactId, url] of filesArtifactUrls.entries()) {
            filesArtifactIdStrsToUrls[String(artifactId)] = url;
        }
        const args: RegisterFilesArtifactsArgs = newRegisterFilesArtifactsArgs(filesArtifactIdStrsToUrls);
        // TODO TODO TODO - CALLBACK & ERROR-HANDLING
        // if _, err := networkCtx.client.RegisterFilesArtifacts(context.Background(), args); err !== nil {
        //     return stacktrace.Propagate(err, "An error occurred registering files artifacts: %+v", filesArtifactUrls)
        // }
        return null;
    }

    // Docs available at https://docs.kurtosistech.com/kurtosis-libs/lib-documentation
    public addService(
        serviceId: ServiceID,
        containerCreationConfig: ContainerCreationConfig,
        generateRunConfigFunc: (ipAddr: string, generatedFileFilepaths: Map<string, string>, staticFileFilepaths: Map<StaticFileID, string>) => [ContainerRunConfig, Error]
    ): [ServiceContext, Map<string, PortBinding>, Error] {

        const [serviceContext, hostPortBindings, err] = this.addServiceToPartition(
            serviceId,
            defaultPartitionId,
            containerCreationConfig,
            generateRunConfigFunc,
            )
        if (err !== null) {
            return [null, null, err] //TODO no personalized error message
        }

        return [serviceContext, hostPortBindings, null]
    }

    // Docs available at https://docs.kurtosistech.com/kurtosis-libs/lib-documentation
    public addServiceToPartition(
        serviceId: ServiceID,
        partitionId: PartitionID,
        containerCreationConfig: ContainerCreationConfig,
        generateRunConfigFunc: (ipAddr: string, generatedFileFilepaths: Map<string, string>, staticFileFilepaths: Map<StaticFileID, string>) => [ContainerRunConfig, Error],
    ): [ServiceContext, Map<string, PortBinding>, Error] {

        winston.info("Registering new service ID with Kurtosis API..."); //TODO logrus.Trace is meant for something for low level, but I could find winston.info to be closest to this
        const registerServiceArgs: RegisterServiceArgs = newRegisterServiceArgs(serviceId, partitionId);
        // TODO TODO TODO - CALLBACK & ERROR-HANDLING
        // registerServiceResp, err := networkCtx.client.RegisterService(ctx, registerServiceArgs)
        // if err !== nil {
        //     return nil, nil, stacktrace.Propagate(
        //         err,
        //         "An error occurred registering service with ID '%v' with the Kurtosis API",
        //         serviceId)
        // }
        let registerServiceResp: RegisterServiceResponse; //TODO - remove
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
            return [ null, null, err ]; //TODO - no personalized message
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
            return [null, null, err ] //TODO - no personalized message
        }
        const generatedFileAbsFilepathsOnService: Map<string, string> = new Map();
        for (let [fileId, initializingFunc] of containerCreationConfig.getFileGeneratingFuncs().entries()) {

            if (!generatedFileFilepaths.has(fileId)) {
                return [null, null, err ] //TODO - no personalize message
                    //"Needed to initialize file for file ID '%v', but no generated file filepaths were found for that file ID; this is a Kurtosis bug",
                    //fileId)]
            }
            //TODO - make sure to add a case after the ! (check other files for this)
            const filepaths: GeneratedFileFilepaths = generatedFileFilepaths[fileId];
            // TODO TODO TODO 
            // fp, err := os.Create(filepaths.GetAbsoluteFilepathHere())
            // if err !== nil {
            //     return nil, nil, stacktrace.Propagate(err, "An error occurred opening file pointer for file '%v'", fileId)
            // }
            // if err := initializingFunc(fp); err !== nil {
            //     return nil, nil, stacktrace.Propagate(err, "The function to initialize file with ID '%v' returned an error", fileId)
            // }
            generatedFileAbsFilepathsOnService[fileId] = filepaths.getAbsoluteFilepathOnServiceContainer();
        }
        winston.info("Successfully initialized generated files in suite execution volume")

        var [containerRunConfig, err] = generateRunConfigFunc(serviceIpAddr, generatedFileAbsFilepathsOnService, staticFileAbsFilepathsOnService);
        if (err !== null) {
            return [null, null, err] //TODO - no personalized message
        }

        winston.info("Creating files artifact ID str -> mount dirpaths map...")
        const artifactIdStrToMountDirpath: Map<string, string> = new Map();
        for (let [filesArtifactId, mountDirpath] of containerCreationConfig.getFilesArtifactMountpoints().entries()) {

            artifactIdStrToMountDirpath[String(filesArtifactId)] = mountDirpath;
        }
        winston.info("Successfully created files artifact ID str -> mount dirpaths map")

        winston.info("Starting new service with Kurtosis API...")
        const startServiceArgs: StartServiceArgs = newStartServiceArgs(
            serviceId, 
            containerCreationConfig.getImage(), 
            containerCreationConfig.getUsedPortsSet(),
            containerRunConfig.getEntrypointOverrideArgs(),
            containerRunConfig.getCmdOverrideArgs(),
            containerRunConfig.getEnvironmentVariableOverrides(),
            containerCreationConfig.getKurtosisVolumeMountpoint(),
            artifactIdStrToMountDirpath);
        //TODO TODO TODO - CALLBACK & ERROR-HANDLING
        // resp, err := this.client.StartService(ctx, startServiceArgs)
        // if err !== nil {
        //     return nil, nil, stacktrace.Propagate(err, "An error occurred starting the service with the Kurtosis API")
        // }
        winston.info("Successfully started service with Kurtosis API");

        let resp: StartServiceResponse; //TODO - remove
        return [serviceContext, resp.getUsedPortsHostPortBindingsMap(), null]
    }

    // Docs available at https://docs.kurtosistech.com/kurtosis-libs/lib-documentation
    public getServiceContext(serviceId: ServiceID): [ServiceContext, Error] {
        const getServiceInfoArgs: GetServiceInfoArgs = newGetServiceInfoArgs(serviceId);
        //TODO TODO TODO - CALLBACK & ERROR-HANDLING
        // serviceResponse, err := networkCtx.client.GetServiceInfo(context.Background(), getServiceInfoArgs)
        // if err !== nil {
        //     return nil, stacktrace.Propagate(
        //         err,
        //         "An error occurred when trying to get info for service '%v'",
        //         serviceId)
        // }
        let serviceResponse: GetServiceInfoResponse; //TODO - Remove
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
    public removeService(serviceId: ServiceID, containerStopTimeoutSeconds: number): Error {

        winston.debug("Removing service '%v'...", serviceId)
        // NOTE: This is kinda weird - when we remove a service we can never get it back so having a container
        //  stop timeout doesn't make much sense. It will make more sense when we can stop/start containers
        // Independent of adding/removing them from the network
        const args: RemoveServiceArgs = newRemoveServiceArgs(serviceId, containerStopTimeoutSeconds);
        
        // TODO TODO TODO - CALLBACK & ERROR-HANDLING
        // if _, err := networkCtx.client.RemoveService(context.Background(), args); err !== nil {
        //     return stacktrace.Propagate(err, "An error occurred removing service '%v' from the network", serviceId)
        // }

        winston.debug("Successfully removed service ID %v", serviceId)

        return null;
    }

    // Docs available at https://docs.kurtosistech.com/kurtosis-libs/lib-documentation
    public repartitionNetwork(
        partitionServices: Map<PartitionID, Set<ServiceID>>,
        partitionConnections: Map<PartitionID, Map<PartitionID, PartitionConnectionInfo>>,
        defaultConnection: PartitionConnectionInfo): Error {

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
            reqPartitionServices[partitionIdStr] = newPartitionServices(serviceIdStrSet);
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

        // TODO TODO TODO - CALLBACK & ERROR-HANDLING
        // if _, err := networkCtx.client.Repartition(context.Background(), repartitionArgs); err !== nil {
        //     return stacktrace.Propagate(err, "An error occurred repartitioning the test network")
        // }
        return null;
    }

    // Docs available at https://docs.kurtosistech.com/kurtosis-libs/lib-documentation
    public waitForEndpointAvailability(
        serviceId: ServiceID,
        port: number, 
        path: string, 
        initialDelaySeconds: number, 
        retries: number, 
        retriesDelayMilliseconds: number, 
        bodyText: string): Error {
        const availabilityArgs: WaitForEndpointAvailabilityArgs = newWaitForEndpointAvailabilityArgs(
            serviceId,
            port,
            path,
            initialDelaySeconds,
            retries,
            retriesDelayMilliseconds,
            bodyText);

        //TODO TODO TODO - CALLBACK & ERROR-HANDLING
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

        return null;
    }

    // Docs available at https://docs.kurtosistech.com/kurtosis-libs/lib-documentation
    public executeBulkCommands(bulkCommandsJson: string): Error {

        const args: ExecuteBulkCommandsArgs = newExecuteBulkCommandsArgs(bulkCommandsJson);
        
        //
        // if _, err := networkCtx.client.ExecuteBulkCommands(context.Background(), args); err !== nil {
        //     return stacktrace.Propagate(err, "An error occurred executing the following bulk commands: %v", bulkCommandsJson)
        // }
        return null
    }
}