NUTEE
=========
성공회대학교 통합 커뮤니티 서비스
---------
프로젝트 실행방법

<pre>
1. NodeJS 설치

2. front 디렉토리에서 .env 파일 생성하여 COOKIE_SECRET 설정
  ex) COOKIE_SECRET=cookiesecret
  !!) .env 파일은 절대로 깃에 공유X

3. cmd or terminal로 npm 실행하여 의존성 설치
  package.json - dependencies와 devDependencies에 적혀있는 것들 설치
  dependencies -> npm i oooo
  devDependencies -> npm i -D oooo

4. cmd or terminal에서 npm run dev 실행
  (NUTEE-WEB폴더에서 실행X  front폴더에서 실행!)

5. 웹브라우저를 실행하고 localhost:80 으로 접속
</pre> 


깃 브랜치가 변경 되었습니다. (develop)

<pre>
소스트리에 master branch만 있다면!!
터미널에 git checkout -t origin/develop 
develop branch 체크아웃
</pre>
