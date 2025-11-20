// 랜덤색상
// rgb 에 대해서 각각 무작위 숫자를 만든다 범위가 0~255
// #RRGGBB 포맷 16진수로 바꾼다.

//#ffffff
//255 255 255 255
//256/16=16 10부터 a

//10진수 rgb때 쓸것
let randomNumberArray = [];

// document.getElementById("test").addEventListener('click',function(){
//     showRandomHexColor();
// });

function showRandomHexColor() {

    let color_text_div = document.getElementById("color_text_container");
    randomNumberArray = [];

    let colorRandom = makeHexColorRandom();

    console.log("colorRandom: ",colorRandom);
    document.body.style.backgroundColor = colorRandom;
    color_text_div.innerHTML = `<div>HEX: ${colorRandom}</div> <br> <div>RGB: rgb(${randomNumberArray[0]}, ${randomNumberArray[1]}, ${randomNumberArray[2]})</div>`;

    // localStorage.clear();
    // sessionStorage.clear();
}

function makeRandomNumber() {
    let randomNumber = Math.floor(Math.random() * 256);
    randomNumberArray.push(randomNumber);
    //console.log(randomNumber);

    return randomNumber;
}

function makeHexRandomNumber() {
    let randomNumber = makeRandomNumber();
    let remainderTmpArray = [];
    let remainderArray = [];
    let currentQuotient = randomNumber;
    let currentRemainder = 0;

    while (currentQuotient > 0) {
        currentRemainder = currentQuotient % 16;
        currentQuotient = Math.floor(currentQuotient / 16);
        //console.log("currentRemainder : ",currentRemainder,"currentQuotient : ",currentQuotient);
    
        remainderTmpArray.push(currentRemainder);
    }

    //console.log(remainderTmpArray);

    //역순으로 나열하며 알파벳으로 바꾸기 
    for (let i = remainderTmpArray.length - 1; i >= 0; i--) {
        currentRemainder = remainderTmpArray[i];
        // if (currentRemainder < 10){
        //     currentRemainder = '0' +currentRemainder;
        
        // }
        console.log(currentRemainder);
        switch (currentRemainder) {
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
                remainderArray.push('' + currentRemainder);
        }

    }

    //console.log(remainderArray);
    return remainderArray;

}

function makeHexColorRandom() {
    let totalHexString = '#';
    let hexString='';
    let hexArray = ''
    for (let i = 0; i < 3; i++) {
        hexArray = makeHexRandomNumber();
        hexString='';
        
        for (let j = 0; j < hexArray.length; j++) {
            hexString += hexArray[j];
        }

        if (hexString.length < 2 ){
            hexString = '0'+ hexString;
        }

        totalHexString += hexString
    }

    //document.getElementById("container").style.backgroundColor = totalHexString;
    console.log(totalHexString);
    return totalHexString;

}


