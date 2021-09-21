package services

type SharedDirectory struct {
	//The service directory absolute path in the container where this code is running
	absFilepathOnThisContainer string
	//The service directory absolute path in the service container
	absFilepathOnServiceContainer string
}

func NewSharedDirectory(absFilepathOnThisContainer string, absFilepathOnServiceContainer string) *SharedDirectory {
	return &SharedDirectory{absFilepathOnThisContainer: absFilepathOnThisContainer, absFilepathOnServiceContainer: absFilepathOnServiceContainer}
}

func (s SharedDirectory) GetAbsFilepathOnThisContainer() string {
	return s.absFilepathOnThisContainer
}

func (s SharedDirectory) GetAbsFilepathOnServiceContainer() string {
	return s.absFilepathOnServiceContainer
}

