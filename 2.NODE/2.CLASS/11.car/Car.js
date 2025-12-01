class Car{
    constructor(brand, model){
        this.brand = brand;
        this.model = model;
    }

    start(){
        console.log(`${this.brand} ${this.model}이 시동을 걸었습니다.`);
    }
    
    drive(){
        console.log(`${this.brand} ${this.model}이 시동을 걸었습니다.`);
    }
    
    stop(){
        console.log(`${this.brand} ${this.model}이 시동을 멈췄습니다.`);
    }
}

module.exports = Car;