# TBD
### Features
* Added a `RegisterStaticFiles` API container endpoint and corresponding `NetworkContext` method for telling the API container about static files that the user would like to use when starting services

# 0.9.0
### Features
* Support Lambda-loading and executing in the bulk command API

### Changes
* Updated the values of the Lambda endpoints to reflect that the serialization format is dependent on the Lambda

### Breaking Changes
* Renamed the `params_json` in the `LoadLambda` and `ExecuteLambda` API container endpoints to `serialized_params`, to reflect that the serialization format is dependent on the module
* Renamed the `respones_json` in the `ExecuteLambda` API container endpoint to `serialized_result`, to reflect the Lambda-specific serialization format

# 0.8.1
### Features
* Added a `GetLambdaInfo` endpoint to the API container's API
* Added a `NetworkContext.getLambdaContext` method for calling the API container method

# 0.8.0
### Fixes
* Fixed Protobuf binding generation, that got broken in 0.7.0

### Changes
* Renamed all the references to "modules" -> "lambdas" to more specifically match the purpose

### Breaking Changes
* Renamed the `ModuleID` type to `LambdaID`, to more closely match its purpose
* Renamed `LambdaModuleContext` -> `LambdaContext`
* Renamed `LoadModule` -> `LoadLambda`
* Renamed `LoadModuleArgs` -> `LoadLambdaArgs`

# 0.7.0
### Changes
* Added an explicit `kurtosis_` in the API binding packages, to clarify that they're Kurtosis specific (per feedback from a user research session)
* Moved the `services`, `networks`, `bulk_command_execution`, and `modules` packages inside a `lib` directory

### Breaking Changes
* Renamed the `core_api_bindings` package -> `kurtosis_core_rpc_api_bindings`
    * Users will need to update their import statements to reflect the new name
* Renamed the `core_api_consts` package -> `kurtosis_core_rpc_api_consts`
    * Users will need to update their import statements to reflect the new name
* Moved the `services`, `networks`, `bulk_command_execution`, and `modules` packages inside a `lib` directory
    * Users will need to update their import statements to reflect the new name

# 0.6.2
### Changes
* Make the user specify module ID, rather than autogenerating one

### Features
* Added a `LoadModule` endpoint to the API container
* Added a `NetworkContext.loadLambda` method that returns a `LambdaModuleContext` with a single method, `execute`, for using Kurtosis Lambda module functions

# 0.6.1
### Fixes
* Fixed an error in this document

# 0.6.0
### Breaking Changes
* Replaced the argument `ContainerConfigFactory` in `AddService`and `AddServiceToPartition`with two arguments `ContainerCreationConfig`and an anonymous function which should returns `ContainerRunConfig`type
  * Users should use the `ContainerCreationConfig` struct, and the function that was defined in `GetRunConfig` in the `ContainerConfigFactory` implementations as the new arguments
* Removed `ContainerConfigFactory` interface; users should instead feed the `ContainerCreationConfig` and `ContainerRunConfig` values directly to `NetworkContext.AddService` or `NetworkContext.AddServiceToPartition`

# 0.5.0
### Features
* Test volume mountpoints are now optional (with a sensible default) when creating `ContainerCreationConfig`s

### Changes
* Added build.sh script inside of typescript/ that takes in .ts files and outputs a single .js file
* Updated the `release.sh` script to use the changelog script

### Fixes
* Fix broken links to `kurtosis-libs` inside the docs

### Breaking Changes
* The `ContainerCreationConfigBuilder` constructor no longer takes in a test volume mountpoint
* Added a `ContainerCreationConfigBuilder.WithTestVolumeMountpoint` for specifying the test volume mountpoint, which should be used instead if the default test volume mountpoint of `/kurtosis-test-volume` isn't acceptable

# 0.4.0
### Features
* Added the `LoadStaticFiles` endpoint to the API container's API for copying static files to a service's filespace
* Added a `LoadStaticFiles` command to the bulk command API
* Added a corresponding `ServiceContext.loadStaticFiles` for calling the API container's `LoadStaticFiles` endpoint
* `ContainerCreationConfigBuilder` now has a new method, `withStaticFiles`, which defines static files that the service will use
    * This function takes in a set, whose elements should be static file IDs corresponding to the static file IDs defined in your testsuite

### Breaking Changes
* `ContainerConfigFactory.getRunConfig` now takes an extra map argument, `staticFileFilepaths`, whose keys correspond to the static file IDs defined in `ContainerCreationConfigBuilder.withStaticFiles` and whose values are the filepaths _on the service container_ where those static files can be found
    * If your service needs static files, you can use this map to set your container's ENTRYPOINT, CMD, and environment variable parameters appropriately

# 0.3.0
### Features
* Added new method `GetServiceInfo` in `api_container_service.proto` file
* Added new method `GetServiceContext` in `NetworkContext` which returns relevant information about the service

### Changes
* Removed the services map from `NetworkContext` which converts it in stateless network representation

### Breaking Changes
* Removed `Service` interface; users should communicate with the service directly or use a custom client (e.g. ElasticsearchClient)
* Removed `GetService` from `NetworkContext` users can use `GetServiceContext` to get relevant service's information
* Removed `AvailabilityChecker` class in the returned values of `AddService` and `AddServiceToPartition`; users should either call the service directly to check availability or use the `NetworkContext.WaitForAvailability` method
* Removed `GetServiceCreatingFunc` from `ContainerCreationConfig`type
* Removed `serviceCreatingFunc` field and `GetServiceCreatingFunc` from ContainerCreationConfig type
* Replaced `Service` interface with `ServiceContext` type in the returned values of `AddService` and `AddServiceToPartition`

# 0.2.3
### Features
* Port over the relevant bits of documentation from `kurtosis-libs`

### Fixes
* Fixed a bug with null-checking the default connection info in the `NetworkContext.repartitionNetwork` call

# 0.2.2
### Changes
* Updated TypeScript binding file to ensure that it considers the new method `WaitForEndpointAvailability` in NetworkContext
* Generated all necessary JavaScript/TypeScript binding files which were added after calling down to developer-tools

### Features
* Added an `ExecuteBulkCommands` endpoint to the API that accepts JSON-serialized bulk command information and executes it against the API container
* Added `release.sh` script

### Fixes
* Don't panic when a user passes in a null partition connections map to `NetworkContxt.repartitionNetwork`

# 0.2.1
### Features
* Added a new method `WaitForEndpointAvailability` in NetworkContext that can be used to wait until a service's endpoint becomes available

### Changes
* Added TypeScript case to `regenerate-protobuf-bindings.sh` so that now it considers TypeScript within the shell script
* Generated TypeScript bindings which can now be outputted by the wrapper script which calls down to developer-tools

# 0.2.0
### Changes
* Replaced the core of `regenerate-protobuf-bindings.sh` with the script from the devtools repo
* Added a `go_package` option to the Protobuf file, to be compatible with the newest version of `generate-protobuf-bindings`

### Breaking Changes
* Regenerated the Golang bindings using the latest version of `generate-protobuf-bindings` from the devtools repo

# 0.1.1
* Add a `core_api_consts` package with the API container's listen port & protocol
* Add CircleCI checks

# 0.1.0
* Init commit
