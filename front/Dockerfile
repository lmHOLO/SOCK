FROM node:18-alpine AS builder
COPY . .
RUN yarn install && yarn build

FROM nginx
COPY --from=builder default.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /build  /usr/share/nginx/html

CMD ["nginx", "-g", "daemon off;"]

