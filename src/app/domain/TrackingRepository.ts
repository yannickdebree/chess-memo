import { Tracking } from ".";

export interface TrackingRepository {
    saveTracking(tracking: Tracking): void;
}