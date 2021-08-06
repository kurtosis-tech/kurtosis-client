import { ApiContainerServiceClient } from "../..//kurtosis_core_rpc_api_bindings/api_container_service_grpc_pb";
import { ExecuteLambdaArgs, ExecuteLambdaResponse } from "../../kurtosis_core_rpc_api_bindings/api_container_service_pb";
import { newGetExecuteLambdaArgs } from "../constructor_calls";
import { okAsync, ResultAsync, Result } from "neverthrow";
import * as grpc from "grpc";

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
    public async execute(serializedParams: string): Promise<[string, Error]> {
        const args: ExecuteLambdaArgs = newGetExecuteLambdaArgs(this.lambdaId, serializedParams);

        const promiseAsync: Promise<ResultAsync<ExecuteLambdaResponse, Error>> = new Promise((resolve, _unusedReject) => {
            this.client.executeLambda(args, (_unusedError: grpc.ServiceError, response: ExecuteLambdaResponse) => {
                resolve(okAsync(response));
            })
        });

        const promise: Result<ExecuteLambdaResponse, Error> = await promiseAsync;

        if (!promise.isOk()) {
            return [null, promise.error];
        } else {
            const resp: ExecuteLambdaResponse = promise.value;
            return [resp.getSerializedResult(), null];
        }
    }
}
