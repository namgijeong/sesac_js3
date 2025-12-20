/*1번문제  미국에 거주하지 않는 고객*/

SELECT DISTINCT country FROM customers;
SELECT firstname || " " || lastname AS fullname, customerid, country FROM customers WHERE country!= "USA";

/*2번 문제 브라질 고객만 표시*/
SELECT firstname || " " || lastname AS fullname, customerid, country FROM customers WHERE country = "Brazil";

/*3번 브라질 고객의 송장을 보여주는 쿼리*/
SELECT c.firstname || " " || c.lastname AS fullname, c.customerid, c.country, i.invoiceid,i.invoicedate,i.billingaddress  
FROM customers c
JOIN invoices i
on c.customerid = i.customerid
WHERE c.country = "Brazil";

/*4번 판매 대리인인 직원만 표시*/
SELECT * FROM employees;

/*5번  송장 테이블에서 청구 국가의 고유(unique)/고유(distinct) 목록을 표시하는 쿼리*/
select DISTINCT BillingCountry FROM invoices;

/*6번 각 판매 에이전트와 연결된 송장을 표시하는 쿼리를 제공합니다. 결과 테이블에는 영업 에이전트의 전체 이름이 포함*/
SELECT c.firstname || " " || c.lastname AS customerfullname, c.customerid, c.country, i.invoiceid, e.firstname || " " || e.lastname AS employeefullname
FROM customers c
JOIN invoices i
on c.customerid = i.customerid
JOIN employees e
WHERE c.supportrepid = e.employeeid;


/*7. Invoice Total, Customer name, Country and Sale Agent name for all invoices and customers.*/
SELECT i."total", c.firstname || " " || c.lastname AS customerfullname,  c.country, i.invoiceid, e.firstname || " " || e.lastname AS employeefullname
FROM customers c
JOIN invoices i
on c.customerid = i.customerid
JOIN employees e
WHERE c.supportrepid = e.employeeid;

/*8. How many Invoices were there in 2009 and 2011?*/
SELECT COUNT(*) FROM invoices
WHERE invoicedate between '2009-01-01 00:00:00' AND '2011-12-31 00:00:00';

/*9.  What are the respective total sales for each of those years?*/
SELECT  strftime('%Y', invoicedate) AS year, sum("total")
FROM invoices
GROUP BY strftime('%Y', invoicedate);

/*10. InvoiceLine 테이블을 보고 Invoice ID 37에 대한 라인 항목 수를 계산하는 쿼리를 제공*/
SELECT COUNT(item.invoicelineid) FROM invoice_items item
JOIN invoices iv
ON item.invoiceid = iv.invoiceid
WHERE iv.invoiceid = 37;

/*11. InvoiceLine 테이블을 보고 각 Invoice에 대한 라인 항목 수를 계산하는 쿼리를 제공합니다. 힌트: 그룹화 기준*/
SELECT COUNT(item.invoicelineid), iv.invoiceid  FROM invoice_items item
JOIN invoices iv
ON item.invoiceid = iv.invoiceid
GROUP BY iv.invoiceid;

/*12. 각 송장 라인 항목에 구매한 트랙 이름을 포함하는 쿼리*/
SELECT i.invoicelineid, t.name FROM invoice_items i
JOIN tracks t
ON i.trackid = t.trackid;

/*13. 구매한 트랙 이름과 아티스트 이름을 포함하는 쿼리를 각 송장 라인 항목과 함께 제공*/
SELECT i.invoicelineid, t.name AS trackname, a.albumid, art.name AS artistname FROM invoice_items i
JOIN tracks t
ON i.trackid = t.trackid
JOIN albums a
ON a.albumid = t.albumid
JOIN artists art
ON art.artistid = a.artistid
;

/*14. 국가별 송장 수를 표시하는 쿼리를 제공*/
SELECT COUNT(*), invoices.billingcountry
FROM invoices
GROUP BY invoices.billingcountry
;

/*15. 각 재생 목록의 총 트랙 수를 표시하는 쿼리를 제공합니다. 재생 목록 이름은 결과 테이블에 포함*/
SELECT lists.name , COUNT(*) 
FROM playlists lists
JOIN playlist_track ptrack
ON lists.playlistid =  ptrack.playlistid
GROUP BY lists.playlistid
;

/*16. 모든 트랙을 표시하지만 ID는 표시하지 않는 쿼리를 제공합니다. 결과에는 앨범 이름, 미디어 유형 및 장르가 포함*/
SELECT t.name AS trackname ,a.title AS albumname, t.mediatypeid, t.genreid
FROM tracks t
JOIN albums a
ON a.albumid = t.albumid
;

/*17. a query that shows all Invoices but includes the # of invoice line items*/
SELECT i.invoiceid, i.customerid, i.invoicedate, item.invoicelineid, item.trackid
FROM invoices i
JOIN invoice_items item
ON i.invoiceid = item.invoiceid
;

/*18. query that shows total sales made by each sales agent*/
SELECT sum(i."total"), e.employeeid
FROM employees e
JOIN customers c
ON e.employeeid = c.supportrepid
JOIN invoices i
ON  c.customerid= i.customerid
GROUP BY e.employeeid
;

SELECT  c.FirstName||" "||c.LastName AS "Customer", i.BillingCountry, e.FirstName||" "||e.LastName as "Sale Agent", e.employeeid, i.Total 
FROM Invoices i 
JOIN Customers c ON c.CustomerId = i.CustomerId 
JOIN Employees e ON e.EmployeeId = c.SupportRepId
GROUP BY e.employeeid
;

/*19. 2009년 가장 많은 매출을 올린 판매원 힌트: 하위 쿼리에서 MAX 함수를 사용*/
/*
SELECT MAX(total_sales), employeeid
FROM 
(SELECT  e.employeeid, sum(i."total") AS total_sales
FROM employees e
JOIN customers c
ON e.employeeid = c.supportrepid
JOIN invoices i
ON  c.customerid= i.customerid
WHERE '2009-01-01' <= i.invoicedate AND i.invoicedate <= '2009-12-31'
GROUP BY e.employeeid
)
WHERE total_sales = max(total_sales)
;
*/

SELECT
    e.employeeid,
    e.firstname || ' ' || e.lastname AS employeefullname,
    t.total_sales
FROM (
    SELECT
        e.employeeid,
        SUM(i.total) AS total_sales
    FROM employees e
    JOIN customers c ON e.employeeid = c.supportrepid
    JOIN invoices i ON c.customerid = i.customerid
    WHERE i.invoicedate >= '2009-01-01'
      AND i.invoicedate <  '2010-01-01'
    GROUP BY e.employeeid
) t
JOIN employees e ON t.employeeid = e.employeeid
WHERE t.total_sales = (
    SELECT MAX(total_sales)
    FROM (
        SELECT
            e2.employeeid,
            SUM(i2.total) AS total_sales
        FROM employees e2
        JOIN customers c2 ON e2.employeeid = c2.supportrepid
        JOIN invoices i2 ON c2.customerid = i2.customerid
        WHERE i2.invoicedate >= '2009-01-01'
          AND i2.invoicedate <  '2010-01-01'
        GROUP BY e2.employeeid
    )
);

/*20. Which sales agent made the most in sales over all*/
SELECT
    e.employeeid,
    e.firstname || ' ' || e.lastname AS employeefullname,
    t.total_sales
FROM (
    SELECT
        e.employeeid,
        SUM(i.total) AS total_sales
    FROM employees e
    JOIN customers c ON e.employeeid = c.supportrepid
    JOIN invoices i ON c.customerid = i.customerid
    GROUP BY e.employeeid
) t
JOIN employees e ON t.employeeid = e.employeeid
WHERE t.total_sales = (
    SELECT MAX(total_sales)
    FROM (
        SELECT
            e2.employeeid,
            SUM(i2.total) AS total_sales
        FROM employees e2
        JOIN customers c2 ON e2.employeeid = c2.supportrepid
        JOIN invoices i2 ON c2.customerid = i2.customerid
        GROUP BY e2.employeeid
    )
);

/*21. a query that shows the count of customers assigned to each sales agent*/
SELECT COUNT(*), e.employeeid
FROM employees e
JOIN customers c
ON  e.employeeid = c.supportrepid
GROUP BY e.employeeid
;

/*22. a query that shows the total sales per country*/
SELECT sum(total), BillingCountry
FROM invoices
GROUP BY BillingCountry
;

/*23. 고객이 가장 많이 지출한 국가*/
SELECT max(total_sales), BillingCountry
FROM
(
SELECT sum(total) AS total_sales, BillingCountry
FROM invoices
GROUP BY BillingCountry
)
;

/*24. query that shows the most purchased track of 2013*/
/*
SELECT sum(i.total) , count(*), sum(item.quantity) AS purchased ,item.trackid
FROM invoice_items item
JOIN invoices i
ON item.invoiceid = i.invoiceid
WHERE strftime('%Y', i.invoicedate) = '2013'
GROUP BY item.trackid
;
*/

SELECT trackid, purchased
FROM(
SELECT sum(i.total) , count(*), sum(item.quantity) AS purchased ,item.trackid AS trackid
FROM invoice_items item
JOIN invoices i
ON item.invoiceid = i.invoiceid
WHERE strftime('%Y', i.invoicedate) = '2013'
GROUP BY item.trackid
)
WHERE purchased =
(
SELECT max(purchased)
FROM(
SELECT sum(i.total) , count(*), sum(item.quantity) AS purchased ,item.trackid AS trackid
FROM invoice_items item
JOIN invoices i
ON item.invoiceid = i.invoiceid
WHERE strftime('%Y', i.invoicedate) = '2013'
GROUP BY item.trackid
)
)
;

/*25. a query that shows the top 5 most purchased songs*/

SELECT s.trackid, purchased, t.name
FROM(
SELECT sum(i.total) , count(*), sum(item.quantity) AS purchased ,item.trackid AS trackid 
FROM invoice_items item
JOIN invoices i
ON item.invoiceid = i.invoiceid
GROUP BY item.trackid
)s
JOIN tracks t
ON  t.trackid = s.trackid
WHERE purchased =
(
SELECT max(purchased)
FROM(
SELECT sum(i.total) , count(*), sum(item.quantity) AS purchased ,item.trackid AS trackid
FROM invoice_items item
JOIN invoices i
ON item.invoiceid = i.invoiceid
GROUP BY item.trackid
)
)
ORDER BY purchased DESC
LIMIT 5
;


/*26. 가장 많이 팔린 3명의 아티스트를 보여주는 쿼리*/
-- SELECT DISTINCT art.name, a.title
-- FROM
-- (
-- SELECT t.name, count(i.Quantity) AS "PurchaseCount" , t.albumid 
-- FROM tracks t 
-- JOIN invoice_items i 
-- ON i.TrackId =t.Trackid 
-- GROUP BY t.trackid
-- ) p
-- JOIN albums a
-- ON a.albumid = p.albumid
-- JOIN artists  art
-- ON art.artistid = a.artistid
-- ORDER BY PurchaseCount DESC
-- LIMIT 3
-- ;

-- SELECT "Artist Name", "Total Earned" 
-- FROM 
-- (
-- SELECT ar.Name as "Artist Name", SUM(t.UnitPrice) as "Total earned" 
-- FROM tracks t 
-- JOIN albums a 
-- ON t.AlbumId = a.AlbumId 
-- JOIN artists ar ON a.ArtistId = ar.ArtistId 
-- GROUP BY ar.Name
-- ) 
-- ORDER BY "Total Earned" DESC 
-- LIMIT 3;

SELECT
  art.Name AS ArtistName,
  SUM(i.Quantity) AS TotalSales
FROM artists art
JOIN albums a        ON a.ArtistId = art.ArtistId
JOIN tracks t        ON t.AlbumId = a.AlbumId
JOIN invoice_items i ON i.TrackId = t.TrackId
GROUP BY art.ArtistId
ORDER BY TotalSales DESC
LIMIT 3;

/*27. a query that shows the most purchased Media Type.*/

SELECT
  SUM(i.Quantity) AS TotalSales, m.mediatypeid, m.name
FROM media_types m
JOIN tracks t        ON m.mediatypeid = t.mediatypeid
JOIN invoice_items i ON i.TrackId = t.TrackId
GROUP BY m.mediatypeid
ORDER BY TotalSales DESC
LIMIT 1;