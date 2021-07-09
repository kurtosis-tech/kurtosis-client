package services

import "os"

// The ID of an artifact containing files that should be mounted into a service container
type FilesArtifactID string

// ====================================================================================================
//                                    Config Object
// ====================================================================================================
// TODO defensive copy when we're giving back complex objects?????
// Docs available at https://docs.kurtosistech.com/kurtosis-libs/lib-documentation
type ContainerCreationConfig struct {
	image                        string
	testVolumeMountpoint         string
	usedPortsSet                 map[string]bool
	fileGeneratingFuncs          map[string]func(*os.File) error
	usedStaticFilesSet		     map[StaticFileID]bool
	filesArtifactMountpoints     map[FilesArtifactID]string
}

func (config *ContainerCreationConfig) GetImage() string {
	return config.image
}

func (config *ContainerCreationConfig) GetTestVolumeMountpoint() string {
	return config.testVolumeMountpoint
}

func (config *ContainerCreationConfig) GetUsedPortsSet() map[string]bool {
	return config.usedPortsSet
}

func (config *ContainerCreationConfig) GetFileGeneratingFuncs() map[string]func(*os.File) error {
	return config.fileGeneratingFuncs
}

func (config *ContainerCreationConfig) GetFilesArtifactMountpoints() map[FilesArtifactID]string {
	return config.filesArtifactMountpoints
}

func (config *ContainerCreationConfig) GetUsedStaticFiles() map[StaticFileID]bool {
	return config.usedStaticFilesSet
}


// ====================================================================================================
//                                        Builder
// ====================================================================================================
// TODO Defensive copies on all these With... functions???
// Docs available at https://docs.kurtosistech.com/kurtosis-libs/lib-documentation
type ContainerCreationConfigBuilder struct {
	image                    string
	testVolumeMountpoint     string
	usedPortsSet             map[string]bool
	usedStaticFilesSet       map[StaticFileID]bool
	fileGeneratingFuncs      map[string]func(*os.File) error
	filesArtifactMountpoints map[FilesArtifactID]string
}

func NewContainerCreationConfigBuilder(image string, testVolumeMountpoint string) *ContainerCreationConfigBuilder {
	return &ContainerCreationConfigBuilder{
		image:                    image,
		testVolumeMountpoint:     testVolumeMountpoint,
		usedPortsSet:             map[string]bool{},
		fileGeneratingFuncs:      map[string]func(file *os.File) error{},
		filesArtifactMountpoints: map[FilesArtifactID]string{},
	}
}

func (builder *ContainerCreationConfigBuilder) WithUsedPorts(usedPortsSet map[string]bool) *ContainerCreationConfigBuilder {
	builder.usedPortsSet = usedPortsSet
	return builder
}

func (builder *ContainerCreationConfigBuilder) WithGeneratedFiles(fileGeneratingFuncs map[string]func(*os.File) error) *ContainerCreationConfigBuilder {
	builder.fileGeneratingFuncs = fileGeneratingFuncs
	return builder
}

func (builder *ContainerCreationConfigBuilder) WithStaticFiles(usedStaticFilesSet map[StaticFileID]bool) *ContainerCreationConfigBuilder {
	builder.usedStaticFilesSet = usedStaticFilesSet
	return builder
}

func (builder *ContainerCreationConfigBuilder) WithFilesArtifacts(filesArtifactMountpoints map[FilesArtifactID]string) *ContainerCreationConfigBuilder {
	builder.filesArtifactMountpoints = filesArtifactMountpoints
	return builder
}


func (builder *ContainerCreationConfigBuilder) Build() *ContainerCreationConfig {
	return &ContainerCreationConfig{
		image:                        builder.image,
		testVolumeMountpoint:         builder.testVolumeMountpoint,
		usedPortsSet:                 builder.usedPortsSet,
		fileGeneratingFuncs:          builder.fileGeneratingFuncs,
		usedStaticFilesSet:           builder.usedStaticFilesSet,
		filesArtifactMountpoints:     builder.filesArtifactMountpoints,
	}
}


