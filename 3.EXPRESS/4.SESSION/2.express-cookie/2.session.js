const express= require('express');
const session = require('express-session');

const app = express();
const port = 3000;

//세션을 연동- 기본적으로 서버의 메모리에 저장- disk,db,memory 정할 수 있음
//미들웨어가 req에 session 관련 내용을 파싱해서 넣어줌
app.use(session({
    secret:'my-secret-key', //서버에서 나만 알고있는 비밀 키
    resave:false, //세션 데이터에 변경이 없어도 저장하겠다 (false)
    saveUninitialized: true, // 내용이 없어도 초기화가 안된 빈 세션도 일단 저장하겠다
}));

function visitCounter(req, res, next){
    req.session.visitCount = req.session.visitCount || 0; //있으면 앞에꺼, 없으면 뒤에꺼

    req.session.visitCount++;
    next();
}

app.use(visitCounter);

app.get('/',(req, res) => {
    req.session.username = 'user1';
    req.session.cart = ['사과우유', '딸기 우유', '바나나우유'];
    //하지만 세션이 누구껀지 알아야해서 세션 아이디를 쿠키에 넣어준다

    res.send(`당신의 방문 횟수는 ${req.session.visitCount}입니다.`);
    //res.send('hello');
});

app.get('/user', (req, res) => {
    //req안에 session id가 있다
    const {username, cart} = req.session;
    console.log(username, cart);
    res.send(`당신은 ${username}이군요.`);
});

app.get('/shop', (req, res) => {
    //req안에 session id가 있다
    const {username, cart} = req.session;
    console.log(username, cart);
    res.send(`당신은 ${username}이고, 장바구니에 ${cart}를 담았었군요.`);
});

app.listen(port,() => {
 console.log('서버 레디');
});

//curl localhost:3000/  -I