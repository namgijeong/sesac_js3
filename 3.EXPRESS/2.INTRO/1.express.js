//npm i express로 설치
const express = require('express');

const app = express();

app.get('/',(req, res) => {
    res.send('<h1>hello, express</h1>');
});

//일반적으로 node.js에서는 3000번으로
//python은 5000번으로
app.listen(3000,() => {
    console.log('익스프레스 서버가 준비되었습니다.');
});