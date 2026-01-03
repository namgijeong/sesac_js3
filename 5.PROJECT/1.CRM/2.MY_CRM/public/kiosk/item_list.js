const currentPaginationSize = 10;
const searchName = document.getElementById("search-name");
const userSelectedItems = document.getElementById('user-selected-items');

document.addEventListener("DOMContentLoaded", () => {
  //검색 버튼 활성화
  const searchBtn = document.getElementById("search-button");

  searchBtn.addEventListener("click", () => {
    fetchItems(searchName.value, 1);
  });

  //검색어를 설정하지 않았을때 기본값
  fetchItems("", 1);
});

function fetchItems(name, currentPage) {
  //만약 스페이스는 %20으로 바꿔줌
  const queryString = `?name=${encodeURIComponent(name)}&page=${currentPage}`;
  fetch(`/api/items${queryString}`)
    .then((response) => response.json())
    .then((data) => {
      renderTable(data.data);

      //페이지네이션을 그려라
      renderPagination(data.totalPages, currentPage);
    });
}

function renderPagination(totalPages, currentPage) {
  const pagination = document.getElementById("pagination");
  pagination.innerHTML = "";

  const currenBlockNumber = Math.ceil(currentPage / currentPaginationSize);
  let endPageNumber = currenBlockNumber * currentPaginationSize;
  let startPageNumber = endPageNumber - currentPaginationSize + 1;
  let totalEndPage = totalPages;

  let prevBlock = true;
  let nextBlock = true;

  if (startPageNumber <= 1) {
    startPageNumber = 1;
    prevBlock = false;
  }
  if (endPageNumber >= totalEndPage) {
    endPageNumber = totalEndPage;
    nextBlock = false;
  }

  let myPages = '<nav><ul class="pagination">';

  if (prevBlock === true) {
    myPages += `<li class="page-item" data-number="${
      startPageNumber - 1
    }"><a class="page-link" data-number="${
      startPageNumber - 1
    }" href="#">&lt;&lt;</a></li>`;
  }

  for (let i = startPageNumber; i <= endPageNumber; i++) {
    myPages += `<li class="page-item" data-number="${i}"><a class="page-link" data-number="${i}" href="#"> ${i} </a></li>`;
  }

  if (nextBlock === true) {
    myPages += `<li class="page-item" data-number="${
      endPageNumber + 1
    }"><a class="page-link" data-number="${
      endPageNumber + 1
    }" href="#">&gt;&gt;</a></li>`;
  }

  myPages += "</ul></nav>";
  pagination.innerHTML = myPages;

  const paginationUl = document.getElementsByClassName("pagination")[0];
  paginationUl.addEventListener("click", (ev) => {
    const clickedNumber = ev.target.dataset.number;

    fetchItems(searchName.value, clickedNumber);
  });
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
      const one_th = document.createElement("th");
      one_th.textContent = h;
      headerRow.appendChild(one_th);
    });

    tableHeader.appendChild(headerRow);

    data.forEach((row) => {
      const bodyRow = document.createElement("tr");

      //해당 row에다가 이벤트
      bodyRow.addEventListener("click", () => {
        const liTag = document.createElement('li');
        liTag.classList.add('list-group-item', 'custom-list-group-item', 'list-group-item-action','d-flex','flex-column','gap-2','justify-content-center','align-items-center');
        liTag.dataset.itemId = row.itemId;

        const nameDiv = document.createElement('div');
        nameDiv.textContent = row.itemName;

        const deleteDiv = document.createElement('div');
        deleteDiv.textContent = 'x';
        deleteDiv.classList.add('product_delete');

        const buttonContainerDiv = document.createElement('div');
        buttonContainerDiv.classList.add('product_button_container');

        const buttonMinus = document.createElement('button');
        buttonMinus.textContent = '-';
        buttonMinus.classList.add('minus', 'btn', 'btn-outline-primary');

        const itemCount = document.createElement('p');
        itemCount.textContent = 1;
        itemCount.classList.add('item-count');

        const buttonPlus = document.createElement('button');
        buttonPlus.textContent = '+';
        buttonPlus.classList.add('plus', 'btn', 'btn-outline-primary');

        buttonContainerDiv.appendChild(buttonMinus);
        buttonContainerDiv.appendChild(itemCount);
        buttonContainerDiv.appendChild(buttonPlus);

        liTag.appendChild(nameDiv);
        liTag.appendChild(deleteDiv);
        liTag.appendChild(buttonContainerDiv);

        userSelectedItems.appendChild(liTag);
      });
      bodyRow.classList.add('go_detail');

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
