import { useState } from 'react'
import { useStore } from '../../stores/useStore'

const platforms = [
  { key: 'douyin', label: '抖音', icon: '🎵' },
  { key: 'kuaishou', label: '快手', icon: '⚡' },
]

export default function CreationHub() {
  const { creations, addCreation, updateCreation, deleteCreation, publishSchedule, addSchedule, deleteSchedule } = useStore()
  const [showForm, setShowForm] = useState(false)
  const [tab, setTab] = useState('drafts')
  const [showScheduleForm, setShowScheduleForm] = useState(false)
  const [form, setForm] = useState({ title: '', platform: 'douyin', type: 'short_video', content: '', tags: '' })
  const [scheduleForm, setScheduleForm] = useState({ title: '', platform: 'douyin', date: '', time: '' })

  const drafts = creations.filter(c => c.status === 'draft')
  const published = creations.filter(c => c.status === 'published')
  const ideas = creations.filter(c => c.status === 'idea')

  const handleAdd = () => {
    if (!form.title) return
    addCreation(form)
    setForm({ title: '', platform: 'douyin', type: 'short_video', content: '', tags: '' })
    setShowForm(false)
  }

  const handleSchedule = () => {
    if (!scheduleForm.title || !scheduleForm.date) return
    addSchedule(scheduleForm)
    setScheduleForm({ title: '', platform: 'douyin', date: '', time: '' })
    setShowScheduleForm(false)
  }

  return (
    <div>
      {/* Tabs */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
        {[
          { key: 'drafts', label: `草稿 (${drafts.length})` },
          { key: 'published', label: `已发布 (${published.length})` },
          { key: 'ideas', label: `灵感 (${ideas.length})` },
          { key: 'schedule', label: '排期' },
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

      {/* Drafts */}
      {tab === 'drafts' && (
        drafts.length === 0 ? (
          <div className="empty-state">
            <p>还没有草稿</p>
            <button className="btn btn-primary" onClick={() => { setForm({ ...form, status: 'draft' }); setShowForm(true) }}>写脚本</button>
          </div>
        ) : (
          drafts.map(c => (
            <CreationCard key={c.id} item={c} onUpdate={updateCreation} onDelete={deleteCreation} />
          ))
        )
      )}

      {/* Published */}
      {tab === 'published' && (
        published.length === 0 ? (
          <div className="empty-state"><p>还没有发布的作品</p></div>
        ) : (
          published.map(c => (
            <CreationCard key={c.id} item={c} onUpdate={updateCreation} onDelete={deleteCreation} />
          ))
        )
      )}

      {/* Ideas */}
      {tab === 'ideas' && (
        ideas.length === 0 ? (
          <div className="empty-state">
            <p>还没有灵感记录</p>
            <button className="btn btn-primary" onClick={() => { setForm({ ...form, status: 'idea' }); setShowForm(true) }}>记灵感</button>
          </div>
        ) : (
          ideas.map(c => (
            <CreationCard key={c.id} item={c} onUpdate={updateCreation} onDelete={deleteCreation} />
          ))
        )
      )}

      {/* Schedule */}
      {tab === 'schedule' && (
        <>
          <button className="btn btn-primary btn-block" style={{ marginBottom: 12 }} onClick={() => setShowScheduleForm(true)}>
            + 添加排期
          </button>
          {publishSchedule.length === 0 ? (
            <div className="empty-state"><p>还没有发布排期</p></div>
          ) : (
            publishSchedule.sort((a, b) => a.date > b.date ? 1 : -1).map(s => (
              <div key={s.id} className="card">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <div style={{ fontWeight: 600, fontSize: 14 }}>{s.title}</div>
                    <div style={{ fontSize: 12, color: 'var(--text-secondary)' }}>
                      {platforms.find(p => p.key === s.platform)?.icon} {platforms.find(p => p.key === s.platform)?.label}
                      {' · '}{s.date} {s.time}
                    </div>
                  </div>
                  <button className="btn btn-sm btn-danger" onClick={() => deleteSchedule(s.id)}>✕</button>
                </div>
              </div>
            ))
          )}
        </>
      )}

      {/* Add Button */}
      <button className="fab" onClick={() => { setForm({ title: '', platform: 'douyin', type: 'short_video', content: '', tags: '', status: 'draft' }); setShowForm(true) }}>+</button>

      {/* Add Form Modal */}
      {showForm && (
        <div className="modal-overlay" onClick={() => setShowForm(false)}>
          <div className="modal-sheet" onClick={e => e.stopPropagation()}>
            <div className="modal-handle" />
            <h3 style={{ marginBottom: 16, fontSize: 16 }}>
              {form.status === 'idea' ? '记录灵感' : '写脚本'}
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <input className="input" placeholder="标题 *" value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} />
              <div style={{ display: 'flex', gap: 8 }}>
                <select className="input" value={form.platform} onChange={e => setForm({ ...form, platform: e.target.value })}>
                  {platforms.map(p => <option key={p.key} value={p.key}>{p.label}</option>)}
                </select>
                <select className="input" value={form.status || 'draft'} onChange={e => setForm({ ...form, status: e.target.value })}>
                  <option value="draft">草稿</option>
                  <option value="idea">灵感</option>
                  <option value="published">已发布</option>
                </select>
              </div>
              <input className="input" placeholder="标签 (用逗号分隔)" value={form.tags} onChange={e => setForm({ ...form, tags: e.target.value })} />
              <textarea
                className="input"
                placeholder="脚本内容 / 灵感描述..."
                value={form.content}
                onChange={e => setForm({ ...form, content: e.target.value })}
                style={{ minHeight: 150 }}
              />
              <button className="btn btn-primary btn-block" onClick={handleAdd}>保存</button>
              <button className="btn btn-secondary btn-block" onClick={() => setShowForm(false)}>取消</button>
            </div>
          </div>
        </div>
      )}

      {/* Schedule Form Modal */}
      {showScheduleForm && (
        <div className="modal-overlay" onClick={() => setShowScheduleForm(false)}>
          <div className="modal-sheet" onClick={e => e.stopPropagation()}>
            <div className="modal-handle" />
            <h3 style={{ marginBottom: 16, fontSize: 16 }}>添加发布排期</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <input className="input" placeholder="标题 *" value={scheduleForm.title} onChange={e => setScheduleForm({ ...scheduleForm, title: e.target.value })} />
              <select className="input" value={scheduleForm.platform} onChange={e => setScheduleForm({ ...scheduleForm, platform: e.target.value })}>
                {platforms.map(p => <option key={p.key} value={p.key}>{p.label}</option>)}
              </select>
              <input className="input" type="date" value={scheduleForm.date} onChange={e => setScheduleForm({ ...scheduleForm, date: e.target.value })} />
              <input className="input" type="time" value={scheduleForm.time} onChange={e => setScheduleForm({ ...scheduleForm, time: e.target.value })} />
              <button className="btn btn-primary btn-block" onClick={handleSchedule}>添加排期</button>
              <button className="btn btn-secondary btn-block" onClick={() => setShowScheduleForm(false)}>取消</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

function CreationCard({ item, onUpdate, onDelete }) {
  const [editing, setEditing] = useState(false)
  const [content, setContent] = useState(item.content)

  return (
    <div className="card">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
        <div style={{ flex: 1 }}>
          <div style={{ fontWeight: 600, fontSize: 14 }}>{item.title}</div>
          <div style={{ fontSize: 11, color: 'var(--text-secondary)', marginTop: 2 }}>
            {platforms.find(p => p.key === item.platform)?.icon} {platforms.find(p => p.key === item.platform)?.label}
            {' · '}{item.status === 'draft' ? '草稿' : item.status === 'idea' ? '灵感' : '已发布'}
            {' · '}{new Date(item.createdAt).toLocaleDateString()}
          </div>
        </div>
        <span className={`badge ${item.status === 'draft' ? 'badge-warning' : item.status === 'idea' ? 'badge-info' : 'badge-success'}`}>
          {item.status === 'draft' ? '草稿' : item.status === 'idea' ? '灵感' : '已发布'}
        </span>
      </div>

      {item.tags && (
        <div style={{ display: 'flex', gap: 4, flexWrap: 'wrap', marginBottom: 8 }}>
          {item.tags.split(',').filter(Boolean).map((tag, i) => (
            <span key={i} className="badge badge-primary" style={{ fontSize: 10 }}>{tag.trim()}</span>
          ))}
        </div>
      )}

      {editing ? (
        <textarea
          className="input"
          value={content}
          onChange={e => setContent(e.target.value)}
          style={{ minHeight: 100, marginBottom: 8 }}
        />
      ) : item.content && (
        <div style={{ fontSize: 13, color: 'var(--text-secondary)', marginBottom: 8, whiteSpace: 'pre-wrap', maxHeight: 80, overflow: 'hidden' }}>
          {item.content.slice(0, 200)}{item.content.length > 200 ? '...' : ''}
        </div>
      )}

      <div style={{ display: 'flex', gap: 8 }}>
        {editing ? (
          <button className="btn btn-sm btn-primary" onClick={() => { onUpdate(item.id, { content }); setEditing(false) }}>保存</button>
        ) : (
          <button className="btn btn-sm btn-secondary" onClick={() => { setContent(item.content); setEditing(true) }}>编辑</button>
        )}
        <select
          className="input"
          style={{ width: 'auto', padding: '4px 8px', fontSize: 12 }}
          value={item.status}
          onChange={e => onUpdate(item.id, { status: e.target.value })}
        >
          <option value="draft">草稿</option>
          <option value="idea">灵感</option>
          <option value="published">已发布</option>
        </select>
        <button className="btn btn-sm btn-danger" onClick={() => onDelete(item.id)}>删除</button>
      </div>
    </div>
  )
}
