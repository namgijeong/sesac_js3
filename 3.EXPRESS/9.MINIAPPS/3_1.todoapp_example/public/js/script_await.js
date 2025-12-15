document.addEventListener("DOMContentLoaded", () => {
  console.log("DOM 로딩 완료");

  //최초 시작하자마자 백엔드에 가지고 있는 목록 요청
  async function getTodo() {
    const res = await fetch(`/api/todos`);
    const data = await res.json();

    console.log(data);
    renderTodos(data);
  }

  getTodo();

  //생성하면서 하나하나 이벤트를 거는것보다 나중에 요소들 한꺼번에 이벤트를 건후
  //e.target으로 해당 대상을 찾는게 더 좋다

  function renderTodos(todos) {
    const result = document.getElementById("todo-list");
    result.innerHTML = "";

    todos.forEach((todo) => {
      const li = document.createElement("li");
      li.textContent = todo.todo;

      li.classList.toggle("completed", todo.completed);

      result.appendChild(li);

      //완료 토글
      li.addEventListener("click", async () => {
        const res = await fetch(`/api/todo/${todo.id}/completed`, {
          method: "PUT",
        });
        const data = await res.json();
        if (data.success == true) {
          getTodo();
        } else {
          alert("해당 항목은 찾을수 없습니다.");
        }
      });

      //삭제버튼
      const deleteBtn = document.createElement("button");
      deleteBtn.textContent = "삭제";
      deleteBtn.addEventListener("click", async (e) => {
        //위에 토글까지 이 이벤트가 전파되는것을 방지
        e.stopPropagation();
        const res = await fetch(`/api/todo/${todo.id}`, { method: "DELETE" });
        
        getTodo();
      });

      li.appendChild(deleteBtn);
    });
  }

  //todo 추가
  const addBtn = document.getElementById("add-todo");
  addBtn.addEventListener("click", async () => {
    const inputText = document.getElementById("new-todo").value;
    const text = inputText.trim();
    if (!text) return;

    const res = await fetch(`/api/todo`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ todo: text }), //serialization
    });
    const data = await res.json();

    getTodo();
  });
});
