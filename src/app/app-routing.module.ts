import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component'; // Your main component
import { MsalRedirectComponent } from '@azure/msal-angular'; // Import the Redirect Component

const routes: Routes = [
  { path: '', component: AppComponent }, // Main component for the app
  { path: 'app-root', component: AppComponent },
  { path: 'redirect', component: MsalRedirectComponent }, // MSAL redirect handling
  // Add any other routes here
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
