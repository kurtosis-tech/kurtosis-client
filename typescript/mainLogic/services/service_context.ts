/*package services*/ //TODO Get rid of this, not needed in typescript

//import ( //TODO TODO TODO!!!!!! - Make sure to adjust variable name to lowerCamelCase (except classes, enums, enum members)
	//"context" //TODO Don't need context for typescript, golang specific
import * as core_api_bindings_js_grpc from '../../core_api_bindings/api_container_service_grpc_pb.js';
import core_api_bindings_js from '../../core_api_bindings/api_container_service_pb.js'; //TODO - extra line, I might be able to reduce this with line above
//	"github.com/palantir/stacktrace" //import stacktrace = require('github.com/palantir/stacktrace'); // TODO - Don't need stackTrace for golang
	var path = require("path"); //"path" - TODO importing from node.js potentially
//)

// Docs available at https://docs.kurtosistech.com/kurtosis-libs/lib-documentation
interface GeneratedFileFilepaths { //TODO Chose to use interface to represent struct, will need to test to see if this hypothesis works (might be a class)
	absoluteFilepathOnTestsuiteContainer: string;
	absoluteFilepathOnServiceContainer:   string;
}

// Docs available at https://docs.kurtosistech.com/kurtosis-libs/lib-documentation
interface ServiceContext { //TODO lowerCamelCase ; maybe a class
	client:                                   core_api_bindings_js_grpc.ApiContainerServiceClient;
	serviceId:                                ServiceID;
	ipAddress:                                string;
	testVolumeMountpointOnTestsuiteContainer: string;
	testVolumeMountpointOnServiceContainer:   string;
}

function NewServiceContext ( //TODO lowerCamelCase
		client: core_api_bindings_js_grpc.ApiContainerServiceClient,
		serviceId: ServiceID,
		ipAddress: string,
		testVolumeMountpointOnTestsuiteContainer: string,
		testVolumeMountpointOnServiceContainer: string) { //TODO - Return type for function, typescript doesn't need
	let NewServiceContext = {
        client:                                   client,
        serviceId:                                serviceId,
        ipAddress:                                ipAddress,
        testVolumeMountpointOnTestsuiteContainer: testVolumeMountpointOnTestsuiteContainer,
        testVolumeMountpointOnServiceContainer: testVolumeMountpointOnServiceContainer,
    }
    return NewServiceContext; //TODO return pointer in golang, but typescript's reference variables implciltly point into the heap
}

class ServiceContext { //TODO Should only be adding methods into a class, you can't link to a struct in typescript like in golang
    
    client: core_api_bindings_js_grpc.ApiContainerServiceClient;
    serviceId: ServiceID;
	ipAddress: string;
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
    public GetServiceID() { 
        return this.serviceId;
    }

    // Docs available at https://docs.kurtosistech.com/kurtosis-libs/lib-documentation
    public GetIPAddress() {
        return this.ipAddress;
    }

    // Docs available at https://docs.kurtosistech.com/kurtosis-libs/lib-documentation
    public ExecCommand(command: string[]) {
        let serviceId = this.serviceId;
        let args = new core_api_bindings_js.ExecCommandArgs();
        args.setServiceId(serviceId);
        args.setCommandArgsList(command);

        let resp, err = this.client.execCommand(args); //TODO - no context needed in typescript, so what should I do here?
        if (err != null) {
            return [0, null, console.error(
                err,
			    "An error occurred executing command '%v' on service '%v'",
			    command,
			    serviceId
            )]; //TODO cannot return multipe values in typescript function, need to wrap in array or object
        }
        return resp.ExitCode, resp.LogOutput, null;
    }

    // Docs available at https://docs.kurtosistech.com/kurtosis-libs/lib-documentation
    public GenerateFiles(filesToGenerateSet: Map<string, boolean>) {
        let serviceId = this.serviceId;
        let fileGenerationOpts = new Map(); //Key: string & Value: core_api_bindings.FileGenerationOptions{} - type not needed in typescript
        for (let fileId in filesToGenerateSet) {
            fileGenerationOpts[fileId] = new core_api_bindings_js.FileGenerationOptions();
            fileGenerationOpts[fileId].setFileTypeToGenerate(core_api_bindings_js.FileGenerationOptions.FileTypeToGenerate); //TODO - Check this
        }

        let args = new core_api_bindings_js.GenerateFilesArgs();
        args.setServiceId(String(serviceId));
        args.getFilesToGenerateMap(fileGenerationOpts); //TODO - No option to set FilesToGenerateMap (should this be the case)??

        let resp, err = this.client.generateFiles(args) //TODO TODO - don't need context, what to do?
        if (err != null){
            return [null, console.error(err, "An error occurred generating files using args: %+v", args)];
        }
        let generatedFileRelativeFilepaths = resp.GeneratedFileRelativeFilepaths

        let result = new Map(); // TODO Key:string & Value:GeneratedFileFilepaths{} - type not needed in typescript
        for (let fileId in filesToGenerateSet) {
            let relativeFilepath, found = generatedFileRelativeFilepaths[fileId]
            if (!found) {
                return [null, console.error(
                    "No filepath (relative to test volume root) was returned for file '%v', even though we requested it; this is a Kurtosis bug",
                    fileId)]
            }
            // let absFilepathOnTestsuite = new URL(this.testVolumeMountpointOnTestsuiteContainer, relativeFilepath); //TODO need to confirm this VS path
            // let absFilepathOnService = new URL(this.testVolumeMountpointOnServiceContainer, relativeFilepath);
            let absFilepathOnTestsuite = path.Join(this.testVolumeMountpointOnTestsuiteContainer, relativeFilepath)
            let absFilepathOnService = path.Join(this.testVolumeMountpointOnServiceContainer, relativeFilepath)
            // result[fileId] = GeneratedFileFilepaths{ //TODO - need to use interface defined above to pass it into result
            //     {AbsoluteFilepathOnTestsuiteContainer: absFilepathOnTestsuite}
            //     {AbsoluteFilepathOnServiceContainer:   absFilepathOnService}
            // }
        }
        return [result, null]; //TODO - Design decision, returning multiple values as an array
    }

    // Docs available at https://docs.kurtosistech.com/kurtosis-libs/lib-documentation
    public LoadStaticFiles(usedStaticFilesSet) { //TODO - removed the function return type - typescript doesn't need it
        let serviceId = this.serviceId
        let staticFilesToCopyStringSet = new Map() //TODO - no Map type
        for (let staticFileId in usedStaticFilesSet) {
            staticFilesToCopyStringSet[String(staticFileId)] = true
        }
    	let loadStaticFilesArgs = core_api_bindings_js.LoadStaticFilesArgs{ //TODO - was a pointer, but don't need this in typescript
    		ServiceId:   string(serviceId),
    		StaticFiles: staticFilesToCopyStringSet,
    	}
    // 	loadStaticFilesResp, err := self.client.LoadStaticFiles(context.Background(), loadStaticFilesArgs)
    // 	if err != nil {
    // 		return nil, stacktrace.Propagate(err, "An error occurred loading the requested static files into the namespace of service '%v'", serviceId)
    // 	}
    // 	staticFileAbsFilepathsOnService := map[StaticFileID]string{}
    // 	for staticFileId, filepathRelativeToExVolRoot := range loadStaticFilesResp.CopiedStaticFileRelativeFilepaths {
    // 		absFilepathOnContainer := path.Join(self.testVolumeMountpointOnServiceContainer, filepathRelativeToExVolRoot)
    // 		staticFileAbsFilepathsOnService[StaticFileID(staticFileId)] = absFilepathOnContainer
    // 	}
    // 	return staticFileAbsFilepathsOnService, nil

    }
}