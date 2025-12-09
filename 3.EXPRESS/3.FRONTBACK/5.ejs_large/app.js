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

app.get('/fruits', (req, res) => {
    const fruits = ['사과', '바나나', '오렌지', '포도'];
    res.render('fruits', {fruits: fruits});
});

app.get('/welcome', (req,res) => {
    const isAdmin = true;

    let username;
    if (isAdmin) {
        username = '관리자';
    } else {
        username = '홍길동'
    }

    // res.render('welcome',{username:username});
    //축약법 => 알아서 자동으로 username이라는 키에 username의 값을 할당함
    res.render('welcome',{username});
})

app.listen(PORT, () => {
    console.log('서버레디');
});