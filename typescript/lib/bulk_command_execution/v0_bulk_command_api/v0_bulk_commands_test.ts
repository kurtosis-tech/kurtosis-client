//package v0_bulk_command_api

import (
	"encoding/json"
	"fmt"
	"github.com/kurtosis-tech/kurtosis-client/golang/kurtosis_core_rpc_api_bindings"
	"github.com/stretchr/testify/assert"
	"testing"
)

// func TestDeserializeRegisterServiceJSON(t *testing.T) {
// 	deserialized := new(V0SerializableCommand)
// 	serviceId := "my-service-id"
// 	jsonStr := fmt.Sprintf(`{"type":"REGISTER_SERVICE", "args":{"service_id":"%v"}}`, serviceId)
// 	err := json.Unmarshal([]byte(jsonStr), &deserialized)
// 	assert.NoError(t, err, "An unexpected error occurred deserializing the register service command JSON")
// 	casted, ok := deserialized.ArgsPtr.(*kurtosis_core_rpc_api_bindings.RegisterServiceArgs)
// 	if !ok {
// 		t.Fatal("Couldn't downcast generic args ptr to the register service args object")
// 	}
// 	assert.Equal(t, casted.ServiceId, serviceId)
// }
