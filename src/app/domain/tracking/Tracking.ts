import { TrackingData } from ".";

export class Tracking {
    private date = new Date();
    private data = new Array<TrackingData>();

    getDate() {
        return this.date;
    }

    setDate(date: Date) {
        this.date = date;
    }

    getData() {
        return this.data;
    }

    registerData(...trackingData: Array<TrackingData>) {
        this.data.push(...trackingData);
    }
}