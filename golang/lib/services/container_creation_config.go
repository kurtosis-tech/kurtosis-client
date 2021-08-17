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

package services

import "os"

const (
	defaultKurtosisVolumeMountpoint = "/kurtosis-enclave-data"
)

type StaticFileID string

// The ID of an artifact containing files that should be mounted into a service container
type FilesArtifactID string

// ====================================================================================================
//                                    Config Object
// ====================================================================================================
// TODO defensive copy when we're giving back complex objects?????
// Docs available at https://docs.kurtosistech.com/kurtosis-libs/lib-documentation
type ContainerCreationConfig struct {
	image                    string
	kurtosisVolumeMountpoint string   // Technically the enclave data volume, but we call it this for simplicity for the user
	usedPortsSet             map[string]bool
	fileGeneratingFuncs      map[string]func(*os.File) error
	usedStaticFilesSet       map[StaticFileID]bool
	filesArtifactMountpoints map[FilesArtifactID]string
}

func (config *ContainerCreationConfig) GetImage() string {
	return config.image
}

func (config *ContainerCreationConfig) GetKurtosisVolumeMountpoint() string {
	return config.kurtosisVolumeMountpoint
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
	kurtosisVolumeMountpoint string
	usedPortsSet             map[string]bool
	usedStaticFilesSet       map[StaticFileID]bool
	fileGeneratingFuncs      map[string]func(*os.File) error
	filesArtifactMountpoints map[FilesArtifactID]string
}

func NewContainerCreationConfigBuilder(image string) *ContainerCreationConfigBuilder {
	return &ContainerCreationConfigBuilder{
		image:                    image,
		kurtosisVolumeMountpoint: defaultKurtosisVolumeMountpoint,
		usedPortsSet:             map[string]bool{},
		fileGeneratingFuncs:      map[string]func(file *os.File) error{},
		filesArtifactMountpoints: map[FilesArtifactID]string{},
	}
}

func (builder *ContainerCreationConfigBuilder) WithKurtosisVolumeMountpoint(kurtosisVolumeMountpoint string) *ContainerCreationConfigBuilder {
	builder.kurtosisVolumeMountpoint = kurtosisVolumeMountpoint
	return builder
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
		image:                    builder.image,
		kurtosisVolumeMountpoint: builder.kurtosisVolumeMountpoint,
		usedPortsSet:             builder.usedPortsSet,
		fileGeneratingFuncs:      builder.fileGeneratingFuncs,
		usedStaticFilesSet:       builder.usedStaticFilesSet,
		filesArtifactMountpoints: builder.filesArtifactMountpoints,
	}
}
