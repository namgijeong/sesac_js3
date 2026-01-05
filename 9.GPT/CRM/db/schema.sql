CREATE TABLE users (
  userId TEXT PRIMARY KEY,
  name TEXT,
  gender TEXT,
  age INTEGER,
  birthday TEXT,
  address TEXT
);

CREATE TABLE stores (
  storeId TEXT PRIMARY KEY,
  storeName TEXT,
  address TEXT
);

CREATE TABLE items (
  itemId TEXT PRIMARY KEY,
  itemName TEXT,
  price INTEGER
);

CREATE TABLE orders (
  orderId TEXT PRIMARY KEY,
  orderAt TEXT,
  storeId TEXT,
  userId TEXT
);

CREATE TABLE orderItems (
  orderItemId TEXT PRIMARY KEY,
  orderId TEXT,
  itemId TEXT
);