const itemId = window.location.pathname.split("/").pop();
// console.log(window.location);
// console.log(window.location.pathname);


function fetchItemDetail() {
  fetch(`/api/items/${itemId}`)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      renderTable(data)
    });
}

function renderTable(data) {
  const tableHeader = document.getElementById("table-header");
  const tableBody = document.getElementById("table-body");

  tableHeader.innerHTML = "";
  tableBody.innerHTML = "";

  //key를 이용해서 헤더
  const headers = Object.keys(data);
  const headerRow = document.createElement("tr");

  headers.forEach((h) => {
    const one_th = document.createElement("th");
    one_th.textContent = h;
    headerRow.appendChild(one_th);
  });

  tableHeader.appendChild(headerRow);

  const bodyRow = document.createElement("tr");

  for (const [key, value] of Object.entries(data)) {
    const one_td = document.createElement("td");
    one_td.textContent = value;
    bodyRow.appendChild(one_td);
  }

  tableBody.appendChild(bodyRow);
}


fetchItemDetail();