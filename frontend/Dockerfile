# run me with context as frontend app dir
FROM node AS build

COPY . .

RUN npm install
RUN npm run build

FROM nginx:stable

COPY --from=build /build/ /var/www
COPY ./nginx.conf /etc/nginx/conf.d/default.conf

CMD ["/bin/bash", "-c", "nginx -g 'daemon off;'"]
