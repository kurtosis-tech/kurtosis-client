import {SharedFileObject} from "./shared_file_object/shared_file_object";
import { ok, err, Result } from 'neverthrow';
import * as path from "path"
import * as fs from "fs"
//TODO add documentation
export class SharedDirectory {
    //The service directory absolute path in the container where this code is running
    private readonly sharedDirectoryMountpathOnThisContainer: string;
    //The service directory absolute path in the service container
    private readonly sharedDirectoryMountpathOnServiceContainer: string;

    constructor (sharedDirectoryMountpathOnThisContainer: string, sharedDirectoryMountpathOnServiceContainer: string) {
        this.sharedDirectoryMountpathOnThisContainer = sharedDirectoryMountpathOnThisContainer;
        this.sharedDirectoryMountpathOnServiceContainer = sharedDirectoryMountpathOnServiceContainer;
    }
    //TODO add documentation
    public getSharedDirectoryMountpathOnThisContainer(): string {
        return this.sharedDirectoryMountpathOnThisContainer;
    }
    //TODO add documentation
    public getSharedDirectoryMountpathOnServiceContainer(): string {
        return this.sharedDirectoryMountpathOnServiceContainer;
    }
    //TODO add documentation
    public getSharedFileObject(fileName: string): SharedFileObject {
        const absFilepathOnThisContainer = path.join(this.sharedDirectoryMountpathOnThisContainer, fileName);

        try {
            fs.closeSync(fs.openSync(absFilepathOnThisContainer, 'a'))
        } catch(exception: any) {
            throw new Error("An error occurred creating file " + absFilepathOnThisContainer);
        }

        const absFilepathOnServiceContainer = path.join(this.sharedDirectoryMountpathOnServiceContainer, fileName);

        const sharedFileObject = new SharedFileObject(absFilepathOnThisContainer, absFilepathOnServiceContainer)

        return sharedFileObject
    }
}
