import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClient, provideHttpClient } from '@angular/common/http';
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
import { MatNativeDateModule,MAT_DATE_LOCALE  } from '@angular/material/core'; // or MatMomentDateModule for moment.js
import { MatSelectModule } from '@angular/material/select';
import { ReactiveFormsModule } from '@angular/forms';

import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
export function HttpLoaderFactory(http: HttpClient): TranslateHttpLoader {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

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
    BrowserAnimationsModule, // Required for Material animations
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
    MatSelectModule,
    ReactiveFormsModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (http: HttpClient) => new TranslateHttpLoader(http, './assets/i18n/', '.json'),
        deps: [HttpClient]
      }
    })
  ],
  providers: [provideHttpClient(),{ provide: MAT_DATE_LOCALE, useValue: 'en-US' }], // Set the default locale
  bootstrap: [AppComponent]
})
export class AppModule {}
