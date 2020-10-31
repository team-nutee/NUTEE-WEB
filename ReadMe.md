NUTEE
=========
성공회대학교 통합 커뮤니티 서비스
---------
프로젝트 실행방법(windows)
<pre>
1. NodeJS 설치

2. mysql  설치

3. back 디렉토리에서 .env 파일 생성하여 COOKIE_SECRET, DB_PASSWORD, GOOGLE_EMAIL, GOOGLE_PASSWORD 설정
ex)COOKIE_SECRET=cookiesecret
   DB_PASSWORD=12345678
   GOOGLE_EMAIL=hello@gmail.com
   GOOGLE_PASSWORD=12345678
!!) .env 파일은 절대로 깃에 공유되면 안된다.

4. front 디렉토리에서 .env 파일 생성하여 COOKIE_SECRET 설정
ex) COOKIE_SECRET=cookiesecret 

5. back 폴더의 config.js에서 각자의 mysql 환경에 맞게 설정

6. front와 back 디렉토리에서 각각 cmd 창으로 npm i 실행하여 의존성 설치

7. 각각의 디렉토리에서 cmd 창으로 npm run dev 실행

8. 웹브라우저를 실행하고 localhost:80 으로 접속
</pre> 

MacOS
<pre>
1. NodeJS 설치

2. mysql@5.7 설치

3. back 디렉토리에서 .env 파일 생성하여 COOKIE_SECRET, DB_PASSWORD, GOOGLE_EMAIL, GOOGLE_PASSWORD 설정
ex)COOKIE_SECRET=cookiesecret
   DB_PASSWORD=12345678
   GOOGLE_EMAIL=hello@gmail.com
   GOOGLE_PASSWORD=12345678
   front 디렉토리에서 .env 파일 생성이후 COOKIE_SECRET 설정
   ex)COOKIE_SECRET=cookiesecret
!!) .env 파일은 절대로 깃에 공유되면 안된다.

5. front 디렉토리에서 .env 파일 생성하여 COOKIE_SECRET 설정
ex) COOKIE_SECRET=cookiesecret 

6. back 폴더의 config.js에서 각자의 mysql 환경에 맞게 설정

7. front와 back 디렉토리에서 각각 cmd 창으로 npm i 실행하여 의존성 설치

8. 각각의 디렉토리에서 cmd 창으로 npm run dev 실행

9. 웹브라우저를 실행하고 localhost:3000 으로 접속

</pre>

깃 브랜치가 변경 되었습니다. (develop)
