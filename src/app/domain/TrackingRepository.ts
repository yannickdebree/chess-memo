import { Tracking } from ".";

export interface TrackingRepository {
    getTrackings(): Array<Tracking>;
    saveTracking(tracking: Tracking): void;
}