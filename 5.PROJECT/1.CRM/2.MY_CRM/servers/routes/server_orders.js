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
router.get("/orders", (req, res) => {
  console.log("루트 파일 주소는", __dirname);
  res.sendFile(path.join(__dirname, "../../public/orders", "orders.html"));
});

router.get("/orders/:id", (req, res) => {
  res.sendFile(path.join(__dirname, "../../public/orders", "order_detail.html"));
});

/******************
 * 백엔드 API 요청
 ******************/
router.get("/api/orders", (req, res) => {
  //LIKE '%%'로 하면 모두 다 검색한다는 뜻
  const searchName = req.query.name || "";
  const pageNum = parseInt(req.query.page) || 1;
  const itemsPerPage = 20; // 고정=> 하지만 좋은건 아님
  let totalPages = 0;

  const totalCountQuery = `SELECT COUNT(orderId) AS count FROM orders WHERE orderId LIKE ?`;
  const row = db.prepare(totalCountQuery).get([`%${searchName}%`]);
  console.log(row);
  
  const searchCount = row.count;
  totalPages = Math.ceil(searchCount / itemsPerPage);
  const startIndex = 0 + (pageNum - 1) * itemsPerPage; 

  const ordersQuery = `SELECT * FROM orders WHERE orderId LIKE ? LIMIT ? OFFSET ?`;
  try {
    const rows = db.prepare(ordersQuery).all([`%${searchName}%`, itemsPerPage, startIndex]);
    
    res.json({ totalPages: totalPages, data: rows });

  } catch (err) {
    console.error("주문 조회 실패:", err);
    return res.status(500).json({ error: "주문 조회에 실패하였습니다." });
  }
});

router.get("/api/orders/:id", (req, res) => {
  const orderId = req.params.id;
  console.log(orderId);
  const orderQuery = "SELECT oi.orderItemId AS orderItemId, oi.orderId AS orderId, oi.itemId AS itemId, i.itemName AS itemName FROM orders o JOIN orderItems oi ON o.orderId = oi.orderId JOIN items i ON o.itemId = i.itemId WHERE orderId=?";
  let row;
  try{
    row = db.prepare(orderQuery).get([orderId]);

     if (!row) {
      console.error("주문 조회 실패:", err);
      return res.status(404).json({ error: "주문 조회에 실패하였습니다." });
    }

    res.json(row);

  } catch (err){
    console.error("주문 조회 실패:", err);
    return res.status(500).json({ error: "주문 조회에 실패하였습니다." });
  }

});

module.exports = router;