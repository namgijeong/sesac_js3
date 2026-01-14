import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';

dotenv.config({ quiet: true });
const app = express();
const PORT = 3000;
app.use(express.static('/public'));
app.use(express.json());
app.use(morgan('dev'));

const headers = {
  'X-Naver-Client-Id': process.env.NAVER_CLIENT_ID,
  'X-Naver-Client-Secret': process.env.NAVER_CLIENT_SECRET,
};

async function searchBlog(text, page = 1, display = 10) {
  let dataArray = [];
  let start = 1 + (page - 1) * display;

  const encText = encodeURIComponent(text);
  const url = `https://openapi.naver.com/v1/search/blog?query=${encText}&display=${display}&start=${start}`; //기본값 json
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

    return dataArray;
  } catch (err) {
    throw new Error(err.message);
  }
}

// curl -X POST http://localhost:3000/search/blog ^
//   -H "Content-Type: application/json" ^
//   -d "{\"page\":\"3\",\"text\":\"자바스크립트\"}"

app.post('/search/blog', async (req, res) => {
  const page = parseInt(req.body.page);
  const text = req.body.text;

  try {
    const data = await searchBlog(text, page);
    res.status(200).json({ data });
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
  });
  
