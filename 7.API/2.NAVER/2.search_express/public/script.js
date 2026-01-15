const searchForm = document.getElementById('searchForm');
const query = document.getElementById('query');
const results = document.getElementById('results');
const pagination = document.getElementById('pagination');

let page = 1;
const BLOCK_SIZE = 10;
const PAGE_SIZE = 10;

searchForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const data = await search();
  console.log(data);
  console.log(data.total);
  totalCount = data.total;

  renderResults(data);
  renderPagination(totalCount);
});

async function search() {
  const queryStr = query.value.trim();
  if (!queryStr) return;

  results.innerHTML = '<li>로딩중...</li>';

  const resp = await fetch(`/search/blog`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ page: page, text: queryStr }),
  });

  const data = await resp.json();
  return data;
}

function renderResults(data) {
  results.innerHTML = '';
  results.innerHTML = `<h4>검색 결과수 : ${data.total}</h4>`;

  if (data.items && data.items.length) {
    data.items.forEach((d) => {
      const li = document.createElement('li');

      //target="_blank" => 링크 클릭 시 새 탭으로 열기
      li.innerHTML = `
            <h3><a href="${d.link}" target="_blank">${d.title}</a></h3>
            <p>${d.description}</p>
            <small>포스팅 일자:${d.postdate}</small>
            `;
      results.appendChild(li);
    });
  }
}

function renderPagination(totalCount) {
  let totalPages = totalCount / PAGE_SIZE;
  let currentBlockNumber = Math.ceil(page / BLOCK_SIZE);
  let endBlockIndex = BLOCK_SIZE * currentBlockNumber;
  let startBlockIndex = endBlockIndex - BLOCK_SIZE + 1;
  let prev = true;
  let next = true;

  console.log(currentBlockNumber);
  console.log(startBlockIndex);
  console.log(endBlockIndex);

  if (startBlockIndex <= 1) {
    startBlockIndex = 1;
    prev = false;
  }

  if (endBlockIndex >= totalPages) {
    endBlockIndex = totalPages;
    next = false;
  }

  pagination.innerHTML = '';
  let paginationString = '';

  if (prev) {
    paginationString += `<button data-number=${startBlockIndex - 1}>&lt;</button>`;
  }
  for (let i = startBlockIndex; i <= endBlockIndex; i++) {
    paginationString += `<button data-number=${i}>${i}</button>`;
  }
  if (next) {
    paginationString += `<button data-number=${endBlockIndex + 1}>&gt;</button>`;
  }
  pagination.innerHTML = paginationString;
}

pagination.addEventListener('click', (ev) => {
  if (ev.target.tagName == 'BUTTON') {
    console.log('클릭');
    page = ev.target.dataset.number;
    console.log(page);

    //form.submit() 쓰는 순간 preventDefault()는 무조건 무시된다
    //form.submit() does not trigger the submit event.
    //브라우저가 즉시 폼 전송
    //searchForm.submit();

    searchForm.requestSubmit();
  }
});
