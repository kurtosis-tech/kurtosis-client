# TBD
### Fixes
* Exported the `KURTOSIS_API_VERSION` Typescript constant

# 0.21.0
### Features
* Added `EnclaveContext.getEnclaveId()`

### Fixes
* `stacktrace.Propagate` now panics on getting a `nil` error argument

### Removals
* Removed the `Network` interface, which adds additional complexity for little benefit

### Breaking Changes
* `NetworkContext` has been renamed to `EnclaveContext` to better reflect its purpose as a representation of a Kurtosis enclave.
* Removed the `Network` interface

# 0.20.0
### Changes
* Renamed several API variables to reflect the fact that enclave data is now stored on the host machine and bind-mounted in, rather than being a volume

### Breaking Changes
* The `enclave_data_vol_mnt_dirpath` property to `StartServiceArgs` has been renamed to `enclave_data_dir_mnt_dirpath` to reflect the fact that the enclave data dir is now bind-mounted on to the services (rather than being volume-mounted)
    * Users should make the appropriate renames in their code
* The `enclave_data_volume_mount_dirpath` property to `GetServiceInfoResponse` has been renamed to `enclave_data_dir_mount_dirpath` to reflect the fact that the enclave data dir is now bind-mounted on to the services (rather than being volume-mounted)
    * Users should make the appropriate renames in their code

# 0.19.0
### Changes
* Renamed all instances of `Lambda` to `Module`, to prevent confusion with AWS Lambda or in-code lambda functions

### Fixes
* Fix Kurtosis email account on `package.json` file

### Breaking Changes
* The low-level API has been renamed to reflect the Lambda -> module transition (users should make the following renames in their code):
    * Renamed `LoadLambda` to `LoadModule`
    * Renamed `ExecuteLambda` to `ExecuteModule`
    * Renamed `UnloadLambda` to `UnloadModule`
    * Renamed `GetLambdaInfo` to `GetModuleInfo`
    * Renamed `GetLambdas` to `GetModules`
    * All instances of `lambda_id` have been renamed to `module_id`
* The high-level API has been renamed to reflect the Lambda -> module transition (users should make the following renames in their code):
    * The `LambdaID` type has been renamed `ModuleID`
    * The `LambdaContext` class has been renamed `ModuleContext`
    * In `NetworkContext`, the following functions have been renamed:
        * `loadLambda` -> `loadModule`
        * `unloadLambda` -> `unloadModule`
        * `getLambdaContext` -> `getModuleContext`
        * `getLambdas` -> `getModules`

# 0.18.0
### Fixes
* Fixed `SharedPath.GetChildPath` being accidentally uppercased

### Breaking Changes
* Typescript `SharedPath.GetChildPath` renamed to `SharedPath.getChildPath` 

# 0.17.3
### Features
* Add `UnloadLambda` endpoint to remove a Kurtosis Lambda from the network

# 0.17.2
### Features
* Added `StartExternalContainerRegistration` and `FinishExternalContainerRegistration` endpoints, for registering containers started by external sources into the enclave

# 0.17.1
### Fixes
* Update `SharedPath.GetChildPath()` method remove the error type from the returning values

# 0.17.0
### Features
* Add `SharedPath` object which contains two fields `absPathOnThisContainer` and `absPathOnServiceContainer` that store the values of an absolute path in the container where the code is running and in the service container
* Add `SharedPath.GetChildPath()` which returns a new `SharedPath` composed by the actual value and adding it a new path element at the end of it
* Update API container service proto definition adding the `relative_service_dirpath` field in `RegisterServiceResponse` and `GetServiceInfoResponse`

### Changes
* Remove `RegisterStaticFiles()`, `GenerateFiles()` and `LoadStaticFiles()` methods from protobuf `ApiContainerService`

### Breaking Changes
* Combine `ContainerCreationConfig` and `ContainerRunConfig` in the new `ContainerConfig` which contains all the necessary information used to create and run a service container
  * Users should replace the creation of `ContainerCreationConfig` and `ContainerRunConfig` objects with an implementation of an anonymous function that dynamically generates the new `ContainerConfig` object
* Update `NetworkCtx.AddService()` method replacing the `containerCreationConfig` param and the `generateRunConfigFunc` with the `containerConfigSupplier` param
  * Users should update `NetworkCtx.AddService()` calls passing it now the `containerConfigSupplier` which is an anonymous function that should be created to dynamically generate the `containerConfig` object 
* Replace `enclaveDataVolMountpointHere` and `enclaveDataVolMountpointOnServiceContainer` in `ServiceContext` fields with a new field called `sharedDirectory` with `SharedPath` type
  * Users should use the `SharedPath` in the `sharedDirectory` field to get the service directory absolute paths
* Removed the `ServiceContext.GenerateFiles()` and the `ServiceContext.LoadStaticFiles()` methods
  * Users should manually create, generate and copy static and dynamic files into the service container with the help of the new `SharedDirectory` object

# 0.16.0
### Features
* `ServiceContext.execCommand` now returns log output as a string, parsed via UTF-8

### Fixes
* Added `go build ./...` to Go buildscript, as some compile errors were getting missed

### Breaking Changes
* `ServiceContext.execCommand` returns log output as a string, rather than bytes
    * Users should drop any decoding they were doing and use the string output instead

# 0.15.0
### Fixes
* Fixed typo: `ContainerRunConfigBuilder.wthEntrypointOverride` -> `ContainerRunConfigBuilder.withEntrypointOverride`

### Breaking Changes
* `ContainerRunConfigBuilder.wthEntrypointOverride` renamed to `ContainerRunConfigBuilder.withEntrypointOverride`
    * Users should use the non-typo'd version

# 0.14.1
### Features
* Add `NetworkContext.GetServices` to get a set of running service IDs
* Add `NetworkContext.GetLambdas` to get a set of running Kurtosis Lambda IDs

# 0.14.0
### Breaking Changes
* Split method `NetworkContext.WaitForEndpointAvailability` to `NetworkContext.WaitForHttpGetEndpointAvailability` and `NetworkContext.WaitForHttpPostEndpointAvailability`
  * Users should replace their `NetworkContext.WaitForEndpointAvailability` calls with `NetworkContext.WaitForHttpGetEndpointAvailability` or `NetworkContext.WaitForHttpPostEndpointAvailability` depending on the endpoint used to check availability

### Fixes
* Fixed broken documentation links in code

# 0.13.7
### Changes
* Abolished the use of ResultAsync, okAsync, and errAsync in favour of just regular Result
* Cleaned up the `try/catch`es inside `V0BulkCommandDeserializer`

# 0.13.6
### Fixes
* Changed one of the fs.open(..) to open one of the file descriptors with write access as needed in starter packer instead of read access

# 0.13.5
### Fixes
* Updating JSON parses so that they can properly parse strings into typescript generated binding classes
* Wrapping the return type of the fileGeneratingFuncs property in ContainerCreationConfig into a promise to match what is written in the kurotsis-testsuite-starter-pack tests

### Changes
* Updated the index.ts again to export ContainerRunConfig + ContainerCreationConfig (merging things together removed these exports)

# 0.13.4
### Changes
* Fixing semantical errors in kurtosis-client typescript files (i.e. for ... in loops, mutability with consts vs let, JSON error messages, etc...)
* Small update to index.ts that only holds a list of export statements instead of imports and exports

# 0.13.3
### Changes
* Updated the index.ts to export ContainerRunConfig + ContainerCreationConfig

# 0.13.2
### Features
* Set Typescript strict mode, for safer code

### Fixes
* Fixed a bunch of bugs that were exposed via strict mode

# 0.13.1
### Changes
* Replace custom docs-checking job with Kurtosis docs-checker orb
* Use the devtools script for updating package versions

### Fixes
* Fixed Node engine dependency in Typescript library to be `>=14.17.0`

# 0.13.0
### Features
* Add new param `bodyRequest` in `NetworkContext.WaitForAvailability` to specify the http request body used in the http call to service's availability endpoint.

### Breaking Changes
* Add new param `bodyRequest` in `NetworkContext.WaitForAvailability` to specify the http request body used in the http call to service's availability endpoint.
  * Users should add the argument `bodyRequest` with its content.

# 0.12.3

### Changes
* Exported Network and NetworkContext so that users can access them in the typescript npm package
* Updated index.ts to represent a more exhaustive list of necessary exports

# 0.12.2
### Changes
* Use the `npm-publisher` CircleCI orb for doing our NPM publishing

# 0.12.1
### Features
* Added index.ts to successfully export all necessary typescript code to npm
* Added an `update-package-versions.sh` script that's hooked into the release flow for automatically updating versions in package files (e.g. `package.json`)
* Added a CircleCI check to make run Typescript `build.sh`
* Use `yarn` to build the Typescript package
* Added CircleCI job that runs upon tag releases to publish to NPM JS repository

### Changes
* Exported ContainerCreationConfigBuilder and ContainerRunConfigBuilder so that users can access them in the npm package
* Updated typescript build.sh script so that it compiles the typescript files found inside the lib/ directory into separate .js and .d.ts files in a hidden build/typescript/ folder
* Renamed Typescript library to `kurtosis-core-api-lib`
* Updated the `update-own-version-constants.sh` script to use the version-updating component from devtools

### Fixes
* Removed incorrect second backslashs found in the import statements of some of the typescript files inside of `typescript/lib/` 
* Make Typescript license `Apache-2.0`, in SPDX format

### Removals
* Removed the `V0BulkCommandTest` in Typescript - it's not really testing anything, and we'll be removing this soon

# 0.12.0
### Features
* Add new param `httpMethod` in `NetworkContext.WaitForAvailability` to specify the http method used in the http call to service's availability endpoint. The allowed values are GET or POST

### Breaking Changes
* Add new param `httpMethod` in `NetworkContext.WaitForAvailability` to specify the http method used in the http call to service's availability endpoint. The allowed values are GET or POST
  * Users should add the argument `httpMethod` with one of its valid values `GET` or `POST` everywhere they have used it.

# 0.11.2
### Features
* Added constants which contains the version of this library, which is updated automatically during the release process of this repo
    * Go: `KurtosisApiVersion`
    * Typescript: `KURTOSIS_API_VERSION`

### Changes
* Add explicit Apache-2 licensing

# 0.11.1
### Features
* Ported `services` .go files, including both services and config-factory, to typescript inside `typescript/lib/services` directory
* Ported `networks` .go files to typescript inside `typescript/lib/networks` directory 
* Ported `bulk_commands` to typescript inside `lib/bulk_command_execution/` directory
* Added a file inside of `typescript/lib` directory that holds a template of constructor calls
* Added our own constructors for each of the Protobuf messages, so that when you add a new field it's harder to forget to add it

### Changes
* Added grpc and google-protobuf to package.json inside of `typescript` folder

### Fixes
* Fixed a bug where `stacktrace.Propagate` was incorrectly used instead of `stacktrace.NewError`
* Updated the build script so that it correctly compiles the typescript files found inside the lib/ directory into one single javascript file

# 0.11.0
### Changes
* Made `GeneratedFileFilepaths` fields private and immutable with a constructor, and added getters to access the field values

### Removals
* `MockService`, which is no longer needed or used now that we've removed the `Service` interface

### Breaking Changes
* Made the fields of the `GeneratedFileFilepaths` object private
    * Users should use the new getters - `getAbsoluteFilepathHere` and `getAbsoluteFilepathOnService`

# 0.10.0
### Features
* Added a `RegisterStaticFiles` API container endpoint and corresponding `NetworkContext` method for telling the API container about static files that the user would like to use when starting services
* Added a `RegisterFilesArtifacts` API container endpoint and corresponding `NetworkContext` method for telling the API container about files artifacts that the user would like to use when starting services

### Changes
* Renamed the `GeneratedFileFilepaths.AbsoluteFilepathOnTestsuiteContainer` -> `AbsoluteFilepathHere` (since the code may not be running on a testsuite with Kurtosis Interactive)

### Fixes
* Fixed broken documentation links now that testsuite API lib has been extracted from Kurtosis Libs

### Breaking Changes
* The files artifacts URL map argument to the `StartService` endpoint takes in a files artifact ID as its key, rather than a files artifact URL
    * This key must be previously registered with the API container
* The `NetworkContext` object no longer requires a files artifact map
* Renamed `ContainerCreationConfigBuilder.withTestVolumeMountpoint` -> `ContainerCreationConfig.withKurtosisVolumeMountpoint`
* Renamed the `GeneratedFileFilepaths.AbsoluteFilepathOnTestsuiteContainer` -> `AbsoluteFilepathHere`

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
