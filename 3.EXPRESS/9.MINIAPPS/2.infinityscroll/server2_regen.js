const express = require('express');
const figlet = require('figlet');
const app = express();
const PORT = 3000;

//가상 데이터 생성
const data = Array.from({length:100}, (_, i) => `Item ${i+1}`);
//console.log(data);

app.use(express.static('public'));

//0.미들웨어로 [시간] [METHOD] [URL-PATH]
//나중에는 morgan이라는 라이브러리를 쓴다
function myLogger(req, res, next){
    let dateString = new Date().toLocaleDateString();
    //req.originalUrl 도 가능
    let logString = `[${dateString}] [${req.method}] [${req.path}] `;
    console.log(logString);
    next();
}
app.use(myLogger);

//0부터 20사이의 랜덤 숫자 생성
function getRandomIncrease(){
    return Math.floor(Math.random() * 21);
}

//매 10초마다 위의 생성된 갯수로 랜덤하게 증가
setInterval(() => {
    const randNum = getRandomIncrease();
    const currentLength = data.length;
    for (let i = 0; i < randNum; i++){
        data.push(`Item ${currentLength + i + 1}`);
    }
    
    console.log(`Added ${randNum}`);
},10_000);


// /api/items?start=1&end=10
app.get('/api/items', (req, res) => {
    //1.사용자의 입력을 받아온다
    //주의: 모든 입력은 다 문자열이다
    //연산을 위해서는 필요한 타입으로 변환
    // const start = Number(req.query.start);
    // const end = Number(req.query.end);
    // console.log(start,end);

    const {start, end} = req.query;

    //2.이번호에 해당하는걸 배열에서 골라낸다
    dataSliced = data.slice(Number(start) , Number(end));
    //console.log(dataSliced);

    //3.그 내용을 전달
    res.json(dataSliced);
});

app.listen(PORT, () => {
    figlet("SESAC",(err,data) => {if (!err) console.log(data);})
    console.log(`Server is up on http://127.0.0.1${PORT}`);
});