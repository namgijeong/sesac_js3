import UserGenerator from "./user/usergen.js";

const user = new UserGenerator().getRandomUser();
console.log(user);
console.log(JSON.stringify(user));