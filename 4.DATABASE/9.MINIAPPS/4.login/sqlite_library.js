const sqlite3 = require("sqlite3").verbose();
let db;

function connectDB(dbname) {
  db = new sqlite3.Database(dbname);
}

function runQuery(query, params = []) {
  return new Promise((resolve, reject) => {
    db.run(query, params, function (err) {
      if (err) {
        return reject(err);
      }
      //this => db.run 내부에서 처리한 결과 객체=>  RunResult 형태의 Statement
      //여기서 처리한 콜스택.. 컨텍스트
      //단 화살표함수로 전달할때는 컨텍스트가 전달이 안됨
      resolve(this); //여기서 this는 삽입된 데이터의 id 등 정보를 가지고 있음
    });
  });
}

function allQuery(query, params = []) {
  return new Promise((resolve, reject) => {
    db.all(query, params, (err, rows) => {
      if (err) {
        return reject(err);
      }
      resolve(rows);
    });
  });
}

function getQuery(query, params = []) {
  return new Promise((resolve, reject) => {
    db.get(query, params, (err, row) => {
      if (err) {
        return reject(err);
      }
      resolve(row);
    });
  });
}

function eachQuery() {}

module.exports = {
  connectDB,
  runQuery,
  allQuery,
  getQuery,
};
