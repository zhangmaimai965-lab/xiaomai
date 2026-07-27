import { useState } from 'react'
import { useStore } from '../../stores/useStore'

const exerciseTypes = [
  { key: 'running', label: '🏃 跑步', unit: '公里' },
  { key: 'walking', label: '🚶 散步', unit: '公里' },
  { key: 'jump_rope', label: '🪢 跳绳', unit: '分钟' },
  { key: 'yoga', label: '🧘 瑜伽', unit: '分钟' },
  { key: 'fitness', label: '🏋️ 健身', unit: '分钟' },
  { key: 'cycling', label: '🚴 骑行', unit: '公里' },
  { key: 'swimming', label: '🏊 游泳', unit: '分钟' },
  { key: 'basketball', label: '🏀 篮球', unit: '分钟' },
  { key: 'badminton', label: '🏸 羽毛球', unit: '分钟' },
  { key: 'hiit', label: '⚡ HIIT', unit: '分钟' },
  { key: 'stretching', label: '🤸 拉伸', unit: '分钟' },
  { key: 'other', label: '💪 其他', unit: '分钟' },
]

export default function ExerciseTracker() {
  const { exercise, addExerciseLog, setWeeklyGoal } = useStore()
  const [showForm, setShowForm] = useState(false)
  const [showQuickForm, setShowQuickForm] = useState(false)
  const [quickType, setQuickType] = useState(null)
  const [form, setForm] = useState({ type: 'running', duration: '', amount: '', notes: '' })
  const [quickForm, setQuickForm] = useState({ duration: '', amount: '', notes: '' })

  const today = new Date().toISOString().split('T')[0]
  const thisWeek = getThisWeek()
  const thisWeekLogs = exercise.logs.filter(l => {
    const d = l.createdAt?.split('T')[0]
    return d && thisWeek.includes(d)
  })

  const handleAdd = () => {
    if (!form.duration && !form.amount) return
    addExerciseLog({ ...form, duration: Number(form.duration) || 0, amount: Number(form.amount) || 0 })
    setForm({ type: 'running', duration: '', amount: '', notes: '' })
    setShowForm(false)
  }

  // Weekly progress visualization
  const weekDays = ['一', '二', '三', '四', '五', '六', '日']
  const dailyStatus = thisWeek.map(date => {
    const log = exercise.logs.find(l => l.createdAt?.split('T')[0] === date)
    return { date, done: !!log, today: date === today }
  })

  const totalMinutes = thisWeekLogs.reduce((s, l) => s + (l.duration || 0), 0)

  return (
    <div>
      {/* Streak & Goal */}
      <div className="card" style={{ background: 'linear-gradient(135deg, rgba(74,222,128,0.1), rgba(251,191,36,0.1))' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <div style={{ fontSize: 14, fontWeight: 600 }}>💪 连续运动 {exercise.streak} 天</div>
            <div style={{ fontSize: 12, color: 'var(--text-secondary)' }}>
              本周: {thisWeekLogs.length}/{exercise.weeklyGoal} 次 · {totalMinutes} 分钟
            </div>
          </div>
          <button className="btn btn-sm btn-secondary" onClick={() => {
            const g = prompt('每周运动目标次数:', String(exercise.weeklyGoal))
            if (g && !isNaN(Number(g))) setWeeklyGoal(Number(g))
          }}>调整目标</button>
        </div>
        <div className="progress-bar" style={{ marginTop: 8 }}>
          <div className="progress-fill success" style={{ width: `${Math.min(100, (thisWeekLogs.length / exercise.weeklyGoal) * 100)}%` }} />
        </div>
      </div>

      {/* Weekly Calendar */}
      <div className="section-title">本周打卡</div>
      <div style={{ display: 'flex', gap: 6, marginBottom: 16, justifyContent: 'space-around' }}>
        {dailyStatus.map((d, i) => (
          <div key={i} style={{ textAlign: 'center' }}>
            <div style={{ fontSize: 11, color: 'var(--text-muted)', marginBottom: 4 }}>{weekDays[i]}</div>
            <div style={{
              width: 36, height: 36, borderRadius: '50%',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 18,
              background: d.done ? 'var(--success)' : d.today ? 'rgba(74,222,128,0.15)' : 'var(--bg-card)',
              border: d.today && !d.done ? '2px dashed var(--success)' : '2px solid transparent',
            }}>
              {d.done ? '✓' : ''}
            </div>
          </div>
        ))}
      </div>

      {/* Quick Add */}
      <div className="section-title">快速打卡</div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8, marginBottom: 16 }}>
        {exerciseTypes.slice(0, 6).map(t => (
          <button
            key={t.key}
            className="card"
            style={{ padding: 12, textAlign: 'center', cursor: 'pointer', fontSize: 13 }}
            onClick={() => {
              setQuickType(t.key)
              setQuickForm({ duration: '30', amount: '', notes: '' })
              setShowQuickForm(true)
            }}
          >
            <div style={{ fontSize: 24, marginBottom: 4 }}>{t.label.slice(0, 2)}</div>
            <div>{t.label.slice(3)}</div>
          </button>
        ))}
      </div>

      {/* History */}
      {exercise.logs.length > 0 && (
        <>
          <div className="section-title">运动记录</div>
          {exercise.logs.slice(-10).reverse().map(log => (
            <div key={log.id} className="card">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <div style={{ fontWeight: 600, fontSize: 14 }}>
                    {exerciseTypes.find(t => t.key === log.type)?.label || '运动'}
                  </div>
                  <div style={{ fontSize: 12, color: 'var(--text-secondary)' }}>
                    {log.duration > 0 && `${log.duration}分钟 `}
                    {log.amount > 0 && `${log.amount}${exerciseTypes.find(t => t.key === log.type)?.unit || ''} `}
                    · {new Date(log.createdAt).toLocaleDateString()}
                  </div>
                  {log.notes && (
                    <div style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 2 }}>{log.notes}</div>
                  )}
                </div>
                <span className="badge badge-success">✓</span>
              </div>
            </div>
          ))}
        </>
      )}

      {exercise.logs.length === 0 && (
        <div className="empty-state">
          <div style={{ fontSize: 48, marginBottom: 8 }}>🏃</div>
          <p>开始你的第一次运动吧！</p>
          <button className="btn btn-primary" onClick={() => setShowForm(true)}>记录运动</button>
        </div>
      )}

      {/* Add Button */}
      <button className="fab" onClick={() => setShowForm(true)}>+</button>

      {/* Add Form Modal */}
      {showForm && (
        <div className="modal-overlay" onClick={() => setShowForm(false)}>
          <div className="modal-sheet" onClick={e => e.stopPropagation()}>
            <div className="modal-handle" />
            <h3 style={{ marginBottom: 16, fontSize: 16 }}>记录运动</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <select className="input" value={form.type} onChange={e => setForm({ ...form, type: e.target.value })}>
                {exerciseTypes.map(t => <option key={t.key} value={t.key}>{t.label}</option>)}
              </select>
              <div style={{ display: 'flex', gap: 8 }}>
                <input
                  className="input"
                  placeholder={`时长 (分钟)`}
                  type="number"
                  value={form.duration}
                  onChange={e => setForm({ ...form, duration: e.target.value })}
                  style={{ flex: 1 }}
                />
                <input
                  className="input"
                  placeholder={exerciseTypes.find(t => t.key === form.type)?.unit || '数量'}
                  type="number"
                  value={form.amount}
                  onChange={e => setForm({ ...form, amount: e.target.value })}
                  style={{ flex: 1 }}
                />
              </div>
              <textarea className="input" placeholder="备注 (可选)" value={form.notes} onChange={e => setForm({ ...form, notes: e.target.value })} />
              <button className="btn btn-primary btn-block" onClick={handleAdd}>✅ 完成打卡</button>
              <button className="btn btn-secondary btn-block" onClick={() => setShowForm(false)}>取消</button>
            </div>
          </div>
        </div>
      )}

      {/* Quick Log Modal */}
      {showQuickForm && (
        <div className="modal-overlay" onClick={() => setShowQuickForm(false)}>
          <div className="modal-sheet" onClick={e => e.stopPropagation()}>
            <div className="modal-handle" />
            <h3 style={{ marginBottom: 16, fontSize: 16 }}>{exerciseTypes.find(t => t.key === quickType)?.label}</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <div style={{ display: 'flex', gap: 8 }}>
                <input
                  className="input"
                  placeholder="时长 (分钟)"
                  type="number"
                  value={quickForm.duration}
                  onChange={e => setQuickForm({ ...quickForm, duration: e.target.value })}
                  style={{ flex: 1 }}
                />
                <input
                  className="input"
                  placeholder={exerciseTypes.find(t => t.key === quickType)?.unit}
                  type="number"
                  value={quickForm.amount}
                  onChange={e => setQuickForm({ ...quickForm, amount: e.target.value })}
                  style={{ flex: 1 }}
                />
              </div>
              <textarea className="input" placeholder="备注" value={quickForm.notes} onChange={e => setQuickForm({ ...quickForm, notes: e.target.value })} />
              <button className="btn btn-primary btn-block" onClick={() => {
                if (quickForm.duration || quickForm.amount) {
                  addExerciseLog({ type: quickType, duration: Number(quickForm.duration) || 0, amount: Number(quickForm.amount) || 0, notes: quickForm.notes })
                  setShowQuickForm(false)
                  setQuickType(null)
                }
              }}>✅ 打卡</button>
              <button className="btn btn-secondary btn-block" onClick={() => setShowQuickForm(false)}>取消</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

function getThisWeek() {
  const days = []
  const now = new Date()
  const dayOfWeek = now.getDay()
  const monday = new Date(now)
  monday.setDate(now.getDate() - (dayOfWeek === 0 ? 6 : dayOfWeek - 1))
  for (let i = 0; i < 7; i++) {
    const d = new Date(monday)
    d.setDate(monday.getDate() + i)
    days.push(d.toISOString().split('T')[0])
  }
  return days
}
