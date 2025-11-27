const userNickNameInput = document.getElementById('usernickname');
let userNickName;
let userNickNameValid = false;

const userPasswordInput = document.getElementById('userpassword');
let userPassword;
let userPasswordValid = false;

const userNameInput = document.getElementById('username');
let userName;
let userNameValid = false;

const userBirthdayInput = document.getElementById('userbirthday');
let userBirthday;
let userBirthdayValid = false;

const userInterestingInputs = document.querySelectorAll('.section_content_left input');
let userInterestingInputCounts = 0;
let userInterestingValid = false;

const sectionResultDivs = document.querySelectorAll('.section_result');
const resultTextDivs = document.querySelectorAll('.section_result_text');
const sectionInputDivs = document.querySelectorAll('.section_input');

//전방탐색(lookahead) 패턴은 일치 영역을 발견해도 그 값을 반환하지 않는 패턴
//'?='로 시작

//[xy] 문자 선택을 표현하며 x 와 y 중에 하나를 의미한다.
// * 없거나 or 있거나 
//. 모든 문자열 , 단 줄바꿈은 x

const passwordRegex = /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*]).{8,}$/;

userNickNameInput.addEventListener('blur', () => {
    userNickName = userNickNameInput.value;
    if (userNickName.length < 3 || userNickName.length > 10) {
        sectionResultDivs[0].style.display = 'flex';
        sectionResultDivs[0].innerHTML = `
            <div class="section_result_img">
                <i class="fa-solid fa-circle-exclamation" style="color:red;"></i>
            </div>`;

        sectionInputDivs[0].style.border = '1px solid red';
        userNickNameInput.style.width = '90%';

        resultTextDivs[0].style.display = 'block';

        userNickNameValid = false;
    }
    else {
        resultTextDivs[0].style.display = 'none';

        sectionResultDivs[0].style.display = 'block';
        sectionResultDivs[0].innerHTML = `
                <div class="section_result_img">
                    <i class="fa-solid fa-check" style="color:green;"></i>
                </div>`;

        sectionInputDivs[0].style.border = '1px solid green';
        userNickNameInput.style.width = '90%';
        userNickNameValid = true;
    }
});


userPasswordInput.addEventListener('blur', () => {
    userPassword = userPasswordInput.value;
    if (!userPassword.match(passwordRegex)) {
        sectionResultDivs[1].style.display = 'flex';
        sectionResultDivs[1].innerHTML = `
            <div class="section_result_img">
                <i class="fa-solid fa-circle-exclamation" style="color:red;"></i>
            </div>`;

        sectionInputDivs[1].style.border = '1px solid red';
        userPasswordInput.style.width = '90%';

        resultTextDivs[1].style.display = 'block';

        userPasswordValid = true;
    }
    else {
        resultTextDivs[1].style.display = 'none';

        sectionResultDivs[1].style.display = 'block';
        sectionResultDivs[1].innerHTML = `
                <div class="section_result_img">
                    <i class="fa-solid fa-check" style="color:green;"></i>
                </div>`;

        sectionInputDivs[1].style.border = '1px solid green';
        userPasswordInput.style.width = '90%';
        userPasswordValid = true;

    }
});


userNameInput.addEventListener('blur', () => {
    userName = userNameInput.value;
    if (userName.length < 1 || userName.length > 10) {
        sectionResultDivs[2].style.display = 'flex';
        sectionResultDivs[2].innerHTML = `
            <div class="section_result_img">
                <i class="fa-solid fa-circle-exclamation" style="color:red;"></i>
            </div>`;

        sectionInputDivs[2].style.border = '1px solid red';
        userNameInput.style.width = '90%';

        resultTextDivs[2].style.display = 'block';

        userNameValid = false;
    }
    else {
        resultTextDivs[2].style.display = 'none';

        sectionResultDivs[2].style.display = 'block';
        sectionResultDivs[2].innerHTML = `
                <div class="section_result_img">
                    <i class="fa-solid fa-check" style="color:green;"></i>
                </div>`;

        sectionInputDivs[2].style.border = '1px solid green';
        userNameInput.style.width = '90%';
        userNameValid = true;
    }
});

userBirthdayInput.addEventListener('blur', () => {
    userBirthday = userBirthdayInput.value;
    console.log(userBirthday);
    if (userBirthday == ''){
        sectionResultDivs[3].style.display = 'flex';
        sectionResultDivs[3].innerHTML = `
            <div class="section_result_img">
                <i class="fa-solid fa-circle-exclamation" style="color:red;"></i>
            </div>`;

        sectionInputDivs[3].style.border = '1px solid red';
        userBirthdayInput.style.width = '90%';

        resultTextDivs[3].style.display = 'block';

        userBirthdayValid = false;

    } else {
        resultTextDivs[3].style.display = 'none';

        sectionResultDivs[3].style.display = 'block';
        sectionResultDivs[3].innerHTML = `
                <div class="section_result_img">
                    <i class="fa-solid fa-check" style="color:green;"></i>
                </div>`;

        sectionInputDivs[3].style.border = '1px solid green';
        userBirthdayInput.style.width = '90%';
        userBirthdayValid = true;
    }
});


userInterestingInputs.forEach((userInterestingInput) => {

});