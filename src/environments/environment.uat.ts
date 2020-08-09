var host = process.env.BACKEND_HOST || 'http://172.16.19.151:';
var woffLink = 'http://172.16.19.151:8089/sysworkflow/en/neoclassic/1724828025eb722fb290be3084726097/8781117455eb7239b9baa98082875090.php';
var repossessLink = 'http://172.16.19.151:8089/sysworkflow/en/neoclassic/3794983825efb4146de0f07066276994/4785671285efb41c0945730007935178.php';
var calcelipfLink = 'http://172.16.19.151:8089/sysworkflow/en/neoclassic/9041327775e5073c2d5e218012768462/5572014855e5073ef3ec4d6027571529.php';
var relegationLink = 'http://172.16.19.151:8089/sysworkflow/en/neoclassic/7424622735ef34e4a15a489065096514/4363139305ef34e4a43b934042572210.php';
var investigateLink = 'http://172.16.19.151:8089/sysworkflow/en/neoclassic/7939093745ebc5cfc32a607061999855/4148506665ebc5d89d4a4e5016911975.php';
var debtcollectorLink = '';

export const environment = {
  production: true,
  adlogin: false,
  sendsms: false,
  api: host + '8000',
  nodeapi: host + '6001/nodeapi',
  letters_path: '/home/ecollectadmin/demand_letters/',
  letters_api: host + '8004/docx/',
  uploadurl: host + '3100/filesapi',
  demanddownload: host + '3100',
  valor: host + '3100/filesapi',
  applink: host,
  xlsuploadapi: host + '5001/xlsupload/',
  xlstemplate: '/app/templates/upload_notes.xlsx',
  sptemplate: '/app/templates/sptemplate.xlsx',
  insurancetemplate: '/app/templates/insurance.xlsx',
  emailapi: host + '8005/demandemail/email',
  demandsmsapi: host + "/sms",
  auth: host + '/adlogin',
  filesapi: host + '3100/filesapi',
  s3link: host + '8010/app/files-to-s3',
  accplanlink: host + '3001',
  kibanarpt: host + '5601',
  manuals_path: '/app/manuals/',
  birt: host + '8080/birt',
  kibana: host +  '5601/app/kibana#/dashboard?_g=0',
  portfoliodash: 'http://172.16.19.151:5601/app/kibana#/dashboard/8eaf9600-d70d-11ea-9a3b-a19986078728?_g=(filters%3A!()%2CrefreshInterval%3A(pause%3A!f%2Cvalue%3A10000)%2Ctime%3A(from%3Anow-1h%2Cto%3Anow))',
  portal: host + '4300',
  accplanreport: '',
  ptpreport: '',
  homedash: host + '5601/goto/f893ccd125308885e80090233919f80e?embed=true',
  workflow: host + '8089/sysworkflow/en/neoclassic/login/login',
  repossessLink: repossessLink,
  woffLink: woffLink,
  calcelipfLink: calcelipfLink,
  relegationLink: relegationLink,
  investigateLink: investigateLink,
  debtcollectorLink: debtcollectorLink,
  platformDash: "http://ecollecttst.co-opbank.co.ke:3030/d/hb7fSE0Zz/1-node-exporter-for-prometheus-dashboard-en-v20191102?orgId=1",
  rollratesdash: 'http://172.16.19.151:5601/app/kibana#/dashboard/2635e190-d89a-11ea-9a3b-a19986078728?_g=(filters%3A!()%2CrefreshInterval%3A(pause%3A!f%2Cvalue%3A10000)%2Ctime%3A(from%3Anow-1h%2Cto%3Anow))',
  userbucketdash: 'http://172.16.19.151:5601/app/kibana#/dashboard/6d2971d0-d899-11ea-9a3b-a19986078728?_g=(filters%3A!()%2CrefreshInterval%3A(pause%3A!f%2Cvalue%3A10000)%2Ctime%3A(from%3Anow-1h%2Cto%3Anow))'
};
