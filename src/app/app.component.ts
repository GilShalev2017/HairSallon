import { Component, Injector } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { MAT_DATE_LOCALE } from '@angular/material/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  providers: [{ provide: MAT_DATE_LOCALE, useValue: 'en-US' }]
})
export class AppComponent {
  selectedLanguage = 'en';

  constructor(private translate: TranslateService, private injector: Injector) {
    this.translate.setDefaultLang('en');
  }

  changeLanguage(lang: string): void {
    this.translate.use(lang);
    const newLocale = lang === 'he' ? 'he-IL' : 'en-US';
   // this.injector.get(MAT_DATE_LOCALE).useValue = newLocale;
   document.documentElement.dir = lang === 'he' ? 'rtl' : 'ltr';
  }
}
