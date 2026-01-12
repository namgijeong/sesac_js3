import { useEffect, useState, useMemo, useRef } from 'react';
import { fetchLogin } from '../api/auth';

const SAVED_ID_KEY = 'saved_login_id';
function getInitialForm() {
  const savedId = localStorage.getItem(SAVED_ID_KEY);
  return {
    //이렇게 안하면 localStorage.getItem 없을때 => null값울  trim 해서 에러
    id: savedId || '',
    pw: '',
    rememberId: Boolean(savedId),
  };
}

//커스텀훅 => use로 시작하고, 내부에서 다른 hook을 호출, JSX를 리턴하지 않는 함수
export const useLoginForm = () => {
  //const [form, setForm] = useState(getInitialForm());  // lazy init 아님,  불릴때 마다 실행됨
  const [form, setForm] = useState(() => getInitialForm()); // lazy init 이 페이지가 불릴때 1회만 호출
  //const [form, setForm] = useState({ id: '', pw: '', rememberId: false });
  const [message, setMessage] = useState({ type: '', text: '' });

  const idRef = useRef(null);
  const pwRef = useRef(null);

  const updateField = (name, value) => {
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // const canSubmit = form.id.trim() !== '' && form.pw.trim() !== '';
  //useMemo로 관리하면 더 좋다
  const canSubmit = useMemo(() => {
    return form.id.trim() !== '' && form.pw.trim() !== '';
  }, [form]);

  //이 페이지가 처음 불릴때, 로컬 스토리지에 저장된 saved_id_key가 있으면 불러온다
  //이런 방식은 두번 렌더링되기 때문에 => react 19에서는 비추함
  // useEffect(() => {
  //   const id = localStorage.getItem(SAVED_ID_KEY);
  //   console.log(id);

  //   if (id) {
  //     setForm({ id: id, pw: '', rememberId: true });
  //   }
  // }, []);

  //아이디 저장 체크해제만 해도 로컬스토리지에서 삭제
  useEffect(() => {
    if (form.rememberId === true) {
      localStorage.setItem(SAVED_ID_KEY, form.id.trim());
    } else {
      localStorage.removeItem(SAVED_ID_KEY);
    }
  }, [form.rememberId]);

  //로그인 시 id 또는 pw 입력창에 자동 포커스
  useEffect(() => {
    //?을 쓰는 이유 => 자식이 ref를 아직 세팅 안했을수도 있다
    idRef.current?.focus();

    if (form.id) {
      pwRef.current?.focus();
    }
  }, []);

  //로그인 성공 후 성공 메시지 2초 후에 지우기
  useEffect(() => {
    if (message.type !== 'success') return;

    const timer = setTimeout(() => {
      setMessage({ type: '', text: '' });
    }, 2000);

    //이걸 안하면 성공 메시지 띄운후 일부러 틀린 비번을 치면 실패 메시지가 사라지는 현상
    return () => clearTimeout(timer);
  }, [message]);

  const submit = async () => {
    const id = form.id.trim();
    const pw = form.pw.trim();

    //버튼 disabled 해도 방어코드 추가
    if (!id || !pw) {
      setMessage({ type: 'error', text: '아이디와 비밀번호를 모두 입력해 주세요.' });
      return;
    }

    //가상의 id,pw 체크 로직
    try {
      const { ok, user } = await fetchLogin({ id, pw });
      if (!ok) throw new Error('로그인에 실패했습니다.');

      if (form.rememberId) {
        localStorage.setItem(SAVED_ID_KEY, id);
      }
      setMessage({ type: 'success', text: '로그인 성공' });
      setForm((prev) => ({ ...prev, pw: '' }));

      return user;

    } catch (err) {
      localStorage.removeItem(SAVED_ID_KEY);
      setMessage({ type: 'error', text: '로그인 실패: 아이디 또는 비밀번호가 틀렸습니다.' });
      setForm((prev) => ({ ...prev, pw: '' }));

      throw err;
    }
  };

  return { form, message, canSubmit, updateField, submit, idRef, pwRef };
};
