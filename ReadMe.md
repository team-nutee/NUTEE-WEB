# NUTEE
## 성공회대학교 통합 커뮤니티 서비스
> 성공회대학교 교내 통항 커뮤니티 서비스의 웹 파트에 대한 설명입니다.   
    
    
    
## 사용 기술
<img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=JavaScript&logoColor=white" />&nbsp;<img src="https://img.shields.io/badge/CSS3-1572B6?style=flat-square&logo=CSS3&logoColor=white" />&nbsp;<img src="https://img.shields.io/badge/HTML5-E34F26?style=flat-square&logo=HTML5&logoColor=white" />&nbsp;<img src="https://img.shields.io/badge/React-61DAFB?style=flat-square&logo=React&logoColor=white" />
   
<img src="https://img.shields.io/badge/Redux-Saga-999999?style=flat-square&logo=Redux-Saga&logoColor=white" />&nbsp;<img src="https://img.shields.io/badge/Redux-764ABC?style=flat-square&logo=Redux&logoColor=white" />&nbsp;<img src="https://img.shields.io/badge/Next.js-000000?style=flat-square&logo=Next.js&logoColor=white" />&nbsp;<img src="https://img.shields.io/badge/ESlint-4B32C3?style=flat-square&logo=ESlint&logoColor=white" />&nbsp;<img src="https://img.shields.io/badge/Webpack-8DD6F9?style=flat-square&logo=Webpack&logoColor=white" />&nbsp;<img src="https://img.shields.io/badge/AntDesign-0170FE?style=flat-square&logo=AntDesign&logoColor=white" />
    
<img src="https://img.shields.io/badge/AmazonAWS-232F3E?style=flat-square&logo=AmazonAWS&logoColor=white" />&nbsp;
<img src="https://img.shields.io/badge/GitHub-181717?style=flat-square&logo=GitHub&logoColor=white" />&nbsp;<img src="https://img.shields.io/badge/Notion-000000?style=flat-square&logo=Notion&logoColor=white" />
   
Notion 회의록 : [NUTEE-WEB 회의록 링크](https://turquoise-countess-97d.notion.site/Web-ee029b9489a04061b55d50434a205fbb, "Nutee-web")
   
   
    
## 실행방법
------------
<pre>
1. NodeJS 설치
   
2. 파일 다운로드
  - (code - clone or download ZIP)
   
3. cmd or terminal로 npm 실행하여 의존성 설치
  - 설치 전 브랜치가 develop인지 확인(master만 보인다면 아래의 설명 참고)
  - (package.json 참고 - dependencies와 devDependencies에 적혀있는 것들 설치)
  - dependencies -> $ npm i oooo (ex. npm i react)
  - devDependencies -> $ npm i -D oooo (ex. npm i -D eslint)
   
4. cmd or terminal에서 $ npm run dev 실행
  - (NUTEE-WEB폴더에서 실행X, front폴더에서 실행!)
   
5. 웹브라우저를 실행하고 localhost:80 으로 접속
</pre> 

## 주요 브랜치 설명
<pre>
### branch
master : 배포용
develop : 개발용
</pre>
   
   
   
   
## 브랜치가 master만 보인다면?
<pre>
터미널 or cmd에 git checkout -t origin/develop 
develop branch 체크아웃
</pre>
   
   
## 구현된 기능
+ 로그인 페이지(/)
    + 비밀번호 찾기
    + 아이디 찾기
    
+ 메인 페이지(/, 홈, 로그인 후)
    + 왼쪽 콘텐츠(Box)
        + 사용자 프로필
        + 내페이지 및 설정 페이지 링크
        + 공지사항 콘텐츠(공통)
        + 링크 콘텐츠(공통, 학교 사이트 링크들)
    + 오른쪽 콘텐츠(Tab)
        + 게시글 작성 폼
        + 즐겨찾기 게시글 보기
        + 전공 게시글 보기
        + 전체 게시글 보기
    
+ 회원가입 페이지(/signup)
    + 아이디 입력 및 중복 검사
    + 닉네임 입력 및 중복 검사
    + 카테고리 설정
    + 전공 설정
    + 비밀번호 입력
    + 비밀번호 확인 입력
    + 이용약관 및 동의
    
+ 내 페이지(/profile)
    + 왼쪽 콘텐츠(Box)
        + 사용자 프로필
        + 설정 페이지 링크
        + 공지사항(공통)
        + 링크 콘텐츠(공통, 학교 사이트 링크들) 
    + 오른쪽 콘텐츠(Tab) 
        + 게시글 작성 폼
        + 내 게시글 
        + 댓글 쓴 게시글
        + 전체 게시글
    
+ 설정 페이지(/setting, Tab)
    + 프로필 이미지 설정
    + 전공 변경
    + 닉네임 변경
    + 비밀번호 변경
    + 카테고리 변경
    
+ 사용자 페이지(/user, Tab, 다른 사용자의 페이지)
    + 왼쪽 콘텐츠(Box)
        + 사용자 프로필
        + 공지사항(공통)
        + 링크 콘텐츠(공통, 학교 사이트 링크들) 
    + 오른쪽 콘텐츠 
        + 사용자 게시물
    
     
## 실행 이미지
------------
   
### 로그인
![로그인](https://user-images.githubusercontent.com/62700252/149049550-5b494504-ebdb-48ef-bc3c-c93dd9925440.PNG)
   
### 회원가입
![회원가입](https://user-images.githubusercontent.com/62700252/149049660-26ddfc01-6646-4fc1-90d8-d5c77a57078f.PNG)
   
### 홈
![홈](https://user-images.githubusercontent.com/62700252/149049615-26338910-5773-43a4-ac0d-f7a6481253c3.PNG)
   
### 내 페이지
![내페이지](https://user-images.githubusercontent.com/62700252/149049699-a0596d44-ae38-44e0-a7a7-aed7648889ff.PNG)
   
### 설정
![설정](https://user-images.githubusercontent.com/62700252/149049706-5f7e609e-7046-4222-84ad-04df847f8ec6.PNG)
   
### 검색
![검색](https://user-images.githubusercontent.com/62700252/149049730-f436a957-d938-419e-b0f0-31256043b18e.PNG)
   
### 검색 후
![검색 후](https://user-images.githubusercontent.com/62700252/149049736-29e182db-3e4b-4fc5-a9fd-0a844f6cdb47.PNG)
   
     
-------------

