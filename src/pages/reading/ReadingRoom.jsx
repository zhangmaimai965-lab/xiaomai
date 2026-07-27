import { useState, useRef } from 'react'
import { useStore } from '../../stores/useStore'

export default function ReadingRoom() {
  const { reading, addBook, updateBook, deleteBook, addReadingNote, addReadingLog } = useStore()
  const [showForm, setShowForm] = useState(false)
  const [showNoteForm, setShowNoteForm] = useState(false)
  const [showReader, setShowReader] = useState(false)
  const [selectedBook, setSelectedBook] = useState(null)
  const [form, setForm] = useState({ title: '', author: '', status: 'want', cover: '', file: null })
  const [noteForm, setNoteForm] = useState({ bookId: '', bookTitle: '', content: '', page: '' })
  const [timer, setTimer] = useState(null)
  const [readingSeconds, setReadingSeconds] = useState(0)
  const fileInputRef = useRef(null)

  const booksReading = reading.books.filter(b => b.status === 'reading')
  const booksWant = reading.books.filter(b => b.status === 'want')
  const booksDone = reading.books.filter(b => b.status === 'done')

  const handleAdd = () => {
    if (!form.title) return
    addBook({ ...form, file: form.file ? { name: form.file.name } : null })
    setForm({ title: '', author: '', status: 'want', cover: '', file: null })
    setShowForm(false)
  }

  const handleAddNote = () => {
    if (!noteForm.content) return
    addReadingNote(noteForm)
    setNoteForm({ bookId: '', bookTitle: '', content: '', page: '' })
    setShowNoteForm(false)
  }

  const startReading = (book) => {
    setSelectedBook(book)
    setShowReader(true)
    setReadingSeconds(0)
    const t = setInterval(() => {
      setReadingSeconds(s => s + 1)
    }, 1000)
    setTimer(t)
  }

  const stopReading = () => {
    if (timer) clearInterval(timer)
    if (selectedBook && readingSeconds > 10) {
      addReadingLog({ bookId: selectedBook.id, bookTitle: selectedBook.title, duration: Math.round(readingSeconds / 60) })
    }
    setShowReader(false)
    setTimer(null)
    setReadingSeconds(0)
  }

  const formatTime = (sec) => {
    const m = Math.floor(sec / 60)
    const s = sec % 60
    return `${m}:${s.toString().padStart(2, '0')}`
  }

  const handleFileSelect = (e) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (ev) => {
        setSelectedBook(prev => ({ ...prev, fileData: ev.target.result, fileName: file.name }))
      }
      if (file.name.endsWith('.txt')) {
        reader.readAsText(file)
      } else {
        reader.readAsDataURL(file)
      }
    }
  }

  return (
    <div>
      {/* Currently Reading */}
      {booksReading.length > 0 && (
        <>
          <div className="section-title">正在阅读</div>
          {booksReading.map(book => (
            <div key={book.id} className="card">
              <div style={{ display: 'flex', gap: 12 }}>
                <div style={{
                  width: 60, height: 80, background: 'var(--bg-primary)',
                  borderRadius: 4, display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 28, flexShrink: 0
                }}>
                  {book.cover || '📖'}
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 600, fontSize: 15 }}>{book.title}</div>
                  <div style={{ fontSize: 12, color: 'var(--text-secondary)' }}>{book.author || '未知作者'}</div>
                  {book.progress !== undefined && (
                    <div style={{ marginTop: 6 }}>
                      <div className="progress-bar" style={{ marginBottom: 4 }}>
                        <div className="progress-fill success" style={{ width: `${book.progress}%` }} />
                      </div>
                      <div style={{ fontSize: 11, color: 'var(--text-muted)' }}>进度 {book.progress}%</div>
                    </div>
                  )}
                  <div style={{ display: 'flex', gap: 6, marginTop: 8 }}>
                    <button className="btn btn-sm btn-primary" onClick={() => startReading(book)}>📖 开始阅读</button>
                    <button className="btn btn-sm btn-secondary" onClick={() => {
                      setSelectedBook(book)
                      setNoteForm({ ...noteForm, bookId: book.id, bookTitle: book.title })
                      setShowNoteForm(true)
                    }}>📝 笔记</button>
                    <select
                      className="input"
                      style={{ width: 'auto', padding: '2px 6px', fontSize: 11 }}
                      value={book.status}
                      onChange={e => updateBook(book.id, { status: e.target.value })}
                    >
                      <option value="reading">在读</option>
                      <option value="done">已读</option>
                      <option value="want">想读</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </>
      )}

      {/* Want to Read */}
      {booksWant.length > 0 && (
        <>
          <div className="section-title">想读</div>
          {booksWant.map(book => (
            <BookCard key={book.id} book={book} onUpdate={updateBook} onDelete={deleteBook} onRead={startReading} />
          ))}
        </>
      )}

      {/* Done */}
      {booksDone.length > 0 && (
        <>
          <div className="section-title">已读完</div>
          {booksDone.map(book => (
            <BookCard key={book.id} book={book} onUpdate={updateBook} onDelete={deleteBook} onRead={startReading} />
          ))}
        </>
      )}

      {reading.books.length === 0 && (
        <div className="empty-state">
          <p>书架还是空的</p>
          <button className="btn btn-primary" onClick={() => setShowForm(true)}>添加第一本书</button>
        </div>
      )}

      {/* Reading Notes */}
      {reading.notes.length > 0 && (
        <>
          <div className="section-title">读书笔记</div>
          {reading.notes.slice(-5).reverse().map(note => (
            <div key={note.id} className="card">
              <div style={{ fontSize: 12, color: 'var(--text-secondary)', marginBottom: 4 }}>
                📖 {note.bookTitle} {note.page && `· 第${note.page}页`} · {new Date(note.createdAt).toLocaleDateString()}
              </div>
              <div style={{ fontSize: 13, whiteSpace: 'pre-wrap', lineHeight: 1.6 }}>{note.content}</div>
            </div>
          ))}
        </>
      )}

      {/* Reading Stats */}
      {reading.readingLogs.length > 0 && (
        <div className="card" style={{ marginTop: 12 }}>
          <div className="card-title">阅读统计</div>
          <div style={{ fontSize: 13, color: 'var(--text-secondary)' }}>
            累计阅读 {reading.readingLogs.reduce((sum, l) => sum + (l.duration || 0), 0)} 分钟 ·
            共 {reading.readingLogs.length} 次
          </div>
        </div>
      )}

      {/* Add Button */}
      <button className="fab" onClick={() => setShowForm(true)}>+</button>

      {/* Reader Modal */}
      {showReader && selectedBook && (
        <div className="modal-overlay" onClick={stopReading}>
          <div className="modal-sheet" onClick={e => e.stopPropagation()} style={{ height: '90vh' }}>
            <div className="modal-handle" />
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
              <div style={{ fontWeight: 600, fontSize: 16 }}>{selectedBook.title}</div>
              <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                <span style={{ fontSize: 13, color: 'var(--accent-light)', fontFamily: 'monospace' }}>
                  ⏱️ {formatTime(readingSeconds)}
                </span>
                <button className="btn btn-sm btn-danger" onClick={stopReading}>结束阅读</button>
              </div>
            </div>

            {selectedBook.fileData ? (
              selectedBook.fileName?.endsWith('.txt') ? (
                <div style={{
                  background: 'var(--bg-card)',
                  borderRadius: 'var(--radius)',
                  padding: 16,
                  maxHeight: 'calc(90vh - 120px)',
                  overflowY: 'auto',
                  fontSize: 15,
                  lineHeight: 2,
                  whiteSpace: 'pre-wrap',
                  fontFamily: 'Georgia, serif',
                }}>
                  {selectedBook.fileData}
                </div>
              ) : (
                <div style={{ textAlign: 'center', padding: 40 }}>
                  <div style={{ fontSize: 48, marginBottom: 16 }}>📄</div>
                  <div style={{ fontSize: 14, color: 'var(--text-secondary)', marginBottom: 16 }}>
                    当前仅支持 TXT 格式文本阅读
                  </div>
                  <input
                    type="file"
                    accept=".txt"
                    onChange={handleFileSelect}
                    ref={fileInputRef}
                    style={{ display: 'none' }}
                  />
                  <button className="btn btn-primary" onClick={() => fileInputRef.current?.click()}>
                    选择 TXT 文件
                  </button>
                </div>
              )
            ) : (
              <div style={{ textAlign: 'center', padding: 40 }}>
                <div style={{ fontSize: 48, marginBottom: 16 }}>📚</div>
                <div style={{ fontSize: 14, color: 'var(--text-secondary)', marginBottom: 8 }}>
                  选择文件开始阅读
                </div>
                <div style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: 16 }}>
                  支持 TXT 格式（EPUB/PDF 后续支持）
                </div>
                <input
                  type="file"
                  accept=".txt"
                  onChange={handleFileSelect}
                  ref={fileInputRef}
                  style={{ display: 'none' }}
                />
                <button className="btn btn-primary" onClick={() => fileInputRef.current?.click()}>
                  选择文件
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Add Book Modal */}
      {showForm && (
        <div className="modal-overlay" onClick={() => setShowForm(false)}>
          <div className="modal-sheet" onClick={e => e.stopPropagation()}>
            <div className="modal-handle" />
            <h3 style={{ marginBottom: 16, fontSize: 16 }}>添加书籍</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <input className="input" placeholder="书名 *" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} />
              <input className="input" placeholder="作者" value={form.author} onChange={e => setForm({ ...form, author: e.target.value })} />
              <select className="input" value={form.status} onChange={e => setForm({ ...form, status: e.target.value })}>
                <option value="want">想读</option>
                <option value="reading">在读</option>
                <option value="done">已读</option>
              </select>
              <input
                className="input"
                type="file"
                accept=".txt"
                onChange={e => setForm({ ...form, file: e.target.files?.[0] || null })}
              />
              <button className="btn btn-primary btn-block" onClick={handleAdd}>添加</button>
              <button className="btn btn-secondary btn-block" onClick={() => setShowForm(false)}>取消</button>
            </div>
          </div>
        </div>
      )}

      {/* Add Note Modal */}
      {showNoteForm && (
        <div className="modal-overlay" onClick={() => setShowNoteForm(false)}>
          <div className="modal-sheet" onClick={e => e.stopPropagation()}>
            <div className="modal-handle" />
            <h3 style={{ marginBottom: 16, fontSize: 16 }}>读书笔记 - {selectedBook?.title}</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <input className="input" placeholder="页码 (可选)" value={noteForm.page} onChange={e => setNoteForm({ ...noteForm, page: e.target.value })} />
              <textarea
                className="input"
                placeholder="写下你的想法..."
                value={noteForm.content}
                onChange={e => setNoteForm({ ...noteForm, content: e.target.value })}
                style={{ minHeight: 120 }}
              />
              <button className="btn btn-primary btn-block" onClick={handleAddNote}>保存笔记</button>
              <button className="btn btn-secondary btn-block" onClick={() => setShowNoteForm(false)}>取消</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

function BookCard({ book, onUpdate, onDelete, onRead }) {
  return (
    <div className="card">
      <div style={{ display: 'flex', gap: 12 }}>
        <div style={{
          width: 50, height: 68, background: 'var(--bg-primary)',
          borderRadius: 4, display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 24, flexShrink: 0
        }}>
          {book.cover || '📖'}
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ fontWeight: 600, fontSize: 14 }}>{book.title}</div>
          <div style={{ fontSize: 12, color: 'var(--text-secondary)' }}>{book.author || '未知作者'}</div>
          <div style={{ display: 'flex', gap: 6, marginTop: 6 }}>
            <button className="btn btn-sm btn-primary" onClick={() => onRead(book)}>📖 阅读</button>
            <select
              className="input"
              style={{ width: 'auto', padding: '2px 6px', fontSize: 11 }}
              value={book.status}
              onChange={e => onUpdate(book.id, { status: e.target.value })}
            >
              <option value="want">想读</option>
              <option value="reading">在读</option>
              <option value="done">已读</option>
            </select>
            <button className="btn btn-sm btn-danger" onClick={() => onDelete(book.id)}>删除</button>
          </div>
        </div>
      </div>
    </div>
  )
}
