const express = require('express');
const app = express();
const PORT = 3000;

//npm i ejs
//서버 사이드 렌더링을 하기 위한 라이브러리 설정
app.set('view engine', 'ejs');

app.get('/',(req,res) => {
    const data = {
        title:'익스프레스 앱', message:'분할된 헤더와 메인 합치기'
    }

    res.render('main',data);
});

app.get('/user',(req,res) => {
    const data = {
        title:'사용자 페이지', message:'분할된 헤더와 메인 합치기 2'
    }

    res.render('user',data);
});


app.listen(PORT, () => {
    console.log('서버레디');
});