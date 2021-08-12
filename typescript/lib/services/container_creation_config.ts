import { Result } from "neverthrow";

const DEFAULT_KURTOSIS_VOLUME_MOUNTPOINT: string = "/kurtosis-enclave-data";

export type StaticFileID = string;

// The ID of an artifact containing files that should be mounted into a service container
export type FilesArtifactID = string;

// ====================================================================================================
//                                    Config Object
// ====================================================================================================
// TODO defensive copy when we're giving back complex objects?????
// Docs available at https://docs.kurtosistech.com/kurtosis-libs/lib-documentation
export class ContainerCreationConfig {
	
    private readonly image: string;
    private readonly kurtosisVolumeMountpoint: string; // Technically the enclave data volume, but we call it this for simplicity for the user
    private readonly usedPortsSet: Map<string, boolean>;
    private readonly fileGeneratingFuncs: Map<string, (fp: number) => Result<null, Error>>; // File descriptors are just integers
    private readonly usedStaticFilesSet: Map<StaticFileID, boolean>;
    private readonly filesArtifactMountpoints: Map<FilesArtifactID, string>;

    constructor(
        image: string,
        kurtosisVolumeMountpoint: string,
        usedPortsSet: Map<string, boolean>,
        fileGeneratingFuncs: Map<string, (fp: number) => Result<null, Error>>,
        usedStaticFilesSet: Map<StaticFileID, boolean>,
        filesArtifactMountpoints: Map<FilesArtifactID, string>
    ){
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

    public getUsedPortsSet(): Map<string, boolean> {
        return this.usedPortsSet;
    }

    public getFileGeneratingFuncs(): Map<string, (fp: number) => Result<null, Error>> {
        return this.fileGeneratingFuncs;
    }

    public getFilesArtifactMountpoints(): Map<FilesArtifactID, string> {
        return this.filesArtifactMountpoints;
    }

    public getUsedStaticFiles(): Map<StaticFileID, boolean> {
        return this.usedStaticFilesSet;
    }
}

// ====================================================================================================
//                                        Builder
// ====================================================================================================
// TODO Defensive copies on all these With... functions???
// Docs available at https://docs.kurtosistech.com/kurtosis-libs/lib-documentation
class ContainerCreationConfigBuilder {
    private readonly image: string;
    private kurtosisVolumeMountpoint: string;
    private usedPortsSet: Map<string, boolean>;
    private usedStaticFilesSet: Map<StaticFileID, boolean>;
    private fileGeneratingFuncs: Map<string, (fp: number) => Result<null, Error>>;
    private filesArtifactMountpoints: Map<FilesArtifactID, string>;

    constructor (image: string) {
            this.image = image;
            this.kurtosisVolumeMountpoint = DEFAULT_KURTOSIS_VOLUME_MOUNTPOINT;
            this.usedPortsSet = new Map();
			this.usedStaticFilesSet = new Map();
            this.fileGeneratingFuncs = new Map();
            this.filesArtifactMountpoints = new Map();
    }

    public withKurtosisVolumeMountpoint(kurtosisVolumeMountpoint: string): ContainerCreationConfigBuilder {
        this.kurtosisVolumeMountpoint = kurtosisVolumeMountpoint;
        return this;
    }

    public withUsedPorts(usedPortsSet: Map<string, boolean>): ContainerCreationConfigBuilder {
        this.usedPortsSet = usedPortsSet;
        return this;
    }

    public withGeneratedFiles(fileGeneratingFuncs: Map<string, (fp: number) => Result<null, Error>>): ContainerCreationConfigBuilder {
        this.fileGeneratingFuncs = fileGeneratingFuncs;
        return this;
    }

    public withStaticFiles(usedStaticFilesSet: Map<StaticFileID, boolean>): ContainerCreationConfigBuilder {
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
