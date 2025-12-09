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
    res.render('main', { title: '익스프레스 앱', content: 'NJK를 사용해서 서버사이드 렌더링을 합니다.' });
});

app.get('/user', (req,res) => {
    res.render('user', { title: 'user', content: 'NJK를 사용해서 user 서버사이드 렌더링을 합니다.' });
});

app.listen(PORT, () => {
    console.log('서버 레디');
});