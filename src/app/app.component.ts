import { Component, Injector, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { DateAdapter } from '@angular/material/core';
import { MsalService } from '@azure/msal-angular';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  providers: [{ provide: MAT_DATE_LOCALE, useValue: 'en-US' }]
})
export class AppComponent implements OnInit {
  selectedLanguage = 'en';
  isLoggedIn = false;
  username: string | null = null;

  constructor(private translate: TranslateService,
    private injector: Injector,
    private dateAdapter: DateAdapter<any>,
    private msalService: MsalService) {
    this.translate.setDefaultLang('en');
  }

  changeLanguage(lang: string): void {
    this.translate.use(lang);
    const newLocale = lang === 'he' ? 'he-IL' : 'en-US';
    this.injector.get(MAT_DATE_LOCALE);
    this.dateAdapter.setLocale(newLocale);
    document.documentElement.dir = lang === 'he' ? 'rtl' : 'ltr';
  }

  async ngOnInit() {
    // Handle redirect callback to parse the response after login
    await this.msalService.instance.initialize();

    const accounts = this.msalService.instance.getAllAccounts();
    if (accounts.length === 0) {
      this.msalService.loginRedirect();
    } else {
      this.isLoggedIn = true;
      this.username = accounts[0].username;
    }

    this.msalService.instance.handleRedirectPromise().then(response => {
      if (response) {
        // Login success
        console.log('Redirect login response:', response);
        this.isLoggedIn = true;
        this.username = response.account.username;
      }
    }).catch(error => {
      console.error('Error handling redirect callback:', error);
    });
  }


  login() {
    this.msalService.loginRedirect();
  }

  logout() {
    this.msalService.logoutRedirect();
  }
}
