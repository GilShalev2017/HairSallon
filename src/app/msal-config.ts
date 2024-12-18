// import { Configuration, LogLevel } from '@azure/msal-browser';
// import { environment } from '../environments/environment';

// export const msalConfig: Configuration = {
//   auth: {
//     clientId: environment.b2c.clientId,
//     authority: environment.b2c.authority,
//     redirectUri: environment.b2c.redirectUri,
//   },
//   cache: {
//     cacheLocation: 'localStorage', // Can also use sessionStorage
//     storeAuthStateInCookie: true,
//   },
//   system: {
//     loggerOptions: {
//       logLevel: LogLevel.Info, // Set this to DEBUG for more detailed logs
//     }
//   }
// };
import { IPublicClientApplication, PublicClientApplication, Configuration, InteractionType } from '@azure/msal-browser';
import { MsalGuardConfiguration, MsalInterceptorConfiguration } from '@azure/msal-angular';
import { environment } from '../environments/environment';

export function MSALInstanceFactory(): IPublicClientApplication {
  const msalConfig: Configuration = {
    auth: {
      clientId: '04474317-2051-406d-bea6-e1d9b37fa010', // Your Application client ID
      authority: 'https://MyTenantDomainNameName.b2clogin.com/MyTenantDomainNameName.onmicrosoft.com/B2C_1_MyTenantOrganization', // Authority URL
      redirectUri: 'http://localhost:4200', // Redirect URI (update if necessary)
    },
    cache: {
      cacheLocation: 'localStorage', // Recommended for SPA
      storeAuthStateInCookie: false, // Set to true for IE11/Edge
    },
  };

  return new PublicClientApplication(msalConfig);
}

export function MSALGuardConfigFactory(): MsalGuardConfiguration {
  return {
    interactionType: InteractionType.Redirect, // Can be Popup or Redirect
    authRequest: {
      scopes: ['openid', 'profile', 'email'] // Define the scopes you need
    },
  };
}

// export function MSALInterceptorConfigFactory(): MsalInterceptorConfiguration {
//   const protectedResourceMap = new Map<string, Array<string>>([
//     [environment.apiUrl, ['api://<API_CLIENT_ID>/access_as_user']] // Replace with your API URL and scopes
//   ]);

//   return {
//     interactionType: InteractionType.Redirect,
//     protectedResourceMap: protectedResourceMap
//   };
// }

export function MSALInterceptorConfigFactory(): MsalInterceptorConfiguration {
  const protectedResourceMap = new Map<string, Array<string>>([
    [environment.apiUrl, environment.b2c.scopes], // Map API URL to scopes from environment
  ]);

  return {
    interactionType: InteractionType.Redirect,
    protectedResourceMap: protectedResourceMap,
  };
}
