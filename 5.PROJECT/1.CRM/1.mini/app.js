const express = require("express");
const morgan = require("morgan");
const sqlite3 = require("sqlite3").verbose();
const path = require("path");

const app = express();
const db = new sqlite3.Database("users.db");

app.use(morgan("dev"));
app.use(express.static("public"));

const users = [];

/******************
 * 사용자 요청 페이지 전달
 ******************/

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "users.html"));
});

app.get("/users/:id", (req, res) => {
  const userId = req.params;
  res.sendFile(path.join(__dirname, "public", "user_detail.html"));
});

/******************
 * 백엔드 API 요청
 ******************/

app.get("/api/users", (req, res) => {
  const searchName = req.query.name || "";
  const pageNum = req.query.page || 1;
  const itemsPerPage = 20; // 고정=> 하지만 좋은건 아님
  let totalPages = 0;

  const totalCountQuery = `SELECT COUNT(users.Id) AS count FROM users WHERE name LIKE ?`;
  db.get(totalCountQuery, [`%${searchName}%`], (err, row) => {
      console.log(row);
    const searchCount = row.count;
    totalPages = Math.ceil(searchCount/itemsPerPage);

    //여기서 왜 이거 nested 형태? => 쿼리 2개 실행하는거 자체가 비동기 이슈
    //LIKE '%%'로 하면 모두 다 검색한다는 뜻
    const query = `SELECT * FROM users WHERE name LIKE ? LIMIT ?`;
    db.all(query, [`%${searchName}%`, itemsPerPage], (err, rows) => {
      if (err) {
        console.error("사용자 조회 실패:", err);
        return res.status(500).json({ error: "사용자 조회에 실패하였습니다." });
      }

      res.json({ totalPages: totalPages, data: rows });
    });
  });
});

app.get("/api/users/:id", (req, res) => {
  const userId = req.params.id;
  const query = "SELECT * FROM users WHERE Id=?";
  db.get(query, [userId], (err, row) => {
    if (err) {
      console.error("사용자 조회 실패:", err);
      return res.status(500).json({ error: "사용자 조회에 실패하였습니다." });
    }

    if (!row) {
      console.error("사용자 조회 실패:", err);
      return res.status(404).json({ error: "사용자 조회에 실패하였습니다." });
    }

    res.json(row);
  });
});

//이건 환경변수.. 현재 설정된것은 없으므로 무시지만 예시임
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
