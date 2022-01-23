import { ChangeDetectionStrategy, Component } from '@angular/core';

enum Language {
  EN = 'EN',
  FR = 'FR'
}

@Component({
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HomepageComponent {
  languages = [Language.EN, Language.FR].map(l => ({ letter: l, active: l === Language.FR }))

  changeLanguage(lang: Language) {
    this.languages.forEach(language => {
      language.active = language.letter === lang;
    })
  }
}
