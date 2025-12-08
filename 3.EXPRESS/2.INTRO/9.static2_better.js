const express = require('express');
const app = express();
const path = require('path');
const PORT = 3000;

app.get('/', (req, res, next) => {
    //여기에서 내가 직접 파일을 읽어다가 전달하는걸 구현할수는 없나???
    //__dirname 은 Node.js에서 현재 실행 중인 파일이 위치한 디렉터리(폴더)의 절대 경로를 나타내는 특별한 전역 변수
    const htmlFilePath = path.join(__dirname, 'public', 'index2.html');

    //성공했으면 보내고 끝, 실패했으면 콜백함수를 통해서 처리
    //근데 파일 성공했어도, 이 콜백 함수가 실행됨 
    res.sendFile(htmlFilePath, (err) => {
        console.log('sendFile 함수 실행');

        //주의 만약 send가 성공했는데, res.status로 무언가 또 보내면 클라이언트에 연결이 안간다.
        //즉 res.send를 연속해서 반복해서 쓸 수 없다.
        if (err) {
            next(new Error("파일을 찾을 수 없습니다."));
            //res.status(500).send('서버에서 파일을 처리하는데 오류가 발생했습니다.');
        }

    });

    //주의 만약 send가 성공했는데, res.status로 무언가 또 보내면 클라이언트에 연결이 안간다.
    //res.status(500).send('서버에서 파일을 처리하는데 오류가 발생했습니다.');
});

app.get('/user', (req, res, next) => {
    const htmlFilePath = path.join(__dirname, 'public', 'user.html');

    res.sendFile(htmlFilePath, (err) => {
        if (err) {
            next(new Error("파일을 찾을 수 없습니다."));
            //res.status(500).send('서버에서 파일을 처리하는데 오류가 발생했습니다.');
        }
    });


});

app.get('/admin', (req, res, next) => {
    const htmlFilePath = path.join(__dirname, 'public', 'admin.html');

    res.sendFile(htmlFilePath, (err) => {
        if (err) {
            next(new Error("파일을 찾을 수 없습니다."));
            //res.status(500).send('서버에서 파일을 처리하는데 오류가 발생했습니다.');
        }
    });


});

//에러처리 공통 핸들러를 등록하는 미들웨어
app.use((err, req, res, next) => {
    console.error('에러:', err.message);
    res.status(500).json({ message: '서버 내부 오류가 발생했습니다. 관리자에게 문의하세요.' });
});

//사진을 나오게 하고싶으면 
//주의 맨위에다가 써넣으면, 이 public안에 현재 html이 있으므로 이것이 먼저 실행되서 내가 쓴 app.get sendFile이 실행되지 않음
app.use(express.static('public'));

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});