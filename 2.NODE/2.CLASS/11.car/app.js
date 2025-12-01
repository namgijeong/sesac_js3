//자동차를 상속받은 SEDAN, SUV
const SUV = require('./SUV');
const Sedan = require('./Sedan');
const Parent = require('./Parent');
const Child = require('./Child');

const dadCar = new SUV('테슬라', 'X');

class soju {
    constructor(brand, model){
        this.brand = brand;
        this.model = model;
    }
}
const dadCar2 = new soju('소주', '참이슬');

//person을 상속받아서 parent,child가 있음
const dad = new Parent('빌게이츠', 40, '남성', '회사원');
const son =  new Child('주니어빌',20, '남성', '컴공');

//사람이 차를 타는 함수 구현
dad.getInCar(dadCar);
son.getInCar(dadCar);
son.getInCar(dadCar2);

//차에는 움직이는 함수 구현
dadCar.start();
dadCar.autopilot('미술관');
son.playInCar();
dadCar.stop();

