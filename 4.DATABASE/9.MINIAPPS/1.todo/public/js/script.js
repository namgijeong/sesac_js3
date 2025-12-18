document.addEventListener("DOMContentLoaded", () => {
  console.log("DOM 로딩 완료");

  //최초 시작하자마자 백엔드에 가지고 있는 목록 요청
  function getTodo() {
    fetch(`/api/todos`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        renderTodos(data);
      });
  }

  getTodo();

  function renderTodos(todos) {
    const result = document.getElementById("todo-list");
    result.innerHTML = "";

    todos.forEach((todo) => {
      const li = document.createElement("li");
      li.textContent = todo.todo;

      li.classList.toggle("completed", todo.completed);

      result.appendChild(li);

      //완료 토글
      li.addEventListener("click", () => {
        fetch(`/api/todo/${todo.id}/completed`, {
          method: "PUT",
        }).then(() => getTodo());
      });

      //삭제버튼
      const deleteBtn = document.createElement("button");
      deleteBtn.textContent = "삭제";
      deleteBtn.addEventListener("click", (e) => {
        //위에 토글까지 이 이벤트가 전파되는것을 방지
        e.stopPropagation();
        fetch(`/api/todo/${todo.id}`, { method: "DELETE" }).then(getTodo());
      });

      li.appendChild(deleteBtn);
    });
  }

  //todo 추가
  const addBtn = document.getElementById("add-todo");
  addBtn.addEventListener("click", () => {
    const inputText = document.getElementById("new-todo").value;
    const text = inputText.trim();
    if (!text) return;

    fetch(`/api/todo`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ todo: text }), //serialization
    })
      .then((res) => res.json())
      .then((data) => {
        getTodo();
      });
  });
});
