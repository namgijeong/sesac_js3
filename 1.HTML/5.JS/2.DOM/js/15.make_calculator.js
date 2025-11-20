let buttonGridItems = document.querySelectorAll(".button_grid_item");
let calWindow = document.getElementById("cal_window");
let inputString = '';

//기본적으로 getElementsByClassName() 결과는 forEach가 안 된다.
//getElementsByClassName => HTMLCollection => x
//querySelectorAll => NodeList => o
buttonGridItems.forEach((button) => {
    button.addEventListener('click',function (e){
        clickButton(e);
    });
});

function clickButton(e){
    //console.log(e.target.textContent);
    let currentInput = e.target.textContent;
    
    //만약 아무숫자도 입력안했는데 연산기호가 먼저 입력되면 안된다 => syntax error
    //아무것도 입력안하고 = 를 누르면 undefined 결과값
    //연산기호가 중간에 왔는데 끝이 숫자로 끝나지 않으면 에러 => syntax error
    //나누기 기호 뒤에 0이 오면 안된다 => Infinity로 결과값

    if (currentInput == "="){
        //맨앞에 연산기호가 있는지 검사
        if (inputString[0] == '+' || inputString[0] == '-' || inputString[0] == '*' || inputString[0] == '/'){
            inputString = 'error: 유효한 식이 아닙니다.';
        }

        //마지막이 숫자로 끝나는지 검사
        if (inputString[inputString.length-1] != '1' && inputString[inputString.length-1] != '2' && inputString[inputString.length-1] != '3' && inputString[inputString.length-1] != '4' && inputString[inputString.length-1] != '5' && inputString[inputString.length-1] != '6' && inputString[inputString.length-1] != '7' && inputString[inputString.length-1] != '8' && inputString[inputString.length-1] != '9'){
            inputString = 'error: 유효한 식이 아닙니다.';
        }
        //9 ****1 같은 경우는 소용이 없는데? = > 기호를 입력할시 앞에 이미 입력한 기호가 있는지 검사
        //혹은 기호가 나타나면 기호 바로 뒤에 숫자 있는지 확인
        //리턴값이 undefined, Infinity인지 검사

        //에러문구인 상태로 또 누르면 
        else if (inputString.includes('error')){
            inputString = 'error: 유효한 식이 아닙니다.';
        }
        else{
            let result = eval(inputString);
            console.log(result);
            //이때 계산했던 결과면 숫자이므로 나중에 C를 눌러 지울때 slice가 적용안됨
            inputString = ''+result;
        }
        
    }else if (currentInput == "C"){
        inputString = inputString.slice(0,inputString.length-1); 
    }else {
        inputString += currentInput;
    }

    calWindow.textContent = inputString;

    //가로로 스크롤 생길때, 요소 내용이 늘어나면서 스크롤도 자동으로 따라가도록
    //scrollWidth => 전체 가로 길이
    calWindow.scrollLeft = calWindow.scrollWidth;
    console.log(inputString);

}