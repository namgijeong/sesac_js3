const sqlite3 = require("sqlite3").verbose();

const db = new sqlite3.Database("simple.db");

function connectDB(dbname){

}

function runQuery(query, params = []){
  return new Promise((resolve,reject) => {
    db.run(query,params, (err) => {
      if (err) {
        return reject(err);
      }
      resolve(this); //여기서 this는 삽입된 데이터의 id 등 정보를 가지고 있음
    })
  });
}


function allQuery(query){
  return new Promise((resolve,reject) => {
    db.all(query, (err,rows) => {
      if (err) {
        return reject(err);
      }
      resolve(rows); 
    })
  });
}

function getQuery(){

}

function eachQuery(){

}

module.exports = {
    runQuery,
    allQuery,
}