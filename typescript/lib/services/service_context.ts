import { ApiContainerServiceClient } from '../../kurtosis_core_rpc_api_bindings/api_container_service_grpc_pb'; 
import { ExecCommandArgs, ExecCommandResponse, FileGenerationOptions, GenerateFilesArgs, GenerateFilesResponse, LoadStaticFilesArgs, LoadStaticFilesResponse } from '../../kurtosis_core_rpc_api_bindings/api_container_service_pb';
import { ServiceID } from './service';
import { StaticFileID } from './container_creation_config'; 
import { newGetExecCommandArgs, newGetGenerateFilesArgs, newGetFileGenerationOptions, newGetLoadStaticFilesArgs } from "../constructor_calls";
import * as grpc from "grpc";
import * as path from "path";


// Docs available at https://docs.kurtosistech.com/kurtosis-libs/lib-documentation
class GeneratedFileFilepaths {
	
    private readonly absoluteFilepathHere: string;
	private readonly absoluteFilepathOnServiceContainer: string;

    constructor (
        absoluteFilepath: string,
        absoluteFilepathOnServiceContainer: string) {
            this.absoluteFilepathHere = absoluteFilepath;
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
    public execCommand(command: string[]): [number, Uint8Array | string, Error] {
        const serviceId: ServiceID = this.serviceId;
        const args: ExecCommandArgs = newGetExecCommandArgs(serviceId, command);

        var resp: ExecCommandResponse;
        var error: grpc.ServiceError;
        this.client.execCommand(args, function(error, feature){ //TODO (comment) - don't use return value, but use callback parameters
            error = error; 
            resp = feature;
        });
        
        //TODO (comment) - Will this error checking propogate as needed (Kevin mentioned that returning error as-is is good enough)
        if (error != null) {
            return [0, null, error] //TODO - passing in actual error, but no personalized message
        }
        return [resp.getExitCode(), resp.getLogOutput(), null];
    }

    // Docs available at https://docs.kurtosistech.com/kurtosis-libs/lib-documentation
    public generateFiles(filesToGenerateSet: Set<string>): [Map<string, GeneratedFileFilepaths>, Error] {
        const serviceId: ServiceID = this.serviceId;
        const fileGenerationOpts: Map<string, FileGenerationOptions> = newGetFileGenerationOptions(filesToGenerateSet);

        const args: GenerateFilesArgs = newGetGenerateFilesArgs(serviceId, fileGenerationOpts);
        
        //TODO - pending implementation of callback and error handling like execCommand
        let request: grpc.requestCallback<GenerateFilesResponse>; 
        let resp, err = this.client.generateFiles(args, request); 
        if (err !== null){
            return [null, new Error("An error occurred generating files using args: %+v")];
        }
        
        const generatedFileRelativeFilepaths: Map<string, string> = resp.GeneratedFileRelativeFilepaths;

        const result: Map<string, GeneratedFileFilepaths> = new Map();
        for (let fileId in filesToGenerateSet) {
            
            var relativeFilepath: string;
            if (!generatedFileRelativeFilepaths.has(fileId)) {
                return [null, new Error(
                    "No filepath (relative to test volume root) was returned for a fileId, even though we requested it; this is a Kurtosis bug" //TODO (comment) - passing in filename is non-standard practice (MDN)
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
    public loadStaticFiles(usedStaticFilesSet: Set<StaticFileID>): [Map<StaticFileID, string>, Error] { 
        const serviceId: ServiceID = this.serviceId;
        const staticFilesToCopyStringSet: Map<string, boolean> = new Map(); 
        for (let staticFileId in usedStaticFilesSet) {
            staticFilesToCopyStringSet[String(staticFileId)] = true;
        }

        const loadStaticFilesArgs: LoadStaticFilesArgs = newGetLoadStaticFilesArgs(serviceId, staticFilesToCopyStringSet);
        
        //TODO - pending implementation of callback and error handling like execCommand
        let request: grpc.requestCallback<LoadStaticFilesResponse>;
    	let loadStaticFilesResp, err = this.client.loadStaticFiles(loadStaticFilesArgs, request);
    	if (err !== null) {
    		return [null, new Error ("An error occurred loading the requested static files into the namespace of service '%v'")];
    	}

    	const staticFileAbsFilepathsOnService: Map<StaticFileID, string> = new Map();
    	for (let staticFileId in loadStaticFilesResp.CopiedStaticFileRelativeFilepaths) {
    		const filepathRelativeToExVolRoot: string = loadStaticFilesResp.CopiedStaticFileRelativeFilepaths[staticFileId];
            const absFilepathOnContainer: string = path.join(this.enclaveDataVolMountpointOnServiceContainer, filepathRelativeToExVolRoot)
    		staticFileAbsFilepathsOnService[<StaticFileID>(staticFileId)] = absFilepathOnContainer;
    	}
    	return [staticFileAbsFilepathsOnService, null] 

    }
}