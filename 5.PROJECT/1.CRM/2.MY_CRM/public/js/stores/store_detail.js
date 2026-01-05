const storeId = window.location.pathname.split("/").pop();
// console.log(window.location);
// console.log(window.location.pathname);

const waitingStoreDiv = document.getElementById('waiting-store');
const waitingStoreRevenueDiv = document.getElementById('waiting-store-revenue');
const waitingStoreUserDiv = document.getElementById('waiting-store-user');

function fetchStoreDetail() {
  fetch(`/api/stores/${storeId}`)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      renderStoreTable(data);
      waitingStoreDiv.classList.add('d-none');
    });
}

function fetchStoreRevenueDetail() {
  fetch(`/api/stores_revenues/${storeId}`)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      renderStoreRevenueTable(data);
      waitingStoreRevenueDiv.classList.add('d-none');
    });
}

function fetchStoreUserDetail() {
  fetch(`/api/stores_users/${storeId}`)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      renderStoreUserTable(data);
      waitingStoreUserDiv.classList.add('d-none');
    });
}

function renderStoreTable(data) {
  const tableHeader = document.getElementById("store-table-header");
  const tableBody = document.getElementById("store-table-body");

  tableHeader.innerHTML = "";
  tableBody.innerHTML = "";

  //key를 이용해서 헤더
  const headers = Object.keys(data);
  const headerRow = document.createElement("tr");

  headers.forEach((h) => {
    if (h != "storeId") {
      const one_th = document.createElement("th");
      one_th.textContent = h;
      headerRow.appendChild(one_th);
    }
  });

  tableHeader.appendChild(headerRow);

  const bodyRow = document.createElement("tr");

  for (const [key, value] of Object.entries(data)) {
    if (key != "storeId") {
      const one_td = document.createElement("td");
      one_td.textContent = value;
      bodyRow.appendChild(one_td);
    }
  }

  tableBody.appendChild(bodyRow);
}

function renderStoreRevenueTable(data) {
  const tableHeader = document.getElementById("store-revenue-table-header");
  const tableBody = document.getElementById("store-revenue-table-body");

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

        // if (key === "orderId") {
        //   one_td.addEventListener("click", () => {});
        // } else if (key === "purchased location") {
        // }

        // //orderitem orderid 상세페이지로
        // if (key === "orderId") {
        //   one_td.addEventListener("click", () => {
        //     window.location = `/orderitems/${value}`;
        //   });
        //   one_td.classList.add("go_detail", "text-primary");
        // } else if (key === "purchased location") {
        //   //store id 상세페이지로
        //   one_td.addEventListener("click", () => {
        //     window.location = `/stores/${value}`;
        //   });
        //   one_td.classList.add("go_detail", "text-primary");
        // }
        bodyRow.appendChild(one_td);
      }

      tableBody.appendChild(bodyRow);
    });
  } else {
    tableBody.innerHTML = "---표시할 데이터가 없습니다.---";
  }
}

function renderStoreUserTable(data) {
  const tableHeader = document.getElementById("store-user-table-header");
  const tableBody = document.getElementById("store-user-table-body");

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

        // user userid 상세페이지로
        if (key === "userId") {
          one_td.addEventListener("click", () => {
            window.location = `/users/${value}`;
          });
          one_td.classList.add("go_detail", "text-primary", 'custom-td');
        }
        bodyRow.appendChild(one_td);
      }

      tableBody.appendChild(bodyRow);
    });
  } else {
    tableBody.innerHTML = "---표시할 데이터가 없습니다.---";
  }
}

fetchStoreDetail();
fetchStoreRevenueDetail();
fetchStoreUserDetail();
