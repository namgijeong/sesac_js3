const express = require('express');
const app = express();
const PORT = 3000;

//static 폴더를 설정해서 html 파일을 서빙하시오
//index.html이면 자동으로 실행이 되는데
//그게 아니면 브라우저에서 html파일 쳐서 들어가야함
app.use(express.static('public'));

app.post('/login', (req, res) => {
    console.log(req.body);
    
    let data = '';
    //http의 바디가 한덩어리로 올지 두덩어리로 올지 또는 그 이상일지 모름
    //그래서 올때마다 내 콜백함수를 불러주시오
    req.on('data',(chunk) => {
        data += chunk.toString();
    });

    req.on('end', () => {
        console.log(`온 데이터 모음: ${data}`);
        const params = new URLSearchParams(data);
        console.log(params);
        const obj = Object.fromEntries(params.entries());
        console.log(obj);
        res.send(`<h1>당신의 id는 ${obj.id}이고 pw는 ${obj.pw}입니다.</h1>`)
    });
  
});

app.listen(PORT, () => {
    console.log(`Server is ready at 127.0.0.1:${PORT}`);
});