import { useState, useEffect } from 'react';

function App() {
  const [keyword, setKeyword] = useState('');
  const [users, setUsers] = useState([]);

  // useEffect(()=>{
  //   //useEffect가 다시 실행될때 정리하는 역할
  //   //clean up code
  //   return () => {
  //     //이 등록된 함수를 종료할때 cleanup 하는 코드
  //   }
  // },[]);


  useEffect(() => {
    if (!keyword){
      setUsers([]);
      return;
    }

    const timer = setTimeout(() => {
      console.log('검색실행:',keyword);

      //api 호출
      fetch('https://jsonplaceholder.typicode.com/users')
      .then((res)=>res.json())
      .then((data)=>{
        const filtered = data.filter((u)=>u.name.toLowerCase().includes(keyword.toLowerCase()));
        setUsers(filtered);
      })
    }, 1000);

    //이전에 timeout 설정한걸 그 다음 호출될때 useeffect가 이전의 useeffect를 clean up 하는 함수
    return () => clearTimeout(timer);

  },[keyword]);

  return (
    <div>
      <input value={keyword} onChange={(e) => setKeyword(e.target.value)} placeholder="검색어 입력" />

      <ul>
        {users.map((u) => (
          <li key={u.id}>{u.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;
