package modules

import (
	"context"
	"github.com/kurtosis-tech/kurtosis-client/golang/kurtosis_core_rpc_api_bindings"
	"github.com/palantir/stacktrace"
)

type LambdaID string

// Docs available at https://docs.kurtosistech.com/kurtosis-libs/lib-documentation
type LambdaContext struct {
	client   kurtosis_core_rpc_api_bindings.ApiContainerServiceClient
	lambdaId LambdaID
}

func NewLambdaContext(client kurtosis_core_rpc_api_bindings.ApiContainerServiceClient, lambdaId LambdaID) *LambdaContext {
	return &LambdaContext{client: client, lambdaId: lambdaId}
}

// Docs available at https://docs.kurtosistech.com/kurtosis-libs/lib-documentation
func (moduleCtx *LambdaContext) Execute(serializedParams string) (serializedResult string, resultErr error) {
	args := &kurtosis_core_rpc_api_bindings.ExecuteLambdaArgs{
		LambdaId:         string(moduleCtx.lambdaId),
		SerializedParams: serializedParams,
	}
	resp, err := moduleCtx.client.ExecuteLambda(context.Background(), args)
	if err != nil {
		return "", stacktrace.Propagate(err, "An error occurred executing Lambda '%v'", moduleCtx.lambdaId)
	}
	return resp.SerializedResult, nil
}

