import { RegisterServiceArgs } from "../../../kurtosis_core_rpc_api_bindings/api_container_service_pb"
import { V0SerializableCommand } from "./v0_bulk_commands"
import { describe } from "mocha";
import { expect } from "chai";


describe ('test deserializeRegisterServiceJSON()', () => { //TODO - what exactly are we testing, I believe we are testing if V0SerializableCommand is set up appropriately?
	it ('should check appropriate instantiation of V0SerializableCommand', () => {
    
        const deserialized: V0SerializableCommand = new V0SerializableCommand();
        const serviceId = "my-service-id";
        const jsonStr = '`"{"type":"REGISTER_SERVICE", "args":{"service_id":'+ serviceId + '}}`)';
        var parseErr: Error = null;
        try {
            deserialized.type = JSON.parse(jsonStr); //TODO - where exactly in deserialized am I'm trying to save this parsed value
        }
        catch (jsonErr) {
            parseErr = jsonErr;
        }

        expect(parseErr) //TODO (comment) - assert.NoError check for function error returning null
        .to
        .equal(null); //assert.NoError(t, err, "An unexpected error occurred deserializing the register service command JSON")

        const casted: RegisterServiceArgs = <RegisterServiceArgs>deserialized.argsPtr;

        // if !ok { // TODO (comment) - I think type assertion on casted deals with this
        // 	t.Fatal("Couldn't downcast generic args ptr to the register service args object")
        // }

        expect(casted.getServiceId())
        .to 
        .equal(serviceId);

    })
})