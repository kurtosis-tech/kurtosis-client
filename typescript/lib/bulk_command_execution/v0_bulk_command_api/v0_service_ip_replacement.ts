const ServiceIdIpReplacementPrefix = "<<<";
const ServiceIdIpReplacementSuffix = ">>>";

// Used to encode a service ID to a string that can be embedded in commands, and which the API container will replace
// with the IP address of the service at runtime
function EncodeServiceIdForIpReplacement(serviceId: string): string {
	return ServiceIdIpReplacementPrefix + serviceId + ServiceIdIpReplacementSuffix;
}
