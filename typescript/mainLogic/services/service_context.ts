/*package services*/ //TODO Get rid of this, not needed in typescript

//import ( //TODO TODO TODO!!!!!! - Make sure to adjust variable name to lowerCamelCase (except classes, enums, enum members)
	//"context" //TODO Don't need context for typescript, golang specific
import * as core_api_bindings_js_grpc from '../../core_api_bindings/api_container_service_grpc_pb.js'; //TODO - camelCase VS snake_case ; do I need asterisk?
import * as core_api_bindings_js from '../../core_api_bindings/api_container_service_pb.js'; //TODO - extra line, I might be able to reduce this with line above ; * = importing everything ? Can I use this to get rid of this line
var path = require("path"); //"path" - TODO importing from node.js potentially
//)

// Docs available at https://docs.kurtosistech.com/kurtosis-libs/lib-documentation
class GeneratedFileFilepaths { //TODO (comment) - try interface if class doesn't work
	absoluteFilepathOnTestsuiteContainer: string;
	absoluteFilepathOnServiceContainer:   string;
}

// Docs available at https://docs.kurtosistech.com/kurtosis-libs/lib-documentation
interface ServiceContext { //TODO lowerCamelCase ; maybe a class (I might not need this, since I already have a class)
	client:                                   core_api_bindings_js_grpc.ApiContainerServiceClient;
	serviceId:                                ServiceID;
	ipAddress:                                string;
	testVolumeMountpointOnTestsuiteContainer: string;
	testVolumeMountpointOnServiceContainer:   string;
}

// function NewServiceContext ( //TODO lowerCamelCase - functions //TODO = The constructor in typescript replaces this
// 		client: core_api_bindings_js_grpc.ApiContainerServiceClient,
// 		serviceId: ServiceID,
// 		ipAddress: string,
// 		testVolumeMountpointOnTestsuiteContainer: string,
// 		testVolumeMountpointOnServiceContainer: string) { //TODO - Return type for function, typescript doesn't need
// 	let NewServiceContext = { //TODO - don't want this name to be the same as function name
//         client:                                   client,
//         serviceId:                                serviceId,
//         ipAddress:                                ipAddress,
//         testVolumeMountpointOnTestsuiteContainer: testVolumeMountpointOnTestsuiteContainer,
//         testVolumeMountpointOnServiceContainer: testVolumeMountpointOnServiceContainer,
//     }
//     return NewServiceContext; //TODO (comment) return pointer in golang, but typescript's reference variables implciltly point into the heap
//}

class ServiceContext { //TODO Should only be adding methods into a class, you can't link to a struct in typescript like in golang
    
    client: core_api_bindings_js_grpc.ApiContainerServiceClient;
    serviceId: ServiceID;
	ipAddress: string; //TODO - there might indentation issue here
	testVolumeMountpointOnTestsuiteContainer: string;
	testVolumeMountpointOnServiceContainer: string;

    constructor(
        client: core_api_bindings_js_grpc.ApiContainerServiceClient,
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
    public execCommand(command: string[]): [number, []string, Error] { //TODO - [int32, pointer to []byte (comment), error ]
        let serviceId = this.serviceId;
        let args = new core_api_bindings_js.ExecCommandArgs(); //TODO - try to find a constructor for this ; (comment) this was also a pointer before
        args.setServiceId(serviceId); //TODO - get rid of setters if possible
        args.setCommandArgsList(command);

        let resp, err = this.client.execCommand(args); //TODO - does error checking work here ? ; no context needed in typescript, so what should I do here?
        if (err != null) {
            return [0, null, new Error( //TODO - should not be using console.error, Error type (do I need callback?)
			    "An error occurred executing command '%v' on service '%v'", //TODO - I might not be able keep the '%v'
            )]; //TODO (comment) cannot return multipe values in typescript function, need to wrap in array or object
        }
        return resp.ExitCode, resp.LogOutput, null; //TODO (comment) resp.LogOuput was a pointer
    }

    // Docs available at https://docs.kurtosistech.com/kurtosis-libs/lib-documentation
    public generateFiles(filesToGenerateSet: Set<string>): [Set<GeneratedFileFilepaths>, Error] { //TODO - use a formalized Set type ; no Map<string, bool>, can we safely remove the bool? ; return Set as well?
        let serviceId = this.serviceId;
        let fileGenerationOpts = new Set(); //TODO - Key (Set just needs key): string & Value: core_api_bindings.FileGenerationOptions{} - type not needed in typescript
        for (let fileId in filesToGenerateSet) {
            fileGenerationOpts[fileId] = new core_api_bindings_js.FileGenerationOptions(); //TODO - need actual constructor ; (comment) this was a pointer
            fileGenerationOpts[fileId].setFileTypeToGenerate(core_api_bindings_js.FileGenerationOptions.FileTypeToGenerate.FILE);
        }

        let args = new core_api_bindings_js.GenerateFilesArgs(); //TODO - want to use constructor ; not setters ; (comment) this was a pointer
        args.setServiceId(String(serviceId)); 
        args.getFilesToGenerateMap(fileGenerationOpts); //TODO - No option to set FilesToGenerateMap (should this be the case)??
        //}
        let resp, err = this.client.generateFiles(args); //TODO TODO - don't need context, what to do?
        if (err != null){
            return [null, console.error(err, "An error occurred generating files using args: %+v", args)]; //TODO - can't use console.error
        }
        let generatedFileRelativeFilepaths = resp.GeneratedFileRelativeFilepaths

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
    public loadStaticFiles(usedStaticFilesSet): [Map<string, bool>, Error] { //TODO - string VS StaticFileID ; do I still need a map
        let serviceId = this.serviceId;
        let staticFilesToCopyStringSet = new Map(); //TODO (comment because no Map Type) = map[string]bool{}
        for (let staticFileId in usedStaticFilesSet) {
            staticFilesToCopyStringSet[String(staticFileId)] = true;
        }
    	// let loadStaticFilesArgs = core_api_bindings_js.LoadStaticFilesArgs{ //TODO - pointer, but no need in typescript ; need to do constructor call if possible
    	// 	ServiceId:   string(serviceId),
    	// 	StaticFiles: staticFilesToCopyStringSet,
    	// }
    	// loadStaticFilesResp, err := this.client.LoadStaticFiles(loadStaticFilesArgs)
    	// if err != nil {
    	// 	return nil, stacktrace.Propagate(err, "An error occurred loading the requested static files into the namespace of service '%v'", serviceId)
    	// }
    	// staticFileAbsFilepathsOnService := map[StaticFileID]string{}
    	// for staticFileId, filepathRelativeToExVolRoot := range loadStaticFilesResp.CopiedStaticFileRelativeFilepaths {
    	// 	absFilepathOnContainer := path.Join(self.testVolumeMountpointOnServiceContainer, filepathRelativeToExVolRoot)
    	// 	staticFileAbsFilepathsOnService[StaticFileID(staticFileId)] = absFilepathOnContainer
    	// }
    	// return staticFileAbsFilepathsOnService, nil

    }
}