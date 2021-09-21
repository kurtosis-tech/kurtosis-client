package shared_file_object

//TODO add documentation
type SharedFileObject struct {
	//The file absolute path in the container where this code is running
	absFilepathOnThisContainer string
	//The file absolute path in the service container
	absFilepathOnServiceContainer string
}

func NewSharedFileObject(absFilepathOnThisContainer string, absFilepathOnServiceContainer string) *SharedFileObject {
	return &SharedFileObject{absFilepathOnThisContainer: absFilepathOnThisContainer, absFilepathOnServiceContainer: absFilepathOnServiceContainer}
}

//TODO add documentation
func (s SharedFileObject) GetAbsFilepathOnThisContainer() string {
	return s.absFilepathOnThisContainer
}

//TODO add documentation
func (s SharedFileObject) GetAbsFilepathOnServiceContainer() string {
	return s.absFilepathOnServiceContainer
}