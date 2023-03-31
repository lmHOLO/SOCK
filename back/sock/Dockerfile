# FROM gradle:7.4-jdk11-alpine as builder

# # 그래들 파일이 변경되었을 때만 새롭게 의존패키지 다운로드 받게함.
# COPY build.gradle ./
# COPY settings.gradle ./
# RUN gradle build -x test --parallel --continue  > /dev/null 2>&1 || true
# # 빌더 이미지에서 애플리케이션 빌드
# COPY . .
# RUN gradle clean build -x test --parallel

# # APP
# FROM openjdk:11-jdk
# # 빌더 이미지에서 jar 파일만 복사
# COPY --from=builder /build/libs/sock-0.0.1-SNAPSHOT.jar .

# EXPOSE 8000

# # root 대신 nobody 권한으로 실행
# # USER nobody
# ENTRYPOINT [                                                \
#     "java",                                                 \
#     "-jar",                                                 \
#     "-Djava.security.egd=file:/dev/./urandom",              \
#     "-Dsun.net.inetaddr.ttl=0",                             \
#     "sock-0.0.1-SNAPSHOT.jar"              \
# ]

FROM gradle:7.4-jdk11-alpine as builder
WORKDIR /app
COPY . .
RUN gradle clean build -x test --parallel

# APP
FROM openjdk:11-jdk
WORKDIR /app
COPY --from=builder /app/build/libs/sock-0.0.1-SNAPSHOT.jar .
# root 대신 nobody 권한으로 실행
# USER nobody
CMD ["java", "-jar", "sock-0.0.1-SNAPSHOT.jar"]