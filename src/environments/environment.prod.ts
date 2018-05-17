export const environment = {
  production: true,
  fb_api_conf: {
      apiKey: "API_KEY",
      authDomain: "DOMAIN.firebaseapp.com",
      databaseURL: "https://DATABSEURL.firebaseio.com",
      projectId: "PROJECTID",
      storageBucket: "BUCKET.appspot.com",
      messagingSenderId: "SENDERID"
  },
  parkopoly: {
    domain: 'https://service.parkopoly.fr',
    authenticate: '/api/users/authenticate',
    concessions : '/api/backoffice/concessions/short',
    driver: 'api/backoffice/driver',
    header: {
        content_type: 'application/json',
        x_app_type: 'prescriber',
        authorization_prefix: 'Bearer '
    }
  },
};
