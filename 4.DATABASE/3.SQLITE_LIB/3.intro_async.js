const sqlite3 = require("sqlite3").verbose();

const db = new sqlite3.Database("simple.db");

async function do_db_notworking() {
  //db run은 각한줄씩 비동기로 실행된다
  //어근데 await을 써도 실행이 안됨 => 원작자가 promise로 return을 안한 상태
  const result = await db.run("CREATE TABLE IF NOT EXISTS users (id TEXT, name TEXT)");

  //await가 기다려 줄 수 있는건?
  //내가 일을 시킨애가 일관된(공통된) 방법으로, 나의 진행상황을 알려줄 수 있음
  //진행상황을 알려주는 애 promise라는 객체 형태로 상태를 알려주고
  //그때 이 상태는?? pending, fulfilled, rejected를 통해서 상태를 알려줌
}

//do_db_notworking(); 

//promise를 반납하지 않는애를 promise로 만들기
async function do_db_working(){
  await new Promise((resolve, reject) => {
     db.run("CREATE TABLE IF NOT EXISTS users (id TEXT, name TEXT)", (err) => {
        if (err) reject(err);
        else {resolve()};
     });
  })

  console.log('테이블이 성공적으로 생성되었습니다.');

  const result = await new Promise((resolve,reject) => {
    db.run("INSERT INTO users VALUES('id001', 'user1')", (err) => {
      if (err) reject(err);
      else {resolve()};
    });
  });

  console.log('데이터 삽입이 성공했습니다.');

  const rows = await new Promise((resolve, reject) => {
    const results = [];
    db.each('SELECT * FROM users', (err, row) => {
      if (err) reject(err);
      else results.push(row);
    }, (err, count) => {
      if (err) reject(err);
      else resolve(results);
    });  
    
  })

  console.log('조회가 성공했습니다.');
  rows.forEach(row => console.log('조회된 메시지:',row));
}

do_db_working();
