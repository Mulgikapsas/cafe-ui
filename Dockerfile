FROM node:10.16.3-alpine as node

WORKDIR /opt/
COPY package.json .
RUN npm install
COPY . .
COPY nginx.conf /etc/nginx/
RUN ./node_modules/@angular/cli/bin/ng build

FROM nginx
RUN rm /usr/share/nginx/html/*
RUN mkdir -p /var/cache/nginx/ && chmod 777 -R /var/cache/ && chmod 777 -R /etc/nginx/ && chmod 777 -R /usr/share/nginx/ && chmod 777 -R /var/log/nginx
COPY --from=node /opt/dist/. /usr/share/nginx/html/
