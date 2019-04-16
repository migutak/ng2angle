FROM nginx:alphine
COPY nginx.conf /etc/nginx/nginx.conf
COPY ecollect /usr/share/nginx/html