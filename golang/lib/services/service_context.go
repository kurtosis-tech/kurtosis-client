package services

import (
	"context"
	"github.com/kurtosis-tech/kurtosis-client/golang/kurtosis_core_rpc_api_bindings"
	"github.com/palantir/stacktrace"
	"path"
)

// Docs available at https://docs.kurtosistech.com/kurtosis-libs/lib-documentation
type GeneratedFileFilepaths struct {
	absoluteFilepathHere               string
	absoluteFilepathOnServiceContainer string
}

func newGeneratedFileFilepaths(absoluteFilepathHere string, absoluteFilepathOnServiceContainer string) *GeneratedFileFilepaths {
	return &GeneratedFileFilepaths{absoluteFilepathHere: absoluteFilepathHere, absoluteFilepathOnServiceContainer: absoluteFilepathOnServiceContainer}
}

func (generated *GeneratedFileFilepaths) GetAbsoluteFilepathHere() string {
	return generated.absoluteFilepathHere
}

func (generated *GeneratedFileFilepaths) GetAbsoluteFilepathOnServiceContainer() string {
	return generated.absoluteFilepathOnServiceContainer
}



// Docs available at https://docs.kurtosistech.com/kurtosis-libs/lib-documentation
type ServiceContext struct {
	client                                     kurtosis_core_rpc_api_bindings.ApiContainerServiceClient
	serviceId                                  ServiceID
	ipAddress                                  string
	enclaveDataVolMountpointHere               string
	enclaveDataVolMountpointOnServiceContainer string
}

func NewServiceContext(
		client kurtosis_core_rpc_api_bindings.ApiContainerServiceClient,
		serviceId ServiceID,
		ipAddress string,
		enclaveDataVolumeMountpointHere string,
		enclaveDataVolumeMountpointOnServiceContainer string) *ServiceContext {
	return &ServiceContext{
		client:                       client,
		serviceId:                    serviceId,
		ipAddress:                    ipAddress,
		enclaveDataVolMountpointHere: enclaveDataVolumeMountpointHere,
		enclaveDataVolMountpointOnServiceContainer:   enclaveDataVolumeMountpointOnServiceContainer,
	}
}

// Docs available at https://docs.kurtosistech.com/kurtosis-libs/lib-documentation
func (self *ServiceContext) GetServiceID() ServiceID {
	return self.serviceId
}

// Docs available at https://docs.kurtosistech.com/kurtosis-libs/lib-documentation
func (self *ServiceContext) GetIPAddress() string {
	return self.ipAddress
}

// Docs available at https://docs.kurtosistech.com/kurtosis-libs/lib-documentation
func (self *ServiceContext) ExecCommand(command []string) (int32, *[]byte, error) {
	serviceId := self.serviceId
	args := &kurtosis_core_rpc_api_bindings.ExecCommandArgs{
		ServiceId: string(serviceId),
		CommandArgs: command,
	}
	resp, err := self.client.ExecCommand(context.Background(), args)
	if err != nil {
		return 0, nil, stacktrace.Propagate(
			err,
			"An error occurred executing command '%v' on service '%v'",
			command,
			serviceId)
	}
	return resp.ExitCode, &resp.LogOutput, nil
}

// Docs available at https://docs.kurtosistech.com/kurtosis-libs/lib-documentation
func (self *ServiceContext) GenerateFiles(filesToGenerateSet map[string]bool) (map[string]*GeneratedFileFilepaths, error) {
	serviceId := self.serviceId
	fileGenerationOpts := map[string]*kurtosis_core_rpc_api_bindings.FileGenerationOptions{}
	for fileId := range filesToGenerateSet {
		fileGenerationOpts[fileId] = &kurtosis_core_rpc_api_bindings.FileGenerationOptions{
			FileTypeToGenerate: kurtosis_core_rpc_api_bindings.FileGenerationOptions_FILE,
		}
	}
	args := &kurtosis_core_rpc_api_bindings.GenerateFilesArgs{
		ServiceId:       string(serviceId),
		FilesToGenerate: fileGenerationOpts,
	}
	resp, err := self.client.GenerateFiles(context.Background(), args)
	if err != nil {
		return nil, stacktrace.Propagate(err, "An error occurred generating files using args: %+v", args)
	}
	generatedFileRelativeFilepaths := resp.GeneratedFileRelativeFilepaths

	result := map[string]*GeneratedFileFilepaths{}
	for fileId := range filesToGenerateSet {
		relativeFilepath, found := generatedFileRelativeFilepaths[fileId]
		if !found {
			return nil, stacktrace.NewError(
				"No filepath (relative to enclave data volume root) was returned for file '%v', even though we requested it; this is a Kurtosis bug",
				fileId)
		}
		absFilepathHere := path.Join(self.enclaveDataVolMountpointHere, relativeFilepath)
		absFilepathOnService := path.Join(self.enclaveDataVolMountpointOnServiceContainer, relativeFilepath)
		result[fileId] = newGeneratedFileFilepaths(absFilepathHere, absFilepathOnService)
	}
	return result, nil
}

// Docs available at https://docs.kurtosistech.com/kurtosis-libs/lib-documentation
func (self *ServiceContext) LoadStaticFiles(usedStaticFilesSet map[StaticFileID]bool) (map[StaticFileID]string, error) {
	serviceId := self.serviceId
	staticFilesToCopyStringSet := map[string]bool{}
	for staticFileId := range usedStaticFilesSet {
		staticFilesToCopyStringSet[string(staticFileId)] = true
	}
	loadStaticFilesArgs := &kurtosis_core_rpc_api_bindings.LoadStaticFilesArgs{
		ServiceId:   string(serviceId),
		StaticFiles: staticFilesToCopyStringSet,
	}
	loadStaticFilesResp, err := self.client.LoadStaticFiles(context.Background(), loadStaticFilesArgs)
	if err != nil {
		return nil, stacktrace.Propagate(err, "An error occurred loading the requested static files into the namespace of service '%v'", serviceId)
	}
	staticFileAbsFilepathsOnService := map[StaticFileID]string{}
	for staticFileId, filepathRelativeToExVolRoot := range loadStaticFilesResp.CopiedStaticFileRelativeFilepaths {
		absFilepathOnContainer := path.Join(self.enclaveDataVolMountpointOnServiceContainer, filepathRelativeToExVolRoot)
		staticFileAbsFilepathsOnService[StaticFileID(staticFileId)] = absFilepathOnContainer
	}
	return staticFileAbsFilepathsOnService, nil

}