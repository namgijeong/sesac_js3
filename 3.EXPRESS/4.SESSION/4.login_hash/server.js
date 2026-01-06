const express = require('express');
const path = require('path');
const session = require('express-session');
const sqlite3 = require('sqlite3').verbose();
const bcrypt = require('bcrypt');

const app = express();
const port = 3000;
const db = new sqlite3.Database('users.db', (err) => {
  if (err) {
    console.error('DB연결 실패:', err.message);
  } else {
    console.log('DB 연결 성공');
  }
});

app.use(express.json());
//app.use(express.urlencoded({extended:false}));
app.use(express.static('public'));

app.use(
  session({
    secret: 'this-is-my-secret-password',
    resave: false,
    saveUninitialized: true,
    //세션에서 주는 세션아이디를 쿠키에 저장 이거에 대한 유효시간임
    cookie: {
      maxAge: 60000, //세션의 유효 시간을 60초
    },
  }),
);

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

app.get('/profile', (req, res) => {
  const { user } = req.session || undefined; //이전에 세션에 저장한 정보 다시 찾기

  if (user) {
    res.json({ id: user.id, username: user.username, message: '프로필 정보' });
  } else {
    res.status(401).json({ message: '로그인이 필요합니다.' });
  }
});

app.get('/check-login', (req, res) => {
  //로그인 세션이 유효함 => 유효시간이 지나지 않음
  if (req.session && req.session.user) {
    return res.json({ id: req.session.user.id, username: req.session.user.username });
  }
  return res.json({ username: null });
});

app.post('/login', (req, res) => {
  console.log(req.body);
  const { username, password } = req.body;
  console.log(`사용자 입력값 확인: ${username}, ${password}`);

  //사용자 로그인 확인
  const query = `SELECT * FROM users WHERE username = ?`;
  db.get(query, [username], async (err, row) => {
    if (err) {
      console.error('DB 쿼리 오류:', err.message);
      res.status(500).json({ message: '서버 오류' });
    }

    if (row) {
      //일단 사용자 계정 존재하는 것 확인
      //err는 try catch
      const match = await bcrypt.compare(password, row.password);

      if (match) {
        //세션에 원하는 정보 넣기
        req.session.user = { id: row.id, username: row.username };
        res.json({ message: '로그인 성공' });
      } else {
        res.status(401).json({ message: '로그인 실패 (id/pw를 확인해 주세요.)' });
      }
    } else {
      res.status(401).json({ message: '로그인 실패 (id/pw를 확인해 주세요.)' });
    }
  });
});

app.get('/logout', (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.error('세션 삭제 실패', err);
      return res.status(500).json({ message: '로그아웃 실패' });
    }
  });

  res.json({ message: '로그아웃 성공' });
});

app.listen(port, () => {
  console.log('서버 레디');
});
