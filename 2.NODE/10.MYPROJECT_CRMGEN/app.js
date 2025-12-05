import UserGenerator from "./user/usergen.js";
import StoreGenerator from "./store/storegen.js";
import ItemGenerator from "./item/itemgen.js";
import OrderGenerator from "./order/ordergen.js";
import OrderItemGenerator from "./orderitem/orderitemgen.js";
import writeCsv from "./common/makecsv.js";
import readCsv from "./common/readcsv.js";

let users = [];
let stores = [];
let items = [];
let orders = [];
let orderItems = [];

//process.argv
//=> Node.js 프로그램이 실행될 때 명령어 전체를 배열 형태로 담고 있는 값
//node app.js => 이 명령어 잘라내기
const args = process.argv.slice(2);

//첫번째 인자 => 만들기 원하는 데이터
//두번째 인자 => 갯수
console.log(args);
const type = args[0];
const lineNumber = Number(args[1]);

function pickRandomId(arr) {
    return arr[Math.floor(Math.random() * arr.length)];
}

async function makeRandomData(type, lineNumber) {
    if (type === 'users') {
        for (let i = 0; i < lineNumber; i++) {
            const user = new UserGenerator().getRandomUser();
            //console.log(user);
            //console.log(JSON.stringify(user));

            users.push(user);
        }

        writeCsv('users', users);
    }
    else if (type === 'stores') {
        for (let i = 0; i < lineNumber; i++) {
            const store = new StoreGenerator().getRandomStore();
            // console.log(store);
            // console.log(JSON.stringify(store));

            stores.push(store);
        }

        writeCsv('stores', stores);
    }
    else if (type == 'items') {
        for (let i = 0; i < lineNumber; i++) {
            const item = new ItemGenerator().getRandomItem();
            // console.log(item);
            // console.log(JSON.stringify(item));

            items.push(item);
        }

        writeCsv('items', items);
    }
    else if (type === 'orders') {
        //stores,users가 전제조건
        if (stores.length == 0 || users.length == 0) {

            try {
                users = await readCsv('users');
                stores = await readCsv('stores');

                //console.log(users);
                //console.log(stores);

            } catch (err) {
                console.log('stores, users 정보를 읽어오기 실패하였습니다.');
                return;
            }

        }

        for (let i = 0; i < lineNumber; i++) {
            //storeId, userId를 랜덤으로 뽑기
            const randomStore = pickRandomId(stores);
            const randomUser = pickRandomId(users);
            const randomStoreId = randomStore.Id || randomStore.storeId;
            const randomUserId = randomUser.Id || randomUser.userId;
            //console.log(randomStoreId);
            //console.log(randomUserId);

            const order = new OrderGenerator(randomStoreId, randomUserId).getRandomOrder();
            orders.push(order);
        }

        writeCsv('orders', orders);
    }
    else if (type === 'orderItems') {
        //orders, items가 전제조건
        if (orders.length == 0 || items.length == 0) {

            try {
                orders = await readCsv('orders');
                items = await readCsv('items');
            } catch (err) {
                console.log('orders, items 정보를 읽어오기 실패하였습니다.');
                return;
            }
        }

        //orderId 모두 다 orderItem에 있어야한다.
        orders.forEach((order) => {
            //itemId를 랜덤으로 뽑기
            const randomItem = pickRandomId(items);
            const randomItemId = randomItem.Id || randomItem.itemId;

            const orderItem = new OrderItemGenerator(order.Id || order.orderId, randomItemId).getRandomOrderItem();
            orderItems.push(orderItem);
        });

        //console.log(orderItems);
        writeCsv('orderItems', orderItems);
    }
    else {
        console.log('데이터 종류를 users, stores, items, orders, orderItems 중에서 선택하세요.');
    }
}


makeRandomData(type, lineNumber);







