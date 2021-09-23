import * as path from "path"

/*
Represents and absolute path shared between two containers, it could be a file, a directory or a symlink
*/
export class SharedPath {

    //Absolute path in the container where this code is running
    private readonly absPathOnThisContainer: string
    //Absolute path in the service container
    private readonly absPathOnServiceContainer: string

    constructor (absPathOnThisContainer: string, absPathOnServiceContainer: string) {
        this.absPathOnThisContainer = absPathOnThisContainer;
        this.absPathOnServiceContainer = absPathOnServiceContainer;
    }
    //TODO add documentation
    public getAbsPathOnThisContainer(): string {
        return this.absPathOnThisContainer;
    }
    //TODO add documentation
    public getAbsPathOnServiceContainer(): string {
        return this.absPathOnServiceContainer;
    }
    //TODO add documentation
    public GetChildPath(pathElement: string): SharedPath {
        const absPathOnThisContainer = path.join(this.absPathOnThisContainer, pathElement);

        const absPathOnServiceContainer = path.join(this.absPathOnServiceContainer, pathElement);

        const sharedPath = new SharedPath(absPathOnThisContainer, absPathOnServiceContainer)

        return sharedPath
    }
}
