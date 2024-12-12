import { Component, Injector } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { DateAdapter } from '@angular/material/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  providers: [{ provide: MAT_DATE_LOCALE, useValue: 'en-US' }]
})
export class AppComponent {
  selectedLanguage = 'en';

  constructor(private translate: TranslateService, 
    private injector: Injector,
    private dateAdapter: DateAdapter<any>) {// Inject DateAdapter to dynamically update date formats
    this.translate.setDefaultLang('en');
  }

  changeLanguage(lang: string): void {
    this.translate.use(lang);  // Change the language in the translator
    const newLocale = lang === 'he' ? 'he-IL' : 'en-US';
    // Set the MAT_DATE_LOCALE provider dynamically
    this.injector.get(MAT_DATE_LOCALE); // Get MAT_DATE_LOCALE from the injector
    this.dateAdapter.setLocale(newLocale);  // Update the locale for dates
    document.documentElement.dir = lang === 'he' ? 'rtl' : 'ltr';  // Adjust direction for RTL languages
  }
}
