for(let i = 1; i <= 5 ; i++){
    let string = '';
    for(let j = 1; j <= i; j++){
        string += "*";
    }
    console.log(string);
}

console.log("");

for(let i = 5; i >= 1; i--){
    let string = '';
    for(let j = 1; j <= i ; j++){
         string += "*";
    }
    console.log(string);
}

console.log("");

for(let i = 1; i <= 5; i++){
    let string = '';
    for(let j = 1 ; j <= 5 - i ; j++){
        string += ' ';
    }
    for(let k = 5 - i + 1; k <= 5 ; k++ ){
        string += '*';
    }
    console.log(string);
}

console.log("");

for(let i = 5; i >= 1; i--){
    let string = '';
    //1  0
    //1  1
    //1  2
    for(let j = 1; j <= 5 - i; j++){
        string += ' ';
    }
    for(let k = 1 ; k <= i; k++){
        string += '*';
    }
    console.log(string);
}

console.log("");

