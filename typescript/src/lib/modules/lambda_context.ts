import { ApiContainerServiceClient } from "../../kurtosis_core_rpc_api_bindings/api_container_service_grpc_pb";
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
            this.client.executeLambda(args, (error: grpc.ServiceError | null, response?: ExecuteLambdaResponse) => {
                if (error === null) {
                    if (!response) {
                        resolve(errAsync(new Error("No error was encountered but the response was still falsy; this should never happen")));
                    } else {
                        resolve(okAsync(response!));
                    }
                } else {
                    resolve(errAsync(error));
                }
            })
        });
        let resultExecuteLambda: Result<ExecuteLambdaResponse, Error>;
        try {
            resultExecuteLambda = await promiseExecuteLambda;
        } catch (exception: any) {
            // Sadly, we have to do this because there's no great way to enforce the caught thing being an error
            // See: https://stackoverflow.com/questions/30469261/checking-for-typeof-error-in-js
            if (exception && exception.stack && exception.message) {
                return err(exception as Error);
            }
            return err(new Error("Resolving promise with ExecuteLambda threw an exception, but " +
                "it's not an Error so we can't report any more information than this"));
        }

        if (!resultExecuteLambda.isOk()) {
            return err(resultExecuteLambda.error);
        }
        const resp: ExecuteLambdaResponse = resultExecuteLambda.value;

        return ok(resp.getSerializedResult());
    }
}
