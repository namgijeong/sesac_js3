const express = require("express");
const Database = require("./database");

const app = express();
const PORT = 3000;
const db = new Database();
const LIMIT = 10;

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static("public"));

app.get("/genres", (req, res) => {
  const query = `SELECT * FROM genres`;
  const genres = db.executeQuery(query);
  res.send(genres);
});

app.get("/genres/:genrename/:page", (req, res) => {
  const genre = req.params.genrename;
  const page = Number(req.params.page);

  const offset = LIMIT * (page-1);
  const genresquery = `
    SELECT g.name AS genrename, t.name AS trackname
    FROM genres g
    JOIN tracks t
    ON g.genreid = t.genreid
    Where g.name LIKE ?
    LIMIT ?
    OFFSET ?
  `;
  const tracks = db.executeQuery(genresquery,[`%${genre}%`, LIMIT, offset ]);

  const totalCountQuery = `
    SELECT count(*) AS totalcount
    FROM genres g
    JOIN tracks t
    ON g.genreid = t.genreid
    Where g.name LIKE ?
  `;
  const totalCount = db.executeQuery(totalCountQuery,[`%${genre}%`]);

  res.json({tracks:tracks, totalcount:totalCount[0].totalcount}); 
});

app.listen(PORT, () => {
  console.log("서버 레디");
});
