// ====================================================================================================
//                                    Config Object
// ====================================================================================================
// Docs available at https://docs.kurtosistech.com/kurtosis-libs/lib-documentation
export class ContainerRunConfig {
	private readonly entrypointOverrideArgs: string[];
	private readonly cmdOverrideArgs: string[];
	private readonly environmentVariableOverrides: Map<string,string>;
	
	constructor(
			entrypointOverrideArgs: string[],
			cmdOverrideArgs: string[],
			environmentVariableOverrides: Map<string, string>) {
        this.entrypointOverrideArgs = entrypointOverrideArgs;
        this.cmdOverrideArgs = cmdOverrideArgs;
        this.environmentVariableOverrides = environmentVariableOverrides;
	}
	
	public getEntrypointOverrideArgs(): string[] {
        return this.entrypointOverrideArgs;
	}
	
	public getCmdOverrideArgs(): string[] {
        return this.cmdOverrideArgs;
	}
	
	public getEnvironmentVariableOverrides(): Map<string, string> {
        return this.environmentVariableOverrides;
	}
}



// ====================================================================================================
//                                      Builder
// ====================================================================================================
// TODO Defensive copies on all these With... functions???
// Docs available at https://docs.kurtosistech.com/kurtosis-libs/lib-documentation
export class ContainerRunConfigBuilder {
	private entrypointOverrideArgs: string[];
	private cmdOverrideArgs: string[];
	private environmentVariableOverrides: Map<string, string>;
	
	constructor() {
        this.entrypointOverrideArgs = null;
        this.cmdOverrideArgs = null;
        this.environmentVariableOverrides = new Map();
	}
	
	public wthEntrypointOverride(args: string[]): ContainerRunConfigBuilder {
        this.entrypointOverrideArgs = args;
        return this;
	}
	
	public withCmdOverride(args: string[]): ContainerRunConfigBuilder {
        this.cmdOverrideArgs = args;
        return this;
	}
	
	public withEnvironmentVariableOverrides(envVars: Map<string, string>): ContainerRunConfigBuilder {
        this.environmentVariableOverrides = envVars;
        return this;
	}
	
	public build(): ContainerRunConfig {
        return new ContainerRunConfig(
            this.entrypointOverrideArgs,
            this.cmdOverrideArgs,
            this.environmentVariableOverrides,
        );
	}

}