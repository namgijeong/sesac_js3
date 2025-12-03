// 외부 모듈 설치 npm i csv-parser
const csv = require('csv-parser');
//내장 모듈
const fs = require('fs');
const results = [];

//파일 읽기
fs.createReadStream('data.csv')
  .pipe(csv())
  //데이터를 읽을때
  .on('data', (data) => results.push(data))
  //데이터 읽기가 완료되면
  .on('end', () => {
    console.log(results);
    
  });

