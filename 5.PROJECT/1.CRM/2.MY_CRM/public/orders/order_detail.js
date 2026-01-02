const orderId = window.location.pathname.split("/").pop();
// console.log(window.location);
// console.log(window.location.pathname);

const waitingOrderDiv = document.getElementById('waiting-order');

function fetchOrderDetail() {
  fetch(`/api/orders/${orderId}`)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      renderTable(data);
      waitingOrderDiv.classList.add('d-none');
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

    //store id 상세페이지로
    if (key === "storeId") {
      one_td.addEventListener("click", () => {
        window.location = `/stores/${value}`;
      });
      one_td.classList.add("go_detail", "text-primary",'custom-td');
    } else if (key === "userId") {
      //user id 상세페이지로
      one_td.addEventListener("click", () => {
        window.location = `/users/${value}`;
      });
      one_td.classList.add("go_detail", "text-primary",'custom-td');
    }

    bodyRow.appendChild(one_td);
  }

  tableBody.appendChild(bodyRow);
}

fetchOrderDetail();
