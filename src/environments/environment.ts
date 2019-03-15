// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  // api: 'http://ecollecttst.co-opbank.co.ke:8000',
  api: 'http://localhost:8800',
  letters_api: 'http://localhost:8004/',
  // letters_path: '/users/kevinabongo/Demands/',
  // letters_path: 'c:\\logs\\',
  letters_path: '/home/ecollectadmin/demand_letters/',
  uploadurl: 'http://localhost:4000',
  valor: 'http://localhost:3000/api/',
  metrics: 'http://localhost:8800/appmetrics-dash',
  applink: 'http://localhost:4500'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
