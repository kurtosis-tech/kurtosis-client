import { ApiContainerServiceClient } from '../../kurtosis_core_rpc_api_bindings/api_container_service_grpc_pb'; 
import { ExecCommandArgs, ExecCommandResponse, FileGenerationOptions, GenerateFilesArgs, GenerateFilesResponse, LoadStaticFilesArgs, LoadStaticFilesResponse } from '../../kurtosis_core_rpc_api_bindings/api_container_service_pb';
import { ServiceID } from './service';
import { StaticFileID } from './container_creation_config'; 
import { newGetExecCommandArgs, newGetGenerateFilesArgs, newGetFileGenerationOptions, newGetLoadStaticFilesArgs } from "../constructor_calls";
import { okAsync, ResultAsync, Result } from 'neverthrow'
import * as grpc from "grpc";
import * as path from "path";


// Docs available at https://docs.kurtosistech.com/kurtosis-libs/lib-documentation
class GeneratedFileFilepaths {
    
    private readonly absoluteFilepathHere: string;
    private readonly absoluteFilepathOnServiceContainer: string;

    constructor (
        absoluteFilepathHere: string,
        absoluteFilepathOnServiceContainer: string) {
            this.absoluteFilepathHere = absoluteFilepathHere;
            this.absoluteFilepathOnServiceContainer = absoluteFilepathOnServiceContainer;
    }   

    // Docs available at https://docs.kurtosistech.com/kurtosis-libs/lib-documentation
    public getAbsoluteFilepathHere(): string { 
        return this.absoluteFilepathHere;
    }

    // Docs available at https://docs.kurtosistech.com/kurtosis-libs/lib-documentation
    public getAbsoluteFilepathOnServiceContainer(): string { 
        return this.absoluteFilepathOnServiceContainer;
    }
}



class ServiceContext {
    
    private readonly client: ApiContainerServiceClient;
    private readonly serviceId: ServiceID;
    private readonly ipAddress: string;
    private readonly enclaveDataVolMountpointHere: string;
    private readonly enclaveDataVolMountpointOnServiceContainer: string;

    constructor(
        client: ApiContainerServiceClient,
        serviceId: ServiceID,
        ipAddress: string,
        enclaveDataVolMountpointHere: string,
        enclaveDataVolMountpointOnServiceContainer: string) {
            this.client = client;
            this.serviceId = serviceId;
            this.ipAddress = ipAddress;
            this.enclaveDataVolMountpointHere = enclaveDataVolMountpointHere;
            this.enclaveDataVolMountpointOnServiceContainer = enclaveDataVolMountpointOnServiceContainer;
    }

    // Docs available at https://docs.kurtosistech.com/kurtosis-libs/lib-documentation
    public getServiceID(): ServiceID { 
        return this.serviceId;
    }

    // Docs available at https://docs.kurtosistech.com/kurtosis-libs/lib-documentation
    public getIPAddress(): string {
        return this.ipAddress;
    }

    // Docs available at https://docs.kurtosistech.com/kurtosis-libs/lib-documentation
    public async execCommand(command: string[]): Promise<[number, Uint8Array | string, Error]> {
        const serviceId: ServiceID = this.serviceId;
        const args: ExecCommandArgs = newGetExecCommandArgs(serviceId, command);

        const promiseAsync: Promise<ResultAsync<ExecCommandResponse, Error>> = new Promise((resolve, _unusedReject) => {
            this.client.execCommand(args, (_unusedError: grpc.ServiceError, response: ExecCommandResponse) => {
                resolve(okAsync(response));
            })
        });

        const promise: Result<ExecCommandResponse, Error> = await promiseAsync;

        if (!promise.isOk()) {
            return [0, null, promise.error];
        } else {
            const resp: ExecCommandResponse = promise.value;
            return [resp.getExitCode(), resp.getLogOutput(), null];
        }

    }

    // Docs available at https://docs.kurtosistech.com/kurtosis-libs/lib-documentation
    public async generateFiles(filesToGenerateSet: Set<string>): Promise<[Map<string, GeneratedFileFilepaths>, Error]> {
        const serviceId: ServiceID = this.serviceId;
        const fileGenerationOpts: Map<string, FileGenerationOptions> = newGetFileGenerationOptions(filesToGenerateSet);

        const args: GenerateFilesArgs = newGetGenerateFilesArgs(serviceId, fileGenerationOpts);

        const promiseAsync: Promise<ResultAsync<GenerateFilesResponse, Error>> = new Promise((resolve, _unusedReject) => {
            this.client.generateFiles(args, (_unusedError: grpc.ServiceError, response: GenerateFilesResponse) => {
                resolve(okAsync(response));
            })
        });

        const promise: Result<GenerateFilesResponse, Error> = await promiseAsync;

        if (!promise.isOk()) {
            return [null, promise.error];
        } 
        const resp: GenerateFilesResponse = promise.value;

        const generatedFileRelativeFilepaths: Map<string, string> = resp.getGeneratedFileRelativeFilepathsMap();

        const result: Map<string, GeneratedFileFilepaths> = new Map();
        for (let fileId in filesToGenerateSet) {
            
            var relativeFilepath: string;
            if (!generatedFileRelativeFilepaths.has(fileId)) {
                return [null, new Error(
                    "No filepath (relative to test volume root) was returned for file " + fileId +  ", even though we requested it; this is a Kurtosis bug"
                    )
                ];
            }
            relativeFilepath = generatedFileRelativeFilepaths[fileId];

            const absFilepathHere: string = path.join(this.enclaveDataVolMountpointHere, relativeFilepath);
            const absFilepathOnService: string = path.join(this.enclaveDataVolMountpointOnServiceContainer, relativeFilepath);
            const genFilePath: GeneratedFileFilepaths = new GeneratedFileFilepaths(absFilepathHere, absFilepathOnService);
            result.set(fileId, genFilePath); 
        }
        return [result, null];
    }

    // Docs available at https://docs.kurtosistech.com/kurtosis-libs/lib-documentation
    public async loadStaticFiles(usedStaticFilesSet: Set<StaticFileID>): Promise<[Map<StaticFileID, string>, Error]> { 
        const serviceId: ServiceID = this.serviceId;
        const staticFilesToCopyStringSet: Map<string, boolean> = new Map(); 
        for (let staticFileId in usedStaticFilesSet) {
            staticFilesToCopyStringSet[String(staticFileId)] = true;
        }

        const loadStaticFilesArgs: LoadStaticFilesArgs = newGetLoadStaticFilesArgs(serviceId, staticFilesToCopyStringSet);
        
        const promiseAsync: Promise<ResultAsync<LoadStaticFilesResponse, Error>> = new Promise((resolve, _unusedReject) => {
            this.client.loadStaticFiles(loadStaticFilesArgs, (_unusedError: grpc.ServiceError, response: LoadStaticFilesResponse) => {
                resolve(okAsync(response));
            })
        });

        const promise: Result<LoadStaticFilesResponse, Error> = await promiseAsync;

        if (!promise.isOk()) {
            return [null, promise.error];
        }
        const loadStaticFilesResp: LoadStaticFilesResponse = promise.value;

        const staticFileAbsFilepathsOnService: Map<StaticFileID, string> = new Map();
        for (let staticFileId in loadStaticFilesResp.getCopiedStaticFileRelativeFilepathsMap()) {
            const filepathRelativeToExVolRoot: string = loadStaticFilesResp.getCopiedStaticFileRelativeFilepathsMap()[staticFileId];
            const absFilepathOnContainer: string = path.join(this.enclaveDataVolMountpointOnServiceContainer, filepathRelativeToExVolRoot)
            staticFileAbsFilepathsOnService[<StaticFileID>(staticFileId)] = absFilepathOnContainer;
        }
        return [staticFileAbsFilepathsOnService, null] 

    }
}