//npm i nunjucks
//파일의 변화를 모니터링하기 위한 추가 라이브러리
//npm i chokidar
const express = require('express');
const nunjucks = require('nunjucks');

const app = express();
const PORT = 3000;

app.set('view engine', 'njk');

nunjucks.configure('views', {
    autoescape: true, // xss 자동 대응하기 위한 설정
    express: app, // express를 담은 변수와 연결
    watch: true // 개발용으로, 템플릿 파일의 변경을 알아서 감지해줌
})

app.get('/', (req,res) => {
    res.render('index', { title: '익스프레스 앱', message: 'NJK를 사용해서 서버사이드 렌더링을 합니다.' });
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
    console.log('서버 레디');
});