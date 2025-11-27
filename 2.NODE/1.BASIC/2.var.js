let a = 10;
const pi = 3.14;

a = 20;
//typeerror 발생: assignment to constant
// pi = 4.44;

a = 30;

let numbers = [1,2, 3,4,5];
for(let i = 0; i < numbers.length; i++){
    console.log(numbers[i]);
}

//변수의 스코프
//전역변수
let globalA = 50;

function myFunction(){
    //로컬변수
    let localA = 30;

    console.log(globalA);
    console.log(localA);
}

myFunction();
console.log(globalA);
//reference error
//console.log(localA);