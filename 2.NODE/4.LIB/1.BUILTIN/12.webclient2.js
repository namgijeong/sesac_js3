const http = require('http');

// const url = 'http://www.example.com/path/test.html'
const url = 'http://localhost:8000/'

const req = http.request(url, (res) => {
    console.log('STATUS:', res.statusCode);

    console.log('HEADERS: ', res.headers);
    //템플릿 리터럴 안에서도 그대로 문자열로 삽입 가능
    console.log(`HEADERS: ${JSON.stringify(res.headers)}`);
    
    res.setEncoding('utf8');
    res.on('data', (chunk) => {
        console.log(`BODY: ${chunk}`);
    });
});

req.on('error', (error) => {
    console.log('오류발생');
});

req.end(); // 말은 end인데, 이놈이 시작을 해줌...