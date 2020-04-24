### STAGE 1: Build ###
FROM node:10-alpine as builder

# Set to a non-root built-in user `node`
USER node

# Create app directory (with user `node`)
RUN mkdir -p /home/node/app

WORKDIR /home/node/app
COPY --chown=node package.json ./
RUN npm install
COPY --chown=node . .



## Build the angular app in production mode and store the artifacts in dist folder
ARG NG_ENV=production
RUN npm run ng build --configuration=$NG_ENV

### STAGE 2: Run ###
FROM nginx:1.17.1-alpine
COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=builder /home/node/app/ecollect /usr/share/nginx/html

# expose port 8880
EXPOSE 8880

CMD ["nginx", "-g", "daemon off;"]

# docker build -t migutak/ecollect:3.0.0 -f Dockerfile2 .
