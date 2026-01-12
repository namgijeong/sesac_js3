// useRef는 DOM 및 렌더링과 무관한 DOM 요소를 제어하기 위해 사용한다.
import { useEffect, useState, useMemo, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

import LoginForm from '../components/LoginForm';
import { fetchLogin } from '../api/auth';
import { useLoginForm } from '../hooks/useLoginForm';
import { useAuth } from '../auth/AuthProvider';


function LoginPage() {
  const navigate = useNavigate();
  const {login} = useAuth();

  const {
    form, message , canSubmit, updateField, submit, idRef, pwRef
  } = useLoginForm();
  
  const handleSubmit = async (e) => {
    e.preventDefault();

      try{
        const user = await submit();
        console.log(user);
        login(user);
        navigate('/profile');
      } catch (err){

      }
  
  };

  return (
    <div style={{ maxWidth: 360, margin: '40px auto' }}>
      <h2>로그인</h2>

      <LoginForm form={form} message={message} canSubmit={canSubmit} onChange={updateField} onSubmit={handleSubmit} idRef={idRef} pwRef={pwRef}/>
    </div>
  );
}

export default LoginPage;
