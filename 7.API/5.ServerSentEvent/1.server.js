const express = require('express');
const path = require('path');

const app = express();
app.use(express.static('public'));

app.get('/',(req, res) => {
    res.sendFile(path.join(__dirname, 'public','1.index.html'));
});

app.get('/events', (req, res) => {
    //SSE 헤더 설정
    res.setHeader('Content-Type','text/event-stream');
    res.setHeader('Cache-Control','no-cache');
    //연결을 유지하라는 패킷
    res.setHeader('Connection','keep-alive');

    const sendTime = () => {
        //웹표준: 서버로부터 데이터가 올때의 포멧이... data:내용물\n\n
        //HTML 명세의 9.2.4 Parsing an event stream
        res.write(`data: 서버로부터 온 시간:${new Date().toISOString()}\n\n`);
    }

    const interval = setInterval(sendTime, 1000);

    //여기에 온 요청은 계속 대기... 종료되지 않고
    //연결이 종료되면? 클라이언트가 창 닫으면..

    req.on('close', ()=>{
        console.log('클라이언트가 떠나서 타이머 종료:', interval);
        clearInterval(interval);
    })
});

app.listen(3000,() => {
    console.log('서버 레디');
});