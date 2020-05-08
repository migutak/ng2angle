// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

var host = process.env.BACKEND_HOST || 'http://localhost:';
var manuals = process.env.MANUAL || 'C:\\ecol_manuals\\';
var path = process.env.BACKEND_PATH || 'd:\\demands\\';
var accplanlink = process.env.ACCPLANLINK || 'http://localhost:3001';
var kibanarpt = process.env.KIBANA || 'http://localhost:5601';
var birt = process.env.BIRT || 'http://localhost:8787/birt';
var ptpreport = process.env.PTPREPORT || '';
var homedash = process.env.HOMEDASH || '';
var workflow = process.env.WORKFLOW || 'http://ecollectweb.co-opbank.co.ke:8089/sysworkflow/en/neoclassic/login/login';
var portfoliodash = process.env.PORTFOLIODASH || '';
var accplanreport = process.env.ACCPLANREPORT || '';
var xlstemplate = process.env.XLSTEMPLATE || 'C:\\templates\\upload_notes.xlsx';
var portal = process.env.PORTAL || 'http://localhost:4300';

export const environment = {
  production: false,
  adlogin: false,
  sendsms: true,
  api: host + 8000,
  nodeapi: host + '6001/nodeapi',
  letters_api: host + '8004/docx/',
  letters_path: path,
  uploadurl: host + '3000/filesapi',
  demanddownload: host + 3000,
  valor: host + '3000/api/',
  xlsuploadapi: host + '5001/xlsupload/',
  xlstemplate: xlstemplate,
  applink: host + 4500,
  emailapi: host + '8005/demandemail/email',
  demandsmsapi: host + 7000,
  auth: 'https://ecollectweb.co-opbank.co.ke/adlogin',
  filesapi: host + '3000/filesapi', // activityupload
  accplanlink: accplanlink,
  kibanarpt: kibanarpt,
  birt: birt,
  manuals_path: manuals,
  portfoliodash: portfoliodash,
  portal: portal,
  accplanreport: accplanreport,
  ptpreport: ptpreport,
  homedash: homedash,
  workflow: workflow
};
