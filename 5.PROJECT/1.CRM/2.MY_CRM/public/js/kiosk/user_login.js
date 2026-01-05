const userNameInput = document.getElementById("userName");
const userPasswordInput = document.getElementById("userPassword");
const goLoginBtn = document.getElementById("go-login");
const goUserRegister = document.getElementById("go-user-register");
const loginFeedbackDiv = document.getElementById("login-feedback");

//로그인이 실패하면 오류메시지 표시하고 이동하지 않음
goLoginBtn.addEventListener("click", async (ev) => {
  ev.preventDefault();

  const userName = userNameInput.value;
  const userPassword = userPasswordInput.value;

  const response = await fetch(`/api/users/login/check`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      userName,
      userPassword
    }),
  });
  
  const data = await response.json();

  if (Object.hasOwn(data, "error")) {
    //부트스트랩은 .is-invalid가 붙은 input 뒤에 있는 형제 .invalid-feedback 상태일때만 display block
    loginFeedbackDiv.classList.remove("d-none");
    //강제로 d-block
    loginFeedbackDiv.classList.add('d-block');
  } else {
    window.location.href = `/kiosk/user/register`;
  }
});
