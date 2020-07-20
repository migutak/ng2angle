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
  api: '',
  nodeapi: '/nodeapi',
  letters_path: path,
  letters_api: '/docx/',
  uploadurl: '/filesapi',
  demanddownload: '/demanddownload',
  valor: '/valor',
  applink: host,
  xlsuploadapi: '/xlsupload/',
  xlstemplate: xlstemplate,
  sptemplate: '/app/templates/sptemplate.xlsx',
  insurancetemplate: '/app/templates/insurance.xlsx',
  emailapi: '/demandemail/email',
  demandsmsapi: "/sms",
  auth: auth,
  filesapi: '/filesapi',
  s3link: '/files-to-s3',
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
  relegationLink: relegationLink,
  platformDash: "http://52.117.93.88.nip.io:30041/goto/abafb13b1352b327883879c096c8d60d"

};
