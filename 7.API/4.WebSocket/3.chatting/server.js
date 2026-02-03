//npm install ws
const WebSocket = require('ws');
const express = require('express');
const app = express();
const path = require('path');

const express_port = 3000;
const websocket_port = 3333;

const wss = new WebSocket.Server({ port: websocket_port });
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'client.html'));
});

//웹소켓으로 받은 메시지 다 전달(브로드캐스트)
//wss => 웹소켓 서버 , ws => 웹소켓
wss.on('connection', (ws) => {
  let content = '';
  ws.on('message', (msg) => {
    try {
      const parsedMsg = JSON.parse(msg);
      content = parsedMsg.content;
    } catch {
      console.error('Invalid JSON Format:', error);
      return;
    }

    //클라이언트 수만큼 소켓수를 가지고 있다
    wss.clients.forEach((client) => {
      let messageObj;

      //ws가 서버에 보낸놈
      if (client === ws) {
        messageObj = {
          type: 'sent',
          content: content,
        };
      } else {
        messageObj = {
          type: 'received',
          content: content,
        };
      }

      client.send(JSON.stringify(messageObj));
    });
  });
});

console.log(`웹소켓 서버 실행중....ws://localhost:${websocket_port}`);
app.listen(express_port, () => {
  console.log(`익스프레스 서버 실행중... http://localhost:${express_port}`);
});
