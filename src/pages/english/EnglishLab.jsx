import { useState, useRef, useEffect, useCallback } from 'react'
import { useStore } from '../../stores/useStore'
import { wordBank, conversationTopics, pronunciationTips } from '../../data/englishData'

export default function EnglishLab() {
  const { english, addWordsLearned, addConversation, addRecording, setEnglishDailyTarget } = useStore()
  const [tab, setTab] = useState('words')
  const today = new Date().toISOString().split('T')[0]
  const todayCount = english.wordsLearned.filter(w => w.date === today).length

  return (
    <div>
      {/* Streak Banner */}
      <div className="card" style={{ background: 'linear-gradient(135deg, rgba(108,99,255,0.15), rgba(56,189,248,0.1))' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <div style={{ fontSize: 14, fontWeight: 600 }}>🔥 连续学习 {english.streak} 天</div>
            <div style={{ fontSize: 12, color: 'var(--text-secondary)' }}>
              今日: {todayCount}/{english.dailyTarget} 词
            </div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div className="progress-bar" style={{ width: 100, marginBottom: 4 }}>
              <div className="progress-fill info" style={{ width: `${Math.min(100, (todayCount / english.dailyTarget) * 100)}%` }} />
            </div>
            <button className="btn btn-sm btn-secondary" onClick={() => {
              const t = prompt('每日目标单词数:', String(english.dailyTarget))
              if (t && !isNaN(Number(t))) setEnglishDailyTarget(Number(t))
            }}>调整目标</button>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: 8, marginBottom: 16, overflowX: 'auto', paddingBottom: 4 }}>
        {[
          { key: 'words', label: '📖 背单词' },
          { key: 'speak', label: '🎤 口语对话' },
          { key: 'shadow', label: '🎧 跟读练习' },
          { key: 'tips', label: '💡 发音技巧' },
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

      {tab === 'words' && <WordStudy todayCount={todayCount} dailyTarget={english.dailyTarget} onComplete={addWordsLearned} />}
      {tab === 'speak' && <SpeakingPractice onSave={addConversation} />}
      {tab === 'shadow' && <ShadowPractice onSave={addRecording} />}
      {tab === 'tips' && <PronunciationTips />}
    </div>
  )
}

function WordStudy({ todayCount, dailyTarget, onComplete }) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [showMeaning, setShowMeaning] = useState(false)
  const [completed, setCompleted] = useState([])
  const [topic, setTopic] = useState('all')

  const topics = ['all', ...new Set(wordBank.map(w => w.topic))]
  const filtered = topic === 'all' ? wordBank : wordBank.filter(w => w.topic === topic)
  const word = filtered[currentIndex % filtered.length]

  const handleKnow = () => {
    setShowMeaning(false)
    setCompleted([...completed, word.word])
    setCurrentIndex(prev => (prev + 1) % filtered.length)
    if (completed.length + 1 >= dailyTarget - todayCount) {
      const today = new Date().toISOString().split('T')[0]
      const newWords = [...completed, word.word].map(w => ({ word: w, date: today }))
      onComplete(newWords)
    }
  }

  const handleDontKnow = () => {
    setShowMeaning(!showMeaning)
  }

  const handleNext = () => {
    setShowMeaning(false)
    setCurrentIndex(prev => (prev + 1) % filtered.length)
  }

  return (
    <div>
      <div style={{ display: 'flex', gap: 8, marginBottom: 12, overflowX: 'auto', paddingBottom: 4 }}>
        {topics.map(t => (
          <button
            key={t}
            className={`btn btn-sm ${topic === t ? 'btn-primary' : 'btn-secondary'}`}
            onClick={() => { setTopic(t); setCurrentIndex(0) }}
          >
            {t === 'all' ? '全部' : t === 'daily' ? '日常' : t === 'career' ? '职场' : t === 'tech' ? '技术' : t === 'communication' ? '沟通' : t === 'academic' ? '学术' : t === 'media' ? '媒体' : t === 'health' ? '健康' : t === 'emotion' ? '情感' : t}
          </button>
        ))}
      </div>

      {word && (
        <div className="card" style={{ textAlign: 'center', padding: 24 }}>
          <div style={{ fontSize: 28, fontWeight: 700, marginBottom: 8 }}>{word.word}</div>
          <div style={{ fontSize: 14, color: 'var(--text-secondary)', marginBottom: 16 }}>{word.phonetic}</div>

          {showMeaning && (
            <div style={{ animation: 'fadeIn 0.3s ease' }}>
              <div style={{ fontSize: 16, color: 'var(--accent-light)', marginBottom: 8 }}>{word.meaning}</div>
              <div style={{ fontSize: 13, color: 'var(--text-secondary)', fontStyle: 'italic', marginBottom: 12 }}>
                "{word.example}"
              </div>
            </div>
          )}

          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', marginTop: 16 }}>
            {!showMeaning ? (
              <>
                <button className="btn btn-danger" onClick={handleDontKnow} style={{ flex: 1 }}>不认识</button>
                <button className="btn btn-success" onClick={handleKnow} style={{ flex: 1 }}>认识</button>
              </>
            ) : (
              <>
                <button className="btn btn-danger" onClick={handleNext} style={{ flex: 1 }}>下一个</button>
                <button className="btn btn-success" onClick={handleKnow} style={{ flex: 1 }}>已记住 ✓</button>
              </>
            )}
          </div>
        </div>
      )}

      <div style={{ textAlign: 'center', fontSize: 12, color: 'var(--text-muted)', marginTop: 8 }}>
        今日已学: {todayCount + completed.length} / {dailyTarget}
      </div>
    </div>
  )
}

function SpeakingPractice({ onSave }) {
  const [messages, setMessages] = useState([
    { role: 'ai', text: 'Hi! I\'m your English speaking partner. What would you like to talk about today?' }
  ])
  const [input, setInput] = useState('')
  const [isListening, setIsListening] = useState(false)
  const [selectedTopic, setSelectedTopic] = useState(null)
  const recognitionRef = useRef(null)
  const synthRef = useRef(window.speechSynthesis)

  const speakText = useCallback((text) => {
    if (!synthRef.current) return
    synthRef.current.cancel()
    const utterance = new SpeechSynthesisUtterance(text)
    utterance.lang = 'en-US'
    utterance.rate = 0.9
    synthRef.current.speak(utterance)
  }, [])

  const startListening = useCallback(() => {
    if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
      setMessages(prev => [...prev, { role: 'system', text: '⚠️ 你的浏览器不支持语音识别，请使用 Chrome 浏览器，或切换到打字模式。' }])
      return
    }
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
    const recognition = new SpeechRecognition()
    recognition.lang = 'en-US'
    recognition.interimResults = false
    recognition.continuous = false

    recognition.onstart = () => setIsListening(true)
    recognition.onend = () => setIsListening(false)
    recognition.onresult = (event) => {
      const text = event.results[0][0].transcript
      setMessages(prev => [...prev, { role: 'user', text }])
      generateAIResponse(text)
    }
    recognition.onerror = () => {
      setIsListening(false)
      setMessages(prev => [...prev, { role: 'system', text: '语音识别出错，请重试或切换到打字模式。' }])
    }

    recognitionRef.current = recognition
    recognition.start()
  }, [])

  const generateAIResponse = useCallback((userText) => {
    // Simple response generation based on keywords
    const lower = userText.toLowerCase()
    let response = ''

    if (lower.includes('hello') || lower.includes('hi')) {
      response = 'Hello! How are you doing today?'
    } else if (lower.includes('name')) {
      response = 'My name is AI Tutor. What\'s your name?'
    } else if (lower.includes('job') || lower.includes('work')) {
      response = 'That sounds interesting! What do you enjoy most about your work?'
    } else if (lower.includes('hobby') || lower.includes('like')) {
      response = 'That\'s great! How often do you do that?'
    } else if (lower.includes('english') || lower.includes('learn')) {
      response = 'You\'re doing great! Practice makes perfect. What aspect of English do you find most challenging?'
    } else if (lower.includes('food') || lower.includes('eat')) {
      response = 'Sounds delicious! What\'s your favorite cuisine?'
    } else if (lower.includes('travel') || lower.includes('visit')) {
      response = 'Traveling is wonderful! Where would you like to go next?'
    } else if (lower.includes('weather')) {
      response = 'The weather can really affect our mood, don\'t you think? What\'s your favorite season?'
    } else if (lower.includes('movie') || lower.includes('film') || lower.includes('watch')) {
      response = 'I\'d love to hear about it! What genre do you prefer?'
    } else if (lower.includes('music') || lower.includes('song')) {
      response = 'Music is a universal language! What kind of music do you listen to?'
    } else if (lower.includes('sport') || lower.includes('exercise')) {
      response = 'Staying active is important! What\'s your favorite way to exercise?'
    } else if (lower.includes('book') || lower.includes('read')) {
      response = 'Reading is a great habit! What book are you reading right now?'
    } else if (lower.includes('thank')) {
      response = 'You\'re welcome! Keep up the good work!'
    } else if (lower.includes('sorry')) {
      response = 'No worries at all! Let\'s continue practicing.'
    } else {
      const genericResponses = [
        'That\'s interesting! Can you tell me more about that?',
        'I see! How does that make you feel?',
        'Great point! What do you think about that?',
        'Could you elaborate on that a bit more?',
        'That\'s a good topic! What else comes to mind?',
        'Interesting perspective! Why do you think that is?',
        'I understand. Has this always been the case?',
      ]
      response = genericResponses[Math.floor(Math.random() * genericResponses.length)]
    }

    setTimeout(() => {
      setMessages(prev => [...prev, { role: 'ai', text: response }])
      speakText(response)
    }, 500)
  }, [speakText])

  const handleSend = () => {
    if (!input.trim()) return
    setMessages(prev => [...prev, { role: 'user', text: input }])
    generateAIResponse(input)
    setInput('')
  }

  const handleTopicSelect = (topic) => {
    setSelectedTopic(topic)
    const question = topic.questions[Math.floor(Math.random() * topic.questions.length)]
    setMessages(prev => [...prev, { role: 'ai', text: `Let's talk about "${topic.title}". ${question}` }])
    speakText(`Let's talk about ${topic.title}. ${question}`)
  }

  const handleSave = () => {
    onSave({ topic: selectedTopic?.title || '自由对话', messages })
    alert('对话已保存！')
  }

  return (
    <div>
      {/* Topic Selection */}
      <div className="section-title">选择话题</div>
      <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', marginBottom: 12 }}>
        {conversationTopics.map(t => (
          <button
            key={t.title}
            className={`btn btn-sm ${selectedTopic?.title === t.title ? 'btn-primary' : 'btn-secondary'}`}
            onClick={() => handleTopicSelect(t)}
          >
            {t.title}
          </button>
        ))}
      </div>

      {/* Chat Area */}
      <div style={{
        background: 'var(--bg-card)',
        borderRadius: 'var(--radius)',
        border: '1px solid var(--border)',
        padding: 12,
        minHeight: 300,
        maxHeight: 400,
        overflowY: 'auto',
        marginBottom: 12,
      }}>
        {messages.map((msg, i) => (
          <div
            key={i}
            style={{
              marginBottom: 10,
              display: 'flex',
              justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start',
            }}
          >
            <div style={{
              maxWidth: '80%',
              padding: '8px 14px',
              borderRadius: 16,
              fontSize: 13,
              lineHeight: 1.5,
              background: msg.role === 'user' ? 'var(--accent)' :
                          msg.role === 'system' ? 'rgba(248,113,113,0.15)' :
                          'var(--bg-hover)',
              color: msg.role === 'system' ? 'var(--danger)' : 'var(--text-primary)',
            }}>
              {msg.text}
              {msg.role === 'ai' && (
                <button
                  onClick={() => speakText(msg.text)}
                  style={{ marginLeft: 8, background: 'none', border: 'none', cursor: 'pointer', fontSize: 14 }}
                >
                  🔊
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Input Area */}
      <div style={{ display: 'flex', gap: 8 }}>
        <input
          className="input"
          placeholder="打字输入..."
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && handleSend()}
          style={{ flex: 1 }}
        />
        <button className="btn btn-primary" onClick={handleSend} style={{ padding: '10px 14px' }}>发送</button>
        <button
          className={`btn ${isListening ? 'btn-danger' : 'btn-secondary'}`}
          onClick={startListening}
          style={{ padding: '10px 14px', fontSize: 20 }}
        >
          {isListening ? '⏺️' : '🎤'}
        </button>
      </div>

      <div style={{ marginTop: 8, display: 'flex', gap: 8 }}>
        <button className="btn btn-sm btn-secondary" onClick={handleSave}>💾 保存对话</button>
      </div>
    </div>
  )
}

function ShadowPractice({ onSave }) {
  const [sentences] = useState([
    { text: 'The quick brown fox jumps over the lazy dog.', level: 'beginner' },
    { text: 'I would like to improve my English speaking skills.', level: 'beginner' },
    { text: 'Could you tell me how to get to the nearest subway station?', level: 'beginner' },
    { text: 'She has been working on this project for three months.', level: 'intermediate' },
    { text: 'What would you do if you had more free time?', level: 'intermediate' },
    { text: 'The most important thing is to never give up on your dreams.', level: 'intermediate' },
    { text: 'I\'ve been thinking about changing my career path recently.', level: 'intermediate' },
    { text: 'Would you mind explaining that in a different way?', level: 'intermediate' },
    { text: 'The technology industry is evolving at an unprecedented pace.', level: 'advanced' },
    { text: 'Despite the challenges, we managed to complete the project ahead of schedule.', level: 'advanced' },
  ])
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isRecording, setIsRecording] = useState(false)
  const [recordings, setRecordings] = useState([])
  const [feedback, setFeedback] = useState('')
  const mediaRecorderRef = useRef(null)
  const chunksRef = useRef([])

  const sentence = sentences[currentIndex]

  const playStandard = () => {
    const utterance = new SpeechSynthesisUtterance(sentence.text)
    utterance.lang = 'en-US'
    utterance.rate = 0.85
    window.speechSynthesis.speak(utterance)
  }

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      const mediaRecorder = new MediaRecorder(stream)
      mediaRecorderRef.current = mediaRecorder
      chunksRef.current = []

      mediaRecorder.ondataavailable = (e) => chunksRef.current.push(e.data)
      mediaRecorder.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: 'audio/webm' })
        const url = URL.createObjectURL(blob)
        setRecordings(prev => [...prev, { url, text: sentence.text, date: new Date().toISOString() }])
        stream.getTracks().forEach(t => t.stop())
        generateFeedback()
      }

      mediaRecorder.start()
      setIsRecording(true)
    } catch (e) {
      alert('无法访问麦克风，请检查权限设置。')
    }
  }

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop()
      setIsRecording(false)
    }
  }

  const generateFeedback = () => {
    const tips = [
      '注意 "th" 的发音，舌尖要轻触上齿。',
      '尝试连读：辅音结尾的词和元音开头的词要连在一起读。',
      '注意语调：陈述句结尾降调，一般疑问句结尾升调。',
      '重读实词（名词、动词、形容词），弱读虚词（冠词、介词）。',
      '注意词尾 "-ed" 的发音，根据前一个音决定读 /t/, /d/ 还是 /ɪd/。',
      '保持语速均匀，不要因为紧张而越读越快。',
      '注意 /l/ 和 /r/ 的区别：/l/ 舌尖顶上颚，/r/ 舌尖卷起不接触。',
      '注意长元音和短元音的区别，如 ship 和 sheep。',
      '"r" 在美式英语中要卷舌发音。',
    ]
    const randomTips = tips.sort(() => Math.random() - 0.5).slice(0, 3)
    setFeedback(randomTips.join('\n\n'))
  }

  const handleSaveRecording = () => {
    if (recordings.length > 0) {
      const last = recordings[recordings.length - 1]
      onSave({ text: last.text, url: last.url })
      alert('录音已保存！')
    }
  }

  return (
    <div>
      <div className="card" style={{ textAlign: 'center', padding: 20 }}>
        <div style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: 8 }}>
          难度: {sentence.level} · {currentIndex + 1}/{sentences.length}
        </div>
        <div style={{ fontSize: 18, fontWeight: 600, marginBottom: 16, lineHeight: 1.6 }}>
          {sentence.text}
        </div>

        <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
          <button className="btn btn-info" onClick={playStandard}>🔊 播放标准音</button>
          {!isRecording ? (
            <button className="btn btn-primary" onClick={startRecording}>🎙️ 开始跟读</button>
          ) : (
            <button className="btn btn-danger" onClick={stopRecording}>⏹️ 停止录音</button>
          )}
        </div>

        {isRecording && (
          <div style={{ marginTop: 12, color: 'var(--danger)', fontSize: 14, animation: 'pulse 1s infinite' }}>
            ⏺️ 正在录音...请跟读上面的句子
          </div>
        )}
      </div>

      {/* Feedback */}
      {feedback && (
        <div className="card" style={{ marginTop: 12 }}>
          <div className="card-title" style={{ marginBottom: 8 }}>📊 发音反馈</div>
          <div style={{ fontSize: 13, color: 'var(--text-secondary)', whiteSpace: 'pre-wrap', lineHeight: 1.8 }}>
            {feedback}
          </div>
        </div>
      )}

      {/* Recordings */}
      {recordings.length > 0 && (
        <div style={{ marginTop: 12 }}>
          <div className="section-title">我的录音</div>
          {recordings.map((r, i) => (
            <div key={i} className="card">
              <div style={{ fontSize: 13, marginBottom: 8 }}>{r.text}</div>
              <audio controls src={r.url} style={{ width: '100%', height: 36 }} />
              <div style={{ fontSize: 11, color: 'var(--text-muted)', marginTop: 4 }}>
                {new Date(r.date).toLocaleString()}
              </div>
            </div>
          ))}
          <button className="btn btn-sm btn-primary" onClick={handleSaveRecording}>💾 保存录音</button>
        </div>
      )}

      {/* Navigation */}
      <div style={{ display: 'flex', gap: 8, justifyContent: 'center', marginTop: 12 }}>
        <button className="btn btn-sm btn-secondary" onClick={() => setCurrentIndex(Math.max(0, currentIndex - 1))}>
          ← 上一句
        </button>
        <button className="btn btn-sm btn-secondary" onClick={() => setCurrentIndex(Math.min(sentences.length - 1, currentIndex + 1))}>
          下一句 →
        </button>
      </div>
    </div>
  )
}

function PronunciationTips() {
  const [activeSection, setActiveSection] = useState('common')

  return (
    <div>
      <div style={{ display: 'flex', gap: 8, marginBottom: 12 }}>
        <button className={`btn btn-sm ${activeSection === 'common' ? 'btn-primary' : 'btn-secondary'}`} onClick={() => setActiveSection('common')}>
          基础技巧
        </button>
        <button className={`btn btn-sm ${activeSection === 'difficult' ? 'btn-primary' : 'btn-secondary'}`} onClick={() => setActiveSection('difficult')}>
          难点突破
        </button>
      </div>

      {(activeSection === 'common' ? pronunciationTips.common : pronunciationTips.difficult).map((tip, i) => (
        <div key={i} className="card">
          <div style={{ fontWeight: 600, fontSize: 14, marginBottom: 6 }}>{tip.tip}</div>
          <div style={{ fontSize: 13, color: 'var(--text-secondary)', lineHeight: 1.6 }}>{tip.desc}</div>
        </div>
      ))}
    </div>
  )
}
