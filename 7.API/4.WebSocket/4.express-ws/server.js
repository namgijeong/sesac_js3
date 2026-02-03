const express = require('express');
const expressWs = require('express-ws');
const path = require('path');

const port = 3000;
const app = express();
expressWs(app);

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'client.html'));
});

//웹소켓의 다양한 사용자를 관리하기 위해서 Map 자료구조를 사용. Map(username, ws) 키 값으로 저장하고자
const wsClients = new Map();

//req,res 순서가 아님!! 순서 주의
app.ws('/chat', (ws, req) => {
  //접속자의 ip 주소 가져오기
  const clientIp = req.socket.remoteAddress;
  console.log('클라이언트 접속 IP:', clientIp);

  //클라이언트로부터 받아온 메시지 처리
  ws.on('message', (message) => {
    console.log('메시지: ', message);

    //ws.send(message);
    const parsedMessage = JSON.parse(message);
    const username = parsedMessage.username;
    const type = parsedMessage.type;
    const content = parsedMessage.content;

    //기존에 이 사용자가 준 메시지가 있냐??
    if (username && !wsClients.has(username)) {
      //새로운 사용자
      console.log('새로운 사용자 등장:', username);
      wsClients.set(username, ws);
      broadcastMessage(`[${username}]님이 채팅에 들어오셨습니다.`);
    }

    if (type === 'session') {
      //신규 사용자 등장
    } else {
      //일반 메시지
      const messageObj = {
        type: 'received',
        content: content,
        sender: username,
      };

      //key,value 순서인데, 첫번째 인자가 value라서 우리가 원하는 key는 두번째 인자임
      wsClients.forEach((client, u) => {
        messageObj.type = client === ws ? 'sent' : 'received';
        messageObj.sender = client === ws ? 'me' : username;
        console.log(`보내는중:${u} : ${JSON.stringify(messageObj)}`);
        client.send(JSON.stringify(messageObj));
      });
    }
  });

  function broadcastMessage(message) {
    wsClients.forEach((client) => {
      const broadcastObj = {
        type: 'broadcast',
        content: message,
      };

      client.send(JSON.stringify(broadcastObj));
    });
  }

  ws.on('close', () => {
    let leftUser;

    //떠난 사람 찾기
    wsClients.forEach((client, clientId) => {
      if (client === ws) {
        leftUser = clientId;
        console.log('사용자 한마리 떠남', clientId);
        wsClients.delete(clientId);
      }
    });

    //모두에게 알려주기
    broadcastMessage(`[${leftUser}]는 채팅을 떠났습니다.`);
  });
});

app.listen(port, () => {
  console.log('웹서버+웹소켓 서버 레디...');
});
