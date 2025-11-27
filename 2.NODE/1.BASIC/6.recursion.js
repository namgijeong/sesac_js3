//재귀함수 => 내가 나를 부르는 것 자체
// function myFunction(){
//     console.log("hello");
//     myFunction();
// }

// myFunction();

function factorial(n){
    if (n == 1) return n;
    result = n * factorial(n-1);
    return result;
}

console.log(factorial(5));


function fibonacci(n){
    if(n <=2) return 1;
    return fibonacci(n-1) + fibonacci(n-2);
}

console.log(fibonacci(5));
console.log(fibonacci(10));