var OCPURL = process.env.OCPURL || '-ecollect.myocp-580729-bef98cd54cd05ea40763fca46bf638de-0000.us-south.containers.appdomain.cloud';
var ptpreport = process.env.PTPREPORT || '';
var homedash = process.env.HOMEDASH || '';
var workflow = process.env.WORKFLOW || '';
var portfoliodash = process.env.PORTFOLIODASH || '';
var accplanreport = process.env.ACCPLANREPORT || '';
var xlstemplate = process.env.XLSTEMPLATE || '/root/templates/upload_notes.xlsx';
var portal = process.env.PORTAL || '';

export const environment = {
  production: true,
  adlogin: false,
  sendsms: true,
  api: 'https://ecollectapis' + OCPURL,
  nodeapi: 'https://nodeapi'+ OCPURL +'/nodeapi',
  letters_path: '/home/ecollectadmin/demand_letters/',
  letters_api: 'https://docx'+ OCPURL +'/docx/',
  uploadurl: 'https://filesapi'+ OCPURL +'/filesapi',
  demanddownload: 'https://demanddownload'+ OCPURL +'/demanddownload',
  valor: 'https://valor'+ OCPURL +'/valor',
  applink: '',
  xlsuploadapi: 'https://xlsupload'+ OCPURL +'/xlsupload/',
  xlstemplate: xlstemplate,
  emailapi: 'https://demandemail'+ OCPURL +'/demandemail/email',
  demandsmsapi: 'https://sms'+ OCPURL +'/sms',
  auth: 'https://adlogin'+ OCPURL +'/adlogin',
  filesapi: 'https://filesapi'+ OCPURL +'/filesapi',
  accplanlink: 'https://accplan'+ OCPURL +'',
  kibanarpt: 'https://kibana-'+ OCPURL +'',
  manuals_path: '/app/manuals/',
  birt: 'https://birt-'+ OCPURL +'/birt',
  portfoliodash: portfoliodash,
  portal: portal,
  accplanreport: accplanreport,
  ptpreport: ptpreport,
  kibana: 'https://kibana-'+ OCPURL,
  homedash: homedash,
  workflow: workflow
};

