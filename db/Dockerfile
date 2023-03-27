FROM mysql:latest

# MySQL 설정 파일
COPY my.cnf /etc/mysql/conf.d/my.cnf

# 볼륨 설정
VOLUME ["/var/lib/mysql"]

# MySQL 컨테이너 시작 시 실행될 SQL 스크립트
COPY init.sql /docker-entrypoint-initdb.d/init.sql