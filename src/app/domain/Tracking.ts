import { Case } from "./Case";

export class Tracking {
    private date = new Date();
    private data = new Array<{ case: Case, success: boolean }>();

    registerData(caseToRegister: Case, success = true) {
        this.data.push({ case: caseToRegister, success });
    }

    getData() {
        return this.data;
    }
}