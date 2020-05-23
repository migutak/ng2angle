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
var repossessLink = 'http://127.0.0.1:8088/sysworkflow/en/neoclassic/4437708915ec5876a680fe5036008759/4164212795ec587e2d73467086569707.php';
var woffLink = 'http://127.0.0.1:8088/sysworkflow/en/neoclassic/1724828025eb722fb290be3084726097/8781117455eb7239b9baa98082875090.php';
var calcelipfLink = 'http://127.0.0.1:8088/sysworkflow/en/neoclassic/9041327775e5073c2d5e218012768462/5572014855e5073ef3ec4d6027571529.php';
var relegationLink = 'http://127.0.0.1:8088/sysworkflow/en/neoclassic/4349950325ec43f7b1adb75041979697/2352047595ec43f7b4874b7003538572.php';
var investigateLink = 'http://127.0.0.1:8088/sysworkflow/en/neoclassic/7939093745ebc5cfc32a607061999855/4148506665ebc5d89d4a4e5016911975.php';
var debtcollectorLink = '';

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
  repossessLink: repossessLink,
  woffLink: woffLink,
  calcelipfLink: calcelipfLink,
  relegationLink: relegationLink,
  investigateLink: investigateLink,
  debtcollectorLink:debtcollectorLink
};
