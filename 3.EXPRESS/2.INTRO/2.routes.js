const express = require('express');
const app = express();
//보통 상수는 대문자로 함
const PORT = 3333;

app.get('/',(req,res) => {
    res.send('나의 루트');
});

app.get('/product',(req,res) => {
    res.send('나의 상품');
});

app.get('/user',(req,res) => {
    res.send('나의 고객님');
});

//아래처럼 모든걸 get으로 해서 create modify delete를 url명으로 하는 것은 가장 나쁜 원칙임
app.get('/user/create',(req,res) => {
    res.send('나의 신규 고객님');
});
app.get('/user/modify',(req,res) => {
    res.send('나의 고객님 정보 수정');
});
app.get('/user/delete',(req,res) => {
    res.send('나의 고객님 삭제');
});

app.listen(PORT, () => {
    console.log(`server is ready at http://127.0.0.1:${PORT}`);
});