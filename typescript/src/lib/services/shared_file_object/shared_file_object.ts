//TODO add documentation
export class SharedFileObject {
    //The file absolute path in the container where this code is running
    private readonly absFilepathOnThisContainer: string
    //The file absolute path in the service container
    private readonly absFilepathOnServiceContainer: string

    constructor(absFilepathOnThisContainer: string, absFilepathOnServiceContainer:string) {
        this.absFilepathOnThisContainer = absFilepathOnThisContainer;
        this.absFilepathOnServiceContainer = absFilepathOnServiceContainer
    }
    //TODO add documentation
    public getAbsFilepathOnThisContainer(): string {
        return this.absFilepathOnThisContainer
    }
    //TODO add documentation
    public getAbsFilepathOnServiceContainer(): string {
        return this.absFilepathOnServiceContainer
    }
}
