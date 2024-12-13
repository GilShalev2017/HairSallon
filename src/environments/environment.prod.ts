export const environment = {
  production: true,
  apiUrl: 'https://hairsallonbackend-gbbuhcf4akbedkc2.westeurope-01.azurewebsites.net/api',
  b2c: {
    authority: 'https://EdgardoHairSalon.b2clogin.com/EdgardoHairSalon.onmicrosoft.com/B2C_1_EdgardoHairSalon',
    clientId: 'b3ab8bc1-7620-4209-9cb0-3accc4b1d0cd',
    redirectUri: 'https://zealous-mud-001dfa703.4.azurestaticapps.net/', // or your deployed app URL
    scopes: ['openid', 'offline_access', 'https://EdgardoHairSalon.onmicrosoft.com/b3ab8bc1-7620-4209-9cb0-3accc4b1d0cd/EdgardoHairSalonScopeName']
  }
};