const express = require('express');
const app = express();
const PORT = 3000;

//static 폴더를 설정해서 html 파일을 서빙하시오
//index.html이면 자동으로 실행이 되는데
//그게 아니면 브라우저에서 html파일 쳐서 들어가야함
app.use(express.static('public'));

app.get('/submit', (req, res) => {
    console.log(`사용자가 보내온 결과 출력할 예정`);
    
    //let으로 받아도 상관은 없지만, 사용자가 보낸 데이터를 굳이 내가 바꿔야할까??
    const name = req.query.name;
    console.log(name);

    const age = req.query.age;
    console.log(age);

    res.send(`<h1>잘 받았습니다 ${name}님, ${age}</h1>`);
});

app.listen(PORT, () => {
    console.log(`Server is ready at 127.0.0.1:${PORT}`);
});