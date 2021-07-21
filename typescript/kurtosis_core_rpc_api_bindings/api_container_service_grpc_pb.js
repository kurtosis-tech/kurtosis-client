// GENERATED CODE -- DO NOT EDIT!

'use strict';
var grpc = require('grpc');
var api_container_service_pb = require('./api_container_service_pb.js');
var google_protobuf_empty_pb = require('google-protobuf/google/protobuf/empty_pb.js');

function serialize_api_container_api_ExecCommandArgs(arg) {
  if (!(arg instanceof api_container_service_pb.ExecCommandArgs)) {
    throw new Error('Expected argument of type api_container_api.ExecCommandArgs');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_api_container_api_ExecCommandArgs(buffer_arg) {
  return api_container_service_pb.ExecCommandArgs.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_api_container_api_ExecCommandResponse(arg) {
  if (!(arg instanceof api_container_service_pb.ExecCommandResponse)) {
    throw new Error('Expected argument of type api_container_api.ExecCommandResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_api_container_api_ExecCommandResponse(buffer_arg) {
  return api_container_service_pb.ExecCommandResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_api_container_api_ExecuteBulkCommandsArgs(arg) {
  if (!(arg instanceof api_container_service_pb.ExecuteBulkCommandsArgs)) {
    throw new Error('Expected argument of type api_container_api.ExecuteBulkCommandsArgs');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_api_container_api_ExecuteBulkCommandsArgs(buffer_arg) {
  return api_container_service_pb.ExecuteBulkCommandsArgs.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_api_container_api_ExecuteLambdaArgs(arg) {
  if (!(arg instanceof api_container_service_pb.ExecuteLambdaArgs)) {
    throw new Error('Expected argument of type api_container_api.ExecuteLambdaArgs');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_api_container_api_ExecuteLambdaArgs(buffer_arg) {
  return api_container_service_pb.ExecuteLambdaArgs.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_api_container_api_ExecuteLambdaResponse(arg) {
  if (!(arg instanceof api_container_service_pb.ExecuteLambdaResponse)) {
    throw new Error('Expected argument of type api_container_api.ExecuteLambdaResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_api_container_api_ExecuteLambdaResponse(buffer_arg) {
  return api_container_service_pb.ExecuteLambdaResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_api_container_api_GenerateFilesArgs(arg) {
  if (!(arg instanceof api_container_service_pb.GenerateFilesArgs)) {
    throw new Error('Expected argument of type api_container_api.GenerateFilesArgs');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_api_container_api_GenerateFilesArgs(buffer_arg) {
  return api_container_service_pb.GenerateFilesArgs.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_api_container_api_GenerateFilesResponse(arg) {
  if (!(arg instanceof api_container_service_pb.GenerateFilesResponse)) {
    throw new Error('Expected argument of type api_container_api.GenerateFilesResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_api_container_api_GenerateFilesResponse(buffer_arg) {
  return api_container_service_pb.GenerateFilesResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_api_container_api_GetLambdaInfoArgs(arg) {
  if (!(arg instanceof api_container_service_pb.GetLambdaInfoArgs)) {
    throw new Error('Expected argument of type api_container_api.GetLambdaInfoArgs');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_api_container_api_GetLambdaInfoArgs(buffer_arg) {
  return api_container_service_pb.GetLambdaInfoArgs.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_api_container_api_GetLambdaInfoResponse(arg) {
  if (!(arg instanceof api_container_service_pb.GetLambdaInfoResponse)) {
    throw new Error('Expected argument of type api_container_api.GetLambdaInfoResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_api_container_api_GetLambdaInfoResponse(buffer_arg) {
  return api_container_service_pb.GetLambdaInfoResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_api_container_api_GetServiceInfoArgs(arg) {
  if (!(arg instanceof api_container_service_pb.GetServiceInfoArgs)) {
    throw new Error('Expected argument of type api_container_api.GetServiceInfoArgs');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_api_container_api_GetServiceInfoArgs(buffer_arg) {
  return api_container_service_pb.GetServiceInfoArgs.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_api_container_api_GetServiceInfoResponse(arg) {
  if (!(arg instanceof api_container_service_pb.GetServiceInfoResponse)) {
    throw new Error('Expected argument of type api_container_api.GetServiceInfoResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_api_container_api_GetServiceInfoResponse(buffer_arg) {
  return api_container_service_pb.GetServiceInfoResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_api_container_api_LoadLambdaArgs(arg) {
  if (!(arg instanceof api_container_service_pb.LoadLambdaArgs)) {
    throw new Error('Expected argument of type api_container_api.LoadLambdaArgs');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_api_container_api_LoadLambdaArgs(buffer_arg) {
  return api_container_service_pb.LoadLambdaArgs.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_api_container_api_LoadStaticFilesArgs(arg) {
  if (!(arg instanceof api_container_service_pb.LoadStaticFilesArgs)) {
    throw new Error('Expected argument of type api_container_api.LoadStaticFilesArgs');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_api_container_api_LoadStaticFilesArgs(buffer_arg) {
  return api_container_service_pb.LoadStaticFilesArgs.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_api_container_api_LoadStaticFilesResponse(arg) {
  if (!(arg instanceof api_container_service_pb.LoadStaticFilesResponse)) {
    throw new Error('Expected argument of type api_container_api.LoadStaticFilesResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_api_container_api_LoadStaticFilesResponse(buffer_arg) {
  return api_container_service_pb.LoadStaticFilesResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_api_container_api_RegisterFilesArtifactsArgs(arg) {
  if (!(arg instanceof api_container_service_pb.RegisterFilesArtifactsArgs)) {
    throw new Error('Expected argument of type api_container_api.RegisterFilesArtifactsArgs');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_api_container_api_RegisterFilesArtifactsArgs(buffer_arg) {
  return api_container_service_pb.RegisterFilesArtifactsArgs.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_api_container_api_RegisterServiceArgs(arg) {
  if (!(arg instanceof api_container_service_pb.RegisterServiceArgs)) {
    throw new Error('Expected argument of type api_container_api.RegisterServiceArgs');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_api_container_api_RegisterServiceArgs(buffer_arg) {
  return api_container_service_pb.RegisterServiceArgs.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_api_container_api_RegisterServiceResponse(arg) {
  if (!(arg instanceof api_container_service_pb.RegisterServiceResponse)) {
    throw new Error('Expected argument of type api_container_api.RegisterServiceResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_api_container_api_RegisterServiceResponse(buffer_arg) {
  return api_container_service_pb.RegisterServiceResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_api_container_api_RegisterStaticFilesArgs(arg) {
  if (!(arg instanceof api_container_service_pb.RegisterStaticFilesArgs)) {
    throw new Error('Expected argument of type api_container_api.RegisterStaticFilesArgs');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_api_container_api_RegisterStaticFilesArgs(buffer_arg) {
  return api_container_service_pb.RegisterStaticFilesArgs.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_api_container_api_RegisterStaticFilesResponse(arg) {
  if (!(arg instanceof api_container_service_pb.RegisterStaticFilesResponse)) {
    throw new Error('Expected argument of type api_container_api.RegisterStaticFilesResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_api_container_api_RegisterStaticFilesResponse(buffer_arg) {
  return api_container_service_pb.RegisterStaticFilesResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_api_container_api_RemoveServiceArgs(arg) {
  if (!(arg instanceof api_container_service_pb.RemoveServiceArgs)) {
    throw new Error('Expected argument of type api_container_api.RemoveServiceArgs');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_api_container_api_RemoveServiceArgs(buffer_arg) {
  return api_container_service_pb.RemoveServiceArgs.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_api_container_api_RepartitionArgs(arg) {
  if (!(arg instanceof api_container_service_pb.RepartitionArgs)) {
    throw new Error('Expected argument of type api_container_api.RepartitionArgs');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_api_container_api_RepartitionArgs(buffer_arg) {
  return api_container_service_pb.RepartitionArgs.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_api_container_api_StartServiceArgs(arg) {
  if (!(arg instanceof api_container_service_pb.StartServiceArgs)) {
    throw new Error('Expected argument of type api_container_api.StartServiceArgs');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_api_container_api_StartServiceArgs(buffer_arg) {
  return api_container_service_pb.StartServiceArgs.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_api_container_api_StartServiceResponse(arg) {
  if (!(arg instanceof api_container_service_pb.StartServiceResponse)) {
    throw new Error('Expected argument of type api_container_api.StartServiceResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_api_container_api_StartServiceResponse(buffer_arg) {
  return api_container_service_pb.StartServiceResponse.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_api_container_api_WaitForEndpointAvailabilityArgs(arg) {
  if (!(arg instanceof api_container_service_pb.WaitForEndpointAvailabilityArgs)) {
    throw new Error('Expected argument of type api_container_api.WaitForEndpointAvailabilityArgs');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_api_container_api_WaitForEndpointAvailabilityArgs(buffer_arg) {
  return api_container_service_pb.WaitForEndpointAvailabilityArgs.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_google_protobuf_Empty(arg) {
  if (!(arg instanceof google_protobuf_empty_pb.Empty)) {
    throw new Error('Expected argument of type google.protobuf.Empty');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_google_protobuf_Empty(buffer_arg) {
  return google_protobuf_empty_pb.Empty.deserializeBinary(new Uint8Array(buffer_arg));
}


var ApiContainerServiceService = exports.ApiContainerServiceService = {
  // Starts a lambda container into the network
loadLambda: {
    path: '/api_container_api.ApiContainerService/LoadLambda',
    requestStream: false,
    responseStream: false,
    requestType: api_container_service_pb.LoadLambdaArgs,
    responseType: google_protobuf_empty_pb.Empty,
    requestSerialize: serialize_api_container_api_LoadLambdaArgs,
    requestDeserialize: deserialize_api_container_api_LoadLambdaArgs,
    responseSerialize: serialize_google_protobuf_Empty,
    responseDeserialize: deserialize_google_protobuf_Empty,
  },
  // Executes a Kurtosis Lambda function on behalf of the user 
executeLambda: {
    path: '/api_container_api.ApiContainerService/ExecuteLambda',
    requestStream: false,
    responseStream: false,
    requestType: api_container_service_pb.ExecuteLambdaArgs,
    responseType: api_container_service_pb.ExecuteLambdaResponse,
    requestSerialize: serialize_api_container_api_ExecuteLambdaArgs,
    requestDeserialize: deserialize_api_container_api_ExecuteLambdaArgs,
    responseSerialize: serialize_api_container_api_ExecuteLambdaResponse,
    responseDeserialize: deserialize_api_container_api_ExecuteLambdaResponse,
  },
  // Gets information about a loaded Lambda module
getLambdaInfo: {
    path: '/api_container_api.ApiContainerService/GetLambdaInfo',
    requestStream: false,
    responseStream: false,
    requestType: api_container_service_pb.GetLambdaInfoArgs,
    responseType: api_container_service_pb.GetLambdaInfoResponse,
    requestSerialize: serialize_api_container_api_GetLambdaInfoArgs,
    requestDeserialize: deserialize_api_container_api_GetLambdaInfoArgs,
    responseSerialize: serialize_api_container_api_GetLambdaInfoResponse,
    responseDeserialize: deserialize_api_container_api_GetLambdaInfoResponse,
  },
  // Tells the API container that the client has static files it would like the API container to know about
// The API container will respond with paths inside the enclave directory where the client should put its files
registerStaticFiles: {
    path: '/api_container_api.ApiContainerService/RegisterStaticFiles',
    requestStream: false,
    responseStream: false,
    requestType: api_container_service_pb.RegisterStaticFilesArgs,
    responseType: api_container_service_pb.RegisterStaticFilesResponse,
    requestSerialize: serialize_api_container_api_RegisterStaticFilesArgs,
    requestDeserialize: deserialize_api_container_api_RegisterStaticFilesArgs,
    responseSerialize: serialize_api_container_api_RegisterStaticFilesResponse,
    responseDeserialize: deserialize_api_container_api_RegisterStaticFilesResponse,
  },
  // Tells the API container that the client has files artifacts from the web that it would like the API container to know about
// The API container will download these artifacts locally, so they're available when launching services
registerFilesArtifacts: {
    path: '/api_container_api.ApiContainerService/RegisterFilesArtifacts',
    requestStream: false,
    responseStream: false,
    requestType: api_container_service_pb.RegisterFilesArtifactsArgs,
    responseType: google_protobuf_empty_pb.Empty,
    requestSerialize: serialize_api_container_api_RegisterFilesArtifactsArgs,
    requestDeserialize: deserialize_api_container_api_RegisterFilesArtifactsArgs,
    responseSerialize: serialize_google_protobuf_Empty,
    responseDeserialize: deserialize_google_protobuf_Empty,
  },
  // Registers a service with the API container but doesn't start the container for it
registerService: {
    path: '/api_container_api.ApiContainerService/RegisterService',
    requestStream: false,
    responseStream: false,
    requestType: api_container_service_pb.RegisterServiceArgs,
    responseType: api_container_service_pb.RegisterServiceResponse,
    requestSerialize: serialize_api_container_api_RegisterServiceArgs,
    requestDeserialize: deserialize_api_container_api_RegisterServiceArgs,
    responseSerialize: serialize_api_container_api_RegisterServiceResponse,
    responseDeserialize: deserialize_api_container_api_RegisterServiceResponse,
  },
  // Generates files inside the test volume on the filesystem for a container
generateFiles: {
    path: '/api_container_api.ApiContainerService/GenerateFiles',
    requestStream: false,
    responseStream: false,
    requestType: api_container_service_pb.GenerateFilesArgs,
    responseType: api_container_service_pb.GenerateFilesResponse,
    requestSerialize: serialize_api_container_api_GenerateFilesArgs,
    requestDeserialize: deserialize_api_container_api_GenerateFilesArgs,
    responseSerialize: serialize_api_container_api_GenerateFilesResponse,
    responseDeserialize: deserialize_api_container_api_GenerateFilesResponse,
  },
  // Copies static files that have been registered with the API container into the file namespace of the given service
loadStaticFiles: {
    path: '/api_container_api.ApiContainerService/LoadStaticFiles',
    requestStream: false,
    responseStream: false,
    requestType: api_container_service_pb.LoadStaticFilesArgs,
    responseType: api_container_service_pb.LoadStaticFilesResponse,
    requestSerialize: serialize_api_container_api_LoadStaticFilesArgs,
    requestDeserialize: deserialize_api_container_api_LoadStaticFilesArgs,
    responseSerialize: serialize_api_container_api_LoadStaticFilesResponse,
    responseDeserialize: deserialize_api_container_api_LoadStaticFilesResponse,
  },
  // Starts a previously-registered service by creating a Docker container for it
startService: {
    path: '/api_container_api.ApiContainerService/StartService',
    requestStream: false,
    responseStream: false,
    requestType: api_container_service_pb.StartServiceArgs,
    responseType: api_container_service_pb.StartServiceResponse,
    requestSerialize: serialize_api_container_api_StartServiceArgs,
    requestDeserialize: deserialize_api_container_api_StartServiceArgs,
    responseSerialize: serialize_api_container_api_StartServiceResponse,
    responseDeserialize: deserialize_api_container_api_StartServiceResponse,
  },
  // Returns relevant information about the service
getServiceInfo: {
    path: '/api_container_api.ApiContainerService/GetServiceInfo',
    requestStream: false,
    responseStream: false,
    requestType: api_container_service_pb.GetServiceInfoArgs,
    responseType: api_container_service_pb.GetServiceInfoResponse,
    requestSerialize: serialize_api_container_api_GetServiceInfoArgs,
    requestDeserialize: deserialize_api_container_api_GetServiceInfoArgs,
    responseSerialize: serialize_api_container_api_GetServiceInfoResponse,
    responseDeserialize: deserialize_api_container_api_GetServiceInfoResponse,
  },
  // Instructs the API container to remove the given service
removeService: {
    path: '/api_container_api.ApiContainerService/RemoveService',
    requestStream: false,
    responseStream: false,
    requestType: api_container_service_pb.RemoveServiceArgs,
    responseType: google_protobuf_empty_pb.Empty,
    requestSerialize: serialize_api_container_api_RemoveServiceArgs,
    requestDeserialize: deserialize_api_container_api_RemoveServiceArgs,
    responseSerialize: serialize_google_protobuf_Empty,
    responseDeserialize: deserialize_google_protobuf_Empty,
  },
  // Instructs the API container to repartition the test network
repartition: {
    path: '/api_container_api.ApiContainerService/Repartition',
    requestStream: false,
    responseStream: false,
    requestType: api_container_service_pb.RepartitionArgs,
    responseType: google_protobuf_empty_pb.Empty,
    requestSerialize: serialize_api_container_api_RepartitionArgs,
    requestDeserialize: deserialize_api_container_api_RepartitionArgs,
    responseSerialize: serialize_google_protobuf_Empty,
    responseDeserialize: deserialize_google_protobuf_Empty,
  },
  // Executes the given command inside a running container
execCommand: {
    path: '/api_container_api.ApiContainerService/ExecCommand',
    requestStream: false,
    responseStream: false,
    requestType: api_container_service_pb.ExecCommandArgs,
    responseType: api_container_service_pb.ExecCommandResponse,
    requestSerialize: serialize_api_container_api_ExecCommandArgs,
    requestDeserialize: deserialize_api_container_api_ExecCommandArgs,
    responseSerialize: serialize_api_container_api_ExecCommandResponse,
    responseDeserialize: deserialize_api_container_api_ExecCommandResponse,
  },
  // Block until the given HTTP endpoint returns available
waitForEndpointAvailability: {
    path: '/api_container_api.ApiContainerService/WaitForEndpointAvailability',
    requestStream: false,
    responseStream: false,
    requestType: api_container_service_pb.WaitForEndpointAvailabilityArgs,
    responseType: google_protobuf_empty_pb.Empty,
    requestSerialize: serialize_api_container_api_WaitForEndpointAvailabilityArgs,
    requestDeserialize: deserialize_api_container_api_WaitForEndpointAvailabilityArgs,
    responseSerialize: serialize_google_protobuf_Empty,
    responseDeserialize: deserialize_google_protobuf_Empty,
  },
  // Executes multiple commands at once
executeBulkCommands: {
    path: '/api_container_api.ApiContainerService/ExecuteBulkCommands',
    requestStream: false,
    responseStream: false,
    requestType: api_container_service_pb.ExecuteBulkCommandsArgs,
    responseType: google_protobuf_empty_pb.Empty,
    requestSerialize: serialize_api_container_api_ExecuteBulkCommandsArgs,
    requestDeserialize: deserialize_api_container_api_ExecuteBulkCommandsArgs,
    responseSerialize: serialize_google_protobuf_Empty,
    responseDeserialize: deserialize_google_protobuf_Empty,
  },
};

exports.ApiContainerServiceClient = grpc.makeGenericClientConstructor(ApiContainerServiceService);
