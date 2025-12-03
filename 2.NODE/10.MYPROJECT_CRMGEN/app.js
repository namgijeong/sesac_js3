import UserGenerator from "./user/usergen.js";
import StoreGenerator from "./store/storegen.js";

const user = new UserGenerator().getRandomUser();
console.log(user);
console.log(JSON.stringify(user));

const store = new StoreGenerator().getRandomStore();
console.log(store);
console.log(JSON.stringify(store));