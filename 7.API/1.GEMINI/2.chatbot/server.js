import express from 'express';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';
import moragn from 'morgan';

dotenv.config({ quiet: true });

const app = express();
app.use(express.json());
app.use(express.static('public'));

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

//실제로는 사용자 세션 구분도 해야하고, 토큰 제한도 해야함
let history = [];


app.post('/api/chat', async (req, res) => {
  const { message } = req.body;

  history.push({role:'user', parts:[{text:message}]});
  
  history.slice(-20); //최근 20개만 남기고 다 버린다

  console.log('---질문 시작----');
  console.log(history);
  console.log('---질문 끝----');

  try {
    const response = await ai.models.generateContent({
      //model: 'gemini-2.5-flash', //원하는 모델 선택
      model: 'gemini-2.0-flash-lite', //원하는 모델 선택
      contents: history,
    });

    const reply = response.text;
    console.log(reply);
    history.push({role:'user', parts:[{text:reply}]});

    res.json({reply});

  } catch (err) {
    res.status(500).json({ error: '알 수 없는 오류...' }); //좋은 메시지가 아님
    console.log(err);
  }


});


app.listen(3000, () => {
  console.log('서버레디');
});
