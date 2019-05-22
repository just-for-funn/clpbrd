FROM nginx:1.16.0-alpine

COPY dist/clipboard/* /usr/share/nginx/html/
COPY dist/clipboard/assets /usr/share/nginx/html/assets
COPY default.conf /etc/nginx/conf.d/default.conf