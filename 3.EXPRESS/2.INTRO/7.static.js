const express = require('express');
const app = express();

const PORT = 3000;

//static 폴더(정적폴더, 여기에 img/css/js같은 정적 파일들이 있으니, 필요한거 니가 알아서 가져가시오)
//그럼 정적파일은??? 그럼 html은?
app.use(express.static('public'));

//위치에 따라서, 라우트에 오기 전에 index.html을 퍼블릭에서 가져가면?? 여기 도달하지 않음
app.get('/',(req,res) => {
    res.send(`그럼 나는요???`);

    //send 여러번쓰니 안된다..
    //res.send('send이후 또 보내기 가능??');
    // res.send('send이후 또 보내기 가능??');
});

//app.use(express.static('public'));

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});