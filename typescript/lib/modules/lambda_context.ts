//package modules

// import (
// 	"context"
import { ApiContainerServiceClient } from "../..//kurtosis_core_rpc_api_bindings/api_container_service_grpc_pb";
// 	"github.com/palantir/stacktrace"
// )

export type LambdaID = string;

// Docs available at https://docs.kurtosistech.com/kurtosis-libs/lib-documentation
export class LambdaContext {
	private client: ApiContainerServiceClient;
	lambdaId: LambdaID;

    constructor (client: ApiContainerServiceClient, lambdaId: LambdaID) {
        this.client = client;
        this.lambdaId = lambdaId;
    }

    // // Docs available at https://docs.kurtosistech.com/kurtosis-libs/lib-documentation
    // func (moduleCtx *LambdaContext) Execute(serializedParams string) (serializedResult string, resultErr error) {
    //     args := &kurtosis_core_rpc_api_bindings.ExecuteLambdaArgs{
    //         LambdaId:         string(moduleCtx.lambdaId),
    //         SerializedParams: serializedParams,
    //     }
    //     resp, err := moduleCtx.client.ExecuteLambda(context.Background(), args)
    //     if err != nil {
    //         return "", stacktrace.Propagate(err, "An error occurred executing Lambda '%v'", moduleCtx.lambdaId)
    //     }
    //     return resp.SerializedResult, nil
    // }
}
