import { useState } from "react";
import LoginForm from '../components/LoginForm';

function LoginPage(){
    const [form, setForm] = useState({id:'', pw:''});
    const [message, setMessage] = useState('');

    const updateField = (name, value) => {
        setForm((prev) => ({...prev, [name]:value}))
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        const id = form.id.trim();
        const pw = form.pw.trim();

        if (!id || !pw){
            setMessage('아이디와 비밀번호를 모두 입력해 주세요.');
            return;
        }

        //가상의 id,pw 체크 로직
        const ok = id === 'admin' && pw === '1234';

        if (ok){
            setMessage('로그인 성공');
            setForm((prev) => ({...prev,pw:''}))
        } else {
            setMessage('로그인 실패: 아이디 또는 비밀번호가 틀렸습니다.');
            setForm((prev) => ({...prev,pw:''}))
        }

    }

    return (
        <div style={{maxWidth:360, margin:'40px auto'}}>
            <h2>로그인</h2>

            <LoginForm form={form} onChange={updateField} onSubmit={handleSubmit} message={message}/>
        </div>
    )
}

export default LoginPage;