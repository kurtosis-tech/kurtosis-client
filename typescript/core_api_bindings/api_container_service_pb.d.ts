// package: api_container_api
// file: api_container_service.proto

import * as jspb from "google-protobuf";
import * as google_protobuf_empty_pb from "google-protobuf/google/protobuf/empty_pb";

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
  getSuiteExecutionVolMntDirpath(): string;
  setSuiteExecutionVolMntDirpath(value: string): void;

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
    suiteExecutionVolMntDirpath: string,
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

  getLogOutput(): Uint8Array | string;
  getLogOutput_asU8(): Uint8Array;
  getLogOutput_asB64(): string;
  setLogOutput(value: Uint8Array | string): void;

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
    logOutput: Uint8Array | string,
  }
}

