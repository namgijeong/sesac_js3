import UserGenerator from "./user/usergen.js";
import StoreGenerator from "./store/storegen.js";
import ItemGenerator from "./item/itemgen.js";
import OrderGenerator from "./order/ordergen.js";

let users = [];
let stores = [];
let items = [];
let orders = [];

function pickRandomId(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}

for (let i = 0; i < 100; i++) {
    const user = new UserGenerator().getRandomUser();
    //console.log(user);
    //console.log(JSON.stringify(user));

    users.push(user);
}

for (let i = 0; i < 100; i++) {
    const store = new StoreGenerator().getRandomStore();
    // console.log(store);
    // console.log(JSON.stringify(store));

    stores.push(store);
}

for (let i = 0; i < 100; i++) {
    const item = new ItemGenerator().getRandomItem();
    // console.log(item);
    // console.log(JSON.stringify(item));

    items.push(item);
}

for (let i = 0; i < 100; i++) {
    //storeId, userId를 랜덤으로 뽑기
    const randomStoreId = pickRandomId(stores).Id;
    const randomUserId = pickRandomId(users).Id;

    console.log(randomStoreId);
    console.log(randomUserId);

    const order = new OrderGenerator(randomStoreId, randomUserId).getRandomOrder();
    orders.push(order);
}

//console.log(users);
//console.log(stores);
//console.log(items);
console.log(orders);


