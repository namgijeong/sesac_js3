const http = require('http');

const server = http.createServer((req,res)=>{
    console.log(req.url, req.headers);
    res.writeHead(200,{'Set-cookie':'mycookie=test'})
    res.end('hello');
});

//curl localhost:3000
//curl localhost:3000/abc

//헤더에 정보 넣기
//curl localhost:3000/abc -H "Hello:World"
//curl localhost:3000/abc -I

//curl에서 쿠키 저장
//curl localhost:3000/abc --cookie-jar hello.txt
//type hello.txt

//curl에서 쿠키 들고가기
//curl localhost:3000/abc --cookie hello.txt
server.listen(3000, () => {
    console.log('서버 대기중');
});