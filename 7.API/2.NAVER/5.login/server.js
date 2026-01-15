import express from 'express';
import morgan from 'morgan';
import dotenv from 'dotenv';
import session from 'express-session';
import axios from 'axios';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();
const PORT = 3000;
dotenv.config({ quiet: 'true' });

//esm module에서 __dirname이 존재하지 않기 때문에
//가상으로 dirname 만들기
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const NAVER_CLIENT_ID = process.env.NAVER_CLIENT_ID;
const NAVER_CLIENT_SECRET = process.env.NAVER_CLIENT_SECRET;

const NAVER_AUTH_URL = 'https://nid.naver.com/oauth2.0/authorize';
const NAVER_AUTH_REDIRECT_URL = process.env.NAVER_AUTH_REDIRECT_URL;

const NAVER_TOKEN_URL = 'https://nid.naver.com/oauth2.0/token';

const NAVER_USERINFO_URL = 'https://openapi.naver.com/v1/nid/me';

app.use(express.static('public'));
app.use(morgan('dev'));

app.use(
  session({
    secret: 'this-is-my-secret-password',
    resave: false,
    saveUninitialized: false,
    //세션에서 주는 세션아이디를 쿠키에 저장 이것에 대한 유효시간임
    cookie: {
      maxAge: 60000,
    },
  }),
);

/*******************
 * 페이지 요청들
 ******************/
app.get('/login', (req, res) => {
  //1.네이버로 사용자를 보낸다
  //state는 개발자가 아무거나 지어준다
  const authUrl = `${NAVER_AUTH_URL}?response_type=code&client_id=${NAVER_CLIENT_ID}&redirect_uri=${NAVER_AUTH_REDIRECT_URL}&state=SESAC`;
  res.redirect(authUrl);
});

app.get('/dashboard', checkLogin, (req, res) => {
  //하지만 type module esm 방식부터는 원래 __dirname을 쓸 수 없음 => 위에서 가상으로 만든것
  res.sendFile(path.join(__dirname, 'public', 'dashboard.html'));
});

app.get('/user', checkLogin, (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'user.html'));
});

app.get('/logout', (req, res) => {
  //우리 세션 로그아웃
  //네이버 자체 로그아웃을 직접 하는건 아니다.

  req.session.destroy((err) => {
    if (err) {
      console.error('세션 삭제 실패', err);
      return res.status(500).json({ error: '로그아웃 실패' });
    }

    return res.status(200).json({ success: '로그아웃 성공' });
  });
});

//미들웨어를 통해서 내가 xxx 페이지로 갈때마다, 가기전 미들웨어를 들려서 세션유무 판단
//없으면 /error로 보내기
function checkLogin(req, res, next) {
  if (req.session.user) return next();

  res.status(403).sendFile(path.join(__dirname, 'public', 'error.html'));
}

/*******************
 * API 요청들
 ******************/

app.get('/api/user', (req, res) => {
  //세션에 저장해둔 사용자 정보 전달하기
  //if req.session?.user 해도 됨

  //구조분해 대상은 반드시 객체여야 함
  //즉 이 주석 코드는 에러가 생김
  //const {user} = req.session || null
  const user = req.session?.user || null;

  console.log(user);
  if (user) {
    res.status(200).json(user);
  } else {
    res.status(404).json({ error: '로그인 되어있지 않음' });
  }
});

app.get('/api/oauth2/callback', async (req, res) => {
  const { code, state } = req.query;
  console.log('사용자가 받아온 코드', code, state);

  //2.사용자가 받아온 코드를 검증한다.
  //접근 토큰 발급을 하는 과정
  //사용자가 가지고 온 code가 맞는지, 다시 네이버에게 물어본다.
  const tokenUrl = new URL(NAVER_TOKEN_URL);
  //get파라미터를 search라고 한다 => 그냥 fetch ?로 만들어도 된다.
  tokenUrl.search = new URLSearchParams({
    grant_type: 'authorization_code',
    client_id: NAVER_CLIENT_ID,
    client_secret: NAVER_CLIENT_SECRET,
    code: code,
    state: state,
  });

  //위 정보를 담아서 다시 네이버에게 토큰을 요청한다
  console.log('네이버에 확인 중:', tokenUrl.toString());
  //const tokenResp = await fetch(tokenUrl.toString());

  //   if (!tokenResp.ok) {
  //     throw new Error(`Token 요청 실패:${tokenResp.status}`);
  //   }
  //   const tokenData = await tokenResp.json();
  //   console.log('최종토큰모음', tokenData);

  //또다른 요청 방법
  const tokenResp = await axios.get(NAVER_TOKEN_URL, {
    params: {
      grant_type: 'authorization_code',
      client_id: NAVER_CLIENT_ID,
      client_secret: NAVER_CLIENT_SECRET,
      code: code,
      state: state,
    },
  });

  const tokenData = tokenResp.data;
  console.log('최종토큰모음', tokenData);

  //3. 확인된 최종토큰(access-token)을 사용해서, 사용자의 정보를 받아온다
  console.log('최종 access_token', tokenData.access_token);
  const userInfoResp = await fetch(NAVER_USERINFO_URL, {
    headers: {
      Authorization: `Bearer ${tokenData.access_token}`,
    },
  });

  if (!userInfoResp.ok) {
    throw new Error(`UserInfo 요청 실패:${userInfoResp.status}`);
  }

  const userInfoData = await userInfoResp.json();
  console.log(userInfoData);

  //res.json(userInfoData); // 내가 원하는 정보로 가공해서 front로 보내기

  //세션에 저장
  req.session.user = { id: userInfoData.response.id, totalData: userInfoData.response };
  console.log(req.session.user);
  res.redirect('/dashboard');
});

app.listen(PORT, () => {
  console.log('서버 레디');
});
