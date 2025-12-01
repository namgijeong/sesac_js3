const Car = require('./Car');

class Person{
    constructor(name,age,gender){
        this.name = name;
        this.age = age;
        this.gender = gender;
    }

    greet(){
        console.log(`안녕, 나는 ${this.age}살, ${this.gender}, ${this.name}이야.`);
    }

    //car 가 뭔데? 동적타입언어라서...검사해야함
    //ts에서도 동적타입이 가능.. getInCar(car: any)--> 이렇게 절대 하지 마시오
    getInCar(car){
        if (car instanceof Car){
            console.log(`${this.name}이 ${car.brand} ${car.model}에 탑승`);
        }
        else{
            console.log(`올바른 자동차를 입력해주세요.`);
        }
    }
}

//module.exports를 통해서, 내 파일 내에서 다른곳에서 가져다 쓸걸 알려줌
module.exports = Person;