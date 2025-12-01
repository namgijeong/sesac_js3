class Animal{
    constructor(name){
        this.name = name;
    }

    makeSound(){
        return "아무말이나..."
    }
}

//강아지는 동물의 기능을 다 받아옴 + alpha를 더 가져갈 수 있음
class Dog extends Animal{
    //오버라이딩 overriding 원래 상속받은 부모의 기능을 대체함
    makeSound(){
        return "멍멍";
    }
}

class Cat extends Animal{
    makeSound(){
        return "야옹";
    }
}

const myDog = new Dog("Doggy");
console.log(myDog.name);
console.log(myDog.makeSound());
// console.log(myDog.makeDogSound());
// console.log(myDog.makeCatSound());

const myCat =  new Cat("kitty");
console.log(myCat.name);
console.log(myCat.makeSound());
// console.log(myCat.makeCatSound());

const myCow = new Animal("한우");
console.log(myCow.name);
console.log(myCow.makeSound());
// console.log(myCow.makeCatSound());
