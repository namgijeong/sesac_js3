const express = require("express");
const Database = require("./database");

const app = express();
const PORT = 3000;
const db = new Database();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(express.static("public"));

app.get("/genres", (req, res) => {
  const query = `SELECT * FROM genres`;
  const genres = db.executeQuery(query);
  res.send(genres);
});

app.get("/genres/:genrename", (req, res) => {
  const genre = req.params.genrename;
  const query = `
SELECT g.name AS genrename, t.name AS trackname
FROM genres g
JOIN tracks t
ON g.genreid = t.genreid
Where g.name LIKE ?
    `;

    const tracks = db.executeQuery(query,[`%${genre}%`]);
    res.send(tracks); 
});

app.listen(PORT, () => {
  console.log("서버 레디");
});
