export default function TodoList({ hide, todos, onToggle, onDelete }) {
  return (
    <ul style={{ marginTop: 12, paddingLeft: 16 }}>
      {todos.filter(t => !hide || !t.done).map((t) => (
        <li key={t.id} style={{ paddingBottom: 8 }}>
          <input type="checkbox" checked={t.done} onChange={() => onToggle(t.id)} />
          <span style={{ textDecoration: t.done ? 'line-through' : 'none' }}>{t.text}</span>
          <button onClick={() => onDelete(t.id)} style={{ marginLeft: 'auto' }}>
            삭제
          </button>
        </li>
      ))}
    </ul>
  );
}
