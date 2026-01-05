const itemId = window.location.pathname.split("/").pop();
// console.log(window.location);
// console.log(window.location.pathname);

const waitingItemDiv = document.getElementById('waiting-item');
const waitingItemRevenueDiv = document.getElementById('waiting-item-revenue');

function fetchItemDetail() {
  fetch(`/api/items/${itemId}`)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      renderItemTable(data);
      waitingItemDiv.classList.add('d-none');
    });
}

function fetchItemRevenueDetail() {
  fetch(`/api/items_revenues/${itemId}`)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      renderItemRevenueTable(data);
      waitingItemRevenueDiv.classList.add('d-none');
    });
}

function renderItemTable(data) {
  const tableHeader = document.getElementById("item-table-header");
  const tableBody = document.getElementById("item-table-body");

  tableHeader.innerHTML = "";
  tableBody.innerHTML = "";

  //key를 이용해서 헤더
  const headers = Object.keys(data);
  const headerRow = document.createElement("tr");

  headers.forEach((h) => {
    if (h != "itemId" && h != "itemType") {
      const one_th = document.createElement("th");
      one_th.textContent = h;
      headerRow.appendChild(one_th);
    }
  });

  tableHeader.appendChild(headerRow);

  const bodyRow = document.createElement("tr");

  for (const [key, value] of Object.entries(data)) {
    if (key != "itemId" && key != "itemType") {
      const one_td = document.createElement("td");
      one_td.textContent = value;
      bodyRow.appendChild(one_td);
    }
  }

  tableBody.appendChild(bodyRow);
}


function renderItemRevenueTable(data) {
  const tableHeader = document.getElementById("item-revenue-table-header");
  const tableBody = document.getElementById("item-revenue-table-body");

  tableHeader.innerHTML = "";
  tableBody.innerHTML = "";

  if (data.length > 0) {
    //key를 이용해서 헤더
    const headers = Object.keys(data[0]);
    const headerRow = document.createElement("tr");

    headers.forEach((h) => {
      const one_th = document.createElement("th");
      one_th.textContent = h;
      headerRow.appendChild(one_th);
    });

    tableHeader.appendChild(headerRow);

    data.forEach((row) => {
      const bodyRow = document.createElement("tr");

      for (const [key, value] of Object.entries(row)) {
        const one_td = document.createElement("td");
        one_td.textContent = value;

        bodyRow.appendChild(one_td);
      }

      tableBody.appendChild(bodyRow);
    });
  } else {
    tableBody.innerHTML = "---표시할 데이터가 없습니다.---";
  }
}

fetchItemDetail();
fetchItemRevenueDetail();
