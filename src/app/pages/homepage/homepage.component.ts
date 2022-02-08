import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { LanguageLetter } from '@_domain';
import { ActiveLanguageRepositoryService } from '@_services';

interface LanguageConfig {
  value: LanguageLetter;
  active: boolean;
}

@UntilDestroy()
@Component({
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomepageComponent implements OnInit {
  languageConfigs = new Array<LanguageConfig>();

  constructor(private activeLanguageRepositoryService: ActiveLanguageRepositoryService) {}

  ngOnInit() {
    this.activeLanguageRepositoryService
      .getActiveLanguageLetter$()
      .pipe(untilDestroyed(this))
      .subscribe((activeLanguage) => {
        if (activeLanguage) {
          this.languageConfigs = [LanguageLetter.EN, LanguageLetter.FR].map((letter) => ({
            value: letter,
            active: letter === activeLanguage,
          }));
        }
      });
  }

  changeLanguage(lang: LanguageLetter) {
    this.activeLanguageRepositoryService.saveActiveLanguageLetter(lang);
  }
}
