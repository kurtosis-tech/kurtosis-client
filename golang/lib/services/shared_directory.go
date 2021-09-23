package services

import (
	"github.com/kurtosis-tech/kurtosis-client/golang/lib/services/shared_file_object"
	"github.com/palantir/stacktrace"
	"os"
	"path/filepath"
)

//TODO add documentation
type SharedDirectory struct {
	//The service directory absolute path in the container where this code is running
	sharedDirectoryMountpathOnThisContainer string
	//The service directory absolute path in the service container
	sharedDirectoryMountpathOnServiceContainer string
}

func NewSharedDirectory(absFilepathOnThisContainer string, absFilepathOnServiceContainer string) *SharedDirectory {
	return &SharedDirectory{sharedDirectoryMountpathOnThisContainer: absFilepathOnThisContainer, sharedDirectoryMountpathOnServiceContainer: absFilepathOnServiceContainer}
}

//TODO add documentation
func (s SharedDirectory) GetSharedDirectoryMountpathOnThisContainer() string {
	return s.sharedDirectoryMountpathOnThisContainer
}

//TODO add documentation
func (s SharedDirectory) GetSharedDirectoryMountpathOnServiceContainer() string {
	return s.sharedDirectoryMountpathOnServiceContainer
}

//TODO add documentation
func (s SharedDirectory) GetSharedFileObject(fileName string) (*shared_file_object.SharedFileObject, error) {

	absFilepathOnThisContainer := filepath.Join(s.sharedDirectoryMountpathOnThisContainer, fileName)

	if _, err := os.Stat(absFilepathOnThisContainer); os.IsNotExist(err) {
		fp, err := os.Create(absFilepathOnThisContainer)
		if err != nil {
			return nil, stacktrace.Propagate(err, "An error occurred creating file '%v'", absFilepathOnThisContainer)
		}
		fp.Close()
	}

	absFilepathOnServiceContainer := filepath.Join(s.sharedDirectoryMountpathOnServiceContainer, fileName)

	sharedFileObject := shared_file_object.NewSharedFileObject(absFilepathOnThisContainer, absFilepathOnServiceContainer)

	return sharedFileObject, nil
}
