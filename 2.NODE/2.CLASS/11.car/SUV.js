const Car = require('./Car');

class SUV extends Car{
    constructor(brand,model){
        super(brand, model);
    }

    autopilot(place){
        this.place = place;
        console.log(`${this.place}로 자동 운전합니다.`);
    }
}

module.exports = SUV;