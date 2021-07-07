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
	"sync"
)

type PartitionID string

const (
	// This will always resolve to the default partition ID (regardless of whether such a partition exists in the network,
	//  or it was repartitioned away)
	defaultPartitionId PartitionID = ""
)

// Docs available at https://docs.kurtosistech.com/kurtosis-libs/lib-documentation
type NetworkContext struct {
	client core_api_bindings.ApiContainerServiceClient

	filesArtifactUrls map[services.FilesArtifactID]string

	// Mutex protecting access to the services map
	mutex *sync.Mutex

	services map[services.ServiceID]services.Service

	// The location on the filesystem where this code is running where the suite execution volume is mounted
	suiteExVolMountpoint string
}

func NewNetworkContext(
		client core_api_bindings.ApiContainerServiceClient,
		filesArtifactUrls map[services.FilesArtifactID]string,
		suiteExVolMountpoint string) *NetworkContext {
	return &NetworkContext{
		mutex: &sync.Mutex{},
		client: client,
		filesArtifactUrls: filesArtifactUrls,
		services: map[services.ServiceID]services.Service{},
		suiteExVolMountpoint: suiteExVolMountpoint,
	}
}

// Docs available at https://docs.kurtosistech.com/kurtosis-libs/lib-documentation
func (networkCtx *NetworkContext) AddService(
		serviceId services.ServiceID,
		configFactory services.ContainerConfigFactory) (services.Service, map[string]*core_api_bindings.PortBinding, services.AvailabilityChecker, error) {
	// Go mutexes aren't re-entrant, so we lock the mutex inside this call
	service, hostPortBindings, availabilityChecker, err := networkCtx.AddServiceToPartition(
		serviceId,
		defaultPartitionId,
		configFactory)
	if err != nil {
		return nil, nil, nil, stacktrace.Propagate(err, "An error occurred adding service '%v' to the network in the default partition", serviceId)
	}

	return service, hostPortBindings, availabilityChecker, nil
}

// Docs available at https://docs.kurtosistech.com/kurtosis-libs/lib-documentation
func (networkCtx *NetworkContext) AddServiceToPartition(
		serviceId services.ServiceID,
		partitionId PartitionID,
		configFactory services.ContainerConfigFactory) (services.Service, map[string]*core_api_bindings.PortBinding, services.AvailabilityChecker, error) {
	networkCtx.mutex.Lock()
	defer networkCtx.mutex.Unlock()

	ctx := context.Background()


	logrus.Tracef("Registering new service ID with Kurtosis API...")
	registerServiceArgs := &core_api_bindings.RegisterServiceArgs{
		ServiceId:       string(serviceId),
		PartitionId:     string(partitionId),
	}
	registerServiceResp, err := networkCtx.client.RegisterService(ctx, registerServiceArgs)
	if err != nil {
		return nil, nil, nil, stacktrace.Propagate(
			err,
			"An error occurred registering service with ID '%v' with the Kurtosis API",
			serviceId)
	}
	serviceIpAddr := registerServiceResp.IpAddr
	containerCreationConfig, err := configFactory.GetCreationConfig(serviceIpAddr)
	if err != nil {
		return nil, nil, nil, stacktrace.Propagate(err, "An error occurred getting the container creation config")
	}
	serviceContext := services.NewServiceContext(
		networkCtx.client,
		serviceId,
		serviceIpAddr,
		networkCtx.suiteExVolMountpoint,
		containerCreationConfig.GetTestVolumeMountpoint())
	logrus.Tracef("New service successfully registered with Kurtosis API")

	logrus.Trace("Loading static files into new service namespace...")
	usedStaticFiles := containerCreationConfig.GetUsedStaticFiles()
	staticFileAbsFilepathsOnService, err := serviceContext.LoadStaticFiles(usedStaticFiles)
	if err != nil {
		return nil, nil, nil, stacktrace.Propagate(err, "An error occurred loading the following static files to service '%v': %+v", serviceId, usedStaticFiles)
	}
	logrus.Trace("Successfully loaded static files")

	logrus.Trace("Initializing generated files...")
	filesToGenerate := map[string]bool{}
	for fileId := range containerCreationConfig.GetFileGeneratingFuncs() {
		filesToGenerate[fileId] = true
	}
	generatedFileFilepaths, err := serviceContext.GenerateFiles(filesToGenerate)
	if err != nil {
		return nil, nil, nil, stacktrace.Propagate(err, "An error occurred generating the files needed for service startup")
	}
	generatedFileAbsFilepathsOnService := map[string]string{}
	for fileId, initializingFunc := range containerCreationConfig.GetFileGeneratingFuncs() {
		filepaths, found := generatedFileFilepaths[fileId]
		if !found {
			return nil, nil, nil, stacktrace.Propagate(
				err,
				"Needed to initialize file for file ID '%v', but no generated file filepaths were found for that file ID; this is a Kurtosis bug",
				fileId)
		}
		fp, err := os.Create(filepaths.AbsoluteFilepathOnTestsuiteContainer)
		if err != nil {
			return nil, nil, nil, stacktrace.Propagate(err, "An error occurred opening file pointer for file '%v'", fileId)
		}
		if err := initializingFunc(fp); err != nil {
			return nil, nil, nil, stacktrace.Propagate(err, "The function to initialize file with ID '%v' returned an error", fileId)
		}
		generatedFileAbsFilepathsOnService[fileId] = filepaths.AbsoluteFilepathOnServiceContainer
	}
	logrus.Trace("Successfully initialized generated files in suite execution volume")

	containerRunConfig, err := configFactory.GetRunConfig(serviceIpAddr, generatedFileAbsFilepathsOnService, staticFileAbsFilepathsOnService)
	if err != nil {
		return nil, nil, nil, stacktrace.Propagate(err, "An error occurred getting the container run config")
	}

	logrus.Tracef("Creating files artifact URL -> mount dirpaths map...")
	artifactUrlToMountDirpath := map[string]string{}
	for filesArtifactId, mountDirpath := range containerCreationConfig.GetFilesArtifactMountpoints() {
		artifactUrl, found := networkCtx.filesArtifactUrls[filesArtifactId]
		if !found {
			return nil, nil, nil, stacktrace.Propagate(
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
		return nil, nil, nil, stacktrace.Propagate(err, "An error occurred starting the service with the Kurtosis API")
	}
	logrus.Tracef("Successfully started service with Kurtosis API")

	logrus.Tracef("Creating service interface...")
	service := containerCreationConfig.GetServiceCreatingFunc()(serviceContext)
	logrus.Tracef("Successfully created service interface")

	networkCtx.services[serviceId] = service

	availabilityChecker := services.NewDefaultAvailabilityChecker(serviceId, service)

	return service, resp.UsedPortsHostPortBindings, availabilityChecker, nil
}

// Docs available at https://docs.kurtosistech.com/kurtosis-libs/lib-documentation
func (networkCtx *NetworkContext) GetService(serviceId services.ServiceID) (services.Service, error) {
	networkCtx.mutex.Lock()
	defer networkCtx.mutex.Unlock()

	service, found := networkCtx.services[serviceId]
	if !found {
		return nil, stacktrace.NewError("No service info found for ID '%v'", serviceId)
	}
	return service, nil
}

// Docs available at https://docs.kurtosistech.com/kurtosis-libs/lib-documentation
func (networkCtx *NetworkContext) RemoveService(serviceId services.ServiceID, containerStopTimeoutSeconds uint64) error {
	networkCtx.mutex.Lock()
	defer networkCtx.mutex.Unlock()

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
	delete(networkCtx.services, serviceId)
	logrus.Debugf("Successfully removed service ID %v", serviceId)
	return nil
}

// Docs available at https://docs.kurtosistech.com/kurtosis-libs/lib-documentation
func (networkCtx *NetworkContext) RepartitionNetwork(
		partitionServices map[PartitionID]map[services.ServiceID]bool,
		partitionConnections map[PartitionID]map[PartitionID]*core_api_bindings.PartitionConnectionInfo,
		defaultConnection *core_api_bindings.PartitionConnectionInfo) error {
	networkCtx.mutex.Lock()
	defer networkCtx.mutex.Unlock()

	if partitionServices == nil {
		return stacktrace.NewError("Partition services map cannot be nil")
	}
	if defaultConnection != nil {
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

// Docs available at https://docs.kurtosistech.com/kurtosis-libs/lib-documentation
func (networkCtx *NetworkContext) ExecuteBulkCommands(bulkCommandsJson string) error {
	// TODO kill this mutex for networkcontext - it doesn't make sense
	networkCtx.mutex.Lock()
	defer networkCtx.mutex.Unlock()

	args := &core_api_bindings.ExecuteBulkCommandsArgs{
		SerializedCommands: bulkCommandsJson,
	}
	if _, err := networkCtx.client.ExecuteBulkCommands(context.Background(), args); err != nil {
		return stacktrace.Propagate(err, "An error occurred executing the following bulk commands: %v", bulkCommandsJson)
	}
	return nil
}