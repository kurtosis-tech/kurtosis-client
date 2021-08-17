/*
 *    Copyright 2021 Kurtosis Technologies Inc.
 *
 *    Licensed under the Apache License, Version 2.0 (the "License");
 *    you may not use this file except in compliance with the License.
 *    You may obtain a copy of the License at
 *
 *        http://www.apache.org/licenses/LICENSE-2.0
 *
 *    Unless required by applicable law or agreed to in writing, software
 *    distributed under the License is distributed on an "AS IS" BASIS,
 *    WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *    See the License for the specific language governing permissions and
 *    limitations under the License.
 *
 */

package modules

import (
	"context"
	"github.com/kurtosis-tech/kurtosis-client/golang/kurtosis_core_rpc_api_bindings"
	"github.com/kurtosis-tech/kurtosis-client/golang/lib/binding_constructors"
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
	args := binding_constructors.NewExecuteLambdaArgs(string(moduleCtx.lambdaId), serializedParams)
	resp, err := moduleCtx.client.ExecuteLambda(context.Background(), args)
	if err != nil {
		return "", stacktrace.Propagate(err, "An error occurred executing Lambda '%v'", moduleCtx.lambdaId)
	}
	return resp.SerializedResult, nil
}

