Kurtosis Client Documentation
=============================
This documentation describes how to interact with the Kurtosis API from within a testnet. It includes information about starting service, stopping services, repartitioning the network, etc. These objects are heavily used inside the [Kurtosis testing framework](./kurtosis-libs/lib-documentation). Note that any comments specific to a language implementation will be found in the code comments.

_Found a bug? File it on [the repo](https://github.com/kurtosis-tech/kurtosis-client/issues)!_

Network
-------
This interface provides the option to define a higher level of abstraction for manipulating your test network than is provided by [NetworkContext][networkcontext], so that test-writing is easier. This commonly looks like wrapping several [NetworkContext][networkcontext] methods into a single one - e.g. if you're running a Cassandra cluster that must bootstrap off three nodes, you might define a `CassandraNetwork` implementation with a `startBootstrappers` method that does the gruntwork so each test doesn't need to add the services manually. Each of your tests will then receive this custom implementation in their [Test.run][test_run] method.

NetworkContext
--------------
This Kurtosis-provided class is the lowest-level representation of a test network, and provides methods for inspecting and manipulating the network. All [Network][network] implementations will encapsulate an instance of this class.

### addServiceToPartition(ServiceID serviceId, PartitionID partitionId, [ContainerConfigFactory\<S\>][containerconfigfactory] configFactory) -\> ([ServiceContext][servicecontext] serviceContext, Map\<String, PortBinding\> hostPortBindings)
Starts a new service in the network with the given service ID, inside the partition with the given ID, using the given config factory.

**Args**

* `serviceId`: The ID that the new service should have.
* `partitionId`: The ID of the partition that the new service should be started in. This can be left blank to start the service in the default partition if it exists (i.e. if the network hasn't been repartitioned and the default partition removed).
* `configFactory`: The factory that produces the configs Kurtosis will use to start the container for the new service.

**Returns**

* `serviceContext`: The [ServiceContext][servicecontext] representation of a service running in a Docker container.
* `hostPortBindings`: The port spec strings that the service declared (as defined in [ContainerCreationConfig.usedPorts][containercreationconfig_usedports]), mapped to the port on the host machine where the port has been bound to. This allows you to make requests to a service running in Kurtosis by making requests to a port on your local machine. If a port was not bound to a host machine port, it will not be present in the map (and if no ports were bound to host machine ports, the map will be empty).

### addService(ServiceID serviceId, [ContainerConfigFactory\<S\>][containerconfigfactory] configFactory) -\> ([ServiceContext][servicecontext] serviceContext, Map\<String, PortBinding\> hostPortBindings)
Convenience wrapper around [NetworkContext.addServiceToPartition][networkcontext_addservicetopartition], that adds the service to the default partition. Note that if the network has been repartitioned and the default partition doesn't exist anymore, this method will fail.

### \<S extends [Service][service]\> getService(ServiceID serviceId) -\> S
Gets the [Service][service] interface representing the service with the given ID.

**Args**

* `serviceId`: The ID of the service in the network to get.

**Returns**

The [Service][service] implementation representing the service.

### getServiceContext(ServiceID serviceId, [ContainerConfigFactory\<S\>][containerconfigfactory] configFactory)
Gets relevant information about a service (identified by the given service ID) that is running in the network.

**Args**

* `serviceId`: The ID of the service to pull the information from.
* `configFactory`: The factory that produces the configs Kurtosis will use to start the container for the new service.

**Returns**

The [ServiceContext][servicecontext] representation of a service running in a Docker container.


### removeService(ServiceID serviceId, uint64 containerStopTimeoutSeconds)
Stops the container with the given service ID and removes it from the network.

**Args**

* `serviceId`: The ID of the service to remove.
* `containerStopTimeoutSeconds`: The number of seconds to wait for the container to gracefully stop before hard-killing it.

### repartitionNetwork(Map\<PartitionID, Set\<ServiceID\>> partitionServices, Map\<PartitionID, Map\<PartitionID, [PartitionConnectionInfo][partitionconnectioninfo]\>> partitionConnections, [PartitionConnectionInfo][partitionconnectioninfo] defaultConnection)
Repartitions the network so that the connections between services match the specified new state. All services currently in the network must be allocated to a new partition. 

**NOTE: For this to work, partitioning must be turned on in the [Test.configure][test_configure] method.**

**Args**

* `partitionServices`: A definition of the new partitions in the network, and the services allocated to each partition. A service can only be allocated to a single partition.
* `partitionConnections`: Definitions of the connection state between the new partitions. If a connection between two partitions isn't defined in this map, the default connection will be used. Connections are not directional, so an error will be thrown if the same connection is defined twice (e.g. `Map[A][B] = someConnectionInfo`, and `Map[B][A] = otherConnectionInfo`).
* `defaultConnection`: The network state between two partitions that will be used if the connection isn't defined in the partition connections map.

### waitForEndpointAvailability(ServiceID serviceId, uint32 port, String path, uint32 initialDelaySeconds, uint32 retries, uint32 retriesDelayMilliseconds, String bodyText)
Waits until a service endpoint is available by making requests to the endpoint using the given parameters. An error is thrown if the number of retries is exceeded.

**Args**

* `serviceId`: The ID of the service to check.
* `port`: The port (e.g. 8080) of the endpoint to check.
* `path`: The path of the service to check, which must not start with a slash (e.g. `service/health`).
* `initialDelaySeconds`: Number of seconds to wait until executing the first HTTP call
* `retries`: Max number of HTTP call attempts that this will execute until giving up and returning an error
* `retriesDelayMilliseconds`: Number of milliseconds to wait between retries
* `bodyText`: If this value is non-empty, the endpoint will not be marked as available until this value is returned (e.g. `Hello World`). If this value is emptystring, no body text comparison will be done.

PartitionConnectionInfo
-----------------------
This class is a plain old object defining the state between two partitions (e.g. whether network traffic is blocked or not). It is auto-generated from a gRPC API, so exploring it in code is the best way to view its properties. 

**NOTE:** These objects will often have several gRPC-specific fields inside them, but which don't need to be considered; you can construct the object however you normally instantiate objects in your language of choice (e.g. `new` in Java, `PartitionConnectionInfo{....fields...}` in Go, etc.).

### waitForStartup(Duration timeBetweenPolls, int maxNumRetries)
Blocks until the timeout is reached or the checker's corresponding service becomes available (as determined by the [Service.isAvailable][service_isavailable] method).

**Args**

* `timeBetweenPolls`: The time that the checker should wait before calls to [Service.isAvailable][service_isavailable].
* `maxNumRetries`: The maximum number of failed calls to [Service.isAvailable][service_isavailable] that the checker will allow before returning an error.



ContainerConfigFactory\<S extends [Service][service]\>
-----------------------------------------------------
Factory interface that creates [ContainerCreationConfig][containercreationconfig] and [ContainerRunConfig][containerrunconfig] instances, which instruct Kurtosis how to instantiate a container.

### getCreationConfig(String containerIpAddr) -\> [ContainerCreationConfig][containercreationconfig]
Returns a [ContainerCreationConfig][containercreationconfig] object for instructing Kurtosis how to create the container. You should use the [ContainerCreationConfigBuilder][containercreationconfigbuilder] object to create the result.

**Args**
* `containerIpAddr`: The IP address that the container-to-be will have.

**Returns**
The config detailing how the container will be created, constructed using a [ContainerCreationConfigBuilder][containercreationconfigbuilder].

### getRunConfig(String containerIpAddr, Map\<String, String\> generatedFileFilepaths) -\> [ContainerRunConfig][containerrunconfig]
Returns a [ContainerRunConfig][containerrunconfig] object for instructing Kurtosis how to run the container. You should use the [ContainerRunConfigBuilder][containerrunconfigbuilder] object to create the result.

**Args**
* `containerIpAddr`: The IP address that the container to run has been allocated.
* `generatedFileFilepaths`: A mapping of file ID (as declared in [ContainerCreationConfig.fileGeneratingFuncs][containercreationconfig_filegeneratingfuncs] to the filepath on the service container where the generated file lives.

**Returns**
The config detailing how the container will be run, constructed using a [ContainerRunConfigBuilder][containerrunconfigbuilder].



ContainerCreationConfig
-----------------------
Object containing information Kurtosis needs to create the container. This config should be created using [ContainerCreationConfigBuilder][containercreationconfigbuilder] instances.

### String image
The name of the container image that Kurtosis should use when creating the service's container (e.g. `my-repo/my-image:some-tag-name`).

### String testVolumeMountpoint
Kurtosis uses a Docker volume to keep track of test state, and needs to mount this volume on every container. Kurtosis can't know what filesystem the service image uses or what paths are safe to mount on though, so this property tells Kurtosis where that volume should be mounted. This should be set to a filepath that doesn't already exist where Kurtosis can safely mount the Kurtosis volume.

### Set\<String\> usedPorts
The set of ports that the container will be listening on, in the format `NUM/PROTOCOL` (e.g. `80/tcp`, `9090/udp`, etc.).

### Func([ServiceContext][servicecontext]) -\> S serviceCreatingFunc
A function that will wrap Kurtosis' internal representation of the running container, the [ServiceContext][servicecontext], with your custom [Service][service] type to make it as simple as possible for your tests to interact with your service.

### Map\<String, Func(File)\> fileGeneratingFuncs
Declares the files that will be generated before your service starts and made available on the container's filesystem, as well as the logic for generating their contents. The file keys declared here (which can be any string you like) will be the same keys used to identify the files in the map arg to [ContainerConfigFactory.getRunConfig][containerconfigfactory_getrunconfig].

E.g. if your service needs a config file and a log file, you might return a map with keys `config` and `log` corresponding to logic for generating the config and log files respectively.

### Map\<String, String\> filesArtifactMountpoints
Sometimes a service needs files to be available before it starts, but creating those files via [ContainerCreationConfig.fileGeneratingFuncs][containercreationconfig_filegeneratingfuncs] is slow, difficult, or would require committing a very large artifact to the testsuite's Git repo (e.g. starting a service with a 5 GB Postgres database mounted). To ease this pain, Kurtosis allows you to specify URLs of gzipped TAR files that Kurtosis will download, uncompress, and mount inside your service containers. 

This property is therefore a map of the file artifact ID -> path on the container where the uncompressed artifact contents should be mounted, with the file artifact IDs corresponding matching the files artifacts declared in the [TestConfiguration][testconfiguration] object returned by [Test.getTestConfiguration][test_gettestconfiguration]. 

E.g. if my test declares an artifact called `5gb-database` that lives at `https://my-site.com/test-artifacts/5gb-database.tgz`, I might return the following map from this function to mount the artifact at the `/database` path inside my container: `{"5gb-database": "/database"}`.



ContainerCreationConfigBuilder
------------------------------
The builder that should be used to create [ContainerCreationConfig][containercreationconfig] instances. The functions on this builder will correspond to the properties on the [ContainerCreationConfig][containercreationconfig] object, in the form `withPropertyName` (e.g. `withUsedPorts` sets the ports used by the container).



ContainerRunConfig
------------------
Object containing information Kurtosis needs to run the container. This config should be created using [ContainerRunConfigBuilder][containerrunconfigbuilder] instances.

### List\<String\> entrypointOverrideArgs
You often won't control the container images that you'll be using in your testnet, and the `ENTRYPOINT` statement  hardcoded in their Dockerfiles might not be suitable for what you need. This function allows you to override these statements when necessary.

### List\<String\> cmdOverrideArgs
You often won't control the container images that you'll be using in your testnet, and the `CMD` statement  hardcoded in their Dockerfiles might not be suitable for what you need. This function allows you to override these statements when necessary.

### Map\<String, String\> environmentVariableOverrides
Defines environment variables that should be set inside the Docker container running the service. This can be necessary for starting containers from Docker images you don't control, as they'll often be parameterized with environment variables.



ContainerRunConfigBuilder
-------------------------
The builder that should be used to create [ContainerRunConfig][containerrunconfig] instances. The functions on this builder will correspond to the properties on the [ContainerRunConfig][containerrunconfig] object, in the form `withPropertyName` (e.g. `withCmdOverride` overrides the container's CMD declaration).




ServiceContext
--------------
This Kurtosis-provided class is the lowest-level representation of a service running inside a Docker container. It is your handle for retrieving container information and manipulating the container.

<!-- TODO make the return type be ServiceID???? -->
### getServiceId() -\> String
Gets the ID that Kurtosis uses to identify the service.

**Returns**

The service's ID.

### getIpAddress() -\> String
Gets the IP address of the Docker container that the service is running inside.

**Returns**

The service's IP address.

### execCommand(List\<String\> command) -\> (int exitCode, List\<byte\> logs)
Uses [Docker exec](https://docs.docker.com/engine/reference/commandline/exec/) functionality to execute a command inside the service's running Docker container.

**Args**

* `command`: The args of the command to execute in the container.

**Returns**

* `exitCode`: The exit code of the command.
* `logs`: The bytes of the command logs. This isn't a string because Kurtosis can't know what text encoding scheme the container uses.

### generateFiles(Set\<String\> filesToGenerate) -\> Map\<String, [GeneratedFileFilepaths][generatedfilefilepaths]\>
Generates files inside the suite execution volume, which is mounted on both the testsuite container and the service container. This allows the testsuite to write data to files that are immediately available to the service container, as if they shared a filesystem.

**Args**

* `filesToGenerate`: A set of user-defined IDs identifying the files that will be generated.

**Returns**

A map of the file IDs (corresponding to the set passed in as input) mapped to a [GeneratedFileFilepaths][generatedfilefilepaths] object containing the filepaths on a) the testsuite container and b) the service container where the generated file was created.

GeneratedFileFilepaths
----------------------
Simple structure containing the filepaths to a generated file on either a) the testsuite container or b) on the service container for whom the file was generated. These filepaths are different because the path where the suite execution volume is mounted on the testsuite container can be different from the path where the volume is mounted on the service container.

### String absoluteFilepathOnTestsuiteContainer
The absolute filepath where the file lives on the testsuite container, which would be used if the testsuite code wants to read or write data to the file.

### String absoluteFilepathOnServiceContainer
The absolute filepath where the file lives on the service container, which would be used if the service wants to read or write data to the file.

---

_Found a bug? File it on [the repo](https://github.com/kurtosis-tech/kurtosis-client/issues)!_


<!-- TODO Make the function definition not include args or return values, so we don't get these huge ugly links that break if we change the function signature -->
<!-- TODO make the reference names a) be properly-cased (e.g. "Service.isAvailable" rather than "service_isavailable") and b) have an underscore in front of them, so they're easy to find-replace without accidentally over-replacing -->

[containerconfigfactory]: #containerconfigfactorys-extends-service
[containerconfigfactory_getrunconfig]: #getrunconfigstring-containeripaddr-mapstring-string-generatedfilefilepaths---containerrunconfig

[containercreationconfig]: #containercreationconfig
[containercreationconfig_usedports]: #setstring-usedports
[containercreationconfig_filegeneratingfuncs]: #mapstring-funcfile-filegeneratingfuncs
[containercreationconfig_filesartifactmountpoints]: #mapstring-string-filesartifactmountpoints

[containercreationconfigbuilder]: #containercreationconfigbuilder

[containerrunconfig]: #containerrunconfig

[containerrunconfigbuilder]: #containerrunconfigbuilder

[network]: #network

[networkcontext]: #networkcontext
[networkcontext_addservice]: #addserviceserviceid-serviceid-containerconfigfactorys-configfactory---s-service-mapstring-portbinding-hostportbindings-availabilitychecker-checker
[networkcontext_addservicetopartition]: #addservicetopartitionserviceid-serviceid-partitionid-partitionid-containerconfigfactorys-configfactory---s-service-mapstring-portbinding-hostportbindings-availabilitychecker-checker
[networkcontext_repartitionnetwork]: #repartitionnetworkmappartitionid-setserviceid-partitionservices-mappartitionid-mappartitionid-partitionconnectioninfo-partitionconnections-partitionconnectioninfo-defaultconnection

[partitionconnectioninfo]: #partitionconnectioninfo

[servicecontext]: #servicecontext

[generatedfilefilepaths]: #generatedfilefilepaths

[test]: ./kurtosis-libs/lib-documentation#testn-extends-network
[test_configure]: ./kurtosis-libs/lib-documentation#configuretestconfigurationbuilder-builder
[test_setup]: ./kurtosis-libs/lib-documentation#setupnetworkcontext-networkcontext---n
[test_run]: ./kurtosis-libs/lib-documentation#runn-network
[test_gettestconfiguration]: ./kurtosis-libs/lib-documentation#gettestconfiguration---testconfiguration

[testconfiguration]: ./kurtosis-libs/lib-documentation#testconfiguration

[testconfigurationbuilder]: ./kurtosis-libs/lib-documentation#testconfigurationbuilder

[testsuite]: ./kurtosis-libs/lib-documentation#testsuite
