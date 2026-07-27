import { useStore } from '../../stores/useStore'
import { useNavigate } from 'react-router-dom'

export default function Dashboard() {
  const { jobs, english, calligraphy, exercise, todos, creations, reading } = useStore()
  const navigate = useNavigate()

  const today = new Date().toISOString().split('T')[0]
  const todayWords = english.wordsLearned.filter(w => w.date === today).length
  const activeJobs = jobs.filter(j => j.status !== 'rejected' && j.status !== 'accepted')
  const pendingTodos = todos.filter(t => !t.completed).length
  const draftCreations = creations.filter(c => c.status === 'draft').length
  const booksReading = reading.books.filter(b => b.status === 'reading').length
  const thisWeek = getThisWeek()
  const thisWeekExercise = exercise.logs.filter(l => {
    const d = l.createdAt?.split('T')[0]
    return d && thisWeek.includes(d)
  }).length

  const stats = [
    { label: '投递中', value: activeJobs.length, color: 'var(--accent-light)', icon: '💼', path: '/job' },
    { label: '今日单词', value: todayWords, color: 'var(--info)', icon: '📝', path: '/english' },
    { label: '连续打卡', value: `${english.streak}天`, color: 'var(--success)', icon: '🔥', path: '/english' },
    { label: '本周运动', value: `${thisWeekExercise}次`, color: 'var(--warning)', icon: '💪', path: '/exercise' },
    { label: '书法练习', value: `${calligraphy.streak}天`, color: 'var(--accent)', icon: '🖌️', path: '/calligraphy' },
    { label: '待办事项', value: pendingTodos, color: 'var(--danger)', icon: '✅', path: '/todo' },
  ]

  return (
    <div>
      {/* Stats Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10, marginBottom: 16 }}>
        {stats.map(s => (
          <div
            key={s.label}
            className="card"
            style={{ padding: 14, textAlign: 'center', cursor: 'pointer' }}
            onClick={() => navigate(s.path)}
          >
            <div style={{ fontSize: 24, marginBottom: 4 }}>{s.icon}</div>
            <div style={{ fontSize: 22, fontWeight: 700, color: s.color }}>{s.value}</div>
            <div style={{ fontSize: 11, color: 'var(--text-secondary)', marginTop: 2 }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Today's Focus */}
      <div className="card" style={{ background: 'linear-gradient(135deg, rgba(108,99,255,0.1), rgba(56,189,248,0.1))' }}>
        <div className="card-header">
          <span className="card-title">📋 今日聚焦</span>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {activeJobs.length > 0 && (
            <QuickItem icon="💼" text={`${activeJobs.length} 个岗位投递中`} sub="查看求职进度" onClick={() => navigate('/job')} />
          )}
          {english.dailyTarget > 0 && (
            <QuickItem icon="📖" text={`单词目标: ${todayWords}/${english.dailyTarget}`} sub="去背单词" onClick={() => navigate('/english')} />
          )}
          {draftCreations > 0 && (
            <QuickItem icon="✍️" text={`${draftCreations} 篇草稿待完成`} sub="继续创作" onClick={() => navigate('/creation')} />
          )}
          {booksReading > 0 && (
            <QuickItem icon="📚" text={`${booksReading} 本书在读`} sub="继续阅读" onClick={() => navigate('/reading')} />
          )}
          <QuickItem icon="🏃" text={`本周运动 ${thisWeekExercise}/${exercise.weeklyGoal} 次`} sub="去运动" onClick={() => navigate('/exercise')} />
          <QuickItem icon="🖌️" text={`书法连续 ${calligraphy.streak} 天`} sub="去练字" onClick={() => navigate('/calligraphy')} />
        </div>
      </div>

      {/* Recent Activity */}
      <div className="section-title">最近动态</div>
      {jobs.filter(j => j.status === 'interview').slice(0, 2).map(j => (
        <div key={j.id} className="card" onClick={() => navigate('/job')}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <div style={{ fontWeight: 600, fontSize: 14 }}>{j.company} - {j.position}</div>
              <div style={{ fontSize: 12, color: 'var(--text-secondary)', marginTop: 2 }}>
                {j.nextInterview ? `面试: ${j.nextInterview}` : '等待面试安排'}
              </div>
            </div>
            <span className="badge badge-info">面试中</span>
          </div>
        </div>
      ))}
      {jobs.filter(j => j.status === 'applied').slice(0, 1).map(j => (
        <div key={j.id} className="card" onClick={() => navigate('/job')}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <div style={{ fontWeight: 600, fontSize: 14 }}>{j.company} - {j.position}</div>
              <div style={{ fontSize: 12, color: 'var(--text-secondary)', marginTop: 2 }}>已投递，等待回复</div>
            </div>
            <span className="badge badge-warning">待回复</span>
          </div>
        </div>
      ))}

      {english.conversations.slice(-1).map(c => (
        <div key={c.id} className="card" onClick={() => navigate('/english')}>
          <div style={{ fontWeight: 600, fontSize: 14 }}>💬 上次对话练习</div>
          <div style={{ fontSize: 12, color: 'var(--text-secondary)', marginTop: 4 }}>
            {c.topic || '自由对话'} · {new Date(c.createdAt).toLocaleDateString()}
          </div>
        </div>
      ))}

      {calligraphy.practiceLogs.slice(-1).map(l => (
        <div key={l.id} className="card" onClick={() => navigate('/calligraphy')}>
          <div style={{ fontWeight: 600, fontSize: 14 }}>🖌️ 上次练字</div>
          <div style={{ fontSize: 12, color: 'var(--text-secondary)', marginTop: 4 }}>
            {l.stroke || '练习'} · {l.duration || ''} · {new Date(l.createdAt).toLocaleDateString()}
          </div>
        </div>
      ))}

      {exercise.logs.slice(-1).map(l => (
        <div key={l.id} className="card" onClick={() => navigate('/exercise')}>
          <div style={{ fontWeight: 600, fontSize: 14 }}>🏃 上次运动</div>
          <div style={{ fontSize: 12, color: 'var(--text-secondary)', marginTop: 4 }}>
            {l.type} · {l.duration}分钟 · {new Date(l.createdAt).toLocaleDateString()}
          </div>
        </div>
      ))}

      {/* Quick Actions */}
      <div className="section-title">快捷操作</div>
      <div className="quick-actions">
        <button className="quick-action" onClick={() => navigate('/job')}>
          <span style={{ fontSize: 28 }}>💼</span>
          <span>添加投递</span>
        </button>
        <button className="quick-action" onClick={() => navigate('/english')}>
          <span style={{ fontSize: 28 }}>🎤</span>
          <span>练口语</span>
        </button>
        <button className="quick-action" onClick={() => navigate('/creation')}>
          <span style={{ fontSize: 28 }}>✍️</span>
          <span>写脚本</span>
        </button>
        <button className="quick-action" onClick={() => navigate('/todo')}>
          <span style={{ fontSize: 28 }}>📝</span>
          <span>记待办</span>
        </button>
        <button className="quick-action" onClick={() => navigate('/exercise')}>
          <span style={{ fontSize: 28 }}>🏃</span>
          <span>运动打卡</span>
        </button>
        <button className="quick-action" onClick={() => navigate('/calligraphy')}>
          <span style={{ fontSize: 28 }}>🖌️</span>
          <span>练书法</span>
        </button>
      </div>
    </div>
  )
}

function QuickItem({ icon, text, sub, onClick }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '8px 0', cursor: 'pointer' }} onClick={onClick}>
      <span style={{ fontSize: 18 }}>{icon}</span>
      <div style={{ flex: 1 }}>
        <div style={{ fontSize: 13 }}>{text}</div>
        <div style={{ fontSize: 11, color: 'var(--accent-light)' }}>{sub} →</div>
      </div>
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
