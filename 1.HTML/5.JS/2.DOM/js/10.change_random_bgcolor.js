// 랜덤색상
// rgb 에 대해서 각각 무작위 숫자를 만든다 범위가 0~255
// #RRGGBB 포맷 16진수로 바꾼다.

//#ffffff
//255 255 255 255
//256/16=16 10부터 a

//10진수 rgb때 쓸것
let randomNumberArray = [];

function makeRandomNumber(){
    let randomNumber = Math.floor(Math.random()*255);
    randomNumberArray.push(randomNumber);
    //console.log(randomNumber);

    return randomNumber;
}

function makeHexRandomNumber(){
    let randomNumber = makeRandomNumber();
    let remainderTmpArray = [];
    let remainderArray = [];
    let currentQuotient = randomNumber;
    let currentRemainder = 0;

    while(currentQuotient > 0){
        currentRemainder = currentQuotient % 16;
        currentQuotient = Math.floor(currentQuotient / 16);
        //console.log("currentRemainder : ",currentRemainder,"currentQuotient : ",currentQuotient);
        remainderTmpArray.push(currentRemainder);
    }
    
    //console.log(remainderTmpArray);

    //역순으로 나열하며 알파벳으로 바꾸기 
    for (let i = remainderTmpArray.length - 1; i >= 0 ; i--){
        currentRemainder = remainderTmpArray[i];
        //console.log(currentRemainder);
        switch(currentRemainder){
            case 15:
                remainderArray.push('f');
                break;
            case 14:
                remainderArray.push('e');  
                break;  
            case 13:
                remainderArray.push('d');  
                break;
            case 12:
                remainderArray.push('c');  
                break; 
            case 11:
                remainderArray.push('b');
                break;  
            case 10:
                remainderArray.push('a'); 
                break;  
            default:
                remainderArray.push(''+ currentRemainder);              
        }
        
    }

    //console.log(remainderArray);
    return remainderArray;
    
}

function makeHexColorRandom(){
    let totalHexString = '#';
    let hexArray = ''
    for (let i = 0; i < 3; i++){
        hexArray = makeHexRandomNumber();
        //console.log(hexArray);
        for (let j = 0; j < hexArray.length; j++){
            totalHexString += hexArray[j];
        } 
        
    }

    //console.log(totalHexString);
    return totalHexString;
    
}

makeHexColorRandom();

