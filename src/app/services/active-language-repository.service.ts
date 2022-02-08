import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import { LanguageLetter } from '@_domain';
import { LocalStorageManager } from './LocalStorageManager';

@Injectable({
  providedIn: 'root',
})
export class ActiveLanguageRepositoryService implements LocalStorageManager {
  private activeLanguage?: LanguageLetter;
  private activeLanguage$ = new ReplaySubject<LanguageLetter | undefined>(1);
  readonly localStorageToken = 'chess-memo-lang';

  constructor() {
    const storage = localStorage.getItem(this.localStorageToken);
    if (!!storage) {
      this.activeLanguage = storage as LanguageLetter;
    }
    this.activeLanguage$.next(this.activeLanguage);
  }

  getActiveLanguageLetter$() {
    return this.activeLanguage$.asObservable();
  }

  saveActiveLanguageLetter(activeLanguage: LanguageLetter) {
    localStorage.setItem(this.localStorageToken, activeLanguage);

    this.activeLanguage = activeLanguage;
    this.activeLanguage$.next(this.activeLanguage);
  }
}
