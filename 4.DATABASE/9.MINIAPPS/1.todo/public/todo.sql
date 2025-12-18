CREATE TABLE todo(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    todo TEXT,
    completed INTEGER
);

--이게 더 좋다
--completed INTEGER DEFAULT 0