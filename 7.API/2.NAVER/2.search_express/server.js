import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
//npm install cors
import cors from 'cors';

dotenv.config({ quiet: true });
const app = express();
const PORT = 3000;
//app.use(express.static('./public'));
app.use(express.json());
app.use(morgan('dev'));
//프론트 서버 주소
// app.use(cors({
//   origin:['http://127.0.0.1:5173', 'http://localhost:5173']
// }));

const client_id = process.env.NAVER_CLIENT_ID;
const client_secret = process.env.NAVER_CLIENT_SECRET;

if (!client_id || !client_secret){
  console.error('NAVER_CLIENT_ID 또는 NAVER_CLIENT_SECRET이 없습니다. .env를 확인해주세요');
  //프로그램 자체를 실행중지
  process.exit(1);
}

const headers = {
  'X-Naver-Client-Id': client_id,
  'X-Naver-Client-Secret': client_secret,
};

async function searchBlog(text, page = 1, display = 10) {
  let start = 1 + (page - 1) * display;

  const encText = encodeURIComponent(text);
  const url = `https://openapi.naver.com/v1/search/blog?query=${encText}&display=${display}&start=${start}`; //기본값 json
  // try {
    const res = await fetch(url, {
      headers: headers,
    });

    // 인증키가 없어서 401같은거는 fetch가 정상적으로 수행되나, 200번대 코드가 아니기 때문에 이 if문 수행
    if (!res.ok) {
      throw new Error(`요청에 실패했습니다. ${res.status}, ${res.statusText}`);
    }

    const data = await res.json();

    return data;
  // } catch (err) {
  //   throw new Error(err.message);
  // }
}

// curl -X POST http://localhost:3000/search/blog ^
//   -H "Content-Type: application/json" ^
//   -d "{\"page\":\"3\",\"text\":\"자바스크립트\"}"

app.post('/search/blog', async (req, res) => {
  const page = parseInt(req.body.page || 1);
  const text = req.body.text;

  try {
    const data = await searchBlog(text, page);
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

const server = app
  .listen(PORT, () => {
    console.log('서버레디');
  });

  server.on('error', (err) => {
    if (err.code == 'EADDRINUSE'){
      console.log(`${PORT} 번 이미 사용중`);
    } else {
      console.error('Server error:', err);
    }

    process.exit(1);
  });
  
