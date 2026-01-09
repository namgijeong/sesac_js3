import { useState, useEffect, useMemo } from 'react';

import { fetchPosts } from '../api/PostsApi';

const BUTTON_BLOCK_SIZE = 10;
const SHOW_POSTS_COUNT = 10;

const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [paginationPosts, setPaginationPosts] = useState([]);
  const [page, setPage] = useState(1);
  const [prevButton, setPrevButton] = useState(false);
  const [nextButton, setNextButton] = useState(false);

  useEffect(() => {
    fetchPosts()
      .then((data) => {
        setPosts(data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  //   useEffect(() => {
  //     setPaginationPostsArray();
  //   }, [posts]);

  //   function setPaginationPostsArray(){
  //     const startIndex = (pageNum - 1) * SHOW_POSTS_COUNT;
  //     const endIndex = startIndex + SHOW_POSTS_COUNT;
  //     setPaginationPosts(posts.slice(startIndex, endIndex));
  //     // console.log('여기 들어옴');
  //     // console.log(posts.slice(startIndex, endIndex));
  //     // console.log(startIndex);
  //     // console.log(endIndex);
  //   }

  //   function setButtonBlockArray(){
  //     const totalPages = Math.max(1, Math.ceil(posts.length / SHOW_POSTS_COUNT));
  //     const currentButtonBlockNumber = Math.ceil(pageNum / BUTTON_BLOCK_SIZE);
  //     let endButtonBlockIndex = currentButtonBlockNumber * BUTTON_BLOCK_SIZE;
  //     let startButtonBlockIndex = endButtonBlockIndex - BUTTON_BLOCK_SIZE + 1;
  //     let prevButton = false;
  //     let nextButton = false;

  //     if (startButtonBlockIndex <=1 ){
  //         startButtonBlockIndex = 1;
  //     } else {
  //         prevButton = true;
  //     }

  //     if (endButtonBlockIndex >= totalPages){
  //         endButtonBlockIndex = totalPages;
  //     } else {
  //         nextButton = true;
  //     }

  //   }

//   const startIndex = (page - 1) * SHOW_POSTS_COUNT;
//   const endIndex = startIndex + SHOW_POSTS_COUNT;
//   const totalPages = Math.max(1, Math.ceil(posts.length / SHOW_POSTS_COUNT));
//   const visible = posts.slice(startIndex, endIndex);

const totalPages = useMemo(() => {
    return Math.max(1, Math.ceil(posts.length / SHOW_POSTS_COUNT));
},[posts.length]);

const visible = useMemo(() => {
    const startIndex = (page - 1) * SHOW_POSTS_COUNT;
    const endIndex = startIndex + SHOW_POSTS_COUNT;
    return posts.slice(startIndex, endIndex);
}, [posts, page]);



  return (
    <>
      <div>
        <p style={{color:'#555'}}>
          전체 {posts.length} 개 (페이지 {page}/ {totalPages})
        </p>
        <ul>
          {visible.map((p) => (
            <div key={p.id} style={{ marginBottom: 50 }}>
              <div>작성자: {p.userId}</div>
              <div>게시글 번호: {p.id}</div>
              <div>제목: {p.title}</div>
              <div>내용: {p.body}</div>
            </div>
          ))}
        </ul>

        <div style={{display:'flex', gap:8, alignItems:'center', marginTop:12}}>
            <button disabled= {page === 1} onClick={() => setPage((prev) => prev -1)}>prev</button>
            {/* { length: 5 }처럼 길이를 지정한 객체를 넣으면 해당 길이만큼의 빈 슬롯을 가진 배열이 생성 */}
            {/* 첫 번째 인자 (_): 현재 처리 중인 '요소의 값'입니다. 현재 생성된 배열은 비어있으므로 보통 undefined */}
            {Array.from({length:totalPages}, (_, i) => {
                const n = i + 1;
                const isActive = n === page;

                return(
                    <button key={n} onClick={() => setPage(n)} style={{fontWeight : isActive ? '700' : '400'}}>
                        {n}
                    </button>
                )
            })}
            <button  disabled= {page === totalPages} onClick={() => setPage((prev) => prev + 1)}>next</button>
        </div>
      </div>
    </>
  );
};

export default Posts;
