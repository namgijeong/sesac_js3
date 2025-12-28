const express = require("express");
const morgan = require("morgan");
const Database = require("better-sqlite3");
const path = require("path");

const PORT = 3000;
const db_file = "../mycrm_db.db";

const app = express();
const db = new Database(db_file);

app.use(morgan("dev"));
//이 경로를 기준으로 js 파일을 찾아 서빙할 수 있다
app.use(express.static(path.join(__dirname, "../public")));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

/******************
 * 사용자 요청 페이지 전달
 ******************/
app.get("/", (req, res) => {
  console.log("루트 파일 주소는", __dirname);
  res.sendFile(path.join(__dirname, "../public", "users.html"));
});

app.get("/users/:id", (req, res) => {
  const userId = req.params;
  res.sendFile(path.join(__dirname, "../public", "user_detail.html"));
});

/******************
 * 백엔드 API 요청
 ******************/
app.get("/api/users", (req, res) => {
  //LIKE '%%'로 하면 모두 다 검색한다는 뜻
  const searchName = req.query.name || "";
  const pageNum = req.query.page || 1;
  const itemsPerPage = 20; // 고정=> 하지만 좋은건 아님
  let totalPages = 0;

  const totalCountQuery = `SELECT COUNT(userId) AS count FROM users WHERE userName LIKE ?`;
  const row = db.prepare(totalCountQuery).get([`%${searchName}%`]);
  console.log(row);
  const searchCount = row.count;
  totalPages = Math.ceil(searchCount / itemsPerPage);

  const usersQuery = `SELECT * FROM users WHERE userName LIKE ? LIMIT ?`;
  try {
    const rows = db.prepare(usersQuery).all([`%${searchName}%`, itemsPerPage]);
    
    res.json({ totalPages: totalPages, data: rows });

  } catch (err) {
    console.error("사용자 조회 실패:", err);
    return res.status(500).json({ error: "사용자 조회에 실패하였습니다." });
  }
});

app.get("/api/users/:id", (req, res) => {
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

app.listen(PORT, () => {
  console.log(`Sever is ready at ${PORT}`);
});
