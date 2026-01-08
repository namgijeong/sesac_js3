export default function TodoForm ({setText,text, onAdd}) {
    return (
        <form onSubmit={onAdd} style={{display:'flex', gap:8, marginTop:12}}>
          <input type="text" placeholder="할일을 입력하세요" value={text} onChange={(e) => setText(e.target.value)}/>
          <button type="submit">추가</button>
        </form>
    )
}