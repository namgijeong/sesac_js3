const sqlite3 = require('sqlite3').verbose();
const bcrypt = require('bcrypt');

const db = new sqlite3.Database('users.db');

const users = [
  { username: 'user1', password: 'password1' },
  { username: 'user2', password: 'password1' },
];

async function insertUsers() {
  for (const user of users) {
    //err은 try catch로 잡는다
    //bcrypt.hash() 는 Promise를 반환
    //내부에서 문제가 생기면 → Promise.reject(err)
    //await는 reject를 만나면 즉시 throw
    //그래서 err는 catch 블록에서만 존재
    const hashedPassword = await bcrypt.hash(user.password, 10);
    db.run(`INSERT INTO users(username,password) VALUES (?,?)`, [user.username, hashedPassword], (err) => {
      if (err) {
        console.error('사용자 삽입 실패:', err.message);
      } else {
        console.log(`${user.username} 등록 완료`);
      }
    });
  }
}

insertUsers();
