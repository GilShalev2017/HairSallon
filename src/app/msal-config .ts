import { Configuration, LogLevel } from '@azure/msal-browser';
import { environment } from '../environments/environment';

export const msalConfig: Configuration = {
  auth: {
    clientId: environment.b2c.clientId,
    authority: environment.b2c.authority,
    redirectUri: environment.b2c.redirectUri,
  },
  cache: {
    cacheLocation: 'localStorage', // Can also use sessionStorage
    storeAuthStateInCookie: true,
  },
  system: {
    loggerOptions: {
      logLevel: LogLevel.Info, // Set this to DEBUG for more detailed logs
    }
  }
};
