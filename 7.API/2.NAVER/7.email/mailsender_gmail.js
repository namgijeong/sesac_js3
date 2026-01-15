require('dotenv').config({ quiet: 'true' });
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_EMAIL,
    pass: process.env.GMAIL_PASSWORD,
  },
});

const mailOptions = {
  from: process.env.GMAIL_EMAIL,
  //일단 내가 나한테 보낸다
  to: process.env.NAVER_EMAIL,
  subject: '테스트 이메일',
  //단순 글자를 넣으려면 text: 로 해야함
  //여기에 html을 넣을 수 있다.
  html: `
  <!DOCTYPE html>
<html lang="ko">
  <head>
    <meta charset="UTF-8" />
    <title>안내 메일</title>
  </head>
  <body style="margin:0; padding:0; background-color:#f5f7fa;">
    <table
      width="100%"
      cellpadding="0"
      cellspacing="0"
      style="background-color:#f5f7fa; padding:40px 0;"
    >
      <tr>
        <td align="center">
          <table
            width="600"
            cellpadding="0"
            cellspacing="0"
            style="
              background-color:#ffffff;
              border-radius:8px;
              box-shadow:0 4px 12px rgba(0,0,0,0.08);
              font-family:Arial, Helvetica, sans-serif;
            "
          >
            <tr>
              <td style="padding:32px;">
                <h2 style="margin:0 0 16px; color:#333;">
                  👋 안녕하세요!
                </h2>

                <p style="margin:0 0 16px; color:#555; line-height:1.6;">
                  이것은 <strong>나의 첫 Node.js로 발송한 이메일</strong>입니다.
                </p>

                <p style="margin:0 0 24px; color:#555; line-height:1.6;">
                  이메일이 정상적으로 도착했다면  
                  메일 발송 설정이 잘 완료된 것입니다 😊
                </p>

                <a
                  href="#"
                  style="
                    display:inline-block;
                    padding:12px 20px;
                    background-color:#4f46e5;
                    color:#ffffff;
                    text-decoration:none;
                    border-radius:6px;
                    font-size:14px;
                  "
                >
                  확인하기
                </a>

                <hr style="margin:32px 0; border:none; border-top:1px solid #eee;" />

                <p style="margin:0; font-size:12px; color:#999;">
                  본 메일은 자동 발송 메일입니다.
                </p>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>

    `,
};

transporter.sendMail(mailOptions, (error, info) => {
  if (error) {
    console.error(error);
  } else {
    console.log('이메일 전송 성공:', info);
  }
});
