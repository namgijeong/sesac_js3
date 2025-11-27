function sum_to_number(max){
    let sum = 0;
    for (let i = 1; i <=max; i++){
        sum += i;
    }
    console.log(`1부터 ${max}까지의 합은: ${sum}`);
}

//time , timeEnd 인자 이름은 타이머 이름이므로, 같게 해야한다
console.time("sum-to-100");
sum_to_number(100);
console.timeEnd("sum-to-100");

console.time("sum-to-1000");
sum_to_number(1000);
console.timeEnd("sum-to-1000");
 
// sum_to_number(100_000_000);

//가우스 공식
function sum_to_number_guess(max){
    sum = (max * (max+1)) / 2;
    console.log(`1부터 ${max}까지의 합은: ${sum}`);
}

console.time("sum-to-10000000000");
sum_to_number_guess(100000000);
console.timeEnd("sum-to-10000000000");