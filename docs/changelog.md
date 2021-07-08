# TBD

# 0.2.3
### Features
* Port over the relevant bits of documentation from `kurtosis-libs`
* Added the `LoadStaticFiles` endpoint to the API container's API for copying static files to a service's filespace
* Added a `LoadStaticFiles` command to the bulk command API
* Added a corresponding `ServiceContext.loadStaticFiles` for calling the API container's `LoadStaticFiles` endpoint
* `ContainerCreationConfigBuilder` now has a new method, `withStaticFiles`, which defines static files that the service will use
    * This function takes in a set, whose elements should be static file IDs corresponding to the static file IDs defined in your testsuite

### Breaking Changes
* `ContainerConfigFactory.getRunConfig` now takes an extra map argument, `staticFileFilepaths`, whose keys correspond to the static file IDs defined in `ContainerCreationConfigBuilder.withStaticFiles` and whose values are the filepaths _on the service container_ where those static files can be found
    * If your service needs static files, you can use this map to set your container's ENTRYPOINT, CMD, and environment variable parameters appropriately

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
* Added TypeScript case to regenerate-protobuf-bindings.sh so that now it considers TypeScript within the shell script
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
