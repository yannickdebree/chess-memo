import { Injectable } from '@angular/core';
import { Tracking, TrackingRepository } from '@_domain';
import { ReplaySubject } from 'rxjs';
import { jsonToTracking } from '@_utils';

@Injectable({
  providedIn: 'root'
})
export class CaseColorTrackingRepositoryService implements TrackingRepository {
  private trackings = new Array<Tracking>();
  private trackings$ = new ReplaySubject<Array<Tracking>>(1);

  constructor() {
    const storage = localStorage.getItem('case-color');
    if (!!storage) {
      this.trackings = JSON.parse(storage).map(jsonToTracking);
      this.trackings$.next(this.trackings);
    }
  }

  getTrackings$() {
    return this.trackings$.asObservable();
  }

  saveTracking(tracking: Tracking) {
    this.trackings.push(tracking);
    this.persistDataInStorage();
  }

  dropTrackings() {
    this.trackings = [];
    this.persistDataInStorage();
  }

  private persistDataInStorage() {
    localStorage.setItem('case-color', JSON.stringify(this.trackings));
    this.trackings$.next(this.trackings);
  }
}
