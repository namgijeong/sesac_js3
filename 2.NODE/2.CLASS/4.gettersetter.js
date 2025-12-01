//클래스를 만들고, 함수를 만들고, 그걸 통해서 다양한 내가 원하는 정보를 셋팅하고 가져오는것
class Circle{
    constructor(radius){
        this.radius = radius;
    }

    //get => getter 함수 = 변수처럼 접근해서 정보를 가져옴
    get diameter(){
        return this.radius*2;
    }

    //set => setter 함수 = 변수처럼 정보를 할당함
    set diameter(diameter){
        this.radius = diameter / 2;
    }
}

const myCircle =  new Circle(5);
console.log(myCircle.radius);
// console.log(myCircle.get_diameter());
console.log(myCircle.diameter);
console.log("반지름: ", myCircle.radius);