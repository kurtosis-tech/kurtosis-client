/*
 * Copyright (c) 2020 - present Kurtosis Technologies LLC.
 * All Rights Reserved.
 */

const mockServicePort = 1000; 

// Mock service, for testing purposes only
class MockService {
	// For testing, the service will report as available on the Nth call to isAvailable
	becomesAvailableOnCheck: number;

	// Number of calls to isAvailable that have happened
	callsToIsAvailable: number;


    constructor (becomesAvailableOnCheck: number) {
            this.becomesAvailableOnCheck = becomesAvailableOnCheck;
            this.callsToIsAvailable = 0;
    }

    public isAvailable(): boolean {
        this.callsToIsAvailable++;
        return this.callsToIsAvailable >= this.becomesAvailableOnCheck;
    }

}

