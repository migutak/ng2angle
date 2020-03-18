// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  adlogin: false,
  sendsms: true,
  api: 'http://localhost:8000',
  nodeapi: 'http://localhost:6001/nodeapi',
  grids: 'http://localhost:6002/grids',
  letters_api: 'http://localhost:8004/docx/',
  letters_path: 'd:\\demands\\',
  uploadurl: 'http://localhost:4000',
  demanddownload: 'http://localhost:3000',
  valor: 'http://localhost:3000/api/',
  xlsuploadapi: 'http://localhost:5001/xlsupload/',
  xlstemplate: 'C:\\templates\\upload_notes.xlsx',
  applink: 'http://localhost:4500',
  emailapi: 'http://localhost:8005/demandemail/email',
  demandsmsapi: "http://localhost:7000",
  auth: 'https://ecollectweb.co-opbank.co.ke/adlogin',
  filesapi: 'http://localhost:3000/filesapi', // activityupload
  accplanlink: 'http://localhost:3001',
  kibanarpt: 'http://localhost:5601',
  birt: 'http://localhost:8787/birt',
  kibana: 'http://localhost:5601/app/kibana#/dashboard?_g=0',
  manuals_path: 'C:\\ecol_manuals\\',
  portfoliodash: 'http://localhost:5601/goto/bf80fe14782362d8f9307501e75bf055?embed=true',
  portal: 'http://localhost:4300',
  accplanreport: 'http://172.16.19.151:5601/app/kibana#/discover/346b8c30-0b89-11ea-8410-c5d8870411ab?_g=()',
  ptpreport: 'http://172.16.19.151:5601/app/kibana#/discover/6f42b0b0-0b8c-11ea-8410-c5d8870411ab?_g=(refreshInterval%3A(pause%3A!t%2Cvalue%3A0)%2Ctime%3A(from%3Anow-1y%2Cto%3Anow))'
  ,homedash: 'http://ecollecttst.co-opbank.co.ke:5601/goto/1441d2733a6b9d444949e4f03782992e?embed=true',
  workflow: 'http://172.16.19.151:8089/sysworkflow/en/neoclassic/login/login'
};
