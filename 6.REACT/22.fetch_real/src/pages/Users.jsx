import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { deleteUserById, fetchUsers } from '../api/UsersApi';

export default function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState('');
  const [deletingId, setDeletingId] = useState(null);

  useEffect(() => {
    //AbortController는 브라우저 기본 함수 (Web API)
    //반복적인 요청으로 요청을 중단해야할때
    //const controller = new AbortController();
    //fetchUsers({ signal: controller.signal })
    fetchUsers()
      .then((data) => {
        setUsers(data);
        setLoading(false);
      })
      .catch((err) => {
        setErrorMsg(err.message);
        setLoading(false);
      });

    //cleanup 함수를 등록
    //return () => controller.abort();
  }, []); //최초 한번만 실행

  async function deleteUser(id) {
    if (deletingId !== null) return;
    setDeletingId(id);
    try {
      await deleteUserById(id);
      //성공메시지
      setUsers((prev) => prev.filter((u) => u.id !== id));
    } catch (err) {
      alert(err.message);
    } finally {
      setDeletingId(null);
    }
  }

  /* 아래는 dom 렌더링 코드만 추가할것 */
  if (loading) return <p>로딩 중...</p>;
  if (errorMsg) {
    return (
      <div>
        <h1>Users</h1>
        <p style={{ color: 'crimson' }}>에러: {errorMsg}</p>
        <p>다시 시도...</p>
        <button onClick={() => window.location.reload()}>새로고침</button>
      </div>
    );
  }
  return (
    <div>
      <h1>Users</h1>
      <ul>
        {users.map((u) => {
          const isDeleting = deletingId == u.id;
          return (
            <li key={u.id}>
              <Link to={`/users/${u.id}`}>{u.name}</Link>
              <button style={{ marginLeft: 8 }} onClick={() => deleteUser(u.id)} disabled={deletingId != null}>
                {isDeleting ? '삭제 중...' : '삭제'}
              </button>
            </li>
          );
        })}
      </ul>

      {users.length === 0 && <p style={{ textColor: 'gray' }}>표시할 사용자가 없습니다.</p>}
    </div>
  );
}
