const userNickNameInput = document.getElementById('usernickname');
let userNickName;
let userNickNameValid = false;

const sectionResultDivs = document.querySelectorAll('.section_result');
const resultTextDivs = document.querySelectorAll('.section_result_text');
const sectionInputDivs = document.querySelectorAll('.section_input');


userNickNameInput.addEventListener('blur', () => {
    userNickName = userNickNameInput.value;
    if (userNickName.length < 3 || userNickName.length > 10){
        sectionResultDivs[0].style.display = 'flex';
        resultTextDivs[0].style.display = 'block';
        sectionInputDivs[0].style.border = '1px solid red';
        userNickNameInput.style.width = '90%';
    }
    else{
        sectionResultDivs[0].style.display = 'none';
        resultTextDivs[0].style.display = 'none';
        sectionInputDivs[0].style.border = 'none';
        userNickNameInput.style.width = '100%';
    }
});