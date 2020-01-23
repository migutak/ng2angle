### STAGE 1: Build ###
# base image
FROM nginx:1.16.0-alpine

COPY nginx.conf /etc/nginx/nginx.conf

# copy artifact build from the 'build environment'
COPY ecollect /usr/share/nginx/html

# expose port 80
EXPOSE 80

# run nginx
CMD ["nginx", "-g", "daemon off;"]
# ng build --configuration=uat
# docker build -t migutak/ecollect:2.0.0 .
# docker tag migutak/ecollect:2.0.0 172.16.19.151:5000/ecollect:2.0.0
# docker push migutak/ecollect:1.0.0
# docker push 172.16.19.151:5000/ecollect:u.0.0
# docker save -o migutak_ecollect.tar migutak/ecollect:1.0.0
#