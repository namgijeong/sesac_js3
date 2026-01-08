import { useState } from 'react';

import TodoForm from './components/TodoForm.jsx';
import TodoList from './components/TodoList.jsx';

function TodoApp() {
  const [todos, setTodos] = useState([
    { id: 1, text: 'React  공부하기', done: false },
    { id: 2, text: 'vite  공부하기', done: false },
  ]);

  //controlled 상태
  const [text, setText] = useState('');

  function addTodo(e) {
    e.preventDefault();

    const trimmed = text.trim();
    if (!trimmed) return;

    const newTodo = {
      id: Date.now(), //가장 간단하게 id를 만들기
      text: trimmed,
      done: false,
    };

    //새로운 것을 앞에 추가
    //렌더링이 끝난 이후에 이 콜백함수가 실행되도록
    setTodos((prev) => [newTodo, ...prev]);

    setText('');

    //이렇게 하는건 비추천
    //setTodos([newTodo, ...todos]);

    // 1. setTodos([newTodo, 'A', 'B'])      // 예약
    // 2. setTodos([anotherTodo, 'A', 'B']) // 예약
    // 3. batching 종료
    //Batching = 여러 개의 state 업데이트를 한 번의 렌더링으로 묶는 것
    //큐에 쌓인 업데이트들을 계산
    // 최종 state 결정
    // 렌더링 1번 실행
    // 4. 마지막 예약값으로 state 갱신
    // 첫 번째 업데이트는 덮어써져서 사라짐

    // setTodos([newTodo, 'A', 'B'])  // 예약 1
    // setTodos([newTodo, 'A', 'B'])  // 예약 2
    // ...
    // setTodos([newTodo, 'A', 'B'])  // 예약 10
    // batching 종료
    // → 마지막 예약값만 사용, newTodo가 10번 들어가지 않음
    // [newTodo, 'A', 'B']
  }

  function toggleTodo(id) {
    setTodos((prev) => {
      return prev.map((t) => {
        if (t.id !== id) return t;
        return { ...t, done: !t.done }; //다른 컬럼은 두고 done 컬럼만 덮어쓰기
      });
    });

    //하면 안되는 예시
    //직접 다이렉트로 변경해도 안되고,
    //배열 원소 멤버의 값만 바꾸면 안됨
    //메모리 주소값이 달라졌는지를 비교하기 때문에
    // const todo = todos.find(t => t.id === id);
    // todo.done = !todo.done;
  }

  function deleteTodo(id) {
    setTodos((prev) => {
      return prev.filter((t) => t.id !== id);
    });

    //하면 안되는 예시
    // const index = todos.findIndex(t => t.id === id);
    // todos.splice(index,1); // 원본 데이터를 건드림..
    // setTodos(todos);
  }

  return (
    <>
      <div style={{padding:16, maxWidth:500}}>
        <h2>할일 목록</h2>
        <TodoForm text={text} setText={setText} onAdd={addTodo} />
        <TodoList todos={todos} onToggle={toggleTodo} onDelete={deleteTodo} />
      </div>
    </>
  );
}

export default TodoApp;
