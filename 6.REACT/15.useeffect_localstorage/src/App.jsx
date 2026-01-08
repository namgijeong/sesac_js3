import { useState, useEffect } from 'react';
import './App.css';
//로칼 스토리지에 저장할 변수
const KEY = 'theme_dark';

function App() {
  //이건 신버전
  const [darkMode, setDarkMode] = useState(()=>{
    const saved = localStorage.getItem(KEY);
    return saved === 'true'
  });

  //구버전
  //조건 없이 최초 한번만 호출됨
  // useEffect(()=>{
  //   const saved = localStorage.getItem(KEY);
  //   if (saved === 'true') setDarkMode(true);
  // },[]);

  useEffect(()=>{
    localStorage.setItem(KEY, String(darkMode));
    //나의 돔 전체 요소들에서 이런 속성값을 가진게 있으면은 
    //:root[data-theme='dark'] css
    document.documentElement.dataset.theme = darkMode ? 'dark':'light';
  },[darkMode]);

  return (
    <div className="page">
      <div className="card">
        <h2>테마 설정</h2>
        <label className="row">
          <input type="checkbox" checked={darkMode} onChange={(e) => setDarkMode(e.target.checked)} />
          다크모드
        </label>

        <p className="muted">현재 상태:{darkMode ? 'ON' : 'OFF'}</p>

        <button className="btn" onClick={() => alert('동작 확인')}>
          버튼 예시
        </button>
      </div>
    </div>
  );
}

export default App;
