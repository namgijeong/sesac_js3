import dotenv from 'dotenv';

dotenv.config({ quiet: true });

const text = '자바스크립트';
const encText = encodeURIComponent(text);

let page = 3;
const display = 10;
let start = 1 + (page - 1) * display;

let dataArray = [];

const url = `https://openapi.naver.com/v1/search/blog?query=${encText}&display=${display}&start=${start}`; //기본값 json
// const url = 'https://openapi.naver.com/v1/search/blog.xml';
// const url = 'https://openapi.naver.com/v1/search/blog.json';

//console.log(url);

const headers = {
  'X-Naver-Client-Id': process.env.NAVER_CLIENT_ID,
  'X-Naver-Client-Secret': process.env.NAVER_CLIENT_SECRET,
};

async function run() {
  try {
    const res = await fetch(url, {
      headers: headers,
    });

    //200대 일때만
    if (!res.ok) {
      throw new Error(`요청에 실패했습니다. ${res.status}, ${res.statusText}`);
    }

    const data = await res.json();
    //console.log(data);

    for (let item of data.items) {
      dataArray.push(item);
    }

  
  } catch (err) {
    console.error('Error: ', err.message);
  }
}

async function readLoop() {
  for (let i = 1; i <= 3; i++) {
    page = i;
    start = 1 + (page - 1) * display;
    await run();
  }

  console.log(dataArray);
}

readLoop();


