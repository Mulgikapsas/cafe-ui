FROM gmathieu/node-browsers:3.0.0 AS build

COPY package.json /usr/angular-workdir/
WORKDIR /usr/angular-workdir
RUN npm install

COPY ./ /usr/angular-workdir
RUN npm run build

FROM nginx:1.15.8-alpine

## Remove default nginx website
RUN rm -rf /usr/share/nginx/html/*

COPY ./dev/nginx.conf /etc/nginx/nginx.conf

COPY --from=build  /usr/angular-workdir/dist/cafeapp /usr/share/nginx/html
RUN chmod 777 -R /usr/share/nginx
RUN chown 1001:root -R /usr/share/nginx


USER 1001

ENTRYPOINT ["nginx", "-g", 'daemon',"off"]
