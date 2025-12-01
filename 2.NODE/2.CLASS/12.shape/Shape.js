class Shape {
    //    getArea(){
    //         return 0;
    //    }

    //이걸 abstract class 처럼 나를 강제로 구현해줘라
    getArea() {
        throw Error("나를 좀 구현해주시오");
    }
}

module.exports = Shape;