const Person = require('./Person');

class Child extends Person{
    constructor(name, age, gender, major){
        super(name, age, gender);
        this.major = major;
    }

    playInCar(){
        console.log('자식은 차에서 핸드폰을 한다.');
    }
}

module.exports =  Child;