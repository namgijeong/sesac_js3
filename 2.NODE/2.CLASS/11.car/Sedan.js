const Car = require('./Car');

class Sedan extends Car{
    constructor(brand, model){
        super(brand, model);
    }
    comfort(){
        console.log('승차감이 좋다.')
    }
}

module.exports = Sedan;