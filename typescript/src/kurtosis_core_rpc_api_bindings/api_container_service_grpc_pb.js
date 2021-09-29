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

function serialize_api_container_api_FinishExternalContainerRegistrationArgs(arg) {
  if (!(arg instanceof api_container_service_pb.FinishExternalContainerRegistrationArgs)) {
    throw new Error('Expected argument of type api_container_api.FinishExternalContainerRegistrationArgs');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_api_container_api_FinishExternalContainerRegistrationArgs(buffer_arg) {
  return api_container_service_pb.FinishExternalContainerRegistrationArgs.deserializeBinary(new Uint8Array(buffer_arg));
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

function serialize_api_container_api_GetLambdasResponse(arg) {
  if (!(arg instanceof api_container_service_pb.GetLambdasResponse)) {
    throw new Error('Expected argument of type api_container_api.GetLambdasResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_api_container_api_GetLambdasResponse(buffer_arg) {
  return api_container_service_pb.GetLambdasResponse.deserializeBinary(new Uint8Array(buffer_arg));
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

function serialize_api_container_api_GetServicesResponse(arg) {
  if (!(arg instanceof api_container_service_pb.GetServicesResponse)) {
    throw new Error('Expected argument of type api_container_api.GetServicesResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_api_container_api_GetServicesResponse(buffer_arg) {
  return api_container_service_pb.GetServicesResponse.deserializeBinary(new Uint8Array(buffer_arg));
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

function serialize_api_container_api_StartExternalContainerRegistrationResponse(arg) {
  if (!(arg instanceof api_container_service_pb.StartExternalContainerRegistrationResponse)) {
    throw new Error('Expected argument of type api_container_api.StartExternalContainerRegistrationResponse');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_api_container_api_StartExternalContainerRegistrationResponse(buffer_arg) {
  return api_container_service_pb.StartExternalContainerRegistrationResponse.deserializeBinary(new Uint8Array(buffer_arg));
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

function serialize_api_container_api_WaitForHttpGetEndpointAvailabilityArgs(arg) {
  if (!(arg instanceof api_container_service_pb.WaitForHttpGetEndpointAvailabilityArgs)) {
    throw new Error('Expected argument of type api_container_api.WaitForHttpGetEndpointAvailabilityArgs');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_api_container_api_WaitForHttpGetEndpointAvailabilityArgs(buffer_arg) {
  return api_container_service_pb.WaitForHttpGetEndpointAvailabilityArgs.deserializeBinary(new Uint8Array(buffer_arg));
}

function serialize_api_container_api_WaitForHttpPostEndpointAvailabilityArgs(arg) {
  if (!(arg instanceof api_container_service_pb.WaitForHttpPostEndpointAvailabilityArgs)) {
    throw new Error('Expected argument of type api_container_api.WaitForHttpPostEndpointAvailabilityArgs');
  }
  return Buffer.from(arg.serializeBinary());
}

function deserialize_api_container_api_WaitForHttpPostEndpointAvailabilityArgs(buffer_arg) {
  return api_container_service_pb.WaitForHttpPostEndpointAvailabilityArgs.deserializeBinary(new Uint8Array(buffer_arg));
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
  // Starts the registration of an external container (started by a third-party source, not the API container)
startExternalContainerRegistration: {
    path: '/api_container_api.ApiContainerService/StartExternalContainerRegistration',
    requestStream: false,
    responseStream: false,
    requestType: google_protobuf_empty_pb.Empty,
    responseType: api_container_service_pb.StartExternalContainerRegistrationResponse,
    requestSerialize: serialize_google_protobuf_Empty,
    requestDeserialize: deserialize_google_protobuf_Empty,
    responseSerialize: serialize_api_container_api_StartExternalContainerRegistrationResponse,
    responseDeserialize: deserialize_api_container_api_StartExternalContainerRegistrationResponse,
  },
  // Finishes the registration of an container (started by a third-party source, not the API contianer) that was started previously
// NOTE: It's important not to forget to finish this registration, else the external container won't be recognized by the API container!
finishExternalContainerRegistration: {
    path: '/api_container_api.ApiContainerService/FinishExternalContainerRegistration',
    requestStream: false,
    responseStream: false,
    requestType: api_container_service_pb.FinishExternalContainerRegistrationArgs,
    responseType: google_protobuf_empty_pb.Empty,
    requestSerialize: serialize_api_container_api_FinishExternalContainerRegistrationArgs,
    requestDeserialize: deserialize_api_container_api_FinishExternalContainerRegistrationArgs,
    responseSerialize: serialize_google_protobuf_Empty,
    responseDeserialize: deserialize_google_protobuf_Empty,
  },
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
  // Block until the given HTTP endpoint returns available, calling it through a HTTP Get request
waitForHttpGetEndpointAvailability: {
    path: '/api_container_api.ApiContainerService/WaitForHttpGetEndpointAvailability',
    requestStream: false,
    responseStream: false,
    requestType: api_container_service_pb.WaitForHttpGetEndpointAvailabilityArgs,
    responseType: google_protobuf_empty_pb.Empty,
    requestSerialize: serialize_api_container_api_WaitForHttpGetEndpointAvailabilityArgs,
    requestDeserialize: deserialize_api_container_api_WaitForHttpGetEndpointAvailabilityArgs,
    responseSerialize: serialize_google_protobuf_Empty,
    responseDeserialize: deserialize_google_protobuf_Empty,
  },
  // Block until the given HTTP endpoint returns available, calling it through a HTTP Post request
waitForHttpPostEndpointAvailability: {
    path: '/api_container_api.ApiContainerService/WaitForHttpPostEndpointAvailability',
    requestStream: false,
    responseStream: false,
    requestType: api_container_service_pb.WaitForHttpPostEndpointAvailabilityArgs,
    responseType: google_protobuf_empty_pb.Empty,
    requestSerialize: serialize_api_container_api_WaitForHttpPostEndpointAvailabilityArgs,
    requestDeserialize: deserialize_api_container_api_WaitForHttpPostEndpointAvailabilityArgs,
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
  // Returns the IDs of the current services in the test network
getServices: {
    path: '/api_container_api.ApiContainerService/GetServices',
    requestStream: false,
    responseStream: false,
    requestType: google_protobuf_empty_pb.Empty,
    responseType: api_container_service_pb.GetServicesResponse,
    requestSerialize: serialize_google_protobuf_Empty,
    requestDeserialize: deserialize_google_protobuf_Empty,
    responseSerialize: serialize_api_container_api_GetServicesResponse,
    responseDeserialize: deserialize_api_container_api_GetServicesResponse,
  },
  // Returns the IDs of the Kurtosis Lambdas that have been loaded into the test network.
getLambdas: {
    path: '/api_container_api.ApiContainerService/GetLambdas',
    requestStream: false,
    responseStream: false,
    requestType: google_protobuf_empty_pb.Empty,
    responseType: api_container_service_pb.GetLambdasResponse,
    requestSerialize: serialize_google_protobuf_Empty,
    requestDeserialize: deserialize_google_protobuf_Empty,
    responseSerialize: serialize_api_container_api_GetLambdasResponse,
    responseDeserialize: deserialize_api_container_api_GetLambdasResponse,
  },
};

exports.ApiContainerServiceClient = grpc.makeGenericClientConstructor(ApiContainerServiceService);
