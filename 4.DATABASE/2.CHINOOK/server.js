const express = require('express')
const Database = require('./database');

const app = express();
const PORT = 3000;
const db = new Database();

app.use(express.urlencoded({extended:false}));
app.use(express.json());
app.use(express.static('public'));
