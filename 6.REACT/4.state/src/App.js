import {useState} from "react";
import Message from './Message';

function App() {
  const [count, setCount] = useState(100);

  //function으로 해도 되고, 변수에 함수를 할당해도 됨

  const countInc = () => {
    setCount(count+1);
  }

  const countDec = () => {
    setCount(count-1);
  }

  const countReset = () => {
    setCount(0);
  }

  return ( //무조건 하나의 태그만 반납해야해서 <div> or <> 묶기
    <>
      <h1>카운트</h1>
      <p>{count}</p>
      <button onClick={countInc}>+1 증가</button>
      <button onClick={countDec}>-1 감소</button>
      <button onClick={countReset}>초기화</button>

      {/* 컴포넌트에 props로 나의 상태를 전달 */}
      <Message count={count}/>
    </>
  );
}

export default App;
