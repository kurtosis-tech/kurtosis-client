import { ApiContainerServiceClient } from '../../kurtosis_core_rpc_api_bindings/api_container_service_grpc_pb'; 
import { ExecCommandArgs, ExecCommandResponse, FileGenerationOptions, GenerateFilesArgs, GenerateFilesResponse, LoadStaticFilesArgs, LoadStaticFilesResponse } from '../../kurtosis_core_rpc_api_bindings/api_container_service_pb';
import { ServiceID } from './service';
import { StaticFileID } from './container_creation_config'; 
import { newExecCommandArgs, newGenerateFilesArgs, newFileGenerationOptions, newLoadStaticFilesArgs } from "../constructor_calls";
import { okAsync, errAsync, ResultAsync, ok, err, Result } from 'neverthrow';
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

        const promiseExecCommand: Promise<ResultAsync<ExecCommandResponse, Error>> = new Promise((resolve, _unusedReject) => {
            this.client.execCommand(args, (error: grpc.ServiceError | null, response?: ExecCommandResponse) => {
                if (error === null) {
                    if (!response) {
                        resolve(errAsync(new Error("No error was encountered but the response was still falsy; this should never happen")));
                    } else {
                        resolve(okAsync(response!));
                    }
                } else {
                    resolve(errAsync(error));
                }
            })
        });
        let resultExecCommand: Result<ExecCommandResponse, Error>;
        try {
            resultExecCommand = await promiseExecCommand;
        } catch (exception: any) {
            // Sadly, we have to do this because there's no great way to enforce the caught thing being an error
            // See: https://stackoverflow.com/questions/30469261/checking-for-typeof-error-in-js
            if (exception && exception.stack && exception.message) {
                return err(exception as Error);
            }
            return err(new Error("Resolving promise with ExecCommand threw an exception, but " +
                "it's not an Error so we can't report any more information than this"));
        }

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

        const promiseGenerateFiles: Promise<ResultAsync<GenerateFilesResponse, Error>> = new Promise((resolve, _unusedReject) => {
            this.client.generateFiles(args, (error: grpc.ServiceError | null, response?: GenerateFilesResponse) => {
                if (error === null) {
                    if (!response) {
                        resolve(errAsync(new Error("No error was encountered but the response was still falsy; this should never happen")));
                    } else {
                        resolve(okAsync(response!));
                    }
                } else {
                    resolve(errAsync(error));
                }
            })
        });
        let resultGenerateFiles: Result<GenerateFilesResponse, Error>;
        try {
            resultGenerateFiles = await promiseGenerateFiles;
        } catch (exception: any) {
            // Sadly, we have to do this because there's no great way to enforce the caught thing being an error
            // See: https://stackoverflow.com/questions/30469261/checking-for-typeof-error-in-js
            if (exception && exception.stack && exception.message) {
                return err(exception as Error);
            }
            return err(new Error("Resolving promise with GenerateFiles threw an exception, but " +
                "it's not an Error so we can't report any more information than this"));
        }

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
        
        const promiseLoadStaticFiles: Promise<ResultAsync<LoadStaticFilesResponse, Error>> = new Promise((resolve, _unusedReject) => {
            this.client.loadStaticFiles(loadStaticFilesArgs, (error: grpc.ServiceError | null, response?: LoadStaticFilesResponse) => {
                if (error === null) {
                    if (!response) {
                        resolve(errAsync(new Error("No error was encountered but the response was still falsy; this should never happen")));
                    } else {
                        resolve(okAsync(response!));
                    }
                } else {
                    resolve(errAsync(error));
                }
            })
        });
        let resultLoadStaticFiles: Result<LoadStaticFilesResponse, Error>;
        try {
            resultLoadStaticFiles = await promiseLoadStaticFiles;
        } catch (exception: any) {
            // Sadly, we have to do this because there's no great way to enforce the caught thing being an error
            // See: https://stackoverflow.com/questions/30469261/checking-for-typeof-error-in-js
            if (exception && exception.stack && exception.message) {
                return err(exception as Error);
            }
            return err(new Error("Resolving promise with LoadStaticFiles threw an exception, but " +
                "it's not an Error so we can't report any more information than this"));
        }

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