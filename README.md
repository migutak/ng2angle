# E-Collect

node --max-old-space-size=8192 node_modules/@angular/cli/bin/ng build --configuration=uat
docker run -it -d --name oracledb -e DB_HOST="172.16.20.2" -e DB_PORT=1523 -e DB_USER=ecol -e DB_PASSWORD=DsQSnttm_1 -e DB_DATABASE=ECOLTST -p 6001:6001 quay.io/migutak/oracledb-apis-lb4 
