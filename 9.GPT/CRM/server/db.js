const path = require('path');
const Database = require('better-sqlite3');

const dbPath = path.join(__dirname, '..', 'db', 'crm.db');
const db = new Database(dbPath);

module.exports = db;
