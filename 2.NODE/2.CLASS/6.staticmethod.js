class MathOps{
    static PI = 3.141592;
    static add(x, y){
        return x+y;
    }

    static subtract(x,y){
        return x-y;
    }
}

//static으로 정의된 변수나 함수는 굳이 instance를 만들어서 접근하는게 아니고,
//바로 해당 객체로부터 접근할 수 있다
const myMath =  MathOps.PI;
console.log(myMath);
console.log(MathOps.add(3,5));