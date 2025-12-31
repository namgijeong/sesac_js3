const userId = window.location.pathname.split("/").pop();
// console.log(window.location);
// console.log(window.location.pathname);

function fetchUserDetail() {
  fetch(`/api/users/${userId}`)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      renderUserTable(data);
    });
}

function fetchUserOrderDetail() {
  fetch(`/api/users_orders/${userId}`)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      renderUserOrderTable(data);
    });
}

function renderUserTable(data) {
  const tableHeader = document.getElementById("user-table-header");
  const tableBody = document.getElementById("user-table-body");

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

function renderUserOrderTable(data) {
  const tableHeader = document.getElementById("user-order-table-header");
  const tableBody = document.getElementById("user-order-table-body");

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

        if (key === "orderId") {
          one_td.addEventListener("click", () => {});
        } else if (key === "purchased location") {
        }

        //orderitem orderid 상세페이지로
        if (key === "orderId") {
          one_td.addEventListener("click", () => {
            window.location = `/orderitems/${value}`;
          });
          one_td.classList.add("go_detail", "text-primary");
        } else if (key === "purchased location") {
          //store id 상세페이지로
          one_td.addEventListener("click", () => {
            window.location = `/stores/${value}`;
          });
          one_td.classList.add("go_detail", "text-primary");
        }
        bodyRow.appendChild(one_td);
      }

      tableBody.appendChild(bodyRow);
    });
  } else {
    tableBody.innerHTML = "---표시할 데이터가 없습니다.---";
  }
}

fetchUserDetail();
fetchUserOrderDetail();
