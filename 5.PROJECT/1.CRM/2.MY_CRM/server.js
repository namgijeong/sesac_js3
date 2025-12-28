const express = require('express');
const morgan = require('morgan');
const Database = require('better-sqlite3');
const path = require('path');

const PORT = 3000;
const db_file = 'mycrm_db.db';

const app = express();
const db = new Database(db_file);

app.use(express.urlencoded({extended:false}));
app.use(express.json());


app.get("/",(req,res) => {
    res.sendFile(path.join(__dirname, "public","users.html"));
})
app.listen(PORT, () => {
    console.log(`Sever is ready at ${PORT}`);
})