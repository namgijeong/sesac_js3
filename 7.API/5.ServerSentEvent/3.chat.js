const express = require('express');
const path = require('path');

const app = express();
app.use(express.static('public'));
app.use(express.json());

const clients = []; //연결된 사용자 관리
const messages = [];

messages.push({username:'시스템', message:'채팅을 시작합니다.'});

app.get('/',(req, res) => {
    res.sendFile(path.join(__dirname, 'public','3.chat.html'));
});

//처음에 접속할 때만 /chat이 작동해서 그동안 쌓여있는 메시지를 보내준다
app.get('/chat', (req, res) => {
    //SSE 헤더 설정
    res.setHeader('Content-Type','text/event-stream');
    res.setHeader('Cache-Control','no-cache');
    //연결을 유지하라는 패킷
    res.setHeader('Connection','keep-alive');

    clients.push(res);
    console.log('새로운 사용자에게 응답을 보낼 준비 완료');

    messages.forEach(msg => {
      res.write(`data: ${JSON.stringify(msg)}\n\n`);
    })
});

app.post('/send-message', (req, res) => {
  const {username, message} = req.body;
  const newMessage = {username, message, timstamp:new Date().toISOString()};
  
  messages.push(newMessage);

  clients.forEach(client => {
    client.write(`data: ${JSON.stringify(newMessage)}\n\n`);
  });

  res.status(200).send({success:true});
});

app.listen(3000,() => {
    console.log('서버 레디');
});