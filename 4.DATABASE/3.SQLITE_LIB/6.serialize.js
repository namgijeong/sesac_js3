const sqlite3 = require("sqlite3").verbose();

const db = new sqlite3.Database("simple.db");

//db run은 각한줄씩 비동기로 실행된다 =>  
//serialize 구간에서는 async await 안해줘도 순서가 보장된다.    
db.serialize(() => {
  db.run("CREATE TABLE IF NOT EXISTS users (id TEXT, name TEXT)");
  db.run("INSERT INTO users VALUES('id001', 'user1')");

  db.all("SELECT * FROM users",(err, rows) => {
    if (err) return console.error(err);
    console.log('조회된 데이터:', rows);
  })
});

db.close();
