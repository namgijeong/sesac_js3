const express = require('express');
const Database = require('better-sqlite3');
const path = require('path');
//require을 쓰려면 구버전 설치
// npm install uuid@8
const uuid = require('uuid');

const formatDateTime = require('../../public/js/util/datetime');
const db_file = '../mycrm_db.db';

// express.Router()는 라우트들을 묶기 위한 독립적인 라우팅 객체
// 즉,
// app처럼 get / post / put / delete를 가질 수 있고
// 근데 서버를 띄우는 역할은 안 함

const router = express.Router();
const db = new Database(db_file);

router.post('/api/kiosk/order', (req, res) => {
  /*
  let orderItemId;
  while (1) {
    orderItemId = uuid.v4();
    console.log(orderItemId);

    const orderItemQuery = `SELECT COUNT(orderItemId) AS count FROM orderItems WHERE orderItemId = ? `;
    let row;
    try {
      row = db.prepare(orderItemQuery).get([orderItemId]);

      if (row.count == 0) {
        break;
      }
    } catch (err) {
      return res
        .status(500)
        .json({ error: "생성한 아이디가 중복되는지 검사하던도중, 오류발생" });
    }
  }
  */
  //중복되지 않았으면 db insert

  const orderId = uuid.v4();

  const storeId = req.body.storeId;
  //주문한 아이템들 배열 itemId
  const items = req.body.items;
  console.log(storeId);
  console.log(items);

  //세션에서 로그인 정보 읽기
  if (!req.session.user) {
    console.log('로그인안함');
    return res.status(500).json({ error: '로그인 필요' });
  }

  const userId = req.session.user.id;

  try {
    const orderQuery = `INSERT INTO orders(orderId, orderAt, storeId, userId) VALUES(?, ?, ?, ?)`;
    db.prepare(orderQuery).run([orderId, formatDateTime(new Date()), storeId, userId]);
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: '최종 주문 접수 실패' });
  }

  //foreach를 쓰면 return이 되도 반복문이 종료가 안됨
  for (const item of items) {
    const itemId = item;
    const orderItemId = uuid.v4();

    try {
      const orderItemQuery = `INSERT INTO orderItems(orderItemId, orderId, itemId) VALUES(?, ?, ?)`;
      db.prepare(orderItemQuery).run([orderItemId, orderId, itemId]);
    } catch (err) {
      console.log(err);
      return res.status(500).json({ error: '주문한 상품 접수 실패' });
    }
  }

  res.status(200).json({ success: '주문이 접수되었습니다' });
});

module.exports = router;
