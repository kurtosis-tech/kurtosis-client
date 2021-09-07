import { Result } from "neverthrow";

const DEFAULT_KURTOSIS_VOLUME_MOUNTPOINT: string = "/kurtosis-enclave-data";

export type StaticFileID = string;

// The ID of an artifact containing files that should be mounted into a service container
export type FilesArtifactID = string;

// ====================================================================================================
//                                    Config Object
// ====================================================================================================
// TODO defensive copy when we're giving back complex objects?????
// Docs available at https://docs.kurtosistech.com/kurtosis-client/lib-documentation
export class ContainerCreationConfig {
	
    private readonly image: string;
    private readonly kurtosisVolumeMountpoint: string; // Technically the enclave data volume, but we call it this for simplicity for the user
    private readonly usedPortsSet: Set<string>;
    private readonly fileGeneratingFuncs: Map<string, (fp: number) => Promise<Result<null, Error>>>; // File descriptors are just integers
    private readonly usedStaticFilesSet: Set<StaticFileID>;
    private readonly filesArtifactMountpoints: Map<FilesArtifactID, string>;

    constructor(
            image: string,
            kurtosisVolumeMountpoint: string,
            usedPortsSet: Set<string>,
            fileGeneratingFuncs: Map<string, (fp: number) => Promise<Result<null, Error>>>,
            usedStaticFilesSet: Set<StaticFileID>,
            filesArtifactMountpoints: Map<FilesArtifactID, string>){
        this.image = image;
        this.kurtosisVolumeMountpoint = kurtosisVolumeMountpoint;
        this.usedPortsSet = usedPortsSet;
        this.fileGeneratingFuncs = fileGeneratingFuncs;
        this.usedStaticFilesSet = usedStaticFilesSet;
        this.filesArtifactMountpoints = filesArtifactMountpoints;
    }

    public getImage(): string {
        return this.image;
    }

    public getKurtosisVolumeMountpoint(): string {
        return this.kurtosisVolumeMountpoint;
    }

    public getUsedPortsSet(): Set<string> {
        return this.usedPortsSet;
    }

    public getFileGeneratingFuncs(): Map<string, (fp: number) => Promise<Result<null, Error>>> {
        return this.fileGeneratingFuncs;
    }

    public getFilesArtifactMountpoints(): Map<FilesArtifactID, string> {
        return this.filesArtifactMountpoints;
    }

    public getUsedStaticFiles(): Set<StaticFileID> {
        return this.usedStaticFilesSet;
    }
}

// ====================================================================================================
//                                        Builder
// ====================================================================================================
// TODO Defensive copies on all these With... functions???
// Docs available at https://docs.kurtosistech.com/kurtosis-client/lib-documentation
export class ContainerCreationConfigBuilder {
    private readonly image: string;
    private kurtosisVolumeMountpoint: string;
    private usedPortsSet: Set<string>;
    private usedStaticFilesSet: Set<StaticFileID>;
    private fileGeneratingFuncs: Map<string, (fp: number) => Promise<Result<null, Error>>>;
    private filesArtifactMountpoints: Map<FilesArtifactID, string>;

    constructor (image: string) {
        this.image = image;
        this.kurtosisVolumeMountpoint = DEFAULT_KURTOSIS_VOLUME_MOUNTPOINT;
        this.usedPortsSet = new Set();
        this.usedStaticFilesSet = new Set();
        this.fileGeneratingFuncs = new Map();
        this.filesArtifactMountpoints = new Map();
    }

    public withKurtosisVolumeMountpoint(kurtosisVolumeMountpoint: string): ContainerCreationConfigBuilder {
        this.kurtosisVolumeMountpoint = kurtosisVolumeMountpoint;
        return this;
    }

    public withUsedPorts(usedPortsSet: Set<string>): ContainerCreationConfigBuilder {
        this.usedPortsSet = usedPortsSet;
        return this;
    }

    public withGeneratedFiles(fileGeneratingFuncs: Map<string, (fp: number) => Promise<Result<null, Error>>>): ContainerCreationConfigBuilder {
        this.fileGeneratingFuncs = fileGeneratingFuncs;
        return this;
    }

    public withStaticFiles(usedStaticFilesSet: Set<StaticFileID>): ContainerCreationConfigBuilder {
        this.usedStaticFilesSet = usedStaticFilesSet;
        return this;
    }

    public withFilesArtifacts(filesArtifactMountpoints: Map<FilesArtifactID, string>): ContainerCreationConfigBuilder {
        this.filesArtifactMountpoints = filesArtifactMountpoints;
        return this;
    }

    public build(): ContainerCreationConfig {
        return new ContainerCreationConfig(
            this.image,
            this.kurtosisVolumeMountpoint,
            this.usedPortsSet,
            this.fileGeneratingFuncs,
            this.usedStaticFilesSet,
            this.filesArtifactMountpoints,
        );
    }
}
