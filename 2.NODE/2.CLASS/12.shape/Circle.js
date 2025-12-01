const Shape = require('./Shape');

// const PI = 3.14;

class Circle extends Shape{
     constructor(radius){
        super();
        this.radius = radius;
    }

    getArea(){
        return (this.radius ** 2 * Math.PI);
    }
}

module.exports = Circle;