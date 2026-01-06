const express = require('express');
const path = require('path');
const session = require('express-session');

const app = express();
const port = 3000;

//app.use(express.json());
app.use(express.urlencoded({extended:false}));
//app.use(express.static());

app.use(session({
    secret:'this-is-my-secret-password',
    resave:false,
    saveUninitialized: true,
    //세션에서 주는 세션아이디를 쿠키에 저장 이거에 대한 유효시간임 
    cookie:{
        maxAge:60000, //세션의 유효 시간을 60초
    }
}));


//간단한 메모리 기반의 사용자 db
const users= [
    {id:1, username:'user1', password:'password1'},
    {id:2, username:'user2', password:'password2'},
   
]

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public','login.html'));
});

app.get('/profile', (req, res) => {
    const {user} = req.session || undefined; //이전에 세션에 저장한 정보 다시 찾기

    if (user) {
        
        res.json({id:user.id, username:user.username, message:"프로필 정보"});
    } else {
        res.status(401).json({message:'로그인이 필요합니다.'});
    }
})
app.post('/login',(req, res) => {
    const {username, password} = req.body;
    console.log(`사용자 입력값 확인: ${username}, ${password}`);
    //사용자 로그인 확인

    // let loginFlag = false;
    // for (const user of users){
    //     if (user.username === username && user.password === password ){
    //         console.log('여기 들어옴');
    //         loginFlag = true;
    //         break;
    //     }
    // }
    
    let user = users.find(user => user.username === username && user.password === password);

    if (user){
        //세션에 원하는 정보 넣기
        req.session.user={id:user.id, username:user.username};
        res.json({message:'로그인 성공'});
    } else {
        res.status(401).json({message:'로그인 실패'});
    }
});

app.get('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err){
            console.error('세션 삭제 실패', err);
            return res.status(500).json({message:"로그아웃 실패"});
        }
    });

    res.json({message:"로그아웃 성공"});
});

app.listen(port, () => {
    console.log('서버 레디');
})