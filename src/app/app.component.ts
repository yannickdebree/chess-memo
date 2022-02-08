import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { TranslateService } from '@ngx-translate/core';
import { first } from 'rxjs/operators';
import { LanguageLetter } from './domain/LanguageLetter';
import { ActiveLanguageRepositoryService } from './services/active-language-repository.service';

@UntilDestroy()
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit {
  constructor(
    private activeLanguageRepositoryService: ActiveLanguageRepositoryService,
    private translateService: TranslateService
  ) {}

  ngOnInit() {
    const activeLanguage$ = this.activeLanguageRepositoryService.getActiveLanguageLetter$();

    activeLanguage$.pipe(untilDestroyed(this)).subscribe((activeLanguage) => {
      if (!!activeLanguage) {
        this.translateService.use(activeLanguage.toLocaleLowerCase());
      }
    });

    activeLanguage$.pipe(first(), untilDestroyed(this)).subscribe((activeLanguage) => {
      if (!activeLanguage) {
        this.activeLanguageRepositoryService.saveActiveLanguageLetter(LanguageLetter.FR);
      }
    });
  }
}
