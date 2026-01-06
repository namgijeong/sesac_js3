const express = require('express');
//cookie-parser도 설치해야함
//cookie에서 파싱한다 body parser처럼
const cookieParser = require('cookie-parser');

const app = express();
const port = 3000;

app.use(cookieParser());

app.get('/', (req, res) => {
  res.cookie('username', 'user1');
  res.cookie('mycookie', 'test');
  res.send('hello');
});

app.get('/dashboard', (req, res) => {
  const { username, mycookie } = req.cookies;

  res.send(`당신은 ${username} 입니다. ${mycookie}`);
});

app.listen(port, () => {
  console.log('서버 레디');
});

//curl localhost:3000/ --cookie-jar cookie.txt -I
//curl localhost:3000/dashboard -I

//아무것도 서버에서 세팅안할때 쿠키 저장 시도했기때문에 변화없음
//curl localhost:3000/dashboard --cookie-jar cookie.txt --cookie cookie.txt -I
//curl localhost:3000/dashboard  --cookie cookie.txt -I
