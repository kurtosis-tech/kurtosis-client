// GENERATED CODE -- DO NOT EDIT!

// package: api_container_api
// file: api_container_service.proto

import * as api_container_service_pb from "./api_container_service_pb";
import * as google_protobuf_empty_pb from "google-protobuf/google/protobuf/empty_pb";
import * as grpc from "grpc";

interface IApiContainerServiceService extends grpc.ServiceDefinition<grpc.UntypedServiceImplementation> {
  loadLambda: grpc.MethodDefinition<api_container_service_pb.LoadLambdaArgs, google_protobuf_empty_pb.Empty>;
  executeLambda: grpc.MethodDefinition<api_container_service_pb.ExecuteLambdaArgs, api_container_service_pb.ExecuteLambdaResponse>;
  getLambdaInfo: grpc.MethodDefinition<api_container_service_pb.GetLambdaInfoArgs, api_container_service_pb.GetLambdaInfoResponse>;
  registerStaticFiles: grpc.MethodDefinition<api_container_service_pb.RegisterStaticFilesArgs, api_container_service_pb.RegisterStaticFilesResponse>;
  registerFilesArtifacts: grpc.MethodDefinition<api_container_service_pb.RegisterFilesArtifactsArgs, google_protobuf_empty_pb.Empty>;
  registerService: grpc.MethodDefinition<api_container_service_pb.RegisterServiceArgs, api_container_service_pb.RegisterServiceResponse>;
  generateFiles: grpc.MethodDefinition<api_container_service_pb.GenerateFilesArgs, api_container_service_pb.GenerateFilesResponse>;
  loadStaticFiles: grpc.MethodDefinition<api_container_service_pb.LoadStaticFilesArgs, api_container_service_pb.LoadStaticFilesResponse>;
  startService: grpc.MethodDefinition<api_container_service_pb.StartServiceArgs, api_container_service_pb.StartServiceResponse>;
  getServiceInfo: grpc.MethodDefinition<api_container_service_pb.GetServiceInfoArgs, api_container_service_pb.GetServiceInfoResponse>;
  removeService: grpc.MethodDefinition<api_container_service_pb.RemoveServiceArgs, google_protobuf_empty_pb.Empty>;
  repartition: grpc.MethodDefinition<api_container_service_pb.RepartitionArgs, google_protobuf_empty_pb.Empty>;
  execCommand: grpc.MethodDefinition<api_container_service_pb.ExecCommandArgs, api_container_service_pb.ExecCommandResponse>;
  waitForHttpGetEndpointAvailability: grpc.MethodDefinition<api_container_service_pb.WaitForHttpGetEndpointAvailabilityArgs, google_protobuf_empty_pb.Empty>;
  waitForHttpPostEndpointAvailability: grpc.MethodDefinition<api_container_service_pb.WaitForHttpPostEndpointAvailabilityArgs, google_protobuf_empty_pb.Empty>;
  executeBulkCommands: grpc.MethodDefinition<api_container_service_pb.ExecuteBulkCommandsArgs, google_protobuf_empty_pb.Empty>;
}

export const ApiContainerServiceService: IApiContainerServiceService;

export interface IApiContainerServiceServer extends grpc.UntypedServiceImplementation {
  loadLambda: grpc.handleUnaryCall<api_container_service_pb.LoadLambdaArgs, google_protobuf_empty_pb.Empty>;
  executeLambda: grpc.handleUnaryCall<api_container_service_pb.ExecuteLambdaArgs, api_container_service_pb.ExecuteLambdaResponse>;
  getLambdaInfo: grpc.handleUnaryCall<api_container_service_pb.GetLambdaInfoArgs, api_container_service_pb.GetLambdaInfoResponse>;
  registerStaticFiles: grpc.handleUnaryCall<api_container_service_pb.RegisterStaticFilesArgs, api_container_service_pb.RegisterStaticFilesResponse>;
  registerFilesArtifacts: grpc.handleUnaryCall<api_container_service_pb.RegisterFilesArtifactsArgs, google_protobuf_empty_pb.Empty>;
  registerService: grpc.handleUnaryCall<api_container_service_pb.RegisterServiceArgs, api_container_service_pb.RegisterServiceResponse>;
  generateFiles: grpc.handleUnaryCall<api_container_service_pb.GenerateFilesArgs, api_container_service_pb.GenerateFilesResponse>;
  loadStaticFiles: grpc.handleUnaryCall<api_container_service_pb.LoadStaticFilesArgs, api_container_service_pb.LoadStaticFilesResponse>;
  startService: grpc.handleUnaryCall<api_container_service_pb.StartServiceArgs, api_container_service_pb.StartServiceResponse>;
  getServiceInfo: grpc.handleUnaryCall<api_container_service_pb.GetServiceInfoArgs, api_container_service_pb.GetServiceInfoResponse>;
  removeService: grpc.handleUnaryCall<api_container_service_pb.RemoveServiceArgs, google_protobuf_empty_pb.Empty>;
  repartition: grpc.handleUnaryCall<api_container_service_pb.RepartitionArgs, google_protobuf_empty_pb.Empty>;
  execCommand: grpc.handleUnaryCall<api_container_service_pb.ExecCommandArgs, api_container_service_pb.ExecCommandResponse>;
  waitForHttpGetEndpointAvailability: grpc.handleUnaryCall<api_container_service_pb.WaitForHttpGetEndpointAvailabilityArgs, google_protobuf_empty_pb.Empty>;
  waitForHttpPostEndpointAvailability: grpc.handleUnaryCall<api_container_service_pb.WaitForHttpPostEndpointAvailabilityArgs, google_protobuf_empty_pb.Empty>;
  executeBulkCommands: grpc.handleUnaryCall<api_container_service_pb.ExecuteBulkCommandsArgs, google_protobuf_empty_pb.Empty>;
}

export class ApiContainerServiceClient extends grpc.Client {
  constructor(address: string, credentials: grpc.ChannelCredentials, options?: object);
  loadLambda(argument: api_container_service_pb.LoadLambdaArgs, callback: grpc.requestCallback<google_protobuf_empty_pb.Empty>): grpc.ClientUnaryCall;
  loadLambda(argument: api_container_service_pb.LoadLambdaArgs, metadataOrOptions: grpc.Metadata | grpc.CallOptions | null, callback: grpc.requestCallback<google_protobuf_empty_pb.Empty>): grpc.ClientUnaryCall;
  loadLambda(argument: api_container_service_pb.LoadLambdaArgs, metadata: grpc.Metadata | null, options: grpc.CallOptions | null, callback: grpc.requestCallback<google_protobuf_empty_pb.Empty>): grpc.ClientUnaryCall;
  executeLambda(argument: api_container_service_pb.ExecuteLambdaArgs, callback: grpc.requestCallback<api_container_service_pb.ExecuteLambdaResponse>): grpc.ClientUnaryCall;
  executeLambda(argument: api_container_service_pb.ExecuteLambdaArgs, metadataOrOptions: grpc.Metadata | grpc.CallOptions | null, callback: grpc.requestCallback<api_container_service_pb.ExecuteLambdaResponse>): grpc.ClientUnaryCall;
  executeLambda(argument: api_container_service_pb.ExecuteLambdaArgs, metadata: grpc.Metadata | null, options: grpc.CallOptions | null, callback: grpc.requestCallback<api_container_service_pb.ExecuteLambdaResponse>): grpc.ClientUnaryCall;
  getLambdaInfo(argument: api_container_service_pb.GetLambdaInfoArgs, callback: grpc.requestCallback<api_container_service_pb.GetLambdaInfoResponse>): grpc.ClientUnaryCall;
  getLambdaInfo(argument: api_container_service_pb.GetLambdaInfoArgs, metadataOrOptions: grpc.Metadata | grpc.CallOptions | null, callback: grpc.requestCallback<api_container_service_pb.GetLambdaInfoResponse>): grpc.ClientUnaryCall;
  getLambdaInfo(argument: api_container_service_pb.GetLambdaInfoArgs, metadata: grpc.Metadata | null, options: grpc.CallOptions | null, callback: grpc.requestCallback<api_container_service_pb.GetLambdaInfoResponse>): grpc.ClientUnaryCall;
  registerStaticFiles(argument: api_container_service_pb.RegisterStaticFilesArgs, callback: grpc.requestCallback<api_container_service_pb.RegisterStaticFilesResponse>): grpc.ClientUnaryCall;
  registerStaticFiles(argument: api_container_service_pb.RegisterStaticFilesArgs, metadataOrOptions: grpc.Metadata | grpc.CallOptions | null, callback: grpc.requestCallback<api_container_service_pb.RegisterStaticFilesResponse>): grpc.ClientUnaryCall;
  registerStaticFiles(argument: api_container_service_pb.RegisterStaticFilesArgs, metadata: grpc.Metadata | null, options: grpc.CallOptions | null, callback: grpc.requestCallback<api_container_service_pb.RegisterStaticFilesResponse>): grpc.ClientUnaryCall;
  registerFilesArtifacts(argument: api_container_service_pb.RegisterFilesArtifactsArgs, callback: grpc.requestCallback<google_protobuf_empty_pb.Empty>): grpc.ClientUnaryCall;
  registerFilesArtifacts(argument: api_container_service_pb.RegisterFilesArtifactsArgs, metadataOrOptions: grpc.Metadata | grpc.CallOptions | null, callback: grpc.requestCallback<google_protobuf_empty_pb.Empty>): grpc.ClientUnaryCall;
  registerFilesArtifacts(argument: api_container_service_pb.RegisterFilesArtifactsArgs, metadata: grpc.Metadata | null, options: grpc.CallOptions | null, callback: grpc.requestCallback<google_protobuf_empty_pb.Empty>): grpc.ClientUnaryCall;
  registerService(argument: api_container_service_pb.RegisterServiceArgs, callback: grpc.requestCallback<api_container_service_pb.RegisterServiceResponse>): grpc.ClientUnaryCall;
  registerService(argument: api_container_service_pb.RegisterServiceArgs, metadataOrOptions: grpc.Metadata | grpc.CallOptions | null, callback: grpc.requestCallback<api_container_service_pb.RegisterServiceResponse>): grpc.ClientUnaryCall;
  registerService(argument: api_container_service_pb.RegisterServiceArgs, metadata: grpc.Metadata | null, options: grpc.CallOptions | null, callback: grpc.requestCallback<api_container_service_pb.RegisterServiceResponse>): grpc.ClientUnaryCall;
  generateFiles(argument: api_container_service_pb.GenerateFilesArgs, callback: grpc.requestCallback<api_container_service_pb.GenerateFilesResponse>): grpc.ClientUnaryCall;
  generateFiles(argument: api_container_service_pb.GenerateFilesArgs, metadataOrOptions: grpc.Metadata | grpc.CallOptions | null, callback: grpc.requestCallback<api_container_service_pb.GenerateFilesResponse>): grpc.ClientUnaryCall;
  generateFiles(argument: api_container_service_pb.GenerateFilesArgs, metadata: grpc.Metadata | null, options: grpc.CallOptions | null, callback: grpc.requestCallback<api_container_service_pb.GenerateFilesResponse>): grpc.ClientUnaryCall;
  loadStaticFiles(argument: api_container_service_pb.LoadStaticFilesArgs, callback: grpc.requestCallback<api_container_service_pb.LoadStaticFilesResponse>): grpc.ClientUnaryCall;
  loadStaticFiles(argument: api_container_service_pb.LoadStaticFilesArgs, metadataOrOptions: grpc.Metadata | grpc.CallOptions | null, callback: grpc.requestCallback<api_container_service_pb.LoadStaticFilesResponse>): grpc.ClientUnaryCall;
  loadStaticFiles(argument: api_container_service_pb.LoadStaticFilesArgs, metadata: grpc.Metadata | null, options: grpc.CallOptions | null, callback: grpc.requestCallback<api_container_service_pb.LoadStaticFilesResponse>): grpc.ClientUnaryCall;
  startService(argument: api_container_service_pb.StartServiceArgs, callback: grpc.requestCallback<api_container_service_pb.StartServiceResponse>): grpc.ClientUnaryCall;
  startService(argument: api_container_service_pb.StartServiceArgs, metadataOrOptions: grpc.Metadata | grpc.CallOptions | null, callback: grpc.requestCallback<api_container_service_pb.StartServiceResponse>): grpc.ClientUnaryCall;
  startService(argument: api_container_service_pb.StartServiceArgs, metadata: grpc.Metadata | null, options: grpc.CallOptions | null, callback: grpc.requestCallback<api_container_service_pb.StartServiceResponse>): grpc.ClientUnaryCall;
  getServiceInfo(argument: api_container_service_pb.GetServiceInfoArgs, callback: grpc.requestCallback<api_container_service_pb.GetServiceInfoResponse>): grpc.ClientUnaryCall;
  getServiceInfo(argument: api_container_service_pb.GetServiceInfoArgs, metadataOrOptions: grpc.Metadata | grpc.CallOptions | null, callback: grpc.requestCallback<api_container_service_pb.GetServiceInfoResponse>): grpc.ClientUnaryCall;
  getServiceInfo(argument: api_container_service_pb.GetServiceInfoArgs, metadata: grpc.Metadata | null, options: grpc.CallOptions | null, callback: grpc.requestCallback<api_container_service_pb.GetServiceInfoResponse>): grpc.ClientUnaryCall;
  removeService(argument: api_container_service_pb.RemoveServiceArgs, callback: grpc.requestCallback<google_protobuf_empty_pb.Empty>): grpc.ClientUnaryCall;
  removeService(argument: api_container_service_pb.RemoveServiceArgs, metadataOrOptions: grpc.Metadata | grpc.CallOptions | null, callback: grpc.requestCallback<google_protobuf_empty_pb.Empty>): grpc.ClientUnaryCall;
  removeService(argument: api_container_service_pb.RemoveServiceArgs, metadata: grpc.Metadata | null, options: grpc.CallOptions | null, callback: grpc.requestCallback<google_protobuf_empty_pb.Empty>): grpc.ClientUnaryCall;
  repartition(argument: api_container_service_pb.RepartitionArgs, callback: grpc.requestCallback<google_protobuf_empty_pb.Empty>): grpc.ClientUnaryCall;
  repartition(argument: api_container_service_pb.RepartitionArgs, metadataOrOptions: grpc.Metadata | grpc.CallOptions | null, callback: grpc.requestCallback<google_protobuf_empty_pb.Empty>): grpc.ClientUnaryCall;
  repartition(argument: api_container_service_pb.RepartitionArgs, metadata: grpc.Metadata | null, options: grpc.CallOptions | null, callback: grpc.requestCallback<google_protobuf_empty_pb.Empty>): grpc.ClientUnaryCall;
  execCommand(argument: api_container_service_pb.ExecCommandArgs, callback: grpc.requestCallback<api_container_service_pb.ExecCommandResponse>): grpc.ClientUnaryCall;
  execCommand(argument: api_container_service_pb.ExecCommandArgs, metadataOrOptions: grpc.Metadata | grpc.CallOptions | null, callback: grpc.requestCallback<api_container_service_pb.ExecCommandResponse>): grpc.ClientUnaryCall;
  execCommand(argument: api_container_service_pb.ExecCommandArgs, metadata: grpc.Metadata | null, options: grpc.CallOptions | null, callback: grpc.requestCallback<api_container_service_pb.ExecCommandResponse>): grpc.ClientUnaryCall;
  waitForHttpGetEndpointAvailability(argument: api_container_service_pb.WaitForHttpGetEndpointAvailabilityArgs, callback: grpc.requestCallback<google_protobuf_empty_pb.Empty>): grpc.ClientUnaryCall;
  waitForHttpGetEndpointAvailability(argument: api_container_service_pb.WaitForHttpGetEndpointAvailabilityArgs, metadataOrOptions: grpc.Metadata | grpc.CallOptions | null, callback: grpc.requestCallback<google_protobuf_empty_pb.Empty>): grpc.ClientUnaryCall;
  waitForHttpGetEndpointAvailability(argument: api_container_service_pb.WaitForHttpGetEndpointAvailabilityArgs, metadata: grpc.Metadata | null, options: grpc.CallOptions | null, callback: grpc.requestCallback<google_protobuf_empty_pb.Empty>): grpc.ClientUnaryCall;
  waitForHttpPostEndpointAvailability(argument: api_container_service_pb.WaitForHttpPostEndpointAvailabilityArgs, callback: grpc.requestCallback<google_protobuf_empty_pb.Empty>): grpc.ClientUnaryCall;
  waitForHttpPostEndpointAvailability(argument: api_container_service_pb.WaitForHttpPostEndpointAvailabilityArgs, metadataOrOptions: grpc.Metadata | grpc.CallOptions | null, callback: grpc.requestCallback<google_protobuf_empty_pb.Empty>): grpc.ClientUnaryCall;
  waitForHttpPostEndpointAvailability(argument: api_container_service_pb.WaitForHttpPostEndpointAvailabilityArgs, metadata: grpc.Metadata | null, options: grpc.CallOptions | null, callback: grpc.requestCallback<google_protobuf_empty_pb.Empty>): grpc.ClientUnaryCall;
  executeBulkCommands(argument: api_container_service_pb.ExecuteBulkCommandsArgs, callback: grpc.requestCallback<google_protobuf_empty_pb.Empty>): grpc.ClientUnaryCall;
  executeBulkCommands(argument: api_container_service_pb.ExecuteBulkCommandsArgs, metadataOrOptions: grpc.Metadata | grpc.CallOptions | null, callback: grpc.requestCallback<google_protobuf_empty_pb.Empty>): grpc.ClientUnaryCall;
  executeBulkCommands(argument: api_container_service_pb.ExecuteBulkCommandsArgs, metadata: grpc.Metadata | null, options: grpc.CallOptions | null, callback: grpc.requestCallback<google_protobuf_empty_pb.Empty>): grpc.ClientUnaryCall;
}
