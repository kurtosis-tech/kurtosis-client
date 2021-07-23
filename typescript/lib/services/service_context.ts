import { ApiContainerServiceClient } from '../../kurtosis_core_rpc_api_bindings/api_container_service_grpc_pb'; 
import { ExecCommandResponse, FileGenerationOptions, GenerateFilesResponse, LoadStaticFilesResponse } from '../../kurtosis_core_rpc_api_bindings/api_container_service_pb';
import { ServiceID } from './service';
import { StaticFileID } from './container_creation_config'; 
import * as grpc from "grpc"; 
import * as constructors from "../constructor_calls";
var path = require("path"); //TODO - I don't think this works


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
    public execCommand(command: string[]): [number, [], Error] { //TODO - [int32, pointer to []byte (comment), error ] ; is is not []`type` like []string
        const serviceId = this.serviceId;
        const args = constructors.newGetExecCommandArgs(serviceId, command);
        let request: grpc.requestCallback<ExecCommandResponse>; //TODO - Tried to implement callback through examples on Google while also respecting the actual Callback function inside grpc ; (comment) need to initalize if want to change it to const

        let resp, err = this.client.execCommand(args, request); //TODO - does error checking work here ; check the return type of execCommand, it's not an ExecCommandResponse ? ; (comment) need to initalize if want to change it to const
        
        if (err != null) {
            return [0, null, new Error( //TODO - Error type (do I need callback?)
			    "An error occurred executing command '%v' on service '%v'", //TODO - I might not be able keep the '%v', but how I throw the actual error
            )]; //TODO (comment) cannot return multipe values in typescript function, need to wrap in array or object
        }
        return [resp.ExitCode, resp.LogOutput, null]; //TODO need to make sure resp is ExecCommandResponse if I want to return this ; (comment) returning multiple values as an array
    }

    // Docs available at https://docs.kurtosistech.com/kurtosis-libs/lib-documentation
    public generateFiles(filesToGenerateSet: Set<string>): [Map<string, GeneratedFileFilepaths>, Error] {
        const serviceId = this.serviceId;
        const fileGenerationOpts = new Map(); //TODO (comment) Key: string & Value: core_api_bindings.FileGenerationOptions{}
        for (let fileId in filesToGenerateSet) { // TODO - should I change it to const
            fileGenerationOpts[fileId] = new FileGenerationOptions();
            fileGenerationOpts[fileId].setFileTypeToGenerate(FileGenerationOptions.FileTypeToGenerate.FILE); //TODO (comment) - incosistency - brackets needed = I don't think so since we need to since we only to call FILE
        }

        const args = constructors.newGetGenerateFilesArgs(serviceId, fileGenerationOpts);
        let request: grpc.requestCallback<GenerateFilesResponse>; // TODO (comment) need to initalize if want to change it to const

        let resp, err = this.client.generateFiles(args, request); //TODO - returns grpc.ClientUnaryCall, doesn't directly return error & not possible to return multiple values directly from function ; (comment) need to initalize if want to change it to const
        if (err != null){
            return [null, new Error("An error occurred generating files using args: %+v")]; //TODO - no %+v maybe, but should be throwing actual error
        }
        const generatedFileRelativeFilepaths = resp.GeneratedFileRelativeFilepaths;

        const result = new Map(); // TODO Key:string & Value:GeneratedFileFilepaths{} - type not needed in typescript
        for (let fileId in filesToGenerateSet) { //TODO - should I change to const
            //TODO - need to add check if fileID is inside map so that it it either manipulates the map or sens an error
            var relativeFilepath;
            if (generatedFileRelativeFilepaths.has(fileId)) {
                relativeFilepath = generatedFileRelativeFilepaths[fileId];
            }
            else {
                return [null, new Error(
                    "No filepath (relative to test volume root) was returned for file '%v', even though we requested it; this is a Kurtosis bug", //TODO - no %v maybe
                    )];
            }
            // let absFilepathOnTestsuite = new URL(this.testVolumeMountpointOnTestsuiteContainer, relativeFilepath); //TODO need to confirm this VS path
            // let absFilepathOnService = new URL(this.testVolumeMountpointOnServiceContainer, relativeFilepath);
            const absFilepathOnTestsuite = path.Join(this.testVolumeMountpointOnTestsuiteContainer, relativeFilepath);
            const absFilepathOnService = path.Join(this.testVolumeMountpointOnServiceContainer, relativeFilepath);
            const genFilePath = new GeneratedFileFilepaths(); //TODO = this might be a problem in terms of memory (direct or reference), so check
            genFilePath.absoluteFilepathOnTestsuiteContainer = absFilepathOnTestsuite;
            genFilePath.absoluteFilepathOnServiceContainer = absFilepathOnService;
            result.set(fileId, genFilePath); 
            //}
        }
        return [result, null]; //TODO - Design decision, returning multiple values as an array
    }

    // Docs available at https://docs.kurtosistech.com/kurtosis-libs/lib-documentation
    public loadStaticFiles(usedStaticFilesSet: Set<StaticFileID>): [Map<StaticFileID, string>, Error] { // TODO (comment) - changed Map into Set; possible to return useful erorr messages in typescript
        const serviceId = this.serviceId;
        const staticFilesToCopyStringSet = new Map(); //TODO (comment) = map[string]bool{} ; kept this as a map sinc call to loadStaticFile has map property that requires a boolean
        for (let staticFileId in usedStaticFilesSet) { //TODO - change to const?
            staticFilesToCopyStringSet[String(staticFileId)] = true;
        }

        const loadStaticFilesArgs = constructors.newGetLoadStaticFilesArgs(serviceId, staticFilesToCopyStringSet);
        let request: grpc.requestCallback<LoadStaticFilesResponse>; // TODO (comment) need to initalize if want to change it to const

    	let loadStaticFilesResp, err = this.client.loadStaticFiles(loadStaticFilesArgs, request); //TODO - need to find another way to do error checking ; (comment) need to initalize if want to change it to const
    	if (err != null) {
    		return [null, new Error ("An error occurred loading the requested static files into the namespace of service '%v'")]; //TODO - remove the erorr, and need to be throwing back the erorr
    	}
    	const staticFileAbsFilepathsOnService = new Map(); //TODO (comment) = original type map[StaticFileID]string{}
    	for (let staticFileId in loadStaticFilesResp.CopiedStaticFileRelativeFilepaths) { //TODO should I change to const
    		const filepathRelativeToExVolRoot = loadStaticFilesResp.CopiedStaticFileRelativeFilepaths[staticFileId];
            const absFilepathOnContainer = path.Join(this.testVolumeMountpointOnServiceContainer, filepathRelativeToExVolRoot)
    		staticFileAbsFilepathsOnService[<StaticFileID>(staticFileId)] = absFilepathOnContainer; //TODO - see if I'm typecasting correctly
    	}
    	return [staticFileAbsFilepathsOnService, null] //TODO - Design decision, returning multiple values as an array

    }
}