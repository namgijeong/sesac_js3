const Person = require('./Person');

class Parent extends Person{
    constructor(name, age, gender, job){
        super(name, age, gender);
        this.job = job;
    }

    playInCar(){
        console.log('부모는 운전을 한다.');
    }
}

module.exports = Parent;