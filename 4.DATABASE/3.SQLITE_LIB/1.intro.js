const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('simple.db');

//db run은 각한줄씩 비동기로 실행된다
db.run("CREATE TABLE IF NOT EXISTS users (id TEXT, name TEXT)");
db.run("INSERT INTO users VALUES('id001', 'user1')");

db.close();