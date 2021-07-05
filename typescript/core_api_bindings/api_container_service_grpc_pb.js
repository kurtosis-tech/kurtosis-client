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
  // Wait for and endpoint in order to know if a service is available
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
};

exports.ApiContainerServiceClient = grpc.makeGenericClientConstructor(ApiContainerServiceService);
