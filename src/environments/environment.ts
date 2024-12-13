export const environment = {
  production: false,
  apiUrl: 'http://localhost:3000/api',
  b2c: {
    authority: 'https://edgardohairsalon.b2clogin.com/EdgardoHairSalon.onmicrosoft.com/B2C_1_EdgardoHairSalon',
    clientId: 'b3ab8bc1-7620-4209-9cb0-3accc4b1d0cd',
    redirectUri: 'http://localhost:4200', // Ensure no trailing slash here unless it is in the Azure portal
    scopes: ['openid', 'offline_access', 'https://EdgardoHairSalon.onmicrosoft.com/b3ab8bc1-7620-4209-9cb0-3accc4b1d0cd/EdgardoHairSalonScopeName']
  }
};