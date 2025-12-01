const Shape = require('./Shape');

class Triangle extends Shape{
     constructor(length, height){
        super();
        this.length = length;
        this.height = height;
    }

    getArea(){
        // return (this.length * this.height)/2;
        //overflow를 방지하기 위해 각종 라이브러리에서 숫자를 먼저 곱하는 이유가 있음
        return 0.5 * this.length * this.height;
    }
}

module.exports = Triangle;