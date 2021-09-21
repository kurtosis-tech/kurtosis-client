export class SharedDirectory {
    private readonly absFilepathOnThisContainer: string;
    private readonly absFilepathOnServiceContainer: string;

    constructor (absFilepathOnThisContainer: string, absFilepathOnServiceContainer: string) {
        this.absFilepathOnThisContainer = absFilepathOnThisContainer;
        this.absFilepathOnServiceContainer = absFilepathOnServiceContainer;
    }

    public getAbsFilepathOnThisContainer(): string {
        return this.absFilepathOnThisContainer;
    }

    public getAbsFilepathOnServiceContainer(): string {
        return this.absFilepathOnServiceContainer;
    }
}