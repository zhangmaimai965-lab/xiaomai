import { useState } from 'react'
import { useStore } from '../../stores/useStore'

const statusMap = {
  applied: { label: '已投递', className: 'badge-warning' },
  interview: { label: '面试中', className: 'badge-info' },
  offer: { label: '已Offer', className: 'badge-success' },
  rejected: { label: '未通过', className: 'badge-danger' },
  accepted: { label: '已入职', className: 'badge-success' },
}

export default function JobTracker() {
  const { jobs, addJob, updateJob, deleteJob, addInterviewNote, interviewNotes } = useStore()
  const [showForm, setShowForm] = useState(false)
  const [showNoteForm, setShowNoteForm] = useState(false)
  const [selectedJob, setSelectedJob] = useState(null)
  const [filter, setFilter] = useState('all')
  const [form, setForm] = useState({ company: '', position: '', status: 'applied', url: '', notes: '', nextInterview: '', salary: '' })
  const [noteForm, setNoteForm] = useState({ jobId: '', company: '', content: '', result: '' })

  const filteredJobs = filter === 'all' ? jobs : jobs.filter(j => j.status === filter)

  const handleAdd = () => {
    if (!form.company || !form.position) return
    addJob(form)
    setForm({ company: '', position: '', status: 'applied', url: '', notes: '', nextInterview: '', salary: '' })
    setShowForm(false)
  }

  const handleAddNote = () => {
    if (!noteForm.content) return
    addInterviewNote({ ...noteForm, jobId: selectedJob?.id || '', company: selectedJob?.company || '' })
    setNoteForm({ jobId: '', company: '', content: '', result: '' })
    setShowNoteForm(false)
  }

  const statusCounts = {
    all: jobs.length,
    applied: jobs.filter(j => j.status === 'applied').length,
    interview: jobs.filter(j => j.status === 'interview').length,
    offer: jobs.filter(j => j.status === 'offer').length,
  }

  return (
    <div>
      {/* Status Tabs */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 16, overflowX: 'auto', paddingBottom: 4 }}>
        {Object.entries(statusCounts).map(([key, count]) => (
          <button
            key={key}
            className={`btn btn-sm ${filter === key ? 'btn-primary' : 'btn-secondary'}`}
            onClick={() => setFilter(key)}
          >
            {key === 'all' ? '全部' : statusMap[key]?.label} ({count})
          </button>
        ))}
      </div>

      {/* Job List */}
      {filteredJobs.length === 0 ? (
        <div className="empty-state">
          <p>暂无求职记录</p>
          <button className="btn btn-primary" onClick={() => setShowForm(true)}>添加第一个投递</button>
        </div>
      ) : (
        filteredJobs.map(job => (
          <div key={job.id} className="card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 600, fontSize: 15 }}>{job.position}</div>
                <div style={{ fontSize: 13, color: 'var(--text-secondary)' }}>{job.company}</div>
              </div>
              <span className={`badge ${statusMap[job.status]?.className}`}>
                {statusMap[job.status]?.label}
              </span>
            </div>

            {job.salary && (
              <div style={{ fontSize: 12, color: 'var(--success)', marginBottom: 4 }}>💰 {job.salary}</div>
            )}
            {job.nextInterview && (
              <div style={{ fontSize: 12, color: 'var(--info)', marginBottom: 4 }}>📅 下次面试: {job.nextInterview}</div>
            )}
            {job.notes && (
              <div style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: 8 }}>{job.notes}</div>
            )}

            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              <select
                className="input"
                style={{ width: 'auto', padding: '4px 8px', fontSize: 12 }}
                value={job.status}
                onChange={e => updateJob(job.id, { status: e.target.value })}
              >
                <option value="applied">已投递</option>
                <option value="interview">面试中</option>
                <option value="offer">已Offer</option>
                <option value="rejected">未通过</option>
                <option value="accepted">已入职</option>
              </select>
              <button
                className="btn btn-sm btn-secondary"
                onClick={() => { setSelectedJob(job); setNoteForm({ ...noteForm, jobId: job.id, company: job.company }); setShowNoteForm(true) }}
              >
                📝 复盘
              </button>
              <button className="btn btn-sm btn-danger" onClick={() => deleteJob(job.id)}>删除</button>
            </div>
          </div>
        ))
      )}

      {/* Interview Notes */}
      {interviewNotes.length > 0 && (
        <>
          <div className="section-title">面试复盘笔记</div>
          {interviewNotes.slice(-5).reverse().map(note => (
            <div key={note.id} className="card">
              <div style={{ fontSize: 12, color: 'var(--text-secondary)', marginBottom: 4 }}>
                {note.company} · {new Date(note.createdAt).toLocaleDateString()}
              </div>
              <div style={{ fontSize: 13, marginBottom: 4, whiteSpace: 'pre-wrap' }}>{note.content}</div>
              {note.result && (
                <span className={`badge ${note.result === 'pass' ? 'badge-success' : note.result === 'fail' ? 'badge-danger' : 'badge-warning'}`}>
                  {note.result === 'pass' ? '通过' : note.result === 'fail' ? '未通过' : '待定'}
                </span>
              )}
            </div>
          ))}
        </>
      )}

      {/* Add Button */}
      <button className="fab" onClick={() => setShowForm(true)}>+</button>

      {/* Add Job Modal */}
      {showForm && (
        <div className="modal-overlay" onClick={() => setShowForm(false)}>
          <div className="modal-sheet" onClick={e => e.stopPropagation()}>
            <div className="modal-handle" />
            <h3 style={{ marginBottom: 16, fontSize: 16 }}>添加求职投递</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <input className="input" placeholder="公司名称 *" value={form.company} onChange={e => setForm({ ...form, company: e.target.value })} />
              <input className="input" placeholder="岗位名称 *" value={form.position} onChange={e => setForm({ ...form, position: e.target.value })} />
              <input className="input" placeholder="薪资范围 (可选)" value={form.salary} onChange={e => setForm({ ...form, salary: e.target.value })} />
              <input className="input" placeholder="投递链接 (可选)" value={form.url} onChange={e => setForm({ ...form, url: e.target.value })} />
              <input className="input" placeholder="下次面试时间 (可选)" value={form.nextInterview} onChange={e => setForm({ ...form, nextInterview: e.target.value })} />
              <textarea className="input" placeholder="备注" value={form.notes} onChange={e => setForm({ ...form, notes: e.target.value })} />
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
            <h3 style={{ marginBottom: 16, fontSize: 16 }}>面试复盘 - {selectedJob?.company}</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <textarea
                className="input"
                placeholder="面试内容、问题、感受..."
                value={noteForm.content}
                onChange={e => setNoteForm({ ...noteForm, content: e.target.value })}
                style={{ minHeight: 120 }}
              />
              <select
                className="input"
                value={noteForm.result}
                onChange={e => setNoteForm({ ...noteForm, result: e.target.value })}
              >
                <option value="">面试结果</option>
                <option value="pass">通过 ✅</option>
                <option value="fail">未通过 ❌</option>
                <option value="pending">等待结果 ⏳</option>
              </select>
              <button className="btn btn-primary btn-block" onClick={handleAddNote}>保存复盘</button>
              <button className="btn btn-secondary btn-block" onClick={() => setShowNoteForm(false)}>取消</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
