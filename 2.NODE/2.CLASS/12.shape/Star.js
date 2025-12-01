const Shape = require('./Shape');

// const PI = 3.14;

class Star extends Shape{
     constructor(length){
        super();
        this.length = length;
    }

    getStarArea(){
        return (this.length ** 5 * 2);
    }

    getArea(){
        return (this.length ** 5 * 2);
    }
}

module.exports = Star;