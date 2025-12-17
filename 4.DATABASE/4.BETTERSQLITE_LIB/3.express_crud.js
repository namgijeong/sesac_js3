const express = require("express");
const Database = require("better-sqlite3");
const fs = require("fs");

const port = 3000;
const db_file = "my-express-db.db";

const app = express();
//new로도 생성가능하고, 그냥 함수로도 지원한다.
const db = new Database(db_file);

app.use(express.urlencoded({ extended: false }));
//요청 json body를 받기위해서
app.use(express.json());

function init_database() {
  //readFile은 비동기로 함수를 읽음
  //동기모드로 파일을 읽음 블럭킹 함수
  const sql = fs.readFileSync("init_database.sql", "utf8");
  //각행을 ;로 잘라서 빈행(undefined,null)으로 나오는걸 방지
  //const statements = sql.split(";").filter(Boolean);
  const statements = sql.split(";");

  //insert 여러번 실행방지
  //db.transaction은 성공하면 commit,실패하면 rollback
  //   db.transaction(() => {
  //     for (const statement of statements) {
  //       db.exec(statement);
  //     }
  //   });

  try {
    for (const statement of statements) {
      db.exec(statement);
    }
  } catch (err) {
    console.log("이미 초기화 되었습니다.");
  }
}

init_database();
//  curl -X GET localhost:3000/api/table/users
app.get("/api/table/:table", (req, res) => {
  const db_table = req.params.table;

  try {
    const query = db.prepare(`SELECT * FROM ${db_table}`);
    const queryResult = query.all();
    res.json(queryResult);
  } catch (err) {
    res.send(`요청하신 테이블 정보는 존재하지 않습니다.`);
  }
});

//  curl -X GET localhost:3000/api/users
app.get("/api/users", (req, res) => {
  //try-catch 해줘야함
  const users = db.prepare(`SELECT * FROM users`).all();
  res.send(users);
});

//  curl -X GET localhost:3000/api/users/2
app.get("/api/users/:id", (req, res) => {
  const userId = req.params.id;

  //try-catch 해줘야함
  const user = db.prepare(`SELECT * FROM users WHERE id=?`).get(userId);
  if (user) {
    //res.status(404).json(user);
    res.json(user);
  } else {
    //res.send는 일반적으로 200이 반환됨
    res.status(404).send("해당 유저가 없습니다");
  }
});

//이렇게하면 urlencoded로 들어감
//  curl -X POST localhost:3000/api/users -d username=3 -d password=1234
app.post(`/api/users`, (req, res) => {
  const { username, password } = req.body;
  const insert = db.prepare(
    `INSERT INTO users(username, password) VALUES (?,?)`
  );
  const result = insert.run(username, password);
  res.send(`사용자가 추가되었습니다. 신규 ID: ${result.lastInsertRowid}`);
});

// curl -X PUT localhost:3000/api/users/1 -d username=11 -d password=9999
app.put(`/api/users/:id`, (req, res) => {
  const userId = req.params.id;
  const {username, password} = req.body;
  const put = db.prepare(`UPDATE users SET username=?, password=? WHERE id=?`);
  const result = put.run(username, password, userId);
  res.send(`사용자가 수정되었습니다.${JSON.stringify(result)}`);
});

//  curl -X DELETE localhost:3000/api/users/2
app.delete(`/api/users/:id`, (req, res) => {
  //제일 좋은것은 삭제전에 get조회를 해보는것
  const userId = req.params.id;
  const delete_prepare = db.prepare(`DELETE FROM users WHERE id=?`);
  const result = delete_prepare.run(userId);
  res.send(`사용자가 삭제되었습니다. ${JSON.stringify(result)}`);
});

app.listen(port, () => {
  console.log(`Server is ready...`);
});
