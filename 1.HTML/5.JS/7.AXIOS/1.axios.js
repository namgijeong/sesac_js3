// async function fetch_main() {
//     const res = await fetch('https://jsonplaceholder.typicode.com/posts/1')
//     const data = await res.json();
//     console.log(data);
// }

// fetch_main();


//즉시 실행함수 IIFE 
//첫번째 괄호 => 이름이 없으니 전체를 담는다
//두번째 괄호 => () 함수 실행
// (async () => {
//     const res = await fetch('https://jsonplaceholder.typicode.com/posts/1')
//     const data = await res.json();
//     console.log(data);
// })();

//npm i axios 설치
const axios = require('axios');
async function axios_main(){
    const res = await axios.get('https://jsonplaceholder.typicode.com/posts/1');
    const data = res.data;
    console.log(data);
}

axios_main();