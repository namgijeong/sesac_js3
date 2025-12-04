import UserGenerator from "./user/usergen.js";
import StoreGenerator from "./store/storegen.js";
import ItemGenerator from "./item/itemgen.js";
import OrderGenerator from "./order/ordergen.js";
import OrderItemGenerator from "./orderitem/orderitemgen.js";
import writeCsv from "./common/makecsv.js";

// 외부 모듈 설치 npm i csv-parser
// import csv from 'csv-parser';
// import fs from 'fs';
// const readResults = [];

let users = [];
let stores = [];
let items = [];
let orders = [];
let orderItems = [];

function pickRandomId(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}

for (let i = 0; i < 10; i++) {
    const user = new UserGenerator().getRandomUser();
    //console.log(user);
    //console.log(JSON.stringify(user));

    users.push(user);
}

for (let i = 0; i < 10; i++) {
    const store = new StoreGenerator().getRandomStore();
    // console.log(store);
    // console.log(JSON.stringify(store));

    stores.push(store);
}

for (let i = 0; i < 10; i++) {
    const item = new ItemGenerator().getRandomItem();
    // console.log(item);
    // console.log(JSON.stringify(item));

    items.push(item);
}

for (let i = 0; i < 10; i++) {
    //storeId, userId를 랜덤으로 뽑기
    const randomStoreId = pickRandomId(stores).Id;
    const randomUserId = pickRandomId(users).Id;
    //console.log(randomStoreId);
    //console.log(randomUserId);

    const order = new OrderGenerator(randomStoreId, randomUserId).getRandomOrder();
    orders.push(order);
}


//orderId 모두 다 orderItem에 있어야한다.
orders.forEach((order) => {
    for (let i = 0; i < 2; i++) {
        //itemId를 랜덤으로 뽑기
        const randomItemId = pickRandomId(items).Id;

        const orderItem = new OrderItemGenerator(order.Id, randomItemId).getRandomOrderItem();
        orderItems.push(orderItem);
    }

});

//console.log(users);
//console.log(stores);
//console.log(items);
//console.log(orders);
//console.log(orderItems);


writeCsv('users', users);
writeCsv('stores', stores);
writeCsv('items', items);
writeCsv('orders', orders);
writeCsv('orderItems', orderItems);


//시험삼아 읽기 성공
// fs.createReadStream('users.csv')
// .pipe(csv())
// //데이터를 읽을때마다
// .on('data', data => readResults.push(data))
// .on('end', () => {
//     console.log(readResults);
// });

