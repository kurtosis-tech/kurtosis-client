//TODO add documentation
export class SharedDirectory {
    private readonly absFilepathOnThisContainer: string;
    private readonly absFilepathOnServiceContainer: string;

    constructor (absFilepathOnThisContainer: string, absFilepathOnServiceContainer: string) {
        this.absFilepathOnThisContainer = absFilepathOnThisContainer;
        this.absFilepathOnServiceContainer = absFilepathOnServiceContainer;
    }
    //TODO add documentation
    public getAbsFilepathOnThisContainer(): string {
        return this.absFilepathOnThisContainer;
    }
    //TODO add documentation
    public getAbsFilepathOnServiceContainer(): string {
        return this.absFilepathOnServiceContainer;
    }
}