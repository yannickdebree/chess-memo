import { Case } from "..";

export class TrackingData {
    constructor(private _case: Case, private success = true) { }

    getCase() {
        return this._case;
    }

    getSuccess() {
        return this.success;
    }

    setSuccess(success: boolean) {
        this.success = success;
    }
}