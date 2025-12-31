const express = require("express");
const Database = require("better-sqlite3");
const path = require("path");

const db_file = "../mycrm_db.db";

// express.Router()는 라우트들을 묶기 위한 독립적인 라우팅 객체
// 즉,
// app처럼 get / post / put / delete를 가질 수 있고
// 근데 서버를 띄우는 역할은 안 함

const router = express.Router();
const db = new Database(db_file);


/******************
 * 사용자 요청 페이지 전달
 ******************/
router.get("/", (req, res) => {
  console.log("루트 파일 주소는", __dirname);
  res.sendFile(path.join(__dirname, "../../public/users", "users.html"));
});

router.get("/users/:id", (req, res) => {
  res.sendFile(path.join(__dirname, "../../public/users", "user_detail.html"));
});

/******************
 * 백엔드 API 요청
 ******************/
router.get("/api/users", (req, res) => {
  //LIKE '%%'로 하면 모두 다 검색한다는 뜻
  const searchName = req.query.name || "";
  const searchGender = req.query.gender === "all" ? "%%" : req.query.gender;
  console.log("gender", searchGender);
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
    console.error("사용자 조회 실패:", err);
    return res.status(500).json({ error: "사용자 조회에 실패하였습니다." });
  }
});

router.get("/api/users/:id", (req, res) => {
  const userId = req.params.id;
  console.log(userId);
  const userQuery = "SELECT * FROM users WHERE userId=?";
  let row;
  try{
    row = db.prepare(userQuery).get([userId]);

     if (!row) {
      console.error("사용자 조회 실패:", err);
      return res.status(404).json({ error: "사용자 조회에 실패하였습니다." });
    }

    res.json(row);

  } catch (err){
    console.error("사용자 조회 실패:", err);
    return res.status(500).json({ error: "사용자 조회에 실패하였습니다." });
  }

});


router.get("/api/users_orders/:id", (req, res) => {
  const userId = req.params.id;
  console.log(userId);
  const userOrderQuery = `
  SELECT orderId AS orderId, orderAt AS 'purchased date' , storeId AS 'purchased location'
  FROM orders 
  WHERE userId = ?
  ORDER BY orderAt DESC
  `;
  let rows;
  try{
    //없으면 빈배열 반환
    rows = db.prepare(userOrderQuery).all([userId]);

    res.json(rows);

  } catch (err){
    console.error("사용자의 주문 조회 실패:", err);
    return res.status(500).json({ error: "사용자의 주문 조회에 실패하였습니다." });
  }

});


router.get("/api/users_stores_top5/:id", (req, res) => {
  const userId = req.params.id;
  console.log(userId);
  const userStoreTop5Query = `
  SELECT COUNT(*) AS visitCount, s.storeName AS storeName
  FROM users u
  JOIN orders o
  ON u.userId = o.userId
  JOIN stores s
  ON o.storeId = s.storeId 
  WHERE u.userId = ?
  GROUP BY s.storeId
  ORDER BY visitCount DESC
  LIMIT 5
  `;
  let rows;
  try{
    //없으면 빈배열 반환
    rows = db.prepare(userStoreTop5Query).all([userId]);

    res.json(rows);

  } catch (err){
    console.error("사용자의 자주 방문한 매장 top5 조회 실패:", err);
    return res.status(500).json({ error: "사용자의 자주 방문한 매장 top5 조회에 실패하였습니다." });
  }

});

router.get("/api/users_items_top5/:id", (req, res) => {
  const userId = req.params.id;
  console.log(userId);
  const userItemTop5Query = `
  SELECT COUNT(i.itemId) AS purchasedCount , i.itemName AS itemName
  FROM users u
  JOIN orders o
  ON u.userid = o.userId
  JOIN orderItems oi
  ON o.orderId = oi.orderId
  JOIN items i
  ON oi.itemId = i.itemId
  WHERE u.userid = ?
  GROUP BY i.itemId
  ORDER BY purchasedCount DESC
  LIMIT 5
  `;
  let rows;
  try{
    //없으면 빈배열 반환
    rows = db.prepare(userItemTop5Query).all([userId]);

    res.json(rows);

  } catch (err){
    console.error("사용자의 자주 주문한 상품 top5 조회 실패:", err);
    return res.status(500).json({ error: "사용자의 자주 주문한 상품 top5 조회에 실패하였습니다." });
  }

});

module.exports = router;