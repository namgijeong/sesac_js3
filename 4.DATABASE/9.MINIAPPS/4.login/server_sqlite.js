const express = require("express");
//기본 라이브러리
const path = require("path");

const app = express();
const port = 3000;

const { connectDB, runQuery, allQuery, getQuery } = require("./sqlite_library");

//db 초기화 예시
// function init_db(){
//   db.seialize(() => {
//     db.run(`CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, username TEXT, password TEXT)`);

//   });
// }

//db 초기화
(async () => {
  connectDB("users.db");

  await runQuery(
    `CREATE TABLE IF NOT EXISTS users (id INTEGER PRIMARY KEY AUTOINCREMENT, username TEXT, password TEXT)`
  );

  const insertStm = `INSERT INTO users(username, password) VALUES(?,?)`;

  const users = [
    { username: "user1", password: "pass1" },
    { username: "user2", password: "pass2" },
    { username: "user3", password: "pass3" },
  ];

  //한번만 넣고 그만 넣자...
  // for (const user of users) {
  //   await runQuery(insertStm, [user.username, user.password]);
  // }
})();

//form-urlencoded  변환
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  res.sendFile(path.resolve("public/index.html"));
});

app.post("/login", async (req, res) => {
  const { username, password } = req.body;

  const user = await getQuery(
    `SELECT * FROM users WHERE username=? AND password=?`, [username, password]
  );

  //위험한 SQL 인젝션이 되니 이렇게 하지 말것
  // const user = await getQuery(
  //   `SELECT * FROM users WHERE username='${username}' AND password='${password}'`
  // );

  if (user) {
    res.send("로그인 성공");
  } else {
    res.send("로그인 실패");
  }
});

app.listen(port, () => {
  console.log("서버 레디..");
});
