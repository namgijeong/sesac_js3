const express = require('express');
const Database = require('./database');

const app = express();
const port = 3000;

app.use(express.urlencoded({extended:false}));
app.use(express.json());
app.use(express.static('public'));

const db = new Database();

app.get('/api/list', (req,res) => {
    console.log('목록 조회');

    const sql = 'SELECT * FROM board';
    const rows = db.executeQuery(sql);
    console.log(rows);

    res.send(rows);
});

app.post('/api/create',(req,res) => {
    console.log('글 작성');
    const {title, message} = req.body;

    const sql = 'INSERT INTO board(title, message) VALUES(?,?)';
    db.execute(sql, [title, message]);

    res.json({result:'success'});
});

app.delete('/api/delete/:id', (req,res) => {
    console.log('글 삭제');
    const id = Number(req.params.id);

    const sql = 'DELETE FROM board WHERE id=?';
    db.execute(sql,id);

    res.json({result:'success'});
});

app.put('/api/modify/:id', (req,res) => {
    console.log('글 수정');
    const {title,message} = req.body;
    const id = Number(req.params.id);

    const sql = `UPDATE board SET title=? , message=? WHERE id=?`;
    db.execute(sql,[title,message,id]);

    res.json({result:'success'});
});

app.listen(port, () => {
    console.log('서버 레디');
});