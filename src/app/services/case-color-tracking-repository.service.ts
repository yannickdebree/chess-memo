import { Injectable } from '@angular/core';
import { Tracking, TrackingRepository } from '@_domain';

@Injectable({
  providedIn: 'root'
})
export class CaseColorTrackingRepositoryService implements TrackingRepository {
  saveTracking(tracking: Tracking) {
    console.log(tracking);
  }
}
