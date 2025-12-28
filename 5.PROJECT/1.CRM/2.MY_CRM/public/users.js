document.addEventListener("DOMContentLoaded", () => {
  //검색 버튼 활성화
  const searchBtn = document.getElementById("search-button");
  const searchName = document.getElementById("search-name");

  searchBtn.addEventListener("click", () => {
    fetchUsers(searchName.value);
  });

  //사용자를 가져올거야
  fetchUsers("");
});

function fetchUsers(name) {
  //만약 스페이스는 %20으로 바꿔줌
  const queryString = `?name=${encodeURIComponent(name)}&page=1`;
  fetch(`/api/users${queryString}`)
    .then((response) => response.json())
    .then((data) => {
      renderTable(data.data);

      //페이지네이션을 그려라
      renderPagination(data.totalPages);
    });
}

function renderPagination(totalPages){
    const pagination = document.getElementById('pagination');

    pagination.innerHTML = '';

    let myPages = '<nav><ul class="pagination">';

    for (let i = 1; i <= totalPages; i++){
        myPages += `<li class="page-item"><a class="page-link href="#"> ${i} </a></li>`;
    }

    myPages += '</ul></nav>';
    pagination.innerHTML = myPages;
}

function renderTable(data) {
  const tableHeader = document.getElementById("table-header");
  const tableBody = document.getElementById("table-body");

  tableHeader.innerHTML = "";
  tableBody.innerHTML = "";

  if (data.length > 0) {
    //key를 이용해서 헤더
    const headers = Object.keys(data[0]);
    const headerRow = document.createElement("tr");

    headers.forEach((h) => {
      //원하는거 제거
      if (h != "Address") {
        const one_th = document.createElement("th");
        one_th.textContent = h;
        headerRow.appendChild(one_th);
      }
    });

    tableHeader.appendChild(headerRow);

    data.forEach((row) => {
      const bodyRow = document.createElement("tr");

      //해당 row에다가 이벤트
      bodyRow.addEventListener("click", () => {
        console.log("해당 줄 클릭됨");
        //브라우저 창에 주소를 넣어서 이동하는 방법
        window.location = `/users/${row.userId}`;
      });

      for (const [key, value] of Object.entries(row)) {
        if (key != "Address") {
          const one_td = document.createElement("td");
          one_td.textContent = value;
          bodyRow.appendChild(one_td);
        }
      }

      tableBody.appendChild(bodyRow);
    });
  } else {
    tableBody.innerHTML = "---표시할 데이터가 없습니다.---";
  }
}
