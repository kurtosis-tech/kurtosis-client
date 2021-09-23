package services

import (
	"path/filepath"
)

/*
Holds information about a filepath shared between two containers: this container, and a container running a service
in a testnet. The actual object referenced by this path could be anything - a fire, a directory, a symlink,
nonexistent, etc.
*/
type SharedPath struct {
	//Absolute path in the container where this code is running
	absPathOnThisContainer string
	//Absolute path in the service container
	absPathOnServiceContainer string
}

func NewSharedPath(absPathOnThisContainer string, absPathOnServiceContainer string) *SharedPath {
	return &SharedPath{absPathOnThisContainer: absPathOnThisContainer, absPathOnServiceContainer: absPathOnServiceContainer}
}
//TODO add documentation
func (s SharedPath) GetAbsPathOnThisContainer() string {
	return s.absPathOnThisContainer
}
//TODO add documentation
func (s SharedPath) GetAbsPathOnServiceContainer() string {
	return s.absPathOnServiceContainer
}

//TODO add documentation
func (s SharedPath) GetChildPath(pathElement string) (*SharedPath, error) {

	absPathOnThisContainer := filepath.Join(s.absPathOnThisContainer, pathElement)

	absPathOnServiceContainer := filepath.Join(s.absPathOnServiceContainer, pathElement)

	sharedPath := NewSharedPath(absPathOnThisContainer, absPathOnServiceContainer)

	return sharedPath, nil
}
