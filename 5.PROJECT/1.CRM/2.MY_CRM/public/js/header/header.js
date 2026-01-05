const headerDiv = document.getElementById('header');

// document.addEventListener("DOMContentLoaded", () => {
//     fetchHeaders();
// });

async function fetchHeaders(){
  const response = await fetch(`/header/header.html`);
  const text = await response.text();
  headerDiv.innerHTML = text;
}

fetchHeaders();