//package modules

// import (
// 	"context"
import { ApiContainerServiceClient } from "../..//kurtosis_core_rpc_api_bindings/api_container_service_grpc_pb";
import { ExecuteLambdaArgs, ExecuteLambdaResponse } from "../../kurtosis_core_rpc_api_bindings/api_container_service_pb";
import { newExecuteLambdaArgs } from "../constructor_calls";
// 	"github.com/palantir/stacktrace"
// )

export type LambdaID = string;

// Docs available at https://docs.kurtosistech.com/kurtosis-libs/lib-documentation
export class LambdaContext {
	private readonly client: ApiContainerServiceClient;
	private readonly lambdaId: LambdaID;

    constructor (client: ApiContainerServiceClient, lambdaId: LambdaID) {
        this.client = client;
        this.lambdaId = lambdaId;
    }

    // Docs available at https://docs.kurtosistech.com/kurtosis-libs/lib-documentation
    public execute(serializedParams: string): [string, Error] {
        const args: ExecuteLambdaArgs = newExecuteLambdaArgs(this.lambdaId, serializedParams);
        // TODO TODO TODO - CALLBACK & ERROR-HANDLING
        // resp, err := moduleCtx.client.ExecuteLambda(context.Background(), args)
        // if err != nil {
        //     return "", stacktrace.Propagate(err, "An error occurred executing Lambda '%v'", moduleCtx.lambdaId)
        // }
        let resp: ExecuteLambdaResponse; //TODO - remove
        return [resp.getSerializedResult(), null];
    }
}
