const http = require('http');

// const url = 'http://www.example.com/path/test.html'
const url = 'http://localhost:8000/'

const req = http.request(url, (res) => {
    console.log('요청끝: 상태코드: ', res.statusCode);

    //응답 바디 데이터 받기 (stream 방식)
    res.on('data', (chunk) => {
        console.log('데이터 수신: ', chunk);
    });
});

req.on('error', (error) => {
    console.log('오류발생');
});

req.end(); // 말은 end인데, 이놈이 시작을 해줌...