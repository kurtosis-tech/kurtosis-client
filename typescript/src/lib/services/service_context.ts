import { ApiContainerServiceClient } from '../../kurtosis_core_rpc_api_bindings/api_container_service_grpc_pb'; 
import { ExecCommandArgs, ExecCommandResponse, FileGenerationOptions, GenerateFilesArgs, GenerateFilesResponse, LoadStaticFilesArgs, LoadStaticFilesResponse } from '../../kurtosis_core_rpc_api_bindings/api_container_service_pb';
import { ServiceID } from './service';
import { StaticFileID } from './container_creation_config'; 
import { newExecCommandArgs, newGenerateFilesArgs, newFileGenerationOptions, newLoadStaticFilesArgs } from "../constructor_calls";
import { ok, err, Result } from 'neverthrow';
import * as grpc from "grpc";
import * as path from "path";
import * as jspb from "google-protobuf";

// Docs available at https://docs.kurtosistech.com/kurtosis-libs/lib-documentation
export class GeneratedFileFilepaths {
    
    private readonly absoluteFilepathHere: string;
    private readonly absoluteFilepathOnServiceContainer: string;

    constructor(absoluteFilepathHere: string, absoluteFilepathOnServiceContainer: string) {
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


export class ServiceContext {
    
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
    public async execCommand(command: string[]): Promise<Result<[number, Uint8Array | string], Error>> {
        const serviceId: ServiceID = this.serviceId;
        const args: ExecCommandArgs = newExecCommandArgs(serviceId, command);

        const promiseExecCommand: Promise<Result<ExecCommandResponse, Error>> = new Promise((resolve, _unusedReject) => {
            this.client.execCommand(args, (error: grpc.ServiceError | null, response?: ExecCommandResponse) => {
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
        const resultExecCommand: Result<ExecCommandResponse, Error> = await promiseExecCommand;
        if (!resultExecCommand.isOk()) {
            return err(resultExecCommand.error);
        }
        const resp: ExecCommandResponse = resultExecCommand.value;

        return ok([resp.getExitCode(), resp.getLogOutput()]);
        

    }

    // Docs available at https://docs.kurtosistech.com/kurtosis-libs/lib-documentation
    public async generateFiles(filesToGenerateSet: Set<string>): Promise<Result<Map<string, GeneratedFileFilepaths>, Error>> {
        const serviceId: ServiceID = this.serviceId;
        const fileGenerationOpts: Map<string, FileGenerationOptions> = new Map();
        for (const fileId of filesToGenerateSet) {
            fileGenerationOpts.set(fileId, newFileGenerationOptions());
        }

        const args: GenerateFilesArgs = newGenerateFilesArgs(serviceId, fileGenerationOpts);

        const promiseGenerateFiles: Promise<Result<GenerateFilesResponse, Error>> = new Promise((resolve, _unusedReject) => {
            this.client.generateFiles(args, (error: grpc.ServiceError | null, response?: GenerateFilesResponse) => {
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
        const resultGenerateFiles: Result<GenerateFilesResponse, Error> = await promiseGenerateFiles;
        if (!resultGenerateFiles.isOk()) {
            return err(resultGenerateFiles.error);
        } 
        const resp: GenerateFilesResponse = resultGenerateFiles.value;

        const generatedFileRelativeFilepaths: jspb.Map<string, string> = resp.getGeneratedFileRelativeFilepathsMap();

        const result: Map<string, GeneratedFileFilepaths> = new Map();
        for (const fileId of filesToGenerateSet) {
            
            if (!generatedFileRelativeFilepaths.has(fileId)) {
                return err(new Error(
                    "No filepath (relative to test volume root) was returned for file " + fileId +  ", even though we requested it; this is a Kurtosis bug"
                    )
                );
            }
            const relativeFilepath: string = generatedFileRelativeFilepaths.get(fileId)!;

            const absFilepathHere: string = path.join(this.enclaveDataVolMountpointHere, relativeFilepath);
            const absFilepathOnService: string = path.join(this.enclaveDataVolMountpointOnServiceContainer, relativeFilepath);
            const genFilePath: GeneratedFileFilepaths = new GeneratedFileFilepaths(absFilepathHere, absFilepathOnService);
            result.set(fileId, genFilePath); 
        }
        return ok(result);
    }

    // Docs available at https://docs.kurtosistech.com/kurtosis-libs/lib-documentation
    public async loadStaticFiles(usedStaticFilesSet: Set<StaticFileID>): Promise<Result<Map<StaticFileID, string>, Error>> { 
        const serviceId: ServiceID = this.serviceId;
        const staticFilesToCopyStringSet: Map<string, boolean> = new Map<string, boolean>(); 
        for (const staticFileId of usedStaticFilesSet) {
            staticFilesToCopyStringSet.set(String(staticFileId), true);
        }

        const loadStaticFilesArgs: LoadStaticFilesArgs = newLoadStaticFilesArgs(serviceId, staticFilesToCopyStringSet);
        
        const promiseLoadStaticFiles: Promise<Result<LoadStaticFilesResponse, Error>> = new Promise((resolve, _unusedReject) => {
            this.client.loadStaticFiles(loadStaticFilesArgs, (error: grpc.ServiceError | null, response?: LoadStaticFilesResponse) => {
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
        const resultLoadStaticFiles: Result<LoadStaticFilesResponse, Error> = await promiseLoadStaticFiles;
        if (!resultLoadStaticFiles.isOk()) {
            return err(resultLoadStaticFiles.error);
        }
        const loadStaticFilesResp: LoadStaticFilesResponse = resultLoadStaticFiles.value;

        const staticFileAbsFilepathsOnService: Map<StaticFileID, string> = new Map();
        for (const [staticFileId, filepathRelativeToExVolRoot] of loadStaticFilesResp.getCopiedStaticFileRelativeFilepathsMap().entries()) {
            const absFilepathOnContainer: string = path.join(this.enclaveDataVolMountpointOnServiceContainer, filepathRelativeToExVolRoot);
            staticFileAbsFilepathsOnService.set(<StaticFileID>(staticFileId), absFilepathOnContainer);
        }
        return ok(staticFileAbsFilepathsOnService);

    }
}