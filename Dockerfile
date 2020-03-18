### STAGE 1: Build ###
# base image
#FROM nginx:1.16.0-alpine
#FROM nginxinc/nginx-unprivileged 
FROM nginx:latest

COPY nginx.conf /etc/nginx/nginx.conf

# copy artifact build from the 'build environment'
COPY ecollect /usr/share/nginx/html

RUN chgrp -R root /var/cache/nginx /var/run /var/log/nginx && \
    chmod -R 770 /var/cache/nginx /var/run /var/log/nginx

# expose port 8880
EXPOSE 8880

# run nginx
CMD ["nginx", "-g", "daemon off;"]
# ng build --configuration=uat
# docker build -t 52.117.54.217:500/ecollect:test .
# docker tag migutak/ecollect:uat 172.16.19.151:5000/ecollect:uat
# docker push migutak/ecollect:1.0.0
# docker push 172.16.19.151:5000/ecollect:uat
# docker save -o migutak_ecollect.tar migutak/ecollect:1.0.0
#