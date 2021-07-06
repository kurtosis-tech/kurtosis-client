// GENERATED CODE -- DO NOT EDIT!

// package: api_container_api
// file: api_container_service.proto

import * as api_container_service_pb from "./api_container_service_pb";
import * as google_protobuf_empty_pb from "google-protobuf/google/protobuf/empty_pb";
import * as grpc from "grpc";

interface IApiContainerServiceService extends grpc.ServiceDefinition<grpc.UntypedServiceImplementation> {
  registerService: grpc.MethodDefinition<api_container_service_pb.RegisterServiceArgs, api_container_service_pb.RegisterServiceResponse>;
  generateFiles: grpc.MethodDefinition<api_container_service_pb.GenerateFilesArgs, api_container_service_pb.GenerateFilesResponse>;
  registerStaticFiles: grpc.MethodDefinition<api_container_service_pb.RegisterStaticFilesArgs, api_container_service_pb.RegisterStaticFilesResponse>;
  loadStaticFiles: grpc.MethodDefinition<api_container_service_pb.LoadStaticFilesArgs, api_container_service_pb.LoadStaticFilesArgs>;
  startService: grpc.MethodDefinition<api_container_service_pb.StartServiceArgs, api_container_service_pb.StartServiceResponse>;
  removeService: grpc.MethodDefinition<api_container_service_pb.RemoveServiceArgs, google_protobuf_empty_pb.Empty>;
  repartition: grpc.MethodDefinition<api_container_service_pb.RepartitionArgs, google_protobuf_empty_pb.Empty>;
  execCommand: grpc.MethodDefinition<api_container_service_pb.ExecCommandArgs, api_container_service_pb.ExecCommandResponse>;
  waitForEndpointAvailability: grpc.MethodDefinition<api_container_service_pb.WaitForEndpointAvailabilityArgs, google_protobuf_empty_pb.Empty>;
  executeBulkCommands: grpc.MethodDefinition<api_container_service_pb.ExecuteBulkCommandsArgs, google_protobuf_empty_pb.Empty>;
}

export const ApiContainerServiceService: IApiContainerServiceService;

export interface IApiContainerServiceServer extends grpc.UntypedServiceImplementation {
  registerService: grpc.handleUnaryCall<api_container_service_pb.RegisterServiceArgs, api_container_service_pb.RegisterServiceResponse>;
  generateFiles: grpc.handleUnaryCall<api_container_service_pb.GenerateFilesArgs, api_container_service_pb.GenerateFilesResponse>;
  registerStaticFiles: grpc.handleUnaryCall<api_container_service_pb.RegisterStaticFilesArgs, api_container_service_pb.RegisterStaticFilesResponse>;
  loadStaticFiles: grpc.handleUnaryCall<api_container_service_pb.LoadStaticFilesArgs, api_container_service_pb.LoadStaticFilesArgs>;
  startService: grpc.handleUnaryCall<api_container_service_pb.StartServiceArgs, api_container_service_pb.StartServiceResponse>;
  removeService: grpc.handleUnaryCall<api_container_service_pb.RemoveServiceArgs, google_protobuf_empty_pb.Empty>;
  repartition: grpc.handleUnaryCall<api_container_service_pb.RepartitionArgs, google_protobuf_empty_pb.Empty>;
  execCommand: grpc.handleUnaryCall<api_container_service_pb.ExecCommandArgs, api_container_service_pb.ExecCommandResponse>;
  waitForEndpointAvailability: grpc.handleUnaryCall<api_container_service_pb.WaitForEndpointAvailabilityArgs, google_protobuf_empty_pb.Empty>;
  executeBulkCommands: grpc.handleUnaryCall<api_container_service_pb.ExecuteBulkCommandsArgs, google_protobuf_empty_pb.Empty>;
}

export class ApiContainerServiceClient extends grpc.Client {
  constructor(address: string, credentials: grpc.ChannelCredentials, options?: object);
  registerService(argument: api_container_service_pb.RegisterServiceArgs, callback: grpc.requestCallback<api_container_service_pb.RegisterServiceResponse>): grpc.ClientUnaryCall;
  registerService(argument: api_container_service_pb.RegisterServiceArgs, metadataOrOptions: grpc.Metadata | grpc.CallOptions | null, callback: grpc.requestCallback<api_container_service_pb.RegisterServiceResponse>): grpc.ClientUnaryCall;
  registerService(argument: api_container_service_pb.RegisterServiceArgs, metadata: grpc.Metadata | null, options: grpc.CallOptions | null, callback: grpc.requestCallback<api_container_service_pb.RegisterServiceResponse>): grpc.ClientUnaryCall;
  generateFiles(argument: api_container_service_pb.GenerateFilesArgs, callback: grpc.requestCallback<api_container_service_pb.GenerateFilesResponse>): grpc.ClientUnaryCall;
  generateFiles(argument: api_container_service_pb.GenerateFilesArgs, metadataOrOptions: grpc.Metadata | grpc.CallOptions | null, callback: grpc.requestCallback<api_container_service_pb.GenerateFilesResponse>): grpc.ClientUnaryCall;
  generateFiles(argument: api_container_service_pb.GenerateFilesArgs, metadata: grpc.Metadata | null, options: grpc.CallOptions | null, callback: grpc.requestCallback<api_container_service_pb.GenerateFilesResponse>): grpc.ClientUnaryCall;
  registerStaticFiles(argument: api_container_service_pb.RegisterStaticFilesArgs, callback: grpc.requestCallback<api_container_service_pb.RegisterStaticFilesResponse>): grpc.ClientUnaryCall;
  registerStaticFiles(argument: api_container_service_pb.RegisterStaticFilesArgs, metadataOrOptions: grpc.Metadata | grpc.CallOptions | null, callback: grpc.requestCallback<api_container_service_pb.RegisterStaticFilesResponse>): grpc.ClientUnaryCall;
  registerStaticFiles(argument: api_container_service_pb.RegisterStaticFilesArgs, metadata: grpc.Metadata | null, options: grpc.CallOptions | null, callback: grpc.requestCallback<api_container_service_pb.RegisterStaticFilesResponse>): grpc.ClientUnaryCall;
  loadStaticFiles(argument: api_container_service_pb.LoadStaticFilesArgs, callback: grpc.requestCallback<api_container_service_pb.LoadStaticFilesArgs>): grpc.ClientUnaryCall;
  loadStaticFiles(argument: api_container_service_pb.LoadStaticFilesArgs, metadataOrOptions: grpc.Metadata | grpc.CallOptions | null, callback: grpc.requestCallback<api_container_service_pb.LoadStaticFilesArgs>): grpc.ClientUnaryCall;
  loadStaticFiles(argument: api_container_service_pb.LoadStaticFilesArgs, metadata: grpc.Metadata | null, options: grpc.CallOptions | null, callback: grpc.requestCallback<api_container_service_pb.LoadStaticFilesArgs>): grpc.ClientUnaryCall;
  startService(argument: api_container_service_pb.StartServiceArgs, callback: grpc.requestCallback<api_container_service_pb.StartServiceResponse>): grpc.ClientUnaryCall;
  startService(argument: api_container_service_pb.StartServiceArgs, metadataOrOptions: grpc.Metadata | grpc.CallOptions | null, callback: grpc.requestCallback<api_container_service_pb.StartServiceResponse>): grpc.ClientUnaryCall;
  startService(argument: api_container_service_pb.StartServiceArgs, metadata: grpc.Metadata | null, options: grpc.CallOptions | null, callback: grpc.requestCallback<api_container_service_pb.StartServiceResponse>): grpc.ClientUnaryCall;
  removeService(argument: api_container_service_pb.RemoveServiceArgs, callback: grpc.requestCallback<google_protobuf_empty_pb.Empty>): grpc.ClientUnaryCall;
  removeService(argument: api_container_service_pb.RemoveServiceArgs, metadataOrOptions: grpc.Metadata | grpc.CallOptions | null, callback: grpc.requestCallback<google_protobuf_empty_pb.Empty>): grpc.ClientUnaryCall;
  removeService(argument: api_container_service_pb.RemoveServiceArgs, metadata: grpc.Metadata | null, options: grpc.CallOptions | null, callback: grpc.requestCallback<google_protobuf_empty_pb.Empty>): grpc.ClientUnaryCall;
  repartition(argument: api_container_service_pb.RepartitionArgs, callback: grpc.requestCallback<google_protobuf_empty_pb.Empty>): grpc.ClientUnaryCall;
  repartition(argument: api_container_service_pb.RepartitionArgs, metadataOrOptions: grpc.Metadata | grpc.CallOptions | null, callback: grpc.requestCallback<google_protobuf_empty_pb.Empty>): grpc.ClientUnaryCall;
  repartition(argument: api_container_service_pb.RepartitionArgs, metadata: grpc.Metadata | null, options: grpc.CallOptions | null, callback: grpc.requestCallback<google_protobuf_empty_pb.Empty>): grpc.ClientUnaryCall;
  execCommand(argument: api_container_service_pb.ExecCommandArgs, callback: grpc.requestCallback<api_container_service_pb.ExecCommandResponse>): grpc.ClientUnaryCall;
  execCommand(argument: api_container_service_pb.ExecCommandArgs, metadataOrOptions: grpc.Metadata | grpc.CallOptions | null, callback: grpc.requestCallback<api_container_service_pb.ExecCommandResponse>): grpc.ClientUnaryCall;
  execCommand(argument: api_container_service_pb.ExecCommandArgs, metadata: grpc.Metadata | null, options: grpc.CallOptions | null, callback: grpc.requestCallback<api_container_service_pb.ExecCommandResponse>): grpc.ClientUnaryCall;
  waitForEndpointAvailability(argument: api_container_service_pb.WaitForEndpointAvailabilityArgs, callback: grpc.requestCallback<google_protobuf_empty_pb.Empty>): grpc.ClientUnaryCall;
  waitForEndpointAvailability(argument: api_container_service_pb.WaitForEndpointAvailabilityArgs, metadataOrOptions: grpc.Metadata | grpc.CallOptions | null, callback: grpc.requestCallback<google_protobuf_empty_pb.Empty>): grpc.ClientUnaryCall;
  waitForEndpointAvailability(argument: api_container_service_pb.WaitForEndpointAvailabilityArgs, metadata: grpc.Metadata | null, options: grpc.CallOptions | null, callback: grpc.requestCallback<google_protobuf_empty_pb.Empty>): grpc.ClientUnaryCall;
  executeBulkCommands(argument: api_container_service_pb.ExecuteBulkCommandsArgs, callback: grpc.requestCallback<google_protobuf_empty_pb.Empty>): grpc.ClientUnaryCall;
  executeBulkCommands(argument: api_container_service_pb.ExecuteBulkCommandsArgs, metadataOrOptions: grpc.Metadata | grpc.CallOptions | null, callback: grpc.requestCallback<google_protobuf_empty_pb.Empty>): grpc.ClientUnaryCall;
  executeBulkCommands(argument: api_container_service_pb.ExecuteBulkCommandsArgs, metadata: grpc.Metadata | null, options: grpc.CallOptions | null, callback: grpc.requestCallback<google_protobuf_empty_pb.Empty>): grpc.ClientUnaryCall;
}
