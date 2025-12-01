const Shape = require('./Shape');

class Trapezium extends Shape{
     constructor(topLength, bottomLength, height){
        super();
        this.topLength = topLength;
        this.bottomLength = bottomLength;
        this.height = height;
    }

    getArea(){
        return ((this.topLength + this.bottomLength) * this.height)/2;
    }
}

module.exports = Trapezium;