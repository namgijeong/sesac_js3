SELECT * FROM users LIMIT 10;

SELECT * FROM users ORDER BY username LIMIT 20;

SELECT * FROM users WHERE userage BETWEEN 20 AND 29 
ORDER BY userage 
LIMIT 20;


SELECT * FROM stores LIMIT 20;

SELECT storetype, COUNT(storename) FROM stores GROUP BY storetype;

SELECT storetype, COUNT(storename) AS num_of_stores  FROM stores GROUP BY storetype
ORDER BY num_of_stores DESC
;

SELECT storetype, COUNT(storename) AS num_of_stores  
FROM stores 
GROUP BY storetype
HAVING num_of_stores > 10
ORDER BY num_of_stores DESC
;

/*item 아이템을 가지고
1. 그룹별로 상품은 몇개나 있는가
2. 그룹별로 평균 가격은 어떻게 되는가
3. 가격이 비싼 순으로 top5/top3
*/

SELECT COUNT(itemid), itemtype
FROM items
GROUP BY itemtype
;

SELECT AVG(itemprice),itemtype
FROM items
GROUP BY itemType
;


SELECT AVG(itemprice)AS avg_price ,itemtype
FROM items
GROUP BY itemType
HAVING avg_price > 5000
ORDER BY avg_price DESC
LIMIT 5
;

SELECT
	CASE
		WHEN userage < 20 THEN "청년"
		WHEN userage < 40 THEN "중년"
		ELSE "노년"
	END AS age_band ,
	COUNT (*) AS user_cnt	
FROM users
GROUP BY age_band
ORDER BY user_cnt DESC;	


SELECT o.orderid, o.orderat, u.userid , u.username, u.useraddress
FROM orders o
JOIN users u
ON o.userid = u.userid
LIMIT 10
;

SELECT u.userid, u.username , COUNT(o.orderid) AS order_cnt
FROM users u
LEFT JOIN orders o
ON u.userid= o.userId
GROUP BY u.userId
ORDER BY order_cnt DESC
;

SELECT o.orderid, o.orderat, oi.orderitemid, i.itemName
FROM orders o
JOIN orderitems oi ON o.orderid = oi.orderid
JOIN items i ON oi.itemid = i.itemId
ORDER BY o.orderAt
LIMIT 20
;

/*
GROUP BY  에서 컬럼 두개를 쌍으로 묶어서 해도 된다
예시 중복상품 주문한것
order orderid, item의 itemname을 묶어서 orderid가 같아도 itemname 이름이 다르면 다른것으로 취급
하나의 영수증에 커피도 시키고 케이크도 시키고
*/
-- SELECT
--   o.id AS order_id,
--   o.orderAt,
--   i.name AS item_name,
--   COUNT(*) AS qty
-- FROM orders o
-- JOIN order_items oi ON o.id = oi.orderId
-- JOIN items i        ON oi.itemId = i.id
-- GROUP BY o.id, i.name
-- ORDER BY o.orderAt
-- LIMIT 20;

/*재방문 고객*/
-- SELECT userid, username, userage, useraddress
-- FROM users
-- WHERE userid in 
-- (
-- SELECT userId
-- FROM orders
-- GROUP BY userid
-- HAVING COUNT(*) >= 2
-- )
-- ;