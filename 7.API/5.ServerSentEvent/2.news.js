const express = require('express');
const path = require('path');

const app = express();
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', '2.news.html'));
});

const newsArticles = [
  '정부, 전기요금 인상 방안 검토…서민 부담 우려',
  '서울 집값 상승세 지속…전세 시장도 불안',
  '의대 정원 확대 논란…의료계 반발 확산',
  '청년 취업난 심화…중소기업 인력 부족 심각',
  '미세먼지 농도 ‘나쁨’ 수준…외출 자제 권고',
  '수도권 지하철 요금 인상 검토…시민 반발',
  '국내 기업 AI 투자 확대…관련주 강세',
  '초등학교 돌봄교실 확대 정책 본격 시행',
  '정부, 소상공인 금융 지원 대책 발표',
  '겨울철 독감 유행…백신 접종률 증가',
];

app.get('/newsfeed', (req, res) => {
  //SSE 헤더 설정
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  //연결을 유지하라는 패킷
  res.setHeader('Connection', 'keep-alive');

  //뉴스 전송
  let index = 0;
  const sendNews = () => {
    if (index >= newsArticles.length) {
      index = 0;
    }

    const news = newsArticles[index];
    index++;
    res.write(`data:${JSON.stringify({ news })}\n\n`);
  };

  //2~5초의 랜덤 딜레이로 전달하기
  const interval = setInterval(
    () => {
      sendNews();
    },
    Math.floor(Math.random() * 3000) + 2000,
  );

  req.on('close', () => {
    clearInterval(interval);
  });
});

app.listen(3000, () => {
  console.log('서버 레디');
});
