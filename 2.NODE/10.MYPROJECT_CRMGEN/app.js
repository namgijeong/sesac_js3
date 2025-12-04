import UserGenerator from "./user/usergen.js";
import StoreGenerator from "./store/storegen.js";
import ItemGenerator from "./item/itemgen.js";

const user = new UserGenerator().getRandomUser();
console.log(user);
console.log(JSON.stringify(user));

const store = new StoreGenerator().getRandomStore();
console.log(store);
console.log(JSON.stringify(store));

const item = new ItemGenerator().getRandomItem();
console.log(item);
console.log(JSON.stringify(item));