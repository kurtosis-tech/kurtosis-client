package v0_bulk_command_api

const (
	serviceIdIpReplacementPrefix = "<<<"
	serviceIdIpReplacementSuffix = ">>>"

	// The *? indicates a non-greedy match
	ServiceIdIpReplacementPattern = serviceIdIpReplacementPrefix + ".*?" + serviceIdIpReplacementSuffix
)

// Used to encode a service ID to a string that can be embedded in commands, and which the API container will replace
//  with the IP address of the service at runtime
func EncodeServiceIdForIpReplacement(serviceId string) string {
	return serviceIdIpReplacementPrefix + serviceId + serviceIdIpReplacementSuffix
}
