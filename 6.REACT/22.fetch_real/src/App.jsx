import { Routes, Route } from 'react-router-dom';
import RootLayout from './layouts/RootLayout.jsx';

import Home from './pages/Home.jsx';
import Users from './pages/Users.jsx';
import UserDetail from './pages/UserDetail.jsx';
import Posts from './pages/Posts.jsx';
import PostDetail from './pages/PostDetail.jsx';
import About from './pages/About.jsx';
import NotFound from './pages/NotFound.jsx';

function App() {
  return (
    <Routes>
      {/* 상단의 네브바 */}
      <Route path="/" element={<RootLayout />}>
        {/* 물리적 페이지 */}
        {/* 기본적인 경로 / 일경우 index 페이지 */}
        <Route index element={<Home />} />

        {/* 정적 페이지 */}

        {/* siblings */}
        <Route path="users" element={<Users />} />
        <Route path="users/:userId" element={<UserDetail />} />

        {/* parent/child 관계 */}
        {/* <Route path="users">
          <Route index element={<Users />} />
           <Route path=":userId" element={<UserDetail />} />
        </Route> */}

        <Route path="posts" element={<Posts/>}/>
        <Route path="posts/:postId" element={<PostDetail/>}/>

        <Route path="about" element={<About />} />

        {/* 404 페이지 */}
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;
