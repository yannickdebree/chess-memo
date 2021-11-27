import { Injectable } from '@angular/core';
import { Tracking, TrackingRepository } from '@_domain';

@Injectable({
  providedIn: 'root'
})
export class CaseColorTrackingRepositoryService implements TrackingRepository {
  private data = new Array<Tracking>();

  getTrackings() {
    return this.data;
  }

  saveTracking(tracking: Tracking) {
    this.data.push(tracking);
  }
}
