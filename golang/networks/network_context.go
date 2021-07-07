/*
 * Copyright (c) 2020 - present Kurtosis Technologies LLC.
 * All Rights Reserved.
 */

package networks

import (
	"context"
	"github.com/kurtosis-tech/kurtosis-client/golang/core_api_bindings"
	"github.com/kurtosis-tech/kurtosis-client/golang/services"
	"github.com/palantir/stacktrace"
	"github.com/sirupsen/logrus"
	"os"
)

type PartitionID string

const (
	// This will alwyas resolve to the default partition ID (regardless of whether such a partition exists in the network,
	//  or it was repartitioned away)
	defaultPartitionId PartitionID = ""

	// This value - where the suite execution volume will be mounted on the testsuite container - is
	//  hardcoded inside Kurtosis Core
	suiteExVolMountpoint = "/suite-execution"
)

// Docs available at https://docs.kurtosistech.com/kurtosis-libs/lib-documentation
type NetworkContext struct {
	client core_api_bindings.ApiContainerServiceClient

	filesArtifactUrls map[services.FilesArtifactID]string
}


/*
Creates a new NetworkContext object with the given parameters.

Args:
	client: The Kurtosis API client that the NetworkContext will use for modifying the state of the testnet
	filesArtifactUrls: The mapping of filesArtifactId -> URL for the artifacts that the testsuite will use
*/
func NewNetworkContext(
		client core_api_bindings.ApiContainerServiceClient,
		filesArtifactUrls map[services.FilesArtifactID]string) *NetworkContext {
	return &NetworkContext{
		client: client,
		filesArtifactUrls: filesArtifactUrls,
	}
}

// Docs available at https://docs.kurtosistech.com/kurtosis-libs/lib-documentation
func (networkCtx *NetworkContext) AddService(
		serviceId services.ServiceID,
		configFactory services.ContainerConfigFactory) (*services.ServiceContext, map[string]*core_api_bindings.PortBinding, error) {

	serviceContext, hostPortBindings, err := networkCtx.AddServiceToPartition(
		serviceId,
		defaultPartitionId,
		configFactory)
	if err != nil {
		return nil, nil, stacktrace.Propagate(err, "An error occurred adding service '%v' to the network in the default partition", serviceId)
	}

	return serviceContext, hostPortBindings, nil
}

// Docs available at https://docs.kurtosistech.com/kurtosis-libs/lib-documentation
func (networkCtx *NetworkContext) AddServiceToPartition(
		serviceId services.ServiceID,
		partitionId PartitionID,
		configFactory services.ContainerConfigFactory) (*services.ServiceContext, map[string]*core_api_bindings.PortBinding, error) {

	ctx := context.Background()

	logrus.Tracef("Registering new service ID with Kurtosis API...")
	registerServiceArgs := &core_api_bindings.RegisterServiceArgs{
		ServiceId:       string(serviceId),
		PartitionId:     string(partitionId),
	}
	registerServiceResp, err := networkCtx.client.RegisterService(ctx, registerServiceArgs)
	if err != nil {
		return nil, nil, stacktrace.Propagate(
			err,
			"An error occurred registering service with ID '%v' with the Kurtosis API",
			serviceId)
	}
	serviceIpAddr := registerServiceResp.IpAddr
	containerCreationConfig, err := configFactory.GetCreationConfig(serviceIpAddr)
	if err != nil {
		return nil, nil, stacktrace.Propagate(err, "An error occurred getting the container creation config")
	}
	serviceContext := services.NewServiceContext(
		networkCtx.client,
		serviceId,
		serviceIpAddr,
		suiteExVolMountpoint,
		containerCreationConfig.GetTestVolumeMountpoint())
	logrus.Tracef("New service successfully registered with Kurtosis API")

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
			return nil, nil, stacktrace.Propagate(
				err,
				"Needed to initialize file for file ID '%v', but no generated file filepaths were found for that file ID; this is a Kurtosis bug",
				fileId)
		}
		fp, err := os.Create(filepaths.AbsoluteFilepathOnTestsuiteContainer)
		if err != nil {
			return nil, nil, stacktrace.Propagate(err, "An error occurred opening file pointer for file '%v'", fileId)
		}
		if err := initializingFunc(fp); err != nil {
			return nil, nil, stacktrace.Propagate(err, "The function to initialize file with ID '%v' returned an error", fileId)
		}
		generatedFileAbsFilepathsOnService[fileId] = filepaths.AbsoluteFilepathOnServiceContainer
	}
	logrus.Trace("Successfully initialized generated files in suite execution volume")

	containerRunConfig, err := configFactory.GetRunConfig(serviceIpAddr, generatedFileAbsFilepathsOnService)
	if err != nil {
		return nil, nil, stacktrace.Propagate(err, "An error occurred getting the container run config")
	}

	logrus.Tracef("Creating files artifact URL -> mount dirpaths map...")
	artifactUrlToMountDirpath := map[string]string{}
	for filesArtifactId, mountDirpath := range containerCreationConfig.GetFilesArtifactMountpoints() {
		artifactUrl, found := networkCtx.filesArtifactUrls[filesArtifactId]
		if !found {
			return nil, nil, stacktrace.Propagate(
				err,
				"Service requested file artifact '%v', but the network" +
					"context doesn't have a URL for that file artifact; this is a bug with Kurtosis itself",
				filesArtifactId)
		}
		artifactUrlToMountDirpath[string(artifactUrl)] = mountDirpath
	}
	logrus.Tracef("Successfully created files artifact URL -> mount dirpaths map")

	logrus.Tracef("Starting new service with Kurtosis API...")
	startServiceArgs := &core_api_bindings.StartServiceArgs{
		ServiceId:                   string(serviceId),
		DockerImage:                 containerCreationConfig.GetImage(),
		UsedPorts:                   containerCreationConfig.GetUsedPortsSet(),
		EntrypointArgs:              containerRunConfig.GetEntrypointOverrideArgs(),
		CmdArgs:                     containerRunConfig.GetCmdOverrideArgs(),
		DockerEnvVars:               containerRunConfig.GetEnvironmentVariableOverrides(),
		SuiteExecutionVolMntDirpath: containerCreationConfig.GetTestVolumeMountpoint(),
		FilesArtifactMountDirpaths:  artifactUrlToMountDirpath,
	}
	resp, err := networkCtx.client.StartService(ctx, startServiceArgs)
	if err != nil {
		return nil, nil, stacktrace.Propagate(err, "An error occurred starting the service with the Kurtosis API")
	}
	logrus.Tracef("Successfully started service with Kurtosis API")

	return serviceContext, resp.UsedPortsHostPortBindings,  nil
}

// Docs available at https://docs.kurtosistech.com/kurtosis-libs/lib-documentation
func (networkCtx *NetworkContext) GetServiceContext(serviceId services.ServiceID, configFactory services.ContainerConfigFactory) (*services.ServiceContext, error) {
	getServiceInfoArgs := &core_api_bindings.GetServiceInfoArgs{
		ServiceId: string(serviceId),
	}
	serviceResponse, err := networkCtx.client.GetServiceInfo(context.Background(), getServiceInfoArgs)
	if err != nil {
		return nil, stacktrace.Propagate(
			err,
			"An error occurred when trying to get info for service '%v'",
			serviceId)
	}

	if serviceResponse.GetIpAddr() == "" {
		return nil, stacktrace.NewError(
			"An error occurred when trying to get the IP address from service '%v'",
			serviceId)
	}

	containerCreationConfig, err := configFactory.GetCreationConfig(serviceResponse.GetIpAddr())
	if err != nil {
		return nil, stacktrace.Propagate(err, "An error occurred getting the container creation config")
	}

	serviceContext := services.NewServiceContext(
		networkCtx.client,
		serviceId,
		serviceResponse.GetIpAddr(),
		suiteExVolMountpoint,
		containerCreationConfig.GetTestVolumeMountpoint())

	return serviceContext, nil
}

// Docs available at https://docs.kurtosistech.com/kurtosis-libs/lib-documentation
func (networkCtx *NetworkContext) RemoveService(serviceId services.ServiceID, containerStopTimeoutSeconds uint64) error {

	logrus.Debugf("Removing service '%v'...", serviceId)
	args := &core_api_bindings.RemoveServiceArgs{
		ServiceId:                   string(serviceId),
		// NOTE: This is kinda weird - when we remove a service we can never get it back so having a container
		//  stop timeout doesn't make much sense. It will make more sense when we can stop/start containers
		// Independent of adding/removing them from the network
		ContainerStopTimeoutSeconds: containerStopTimeoutSeconds,
	}
	if _, err := networkCtx.client.RemoveService(context.Background(), args); err != nil {
		return stacktrace.Propagate(err, "An error occurred removing service '%v' from the network", serviceId)
	}

	return nil
}

// Docs available at https://docs.kurtosistech.com/kurtosis-libs/lib-documentation
func (networkCtx *NetworkContext) RepartitionNetwork(
		partitionServices map[PartitionID]map[services.ServiceID]bool,
		partitionConnections map[PartitionID]map[PartitionID]*core_api_bindings.PartitionConnectionInfo,
		defaultConnection *core_api_bindings.PartitionConnectionInfo) error {

	if partitionServices == nil {
		return stacktrace.NewError("Partition services map cannot be nil")
	}
	if defaultConnection == nil {
		return stacktrace.NewError("Default connection cannot be nil")
	}

	// Cover for lazy/confused users
	if partitionConnections == nil {
		partitionConnections = map[PartitionID]map[PartitionID]*core_api_bindings.PartitionConnectionInfo{}
	}

	reqPartitionServices := map[string]*core_api_bindings.PartitionServices{}
	for partitionId, serviceIdSet := range partitionServices {
		serviceIdStrPseudoSet := map[string]bool{}
		for serviceId := range serviceIdSet {
			serviceIdStr := string(serviceId)
			serviceIdStrPseudoSet[serviceIdStr] = true
		}
		partitionIdStr := string(partitionId)
		reqPartitionServices[partitionIdStr] = &core_api_bindings.PartitionServices{
			ServiceIdSet: serviceIdStrPseudoSet,
		}
	}

	reqPartitionConns := map[string]*core_api_bindings.PartitionConnections{}
	for partitionAId, partitionAConnsMap := range partitionConnections {
		partitionAConnsStrMap := map[string]*core_api_bindings.PartitionConnectionInfo{}
		for partitionBId, connInfo := range partitionAConnsMap {
			partitionBIdStr := string(partitionBId)
			partitionAConnsStrMap[partitionBIdStr] = connInfo
		}
		partitionAConns := &core_api_bindings.PartitionConnections{
			ConnectionInfo: partitionAConnsStrMap,
		}
		partitionAIdStr := string(partitionAId)
		reqPartitionConns[partitionAIdStr] = partitionAConns
	}

	repartitionArgs := &core_api_bindings.RepartitionArgs{
		PartitionServices:    reqPartitionServices,
		PartitionConnections: reqPartitionConns,
		DefaultConnection:    defaultConnection,
	}
	if _, err := networkCtx.client.Repartition(context.Background(), repartitionArgs); err != nil {
		return stacktrace.Propagate(err, "An error occurred repartitioning the test network")
	}
	return nil
}

// Docs available at https://docs.kurtosistech.com/kurtosis-libs/lib-documentation
func (networkCtx *NetworkContext) WaitForEndpointAvailability(serviceId services.ServiceID, port uint32, path string, initialDelaySeconds uint32, retries uint32, retriesDelayMilliseconds uint32, bodyText string) error {
	availabilityArgs := &core_api_bindings.WaitForEndpointAvailabilityArgs{
		ServiceId: string(serviceId),
		Port: port,
		Path: path,
		InitialDelaySeconds: initialDelaySeconds,
		Retries: retries,
		RetriesDelayMilliseconds: retriesDelayMilliseconds,
		BodyText: bodyText,
	}
	if _, err := networkCtx.client.WaitForEndpointAvailability(context.Background(), availabilityArgs); err != nil {
		return stacktrace.Propagate(
			err,
			"Service '%v' did not become available despite polling %v times with %v between polls",
			serviceId,
			retries,
			retriesDelayMilliseconds)
	}

	return nil
}

// Docs available at https://docs.kurtosistech.com/kurtosis-libs/lib-documentation
func (networkCtx *NetworkContext) ExecuteBulkCommands(bulkCommandsJson string) error {

	args := &core_api_bindings.ExecuteBulkCommandsArgs{
		SerializedCommands: bulkCommandsJson,
	}
	if _, err := networkCtx.client.ExecuteBulkCommands(context.Background(), args); err != nil {
		return stacktrace.Propagate(err, "An error occurred executing the following bulk commands: %v", bulkCommandsJson)
	}
	return nil
}

