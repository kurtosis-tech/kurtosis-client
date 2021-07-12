package services

type StaticFileID string

type ContainerConfigFactory interface {
	// Docs available at https://docs.kurtosistech.com/kurtosis-libs/lib-documentation
	GetCreationConfig(containerIpAddr string) (*ContainerCreationConfig, error)

	// Docs available at https://docs.kurtosistech.com/kurtosis-libs/lib-documentation
	GetRunConfig(containerIpAddr string, generatedFileFilepaths map[string]string, staticFileFilepaths map[StaticFileID]string) (*ContainerRunConfig, error)
}
