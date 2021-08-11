import { RegisterServiceArgs } from "../../../kurtosis_core_rpc_api_bindings/api_container_service_pb";
import { V0SerializableCommand } from "./v0_bulk_commands"
import { describe } from "mocha";
import { expect } from "chai";


describe ('test deserializeRegisterServiceJSON()', () => {
	it ('should check appropriate instantiation of V0SerializableCommand', () => {
    
        var deserialized: V0SerializableCommand;
        const serviceId: string = "my-service-id";
        const jsonStr: string = '`{"type":"REGISTER_SERVICE", "args":{"service_id":"' + serviceId + '"}}`';
        var parseErr: Error = null;
        try {
            deserialized = JSON.parse(jsonStr);
        } catch (jsonErr) {
            parseErr = jsonErr;
        }
        
        expect(parseErr)
        .to
        .equal(null);

        const casted: RegisterServiceArgs = <RegisterServiceArgs>deserialized.getArgsPtr();

        expect(casted.getServiceId())
        .to 
        .equal(serviceId);

    })
})