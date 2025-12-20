//이 파일 즉 이 페이지가 최초로 불릴때, 게시판에 글이 있을수도 있으니 로딩하기
document.addEventListener("DOMContentLoaded", () => {
  fetch("/api/list")
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      data.forEach((post) => makeCard(post.id, post.title, post.message));
    });
});

function makeCard(id, title, message) {
  //기존에 있던 DOM의 차일드에 추가하기

  const card = document.createElement("div");
  card.innerHTML = `
        <div class="card" id="card_${id}">
            <div class="card-body">
                <p class="card-id">${id}</p>
                <p class="card-title">${title}</p>
                <p class="card-text">${message}</p>
                <p class="btn btn-info" onclick="modifyPost(${id})">수정</p>
                <p class="btn btn-warning" onclick="deletePost(${id})">삭제</p>
            </div>
        </div>
    `;

  document.getElementById("card-list").appendChild(card);
}

function uploadPost() {
  //fetch(글쓰기)
  //.then(성공확인)
  //.then(불러오기(=카드만들기))

  const title = document.getElementById("input-title").value;
  const message = document.getElementById("input-text").value;

  fetch("/api/create", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title, message }),
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.result == "success") {
        alert("저장 완료");
        //페이지를 열 때 일어나는 모든 과정이 다시 실행됩니다.
        //서버에 HTTP 요청
        //HTML 다시 받음
        // //CSS 다시 적용
        //JS 다시 실행
        //DOM 재생성
        //기존 JS 메모리 상태 전부 소멸
        location.reload();
      } else {
        alert("저장 실패");
      }
    });
}

function deletePost(id) {
  fetch(`/api/delete/${id}`, {
    method: "DELETE",
  })
    .then((res) => res.json())
    .then((data) => {
      if (data.result == "success") {
        alert("삭제 완료");
        location.reload();
      } else {
        alert("삭제 실패");
      }
    });
}

function modifyPost() {
  // DOM 으로 수정할 위치 가져오기
  // 기존에 글 있던 곳을, 글을 입력하는곳의 DOM 으로 바꾸기
  // 저장을 누르면??
  //  fetch(글수정).then(성공확인).then(불러오기(=카드만들기))
}
