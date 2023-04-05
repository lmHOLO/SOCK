# 과자 맞춤 추천 서비스, SOCK

![sock-logo-color](https://user-images.githubusercontent.com/89503136/230081905-39f6ad61-ba5d-477c-b7c0-843e13eb3477.png)

## 1. 프로젝트 개요

### 1) 프로젝트 목표

늘 똑같은 과자에 질린 사람, 새로운 과자를 원하는 사람들을 위한 과자 맞춤 추천 서비스

### 2) 주요 기능 ⚙

1. 사용자 취향 분석을 통한 과자 맞춤 추천
2. 테마별 과자 추천
3. 과자 정보 확인, 리뷰 작성, 좋아요 추가
4. 레시피 작성, 댓글, 좋아요 추가
5. 추천 레시피, 유사한 상품 목록 조회
6. 과자 이상형 월드컵, 과자 MBTI 등 이벤트

### 3) 전체 일정 📅

23.02.20 ~ 23.04.07 (6주)

| 기간          | 내용                                 |
| ------------- | ------------------------------------ |
| 02.20 ~ 02.22 | 아이디어 선정                        |
| 02.23 ~ 02.27 | 요구사항 분석 및 기능 명세서 작성,   |
| 02.28 ~ 03.03 | 와이어프레임, REST API 작성,         |
| 03.06 ~ 03.10 | 회원가입, 로그인 등 회원 서비스 개발 |
| 03.13 ~ 03.24 | 과자, 레시피 기능 개발               |
| 03.27 ~ 03.31 | 서비스 배포 자동화                   |
| 04.03 ~ 04.07 | 서비스 유지보수                      |

### 4) 구성원 🥰

<table>
  <tr>
    <td align="center"><b>Name</b></td>
    <td align="center"><b>김건현</b></td>
    <td align="center"><b>고영석</b></td>
    <td align="center"><b>김수빈</b></td>
    <td align="center"><b>서영탁</b></td>
    <td align="center"><b>이채은</b></td>
    <td align="center"><b>정민우</b></td>
  </tr>
  <tr>
    <td align="center"><b>Github</b></td>
    <td align="center"><a href="https://github.com/gggeon96"><img src="https://avatars.githubusercontent.com/u/39759666?v=4" width="100px;" alt=""/></td>
    <td align="center"><a href="https://github.com/imnooy"><img src="https://avatars.githubusercontent.com/u/75800620?v=4" width="100px;" alt=""/></td>
    <td align="center"><a href="https://github.com/tabss2003"><img src="https://avatars.githubusercontent.com/u/43884708?v=4" width="100px;" alt=""/><br /></td>
    <td align="center"><a href="https://github.com/0takkk"><img src="https://avatars.githubusercontent.com/u/89503136?s=400&v=4" width="100px;" alt=""/><br /></td>
    <td align="center"><a href="https://github.com/rachaen"><img src="https://avatars.githubusercontent.com/u/78066837?v=4" width="100px;" alt=""/><br /></td>
    <td align="center"><a href="https://github.com/0takkk"><img src="https://avatars.githubusercontent.com/u/89503136?s=400&v=4" width="100px;" alt=""/><br /></td>
  </tr>
  <tr>
    <td align="center"><b>Position</b></td>
    <td align="center"><b>👑 Backend</b></td>
    <td align="center"><b>Frontend</b></td>
    <td align="center"><b>Backend</b></td>
    <td align="center"><b>Backend</b></td>
    <td align="center"><b>Frontend</b></td>
    <td align="center"><b>Frontend / AI</b></td>
  </tr>
</table>

<br>

## 2. 프로젝트 설계

### 1) [피그마](https://www.figma.com/file/9kJFJj9jMh0RsnJRDrtD5y/SOCK-%EC%8F%99?node-id=555-2594&t=RxoqHeSvt11Ep7XA-0)

### 2) 개발환경

| Backend            | FestAPI | Frontend   | CI      | Collaboration Tools |
| ------------------ | ------- | ---------- | ------- | ------------------- |
| Java 11            |         | React      | AWS EC2 | GitLab              |
| Spring Boot Gradle |         | TypeScript | Docker  | Jira                |
| Spring Data JPA    |         | node.js    | Jenkins | Notion              |
| QueryDSL           |         | Redux      |         | Discord             |
| JWT                |         | Firebase   |         |                     |
| Spring Security    |         |            |         |                     |
| MySQL              |         |            |         |                     |
| Redis              |         |            |         |                     |

### 3) ERD

<img width="973" alt="image" src="https://user-images.githubusercontent.com/89503136/230094798-063f31ec-1e39-4217-95b9-ced06e703ccf.png">

### 4) 아키텍처

<img width="704" alt="image" src="https://user-images.githubusercontent.com/89503136/219449502-62d3b139-7735-40ee-a4d3-d92d54cf7b93.png">

### 5) [REST API](https://www.notion.so/API-677411b5c72c41cdb1e88bad01abd363?pvs=4)

</br>

## 3. 프로젝트 소개
