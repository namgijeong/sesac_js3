const genreSelectTag = document.getElementById("genre_select");
const genreSearchButton = document.getElementById("genre_search");
const resultContainerDiv = document.getElementById("result_content_container");
const resultButtonContainer = document.getElementById('result_button_container');
const LIMIT = 10;
const LIMITPAGE = 5;
let genreSelectValue = '';


document.addEventListener("DOMContentLoaded", async () => {
  genreSelectTag.innerHTML = "";

  const response = await fetch(`/genres`);
  const data = await response.json();
  data.forEach((one) => makeSelectItem(one.Name));

  genreSearchButton.addEventListener("click", () => {
    genreSelectValue = genreSelectTag.value;
    searchTracks(genreSelectValue, 1);
  });
});

function makeSelectItem(genrename) {
  const genreOptionTag = document.createElement("option");
  genreOptionTag.value = genrename;
  genreOptionTag.textContent = genrename;

  genreSelectTag.appendChild(genreOptionTag);
}

async function searchTracks(genrename, page) {
  resultContainerDiv.innerHTML = "";

  const response = await fetch(`/genres/${genrename}/${page}`);
  const data = await response.json();
  console.log(data);
  data.tracks.forEach((one) => makeListItem(one.genrename, one.trackname));

  makePageButton(page, data.totalcount);
}

function makeListItem(genrename, trackname) {
  const resultContentDiv = document.createElement("div");
  resultContentDiv.classList.add("result_content");
  resultContentDiv.innerHTML = `<div class="genre_name">${genrename}</div>
    <div class="genre_track">${trackname}</div>
    `;

  resultContainerDiv.appendChild(resultContentDiv);
}

function makePageButton(page, totalCount){
  resultButtonContainer.innerHTML = '';

  const totalPage = Math.ceil(totalCount / LIMIT);
  const sectionNumber = Math.ceil(page / LIMITPAGE);
  console.log(sectionNumber);
  let sectionEndNumber = sectionNumber * LIMITPAGE;
  let sectionStartNumber = sectionEndNumber - LIMITPAGE + 1;

  if (sectionStartNumber < 1){
    sectionStartNumber = 1;
  }
  if (sectionEndNumber > totalPage){
    sectionEndNumber = totalPage;
  }

  //이전 버튼 만들기
  if (sectionStartNumber > 1){
    const prevButtonNumber = sectionStartNumber - 1;
   
    const prevButton = document.createElement('button');
    prevButton.classList.add('page_button');
    prevButton.textContent = '<';
    prevButton.dataset.number = prevButtonNumber;
    resultButtonContainer.appendChild(prevButton);
  }

  //숫자 버튼 만들기
  for (let i = sectionStartNumber; i <= sectionEndNumber; i++){
    const Button = document.createElement('button');
    Button.classList.add('page_button');
    Button.textContent = i;
    Button.dataset.number = i;
    resultButtonContainer.appendChild(Button);
  }

  //다음 버튼 만들기
  if (sectionEndNumber < totalPage){
    const nextButtonNumber = sectionEndNumber + 1;
    
    const nextButton = document.createElement('button');
    nextButton.classList.add('page_button');
    nextButton.textContent = '>';
    nextButton.dataset.number = nextButtonNumber
    resultButtonContainer.appendChild(nextButton);
  }
}

//이벤트 위임
resultButtonContainer.addEventListener('click', (ev) => {
  if (ev.target.classList.contains('page_button')){
    searchTracks(genreSelectValue, ev.target.dataset.number);
  }
});