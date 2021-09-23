import * as path from "path"

/*
Holds information about a filepath shared between two containers: this container, and a container running a service
in a testnet. The actual object referenced by this path could be anything - a fire, a directory, a symlink,
nonexistent, etc.
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
