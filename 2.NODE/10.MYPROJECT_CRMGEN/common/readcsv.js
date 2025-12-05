// 외부 모듈 설치 npm i csv-parser
import csv from 'csv-parser';
import fs from 'fs';

function readCsv(type) {
    let fileName = '';

    switch (type) {
        case 'users':
            fileName = 'users.csv';
            break;
        case 'stores':
            fileName = 'stores.csv';
            break;
        case 'items':
            fileName = 'items.csv';
            break;
        case 'orders':
            fileName = 'orders.csv';
            break;
        case 'orderItems':
            fileName = 'orderItems.csv';
            break;
        default:
    }

    let readResults = [];

    // Promise 내부에서 reject()가 발생
    // 자바스크립트는 Reject 상태를 현재 컨텍스트로 전달
    // await가 있는 위치에서 throw로 변환
    // try-catch가 잡음
    // 즉, Promise는 비동기 에러를 동기 흐름처럼 전달해 주는 역할을 함.

    return new Promise((resolve, reject) => {
        fs.createReadStream(fileName)
            //error는 공식문서에 없지만 블로그에서 이런 정보로 쓴다함
            .on('error', (err) => {
                console.log('error read');
                reject(err);
            })
            .pipe(csv())
            //데이터를 읽을때마다
            .on('data', data => {
                readResults.push(data);

            })
            //error는 공식문서에 없지만 블로그에서 이런 정보로 쓴다함
            .on('error', (err) => {
                console.log('error read');
                reject(err);
            })
            .on('end', () => {
                resolve(readResults);
            });
    });

}

export default readCsv;
