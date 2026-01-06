document.addEventListener('DOMContentLoaded', () => {
  const registerButton = document.getElementById('registerButton');
  registerButton.addEventListener('click', registerCheck);
});

async function registerCheck(ev){
  ev.preventDefault();
  
  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  if (!username || !password){
    alert('회원가입 양식을 다 입력해주세요.');
    return;
  }

  const response = await fetch('/register/check',{
    method:'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({username, password}),
  });

  const data = await response.json();

  if (data.hasOwnProperty('success')){
    alert('회원가입 완료');
    window.location.href = '/';
  }
}