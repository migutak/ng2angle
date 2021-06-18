var host = process.env.BACKEND_HOST || 'https://157.245.253.243.nip.io';
var woffLink = 'http://157.245.253.243:8089/sysworkflow/en/neoclassic/1724828025eb722fb290be3084726097/8781117455eb7239b9baa98082875090.php';
var repossessLink = 'http://157.245.253.243:8089/sysworkflow/en/neoclassic/3794983825efb4146de0f07066276994/4785671285efb41c0945730007935178.php';
var calcelipfLink = 'http://157.245.253.243:8089/sysworkflow/en/neoclassic/9041327775e5073c2d5e218012768462/5572014855e5073ef3ec4d6027571529.php';
var relegationLink = 'http://157.245.253.243:8089/sysworkflow/en/neoclassic/7424622735ef34e4a15a489065096514/4363139305ef34e4a43b934042572210.php';
var investigateLink = 'http://157.245.253.243:8089/sysworkflow/en/neoclassic/7939093745ebc5cfc32a607061999855/4148506665ebc5d89d4a4e5016911975.php';
var debtcollectorLink = '';

export const environment = {
  production: true,
  adlogin: false,
  sendsms: false,
  api: host,
  nodeapi: host + '/nodeapi',
  letters_path: '/home/ecollectadmin/demand_letters/',
  letters_api: host + ':8004/docx/',
  uploadurl: host + ':3100/filesapi',
  demanddownload: host + '3100',
  valor: host + ':3100/filesapi',
  applink: host,
  xlsuploadapi: host + ':5001/xlsupload/',
  xlstemplate: '/app/templates/upload_notes.xlsx',
  sptemplate: '/app/templates/sptemplate.xlsx',
  insurancetemplate: '/app/templates/insurance.xlsx',
  accountallocationtemplate: '/app/templates/account.xlsx',
  employerallocationtemplate: '/app/templates/employer.xlsx',
  emailapi: host + ':8005/demandemail/email',
  demandsmsapi: host + "/sms",
  auth: host + '/adlogin',
  filesapi: host + ':3100/filesapi',
  s3link: host + ':8010/app/files-to-s3',
  accplanlink: host + ':3001',
  kibanarpt: host + ':5601',
  manuals_path: '/app/manuals/',
  birt: host + ':8080/birt',
  kibana: host +  ':5601/app/kibana#/dashboard?_g=0',
  portfoliodash: 'https://157.245.253.243:5601/app/kibana',
  portal: host + ':4300',
  accplanreport: '',
  ptpreport: '',
  homedash: host + ':5601/goto/f893ccd125308885e80090233919f80e?embed=true',
  workflow: host + ':8089/sysworkflow/en/neoclassic/login/login',
  repossessLink: repossessLink,
  woffLink: woffLink,
  calcelipfLink: calcelipfLink,
  relegationLink: relegationLink,
  investigateLink: investigateLink,
  debtcollectorLink: debtcollectorLink,
  platformDash: "https://172.16.19.151:5601/goto/c7a30355bcd476a1f1028c1f150e58b0",
  rollratesdash: 'https://157.245.253.243:5601/app/kibana',
  userbucketdash: 'https://157.245.253.243:5601/app/kibana',
  elasticsearch: 'https://157.245.253.243:8881',
  logsDash: "https://172.16.19.151:5601/goto/0a0a4f2303fb19ed1cdaa583dc0efa56",
  requestsDash: "https://172.16.19.151:5601/goto/c7a30355bcd476a1f1028c1f150e58b0"

};
