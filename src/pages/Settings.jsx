import { useState } from 'react'
import { useStore } from '../stores/useStore'

export default function Settings() {
  const { settings, updateSettings, exportData, importData } = useStore()
  const [importText, setImportText] = useState('')
  const [showImport, setShowImport] = useState(false)
  const [message, setMessage] = useState('')

  const handleExport = () => {
    const data = exportData()
    const blob = new Blob([data], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `workbench-backup-${new Date().toISOString().split('T')[0]}.json`
    a.click()
    URL.revokeObjectURL(url)
    showMessage('数据已导出')
  }

  const handleImport = () => {
    const success = importData(importText)
    if (success) {
      showMessage('数据导入成功！刷新后生效。')
      setShowImport(false)
      setImportText('')
    } else {
      showMessage('导入失败，请检查数据格式')
    }
  }

  const showMessage = (msg) => {
    setMessage(msg)
    setTimeout(() => setMessage(''), 2000)
  }

  const handleClearData = () => {
    if (confirm('确定要清除所有数据吗？此操作不可恢复！建议先导出备份。')) {
      localStorage.clear()
      window.location.reload()
    }
  }

  return (
    <div>
      {message && <div className="toast">{message}</div>}

      {/* Data Management */}
      <div className="section-title">数据管理</div>
      <div className="card">
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          <button className="btn btn-primary btn-block" onClick={handleExport}>
            📤 导出数据备份
          </button>
          <button className="btn btn-secondary btn-block" onClick={() => setShowImport(true)}>
            📥 导入数据
          </button>
          <button className="btn btn-danger btn-block" onClick={handleClearData}>
            🗑️ 清除所有数据
          </button>
        </div>
        <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 8, textAlign: 'center' }}>
          数据存储在浏览器本地，建议定期导出备份
        </div>
      </div>

      {/* Theme */}
      <div className="section-title">外观</div>
      <div className="card">
        <div style={{ display: 'flex', gap: 8 }}>
          {['dark', 'light'].map(t => (
            <button
              key={t}
              className={`btn btn-sm ${settings.theme === t ? 'btn-primary' : 'btn-secondary'}`}
              onClick={() => updateSettings({ theme: t })}
              style={{ flex: 1 }}
            >
              {t === 'dark' ? '🌙 深色' : '☀️ 浅色'}
            </button>
          ))}
        </div>
        <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 8 }}>
          当前仅深色模式可用（浅色后续更新）
        </div>
      </div>

      {/* About */}
      <div className="section-title">关于</div>
      <div className="card">
        <div style={{ textAlign: 'center', fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.8 }}>
          <div style={{ fontSize: 16, fontWeight: 700, color: 'var(--accent-light)', marginBottom: 4 }}>我的工作台 v1.0</div>
          <div>一个专注于深度学习的私人工作台</div>
          <div style={{ marginTop: 8 }}>
            求职 · 创作 · 英语 · 读书 · 书法 · 运动
          </div>
          <div style={{ marginTop: 8, fontSize: 11, color: 'var(--text-muted)' }}>
            数据纯本地存储 · 无服务器 · 隐私安全
          </div>
        </div>
      </div>

      {/* Tips */}
      <div className="card" style={{ background: 'rgba(108,99,255,0.08)' }}>
        <div style={{ fontSize: 13, lineHeight: 1.8 }}>
          <div style={{ fontWeight: 600, marginBottom: 4 }}>💡 使用技巧</div>
          <div>• 点击首页统计卡片可快速跳转各模块</div>
          <div>• 英语对话支持语音输入（需 Chrome 浏览器）</div>
          <div>• 书法模块支持拍照上传练习作品</div>
          <div>• 添加为桌面 PWA 可获得类 App 体验</div>
          <div>• 定期导出 JSON 文件备份你的数据</div>
        </div>
      </div>

      {/* Import Modal */}
      {showImport && (
        <div className="modal-overlay" onClick={() => setShowImport(false)}>
          <div className="modal-sheet" onClick={e => e.stopPropagation()}>
            <div className="modal-handle" />
            <h3 style={{ marginBottom: 16, fontSize: 16 }}>导入数据</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              <textarea
                className="input"
                placeholder="粘贴之前导出的 JSON 数据..."
                value={importText}
                onChange={e => setImportText(e.target.value)}
                style={{ minHeight: 150, fontFamily: 'monospace', fontSize: 12 }}
              />
              <button className="btn btn-primary btn-block" onClick={handleImport}>导入</button>
              <button className="btn btn-secondary btn-block" onClick={() => setShowImport(false)}>取消</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
