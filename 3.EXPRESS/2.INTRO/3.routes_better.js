const express = require('express');
const app = express();
//보통 상수는 대문자로 함
const PORT = 3000;

app.get('/',(req,res) => {
    res.send('나의 루트');
});

app.get('/products',(req,res) => {
    res.send('나의 상품');
});

app.get('/users',(req,res) => {
    res.send('나의 고객님');
});


app.post('/users',(req,res) => {
    res.send('나의 신규 고객님');
});
app.put('/users',(req,res) => {
    res.send('나의 고객님 정보 수정');
});
app.delete('/users',(req,res) => {
    res.send('나의 고객님 삭제');
});

app.listen(PORT, () => {
    console.log(`server is ready at http://127.0.0.1:${PORT}`);
});