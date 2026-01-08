import { useState, useEffect } from 'react';
import UserCard from './components/UserCard';
import SearchBox from './components/SearchBox';

function App() {
  //const [count, setCount] = useState(0);

  // const countIncrement = () => {
  //   console.log('변경전:', count);
  //   setCount(count+1);
  //   console.log('변경후:', count);
  // }

  // useEffect(() => {
  //   //변경이 감지되었을때 할 일을 정의
  //   console.log('진짜 변경이 이루어지는 시점:',count);
  // },[count]);

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchKeyword, setSearchKeyword] = useState('');

  useEffect(() => {
    fetch('https://jsonplaceholder.typicode.com/users')
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setUsers(data);
        setLoading(false);
      });
  }, []);

  

  function removeUser(id) {
    setUsers((prev) => prev.filter((u) => u.id !== id));
  }

  function search(name){
    setSearchKeyword(name);
  }

  //컴포넌트 함수 본문에 있는 모든 코드는 “렌더링 시점마다 실행된다”
  const filteredUsers = users.filter(u=> u.name.toLowerCase().includes(searchKeyword.toLowerCase()));
  

  useEffect(()=>{
    console.log(users);
  },[users]);


  if (loading) return <p>로딩중...</p>;

  return (
    <>
      {/* <div className="card">
        <button onClick={countIncrement}>count is {count}</button>
      </div> */}

      <h1>useEffect를 통한 외부 API 요청</h1>
      <h2 className="m-4">사용자 목록</h2>
     
      <div className="container pb-4" >
         <SearchBox searchKeyword={searchKeyword} search={search}/>
        <div className="row" >
          {filteredUsers.map((u) => (
            <div className="col-md-6 col-lg-4" key={u.id}>
              <UserCard user={u} onRemove={removeUser} />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default App;
