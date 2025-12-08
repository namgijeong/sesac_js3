const express = require('express');
const app = express();
const PORT = 3000;

//미들웨어
app.use((req,res,next) => {
    console.log('내가 중간에 가로챔..근데 너 로그인안했구나?');
    //res.send('로그인부터 하고 오세요.');

    //다음꺼 호출
    next();
});

app.use((req,_,next) => {
    console.log('나는 두번째 미들웨어');
    console.log('사용자 왔다감:',req.socket.remoteAddress);

    next();
});

app.use((_req, _res, next) => {
    console.log('나는 세번째 미들웨어. req,res 둘다 안보고 처리하는 애');

    next();
});

//라우터들...
app.get('/',(req,res) => {
    console.log('루트 라우트에 접속');
    res.send('웰컴투 마이홈');
});

app.get('/users',(req,res) => {
    console.log('사용자 라우트에 접속');
    res.send('웰컴투 사용자들의 홈');
});

app.listen(PORT, () => {
    console.log(`Server is ready, http://127.0.0.1:${PORT}`);
});

