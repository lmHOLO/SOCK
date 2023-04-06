FROM gradle:7.4-jdk11-alpine as builder
WORKDIR /app
COPY . .
RUN gradle clean build -x test --parallel

# APP
FROM openjdk:11-jdk
WORKDIR /app
COPY --from=builder /app/build/libs/sock-0.0.1-SNAPSHOT.jar .
CMD ["java", "-Duser.timezone=Asia/Seoul" ,"-jar", "sock-0.0.1-SNAPSHOT.jar"]