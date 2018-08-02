// This file can be replaced during build by using the `fileReplacements` array.
// `ng build ---prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  // fb_api_conf: {
  //     apiKey: 'AIzaSyBfYPWiHu2-21cmWUtptgzFxynWKYISHTo',
  //     authDomain: 'parkopoly-prod.firebaseapp.com',
  //     databaseURL: 'https://parkopoly-prod.firebaseio.com',
  //     projectId: 'parkopoly-prod',
  //     storageBucket: 'parkopoly-prod.appspot.com',
  //     messagingSenderId: '297569745235'
  // },
    firebase: {
            apiKey: 'AIzaSyBfYPWiHu2-21cmWUtptgzFxynWKYISHTo',
            authDomain: 'parkopoly-prod.firebaseapp.com',
            databaseURL: 'https://parkopoly-prod.firebaseio.com',
            projectId: 'parkopoly-prod',
            storageBucket: 'parkopoly-prod.appspot.com',
            messagingSenderId: '297569745235'
    },
  parkopoly: {
    domain: 'https://service-test.parkopoly.fr',
    authenticate: '/api/users/authenticate',
    concessions: '/api/backoffice/concessions/short',
    driver: '/api/backoffice/driver',
    header: {
      content_type: 'application/json',
      x_app_type: 'prescriber',
      authorization_prefix: 'Bearer '
    }
  },
};


/*
 * In development mode, to ignore zone related error stack frames such as
 * `zone.run`, `zoneDelegate.invokeTask` for easier debugging, you can
 * import the following file, but please comment it out in production mode
 * because it will have performance impact when throw error
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
