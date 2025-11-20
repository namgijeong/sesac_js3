//1. 삼각형 콘솔로 그리기
//왼쪽 삼각형 그리기
// for(let i = 1; i <= 5 ; i++){
//     let string = '';
//     for(let j = 1; j <= i; j++){
//         string += "*";
//     }
//     console.log(string);
// }

// console.log("");

//왼쪽 삼각형 그리기 개선코드
// for(let i = 1; i <= 5 ; i++){
//     console.log("*".repeat(i));
// }

// console.log("");

//왼쪽 역삼각형 그리기
// for(let i = 5; i >= 1; i--){
//     let string = '';
//     for(let j = 1; j <= i ; j++){
//          string += "*";
//     }
//     console.log(string);
// }

// console.log("");

//왼쪽 역삼각형 그리기 개선코드
// for(let i = 5; i >= 1 ; i--){
//     console.log("*".repeat(i));
// }

// console.log("");

//오른쪽 삼각형 그리기
// for(let i = 1; i <= 5; i++){
//     let string = '';
//     for(let j = 1 ; j <= 5 - i ; j++){
//         string += ' ';
//     }
//     for(let k = 5 - i + 1; k <= 5 ; k++ ){
//         string += '*';
//     }
//     console.log(string);
// }

// console.log("");

//오른쪽 삼각형 그리기 개선버전
// for(let i = 1; i <=5; i++){
//     console.log(" ".repeat(5-i)+"*".repeat(i));
// }

// console.log("");

//오른쪽 역삼각형 그리기
// for(let i = 5; i >= 1; i--){
//     let string = '';
//     //1  0
//     //1  1
//     //1  2
//     for(let j = 1; j <= 5 - i; j++){
//         string += ' ';
//     }
//     for(let k = 1 ; k <= i; k++){
//         string += '*';
//     }
//     console.log(string);
// }

// console.log("");

//--------------------------------------------------------
//2.line수를 입력받아서 각 4종류의 삼각형을 화면에 출력

//실수 주의 !!!!
//버튼을 누르기전에 value를 읽었더니 빈값이 할당된다...
//let line = document.getElementById("triangle_line").value;

// let resultDiv = document.getElementById("result");

// function drawLeftTriangle() {
//     //버튼을 누르기전에 value를 읽었더니 빈값이 할당된다...
//     let line = document.getElementById("triangle_line").value;

//     let drawString = '';
//     for (let i = 1; i <= line; i++) {
//         for (let j = 1; j <= i; j++) {
//             drawString += "*";
//         }
//         drawString += "<br>";
//     }

//     resultDiv.innerHTML = drawString;
// }

// function drawLeftReverseTriangle() {
//     let line = document.getElementById("triangle_line").value;

//     let drawString = '';
//     for (let i = line; i >= 1; i--) {
//         for (let j = 1; j <= i; j++) {
//             drawString += "*";
//         }
//         drawString += "<br>";
//     }

//     resultDiv.innerHTML = drawString;
// }

// function drawRightTriangle() {
//     let line = document.getElementById("triangle_line").value;

//     let drawString = '';
//     for (let i = 1; i <= line; i++) {
//         for (let j = 1; j <= line - i; j++) {
//             drawString += '&nbsp;&nbsp;';
//         }
//         for (let k = line - i + 1; k <= line; k++) {
//             drawString += '*';
//         }
//         drawString += "<br>";
//     }

//     resultDiv.innerHTML = drawString;
// }

// function drawRightReverseTriangle(){
//     let line = document.getElementById("triangle_line").value;

//     let drawString = '';
//     for(let i = line; i >= 1; i--){
//         for(let j = 1; j <= line - i; j++){
//             drawString += '&nbsp;&nbsp;';
//         }
//         for(let k = 1 ; k <= i; k++){
//             drawString += '*';
//         }
//         drawString += "<br>"
//     }

//     resultDiv.innerHTML = drawString;
// }

//---------------------------------------------------------
//3. line,shape를 입력받아 삼각형을 출력 

let resultDiv = document.getElementById("result");

function drawLeftTriangle(line) {
    let drawString = '';
    for (let i = 1; i <= line; i++) {
        for (let j = 1; j <= i; j++) {
            drawString += "*";
        }
        drawString += "<br>";
    }

    resultDiv.innerHTML = drawString;
}

function drawLeftReverseTriangle(line) {
    let drawString = '';
    for (let i = line; i >= 1; i--) {
        for (let j = 1; j <= i; j++) {
            drawString += "*";
        }
        drawString += "<br>";
    }

    resultDiv.innerHTML = drawString;
}

function drawRightTriangle(line) {
    let drawString = '';
    for (let i = 1; i <= line; i++) {
        for (let j = 1; j <= line - i; j++) {
            drawString += '&nbsp;&nbsp;';
        }
        for (let k = line - i + 1; k <= line; k++) {
            drawString += '*';
        }
        drawString += "<br>";
    }

    resultDiv.innerHTML = drawString;
}

function drawRightReverseTriangle(line) {
    let drawString = '';
    for (let i = line; i >= 1; i--) {
        for (let j = 1; j <= line - i; j++) {
            drawString += '&nbsp;&nbsp;';
        }
        for (let k = 1; k <= i; k++) {
            drawString += '*';
        }
        drawString += "<br>"
    }

    resultDiv.innerHTML = drawString;
}

function drawTriangle() {
    let shape = document.getElementById("triangle_shape").value;
    //버튼을 누르기전에 value를 읽지 않도록 주의.
    let line = document.getElementById("triangle_line").value;

    if (line <= 1 || line == undefined) {
        resultDiv.innerHTML = "line은 2이상 입력해주세요.";
        return;
    }
    
    switch (shape) {
        case "left":
            drawLeftTriangle(line);
            break;
        case "right":
            drawRightTriangle(line);
            break;
        case "downLeft":
            drawLeftReverseTriangle(line);
            break;
        case "downRight":
            drawRightReverseTriangle(line);
            break;

        default:
            resultDiv.innerHTML = "left, right, downLeft, downRight 중 입력해주세요.";
            return;
    }
}