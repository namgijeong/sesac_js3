const Square = require('./Square');
const Triangle = require('./Triangle');
const Trapezium = require('./Trapezium');
const Circle = require('./Circle');
const Star = require('./Star');

const square = new Square(5);
const triangle = new Triangle(4,3);
const trapezium = new Trapezium(4,6,5);
const circle = new Circle(3);
const star = new Star(5);

console.log('사각형의 넓이: ', square.getArea());
console.log('삼각형의 넓이: ', triangle.getArea());
console.log('사다리꼴의 넓이: ', trapezium.getArea());
//.toFixed => 자릿수까지만 찍겠다
console.log('원의 넓이: ', circle.getArea().toFixed(2));

console.log('별의 넓이: ', star.getArea());
console.log('별의 넓이: ', star.getStarArea());