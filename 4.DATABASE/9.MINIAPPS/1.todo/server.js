const express = require('express');
const morgan = require('morgan');
const Database = require("better-sqlite3");

const app = express();
const PORT = 3000;
const db_file = "todo-db.db";
const db = new Database(db_file);

app.use(express.static('public'));
app.use(express.json()); // FE 에서 보내온 데이터를 json 으로 보냈다면... 그걸 파싱해서 req.body 에 담아줌
// app.use(express.urlencoded({extended: false})); // FE 에서 보낸 데이터가 urlencoded 로 보냈다면... 그걸 파싱해서 req.body에 담아줌...
app.use(morgan('dev'));

function init_db(){
  db.exec(`
    
  `)
}
;

// 라우트 설계 --->
app.get('/api/todos', (req, res) => {
    console.log('todo 달라고 요청함');
    const todos = db.prepare(`SELECT * from todo`).all();
    res.json(todos);
});

app.post('/api/todo', (req, res) => {
    console.log('todo 생성해달라고 요청함');
    console.log(`요청의바디: ${JSON.stringify(req.body)}`);
    const newTodo = {todo: req.body.todo};
    console.log(newTodo);

    //db create할때 default 0을 안했으면 여기다 넣어주는것이 편함 
    const query = db.prepare(`INSERT INTO todo(todo,completed) VALUES(?,0)`);
    query.run(newTodo.todo);

    res.json({ success: true }); 
});

app.delete('/api/todo/:id', (req, res) => {  // 입력 인자를 ? 쿼리파라미터로 받을지 URL파라미터를 받을지 (잘 모르면 지금 케이스에서는 후자로 :id 로 처리)
    console.log('todo 삭제해달라고 요청함');
    // id를 받아서, 그 id를 가진 항목을 삭제한다.
    const id = req.params.id;
    console.log(`${id}번 todo 삭제해달라고 요청함`);

    const query = db.prepare(`DELETE FROM todo WHERE id=?`);
    const result = query.run(id);
    
    res.json({ success: true }); 
});

app.put('/api/todo/:id/completed', (req, res) => { // 입력 인자... 위처럼 URL 파라미터로 받으면 :id
  const id = req.params.id;  // 받아오는 모든건 문자열 => Number or parseInt 사용
  console.log(`${id}의 완성을 체크함`);
  
  // id를 찾아서, completed 를 toggle (complated 에 true/false를 변경)
  const query = db.prepare(`SELECT * FROM todo WHERE id=?`);
  let todo = query.get(id);

  if (todo){
    console.log(`검색된 내용 확인: ${todo}`);
    
    todo.completed = !todo.completed;
    //console.log(todo.completed);
    const completedNumber = todo.completed ?  1 : 0;
      
    const query2 = db.prepare(`UPDATE todo SET completed=? WHERE id=?`);
    query2.run(completedNumber,id);
    res.json({success:true});
  } else {
     res.status(404).json({success:false});
  }
    
});

// 라우트 끝 <---

app.listen(PORT, () => {
    console.log('Server is ready at http://localhost:3000');
});

//curl -X  GET 127.0.0.1:3000/api/todos
//curl -X POST http://127.0.0.1:3000/api/todo -H "Content-Type: application/json" -d "{\"todo\":\"hello22\"}"
// curl -X POST localhost:3000/api/todo -H "Content-Type: application/json" -d "{\"todo\": \"밥먹기\"}"
// curl -X DELETE localhost:3000/api/todo/1

// curl -X PUT localhost:3000/api/todo/2/completed