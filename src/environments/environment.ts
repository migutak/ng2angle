// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

var host = process.env.BACKEND_HOST || 'http://localhost:';
var manuals = process.env.MANUAL || 'C:\\ecol_manuals\\';
var path = process.env.BACKEND_PATH || 'd:\\demands\\';
var ptpreport = process.env.PTPREPORT || '';
var homedash = process.env.HOMEDASH || '';
var workflow = process.env.WORKFLOW || host + '8088/sysworkflow/en/neoclassic/login/login';
var portfoliodash = process.env.PORTFOLIODASH || '';
var accplanreport = process.env.ACCPLANREPORT || '';
var xlstemplate = process.env.XLSTEMPLATE || 'C:\\templates\\upload_notes.xlsx';
var repossessLink = process.env.REPOSSESSLINK || 'http://127.0.0.1:8088/sysworkflow/en/neoclassic/2190778365e4dd6f76581e3091209039/8230823945e4e0887583399019026683.php';

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
  auth: host + '/adlogin',
  filesapi: host + '3000/filesapi', // activityupload
  accplanlink: host + 3001,
  kibanarpt: host + 5601,
  birt: host + ':8787/birt',
  manuals_path: manuals,
  portfoliodash: portfoliodash,
  portal: host + 4300,
  accplanreport: accplanreport,
  ptpreport: ptpreport,
  homedash: homedash,
  workflow: workflow,
  repossessLink: repossessLink
};
