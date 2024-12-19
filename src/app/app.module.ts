import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HTTP_INTERCEPTORS, HttpClient, provideHttpClient } from '@angular/common/http';
import { AppComponent } from './app.component';
import { ClientFormComponent } from './client-form/client-form.component';
import { ClientListComponent } from './client-list/client-list.component';
import { AddTreatmentComponent } from './add-treatment/add-treatment.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule, MAT_DATE_LOCALE } from '@angular/material/core'; // or MatMomentDateModule for moment.js
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSelectModule } from '@angular/material/select';
import { ReactiveFormsModule } from '@angular/forms';

import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

import {
  MsalModule,
  MsalService,
  MsalInterceptor,
  MsalBroadcastService,
  MsalGuard,
  MsalRedirectComponent,
  MsalInterceptorConfiguration,
  MsalGuardConfiguration,
} from '@azure/msal-angular';

import { InteractionType, IPublicClientApplication, PublicClientApplication } from '@azure/msal-browser';

//import { environment } from '../environments/environment'; //LOCAL
import { environment } from '../environments/environment.prod'; //CLOUD

import { AppRoutingModule } from './app-routing.module'; // Import the routing module

// import { msalConfig } from './msal-config'; // Import your MSAL config file

import { 
  MSALInstanceFactory, 
  MSALGuardConfigFactory, 
  MSALInterceptorConfigFactory 
} from './msal-config';

// export function MSALInstanceFactory(): IPublicClientApplication {
//   return new PublicClientApplication({
//     auth: {
//       clientId: environment.b2c.clientId,
//       authority: environment.b2c.authority,
//       redirectUri: environment.b2c.redirectUri
//     },
//     cache: {
//       cacheLocation: 'localStorage',
//       storeAuthStateInCookie: true
//     }
//   });
// }

// export function MSALGuardConfigFactory(): MsalGuardConfiguration {
//   return {
//     interactionType: InteractionType.Redirect,
//     authRequest: {
//       scopes: environment.b2c.scopes, // Use scopes from environment
//     },
//   };
// }

// export function MSALInterceptorConfigFactory(): MsalInterceptorConfiguration {
//   const protectedResourceMap = new Map<string, Array<string>>([
//     [environment.apiUrl, environment.b2c.scopes], // Map API URL to scopes from environment
//   ]);

//   return {
//     interactionType: InteractionType.Redirect,
//     protectedResourceMap: protectedResourceMap,
//   };
// }


@NgModule({
  declarations: [
    AppComponent,
    ClientFormComponent,
    ClientListComponent,
    AddTreatmentComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    BrowserAnimationsModule, 
    MatButtonModule,
    MatDialogModule,
    MatInputModule,
    MatFormFieldModule,
    MatIconModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatSnackBarModule,
    MatSelectModule,
    ReactiveFormsModule,
    AppRoutingModule,
    MsalModule.forRoot(
      MSALInstanceFactory(),
      MSALGuardConfigFactory(),
      MSALInterceptorConfigFactory()
    ),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (http: HttpClient) => new TranslateHttpLoader(http, './assets/i18n/', '.json'),
        deps: [HttpClient]
      }
    }),
  ],
  providers: [
    provideHttpClient(),
    { provide: MAT_DATE_LOCALE, useValue: 'en-US' },
    MsalService,
    MsalBroadcastService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: MsalInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
