/*
 *    Copyright 2021 Kurtosis Technologies Inc.
 *
 *    Licensed under the Apache License, Version 2.0 (the "License");
 *    you may not use this file except in compliance with the License.
 *    You may obtain a copy of the License at
 *
 *        http://www.apache.org/licenses/LICENSE-2.0
 *
 *    Unless required by applicable law or agreed to in writing, software
 *    distributed under the License is distributed on an "AS IS" BASIS,
 *    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *    See the License for the specific language governing permissions and
 *    limitations under the License.
 *
 */

package networks

import (
	"context"
	"github.com/kurtosis-tech/kurtosis-client/golang/kurtosis_core_rpc_api_bindings"
	"github.com/kurtosis-tech/kurtosis-client/golang/lib/binding_constructors"
	"github.com/kurtosis-tech/kurtosis-client/golang/lib/modules"
	"github.com/kurtosis-tech/kurtosis-client/golang/lib/services"
	"github.com/palantir/stacktrace"
	"github.com/sirupsen/logrus"
	"google.golang.org/protobuf/types/known/emptypb"
	"io"
	"os"
	"path"
)

type PartitionID string

const (
	// This will always resolve to the default partition ID (regardless of whether such a partition exists in the network,
	//  or it was repartitioned away)
	defaultPartitionId PartitionID = ""
)

// Docs available at https://docs.kurtosistech.com/kurtosis-client/lib-documentation
type NetworkContext struct {
	client kurtosis_core_rpc_api_bindings.ApiContainerServiceClient

	// The location on the filesystem where this code is running where the enclave data volume is mounted
	enclaveDataVolMountpoint string
}

/*
Creates a new NetworkContext object with the given parameters.
*/
func NewNetworkContext(
		client kurtosis_core_rpc_api_bindings.ApiContainerServiceClient,
		enclaveDataVolMountpoint string) *NetworkContext {
	return &NetworkContext{
		client:                   client,
		enclaveDataVolMountpoint: enclaveDataVolMountpoint,
	}
}

// Docs available at https://docs.kurtosistech.com/kurtosis-client/lib-documentation
func (networkCtx *NetworkContext) LoadLambda(
		lambdaId modules.LambdaID,
		image string,
		serializedParams string) (*modules.LambdaContext, error) {
	args := binding_constructors.NewLoadLambdaArgs(string(lambdaId), image, serializedParams)

	// We proxy calls to Lambda modules via the API container, so actually no need to use the response here
	_, err := networkCtx.client.LoadLambda(context.Background(), args)
	if err != nil {
		return nil, stacktrace.Propagate(err, "An error occurred loading new module '%v' with image '%v' and serialized params '%v'", lambdaId, image, serializedParams)
	}
	moduleCtx := modules.NewLambdaContext(networkCtx.client, lambdaId)
	return moduleCtx, nil
}

// Docs available at https://docs.kurtosistech.com/kurtosis-client/lib-documentation
func (networkCtx *NetworkContext) GetLambdaContext(lambdaId modules.LambdaID) (*modules.LambdaContext, error) {
	args := binding_constructors.NewGetLambdaInfoArgs(string(lambdaId))

	// NOTE: As of 2021-07-18, we actually don't use any of the info that comes back because the LambdaContext doesn't require it!
	_, err := networkCtx.client.GetLambdaInfo(context.Background(), args)
	if err != nil {
		return nil, stacktrace.Propagate(err, "An error occurred getting info for Lambda '%v'", lambdaId)
	}
	lambdaCtx := modules.NewLambdaContext(networkCtx.client, lambdaId)
	return lambdaCtx, nil
}

// Docs available at https://docs.kurtosistech.com/kurtosis-client/lib-documentation
func (networkCtx *NetworkContext) RegisterStaticFiles(staticFileFilepaths map[services.StaticFileID]string) error {
	strSet := map[string]bool{}
	for staticFileId, srcAbsFilepath := range staticFileFilepaths {
		// Sanity-check that the source filepath exists
		if _, err := os.Stat(srcAbsFilepath); os.IsNotExist(err) {
			return stacktrace.NewError("Source filepath '%v' associated with static file '%v' doesn't exist", srcAbsFilepath, staticFileId)
		}
		strSet[string(staticFileId)] = true
	}

	args := binding_constructors.NewRegisterStaticFilesArgs(strSet)
	resp, err := networkCtx.client.RegisterStaticFiles(context.Background(), args)
	if err != nil {
		return stacktrace.Propagate(err, "An error occurred registering static files: %+v", staticFileFilepaths)
	}

	for staticFileIdStr, destFilepathRelativeToEnclaveVolRoot := range resp.StaticFileDestRelativeFilepaths {
		staticFileId := services.StaticFileID(staticFileIdStr)

		srcAbsFilepath, found := staticFileFilepaths[staticFileId]
		if !found {
			return stacktrace.NewError("No source filepath found for static file '%v'; this is a bug in Kurtosis", staticFileId)
		}

		destAbsFilepath := path.Join(networkCtx.enclaveDataVolMountpoint, destFilepathRelativeToEnclaveVolRoot)
		if _, err := os.Stat(destAbsFilepath); os.IsNotExist(err) {
			return stacktrace.NewError(
				"The Kurtosis API asked us to copy static file '%v' to path '%v' in the enclave volume which means that an empty file should exist there, "+
					"but no file exists at that path - this is a bug in Kurtosis!",
				staticFileId,
				destFilepathRelativeToEnclaveVolRoot,
			)
		}

		srcFp, err := os.Open(srcAbsFilepath)
		if err != nil {
			return stacktrace.Propagate(err, "An error occurred opening static file '%v' source file '%v' for reading", staticFileId, srcAbsFilepath)
		}
		defer srcFp.Close()

		destFp, err := os.Create(destAbsFilepath)
		if err != nil {
			return stacktrace.Propagate(err, "An error occurred opening static file '%v' destination file '%v' for writing", staticFileId, destAbsFilepath)
		}
		defer destFp.Close()

		if _, err := io.Copy(destFp, srcFp); err != nil {
			return stacktrace.Propagate(err, "An error occurred copying all the bytes from static file '%v' source filepath '%v' to destination filepath '%v'", staticFileId, srcAbsFilepath, destAbsFilepath)
		}

	}
	return nil
}

// Docs available at https://docs.kurtosistech.com/kurtosis-client/lib-documentation
func (networkCtx *NetworkContext) RegisterFilesArtifacts(filesArtifactUrls map[services.FilesArtifactID]string) error {
	filesArtifactIdStrsToUrls := map[string]string{}
	for artifactId, url := range filesArtifactUrls {
		filesArtifactIdStrsToUrls[string(artifactId)] = url
	}
	args := binding_constructors.NewRegisterFilesArtifactArgs(filesArtifactIdStrsToUrls)
	if _, err := networkCtx.client.RegisterFilesArtifacts(context.Background(), args); err != nil {
		return stacktrace.Propagate(err, "An error occurred registering files artifacts: %+v", filesArtifactUrls)
	}
	return nil
}

// Docs available at https://docs.kurtosistech.com/kurtosis-client/lib-documentation
func (networkCtx *NetworkContext) AddService(
	serviceId services.ServiceID,
	containerCreationConfig *services.ContainerCreationConfig,
	generateRunConfigFunc func(ipAddr string, generatedFileFilepaths map[string]string, staticFileFilepaths map[services.StaticFileID]string) (*services.ContainerRunConfig, error),
) (*services.ServiceContext, map[string]*kurtosis_core_rpc_api_bindings.PortBinding, error) {

	serviceContext, hostPortBindings, err := networkCtx.AddServiceToPartition(
		serviceId,
		defaultPartitionId,
		containerCreationConfig,
		generateRunConfigFunc,
	)
	if err != nil {
		return nil, nil, stacktrace.Propagate(err, "An error occurred adding service '%v' to the network in the default partition", serviceId)
	}

	return serviceContext, hostPortBindings, nil
}

// Docs available at https://docs.kurtosistech.com/kurtosis-client/lib-documentation
func (networkCtx *NetworkContext) AddServiceToPartition(
	serviceId services.ServiceID,
	partitionId PartitionID,
	containerCreationConfig *services.ContainerCreationConfig,
	generateRunConfigFunc func(ipAddr string, generatedFileFilepaths map[string]string, staticFileFilepaths map[services.StaticFileID]string) (*services.ContainerRunConfig, error),
) (*services.ServiceContext, map[string]*kurtosis_core_rpc_api_bindings.PortBinding, error) {

	ctx := context.Background()

	logrus.Tracef("Registering new service ID with Kurtosis API...")
	registerServiceArgs := binding_constructors.NewRegisterServiceArgs(string(serviceId), string(partitionId))
	registerServiceResp, err := networkCtx.client.RegisterService(ctx, registerServiceArgs)
	if err != nil {
		return nil, nil, stacktrace.Propagate(
			err,
			"An error occurred registering service with ID '%v' with the Kurtosis API",
			serviceId)
	}
	serviceIpAddr := registerServiceResp.IpAddr

	serviceContext := services.NewServiceContext(
		networkCtx.client,
		serviceId,
		serviceIpAddr,
		networkCtx.enclaveDataVolMountpoint,
		containerCreationConfig.GetKurtosisVolumeMountpoint())
	logrus.Tracef("New service successfully registered with Kurtosis API")

	logrus.Trace("Loading static files into new service namespace...")
	usedStaticFiles := containerCreationConfig.GetUsedStaticFiles()
	staticFileAbsFilepathsOnService, err := serviceContext.LoadStaticFiles(usedStaticFiles)
	if err != nil {
		return nil, nil, stacktrace.Propagate(err, "An error occurred loading the following static files to service '%v': %+v", serviceId, usedStaticFiles)
	}
	logrus.Trace("Successfully loaded static files")

	logrus.Trace("Initializing generated files...")
	filesToGenerate := map[string]bool{}
	for fileId := range containerCreationConfig.GetFileGeneratingFuncs() {
		filesToGenerate[fileId] = true
	}
	generatedFileFilepaths, err := serviceContext.GenerateFiles(filesToGenerate)
	if err != nil {
		return nil, nil, stacktrace.Propagate(err, "An error occurred generating the files needed for service startup")
	}
	generatedFileAbsFilepathsOnService := map[string]string{}
	for fileId, initializingFunc := range containerCreationConfig.GetFileGeneratingFuncs() {
		filepaths, found := generatedFileFilepaths[fileId]
		if !found {
			return nil, nil, stacktrace.NewError(
				"Needed to initialize file for file ID '%v', but no generated file filepaths were found for that file ID; this is a Kurtosis bug",
				fileId)
		}
		fp, err := os.Create(filepaths.GetAbsoluteFilepathHere())
		if err != nil {
			return nil, nil, stacktrace.Propagate(err, "An error occurred opening file pointer for file '%v'", fileId)
		}
		if err := initializingFunc(fp); err != nil {
			return nil, nil, stacktrace.Propagate(err, "The function to initialize file with ID '%v' returned an error", fileId)
		}
		generatedFileAbsFilepathsOnService[fileId] = filepaths.GetAbsoluteFilepathOnServiceContainer()
	}
	logrus.Trace("Successfully initialized generated files in suite execution volume")

	containerRunConfig, err := generateRunConfigFunc(serviceIpAddr, generatedFileAbsFilepathsOnService, staticFileAbsFilepathsOnService)
	if err != nil {
		return nil, nil, stacktrace.Propagate(err, "An error occurred getting the container run config")
	}

	logrus.Tracef("Creating files artifact ID str -> mount dirpaths map...")
	artifactIdStrToMountDirpath := map[string]string{}
	for filesArtifactId, mountDirpath := range containerCreationConfig.GetFilesArtifactMountpoints() {
		artifactIdStrToMountDirpath[string(filesArtifactId)] = mountDirpath
	}
	logrus.Tracef("Successfully created files artifact ID str -> mount dirpaths map")

	logrus.Tracef("Starting new service with Kurtosis API...")
	startServiceArgs := &kurtosis_core_rpc_api_bindings.StartServiceArgs{
		ServiceId:                  string(serviceId),
		DockerImage:                containerCreationConfig.GetImage(),
		UsedPorts:                  containerCreationConfig.GetUsedPortsSet(),
		EntrypointArgs:             containerRunConfig.GetEntrypointOverrideArgs(),
		CmdArgs:                    containerRunConfig.GetCmdOverrideArgs(),
		DockerEnvVars:              containerRunConfig.GetEnvironmentVariableOverrides(),
		EnclaveDataVolMntDirpath:   containerCreationConfig.GetKurtosisVolumeMountpoint(),
		FilesArtifactMountDirpaths: artifactIdStrToMountDirpath,
	}
	resp, err := networkCtx.client.StartService(ctx, startServiceArgs)
	if err != nil {
		return nil, nil, stacktrace.Propagate(err, "An error occurred starting the service with the Kurtosis API")
	}
	logrus.Tracef("Successfully started service with Kurtosis API")

	return serviceContext, resp.UsedPortsHostPortBindings, nil
}

// Docs available at https://docs.kurtosistech.com/kurtosis-client/lib-documentation
func (networkCtx *NetworkContext) GetServiceContext(serviceId services.ServiceID) (*services.ServiceContext, error) {
	getServiceInfoArgs := binding_constructors.NewGetServiceInfoArgs(string(serviceId))
	serviceResponse, err := networkCtx.client.GetServiceInfo(context.Background(), getServiceInfoArgs)
	if err != nil {
		return nil, stacktrace.Propagate(
			err,
			"An error occurred when trying to get info for service '%v'",
			serviceId)
	}
	if serviceResponse.GetIpAddr() == "" {
		return nil, stacktrace.NewError(
			"Kurtosis API reported an empty IP address for service '%v' - this should never happen, and is a bug with Kurtosis!",
			serviceId)
	}

	enclaveDataVolMountDirpathOnSvcContainer := serviceResponse.GetEnclaveDataVolumeMountDirpath()
	if enclaveDataVolMountDirpathOnSvcContainer == "" {
		return nil, stacktrace.NewError(
			"Kurtosis API reported an empty enclave data volume directory path for service '%v' - this should never happen, and is a bug with Kurtosis!",
			serviceId)
	}

	serviceContext := services.NewServiceContext(
		networkCtx.client,
		serviceId,
		serviceResponse.GetIpAddr(),
		networkCtx.enclaveDataVolMountpoint,
		enclaveDataVolMountDirpathOnSvcContainer,
	)

	return serviceContext, nil
}

// Docs available at https://docs.kurtosistech.com/kurtosis-client/lib-documentation
func (networkCtx *NetworkContext) RemoveService(serviceId services.ServiceID, containerStopTimeoutSeconds uint64) error {

	logrus.Debugf("Removing service '%v'...", serviceId)
	// NOTE: This is kinda weird - when we remove a service we can never get it back so having a container
	//  stop timeout doesn't make much sense. It will make more sense when we can stop/start containers
	// Independent of adding/removing them from the network
	args := binding_constructors.NewRemoveServiceArgs(string(serviceId), containerStopTimeoutSeconds)
	if _, err := networkCtx.client.RemoveService(context.Background(), args); err != nil {
		return stacktrace.Propagate(err, "An error occurred removing service '%v' from the network", serviceId)
	}

	logrus.Debugf("Successfully removed service ID %v", serviceId)

	return nil
}

// Docs available at https://docs.kurtosistech.com/kurtosis-client/lib-documentation
func (networkCtx *NetworkContext) RepartitionNetwork(
	partitionServices map[PartitionID]map[services.ServiceID]bool,
	partitionConnections map[PartitionID]map[PartitionID]*kurtosis_core_rpc_api_bindings.PartitionConnectionInfo,
	defaultConnection *kurtosis_core_rpc_api_bindings.PartitionConnectionInfo) error {

	if partitionServices == nil {
		return stacktrace.NewError("Partition services map cannot be nil")
	}
	if defaultConnection == nil {
		return stacktrace.NewError("Default connection cannot be nil")
	}

	// Cover for lazy/confused users
	if partitionConnections == nil {
		partitionConnections = map[PartitionID]map[PartitionID]*kurtosis_core_rpc_api_bindings.PartitionConnectionInfo{}
	}

	reqPartitionServices := map[string]*kurtosis_core_rpc_api_bindings.PartitionServices{}
	for partitionId, serviceIdSet := range partitionServices {
		serviceIdStrPseudoSet := map[string]bool{}
		for serviceId := range serviceIdSet {
			serviceIdStr := string(serviceId)
			serviceIdStrPseudoSet[serviceIdStr] = true
		}
		partitionIdStr := string(partitionId)
		reqPartitionServices[partitionIdStr] = binding_constructors.NewPartitionServices(serviceIdStrPseudoSet)
	}

	reqPartitionConns := map[string]*kurtosis_core_rpc_api_bindings.PartitionConnections{}
	for partitionAId, partitionAConnsMap := range partitionConnections {
		partitionAConnsStrMap := map[string]*kurtosis_core_rpc_api_bindings.PartitionConnectionInfo{}
		for partitionBId, connInfo := range partitionAConnsMap {
			partitionBIdStr := string(partitionBId)
			partitionAConnsStrMap[partitionBIdStr] = connInfo
		}
		partitionAConns := binding_constructors.NewPartitionConnections(partitionAConnsStrMap)
		partitionAIdStr := string(partitionAId)
		reqPartitionConns[partitionAIdStr] = partitionAConns
	}

	repartitionArgs := binding_constructors.NewRepartitionArgs(reqPartitionServices, reqPartitionConns, defaultConnection)
	if _, err := networkCtx.client.Repartition(context.Background(), repartitionArgs); err != nil {
		return stacktrace.Propagate(err, "An error occurred repartitioning the test network")
	}
	return nil
}

// Docs available at https://docs.kurtosistech.com/kurtosis-client/lib-documentation
func (networkCtx *NetworkContext) WaitForHttpGetEndpointAvailability(serviceId services.ServiceID, port uint32, path string, initialDelayMilliseconds uint32, retries uint32, retriesDelayMilliseconds uint32, bodyText string) error {

	availabilityArgs := binding_constructors.NewWaitForHttpGetEndpointAvailabilityArgs(
		string(serviceId),
		port,
		path,
		initialDelayMilliseconds,
		retries,
		retriesDelayMilliseconds,
		bodyText,
	)

	if _, err := networkCtx.client.WaitForHttpGetEndpointAvailability(context.Background(), availabilityArgs); err != nil {
		return stacktrace.Propagate(
			err,
			"Endpoint '%v' on port '%v' for service '%v' did not become available despite polling %v times with %v between polls",
			path,
			port,
			serviceId,
			retries,
			retriesDelayMilliseconds,
		)
	}
	return nil
}

// Docs available at https://docs.kurtosistech.com/kurtosis-client/lib-documentation
func (networkCtx *NetworkContext) WaitForHttpPostEndpointAvailability(serviceId services.ServiceID, port uint32, path string, requestBody string, initialDelayMilliseconds uint32, retries uint32, retriesDelayMilliseconds uint32, bodyText string) error {

	availabilityArgs := binding_constructors.NewWaitForHttpPostEndpointAvailabilityArgs(
		string(serviceId),
		port,
		path,
		requestBody,
		initialDelayMilliseconds,
		retries,
		retriesDelayMilliseconds,
		bodyText,
	)

	if _, err := networkCtx.client.WaitForHttpPostEndpointAvailability(context.Background(), availabilityArgs); err != nil {
		return stacktrace.Propagate(
			err,
			"Endpoint '%v' on port '%v' for service '%v' did not become available despite polling %v times with %v between polls",
			path,
			port,
			serviceId,
			retries,
			retriesDelayMilliseconds,
		)
	}
	return nil
}

// Docs available at https://docs.kurtosistech.com/kurtosis-client/lib-documentation
func (networkCtx *NetworkContext) ExecuteBulkCommands(bulkCommandsJson string) error {
	args := binding_constructors.NewExecuteBulkCommandsArgs(bulkCommandsJson)
	if _, err := networkCtx.client.ExecuteBulkCommands(context.Background(), args); err != nil {
		return stacktrace.Propagate(err, "An error occurred executing the following bulk commands: %v", bulkCommandsJson)
	}
	return nil
}

// Docs available at https://docs.kurtosistech.com/kurtosis-client/lib-documentation
func (networkCtx *NetworkContext) GetServices() ([]services.ServiceID, error){
	response, err := networkCtx.client.GetServices(context.Background(), &emptypb.Empty{})
	if err != nil {
		return nil, stacktrace.Propagate(err, "An error occurred getting services' id list")
	}

	servicesID := make([]services.ServiceID, len(response.ServicesId))

	for _, serviceID := range response.ServicesId {
		servicesID = append(servicesID, services.ServiceID(serviceID))
	}

	return servicesID, nil
}

// Docs available at https://docs.kurtosistech.com/kurtosis-client/lib-documentation
func (networkCtx *NetworkContext) GetLambdas() ([]modules.LambdaID, error){
	response, err := networkCtx.client.GetLambdas(context.Background(), &emptypb.Empty{})
	if err != nil {
		return nil, stacktrace.Propagate(err, "An error occurred getting lambdas' id list")
	}

	lambdasID := make([]modules.LambdaID, len(response.LambdasId))

	for _, lambdaID := range response.LambdasId {
		lambdasID = append(lambdasID, modules.LambdaID(lambdaID))
	}

	return lambdasID, nil
}
