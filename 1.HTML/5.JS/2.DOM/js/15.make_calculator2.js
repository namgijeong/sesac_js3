let buttonGridItems = document.querySelectorAll(".button_grid_item");
let calWindow = document.getElementById("cal_window");
let inputString = '';
let result = 0;

//기본적으로 getElementsByClassName() 결과는 forEach가 안 된다.
//getElementsByClassName => HTMLCollection => x
//querySelectorAll => NodeList => o
buttonGridItems.forEach((button) => {
    button.addEventListener('click', function (e) {
        clickButton(e);
    });
});

function clickButton(e) {
    //console.log(e.target.textContent);
    let currentInput = e.target.textContent;

    //사칙연산 기호가 오면 분리하기 쉽도록 공백을 붙인후 문자열에 연결하자
    if (currentInput == '+' || currentInput == '-' || currentInput == '*' || currentInput == '/') {
        inputString += ' ' + currentInput + ' ';
    }
    else if (currentInput == '=') {
        //만약 에러메시지인데 또 누를수도 있으니
        if (inputString.includes("error")) {
            return;
        }
        //아무것도 입력안하면 안된다.
        else if (inputString == '') {
            inputString = 'error: 유효한 식이 아닙니다.';
        }
        //맨앞에 연산기호가 있으면 안된다
        else if (inputString[0] == '+' || inputString[0] == '-' || inputString[0] == '*' || inputString[0] == '/') {
            inputString = 'error: 유효한 식이 아닙니다.';
        }
        //문자열 마지막에 숫자가 있어야한다 inputString[inputString.length - 1]
        else if (inputString[inputString.length - 1] != '0' && inputString[inputString.length - 1] != '1' && inputString[inputString.length - 1] != '2' && inputString[inputString.length - 1] != '3' && inputString[inputString.length - 1] != '4' && inputString[inputString.length - 1] != '5' && inputString[inputString.length - 1] != '6' && inputString[inputString.length - 1] != '7' && inputString[inputString.length - 1] != '8' && inputString[inputString.length - 1] != '9') {
            inputString = 'error: 유효한 식이 아닙니다.';
        }
        else {
            let splitArray = inputString.split(" ");
            for (let i = 0; i < splitArray.length; i++) {
                if (splitArray[i] == '+' || splitArray[i] == '-' || splitArray[i] == '*' || splitArray[i] == '/') {

                    //연산기호뒤에 숫자가 있는지 확인한다 => 9 ****1 같은 경우
                    if (splitArray[i + 1] != '0' && splitArray[i + 1] != '1' && splitArray[i + 1] != '2' && splitArray[i + 1] != '3' && splitArray[i + 1] != '4' && splitArray[i + 1] != '5' && splitArray[i + 1] != '6' && splitArray[i + 1] != '7' && splitArray[i + 1] != '8' && splitArray[i + 1] != '9') {
                        inputString = 'error: 유효한 식이 아닙니다.';
                        splitArray[splitArray.length - 1] = 'error: 유효한 식이 아닙니다.';
                        break;
                    }

                    switch (splitArray[i]) {
                        case '+':
                            console.log('+');
                            splitArray[i + 1] = add(splitArray[i - 1], splitArray[i + 1]);
                            break;
                        case '-':
                            console.log('-');
                            splitArray[i + 1] = sub(splitArray[i - 1], splitArray[i + 1]);
                            break;
                        case '*':
                            console.log('*');
                            splitArray[i + 1] = mul(splitArray[i - 1], splitArray[i + 1]);
                            break;
                        case '/':
                            console.log('/');
                            splitArray[i + 1] = div(splitArray[i - 1], splitArray[i + 1]);
                            break;
                        default:

                    }
                }
            }

            result = splitArray[splitArray.length - 1];
            console.log(result);
            console.log(splitArray);
            //이때 계산했던 결과면 숫자이므로 나중에 C를 눌러 지울때 slice가 적용안됨
            inputString = '' + result;
        }

    }
    else if (currentInput == "C") {
        //만약 오류메시지면 한번에 지우자 
        if (inputString.includes("error")) {
            inputString = '';
        } else {
            inputString = inputString.slice(0, inputString.length - 1);
        }

    }
    else {
        inputString += currentInput;
    }
    calWindow.textContent = inputString;

    //가로로 스크롤 생길때, 요소 내용이 늘어나면서 스크롤도 자동으로 따라가도록
    //scrollWidth => 전체 가로 길이
    calWindow.scrollLeft = calWindow.scrollWidth;

}

function add(num1, num2) {
    return Number(num1) + Number(num2);
}

function sub(num1, num2) {
    return Number(num1) * Number(num2);
}

function mul(num1, num2) {
    return Number(num1) * Number(num2);
}

function div(num1, num2) {
    return Number(num1) / Number(num2);
}