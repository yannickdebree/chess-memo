import { Injectable } from '@angular/core';
import { Tracking, TrackingRepository } from '@_domain';
import { jsonToTracking } from '@_utils';
import { ReplaySubject } from 'rxjs';
import { LocalStorageManager } from './LocalStorageManager';

@Injectable({
  providedIn: 'root'
})
export class CaseColorTrackingRepositoryService implements TrackingRepository, LocalStorageManager {
  private trackings = new Array<Tracking>();
  private trackings$ = new ReplaySubject<Array<Tracking>>(1);
  readonly localStorageToken = 'chess-memo-case-color';

  constructor() {
    const storage = localStorage.getItem(this.localStorageToken);
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
    localStorage.setItem(this.localStorageToken, JSON.stringify(this.trackings));
    this.trackings$.next(this.trackings);
  }
}
