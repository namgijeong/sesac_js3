import UserGenerator from "./user/user_gen.js";
import StoreGenerator from "./store/store_gen.js";
import ItemGenerator from "./item/item_gen.js";
import OrderGenerator from "./order/order_gen.js";
import OrderItemGenerator from "./orderitem/orderitem_gen.js";
import writeCsv from "./print/makecsv.js";
import readCsv from "./print/readcsv.js";

import pino from "pino";
const logger = pino();

let users = [];
let stores = [];
let items = [];
let orders = [];
let orderItems = [];

function checkArgs() {
  //process.argv
  //=> Node.js 프로그램이 실행될 때 명령어 전체를 배열 형태로 담고 있는 값
  //node app.js => 이 명령어 잘라내기
  const args = process.argv.slice(2);

  //args의 길이를 검사하여 맞지 않으면 오류출력
  if (args.length != 3) {
    console.log(
      `'node app.js 데이터종류(users, stores, items, orders, orderItems) 갯수 출력형식(csv,console)' 순으로 입력해주세요.`
    );
    return;
  }

  //첫번째 인자 => 만들기 원하는 데이터
  //두번째 인자 => 갯수
  //세번째 인자 => csv, console

  const type = args[0];
  const lineNumber = args[1];
  let printType = args[2];

  //0이하이면 오류출력
  logger.info(lineNumber);
  logger.info(isNaN(lineNumber));
  //Number.isNaN() → 타입이 number 이면서 값이 NaN일 때만 true
  //isNaN() → 숫자로 변환해보고 NaN이면 true
  if (isNaN(lineNumber) || lineNumber <= 0) {
    console.log("데이터 갯수를 1개 이상으로 입력해주세요.");
    return;
  }

  //프린트 타입 검증
  printType = printType.toLowerCase();
  switch (printType) {
    case "csv":
    case "console":
      break;
    default:
      console.log("csv 또는 console 형식으로만 입력해주세요");
      return;
  }

  makeRandomData(type, lineNumber, printType);
}

function pickRandomId(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
}

function printData(type, printType) {
  if (type === "users") {
    if (printType === "csv") {
      writeCsv("users", users);
    } else {
      console.log(users);
    }
  } else if (type === "stores") {
    if (printType === "csv") {
      writeCsv("stores", stores);
    } else {
      console.log(stores);
    }
  } else if (type === "items") {
    if (printType == "csv") {
      writeCsv("items", items);
    } else {
      console.log(items);
    }
  } else if (type === "orders") {
    if (printType == "csv") {
      writeCsv("orders", orders);
    } else {
      console.log(orders);
    }
  } else if (type === "orderItems") {
    if (printType == "csv") {
      writeCsv("orderItems", orderItems);
    } else {
      console.log(orderItems);
    }
  } else {
    return;
  }
}

async function makeRandomData(type, lineNumber, printType) {
  if (type === "users") {
    for (let i = 0; i < lineNumber; i++) {
      const user = new UserGenerator().getRandomUser();

      users.push(user);
    }
  } else if (type === "stores") {
    for (let i = 0; i < lineNumber; i++) {
      const store = new StoreGenerator().getRandomStore();

      stores.push(store);
    }
  } else if (type == "items") {
    for (let i = 0; i < lineNumber; i++) {
      const item = new ItemGenerator().getRandomItem();

      items.push(item);
    }
  } else if (type === "orders") {
    //stores,users가 전제조건
    if (stores.length == 0 || users.length == 0) {
      try {
        users = await readCsv("users");
        stores = await readCsv("stores");

        logger.info(users);
        logger.info(stores);
      } catch (err) {
        console.log("stores, users 정보를 읽어오기 실패하였습니다.");
        return;
      }
    }

    for (let i = 0; i < lineNumber; i++) {
      //storeId, userId를 랜덤으로 뽑기
      const randomStore = pickRandomId(stores);
      const randomUser = pickRandomId(users);
      const randomStoreId = randomStore.Id || randomStore.storeId;
      const randomUserId = randomUser.Id || randomUser.userId;
      logger.info(randomStoreId);
      logger.info(randomUserId);

      const order = new OrderGenerator(
        randomStoreId,
        randomUserId
      ).getRandomOrder();
      orders.push(order);
    }
  } else if (type === "orderItems") {
    //orders, items가 전제조건
    if (orders.length == 0 || items.length == 0) {
      try {
        orders = await readCsv("orders");
        items = await readCsv("items");
      } catch (err) {
        console.log("orders, items 정보를 읽어오기 실패하였습니다.");
        return;
      }
    }

    //orderId 모두 다 orderItem에 있어야한다.
    orders.forEach((order) => {
      let randomLoop =
        Math.floor(Math.random() * 3) + lineNumber / orders.length;
      for (let i = 1; i <= randomLoop; i++) {
        //itemId를 랜덤으로 뽑기
        const randomItem = pickRandomId(items);
        const randomItemId = randomItem.Id || randomItem.itemId;

        const orderItem = new OrderItemGenerator(
          order.Id || order.orderId,
          randomItemId
        ).getRandomOrderItem();
        orderItems.push(orderItem);
      }
    });

    logger.info(orderItems);
  } else {
    console.log(
      "데이터 종류를 users, stores, items, orders, orderItems 중에서 선택하세요."
    );
  }

  printData(type, printType);
}

checkArgs();
