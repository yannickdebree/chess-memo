import { Injectable } from '@angular/core';
import { Tracking, TrackingRepository } from '../domain';

@Injectable({
  providedIn: 'root'
})
export class CaseColorTrackingRepositoryService implements TrackingRepository {
  saveTracking(tracking: Tracking) {
    console.log(tracking);
  }
}
