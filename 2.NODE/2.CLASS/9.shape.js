//shape 이라는 제네릭 generic
class Shape{
   getArea(){
        return 0;
   }
}

class Triangle extends Shape{
    constructor(base, height){
        super();
        this.base = base;
        this.height = height;
    }

    getArea(){
        return this.base * this.height / 2
    }
}

class Square extends Shape{
    constructor(sideLength){
        //부모의 constructor를 먼저 초기화해야한다
        //나의 부모의 메모리 공간도 초기화한다
        super();
        this.length = sideLength;
    }

    getArea(){
        return this.length * this.length;
    }
}
const mySquare = new Square(5);
console.log('정사각형의 넓이는:', mySquare.getArea());

const myTriangle = new Triangle(2,5);
console.log('삼각형의 넓이는:', myTriangle.getArea());
