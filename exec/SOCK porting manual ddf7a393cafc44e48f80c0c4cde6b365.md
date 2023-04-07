# SOCK porting manual

![Untitled](SOCK%20porting%20manual%20ddf7a393cafc44e48f80c0c4cde6b365/Untitled.png)

# 서비스 아키텍처

---

![Untitled](SOCK%20porting%20manual%20ddf7a393cafc44e48f80c0c4cde6b365/Untitled%201.png)

# 프로젝트 사용도구

---

이슈 관리 : JIRA

형상 관리 : Gitlab

커뮤니케이션 : Notion, Slack, Mattermost

디자인 : Figma

UCC : movavi, davinci resolve

CI/CD : Jenkins

개발 : IntelliJ, VScode

# 개발환경

---

> Spring 2.7.9
> 
> 
> React 18
> 
> JDK 11
> 
> Python 3.10
> 
> Node 14.21.2
> 
> Fastapi 0.95
> 
> EC2 Ubuntu 22.04.2
> 
> MySQL 8.0.32
> 

# 외부서비스

---

Google, Kakao, Naver OAuth : application.yml에 해당 내용 첨부

Firebase Storage : .env.local 파일에 해당 내용 첨부

# 환경변수 및 설정파일

---

### .env.local

```
# 로컬환경
REACT_APP_API_BASE_URL =
REACT_APP_API_BASE_FASTAPI_URL = 
REACT_APP_OAUTH2_REDIRECT_URI =

# 배포환경
REACT_APP_API_BASE_URL = 
REACT_APP_OAUTH2_REDIRECT_URI = 

# firebase database config - SDK
REACT_APP_APIKEY=
REACT_APP_AUTH_DOMAIN=
REACT_APP_DATABASE_URL=
REACT_APP_PROJECT_ID=
REACT_APP_STORAGE_BUCKET=
REACT_APP_MESSAGIN_ID=
REACT_APP_APP_ID=
REACT_APP_MEASUREMENT_ID=
```

### application.yml

```yaml
spring:
#Redis
  redis:
    host: 
    port: 6379

# DB
  datasource:
    driver-class-name: com.mysql.cj.jdbc.Driver
    url: jdbc:mysql://
    username: DB-username
    password: DB-password
  jpa:
    database-platform: org.hibernate.dialect.MySQL5InnoDBDialect
    hibernate:
      ddl-auto: update
    properties:
      hibernate:
        format_sql: true
        default_batch_fetch_size: 100

# 스프링 시큐리티
  security:
    oauth2:
      client:
        registration:
          google:
            clientId: OAuth-클라이언트-id
            clientSecret: OAuth-클라이언트-secreat
            redirectUri: OAuth-클라이언트-redirectUri
            scope:
              - email
              - profile
          kakao:
            client-id: OAuth-클라이언트-id
            client-secret: OAuth-클라이언트-secreat
            redirect-uri: OAuth-클라이언트-redirectUri
            authorization-grant-type: authorization_code
            client-authentication-method: POST
            client-name: kakao
            scope:
              - profile_nickname
              - account_email
              - profile_image
          naver:
            client-id: OAuth-클라이언트-id
            client-secret: OAuth-클라이언트-secreat
            redirect-uri: OAuth-클라이언트-redirectUri
            authorization-grant-type: authorization_code
            scope:
              - nickname
              - email
              - profile_image
              - id
            client-name: naver
        provider:
          kakao:
            authorization-uri: https://kauth.kakao.com/oauth/authorize
            token-uri: https://kauth.kakao.com/oauth/token
            user-info-uri: https://kapi.kakao.com/v2/user/me
            user-name-attribute: id
          naver:
            authorization_uri: https://nid.naver.com/oauth2.0/authorize
            token_uri: https://nid.naver.com/oauth2.0/token
            user-info-uri: https://openapi.naver.com/v1/nid/me
            user_name_attribute: response

logging:
  level:
    org:
      hibernate:
        SQL: debug

# JWT
app:
  auth:
    tokenSecret: 
    tokenExpirationMsec: 

springdoc:
  version: 'v1'
  default-consumes-media-type: application/json
  default-produces-media-type: application/json
  swagger-ui:
    path: sock-api
    enabled: true
    disable-swagger-default-url: true
    display-query-params-without-oauth2: true
```

---

# 배포

---

## NGINX설정

```bash
upstream backend{
    server 호스트ip:8000;
}
upstream frontend{
    server 호스트ip:3000;
}
upstream fastapi{
    server 호스트ip:9000;
}

server{
    listen 80;
    server_name  서비스URL;

    location / {
        return 301 https://$host$request_uri;
    }

    location /.well-known/acme-challenge/ {
        allow all;
        root /var/www/certbot;
    }
}

server {
    listen  443 ssl;
    server_name 서비스URL;

    location / {
        proxy_pass http://frontend;
        proxy_redirect     off;
        proxy_set_header   Host $host;
        proxy_set_header   X-Real-IP $remote_addr;
        proxy_set_header   X-Forwarded-For $proxy_add_x_forwarded_for;
    }

    location /api/ {
        proxy_pass http://backend/;
        proxy_redirect     off;
        proxy_set_header   Host $host;
        proxy_set_header   X-Real-IP $remote_addr;
        proxy_set_header   X-Forwarded-For $proxy_add_x_forwarded_for;
    }

    location /oauth {
        proxy_pass http://backend;
        proxy_redirect     off;
        proxy_set_header   Host $host;
        proxy_set_header   X-Real-IP $remote_addr;
        proxy_set_header   X-Forwarded-For $proxy_add_x_forwarded_for;
    }

    location /fastapi {
        proxy_pass http://fastapi;
        proxy_redirect     off;
        proxy_set_header   Host $host;
        proxy_set_header   X-Real-IP $remote_addr;
        proxy_set_header   X-Forwarded-For $proxy_add_x_forwarded_for;
    }

    ssl_certificate /etc/letsencrypt/live/server-name폴더/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/server-name폴더/privkey.pem;
}
```

### Docker-compose.yml

```yaml
services:
  redis:
    container_name: redis
    image: redis
    ports:
      - "6379:6379"
  backend:
    container_name: backend
    build:
      context: ./back/sock
    ports:
      - "8000:8000"
    restart: unless-stopped
    depends_on:
      - mysql
      - redis

  frontend:
    container_name: frontend
    build:
      context: ./front
    ports:
      - "3000:3000"
    restart: unless-stopped

  mysql:
    container_name: mysql
    build:
      context: ./db
    ports:
      - "3306:3306"
    volumes:
      - /var/lib/mysql:/var/lib/mysql
    environment:
      MYSQL_ROOT_PASSWORD: 1234
    restart: unless-stopped

  nginx:
    build:
      context: ./nginx
    container_name: nginx
    ports:
      - "80:80"
      - "443:443"
    restart: always
    volumes:
      - /etc/letsencrypt:/etc/letsencrypt
    depends_on:
      - backend
      - frontend
    command: "/bin/sh -c 'while :; do sleep 6h & wait $${!}; nginx -s reload; done & nginx -g \"daemon off;\"'"

  certbot:
    container_name: certbot
    image: certbot/certbot:latest
    volumes:
      - /etc/letsencrypt:/etc/letsencrypt
      - /var/www/certbot:/var/www/certbot
    entrypoint: "/bin/sh -c 'trap exit TERM; while :; do certbot renew; sleep 12h & wait $${!}; done;'"
    depends_on:
      - nginx

  fastapi:
    container_name: fastapi
    build:
      context: ./AI
    ports:
      - "9000:9000"
    restart: unless-stopped
    volumes:
      - my-fastapi-volume:/code
    depends_on:
      - mysql

volumes:
  my-fastapi-volume:
    external: true
```
