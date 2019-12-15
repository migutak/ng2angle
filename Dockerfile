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
# docker build -t migutak/ecollect:1.0.0 .
# docker push migutak/ecollect:1.0.0
# docker save -o migutak_ecollect.tar migutak/ecollect:1.0.0
#
#