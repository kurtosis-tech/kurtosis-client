/*package services*/

//TODO TODO TODO - fix imports

/*import (
	"context"
	"github.com/palantir/stacktrace" //
	"path"
)*/

import * as core_api_bindings from '../core_api_bindings'; //TODO - package.json?
//import stacktrace = require('github.com/palantir/stacktrace');

// Docs available at https://docs.kurtosistech.com/kurtosis-libs/lib-documentation
interface GeneratedFileFilepaths {
	AbsoluteFilepathOnTestsuiteContainer: string;
	AbsoluteFilepathOnServiceContainer:   string;
}

// // Docs available at https://docs.kurtosistech.com/kurtosis-libs/lib-documentation
// interface ServiceContext {
// 	//client:                                   core_api_bindings.ApiContainerServiceClient;
// 	serviceId:                                ServiceID;
// 	ipAddress:                               string;
// 	testVolumeMountpointOnTestsuiteContainer: string;
// 	testVolumeMountpointOnServiceContainer:   string;
// }

// function NewServiceContext (
// 		//client core_api_bindings.ApiContainerServiceClient,
// 		serviceId: ServiceID,
// 		ipAddress: string,
// 		testVolumeMountpointOnTestsuiteContainer: string,
// 		testVolumeMountpointOnServiceContainer: string) {
	
//     let NewServiceContext = {
//         //client:                                   client,
//         serviceId:                                serviceId,
//         ipAddress:                                ipAddress,
//         testVolumeMountpointOnTestsuiteContainer: testVolumeMountpointOnTestsuiteContainer,
//         testVolumeMountpointOnServiceContainer: testVolumeMountpointOnServiceContainer,
//     }
//     return NewServiceContext;

//     // return ServiceContext{
// 	// 	client:                                   client,
// 	// 	serviceId:                                serviceId,
// 	// 	ipAddress:                                ipAddress,
// 	// 	testVolumeMountpointOnTestsuiteContainer: testVolumeMountpointOnTestsuiteContainer,
// 	// 	testVolumeMountpointOnServiceContainer: testVolumeMountpointOnServiceContainer,
// 	// }
// }

class ServiceContext {
    
    client: core_api_bindings.ApiContainerServiceClient;
    serviceId: ServiceID;
	ipAddress: string;
	testVolumeMountpointOnTestsuiteContainer: string;
	testVolumeMountpointOnServiceContainer: string;

    constructor(
        client: core_api_bindings.ApiContainerServiceClient,
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
        // let args = core_api_bindings.ExecCommandArgs{ //TODO -> pointer - &core_
        //     ServiceId: String(serviceId),
        //     CommandArgs: command,
        // }
        let resp, err = this.client.ExecCommand(context.Background(), args) //context.Background() = WeakMap
        if (err != null) {
            return 0, null, stacktrace.Propagate(
                err,
                "An error occurred executing command '%v' on service '%v'",
                command,
                serviceId);
        }
        return resp.ExitCode, resp.LogOutput, null; //TODO -> pointer - &resp.LogOutput
    }

    // Docs available at https://docs.kurtosistech.com/kurtosis-libs/lib-documentation
    public GenerateFiles(filesToGenerateSet: Map<string, boolean>) {
        let serviceId = this.serviceId;
        let fileGenerationOpts = new Map(); //TODO - map type?
        for (let fileId in filesToGenerateSet) {
            //fileGenerationOpts[fileId] = &core_api_bindings.FileGenerationOptions{
            //     FileTypeToGenerate: core_api_bindings.FileGenerationOptions_FILE,
            // }
        }
        // let args = &core_api_bindings.GenerateFilesArgs{
        //     ServiceId:       String(serviceId),
        //     FilesToGenerate: fileGenerationOpts
        // }
        // let resp, err = self.client.GenerateFiles(context.Background(), args) //context.Background() = WeakMap
        // if err != nil {
        //     return nil, stacktrace.Propagate(err, "An error occurred generating files using args: %+v", args)
        // }
        let generatedFileRelativeFilepaths = resp.GeneratedFileRelativeFilepaths

        let result = new Map(); // TODO - may type?
        for (let fileId in filesToGenerateSet) {
            let relativeFilepath, found = generatedFileRelativeFilepaths[fileId]
            // if (!found) {
            //     return null, stacktrace.NewError(
            //         "No filepath (relative to test volume root) was returned for file '%v', even though we requested it; this is a Kurtosis bug",
            //         fileId)
            // }
            let absFilepathOnTestsuite = path.Join(this.testVolumeMountpointOnTestsuiteContainer, relativeFilepath)
            let absFilepathOnService = path.Join(this.testVolumeMountpointOnServiceContainer, relativeFilepath)
            // result[fileId] = &GeneratedFileFilepaths{
            //     AbsoluteFilepathOnTestsuiteContainer: absFilepathOnTestsuite,
            //     AbsoluteFilepathOnServiceContainer:   absFilepathOnService,
            // }
        }
        return result, null;
    }


}

// // Docs available at https://docs.kurtosistech.com/kurtosis-libs/lib-documentation
// func (self *ServiceContext) GetServiceID() ServiceID {
// 	return self.serviceId
// }

// // Docs available at https://docs.kurtosistech.com/kurtosis-libs/lib-documentation
// func (self *ServiceContext) GetIPAddress() string {
// 	return self.ipAddress
// }

// // Docs available at https://docs.kurtosistech.com/kurtosis-libs/lib-documentation
// func (self *ServiceContext) ExecCommand(command []string) (int32, *[]byte, error) {
// 	serviceId := self.serviceId
// 	args := &core_api_bindings.ExecCommandArgs{
// 		ServiceId: string(serviceId),
// 		CommandArgs: command,
// 	}
// 	resp, err := self.client.ExecCommand(context.Background(), args)
// 	if err != nil {
// 		return 0, nil, stacktrace.Propagate(
// 			err,
// 			"An error occurred executing command '%v' on service '%v'",
// 			command,
// 			serviceId)
// 	}
// 	return resp.ExitCode, &resp.LogOutput, nil
// }

// // Docs available at https://docs.kurtosistech.com/kurtosis-libs/lib-documentation
// func (self *ServiceContext) GenerateFiles(filesToGenerateSet map[string]bool) (map[string]*GeneratedFileFilepaths, error) {
// 	serviceId := self.serviceId
// 	fileGenerationOpts := map[string]*core_api_bindings.FileGenerationOptions{}
// 	for fileId := range filesToGenerateSet {
// 		fileGenerationOpts[fileId] = &core_api_bindings.FileGenerationOptions{
// 			FileTypeToGenerate: core_api_bindings.FileGenerationOptions_FILE,
// 		}
// 	}
// 	args := &core_api_bindings.GenerateFilesArgs{
// 		ServiceId:       string(serviceId),
// 		FilesToGenerate: fileGenerationOpts,
// 	}
// 	resp, err := self.client.GenerateFiles(context.Background(), args)
// 	if err != nil {
// 		return nil, stacktrace.Propagate(err, "An error occurred generating files using args: %+v", args)
// 	}
// 	generatedFileRelativeFilepaths := resp.GeneratedFileRelativeFilepaths

// 	result := map[string]*GeneratedFileFilepaths{}
// 	for fileId := range filesToGenerateSet {
// 		relativeFilepath, found := generatedFileRelativeFilepaths[fileId]
// 		if !found {
// 			return nil, stacktrace.NewError(
// 				"No filepath (relative to test volume root) was returned for file '%v', even though we requested it; this is a Kurtosis bug",
// 				fileId)
// 		}
// 		absFilepathOnTestsuite := path.Join(self.testVolumeMountpointOnTestsuiteContainer, relativeFilepath)
// 		absFilepathOnService := path.Join(self.testVolumeMountpointOnServiceContainer, relativeFilepath)
// 		result[fileId] = &GeneratedFileFilepaths{
// 			AbsoluteFilepathOnTestsuiteContainer: absFilepathOnTestsuite,
// 			AbsoluteFilepathOnServiceContainer:   absFilepathOnService,
// 		}
// 	}
// 	return result, nil
// }
