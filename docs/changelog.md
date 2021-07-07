# TBD

### Features

* Port over the relevant bits of documentation from `kurtosis-libs`
* Added new method `GetServiceInfo` in `api_container_service.proto` file
* Added new method `GetServiceContext` in `NetworkContext` which returns relevant information about the service

### Changes

* Removed the services map from `NetworkContext` which converts it in stateless network representation

### Breaking Changes

* Removed `Service` interface
* Removed `GetService` from `NetworkContext` users can use `GetServiceContext` to get relevant service's information
* Removed `AvailabilityChecker` class in the returned values of `AddService` and `AddServiceToPartition`
* Removed `GetServiceCreatingFunc` from `ContainerCreationConfig`type
* Removed `serviceCreatingFunc` field and `GetServiceCreatingFunc` from ContainerCreationConfig type
* Replaced `Service` interface with `ServiceContext` type in the returned values of `AddService` and `AddServiceToPartition`

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
