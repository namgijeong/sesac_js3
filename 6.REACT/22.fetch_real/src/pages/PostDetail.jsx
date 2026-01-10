import { useParams, useNavigate, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';

import { fetchPostById } from '../api/PostsApi';

const PostDetail = () => {
  const { postId } = useParams();
  const navigate = useNavigate();

  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState('');

  //useEffect(async () => {}) 를 쓰면 되지 않음
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchPostById(postId);
        setPost(data);
        setLoading(false);
      } catch (err) {
        setErrorMsg(err.message);
        setLoading(false);
      }
    };
    fetchData();
  }, [postId]);

  useEffect(() => {
    console.log(post);
  }, [post]);

  const goback = () => {
    navigate(-1);
  };

  const goPostList = () => {
    navigate('/posts');
  };

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
    <>
      <div style={{ display: 'flex', gap: '10px', justifyContent: 'flex-end' }}>
        <button onClick={() => goback()}>뒤로</button>
        <button onClick={() => goPostList()}>목록</button>
      </div>
      <h1>Post #{postId}</h1>
      <h3>{post?.title}</h3>
      <h5>userId: {post.userId}</h5>
      <hr />
      <p>{post.body}</p>
      <hr />
    </>
  );
};

export default PostDetail;
