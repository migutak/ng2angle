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
var woffLink = 'http://172.16.204.71:8089/sysworkflow/en/neoclassic/1724828025eb722fb290be3084726097/8781117455eb7239b9baa98082875090.php';
var repossessLink = 'http://172.16.204.71:8089/sysworkflow/en/neoclassic/3794983825efb4146de0f07066276994/4785671285efb41c0945730007935178.php';
var calcelipfLink = 'http://172.16.204.71:8089/sysworkflow/en/neoclassic/9041327775e5073c2d5e218012768462/5572014855e5073ef3ec4d6027571529.php';
var relegationLink = 'http://172.16.204.71:8089/sysworkflow/en/neoclassic/7424622735ef34e4a15a489065096514/4363139305ef34e4a43b934042572210.php';
var investigateLink = 'http://172.16.204.71:8089/sysworkflow/en/neoclassic/7939093745ebc5cfc32a607061999855/4148506665ebc5d89d4a4e5016911975.php';
var debtcollectorLink = '';


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
  accountallocationtemplate: '/app/templates/account.xlsx',
  employerallocationtemplate: '/app/templates/employer.xlsx',
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
  relegationLink: relegationLink,
  platformDash: "http://ecollecttst.co-opbank.co.ke:3030/d/hb7fSE0Zz/1-node-exporter-for-prometheus-dashboard-en-v20191102?orgId=1",
  rollratesdash: 'http://172.16.19.151:5601/app/kibana#/dashboard/2635e190-d89a-11ea-9a3b-a19986078728?_g=(filters%3A!()%2CrefreshInterval%3A(pause%3A!f%2Cvalue%3A10000)%2Ctime%3A(from%3Anow-1h%2Cto%3Anow))',
  userbucketdash: 'http://172.16.19.151:5601/app/kibana#/dashboard/6d2971d0-d899-11ea-9a3b-a19986078728?_g=(filters%3A!()%2CrefreshInterval%3A(pause%3A!f%2Cvalue%3A10000)%2Ctime%3A(from%3Anow-1h%2Cto%3Anow))'
};
