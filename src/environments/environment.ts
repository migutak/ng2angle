// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

var host = 'http://localhost:';
var manuals = 'C:\\ecol_manuals\\';
var path = 'd:\\demands\\';
var ptpreport = '';
var homedash = '';
var workflow = host + '8088/sysworkflow/en/neoclassic/login/login';
var portfoliodash = '';
var accplanreport = '';
var xlstemplate = 'C:\\templates\\upload_notes.xlsx';
var repossessLink = 'http://127.0.0.1:8088/sysworkflow/en/neoclassic/4437708915ec5876a680fe5036008759/4164212795ec587e2d73467086569707.php';
var woffLink = 'http://127.0.0.1:8088/sysworkflow/en/neoclassic/1724828025eb722fb290be3084726097/8781117455eb7239b9baa98082875090.php';
var calcelipfLink = 'http://127.0.0.1:8088/sysworkflow/en/neoclassic/9041327775e5073c2d5e218012768462/5572014855e5073ef3ec4d6027571529.php';
var relegationLink = 'http://127.0.0.1:8088/sysworkflow/en/neoclassic/8205775405e4a5988583577039544223/9240230545e4a59d9288998029903648.php';
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
  s3link: host + '8010/app/files-to-s3',
  auth: host + '/adlogin',
  filesapi: host + '3000/filesapi', // activityupload
  accplanlink: host + 3001,
  kibanarpt: host + 5601,
  birt: host + '8787/birt',
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
