var host = process.env.BACKEND_HOST || 'http://172.16.19.151';
var woffLink = '';
var repossessLink = 'http://172.16.19.151:8089/sysworkflow/en/neoclassic/5648407625ec5121f9f7710015775407/3075674825ec512c0466079089753457.php';
var calcelipfLink = 'http://172.16.19.151:8089/sysworkflow/en/neoclassic/9041327775e5073c2d5e218012768462/5572014855e5073ef3ec4d6027571529.php';
var relegationLink = 'http://172.16.19.151:8089/sysworkflow/en/neoclassic/4349950325ec43f7b1adb75041979697/2352047595ec43f7b4874b7003538572.php';
var investigateLink = '';

export const environment = {
  production: true,
  adlogin: false,
  sendsms: false,
  api: host + ':8000',
  nodeapi: host + '6001/nodeapi',
  letters_path: '/home/ecollectadmin/demand_letters/',
  letters_api: host + '8004/docx/',
  uploadurl: host + '3100/filesapi',
  demanddownload: host + ':3100',
  valor: host + '3100/filesapi',
  applink: host,
  xlsuploadapi: host + ':5001/xlsupload/',
  xlstemplate: '/home/ecollectadmin/templates/upload_notes.xlsx',
  emailapi: host + '8005/demandemail/email',
  demandsmsapi: host + "/sms",
  auth: host + '/adlogin',
  filesapi: host + ':3100/filesapi',
  accplanlink: host + ':3001',
  kibanarpt: host + ':5601',
  manuals_path: '/app/manuals/',
  birt: ':8080/birt',
  kibana: host +  ':5601/app/kibana#/dashboard?_g=0',
  portfoliodash: '',
  portal: host + ':4300',
  accplanreport: '',
  ptpreport: ''
  ,homedash: host + ':5601/goto/f893ccd125308885e80090233919f80e?embed=true',
  workflow: host + ':8089/sysworkflow/en/neoclassic/login/login',
  repossessLink: repossessLink,
  woffLink: woffLink,
  calcelipfLink: calcelipfLink,
  relegationLink: relegationLink,
  investigateLink: investigateLink
};
