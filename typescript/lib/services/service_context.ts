import { ApiContainerServiceClient } from '../../kurtosis_core_rpc_api_bindings/api_container_service_grpc_pb'; 
import { ExecCommandArgs, ExecCommandResponse, FileGenerationOptions, GenerateFilesArgs, GenerateFilesResponse, LoadStaticFilesArgs, LoadStaticFilesResponse } from '../../kurtosis_core_rpc_api_bindings/api_container_service_pb';
import { ServiceID } from './service';
import { StaticFileID } from './container_creation_config'; 
import * as grpc from "grpc"; 
import { newGetExecCommandArgs, newGetGenerateFilesArgs, newGetFileGenerationOptions, newGetLoadStaticFilesArgs } from "../constructor_calls";
var path = require("path"); //TODO - I don't think this works, but it has been installed with grpc


// Docs available at https://docs.kurtosistech.com/kurtosis-libs/lib-documentation
class GeneratedFileFilepaths { //TODO (comment) - try interface if class doesn't work
	absoluteFilepathOnTestsuiteContainer: string;
	absoluteFilepathOnServiceContainer:   string;
}

class ServiceContext {
    
    private readonly client: ApiContainerServiceClient;
    private readonly serviceId: ServiceID;
    private readonly ipAddress: string;
    private readonly testVolumeMountpointOnTestsuiteContainer: string;
    private readonly testVolumeMountpointOnServiceContainer: string;

    constructor(
        client: ApiContainerServiceClient,
        serviceId: ServiceID,
        ipAddress: string,
        testVolumeMountpointOnTestsuiteContainer: string,
        testVolumeMountpointOnServiceContainer: string) {
            this.client = client;
            this.serviceId = serviceId;
            this.ipAddress = ipAddress;
            this.testVolumeMountpointOnTestsuiteContainer = testVolumeMountpointOnTestsuiteContainer;
            this.testVolumeMountpointOnServiceContainer = testVolumeMountpointOnServiceContainer;
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
    public execCommand(command: string[]): [number, Uint8Array | string, Error] { //TODO In golang: [int32, pointer to []byte (comment), error ] ; Following types in _pb.d.ts
        const serviceId: ServiceID = this.serviceId;
        const args: ExecCommandArgs = newGetExecCommandArgs(serviceId, command);
        let request: grpc.requestCallback<ExecCommandResponse>; //TODO - Tried to implement callback through examples on Google while also respecting the actual Callback function inside grpc ; (comment) need to initalize if want to change it to const

        let resp, err = this.client.execCommand(args, request); //TODO - does error checking work here ; check the return type of execCommand, it's not an ExecCommandResponse ? ; (comment) need to initalize if want to change it to const ; try adding type assertion
        
        if (err !== null) {
            return [0, null, new Error( //TODO - Error type (do I need callback?)
			    "An error occurred executing command '%v' on service '%v'", //TODO - I might not be able keep the '%v', but how I throw the actual error
            )];
        }
        return [resp.ExitCode, resp.LogOutput, null]; //TODO need to make sure resp is ExecCommandResponse if I want to return this
    }

    // Docs available at https://docs.kurtosistech.com/kurtosis-libs/lib-documentation
    public generateFiles(filesToGenerateSet: Set<string>): [Map<string, GeneratedFileFilepaths>, Error] {
        const serviceId: ServiceID = this.serviceId;
        const fileGenerationOpts: Map<string, FileGenerationOptions> = newGetFileGenerationOptions(filesToGenerateSet);

        const args: GenerateFilesArgs = newGetGenerateFilesArgs(serviceId, fileGenerationOpts);
        let request: grpc.requestCallback<GenerateFilesResponse>; // TODO (comment) need to initalize if want to change it to const

        let resp, err = this.client.generateFiles(args, request); //TODO - returns grpc.ClientUnaryCall, doesn't directly return error & not possible to return multiple values directly from function ; (comment) need to initalize if want to change it to const, type assertion
        if (err !== null){
            return [null, new Error("An error occurred generating files using args: %+v")]; //TODO - no %+v maybe, but should be throwing actual error
        }
        const generatedFileRelativeFilepaths: Map<string, string> = resp.GeneratedFileRelativeFilepaths;

        const result: Map<string, GeneratedFileFilepaths> = new Map();
        for (let fileId in filesToGenerateSet) { //TODO - should I change to const
            
            var relativeFilepath: string;
            if (!generatedFileRelativeFilepaths.has(fileId)) {
                return [null, new Error(
                    "No filepath (relative to test volume root) was returned for file '%v', even though we requested it; this is a Kurtosis bug", //TODO - no %v maybe
                    )];
            }
            relativeFilepath = generatedFileRelativeFilepaths[fileId];

            const absFilepathOnTestsuite: string = path.Join(this.testVolumeMountpointOnTestsuiteContainer, relativeFilepath);
            const absFilepathOnService: string = path.Join(this.testVolumeMountpointOnServiceContainer, relativeFilepath);
            const genFilePath: GeneratedFileFilepaths = new GeneratedFileFilepaths();

            genFilePath.absoluteFilepathOnTestsuiteContainer = absFilepathOnTestsuite;
            genFilePath.absoluteFilepathOnServiceContainer = absFilepathOnService;
            result.set(fileId, genFilePath); 
        }
        return [result, null];
    }

    // Docs available at https://docs.kurtosistech.com/kurtosis-libs/lib-documentation
    public loadStaticFiles(usedStaticFilesSet: Set<StaticFileID>): [Map<StaticFileID, string>, Error] { // TODO (comment) - changed Map into Set; possible to return useful erorr messages in typescript
        const serviceId: ServiceID = this.serviceId;
        const staticFilesToCopyStringSet: Map<string, boolean> = new Map(); 
        for (let staticFileId in usedStaticFilesSet) { //TODO - change to const?
            staticFilesToCopyStringSet[String(staticFileId)] = true;
        }

        const loadStaticFilesArgs: LoadStaticFilesArgs = newGetLoadStaticFilesArgs(serviceId, staticFilesToCopyStringSet);
        let request: grpc.requestCallback<LoadStaticFilesResponse>; // TODO (comment) need to initalize if want to change it to const

    	let loadStaticFilesResp, err = this.client.loadStaticFiles(loadStaticFilesArgs, request); //TODO - need to find another way to do error checking ; (comment) need to initalize if want to change it to const, type assertions
    	if (err !== null) {
    		return [null, new Error ("An error occurred loading the requested static files into the namespace of service '%v'")]; //TODO - remove the erorr, and need to be throwing back the erorr
    	}
    	const staticFileAbsFilepathsOnService: Map<StaticFileID, string> = new Map();
    	for (let staticFileId in loadStaticFilesResp.CopiedStaticFileRelativeFilepaths) { //TODO should I change to const
    		const filepathRelativeToExVolRoot: string = loadStaticFilesResp.CopiedStaticFileRelativeFilepaths[staticFileId];
            const absFilepathOnContainer: string = path.Join(this.testVolumeMountpointOnServiceContainer, filepathRelativeToExVolRoot)
    		staticFileAbsFilepathsOnService[<StaticFileID>(staticFileId)] = absFilepathOnContainer; //TODO - see if I'm typecasting correctly
    	}
    	return [staticFileAbsFilepathsOnService, null] 

    }
}