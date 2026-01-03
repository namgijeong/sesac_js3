--SQLite는 기본적으로 foreign key가 꺼져 있음
PRAGMA foreign_keys = ON;

CREATE TABLE IF NOT EXISTS users(
	userId TEXT PRIMARY KEY ,
	userName TEXT NOT NULL,
	userGender TEXT,
	userAge INTEGER,
	userBirthdate DATETIME,
	userAddress TEXT
);

CREATE TABLE IF NOT EXISTS stores(
	storeId TEXT PRIMARY KEY,
	storeName TEXT NOT NULL,
	storeType TEXT,
	storeAddress TEXT
);

CREATE TABLE IF NOT EXISTS items(
	itemId TEXT PRIMARY KEY,
	itemName TEXT NOT NULL,
	itemType TEXT,
	itemPrice NUMERIC
);

CREATE TABLE IF NOT EXISTS orders(
	orderId TEXT PRIMARY KEY,
	orderAt DATETIME,
	storeId TEXT NOT NULL,
	userId TEXT NOT NULL,
	
	FOREIGN KEY (storeId) REFERENCES stores(storeId)
	ON UPDATE CASCADE
	ON DELETE CASCADE,
	FOREIGN KEY (userId) REFERENCES users(userId)
	ON UPDATE CASCADE
	ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS orderItems(
	orderItemId TEXT PRIMARY KEY,
	orderId TEXT NOT NULL,
	itemId TEXT NOT NULL,

	FOREIGN KEY (orderId) REFERENCES orders(orderId)
	ON UPDATE CASCADE
	ON DELETE CASCADE,
	FOREIGN KEY (itemId) REFERENCES items(itemId)
	ON UPDATE CASCADE
	ON DELETE CASCADE
);

--csv 데이터들 자동으로 넣기
-- .mode csv
-- .import --skip 1 users.csv users
-- .import --skip 1 stores.csv stores
-- .import --skip 1 orders.csv orders
-- .import --skip 1 items.csv items
-- .import --skip 1 orderItems.csv orderItems

--비밀번호 컬럼 추가
ALTER TABLE users ADD COLUMN userPassword TEXT DEFAULT 'pass1234';



