//package v0_bulk_command_api

//import (
	//"encoding/json" TODO - Pretty sure that I don't need this
	//"fmt" - TOOD replace with console.log and ${myVar}
import { RegisterServiceArgs } from "../../../kurtosis_core_rpc_api_bindings/api_container_service_pb"
import { V0SerializableCommand } from "./v0_bulk_commands"
import * as assert from "assert";	//"github.com/stretchr/testify/assert" //install assert from node.js
	"testing" //TODO - Find automated testing for typescript packages
//)

function testDeserializeRegisterServiceJSON(t testing.T) {
	const deserialized: V0SerializableCommand = new V0SerializableCommand();
	const serviceId = "my-service-id";
	const jsonStr = console.log(`{"type":"REGISTER_SERVICE", "args":{"service_id":"${serviceId}"}}`);
	// err := json.Unmarshal([]byte(jsonStr), &deserialized)
    JSON.parse((string)jsonStr, deserialized); //TODO - console.log may not be the right call
	//assert.NoError(t, err, "An unexpected error occurred deserializing the register service command JSON")
	// casted, ok := deserialized.ArgsPtr.(*kurtosis_core_rpc_api_bindings.RegisterServiceArgs)
	// if !ok {
	// 	t.Fatal("Couldn't downcast generic args ptr to the register service args object")
	// }
	//assert.Equal(t, casted.ServiceId, serviceId)
    //assert 
}
