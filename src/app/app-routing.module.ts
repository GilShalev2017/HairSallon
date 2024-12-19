import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component'; // Your main component
import { MsalGuard, MsalRedirectComponent } from '@azure/msal-angular'; // Import the Redirect Component

// const routes: Routes = [
//   { path: '', component: AppComponent }, 
//   { path: 'app-root', component: AppComponent },
//   { path: 'redirect', component: MsalRedirectComponent }, 
// ];

// const routes: Routes = [
//   {
//     path: '',
//     component: AppComponent,
//     canActivate: [MsalGuard]
//   }
// ];

const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
