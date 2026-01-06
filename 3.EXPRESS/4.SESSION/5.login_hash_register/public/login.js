document.addEventListener('DOMContentLoaded', () => {
  //현재 이 사용자의 로그인 상태 확인 => 새로 고침시
  //나의 상태를 제대로 알고있는가? 그건 서버의 영역임
  //jsp처럼 바로 세션변수에 접근할수없다
  checkLoginStatus();

  document.getElementById('loginButton').addEventListener('click', login);
  document.getElementById('logoutButton').addEventListener('click', logout);
  document.getElementById('resignButton').addEventListener('click', resign);
});

function checkLoginStatus() {
  fetch('/check-login')
    .then((resp) => resp.json())
    .then((data) => {
      console.log(data);
      if (data.username) {
        showProfile(data.username);
      } else {
        showLoginForm();
      }
    });
}

function logout(e) {
  fetch('/logout') //get 방식인데 받는 인자도 뭐도 아무것도 없음
    .then((resp) => resp.json())
    .then((data) => {
      console.log(data);
      //alert(data.message);

      if (data.message == '로그아웃 성공') {
        showLoginForm();
      }
    });
}

function login(e) {
  //기본 form action으로 바로 제출하는것 막기
  e.preventDefault();

  const username = document.getElementById('username').value;
  console.log(username);
  const password = document.getElementById('password').value;
  console.log(password);

  fetch('/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username, password }),
  })
    .then((resp) => resp.json())
    .then((data) => {
      //console.log(data);
      if (data.message == '로그인 성공') {
        //alert('로그인 성공');
        //window.location.href= '/profile';

        showProfile(username);
      } else {
        alert('로그인 실패');
      }
    });
}

function showProfile(username) {
  document.getElementById('loginFormContainer').style.display = 'none';

  //사용자 프로필 창 보여주기
  document.getElementById('profile').style.display = 'block';
  document.getElementById('usernameSpan').innerText = username;
}

function showLoginForm() {
  document.getElementById('loginFormContainer').style.display = 'block';

  //사용자 프로필 창 숨기기
  document.getElementById('profile').style.display = 'none';
}

async function resign(){
  const response = await fetch('/resign');
  const data = await response.json();

  if (data.hasOwnProperty('success')){
    alert('회원탈퇴 완료');
    window.location.href = '/';
  } else {
    alert('회원탈퇴 실패');
  }
}