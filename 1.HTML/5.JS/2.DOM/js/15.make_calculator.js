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
    console.log(e.target.textContent);
    
    if (e.target.textContent == "="){
        let result = eval(inputString);
        console.log(result);
        //이때 계산했던 결과면 숫자이므로 나중에 C를 눌러 지울때 slice가 적용안됨
        inputString = ''+result;
    }else if (e.target.textContent == "C"){
        let length = inputString.length;
      
        inputString = inputString.slice(0,length-1); 
    }else {
        inputString += e.target.textContent;
    }

    calWindow.textContent = inputString;

    //가로로 스크롤 생길때, 요소 내용이 늘어나면서 스크롤도 자동으로 따라가도록
    //scrollWidth => 전체 가로 길이
    calWindow.scrollLeft = calWindow.scrollWidth;
    console.log(inputString);

}