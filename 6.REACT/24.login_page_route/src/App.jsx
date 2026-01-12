import { NavLink, Route, Routes, useNavigate } from 'react-router-dom';

import HomePage from './pages/HomePage.jsx';
import LoginPage from './pages/LoginPage.jsx';
import ProfilePage from './pages/ProfilePage.jsx';

//인증 정보 기반에 내 자식 컴포넌트 보호하기
import ProtectedRoute from './auth/ProtectedRoute.jsx';

//인증 모듈에서 로그인/로그아웃 등등 가져오기
import {useAuth} from './auth/AuthProvider.jsx';

const navStyle = {
    display: 'flex',
    alignItems: 'center',
    gap: 12,
    padding: 12,
    borderBottom: '1px solid #eee',
};

const linkStyle = ({ isActive }) => ({
  padding: '8px 10px',
  borderRadius: 10,
  textDecoration: 'none',
  color: 'inherit',
  background: isActive ? 'rgba(0,0,0,0.08)' : 'transparent',
});

function App() {
  const {isAuthed, user, logout} = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  }

  return (
    <>
      <div style={{ maxWidth: 800, margin: '0 auto', padding: 16 }}>
        <header style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>

          <nav style={navStyle}>
            <NavLink to="/" style={linkStyle}>
            Home
            </NavLink>

            <NavLink to="/profile" style={linkStyle}>
              Profile
            </NavLink>


            {/* 조건에 따라서 네브바 링크 변경 */}
          <div style={{marginLeft: 'auto', display: 'flex', gap: 8, alignItems: 'center' }}>
            {!isAuthed ? (
              <NavLink to="/login" style={linkStyle}>
                Login
              </NavLink>
            ) : (
              <>
                <span style={{ opacity: 0.7, fontSize: 14 }}>
                  {user?.id ? `안녕하세요, ${user.id}` : '로그인됨' }
                </span>

                <button 
                  type="button" 
                  onClick={handleLogout}
                  style={{
                      padding: '6px 10px',
                      borderRadius: 8,
                      border: '1px solid #ddd',
                      background: 'white',
                      cursor: 'pointer',
                  }}
                >
                  Logout
                </button>
              </>
            )}
          </div>

          </nav>
        </header>

        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/login" element={<LoginPage />} />
            {/* profile 페이지는 인증된 사용자만 접근 가능하게 제한 */}
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <ProfilePage />
                </ProtectedRoute>
              }
            />
          </Routes>
        </main>
      </div>
    </>
  );
}

export default App;
