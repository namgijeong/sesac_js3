const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const fs = require("fs");
const { runQuery, allQuery, getQuery } = require("./5.intro_db_library");

const port = 3000;
const db_file = "simple.db";

const app = express();
const db = new sqlite3.Database(db_file);

app.use(express.urlencoded({ extended: false }));
//요청 json body를 받기위해서
app.use(express.json());

async function init_database() {
  //파일을 읽을때 동기적으로 읽음
  const sql = fs.readFileSync("init_database.sql", "utf8");
  //filter(Boolean) 은 JS에서 자주 쓰는 “빈 값 제거” 관용 표현
  //"" => falsy, "   " =>공백 문자열은 truthy라서 filter(Boolean)만으로는 안 걸러진다
  //=>trim()이 필수
  const statements = sql
    .split(";")
    .map((s) => s.trim())
    .filter((s) => Boolean(s));
  //console.log(statements);
  //insert 여러번 실행방지
  try {
    for (const statement of statements) {
      await runQuery(statement);
    }
  } catch (err) {
    console.log("이미 초기화 되었습니다.");
  }
}

init_database();

// curl -X GET localhost:3000/api/table/users
app.get("/api/table/:table", async (req, res) => {
  const db_table = req.params.table;

  try {
    const rows = await allQuery(`SELECT * FROM ${db_table}`);
    res.json(rows);
  } catch (err) {
    res.send(`요청하신 테이블 정보는 존재하지 않습니다.`);
  }
});

//  curl -X GET localhost:3000/api/users?username=user2
app.get("/api/users", async (req, res) => {
  //try-catch 해줘야함
  const { username } = req.query;

  if (username) {
    let users;

    users = await allQuery(
      `SELECT * FROM users WHERE username LIKE ?`,
      [`%${username}%`]
    );

    if (!users) {
      res.status(404).send(`해당 유저가 없습니다.`);
    } else {
      res.json(users);
    }
  } else {
    const users = await allQuery(`SELECT * FROM users`);
    res.json(users);
  }
});

//  curl -X GET localhost:3000/api/users/1
app.get("/api/users/:id", async (req, res) => {
  const userId = req.params.id;

  //try-catch 해줘야함
  const user = await getQuery(`SELECT * FROM users WHERE id=?`,[userId]);
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
app.post(`/api/users`, async (req, res) => {
  const { username, password } = req.body;
  const result = await runQuery(
    `INSERT INTO users(username, password) VALUES (?,?)`, [username, password]
  );
  
  res.send(`사용자가 추가되었습니다. 신규 ID: ${result.lastID}`);
});

// curl -X PUT localhost:3000/api/users/15 -d username=1 -d password=9999
app.put(`/api/users/:id`, async (req, res) => {
  const userId = req.params.id;
  const {username, password} = req.body;
  
  const result = await runQuery(`UPDATE users SET username=?, password=? WHERE id=?`,[username, password, userId]);
  res.send(`사용자가 수정되었습니다.${JSON.stringify(result)}`);
});

//  curl -X DELETE localhost:3000/api/users/2
app.delete(`/api/users/:id`, async (req, res) => {
  //제일 좋은것은 삭제전에 get조회를 해보는것
  const userId = req.params.id;

  const result = await runQuery(`DELETE FROM users WHERE id=?`,[userId]);
  res.send(`사용자가 삭제되었습니다. ${JSON.stringify(result)}`);
});


//urlencoded(ascii 값으로 변환하는 과정)에서 공백은 %20 혹은 + 로 처리하는게 규칙이다
//curl localhost:3000/api/products?name=Product%201
//curl localhost:3000/api/products?name=
app.get('/api/products',async (req,res) => {
  const {name} = req.query;

  if (name) {
    const products = await allQuery(`SELECT * FROM products WHERE name LIKE ?`,[`%${name}%`]);
    
    if (products.length == 0){
        res.status(404).send("해당 상품이 없습니다.");
    } else {
        res.json(products);
    }

  } else {
    const products = await allQuery(`SELECT * FROM products`);
    res.json(products);
  }
})

app.listen(port, () => {
  console.log(`Server is ready...`);
});
