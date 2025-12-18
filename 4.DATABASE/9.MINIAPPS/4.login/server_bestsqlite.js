const express= require('express');
const Database = require('better-sqlite3');
//기본 라이브러리
const path = require('path');

const app = express();
const port = 3000;
const db = new Database('users.db');


//db 초기화
(
    () => {
        db.exec(`CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, username TEXT, password TEXT)`);

        const insertStm = db.prepare(`INSERT INTO users(username, password) VALUES(?,?)`);

        const users = [
            {username:'user1', password:'pass1'},
            {username:'user2', password:'pass2'},
            {username:'user3', password:'pass3'},
        ];

        //한번만 넣고 그만 넣자...
        // for (const user of users){
        //     insertStm.run(user.username, user.password);
        // }
    }
)();

//form-urlencoded  변환
app.use(express.urlencoded({extended:false}));

app.get('/',(req, res) => {
    res.sendFile(path.resolve('public/index.html'));
});


app.post('/login',(req,res) => {
    const {username, password} = req.body;

    const query = db.prepare(`SELECT * FROM users WHERE username=? AND password=?`);
    const user = query.get([username, password]);

    if (user){

        res.send('로그인 성공');
    } else {

        res.send('로그인 실패');
    }
})

app.listen(port, () => {
    console.log('서버 레디..');
});