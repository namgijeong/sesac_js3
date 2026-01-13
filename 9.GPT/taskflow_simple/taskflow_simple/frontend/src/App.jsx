import { useEffect, useState } from 'react';
import { api, setToken, getToken } from './api.js';
import { Board } from './components/Board';
import { Gantt } from './components/Gantt';
import './styles.css';

function Auth({ onAuthed }) {
  const [mode, setMode] = useState('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [loading, setLoading] = useState(false);
  const [msg, setMsg] = useState('');

  const submit = async (e) => {
    e.preventDefault();
    setMsg('');
    setLoading(true);
    try {
      if (mode === 'signup') {
        await api.signup({ email, password, name });
        setMsg('✅ 가입 완료! 로그인하세요.');
        setMode('login');
      } else {
        const data = await api.login({ email, password });
        setToken(data.accessToken);
        onAuthed();
      }
    } catch (e) {
      setMsg(e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-pastel-bg p-4">
      <div className="card w-full max-w-md p-8">
        <h1 className="text-3xl font-bold text-center mb-2 bg-clip-text text-transparent bg-gradient-to-r from-pastel-primary to-pastel-accent">TaskFlow</h1>
        <p className="text-center text-pastel-muted mb-8">
          {mode === 'login' ? 'Welcome back!' : 'Create your account'}
        </p>

        <form onSubmit={submit} className="space-y-4">
          {mode === 'signup' && (
            <input className="input" placeholder="이름" value={name} onChange={e => setName(e.target.value)} required />
          )}
          <input className="input" type="email" placeholder="이메일" value={email} onChange={e => setEmail(e.target.value)} required />
          <input className="input" type="password" placeholder="비밀번호" value={password} onChange={e => setPassword(e.target.value)} required />

          <button className="btn primary w-full" disabled={loading}>
            {loading ? '처리중...' : (mode === 'login' ? '로그인' : '가입하기')}
          </button>
        </form>

        {msg && <div className="mt-4 p-3 bg-red-50 text-red-600 rounded-lg text-sm text-center">{msg}</div>}

        <div className="mt-6 text-center text-sm">
          <button className="text-gray-500 hover:text-pastel-primary underline" onClick={() => setMode(mode === 'login' ? 'signup' : 'login')}>
            {mode === 'login' ? '계정이 없으신가요? 회원가입' : '이미 계정이 있으신가요? 로그인'}
          </button>
        </div>
      </div>
    </div>
  );
}

function App() {
  const [authed, setAuthed] = useState(!!getToken());
  const [ready, setReady] = useState(false);
  const [user, setUser] = useState(null);
  const [workspaces, setWorkspaces] = useState([]);
  const [selectedWs, setSelectedWs] = useState('');
  const [projects, setProjects] = useState([]);
  const [selectedProjectId, setSelectedProjectId] = useState(null);
  const [view, setView] = useState('board'); // 'board' | 'gantt'

  const [newProjectName, setNewProjectName] = useState('');

  const bootstrap = async () => {
    try {
      const me = await api.me();
      setUser(me);
      const ws = await api.workspaces();
      setWorkspaces(ws.items);
      if (ws.items.length > 0) setSelectedWs(ws.items[0].id);
    } catch {
      logout();
    } finally {
      setReady(true);
    }
  };

  useEffect(() => {
    if (authed) bootstrap();
    else setReady(true);
  }, [authed]);

  useEffect(() => {
    if (!selectedWs) return;
    api.projects(selectedWs).then(d => {
      setProjects(d.items);
      // Auto-select first project if available and none selected? No, let user choose.
    });
  }, [selectedWs]);

  const logout = () => {
    setToken('');
    setAuthed(false);
    setUser(null);
  };

  const createProject = async () => {
    if (!newProjectName.trim()) return;
    await api.createProject(selectedWs, { name: newProjectName });
    setNewProjectName('');
    const p = await api.projects(selectedWs);
    setProjects(p.items);
  };

  if (!authed) return <Auth onAuthed={() => setAuthed(true)} />;
  if (!ready) return <div className="flex items-center justify-center min-h-screen bg-pastel-bg text-pastel-muted">TaskFlow 로딩중...</div>;

  if (selectedProjectId) {
    return (
      <div className="min-h-screen bg-pastel-bg flex flex-col">
        <header className="bg-white border-b border-gray-100 px-6 py-3 flex justify-between items-center shadow-sm">
          <div className="flex items-center gap-4">
            <button onClick={() => setSelectedProjectId(null)} className="text-gray-500 hover:text-gray-800">← 프로젝트</button>
            <div className="h-4 w-px bg-gray-200"></div>
            <div className="flex bg-gray-100 p-1 rounded-lg">
              <button
                className={`px-3 py-1 rounded-md text-sm font-medium transition-all ${view === 'board' ? 'bg-white shadow text-gray-800' : 'text-gray-500 hover:text-gray-700'}`}
                onClick={() => setView('board')}
              >
                보드
              </button>
              <button
                className={`px-3 py-1 rounded-md text-sm font-medium transition-all ${view === 'gantt' ? 'bg-white shadow text-gray-800' : 'text-gray-500 hover:text-gray-700'}`}
                onClick={() => setView('gantt')}
              >
                일정표
              </button>
            </div>
          </div>
          <div className="flex items-center gap-4 text-sm">
            <span className="text-pastel-muted">{user?.name}</span>
          </div>
        </header>
        <main className="flex-1 overflow-hidden p-6">
          {view === 'board' ? (
            <Board projectId={selectedProjectId} onBack={() => setSelectedProjectId(null)} />
          ) : (
            <Gantt projectId={selectedProjectId} onBack={() => setSelectedProjectId(null)} />
          )}
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-pastel-bg p-6">
      <div className="max-w-4xl mx-auto">
        <header className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">TaskFlow</h1>
            <p className="text-pastel-muted">안녕하세요, {user?.name}님</p>
          </div>
          <button className="btn ghost text-red-400 hover:text-red-500 hover:bg-red-50" onClick={logout}>로그아웃</button>
        </header>

        <section className="mb-8">
          <h2 className="text-lg font-bold mb-4 text-gray-700">워크스페이스</h2>
          <select className="input mb-4" value={selectedWs} onChange={e => setSelectedWs(e.target.value)}>
            {workspaces.map(w => <option key={w.id} value={w.id}>{w.name}</option>)}
          </select>
        </section>

        <section>
          <div className="flex justify-between items-end mb-4">
            <h2 className="text-lg font-bold text-gray-700">프로젝트</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
            {projects.map(p => (
              <div key={p.id} className="card hover:border-pastel-primary/50 cursor-pointer group" onClick={() => setSelectedProjectId(p.id)}>
                <h3 className="font-bold text-lg mb-1 group-hover:text-pastel-primary transition-colors">{p.name}</h3>
                <p className="text-sm text-gray-500 line-clamp-2 min-h-[1.25rem]">{p.description || '설명 없음'}</p>
              </div>
            ))}
          </div>

          <div className="card bg-gray-50 border-dashed border-2 border-gray-200">
            <h3 className="text-sm font-bold text-gray-500 mb-2">새 프로젝트 만들기</h3>
            <div className="flex gap-2">
              <input className="input" placeholder="프로젝트 이름..." value={newProjectName} onChange={e => setNewProjectName(e.target.value)} />
              <button className="btn primary whitespace-nowrap" onClick={createProject}>생성</button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}

export default App;
