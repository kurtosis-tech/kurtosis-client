/*
 * Copyright (c) 2020 - present Kurtosis Technologies LLC.
 * All Rights Reserved.
 */

/*
The identifier used for services with the network.
*/
export type ServiceID = string;

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
