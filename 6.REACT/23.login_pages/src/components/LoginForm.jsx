import TextInput from './TextInput';

export default function LoginForm({ form, message, canSubmit, onChange, onSubmit}) {
    const boxStyle = {
        padding: 10, border: '1px solid #ddd', borderRadius: 8 
    }
    const messageStyle = message.type === 'success' ?{...boxStyle, borderColor:'#16a34a', background:'white'} : message.type === 'error'? {...boxStyle, borderColor:'red', background:'white'}: boxStyle ;

  return (
    <form onSubmit={onSubmit} style={{ display: 'grid', gap: 10 }}>
      <TextInput label="아이디" name="id" value={form.id} onChange={onChange} />
      <TextInput label="비밀번호" name="pw" type="password" value={form.pw} onChange={onChange} />

      {/* 아이디 저장 체크박스 */}
      <label style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <input type="checkbox" checked={form.rememberId} onChange={(e) => onChange('rememberId', e.target.checked)} />
        아이디 저장
      </label>

      {/* 입력이 덜됬으면 버튼 비활성화 */}
      <button type="submit" disabled={!canSubmit}>
        로그인
      </button>

      {/* 
        A && B
        A가 falsy → A를 반환
        A가 truthy → B를 반환
    
    */}
      {message.text && <div style={messageStyle}>{message.text}</div>}
    </form>
  );
}
