import { RegisterServiceArgs } from "../../../kurtosis_core_rpc_api_bindings/api_container_service_pb";
import { V0SerializableCommand } from "./v0_bulk_commands"
import { describe } from "mocha";
import { expect } from "chai";


describe ('test deserializeRegisterServiceJSON()', () => { //TODO - what exactly are we testing, I believe we are testing if V0SerializableCommand is set up appropriately?
	it ('should check appropriate instantiation of V0SerializableCommand', () => {
    
        var deserialized: V0SerializableCommand; // TOOD - Remove = new V0SerializableCommand();
        const serviceId: string = "my-service-id";
        const jsonStr: string = '`"{"type":"REGISTER_SERVICE", "args":{"service_id":'+ serviceId + '}}`)';
        //TODO - REMOVe
        //const jsonStrType: string = "REGISTER_SERVICE";
        //const jsonStrArgs: string = "{ service_id: "+ serviceId + " }";
        var parseErr: Error = null;
        try {
            deserialized = JSON.parse(jsonStr);
            //TODO - REMOVE
            //deserialized.setType(JSON.parse(jsonStrType));
            //deserialized.setArgsPtr(JSON.parse(jsonStrArgs));
        }
        catch (jsonErr) {
            parseErr = jsonErr;
        }
        
        //assert.NoError(t, err, "An unexpected error occurred deserializing the register service command JSON")
        expect(parseErr) //TODO (comment) - assert.NoError check for function error returning null
        .to
        .equal(null);

        const casted: RegisterServiceArgs = <RegisterServiceArgs>deserialized.getArgsPtr();

        // if !ok { // TODO (comment) - I think type assertion on casted deals with this, so I can remove this
        // 	t.Fatal("Couldn't downcast generic args ptr to the register service args object")
        // }

        expect(casted.getServiceId())
        .to 
        .equal(serviceId);

    })
})