const express = require("express");
const morgan = require("morgan");

const app = express();
const PORT = 3000;

let todos = [
  {
    id: 1,
    todo: "숙제하기",
    completed: true,
  },
  {
    id: 2,
    todo: "운동하기",
    completed: false,
  },
];
let idCounter = 3;

app.use(express.static("public"));
app.use(express.json()); //FE 에서 보낸 데이터를 JSON으로 보냈다면 그걸 파싱해서 req.body에
//app.use(express.urlencoded({extended:false}));// FE에서 보낸 데이터가 urlencoded, form data로 보냈다면 그걸 파싱해서 req.body에 담는다
app.use(morgan("dev"));

app.get("/api/todo", (req, res) => {
  console.log("todo 달라고 요청함");
  res.json(todos);
});

app.post("/api/todo", (req, res) => {
  console.log("todo 생성해달라고 요청함");
  console.log(`요청의 바디 ${JSON.stringify(req.body)}`);

  const newTodo = { id: idCounter++, todo: req.body.todo, completed: false };
  //console.log(newTodo);
  todos.push(newTodo);
  console.log(todos);

  res.json({ status: "ok" });
});

app.put("/api/todo/:id/completed", (req, res) => {
  console.log("todo 수정해달라고 요청함");
  //id를 찾아서 completed를 toggle
  const todoId = Number(req.params.id);

  const findTodoIndex = todos.findIndex((todo) => todo.id === todoId);

  if (findTodoIndex == -1) {
    res.json({ status: "error" });
    return;
  }

  todos[findTodoIndex] = {
    id: todos[findTodoIndex].id,
    todo: todos[findTodoIndex].todo,
    completed: !todos[findTodoIndex].completed,
  };
  //console.log(todos[findTodoIndex]);
  console.log(todos);

  res.json({ status: "ok" });
});

//전체완료
app.put("/app/todos/completed", (req, res) => {
  todos = todos.map((todo) => {
    todo.completed = true;
  });
  console.log(todos);

  res.json({ status: "ok" });
});

//선택완료 해당 todos들을 완료로
app.put(`/app/todos/some/completed`, (req, res) => {
  //id가 담긴 배열
  const todosId = req.body.todosId;
  console.log(todosId);
  //id에 맞는 실제 인덱스를 찾아 해당 배열 데이터를 수정
  todosId.forEach((todoId) => {
    let findTodoIndex = todos.findIndex((todo) => todo.id === Number(todoId));

    if (findTodoIndex == -1) {
      res.json({ status: "error" });
      return;
    }

    todos[findTodoIndex].completed = true;
  });

  res.json({ status: "ok" });
});

app.delete("/api/todo/:id", (req, res) => {
  console.log("todo 삭제해달라고 요청함");
  const deleteId = Number(req.params.id);

  //todos.filter를 통해서 비교해본다
  todos = todos.filter(todo => todo.id !== deleteId);

  res.json({ status: "ok" });
});

//전체삭제
app.delete("/api/todos",(req, res) => {
  todos = [];
  idCounter = 1;

  res.json({ status: "ok" });
});

//선택삭제
app.delete("/api/todos/some", (req, res) => {
  //id가 담긴 배열
  const todosId = req.body.todosId;
  console.log(todosId);
  
  //id에 맞는 실제 인덱스를 찾아 해당 배열 데이터를 삭제
  todosId.forEach((todoId) => {
    let findTodoIndex = todos.findIndex((todo) => todo.id === Number(todoId));

    if (findTodoIndex == -1) {
      res.json({ status: "error" });
      return;
    }

    todos.splice(findTodoIndex, 1);
  });
  console.log(todos);
  
  res.json({ status: "ok" });
});

app.listen(PORT, () => {
  console.log("Server is ready at http://localhost:3000");
});
