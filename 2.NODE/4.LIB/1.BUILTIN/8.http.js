const http = require('http');

const server = http.createServer();

//Node.js의 http.Server 객체에서 발생하는 이벤트를 감지해서 실행하는 이벤트 리스너 등록

//TCP 연결이 맺어졌을 때
server.on('connection', () => {
    console.log('누군가의 연결이 시작되었습니다.');
});

//HTTP 요청 메시지가 도착했을 때
server.on('request', () => {
    console.log('누군가의 요청이 시작되었습니다.');
});

console.log('서버는 사실 여기에서 시작되었습니다.');

//서버를 실제로 “켜서” 3000번 포트에서 클라이언트 요청을 받을 준비
//http://localhost:3000/ => 브라우저에서 접근가능
server.listen(3000);  // 서버의 대기상태에 들어가서...
console.log('나는 언제 찍힐까요?');