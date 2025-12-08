const http = require('http');

const server = http.createServer();

server.on('connection', () => {
    console.log("접속시작");
});

//res => 반송봉투
server.on('request', (req, res) => {
    console.log('요청시작');
    console.log('요청 메소드:',req.method);
    console.log('요청 주소:',req.url);
    console.log('요청 헤더:',req.headers);
    console.log('요청 헤더의 호스트:',req.headers.host);
    console.log('요청 헤더의 uagent:',req.headers['user-agent']);
    console.log('요청자의 주소:',req.socket.remoteAddress);

    //응답
    res.writeHead(200,{'Content-Type':'text/html'});
    res.end('<H1>Hello, 마이서버</H1>');
});

//curl 127.0.0.1:3000
//3000번 포트로 접속
server.listen(3000,()=>{
    console.log('서버레디');
});