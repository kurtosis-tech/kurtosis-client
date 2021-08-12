import { ApiContainerServiceClient } from "../..//kurtosis_core_rpc_api_bindings/api_container_service_grpc_pb";
import { ExecuteLambdaArgs, ExecuteLambdaResponse } from "../../kurtosis_core_rpc_api_bindings/api_container_service_pb";
import { newExecuteLambdaArgs } from "../constructor_calls";
import { okAsync, errAsync, ResultAsync, ok, err, Result } from "neverthrow";
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
    public async execute(serializedParams: string): Promise<Result<string, Error>> {
        const args: ExecuteLambdaArgs = newExecuteLambdaArgs(this.lambdaId, serializedParams);

        const promiseExecuteLambda: Promise<ResultAsync<ExecuteLambdaResponse, Error>> = new Promise((resolve, _unusedReject) => {
            this.client.executeLambda(args, (error: grpc.ServiceError, response: ExecuteLambdaResponse) => {
                if (error === null) {
                    resolve(okAsync(response));
                } else {
                    resolve(errAsync(error));
                }
            })
        });
        const resultExecuteLambda: Result<ExecuteLambdaResponse, Error> = await promiseExecuteLambda;
        if (!resultExecuteLambda.isOk()) {
            return err(resultExecuteLambda.error);
        }
        const resp: ExecuteLambdaResponse = resultExecuteLambda.value;

        return ok(resp.getSerializedResult());
    }
}
