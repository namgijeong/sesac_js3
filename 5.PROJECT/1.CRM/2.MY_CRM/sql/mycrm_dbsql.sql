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
테이블 특성상 커피2잔 이런식으로 안되는데??
*/
-- SELECT
--   o.orderid AS order_id,
--   o.orderAt,
--   i.itemname AS item_name,
--   COUNT(*) AS qty
-- FROM orders o
-- JOIN orderitems oi ON o.orderid = oi.orderId
-- JOIN items i        ON oi.itemId = i.itemid
-- GROUP BY o.orderid, i.itemname
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

/*1. 특정 사용자가 주문한 주문 목록 시간*/
SELECT o.orderid, o.orderat , u.userid, u.username
FROM orders o
JOIN users u
ON o.userid = u.userid
WHERE o.userid = 'c423f39d-dc05-4640-a108-5070745fec39'
;

/*2. 특정 사용자가 주문한 상점명과 상품명 */
SELECT o.orderid, u.userid, u.username , s.storename, i.itemname
FROM orders o
JOIN users u
ON o.userid = u.userid
JOIN stores s
ON o.storeid = s.storeid
JOIN orderitems item
ON o.orderid = item.orderid
JOIN items i
ON item.itemid = i.itemid
WHERE o.userid = '3fbc65e3-dcf3-4cb7-958e-406fbd46035a'
;

/*3.특정 사용자가 주문한 유닉한 상품명의 목록*/
SELECT DISTINCT  i.itemname
FROM orders o
JOIN users u
ON o.userid = u.userid
JOIN orderitems item
ON o.orderid = item.orderid
JOIN items i
ON item.itemid = i.itemid
WHERE o.userid = '3fbc65e3-dcf3-4cb7-958e-406fbd46035a'
;

/*4. 특정 사용자가 주문한 매출액의 합산 */
SELECT SUM(CAST(i.itemprice AS INTEGER))
FROM orders o
JOIN orderitems item
ON o.orderid = item.orderid
JOIN items i
ON item.itemid = i.itemid
WHERE o.userid = '3fbc65e3-dcf3-4cb7-958e-406fbd46035a'
;

/*5. 상점별 월간 통계 매출액 GROUP BY s.storeid*/

-- SELECT sum(i.itemprice), s.storeid, strftime('%Y', o.orderat) AS year , strftime('%m', o.orderat) AS month
-- FROM stores s
-- JOIN orders o
-- ON s.storeid = o.storeid
-- JOIN orderitems oi
-- ON o.orderid = oi.orderid
-- JOIN items i
-- ON oi.itemid = i.itemid
-- GROUP BY s.storeid, year, month;


SELECT strftime('%Y-%m', o.orderAt) AS month, sum(CAST(i.itemPrice AS INTEGER)) AS revenue, COUNT(i.itemId) AS itemCount
FROM stores s
JOIN orders o
ON s.storeId = o.storeId
JOIN orderItems oi
ON o.orderId = oi.orderId
JOIN items i
ON oi.itemId = i.itemId
GROUP BY s.storeId,month;


/*5-1. 상품별 월간 통계 매출액 */
SELECT strftime('%Y-%m', o.orderAt) AS month, sum(CAST(i.itemPrice AS INTEGER)) AS revenue, COUNT(i.itemId) AS itemCount
FROM items i 
JOIN orderItems oi
ON i.itemId = oi.itemId
JOIN orders o
ON oi.orderId = o.orderId
GROUP BY i.itemId,month;


/*6. 특정 사용자가 방문한 상점의 빈도가 높은 순대로 상위 5개*/
SELECT COUNT(*) AS visit_count , s.storeid 
FROM users u
JOIN orders o
ON u.userid = o.userId
JOIN stores s
ON o.storeid = s.storeid 
WHERE u.userid = '3fbc65e3-dcf3-4cb7-958e-406fbd46035a'
GROUP BY s.storeid
ORDER BY visit_count
LIMIT 5
;

/*7. 구매한 매출액의 합산이 가장 높은 사용자 10명, 각각의 매출액*/
/*
CAST는 데이터의 타입을 명시적으로 변환하는 SQL 연산자 => CAST(값 또는 컬럼 AS 타입)
*/
SELECT SUM(CAST(i.itemprice AS INTEGER)) AS purchase_price , u.userid, u.username
FROM orders o
JOIN users u
ON o.userid = u.userid
JOIN orderitems item
ON o.orderid = item.orderid
JOIN items i
ON item.itemid = i.itemid
GROUP BY u.userid
ORDER BY purchase_price DESC
LIMIT 10
;