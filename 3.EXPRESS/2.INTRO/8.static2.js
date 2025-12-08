const express = require('express');
const app = express();
const path = require('path');
const PORT = 3000;

app.get('/',(req,res) => {
    //여기에서 내가 직접 파일을 읽어다가 전달하는걸 구현할수는 없나???
    const htmlFilePath = path.join(__dirname,'public','index.html');

    //성공했으면 보내고 끝, 실패했으면 콜백함수를 통해서 처리
    //근데 파일 성공했어도, 이 콜백 함수가 실행됨 
    res.sendFile(htmlFilePath, (err) => {
        //주의 만약 send가 성공했는데, res.status로 무언가 또 보내면 클라이언트에 연결이 안간다.
        //즉 res.send를 연속해서 반복해서 쓸 수 없다.
        if (err) {
            console.error('파일 전송 오류', err);
            res.status(500).send('서버에서 파일을 처리하는데 오류가 발생했습니다.');
        }
    });

});

//사진을 나오게 하고싶으면 
app.use(express.static('public'));

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});