### STAGE 1: Build ###
# base image
FROM nginx:1.17.1-alpine

COPY nginx.conf /etc/nginx/nginx.conf

# copy artifact build from the 'build environment'
COPY ecollect /usr/share/nginx/html

RUN chgrp -R root /var/cache/nginx /var/run /var/log/nginx && \
    chmod -R 770 /var/cache/nginx /var/run /var/log/nginx

# expose port 8880
EXPOSE 8880

# run nginx
CMD ["nginx", "-g", "daemon off;"]
#