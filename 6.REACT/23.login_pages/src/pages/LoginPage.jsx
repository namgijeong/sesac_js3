import { useEffect, useState } from 'react';
import LoginForm from '../components/LoginForm';

const SAVED_ID_KEY = 'saved_login_id';
function LoginPage() {
  const [form, setForm] = useState({ id: '', pw: '', rememberId: false });
  const [message, setMessage] = useState({ type: '', text: '' });

  const updateField = (name, value) => {
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  //useMemo로 관리하면 더 좋다
  const canSubmit = form.id.trim() !== '' && form.pw.trim() !== '';

  //이 페이지가 처음 불릴때, 로컬 스토리지에 저장된 saved_id_key가 있으면 불러온다
  useEffect(() => {
    const id = localStorage.getItem(SAVED_ID_KEY);
    console.log(id);

    if (id) {
      setForm({ id: id, pw: '', rememberId: true });
      //setForm((prev)=>({...prev, id:id, rememberId:true}));
    }
  }, []);

  //아이디 저장 체크해제만 해도 로컬스토리지에서 삭제
  useEffect(() => {
    if (form.rememberId === true) {
     localStorage.setItem(SAVED_ID_KEY, form.id);
    } else {
      localStorage.removeItem(SAVED_ID_KEY);
    }
  }, [form.rememberId]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const id = form.id.trim();
    const pw = form.pw.trim();

    //버튼 disabled 해도 방어코드 추가
    if (!id || !pw) {
      setMessage({ type: 'error', text: '아이디와 비밀번호를 모두 입력해 주세요.' });
      return;
    }

    //가상의 id,pw 체크 로직
    const ok = id === 'admin' && pw === '1234';

    if (ok) {
      if (form.rememberId) {
        localStorage.setItem(SAVED_ID_KEY, id);
      }
      setMessage({ type: 'success', text: '로그인 성공' });
      setForm((prev) => ({ ...prev, pw: '' }));
    } else {
      localStorage.removeItem(SAVED_ID_KEY);
      setMessage({ type: 'error', text: '로그인 실패: 아이디 또는 비밀번호가 틀렸습니다.' });
      setForm((prev) => ({ ...prev, pw: '' }));
    }
  };

  return (
    <div style={{ maxWidth: 360, margin: '40px auto' }}>
      <h2>로그인</h2>

      <LoginForm form={form} message={message} canSubmit={canSubmit} onChange={updateField} onSubmit={handleSubmit} />
    </div>
  );
}

export default LoginPage;
