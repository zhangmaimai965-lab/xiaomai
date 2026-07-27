import { useState } from 'react'
import { useStore } from '../../stores/useStore'

export default function TodoNotes() {
  const { todos, addTodo, toggleTodo, deleteTodo, quickNotes, addNote, deleteNote } = useStore()
  const [tab, setTab] = useState('todos')
  const [showForm, setShowForm] = useState(false)
  const [todoForm, setTodoForm] = useState({ title: '', priority: 'medium', dueDate: '', category: '' })
  const [noteForm, setNoteForm] = useState({ title: '', content: '' })

  const pendingTodos = todos.filter(t => !t.completed)
  const doneTodos = todos.filter(t => t.completed)

  const handleAddTodo = () => {
    if (!todoForm.title) return
    addTodo(todoForm)
    setTodoForm({ title: '', priority: 'medium', dueDate: '', category: '' })
    setShowForm(false)
  }

  const handleAddNote = () => {
    if (!noteForm.content) return
    addNote(noteForm)
    setNoteForm({ title: '', content: '' })
  }

  return (
    <div>
      {/* Tabs */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
        {[
          { key: 'todos', label: `待办 (${pendingTodos.length})` },
          { key: 'done', label: `已完成 (${doneTodos.length})` },
          { key: 'notes', label: `速记 (${quickNotes.length})` },
        ].map(t => (
          <button
            key={t.key}
            className={`btn btn-sm ${tab === t.key ? 'btn-primary' : 'btn-secondary'}`}
            onClick={() => setTab(t.key)}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Todos */}
      {tab === 'todos' && (
        pendingTodos.length === 0 ? (
          <div className="empty-state">
            <p>没有待办事项</p>
            <button className="btn btn-primary" onClick={() => setShowForm(true)}>添加待办</button>
          </div>
        ) : (
          pendingTodos.sort((a, b) => {
            const p = { high: 0, medium: 1, low: 2 }
            return (p[a.priority] || 1) - (p[b.priority] || 1)
          }).map(todo => (
            <div key={todo.id} className="card" style={{ opacity: todo.completed ? 0.5 : 1 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <button
                  onClick={() => toggleTodo(todo.id)}
                  style={{
                    width: 22, height: 22, borderRadius: '50%',
                    border: `2px solid ${todo.priority === 'high' ? 'var(--danger)' : todo.priority === 'low' ? 'var(--text-muted)' : 'var(--accent)'}`,
                    background: 'transparent',
                    cursor: 'pointer', flexShrink: 0,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 12, color: 'var(--success)',
                  }}
                >
                  {todo.completed ? '✓' : ''}
                </button>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 14, textDecoration: todo.completed ? 'line-through' : 'none' }}>
                    {todo.title}
                  </div>
                  <div style={{ display: 'flex', gap: 6, marginTop: 4 }}>
                    {todo.priority && (
                      <span className={`badge ${todo.priority === 'high' ? 'badge-danger' : todo.priority === 'low' ? 'badge-primary' : 'badge-warning'}`}>
                        {todo.priority === 'high' ? '高' : todo.priority === 'low' ? '低' : '中'}
                      </span>
                    )}
                    {todo.category && <span className="badge badge-info">{todo.category}</span>}
                    {todo.dueDate && <span style={{ fontSize: 11, color: 'var(--text-muted)' }}>📅 {todo.dueDate}</span>}
                  </div>
                </div>
                <button className="btn btn-sm btn-danger" onClick={() => deleteTodo(todo.id)}>✕</button>
              </div>
            </div>
          ))
        )
      )}

      {/* Done */}
      {tab === 'done' && (
        doneTodos.length === 0 ? (
          <div className="empty-state"><p>还没有完成的事项</p></div>
        ) : (
          doneTodos.map(todo => (
            <div key={todo.id} className="card" style={{ opacity: 0.6 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <button
                  onClick={() => toggleTodo(todo.id)}
                  style={{
                    width: 22, height: 22, borderRadius: '50%',
                    border: '2px solid var(--success)',
                    background: 'var(--success)',
                    cursor: 'pointer', flexShrink: 0,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 12, color: '#fff',
                  }}
                >
                  ✓
                </button>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 14, textDecoration: 'line-through' }}>{todo.title}</div>
                </div>
                <button className="btn btn-sm btn-danger" onClick={() => deleteTodo(todo.id)}>✕</button>
              </div>
            </div>
          ))
        )
      )}

      {/* Notes */}
      {tab === 'notes' && (
        <>
          {/* Quick Add Note */}
          <div className="card" style={{ marginBottom: 16 }}>
            <input
              className="input"
              placeholder="快速记录想法..."
              value={noteForm.content}
              onChange={e => setNoteForm({ ...noteForm, content: e.target.value })}
              onKeyDown={e => {
                if (e.key === 'Enter' && noteForm.content) {
                  handleAddNote()
                }
              }}
              style={{ marginBottom: 8 }}
            />
            <div style={{ display: 'flex', gap: 8 }}>
              <input
                className="input"
                placeholder="标题 (可选)"
                value={noteForm.title}
                onChange={e => setNoteForm({ ...noteForm, title: e.target.value })}
                style={{ flex: 1 }}
              />
              <button className="btn btn-primary btn-sm" onClick={handleAddNote}>保存</button>
            </div>
          </div>

          {quickNotes.length === 0 ? (
            <div className="empty-state"><p>还没有速记</p></div>
          ) : (
            quickNotes.slice().reverse().map(note => (
              <div key={note.id} className="card">
                {note.title && <div style={{ fontWeight: 600, fontSize: 14, marginBottom: 4 }}>{note.title}</div>}
                <div style={{ fontSize: 13, whiteSpace: 'pre-wrap', lineHeight: 1.6 }}>{note.content}</div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 8 }}>
                  <span style={{ fontSize: 11, color: 'var(--text-muted)' }}>
                    {new Date(note.createdAt).toLocaleString()}
                  </span>
                  <button className="btn btn-sm btn-danger" onClick={() => deleteNote(note.id)}>删除</button>
                </div>
              </div>
            ))
          )}
        </>
      )}

      {/* Add Todo Button */}
      <button className="fab" onClick={() => { setShowForm(true); setTab('todos') }}>+</button>

      {/* Add Todo Modal */}
      {showForm && (
        <div className="modal-overlay" onClick={() => setShowForm(false)}>
          <div className="modal-sheet" onClick={e => e.stopPropagation()}>
            <div className="modal-handle" />
            <h3 style={{ marginBottom: 16, fontSize: 16 }}>添加待办</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <input className="input" placeholder="待办内容 *" value={todoForm.title} onChange={e => setTodoForm({ ...todoForm, title: e.target.value })} />
              <div style={{ display: 'flex', gap: 8 }}>
                <select className="input" value={todoForm.priority} onChange={e => setTodoForm({ ...todoForm, priority: e.target.value })}>
                  <option value="high">高优先级</option>
                  <option value="medium">中优先级</option>
                  <option value="low">低优先级</option>
                </select>
                <input className="input" placeholder="分类" value={todoForm.category} onChange={e => setTodoForm({ ...todoForm, category: e.target.value })} />
              </div>
              <input className="input" type="date" value={todoForm.dueDate} onChange={e => setTodoForm({ ...todoForm, dueDate: e.target.value })} />
              <button className="btn btn-primary btn-block" onClick={handleAddTodo}>添加</button>
              <button className="btn btn-secondary btn-block" onClick={() => setShowForm(false)}>取消</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
