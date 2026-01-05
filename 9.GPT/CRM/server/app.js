const express = require('express');
const app = express();
const path = require('path');

app.use(express.json());
app.use(
  express.static(
    path.join(__dirname, '..', 'public')
  )
);
app.use('/views', express.static(
    path.join(__dirname, '..', 'views')
  ));


// =========================
// View Routes (HTML)
// =========================
app.get('/users', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'views', 'users.html'));
});

app.get('/users/:id', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'views', 'userDetail.html'));
});

app.get('/orders', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'views', 'orders.html'));
});

app.get('/orders/:id', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'views', 'orderDetail.html'));
});


app.use('/api/users', require('./routes/users'));
// app.use('/api/stores', require('./routes/stores'));
// app.use('/api/items', require('./routes/items'));
// app.use('/api/orders', require('./routes/orders'));

app.listen(3000, () => console.log('CRM running on http://localhost:3000'));