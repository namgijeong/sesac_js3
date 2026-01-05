const router = require('express').Router();
const db = require('../db');

router.get('/', (req, res) => {
  const rows = db.prepare('SELECT * FROM users').all();
  res.json(rows);
});

router.get('/:id', (req, res) => {
  const user = db.prepare('SELECT * FROM users WHERE userId=?').get(req.params.id);
  res.json(user);
});

module.exports = router;