package modules

import (
	"context"
	"github.com/kurtosis-tech/kurtosis-client/golang/kurtosis_core_rpc_api_bindings"
	"github.com/palantir/stacktrace"
)

type ModuleID string

// Docs available at https://docs.kurtosistech.com/kurtosis-libs/lib-documentation
type LambdaModuleContext struct {
	client   kurtosis_core_rpc_api_bindings.ApiContainerServiceClient
	moduleId ModuleID
}

func NewLambdaModuleContext(client kurtosis_core_rpc_api_bindings.ApiContainerServiceClient, moduleId ModuleID) *LambdaModuleContext {
	return &LambdaModuleContext{client: client, moduleId: moduleId}
}

// Docs available at https://docs.kurtosistech.com/kurtosis-libs/lib-documentation
func (moduleCtx *LambdaModuleContext) Execute(argsJsonStr string) (responseJsonStr string, resultErr error) {
	args := &kurtosis_core_rpc_api_bindings.ExecuteLambdaArgs{
		ModuleId:   string(moduleCtx.moduleId),
		ParamsJson: argsJsonStr,
	}
	resp, err := moduleCtx.client.ExecuteLambda(context.Background(), args)
	if err != nil {
		return "", stacktrace.Propagate(err, "An error occurred executing Lambda module '%v'", moduleCtx.moduleId)
	}
	return resp.ResponseJson, nil
}

