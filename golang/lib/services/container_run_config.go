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


// ====================================================================================================
//                                    Config Object
// ====================================================================================================
// Docs available at https://docs.kurtosistech.com/kurtosis-client/lib-documentation
type ContainerRunConfig struct {
	entrypointOverrideArgs  []string
	cmdOverrideArgs         []string
	environmentVariableOverrides     map[string]string
}

func (config *ContainerRunConfig) GetEntrypointOverrideArgs() []string {
	return config.entrypointOverrideArgs
}

func (config *ContainerRunConfig) GetCmdOverrideArgs() []string {
	return config.cmdOverrideArgs
}

func (config *ContainerRunConfig) GetEnvironmentVariableOverrides() map[string]string {
	return config.environmentVariableOverrides
}



// ====================================================================================================
//                                      Builder
// ====================================================================================================
// TODO Defensive copies on all these With... functions???
// Docs available at https://docs.kurtosistech.com/kurtosis-client/lib-documentation
type ContainerRunConfigBuilder struct {
	entrypointOverrideArgs  []string
	cmdOverrideArgs         []string
	environmentVariableOverrides     map[string]string
}

func NewContainerRunConfigBuilder() *ContainerRunConfigBuilder {
	return &ContainerRunConfigBuilder{
		entrypointOverrideArgs: nil,
		cmdOverrideArgs: nil,
		environmentVariableOverrides: map[string]string{},
	}
}

func (builder *ContainerRunConfigBuilder) WithEntrypointOverride(args []string) *ContainerRunConfigBuilder {
	builder.entrypointOverrideArgs = args
	return builder
}

func (builder *ContainerRunConfigBuilder) WithCmdOverride(args []string) *ContainerRunConfigBuilder {
	builder.cmdOverrideArgs = args
	return builder
}

func (builder *ContainerRunConfigBuilder) WithEnvironmentVariableOverrides(envVars map[string]string) *ContainerRunConfigBuilder {
	builder.environmentVariableOverrides = envVars
	return builder
}

func (builder *ContainerRunConfigBuilder) Build() *ContainerRunConfig {
	return &ContainerRunConfig{
		entrypointOverrideArgs:       builder.entrypointOverrideArgs,
		cmdOverrideArgs:              builder.cmdOverrideArgs,
		environmentVariableOverrides: builder.environmentVariableOverrides,
	}
}
