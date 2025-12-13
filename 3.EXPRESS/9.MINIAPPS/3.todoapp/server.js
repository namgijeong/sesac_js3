const express = require("express");
const morgan = require("morgan");

const app = express();
const PORT = 3000;

let todos = [
  {
    id: 1,
    todo: "숙제하기",
    completed: false,
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

  console.log(newTodo);
  todos.push(newTodo);

  res.json({ status: "ok" });
});

app.delete("/api/todo/:id", (req, res) => {
  console.log("todo 삭제해달라고 요청함");
  //todos.filter를 통해서 비교해본다
});

app.put("/api/todo/:id/completed", (req, res) => {
  console.log("todo 수정해달라고 요청함");
  //id를 찾아서 completed를 toggle
});

app.listen(PORT, () => {
  console.log("Server is ready at http://localhost:3000");
});
