import { Observable } from 'rxjs';
import { Tracking } from '.';

export interface TrackingRepository {
  getTrackings$(): Observable<Array<Tracking>>;
  saveTracking(tracking: Tracking): void;
  dropTrackings(): void;
}
