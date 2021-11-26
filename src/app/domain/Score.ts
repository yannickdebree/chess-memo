export class Score {
    private success = 0;
    private fails = 0;

    getSuccess() {
        return this.success;
    }

    registerSuccess() {
        this.success++;
    }

    getFails() {
        return this.fails;
    }

    registerFail() {
        this.fails++;
    }
}