import { Routes, Route, useLocation } from 'react-router-dom'
import { useEffect, useState } from 'react'
import NavBar from './components/layout/NavBar'
import Dashboard from './pages/dashboard/Dashboard'
import JobTracker from './pages/job/JobTracker'
import CreationHub from './pages/creation/CreationHub'
import EnglishLab from './pages/english/EnglishLab'
import ReadingRoom from './pages/reading/ReadingRoom'
import CalligraphyDojo from './pages/calligraphy/CalligraphyDojo'
import ExerciseTracker from './pages/exercise/ExerciseTracker'
import TodoNotes from './pages/todo/TodoNotes'
import Settings from './pages/Settings'

const pageTitles = {
  '/': '工作台',
  '/job': '求职',
  '/creation': '创作',
  '/english': '英语',
  '/reading': '读书',
  '/calligraphy': '书法',
  '/exercise': '运动',
  '/todo': '待办',
  '/settings': '设置'
}

export default function App() {
  const location = useLocation()
  const [title, setTitle] = useState('工作台')

  useEffect(() => {
    setTitle(pageTitles[location.pathname] || '工作台')
  }, [location.pathname])

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>{title}</h1>
        <div style={{ width: 32 }} />
      </header>

      <main className="app-content">
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/job" element={<JobTracker />} />
          <Route path="/creation" element={<CreationHub />} />
          <Route path="/english" element={<EnglishLab />} />
          <Route path="/reading" element={<ReadingRoom />} />
          <Route path="/calligraphy" element={<CalligraphyDojo />} />
          <Route path="/exercise" element={<ExerciseTracker />} />
          <Route path="/todo" element={<TodoNotes />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </main>

      <NavBar />
    </div>
  )
}
