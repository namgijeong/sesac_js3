const bodyParser = require('body-parser');
const express = require('express');
//옛날에는 express에 탑재되있지 않아 직접 설치해야했음
//const bodyParser = require('body-parser');
const app = express();
const PORT = 3000;

//app.use(bodyParser.urlencoded());

//form 데이터로부터 온걸 x-www-form-urlencoded라고 부름
//이 미들웨어는? 사용자로부터 전달받은 위 mime 타입을 찾아서 req.body에 담아준다
//extended:false => 확장 문법 안씀
app.use(express.urlencoded({extended:false}));

//index.html이면 자동으로 실행이 되는데
//그게 아니면 브라우저에서 html파일 쳐서 들어가야함
app.use(express.static('public'));

app.post('/login', (req,res) => {
    //원래는 이런거 없음
    //미들웨어를 거치면서 req.body가 생겨남

    const id = req.body.id;
    const pw = req.body.pw;

    console.log(`당신의 id는 ${id} 그리고 pw는 ${pw}입니다.`);
});

app.listen(PORT, () => {
    console.log('서버레디');
});