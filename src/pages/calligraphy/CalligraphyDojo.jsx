import { useState, useRef } from 'react'
import { useStore } from '../../stores/useStore'

const strokeEmojis = { heng: '一', shu: '丨', pie: '丿', na: '㇏', zhe: '𠃍', gou: '亅', dian: '丶' }
const strokeNames = { heng: '横', shu: '竖', pie: '撇', na: '捺', zhe: '折', gou: '钩', dian: '点' }
const strokeDesc = {
  heng: '逆锋起笔，向右行笔，回锋收笔。注意起笔藏锋，行笔均匀，收笔稳重。',
  shu: '逆锋向上，转笔向下，中锋行笔，回锋收笔。注意垂直挺拔，不可歪斜。',
  pie: '逆锋向右上，转笔向左下，逐渐提笔出锋。注意力度由重到轻。',
  na: '逆锋向左上，转笔向右下，逐渐按笔，最后提笔出锋。一波三折。',
  zhe: '横画收笔处提笔，转锋向下。注意转折处要干净利落。',
  gou: '竖画收笔处稍驻，转笔向左上勾出。注意勾要短而有力。',
  dian: '逆锋向左上，转笔向右下，回锋收笔。注意形态饱满如露珠。',
}

export default function CalligraphyDojo() {
  const { calligraphy, updateStroke, addCalligraphyLog, unlockNextStroke } = useStore()
  const [showLog, setShowLog] = useState(false)
  const [selectedStroke, setSelectedStroke] = useState(null)
  const [logForm, setLogForm] = useState({ stroke: '', duration: '', sheets: '', notes: '', image: null })
  const fileInputRef = useRef(null)

  const completedCount = calligraphy.strokes.filter(s => s.completed).length
  const totalStrokes = calligraphy.strokes.length

  const handleLog = () => {
    if (!logForm.stroke) return
    addCalligraphyLog({ ...logForm, image: logForm.image })
    updateStroke(logForm.stroke, { practiced: (calligraphy.strokes.find(s => s.id === logForm.stroke)?.practiced || 0) + 1 })

    // Check if all current unlocked strokes are completed
    const currentUnlocked = calligraphy.strokes.filter(s => s.unlocked)
    const allDone = currentUnlocked.every(s => s.completed || s.id === logForm.stroke)
    if (allDone && completedCount < totalStrokes - 1) {
      unlockNextStroke()
    }

    setLogForm({ stroke: '', duration: '', sheets: '', notes: '', image: null })
    setShowLog(false)
  }

  const handleImageSelect = (e) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onload = (ev) => setLogForm({ ...logForm, image: ev.target.result })
      reader.readAsDataURL(file)
    }
  }

  return (
    <div>
      {/* Streak Banner */}
      <div className="card" style={{ background: 'linear-gradient(135deg, rgba(108,99,255,0.15), rgba(251,191,36,0.1))' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <div style={{ fontSize: 14, fontWeight: 600 }}>🖌️ 连续练习 {calligraphy.streak} 天</div>
            <div style={{ fontSize: 12, color: 'var(--text-secondary)' }}>
              隶书入门 · 笔画进度 {completedCount}/{totalStrokes}
            </div>
          </div>
          <button className="btn btn-primary btn-sm" onClick={() => { setShowLog(true); setSelectedStroke(null) }}>
            打卡练字
          </button>
        </div>
        <div className="progress-bar" style={{ marginTop: 8 }}>
          <div className="progress-fill success" style={{ width: `${(completedCount / totalStrokes) * 100}%` }} />
        </div>
      </div>

      {/* Stroke Progress Tree */}
      <div className="section-title">笔画进度树</div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 8, marginBottom: 16 }}>
        {calligraphy.strokes.map((stroke, i) => (
          <div
            key={stroke.id}
            className="card"
            style={{
              textAlign: 'center',
              padding: 12,
              opacity: stroke.unlocked ? 1 : 0.4,
              borderColor: stroke.completed ? 'var(--success)' : stroke.unlocked ? 'var(--accent)' : 'var(--border)',
              cursor: stroke.unlocked ? 'pointer' : 'default',
              position: 'relative',
            }}
            onClick={() => {
              if (stroke.unlocked) {
                setSelectedStroke(stroke)
                setLogForm({ ...logForm, stroke: stroke.id })
                setShowLog(true)
              }
            }}
          >
            <div style={{ fontSize: 28, marginBottom: 4 }}>
              {strokeEmojis[stroke.id]}
            </div>
            <div style={{ fontSize: 12, fontWeight: 600 }}>{strokeNames[stroke.id]}</div>
            <div style={{ fontSize: 10, color: 'var(--text-muted)' }}>
              {stroke.completed ? '✅ 已掌握' : stroke.unlocked ? `${stroke.practiced}/5次` : '🔒'}
            </div>
            {!stroke.unlocked && (
              <div style={{ fontSize: 10, color: 'var(--text-muted)', marginTop: 2 }}>先完成前一笔</div>
            )}
            {i < calligraphy.strokes.length - 1 && (
              <div style={{
                position: 'absolute',
                right: -8,
                top: '50%',
                width: 8,
                height: 2,
                background: stroke.completed ? 'var(--success)' : 'var(--border)',
              }} />
            )}
          </div>
        ))}
      </div>

      {/* Stroke Detail */}
      {selectedStroke && !showLog && (
        <div className="card">
          <div className="card-title">{strokeEmojis[selectedStroke.id]} {strokeNames[selectedStroke.id]} — 写法要点</div>
          <div style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.8 }}>
            {strokeDesc[selectedStroke.id]}
          </div>
          <div style={{ marginTop: 12 }}>
            <div style={{ fontSize: 12, color: 'var(--text-muted)' }}>
              已练习: {selectedStroke.practiced}/5 次
            </div>
            <div className="progress-bar" style={{ marginTop: 4 }}>
              <div className="progress-fill primary" style={{ width: `${(selectedStroke.practiced / 5) * 100}%` }} />
            </div>
          </div>
        </div>
      )}

      {/* Practice History */}
      {calligraphy.practiceLogs.length > 0 && (
        <>
          <div className="section-title">练习记录</div>
          {calligraphy.practiceLogs.slice(-10).reverse().map(log => (
            <div key={log.id} className="card">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                  <div style={{ fontWeight: 600, fontSize: 14 }}>
                    {strokeEmojis[log.stroke]} {strokeNames[log.stroke]}
                  </div>
                  <div style={{ fontSize: 12, color: 'var(--text-secondary)' }}>
                    {log.duration && `练习${log.duration}分钟 · `}
                    {log.sheets && `${log.sheets}张 · `}
                    {new Date(log.createdAt).toLocaleDateString()}
                  </div>
                  {log.notes && (
                    <div style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 4 }}>{log.notes}</div>
                  )}
                </div>
              </div>
              {log.image && (
                <img src={log.image} alt="练习作品" style={{ width: '100%', borderRadius: 8, marginTop: 8, maxHeight: 200, objectFit: 'cover' }} />
              )}
            </div>
          ))}
        </>
      )}

      {/* Log Modal */}
      {showLog && (
        <div className="modal-overlay" onClick={() => setShowLog(false)}>
          <div className="modal-sheet" onClick={e => e.stopPropagation()}>
            <div className="modal-handle" />
            <h3 style={{ marginBottom: 16, fontSize: 16 }}>🖌️ 练习打卡</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <select className="input" value={logForm.stroke} onChange={e => setLogForm({ ...logForm, stroke: e.target.value })}>
                <option value="">选择笔画</option>
                {calligraphy.strokes.filter(s => s.unlocked).map(s => (
                  <option key={s.id} value={s.id}>{strokeEmojis[s.id]} {strokeNames[s.id]} ({s.practiced}/5)</option>
                ))}
              </select>
              <input className="input" placeholder="练习时长 (分钟)" value={logForm.duration} onChange={e => setLogForm({ ...logForm, duration: e.target.value })} />
              <input className="input" placeholder="练习张数" value={logForm.sheets} onChange={e => setLogForm({ ...logForm, sheets: e.target.value })} />
              <textarea className="input" placeholder="练习心得..." value={logForm.notes} onChange={e => setLogForm({ ...logForm, notes: e.target.value })} />

              <div>
                <input
                  type="file"
                  accept="image/*"
                  capture="environment"
                  onChange={handleImageSelect}
                  ref={fileInputRef}
                  style={{ display: 'none' }}
                />
                <button className="btn btn-secondary btn-block" onClick={() => fileInputRef.current?.click()}>
                  📸 拍照上传练习作品
                </button>
              </div>

              {logForm.image && (
                <img src={logForm.image} alt="预览" style={{ width: '100%', borderRadius: 8, maxHeight: 200, objectFit: 'cover' }} />
              )}

              <button className="btn btn-primary btn-block" onClick={handleLog}>✅ 完成打卡</button>
              <button className="btn btn-secondary btn-block" onClick={() => setShowLog(false)}>取消</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
