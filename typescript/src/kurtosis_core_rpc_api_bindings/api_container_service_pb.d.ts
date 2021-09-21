// package: api_container_api
// file: api_container_service.proto

import * as jspb from "google-protobuf";
import * as google_protobuf_empty_pb from "google-protobuf/google/protobuf/empty_pb";

export class LoadLambdaArgs extends jspb.Message {
  getLambdaId(): string;
  setLambdaId(value: string): void;

  getContainerImage(): string;
  setContainerImage(value: string): void;

  getSerializedParams(): string;
  setSerializedParams(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): LoadLambdaArgs.AsObject;
  static toObject(includeInstance: boolean, msg: LoadLambdaArgs): LoadLambdaArgs.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: LoadLambdaArgs, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): LoadLambdaArgs;
  static deserializeBinaryFromReader(message: LoadLambdaArgs, reader: jspb.BinaryReader): LoadLambdaArgs;
}

export namespace LoadLambdaArgs {
  export type AsObject = {
    lambdaId: string,
    containerImage: string,
    serializedParams: string,
  }
}

export class ExecuteLambdaArgs extends jspb.Message {
  getLambdaId(): string;
  setLambdaId(value: string): void;

  getSerializedParams(): string;
  setSerializedParams(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ExecuteLambdaArgs.AsObject;
  static toObject(includeInstance: boolean, msg: ExecuteLambdaArgs): ExecuteLambdaArgs.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: ExecuteLambdaArgs, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ExecuteLambdaArgs;
  static deserializeBinaryFromReader(message: ExecuteLambdaArgs, reader: jspb.BinaryReader): ExecuteLambdaArgs;
}

export namespace ExecuteLambdaArgs {
  export type AsObject = {
    lambdaId: string,
    serializedParams: string,
  }
}

export class ExecuteLambdaResponse extends jspb.Message {
  getSerializedResult(): string;
  setSerializedResult(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ExecuteLambdaResponse.AsObject;
  static toObject(includeInstance: boolean, msg: ExecuteLambdaResponse): ExecuteLambdaResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: ExecuteLambdaResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ExecuteLambdaResponse;
  static deserializeBinaryFromReader(message: ExecuteLambdaResponse, reader: jspb.BinaryReader): ExecuteLambdaResponse;
}

export namespace ExecuteLambdaResponse {
  export type AsObject = {
    serializedResult: string,
  }
}

export class GetLambdaInfoArgs extends jspb.Message {
  getLambdaId(): string;
  setLambdaId(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetLambdaInfoArgs.AsObject;
  static toObject(includeInstance: boolean, msg: GetLambdaInfoArgs): GetLambdaInfoArgs.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: GetLambdaInfoArgs, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetLambdaInfoArgs;
  static deserializeBinaryFromReader(message: GetLambdaInfoArgs, reader: jspb.BinaryReader): GetLambdaInfoArgs;
}

export namespace GetLambdaInfoArgs {
  export type AsObject = {
    lambdaId: string,
  }
}

export class GetLambdaInfoResponse extends jspb.Message {
  getIpAddr(): string;
  setIpAddr(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetLambdaInfoResponse.AsObject;
  static toObject(includeInstance: boolean, msg: GetLambdaInfoResponse): GetLambdaInfoResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: GetLambdaInfoResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetLambdaInfoResponse;
  static deserializeBinaryFromReader(message: GetLambdaInfoResponse, reader: jspb.BinaryReader): GetLambdaInfoResponse;
}

export namespace GetLambdaInfoResponse {
  export type AsObject = {
    ipAddr: string,
  }
}

export class RegisterStaticFilesArgs extends jspb.Message {
  getStaticFilesSetMap(): jspb.Map<string, boolean>;
  clearStaticFilesSetMap(): void;
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): RegisterStaticFilesArgs.AsObject;
  static toObject(includeInstance: boolean, msg: RegisterStaticFilesArgs): RegisterStaticFilesArgs.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: RegisterStaticFilesArgs, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): RegisterStaticFilesArgs;
  static deserializeBinaryFromReader(message: RegisterStaticFilesArgs, reader: jspb.BinaryReader): RegisterStaticFilesArgs;
}

export namespace RegisterStaticFilesArgs {
  export type AsObject = {
    staticFilesSetMap: Array<[string, boolean]>,
  }
}

export class RegisterStaticFilesResponse extends jspb.Message {
  getStaticFileDestRelativeFilepathsMap(): jspb.Map<string, string>;
  clearStaticFileDestRelativeFilepathsMap(): void;
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): RegisterStaticFilesResponse.AsObject;
  static toObject(includeInstance: boolean, msg: RegisterStaticFilesResponse): RegisterStaticFilesResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: RegisterStaticFilesResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): RegisterStaticFilesResponse;
  static deserializeBinaryFromReader(message: RegisterStaticFilesResponse, reader: jspb.BinaryReader): RegisterStaticFilesResponse;
}

export namespace RegisterStaticFilesResponse {
  export type AsObject = {
    staticFileDestRelativeFilepathsMap: Array<[string, string]>,
  }
}

export class RegisterFilesArtifactsArgs extends jspb.Message {
  getFilesArtifactUrlsMap(): jspb.Map<string, string>;
  clearFilesArtifactUrlsMap(): void;
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): RegisterFilesArtifactsArgs.AsObject;
  static toObject(includeInstance: boolean, msg: RegisterFilesArtifactsArgs): RegisterFilesArtifactsArgs.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: RegisterFilesArtifactsArgs, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): RegisterFilesArtifactsArgs;
  static deserializeBinaryFromReader(message: RegisterFilesArtifactsArgs, reader: jspb.BinaryReader): RegisterFilesArtifactsArgs;
}

export namespace RegisterFilesArtifactsArgs {
  export type AsObject = {
    filesArtifactUrlsMap: Array<[string, string]>,
  }
}

export class RegisterServiceArgs extends jspb.Message {
  getServiceId(): string;
  setServiceId(value: string): void;

  getPartitionId(): string;
  setPartitionId(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): RegisterServiceArgs.AsObject;
  static toObject(includeInstance: boolean, msg: RegisterServiceArgs): RegisterServiceArgs.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: RegisterServiceArgs, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): RegisterServiceArgs;
  static deserializeBinaryFromReader(message: RegisterServiceArgs, reader: jspb.BinaryReader): RegisterServiceArgs;
}

export namespace RegisterServiceArgs {
  export type AsObject = {
    serviceId: string,
    partitionId: string,
  }
}

export class RegisterServiceResponse extends jspb.Message {
  getIpAddr(): string;
  setIpAddr(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): RegisterServiceResponse.AsObject;
  static toObject(includeInstance: boolean, msg: RegisterServiceResponse): RegisterServiceResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: RegisterServiceResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): RegisterServiceResponse;
  static deserializeBinaryFromReader(message: RegisterServiceResponse, reader: jspb.BinaryReader): RegisterServiceResponse;
}

export namespace RegisterServiceResponse {
  export type AsObject = {
    ipAddr: string,
  }
}

export class GenerateFilesArgs extends jspb.Message {
  getServiceId(): string;
  setServiceId(value: string): void;

  getFilesToGenerateMap(): jspb.Map<string, FileGenerationOptions>;
  clearFilesToGenerateMap(): void;
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GenerateFilesArgs.AsObject;
  static toObject(includeInstance: boolean, msg: GenerateFilesArgs): GenerateFilesArgs.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: GenerateFilesArgs, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GenerateFilesArgs;
  static deserializeBinaryFromReader(message: GenerateFilesArgs, reader: jspb.BinaryReader): GenerateFilesArgs;
}

export namespace GenerateFilesArgs {
  export type AsObject = {
    serviceId: string,
    filesToGenerateMap: Array<[string, FileGenerationOptions.AsObject]>,
  }
}

export class FileGenerationOptions extends jspb.Message {
  getFileTypeToGenerate(): FileGenerationOptions.FileTypeToGenerateMap[keyof FileGenerationOptions.FileTypeToGenerateMap];
  setFileTypeToGenerate(value: FileGenerationOptions.FileTypeToGenerateMap[keyof FileGenerationOptions.FileTypeToGenerateMap]): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): FileGenerationOptions.AsObject;
  static toObject(includeInstance: boolean, msg: FileGenerationOptions): FileGenerationOptions.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: FileGenerationOptions, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): FileGenerationOptions;
  static deserializeBinaryFromReader(message: FileGenerationOptions, reader: jspb.BinaryReader): FileGenerationOptions;
}

export namespace FileGenerationOptions {
  export type AsObject = {
    fileTypeToGenerate: FileGenerationOptions.FileTypeToGenerateMap[keyof FileGenerationOptions.FileTypeToGenerateMap],
  }

  export interface FileTypeToGenerateMap {
    FILE: 0;
  }

  export const FileTypeToGenerate: FileTypeToGenerateMap;
}

export class GenerateFilesResponse extends jspb.Message {
  getGeneratedFileRelativeFilepathsMap(): jspb.Map<string, string>;
  clearGeneratedFileRelativeFilepathsMap(): void;
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GenerateFilesResponse.AsObject;
  static toObject(includeInstance: boolean, msg: GenerateFilesResponse): GenerateFilesResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: GenerateFilesResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GenerateFilesResponse;
  static deserializeBinaryFromReader(message: GenerateFilesResponse, reader: jspb.BinaryReader): GenerateFilesResponse;
}

export namespace GenerateFilesResponse {
  export type AsObject = {
    generatedFileRelativeFilepathsMap: Array<[string, string]>,
  }
}

export class LoadStaticFilesArgs extends jspb.Message {
  getServiceId(): string;
  setServiceId(value: string): void;

  getStaticFilesMap(): jspb.Map<string, boolean>;
  clearStaticFilesMap(): void;
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): LoadStaticFilesArgs.AsObject;
  static toObject(includeInstance: boolean, msg: LoadStaticFilesArgs): LoadStaticFilesArgs.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: LoadStaticFilesArgs, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): LoadStaticFilesArgs;
  static deserializeBinaryFromReader(message: LoadStaticFilesArgs, reader: jspb.BinaryReader): LoadStaticFilesArgs;
}

export namespace LoadStaticFilesArgs {
  export type AsObject = {
    serviceId: string,
    staticFilesMap: Array<[string, boolean]>,
  }
}

export class LoadStaticFilesResponse extends jspb.Message {
  getCopiedStaticFileRelativeFilepathsMap(): jspb.Map<string, string>;
  clearCopiedStaticFileRelativeFilepathsMap(): void;
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): LoadStaticFilesResponse.AsObject;
  static toObject(includeInstance: boolean, msg: LoadStaticFilesResponse): LoadStaticFilesResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: LoadStaticFilesResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): LoadStaticFilesResponse;
  static deserializeBinaryFromReader(message: LoadStaticFilesResponse, reader: jspb.BinaryReader): LoadStaticFilesResponse;
}

export namespace LoadStaticFilesResponse {
  export type AsObject = {
    copiedStaticFileRelativeFilepathsMap: Array<[string, string]>,
  }
}

export class StartServiceArgs extends jspb.Message {
  getServiceId(): string;
  setServiceId(value: string): void;

  getDockerImage(): string;
  setDockerImage(value: string): void;

  getUsedPortsMap(): jspb.Map<string, boolean>;
  clearUsedPortsMap(): void;
  clearEntrypointArgsList(): void;
  getEntrypointArgsList(): Array<string>;
  setEntrypointArgsList(value: Array<string>): void;
  addEntrypointArgs(value: string, index?: number): string;

  clearCmdArgsList(): void;
  getCmdArgsList(): Array<string>;
  setCmdArgsList(value: Array<string>): void;
  addCmdArgs(value: string, index?: number): string;

  getDockerEnvVarsMap(): jspb.Map<string, string>;
  clearDockerEnvVarsMap(): void;
  getEnclaveDataVolMntDirpath(): string;
  setEnclaveDataVolMntDirpath(value: string): void;

  getFilesArtifactMountDirpathsMap(): jspb.Map<string, string>;
  clearFilesArtifactMountDirpathsMap(): void;
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): StartServiceArgs.AsObject;
  static toObject(includeInstance: boolean, msg: StartServiceArgs): StartServiceArgs.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: StartServiceArgs, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): StartServiceArgs;
  static deserializeBinaryFromReader(message: StartServiceArgs, reader: jspb.BinaryReader): StartServiceArgs;
}

export namespace StartServiceArgs {
  export type AsObject = {
    serviceId: string,
    dockerImage: string,
    usedPortsMap: Array<[string, boolean]>,
    entrypointArgsList: Array<string>,
    cmdArgsList: Array<string>,
    dockerEnvVarsMap: Array<[string, string]>,
    enclaveDataVolMntDirpath: string,
    filesArtifactMountDirpathsMap: Array<[string, string]>,
  }
}

export class StartServiceResponse extends jspb.Message {
  getUsedPortsHostPortBindingsMap(): jspb.Map<string, PortBinding>;
  clearUsedPortsHostPortBindingsMap(): void;
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): StartServiceResponse.AsObject;
  static toObject(includeInstance: boolean, msg: StartServiceResponse): StartServiceResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: StartServiceResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): StartServiceResponse;
  static deserializeBinaryFromReader(message: StartServiceResponse, reader: jspb.BinaryReader): StartServiceResponse;
}

export namespace StartServiceResponse {
  export type AsObject = {
    usedPortsHostPortBindingsMap: Array<[string, PortBinding.AsObject]>,
  }
}

export class PortBinding extends jspb.Message {
  getInterfaceIp(): string;
  setInterfaceIp(value: string): void;

  getInterfacePort(): string;
  setInterfacePort(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): PortBinding.AsObject;
  static toObject(includeInstance: boolean, msg: PortBinding): PortBinding.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: PortBinding, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): PortBinding;
  static deserializeBinaryFromReader(message: PortBinding, reader: jspb.BinaryReader): PortBinding;
}

export namespace PortBinding {
  export type AsObject = {
    interfaceIp: string,
    interfacePort: string,
  }
}

export class GetServiceInfoArgs extends jspb.Message {
  getServiceId(): string;
  setServiceId(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetServiceInfoArgs.AsObject;
  static toObject(includeInstance: boolean, msg: GetServiceInfoArgs): GetServiceInfoArgs.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: GetServiceInfoArgs, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetServiceInfoArgs;
  static deserializeBinaryFromReader(message: GetServiceInfoArgs, reader: jspb.BinaryReader): GetServiceInfoArgs;
}

export namespace GetServiceInfoArgs {
  export type AsObject = {
    serviceId: string,
  }
}

export class GetServiceInfoResponse extends jspb.Message {
  getIpAddr(): string;
  setIpAddr(value: string): void;

  getEnclaveDataVolumeMountDirpath(): string;
  setEnclaveDataVolumeMountDirpath(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetServiceInfoResponse.AsObject;
  static toObject(includeInstance: boolean, msg: GetServiceInfoResponse): GetServiceInfoResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: GetServiceInfoResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetServiceInfoResponse;
  static deserializeBinaryFromReader(message: GetServiceInfoResponse, reader: jspb.BinaryReader): GetServiceInfoResponse;
}

export namespace GetServiceInfoResponse {
  export type AsObject = {
    ipAddr: string,
    enclaveDataVolumeMountDirpath: string,
  }
}

export class RemoveServiceArgs extends jspb.Message {
  getServiceId(): string;
  setServiceId(value: string): void;

  getContainerStopTimeoutSeconds(): number;
  setContainerStopTimeoutSeconds(value: number): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): RemoveServiceArgs.AsObject;
  static toObject(includeInstance: boolean, msg: RemoveServiceArgs): RemoveServiceArgs.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: RemoveServiceArgs, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): RemoveServiceArgs;
  static deserializeBinaryFromReader(message: RemoveServiceArgs, reader: jspb.BinaryReader): RemoveServiceArgs;
}

export namespace RemoveServiceArgs {
  export type AsObject = {
    serviceId: string,
    containerStopTimeoutSeconds: number,
  }
}

export class RepartitionArgs extends jspb.Message {
  getPartitionServicesMap(): jspb.Map<string, PartitionServices>;
  clearPartitionServicesMap(): void;
  getPartitionConnectionsMap(): jspb.Map<string, PartitionConnections>;
  clearPartitionConnectionsMap(): void;
  hasDefaultConnection(): boolean;
  clearDefaultConnection(): void;
  getDefaultConnection(): PartitionConnectionInfo | undefined;
  setDefaultConnection(value?: PartitionConnectionInfo): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): RepartitionArgs.AsObject;
  static toObject(includeInstance: boolean, msg: RepartitionArgs): RepartitionArgs.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: RepartitionArgs, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): RepartitionArgs;
  static deserializeBinaryFromReader(message: RepartitionArgs, reader: jspb.BinaryReader): RepartitionArgs;
}

export namespace RepartitionArgs {
  export type AsObject = {
    partitionServicesMap: Array<[string, PartitionServices.AsObject]>,
    partitionConnectionsMap: Array<[string, PartitionConnections.AsObject]>,
    defaultConnection?: PartitionConnectionInfo.AsObject,
  }
}

export class PartitionServices extends jspb.Message {
  getServiceIdSetMap(): jspb.Map<string, boolean>;
  clearServiceIdSetMap(): void;
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): PartitionServices.AsObject;
  static toObject(includeInstance: boolean, msg: PartitionServices): PartitionServices.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: PartitionServices, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): PartitionServices;
  static deserializeBinaryFromReader(message: PartitionServices, reader: jspb.BinaryReader): PartitionServices;
}

export namespace PartitionServices {
  export type AsObject = {
    serviceIdSetMap: Array<[string, boolean]>,
  }
}

export class PartitionConnections extends jspb.Message {
  getConnectionInfoMap(): jspb.Map<string, PartitionConnectionInfo>;
  clearConnectionInfoMap(): void;
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): PartitionConnections.AsObject;
  static toObject(includeInstance: boolean, msg: PartitionConnections): PartitionConnections.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: PartitionConnections, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): PartitionConnections;
  static deserializeBinaryFromReader(message: PartitionConnections, reader: jspb.BinaryReader): PartitionConnections;
}

export namespace PartitionConnections {
  export type AsObject = {
    connectionInfoMap: Array<[string, PartitionConnectionInfo.AsObject]>,
  }
}

export class PartitionConnectionInfo extends jspb.Message {
  getIsBlocked(): boolean;
  setIsBlocked(value: boolean): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): PartitionConnectionInfo.AsObject;
  static toObject(includeInstance: boolean, msg: PartitionConnectionInfo): PartitionConnectionInfo.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: PartitionConnectionInfo, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): PartitionConnectionInfo;
  static deserializeBinaryFromReader(message: PartitionConnectionInfo, reader: jspb.BinaryReader): PartitionConnectionInfo;
}

export namespace PartitionConnectionInfo {
  export type AsObject = {
    isBlocked: boolean,
  }
}

export class ExecCommandArgs extends jspb.Message {
  getServiceId(): string;
  setServiceId(value: string): void;

  clearCommandArgsList(): void;
  getCommandArgsList(): Array<string>;
  setCommandArgsList(value: Array<string>): void;
  addCommandArgs(value: string, index?: number): string;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ExecCommandArgs.AsObject;
  static toObject(includeInstance: boolean, msg: ExecCommandArgs): ExecCommandArgs.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: ExecCommandArgs, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ExecCommandArgs;
  static deserializeBinaryFromReader(message: ExecCommandArgs, reader: jspb.BinaryReader): ExecCommandArgs;
}

export namespace ExecCommandArgs {
  export type AsObject = {
    serviceId: string,
    commandArgsList: Array<string>,
  }
}

export class ExecCommandResponse extends jspb.Message {
  getExitCode(): number;
  setExitCode(value: number): void;

  getLogOutput(): string;
  setLogOutput(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ExecCommandResponse.AsObject;
  static toObject(includeInstance: boolean, msg: ExecCommandResponse): ExecCommandResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: ExecCommandResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ExecCommandResponse;
  static deserializeBinaryFromReader(message: ExecCommandResponse, reader: jspb.BinaryReader): ExecCommandResponse;
}

export namespace ExecCommandResponse {
  export type AsObject = {
    exitCode: number,
    logOutput: string,
  }
}

export class WaitForHttpGetEndpointAvailabilityArgs extends jspb.Message {
  getServiceId(): string;
  setServiceId(value: string): void;

  getPort(): number;
  setPort(value: number): void;

  getPath(): string;
  setPath(value: string): void;

  getInitialDelayMilliseconds(): number;
  setInitialDelayMilliseconds(value: number): void;

  getRetries(): number;
  setRetries(value: number): void;

  getRetriesDelayMilliseconds(): number;
  setRetriesDelayMilliseconds(value: number): void;

  getBodyText(): string;
  setBodyText(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): WaitForHttpGetEndpointAvailabilityArgs.AsObject;
  static toObject(includeInstance: boolean, msg: WaitForHttpGetEndpointAvailabilityArgs): WaitForHttpGetEndpointAvailabilityArgs.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: WaitForHttpGetEndpointAvailabilityArgs, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): WaitForHttpGetEndpointAvailabilityArgs;
  static deserializeBinaryFromReader(message: WaitForHttpGetEndpointAvailabilityArgs, reader: jspb.BinaryReader): WaitForHttpGetEndpointAvailabilityArgs;
}

export namespace WaitForHttpGetEndpointAvailabilityArgs {
  export type AsObject = {
    serviceId: string,
    port: number,
    path: string,
    initialDelayMilliseconds: number,
    retries: number,
    retriesDelayMilliseconds: number,
    bodyText: string,
  }
}

export class WaitForHttpPostEndpointAvailabilityArgs extends jspb.Message {
  getServiceId(): string;
  setServiceId(value: string): void;

  getPort(): number;
  setPort(value: number): void;

  getPath(): string;
  setPath(value: string): void;

  getRequestBody(): string;
  setRequestBody(value: string): void;

  getInitialDelayMilliseconds(): number;
  setInitialDelayMilliseconds(value: number): void;

  getRetries(): number;
  setRetries(value: number): void;

  getRetriesDelayMilliseconds(): number;
  setRetriesDelayMilliseconds(value: number): void;

  getBodyText(): string;
  setBodyText(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): WaitForHttpPostEndpointAvailabilityArgs.AsObject;
  static toObject(includeInstance: boolean, msg: WaitForHttpPostEndpointAvailabilityArgs): WaitForHttpPostEndpointAvailabilityArgs.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: WaitForHttpPostEndpointAvailabilityArgs, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): WaitForHttpPostEndpointAvailabilityArgs;
  static deserializeBinaryFromReader(message: WaitForHttpPostEndpointAvailabilityArgs, reader: jspb.BinaryReader): WaitForHttpPostEndpointAvailabilityArgs;
}

export namespace WaitForHttpPostEndpointAvailabilityArgs {
  export type AsObject = {
    serviceId: string,
    port: number,
    path: string,
    requestBody: string,
    initialDelayMilliseconds: number,
    retries: number,
    retriesDelayMilliseconds: number,
    bodyText: string,
  }
}

export class ExecuteBulkCommandsArgs extends jspb.Message {
  getSerializedCommands(): string;
  setSerializedCommands(value: string): void;

  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): ExecuteBulkCommandsArgs.AsObject;
  static toObject(includeInstance: boolean, msg: ExecuteBulkCommandsArgs): ExecuteBulkCommandsArgs.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: ExecuteBulkCommandsArgs, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): ExecuteBulkCommandsArgs;
  static deserializeBinaryFromReader(message: ExecuteBulkCommandsArgs, reader: jspb.BinaryReader): ExecuteBulkCommandsArgs;
}

export namespace ExecuteBulkCommandsArgs {
  export type AsObject = {
    serializedCommands: string,
  }
}

export class GetServicesResponse extends jspb.Message {
  getServiceIdsMap(): jspb.Map<string, boolean>;
  clearServiceIdsMap(): void;
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetServicesResponse.AsObject;
  static toObject(includeInstance: boolean, msg: GetServicesResponse): GetServicesResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: GetServicesResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetServicesResponse;
  static deserializeBinaryFromReader(message: GetServicesResponse, reader: jspb.BinaryReader): GetServicesResponse;
}

export namespace GetServicesResponse {
  export type AsObject = {
    serviceIdsMap: Array<[string, boolean]>,
  }
}

export class GetLambdasResponse extends jspb.Message {
  getLambdaIdsMap(): jspb.Map<string, boolean>;
  clearLambdaIdsMap(): void;
  serializeBinary(): Uint8Array;
  toObject(includeInstance?: boolean): GetLambdasResponse.AsObject;
  static toObject(includeInstance: boolean, msg: GetLambdasResponse): GetLambdasResponse.AsObject;
  static extensions: {[key: number]: jspb.ExtensionFieldInfo<jspb.Message>};
  static extensionsBinary: {[key: number]: jspb.ExtensionFieldBinaryInfo<jspb.Message>};
  static serializeBinaryToWriter(message: GetLambdasResponse, writer: jspb.BinaryWriter): void;
  static deserializeBinary(bytes: Uint8Array): GetLambdasResponse;
  static deserializeBinaryFromReader(message: GetLambdasResponse, reader: jspb.BinaryReader): GetLambdasResponse;
}

export namespace GetLambdasResponse {
  export type AsObject = {
    lambdaIdsMap: Array<[string, boolean]>,
  }
}

