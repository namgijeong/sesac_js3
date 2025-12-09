const express = require('express');
const app = express();
const PORT = 3000;

//npm i ejs
//서버 사이드 렌더링을 하기 위한 라이브러리 설정
app.set('view engine', 'ejs');

app.get('/',(req,res) => {
    //index.ejs를 렌더링한다 
    //HTML에 보낼 데이터를 객체형태로 넣어준다
    res.render('index', {title:'익스프레스 앱', message:'EJS를 사용해서 서버사이드 렌더링을 합니다.'});
});

app.listen(PORT, () => {
    console.log('서버레디');
});