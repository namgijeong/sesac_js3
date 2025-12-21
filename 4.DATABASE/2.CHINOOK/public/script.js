const genreSelectTag = document.getElementById("genre_select");
const genreSearchButton = document.getElementById("genre_search");
const resultContainerDiv = document.getElementById("result_content_container");

document.addEventListener("DOMContentLoaded", async () => {
  genreSelectTag.innerHTML = "";

  const response = await fetch(`/genres`);
  const data = await response.json();
  data.forEach((one) => makeSelectItem(one.Name));

  genreSearchButton.addEventListener("click", () => {
    const genreSelectValue = genreSelectTag.value;
    searchTracks(genreSelectValue);
  });
});

function makeSelectItem(genrename) {
  const genreOptionTag = document.createElement("option");
  genreOptionTag.value = genrename;
  genreOptionTag.textContent = genrename;

  genreSelectTag.appendChild(genreOptionTag);
}

async function searchTracks(genrename) {
  resultContainerDiv.innerHTML = "";

  const response = await fetch(`/genres/${genrename}`);
  const data = await response.json();
  console.log(data);
  data.forEach((one) => makeListItem(one.genrename, one.trackname));
}

function makeListItem(genrename, trackname) {
  const resultContentDiv = document.createElement("div");
  resultContentDiv.classList.add("result_content");
  resultContentDiv.innerHTML = `<div class="genre_name">${genrename}</div>
    <div class="genre_track">${trackname}</div>
    `;

  resultContainerDiv.appendChild(resultContentDiv);
}
