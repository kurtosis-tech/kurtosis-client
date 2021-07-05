/*
 * Copyright (c) 2020 - present Kurtosis Technologies LLC.
 * All Rights Reserved.
 */

package services

import "net"

/*
The identifier used for services with the network.
*/
type ServiceID string

/*
Importan info related to the service.
*/
type ServiceInfo struct {
	IPAddress net.IP
}

// Docs available at https://docs.kurtosistech.com/kurtosis-libs/lib-documentation
type Service interface {
	// Docs available at https://docs.kurtosistech.com/kurtosis-libs/lib-documentation
	IsAvailable() bool
}
