const orderId = window.location.pathname.split("/").pop();
// console.log(window.location);
// console.log(window.location.pathname);

function fetchOrderItemDetail() {
  fetch(`/api/orderitems/${orderId}`)
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
      renderTable(data);
    });
}

function renderTable(data) {
  const tableHeader = document.getElementById("table-header");
  const tableBody = document.getElementById("table-body");

  tableHeader.innerHTML = "";
  tableBody.innerHTML = "";

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

       //order id 상세페이지로
      if (key === "orderId") {
        one_td.addEventListener("click", () => {
          window.location = `/orders/${value}`;
        });
        one_td.classList.add("go_detail", "text-primary", 'custom-td');
      } else if (key === "itemId") {
        //item id 상세페이지로
        one_td.addEventListener("click", () => {
          window.location = `/items/${value}`;
        });
        one_td.classList.add("go_detail", "text-primary", 'custom-td');
      }

      bodyRow.appendChild(one_td);
    }

    tableBody.appendChild(bodyRow);
  });
}

fetchOrderItemDetail();
