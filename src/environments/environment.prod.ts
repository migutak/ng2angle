var host = process.env.BACKEND_HOST || 'https://ecollectweb.co-opbank.co.ke';
var manuals = process.env.MANUAL || '/app/manuals/';
var path = process.env.BACKEND_PATH || '/home/ecollectadmin/demand_letters/';
var accplanlink = process.env.ACCPLANLINK || 'http://172.16.204.71:3001';
var kibanarpt = process.env.KIBANA || 'http://ecollectweb.co-opbank.co.ke:5601';
var birt = process.env.BIRT || 'http://ecollectweb.co-opbank.co.ke:8787/birt';
var ptpreport = process.env.PTPREPORT || '';
var homedash = process.env.HOMEDASH || '';
var workflow = process.env.WORKFLOW || '';
var portfoliodash = process.env.PORTFOLIODASH || '';
var accplanreport = process.env.ACCPLANREPORT || '';
var xlstemplate = process.env.XLSTEMPLATE || '/home/ecollectadmin/templates/upload_notes.xlsx';
var portal = process.env.PORTAL || '';
var auth = process.env.AUTH || 'https://ecollectweb.co-opbank.co.ke/adlogin';
var woffLink = '';
var repossessLink = '';
var calcelipfLink = '';
var investigateLink= '';
var debtcollectorLink= '';
var relegationLink= '';


export const environment = {
  production: true,
  adlogin: false,
  sendsms: false,
  api: host,
  nodeapi: host + '/nodeapi',
  letters_path: path,
  letters_api: host + '/docx/',
  uploadurl: host + '/filesapi',
  demanddownload: host + '/demanddownload',
  valor: host + '/valor',
  applink: host,
  xlsuploadapi: host + '/xlsupload/',
  xlstemplate: xlstemplate,
  sptemplate: '/app/templates/sptemplate.xlsx',
  insurancetemplate: '/app/templates/insurance.xlsx',
  emailapi: host + '/demandemail/email',
  demandsmsapi: host + "/sms",
  auth: auth,
  filesapi: host + '/filesapi',
  s3link: host + '8010/app/files-to-s3',
  accplanlink: accplanlink,
  kibanarpt: kibanarpt,
  manuals_path: manuals,
  birt: birt,
  kibana: kibanarpt,
  portfoliodash: portfoliodash,
  portal: portal,
  accplanreport: accplanreport,
  ptpreport: ptpreport,
  homedash: homedash,
  workflow: workflow,
  repossessLink: repossessLink,
  woffLink: woffLink,
  calcelipfLink: calcelipfLink,
  investigateLink: investigateLink,
  debtcollectorLink: debtcollectorLink,
  relegationLink: relegationLink
};
