# TBD
### Features
* Added a new method `WaitForEndpointAvailability` in NetworkContext that can be used to wait until a service's endpoint becomes available

### Changes
* Added TypeScript case to regenerate-protobuf-bindings.sh so that now it considers TypeScript within the shell script
* Generated TypeScript bindings which can now be ouputted by the wrapper script which calls down to developer-tools

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
