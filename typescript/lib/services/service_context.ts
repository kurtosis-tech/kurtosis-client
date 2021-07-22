import * as bindingsJsGrpc from '../../kurtosis_core_rpc_api_bindings/api_container_service_grpc_pb'; //TODO - importing all modules or just specific ones
import * as bindingsJs from '../../kurtosis_core_rpc_api_bindings/api_container_service_pb'; //TODO (comment) - I cannont merge with above line unfortunately, can only import one module at a time MAXIMUM
import { ServiceID } from './service';
import { StaticFileID } from './container_creation_config'; 
import * as grpc from "grpc";
import * as constructors from "../constructor_calls";
var path = require("path"); //TODO - I don't if this works

// Docs available at https://docs.kurtosistech.com/kurtosis-libs/lib-documentation
class GeneratedFileFilepaths { //TODO (comment) - try interface if class doesn't work
	absoluteFilepathOnTestsuiteContainer: string;
	absoluteFilepathOnServiceContainer:   string;
}

class ServiceContext {
    
    client: bindingsJsGrpc.ApiContainerServiceClient;
    serviceId: ServiceID;
	ipAddress: string;
	testVolumeMountpointOnTestsuiteContainer: string;
	testVolumeMountpointOnServiceContainer: string;

    constructor(
        client: bindingsJsGrpc.ApiContainerServiceClient,
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
        let serviceId = this.serviceId;
        let args = constructors.newGetExecCommandArgs(serviceId, command);
        let request: grpc.requestCallback<bindingsJs.ExecCommandResponse>;

        let resp, err = this.client.execCommand(args, request); //TODO - does error checking work here ? 
        
        if (err != null) {
            return [0, null, new Error( //TODO - Error type (do I need callback?)
			    "An error occurred executing command '%v' on service '%v'", //TODO - I might not be able keep the '%v'
            )]; //TODO (comment) cannot return multipe values in typescript function, need to wrap in array or object
        }
        return resp.ExitCode, resp.LogOutput, null; //TODO (comment) resp.LogOuput was a pointer
    }

    // Docs available at https://docs.kurtosistech.com/kurtosis-libs/lib-documentation
    public generateFiles(filesToGenerateSet: Set<string>): [Map<string, GeneratedFileFilepaths>, Error] {
        let serviceId = this.serviceId;
        let fileGenerationOpts = new Map(); //TODO - Still need map since both key and value are useful ; Key (Set just needs key): string & Value: core_api_bindings.FileGenerationOptions{} - type not needed in typescript
        for (let fileId in filesToGenerateSet) {
            fileGenerationOpts[fileId] = new bindingsJs.FileGenerationOptions(); //TODO (comment) this was a pointer
            fileGenerationOpts[fileId].setFileTypeToGenerate(bindingsJs.FileGenerationOptions.FileTypeToGenerate.FILE);
        }

        let args = constructors.newGetGenerateFilesArgs(serviceId, fileGenerationOpts);
        let request: grpc.requestCallback<bindingsJs.GenerateFilesResponse>;

        let resp, err = this.client.generateFiles(args, request);
        if (err != null){
            return [null, new Error("An error occurred generating files using args: %+v")]; //TODO - can't use console.error ; no %+v maybe
        }
        let generatedFileRelativeFilepaths = resp.GeneratedFileRelativeFilepaths;

        let result = new Map(); // TODO Key:string & Value:GeneratedFileFilepaths{} - type not needed in typescript
        for (let fileId in filesToGenerateSet) {
            let relativeFilepath, found = generatedFileRelativeFilepaths[fileId]; //TODO - does this work (having map values return 2 things??)
            if (!found) {
                return [null, new Error(
                    "No filepath (relative to test volume root) was returned for file '%v', even though we requested it; this is a Kurtosis bug", //TODO - no %v maybe
                    )];
            }
            // let absFilepathOnTestsuite = new URL(this.testVolumeMountpointOnTestsuiteContainer, relativeFilepath); //TODO need to confirm this VS path
            // let absFilepathOnService = new URL(this.testVolumeMountpointOnServiceContainer, relativeFilepath);
            let absFilepathOnTestsuite = path.Join(this.testVolumeMountpointOnTestsuiteContainer, relativeFilepath);
            let absFilepathOnService = path.Join(this.testVolumeMountpointOnServiceContainer, relativeFilepath);
            let genFilePath = new GeneratedFileFilepaths(); //TODO = this might be a problem in terms of memory (direct or reference), so check
            genFilePath.absoluteFilepathOnTestsuiteContainer = absFilepathOnTestsuite;
            genFilePath.absoluteFilepathOnServiceContainer = absFilepathOnService;
            result[fileId].add(genFilePath); //TODO - = VS add()
            //}
        }
        return [result, null]; //TODO - Design decision, returning multiple values as an array
    }

    // Docs available at https://docs.kurtosistech.com/kurtosis-libs/lib-documentation
    public loadStaticFiles(usedStaticFilesSet: [Set<StaticFileID>, Error]): [Map<StaticFileID, string>, Error] { // TODO - change string to StaticFILEID ; (comment) - changed Map into Set
        let serviceId = this.serviceId;
        let staticFilesToCopyStringSet = new Map(); //TODO (comment because no Map Type) = map[string]bool{}
        for (let staticFileId in usedStaticFilesSet) {
            staticFilesToCopyStringSet[String(staticFileId)] = true;
        }

        let loadStaticFilesArgs = constructors.newGetLoadStaticFilesArgs(serviceId, staticFilesToCopyStringSet);
        let request: grpc.requestCallback<bindingsJs.LoadStaticFilesResponse>;

    	let loadStaticFilesResp, err = this.client.loadStaticFiles(loadStaticFilesArgs, request);
    	if (err != null) {
    		return [null, new Error ("An error occurred loading the requested static files into the namespace of service '%v'")]; //TODO - remove the erorr, and need to be throwing back the erorr
    	}
    	let staticFileAbsFilepathsOnService = new Map(); //TODO (comment) = original type map[StaticFileID]string{}
    	for (let staticFileId in loadStaticFilesResp.CopiedStaticFileRelativeFilepaths) { //TODO - how to for loop over map keys and values?
    		let filepathRelativeToExVolRoot = loadStaticFilesResp.CopiedStaticFileRelativeFilepaths[staticFileId];
            let absFilepathOnContainer = path.Join(this.testVolumeMountpointOnServiceContainer, filepathRelativeToExVolRoot)
    		staticFileAbsFilepathsOnService[<StaticFileID>(staticFileId)] = absFilepathOnContainer; //TODO - see if I'm typecasting correctly
    	}
    	return [staticFileAbsFilepathsOnService, null]

    }
}