FROM nginx
COPY default.conf /etc/nginx/conf.d/default.conf
COPY /build  /usr/share/nginx/html

CMD ["nginx", "-g", "daemon off;"]

