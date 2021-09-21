package binding_constructors

import "github.com/kurtosis-tech/kurtosis-client/golang/kurtosis_core_rpc_api_bindings"

// The generated bindings don't come with constructors (leaving it up to the user to initialize all the fields), so we
// add them so that our code is safer

// ==============================================================================================
//                                     Load Lambda
// ==============================================================================================
func NewLoadLambdaArgs(lambdaId string, containerImage string, serializedParams string) *kurtosis_core_rpc_api_bindings.LoadLambdaArgs {
	return &kurtosis_core_rpc_api_bindings.LoadLambdaArgs{
		LambdaId:         lambdaId,
		ContainerImage:   containerImage,
		SerializedParams: serializedParams,
	}
}

// ==============================================================================================
//                                     Execute Lambda
// ==============================================================================================
func NewExecuteLambdaArgs(lambdaId string, serializedParams string) *kurtosis_core_rpc_api_bindings.ExecuteLambdaArgs {
	return &kurtosis_core_rpc_api_bindings.ExecuteLambdaArgs{
		LambdaId:         lambdaId,
		SerializedParams: serializedParams,
	}
}

func NewExecuteLambdaResponse(serializedResult string) *kurtosis_core_rpc_api_bindings.ExecuteLambdaResponse {
	return &kurtosis_core_rpc_api_bindings.ExecuteLambdaResponse{
		SerializedResult: serializedResult,
	}
}

// ==============================================================================================
//                                     Get Lambda Info
// ==============================================================================================
func NewGetLambdaInfoArgs(lambdaId string) *kurtosis_core_rpc_api_bindings.GetLambdaInfoArgs {
	return &kurtosis_core_rpc_api_bindings.GetLambdaInfoArgs{LambdaId: lambdaId}
}

func NewGetLambdaInfoResponse(ipAddr string) *kurtosis_core_rpc_api_bindings.GetLambdaInfoResponse {
	return &kurtosis_core_rpc_api_bindings.GetLambdaInfoResponse{
		IpAddr: ipAddr,
	}
}

// ==============================================================================================
//                                       Register Static Files
// ==============================================================================================
func NewRegisterStaticFilesArgs(staticFileSet map[string]bool) *kurtosis_core_rpc_api_bindings.RegisterStaticFilesArgs {
	return &kurtosis_core_rpc_api_bindings.RegisterStaticFilesArgs{
		StaticFilesSet: staticFileSet,
	}
}

func NewRegisterStaticFilesResponse(staticFileDestRelativeFilepaths map[string]string) *kurtosis_core_rpc_api_bindings.RegisterStaticFilesResponse {
	return &kurtosis_core_rpc_api_bindings.RegisterStaticFilesResponse{
		StaticFileDestRelativeFilepaths: staticFileDestRelativeFilepaths,
	}
}

// ==============================================================================================
//                                       Register Files Artifacts
// ==============================================================================================
func NewRegisterFilesArtifactArgs(filesArtifactUrls map[string]string) *kurtosis_core_rpc_api_bindings.RegisterFilesArtifactsArgs {
	return &kurtosis_core_rpc_api_bindings.RegisterFilesArtifactsArgs{
		FilesArtifactUrls: filesArtifactUrls,
	}
}

// ==============================================================================================
//                                     Register Service
// ==============================================================================================
func NewRegisterServiceArgs(serviceId string, partitionId string) *kurtosis_core_rpc_api_bindings.RegisterServiceArgs {
	return &kurtosis_core_rpc_api_bindings.RegisterServiceArgs{
		ServiceId:   serviceId,
		PartitionId: partitionId,
	}
}

func NewRegisterServiceResponse(ipAddr string) *kurtosis_core_rpc_api_bindings.RegisterServiceResponse {
	return &kurtosis_core_rpc_api_bindings.RegisterServiceResponse{IpAddr: ipAddr}
}

// ==============================================================================================
//                                     Generate Files
// ==============================================================================================
func NewGenerateFilesArgs(serviceId string, filesToGenerate map[string]*kurtosis_core_rpc_api_bindings.FileGenerationOptions) *kurtosis_core_rpc_api_bindings.GenerateFilesArgs {
	return &kurtosis_core_rpc_api_bindings.GenerateFilesArgs{
		ServiceId:       serviceId,
		FilesToGenerate: filesToGenerate,
	}
}

func NewFileGenerationOptions(fileTypeToGenerate kurtosis_core_rpc_api_bindings.FileGenerationOptions_FileTypeToGenerate) *kurtosis_core_rpc_api_bindings.FileGenerationOptions {
	return &kurtosis_core_rpc_api_bindings.FileGenerationOptions{FileTypeToGenerate: fileTypeToGenerate}
}

func NewGenerateFilesResponse(generatedFileRelativeFilepaths map[string]string) *kurtosis_core_rpc_api_bindings.GenerateFilesResponse {
	return &kurtosis_core_rpc_api_bindings.GenerateFilesResponse{
		GeneratedFileRelativeFilepaths: generatedFileRelativeFilepaths,
	}
}

// ==============================================================================================
//                                         Load Static Files
// ==============================================================================================
func NewLoadStaticFilesArgs(serviceId string, staticFilesSet map[string]bool) *kurtosis_core_rpc_api_bindings.LoadStaticFilesArgs {
	return &kurtosis_core_rpc_api_bindings.LoadStaticFilesArgs{
		ServiceId:   serviceId,
		StaticFiles: staticFilesSet,
	}
}

func NewLoadStaticFilesResponse(copiedstaticFileRelativeFilepaths map[string]string) *kurtosis_core_rpc_api_bindings.LoadStaticFilesResponse {
	return &kurtosis_core_rpc_api_bindings.LoadStaticFilesResponse{
		CopiedStaticFileRelativeFilepaths: copiedstaticFileRelativeFilepaths,
	}
}

// ==============================================================================================
//                                        Start Service
// ==============================================================================================
func NewStartServiceArgs(
		serviceId string,
		image string,
		usedPorts map[string]bool,
		entrypointArgs []string,
		cmdArgs []string,
		envVars map[string]string,
		enclaveDataVolMntDirpath string,
		filesArtifactMountDirpaths map[string]string) *kurtosis_core_rpc_api_bindings.StartServiceArgs {
	return &kurtosis_core_rpc_api_bindings.StartServiceArgs{
		ServiceId:                  serviceId,
		DockerImage:                image,
		UsedPorts:                  usedPorts,
		EntrypointArgs:             entrypointArgs,
		CmdArgs:                    cmdArgs,
		DockerEnvVars:              envVars,
		EnclaveDataVolMntDirpath:   enclaveDataVolMntDirpath,
		FilesArtifactMountDirpaths: filesArtifactMountDirpaths,
	}
}

func NewStartServiceResponse(usedPortsHostPortBindings map[string]*kurtosis_core_rpc_api_bindings.PortBinding) *kurtosis_core_rpc_api_bindings.StartServiceResponse {
	return &kurtosis_core_rpc_api_bindings.StartServiceResponse{
		UsedPortsHostPortBindings: usedPortsHostPortBindings,
	}
}

func NewPortBinding(interfaceIp string, portNumber uint32, portProtocol kurtosis_core_rpc_api_bindings.PortBinding_PortProtocol) *kurtosis_core_rpc_api_bindings.PortBinding {
	return &kurtosis_core_rpc_api_bindings.PortBinding{
		InterfaceIp:  interfaceIp,
		PortNumber:   portNumber,
		PortProtocol: portProtocol,
	}
}

// ==============================================================================================
//                                       Get Service Info
// ==============================================================================================
func NewGetServiceInfoArgs(serviceId string) *kurtosis_core_rpc_api_bindings.GetServiceInfoArgs {
	return &kurtosis_core_rpc_api_bindings.GetServiceInfoArgs{
		ServiceId: serviceId,
	}
}

func NewGetServiceInfoResponse(ipAddr string, enclaveDataVolumeMountDirpath string) *kurtosis_core_rpc_api_bindings.GetServiceInfoResponse {
	return &kurtosis_core_rpc_api_bindings.GetServiceInfoResponse{
		IpAddr:                        ipAddr,
		EnclaveDataVolumeMountDirpath: enclaveDataVolumeMountDirpath,
	}
}

// ==============================================================================================
//                                        Remove Service
// ==============================================================================================
func NewRemoveServiceArgs(serviceId string, containerStopTimeoutSeconds uint64) *kurtosis_core_rpc_api_bindings.RemoveServiceArgs {
	return &kurtosis_core_rpc_api_bindings.RemoveServiceArgs{
		ServiceId:                   serviceId,
		ContainerStopTimeoutSeconds: containerStopTimeoutSeconds,
	}
}

// ==============================================================================================
//                                          Repartition
// ==============================================================================================
func NewRepartitionArgs(
		partitionServices map[string]*kurtosis_core_rpc_api_bindings.PartitionServices,
		partitionConnections map[string]*kurtosis_core_rpc_api_bindings.PartitionConnections,
		defaultConnection *kurtosis_core_rpc_api_bindings.PartitionConnectionInfo) *kurtosis_core_rpc_api_bindings.RepartitionArgs {
	return &kurtosis_core_rpc_api_bindings.RepartitionArgs{
		PartitionServices:    partitionServices,
		PartitionConnections: partitionConnections,
		DefaultConnection:    defaultConnection,
	}
}

func NewPartitionServices(serviceIdSet map[string]bool) *kurtosis_core_rpc_api_bindings.PartitionServices {
	return &kurtosis_core_rpc_api_bindings.PartitionServices{
		ServiceIdSet: serviceIdSet,
	}
}

func NewPartitionConnections(connectionInfo map[string]*kurtosis_core_rpc_api_bindings.PartitionConnectionInfo) *kurtosis_core_rpc_api_bindings.PartitionConnections {
	return &kurtosis_core_rpc_api_bindings.PartitionConnections{
		ConnectionInfo: connectionInfo,
	}
}

func NewPartitionConnectionInfo(isBlocked bool) *kurtosis_core_rpc_api_bindings.PartitionConnectionInfo {
	return &kurtosis_core_rpc_api_bindings.PartitionConnectionInfo{
		IsBlocked: isBlocked,
	}
}

// ==============================================================================================
//                                          Exec Command
// ==============================================================================================
func NewExecCommandArgs(serviceId string, commandArgs []string) *kurtosis_core_rpc_api_bindings.ExecCommandArgs {
	return &kurtosis_core_rpc_api_bindings.ExecCommandArgs{
		ServiceId:   serviceId,
		CommandArgs: commandArgs,
	}
}

func NewExecCommandResponse(exitCode int32, logOutput []byte) *kurtosis_core_rpc_api_bindings.ExecCommandResponse {
	return &kurtosis_core_rpc_api_bindings.ExecCommandResponse{
		ExitCode:  exitCode,
		LogOutput: logOutput,
	}
}

// ==============================================================================================
//                           Wait For Http Get Endpoint Availability
// ==============================================================================================
func NewWaitForHttpGetEndpointAvailabilityArgs(
	serviceId string,
	port uint32,
	path string,
	initialDelayMilliseconds uint32,
	retries uint32,
	retriesDelayMilliseconds uint32,
	bodyText string) *kurtosis_core_rpc_api_bindings.WaitForHttpGetEndpointAvailabilityArgs {
	return &kurtosis_core_rpc_api_bindings.WaitForHttpGetEndpointAvailabilityArgs{
		ServiceId:                serviceId,
		Port:                     port,
		Path:                     path,
		InitialDelayMilliseconds: initialDelayMilliseconds,
		Retries:                  retries,
		RetriesDelayMilliseconds: retriesDelayMilliseconds,
		BodyText:                 bodyText,
	}
}

// ==============================================================================================
//                           Wait For Http Post Endpoint Availability
// ==============================================================================================
func NewWaitForHttpPostEndpointAvailabilityArgs(
		serviceId string,
		port uint32,
		path string,
		requestBody string,
		initialDelayMilliseconds uint32,
		retries uint32,
		retriesDelayMilliseconds uint32,
		bodyText string) *kurtosis_core_rpc_api_bindings.WaitForHttpPostEndpointAvailabilityArgs {
	return &kurtosis_core_rpc_api_bindings.WaitForHttpPostEndpointAvailabilityArgs{
		ServiceId:                serviceId,
		Port:                     port,
		Path:                     path,
		RequestBody:              requestBody,
		InitialDelayMilliseconds: initialDelayMilliseconds,
		Retries:                  retries,
		RetriesDelayMilliseconds: retriesDelayMilliseconds,
		BodyText:                 bodyText,
	}
}

// ==============================================================================================
//                                      Execute Bulk Commands
// ==============================================================================================
func NewExecuteBulkCommandsArgs(serializedCommands string) *kurtosis_core_rpc_api_bindings.ExecuteBulkCommandsArgs {
	return &kurtosis_core_rpc_api_bindings.ExecuteBulkCommandsArgs{
		SerializedCommands: serializedCommands,
	}
}
