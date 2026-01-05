const Database = require('better-sqlite3');
const db_file = '../mycrm_db.db';
const db = new Database(db_file);

const bcrypt = require('bcrypt');

const apiUsersController = (req, res) => {
  //LIKE '%%'로 하면 모두 다 검색한다는 뜻
  const searchName = req.query.name || '';
  const searchGender = req.query.gender === 'all' ? '%%' : req.query.gender;
  console.log('gender', searchGender);
  const pageNum = parseInt(req.query.page) || 1;
  const itemsPerPage = 20; // 고정=> 하지만 좋은건 아님
  let totalPages = 0;

  const totalCountQuery = `SELECT COUNT(userId) AS count FROM users WHERE userName LIKE ? AND userGender LIKE ?`;
  const row = db.prepare(totalCountQuery).get([`%${searchName}%`, `${searchGender}`]);
  console.log(row);

  const searchCount = row.count;
  totalPages = Math.ceil(searchCount / itemsPerPage);
  const startIndex = 0 + (pageNum - 1) * itemsPerPage;

  const usersQuery = `SELECT * FROM users WHERE userName LIKE ? AND userGender LIKE ? LIMIT ? OFFSET ?`;
  try {
    const rows = db.prepare(usersQuery).all([`%${searchName}%`, `${searchGender}`, itemsPerPage, startIndex]);

    res.json({ totalPages: totalPages, data: rows });
  } catch (err) {
    console.error('사용자 조회 실패:', err);
    return res.status(500).json({ error: '사용자 조회에 실패하였습니다.' });
  }
};

const apiUser = (req, res) => {
  const userId = req.params.id;
  console.log(userId);
  const userQuery = 'SELECT * FROM users WHERE userId=?';
  let row;
  try {
    row = db.prepare(userQuery).get([userId]);

    if (!row) {
      console.error('사용자 조회 실패:', err);
      return res.status(404).json({ error: '사용자 조회에 실패하였습니다.' });
    }

    res.json(row);
  } catch (err) {
    console.error('사용자 조회 실패:', err);
    return res.status(500).json({ error: '사용자 조회에 실패하였습니다.' });
  }
};

const apiUsersPasswordReset = (req, res) => {
  const passwordToRegister = 'pass1234';

  bcrypt.hash(passwordToRegister, 10, (err, hash) => {
    if (err) {
      console.error(err.message);
    } else {
      try {
        const usersQuery = `UPDATE users SET userPassword = ?`;
        const result = db.prepare(usersQuery).run([hash]);
        if (result.changes > 0) {
          res.status(200).json({ success: '사용자들 비밀번호 초기화 완료' });
        }
      } catch (err) {
        return res.status(500).json({ error: '사용자들 비밀번호 초기화 실패' });
      }
    }
  });
};

const apiUserLoginCheck = (req, res) => {
  const userName = req.body.userName;
  const userPassword = req.body.userPassword;

  try {
    const loginCheckQuery = 'SELECT * FROM users WHERE userName = ?';
    const user = db.prepare(loginCheckQuery).get([userName]);
    //console.log(user);

    if (user) {
      // 저장된 해시와 입력된 패스워드를 비교
      bcrypt.compare(userPassword, user.userPassword, (err, result) => {
        //console.log(result);
        if (result) {
          //세션에 저장
          req.session.user = {
            id: user.userId,
            username: user.userName,
          };

          return res.status(200).json({ success: '사용자 로그인 완료' });

          //왜 303?
          //POST → GET 전환에 가장 안전
          //새로고침 시 POST 재전송 방지
          //res.redirect(303, "/kiosk/user/register");
        } else {
          return res.status(401).json({ error: '사용자 로그인 정보 불일치' });
        }
      });
    } else {
      return res.status(401).json({ error: '사용자 로그인 정보 불일치' });
    }
  } catch (err) {
    return res.status(500).json({ error: '사용자 로그인 정보 불일치' });
  }
};

const apiUserOrders = (req, res) => {
  const userId = req.params.id;
  console.log(userId);
  const userOrderQuery = `
    SELECT orderId AS orderId, orderAt AS 'purchased date', storeId AS 'purchased location'
    FROM orders 
    WHERE userId = ?
    ORDER BY orderAt DESC
  `;
  let rows;

  try {
    // 없으면 빈배열 반환
    rows = db.prepare(userOrderQuery).all([userId]);

    res.json(rows);
  } catch (err) {
    console.error('사용자의 주문 조회 실패:', err);
    return res.status(500).json({ error: '사용자의 주문 조회에 실패하였습니다.' });
  }
};

const apiUserStoresTop5 = (req, res) => {
  const userId = req.params.id;
  console.log(userId);
  const userStoreTop5Query = `
    SELECT COUNT(*) AS visitCount, s.storeName AS storeName
    FROM users u
    JOIN orders o ON u.userId = o.userId
    JOIN stores s ON o.storeId = s.storeId 
    WHERE u.userId = ?
    GROUP BY s.storeId
    ORDER BY visitCount DESC
    LIMIT 5
  `;
  let rows;
  try {
    //없으면 빈배열 반환
    rows = db.prepare(userStoreTop5Query).all([userId]);

    res.json(rows);
  } catch (err) {
    console.error('사용자의 자주 방문한 매장 top5 조회 실패:', err);
    return res.status(500).json({ error: '사용자의 자주 방문한 매장 top5 조회에 실패하였습니다.' });
  }
};

const apiUserItemsTop5 = (req, res) => {
  const userId = req.params.id;
  console.log(userId);
  const userItemTop5Query = `
    SELECT COUNT(i.itemId) AS purchasedCount , i.itemName AS itemName
    FROM users u
    JOIN orders o ON u.userid = o.userId
    JOIN orderItems oi ON o.orderId = oi.orderId
    JOIN items i ON oi.itemId = i.itemId
    WHERE u.userid = ?
    GROUP BY i.itemId
    ORDER BY purchasedCount DESC
    LIMIT 5
  `;
  let rows;
  try {
    //없으면 빈배열 반환
    rows = db.prepare(userItemTop5Query).all([userId]);

    res.json(rows);
  } catch (err) {
    console.error('사용자의 자주 주문한 상품 top5 조회 실패:', err);
    return res.status(500).json({ error: '사용자의 자주 주문한 상품 top5 조회에 실패하였습니다.' });
  }
};

module.exports = {
  apiUsersController,
  apiUser,
  apiUsersPasswordReset,
  apiUserLoginCheck,
  apiUserOrders,
  apiUserStoresTop5, apiUserItemsTop5
};
