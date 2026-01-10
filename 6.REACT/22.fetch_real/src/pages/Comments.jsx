import { useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';

import { fetchComments } from '../api/PostsApi';

const Comments = ({ postId }) => {
  const navigate = useNavigate();

  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState('');

  useEffect(() => {
    const fectchData = async () => {
      try {
        const data = await fetchComments(postId);
        setComments(data);
        setLoading(false);
      } catch (err) {
        setErrorMsg(err.message);
        setLoading(false);
      }
    };

    fectchData();
  }, []);

  const totalLength = comments.length;

   /* 아래는 dom 렌더링 코드만 추가할것 */
  if (loading) return <p>로딩 중...</p>;
  if (errorMsg) {
    return (
      <div>
        <h1>Comments</h1>
        <p style={{ color: 'crimson' }}>에러: {errorMsg}</p>
        <p>다시 시도...</p>
        <button onClick={() => window.location.reload()}>새로고침</button>
      </div>
    );
  }
  return (
  <>
  <h1>Comments ({totalLength})</h1>
  <ul>
    {comments.map((c) => (<li key={c.id}>
        <h3>{c.name}</h3>
        <h5>{c.email}</h5>
        <p>{c.body}</p>
    </li>))}
  </ul>
  </>
  );
};

export default Comments;
