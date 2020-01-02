NUTEE
=========
성공회대학교 통합 커뮤니티 서비스
---------
프로젝트 실행방법(windows)
<pre>
1. NodeJS 설치

2. mysql  설치

3. back 디렉토리에서 .env 파일 생성하여 COOKIE_SECRET과 DB_PASSWORD 설정
ex)COOKIE_SECRET=cookiesecret
   DB_PASSWORD=12345678
!!) .env 파일은 절대로 깃에 공유되면 안된다.

4. back 폴더의 config.js에서 각자의 mysql 환경에 맞게 설정

5. front와 back 디렉토리에서 각각 cmd 창으로 npm i 실행하여 의존성 설치

6. 각각의 디렉토리에서 cmd 창으로 npm run dev 실행

7. 웹브라우저를 실행하고 localhost:3000 으로 접속
</pre>
aaaa