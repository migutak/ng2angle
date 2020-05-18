var host = process.env.BACKEND_HOST || 'http://172.16.19.151';

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
  workflow: host + ':8089/sysworkflow/en/neoclassic/login/login'
};
