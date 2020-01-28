export const OAuthSettings = {
  appId: 'aca21b69-ce31-42fd-a2a8-19c19cfc7812', //Microsoft Graph OAuth app id
  redirectURI: 'teamscan://oauth2', //this is the android intent-filter (e.g. teamscan://oauth2)
  tenantId: 'a2586b9b-f867-4b3c-9363-5b435c5dbc45', //HHS tenant id, default: 'common'
  scopes: [
    "user.read"
  ]
};