import { create } from 'zustand'

const STORAGE_KEY = 'workbench_data'

function loadData() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (raw) return JSON.parse(raw)
  } catch (e) { /* ignore */ }
  return null
}

function saveData(data) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data))
  } catch (e) { /* ignore */ }
}

const defaultData = {
  jobs: [],
  interviewNotes: [],
  creations: [],
  publishSchedule: [],
  english: {
    wordsLearned: [],
    dailyTarget: 20,
    conversations: [],
    recordings: [],
    streak: 0,
    lastPracticeDate: null
  },
  reading: {
    books: [],
    notes: [],
    readingLogs: []
  },
  calligraphy: {
    strokes: [
      { id: 'heng', name: '横', unlocked: true, practiced: 0, completed: false },
      { id: 'shu', name: '竖', unlocked: true, practiced: 0, completed: false },
      { id: 'pie', name: '撇', unlocked: false, practiced: 0, completed: false },
      { id: 'na', name: '捺', unlocked: false, practiced: 0, completed: false },
      { id: 'zhe', name: '折', unlocked: false, practiced: 0, completed: false },
      { id: 'gou', name: '钩', unlocked: false, practiced: 0, completed: false },
      { id: 'dian', name: '点', unlocked: false, practiced: 0, completed: false }
    ],
    practiceLogs: [],
    streak: 0,
    lastPracticeDate: null
  },
  exercise: {
    logs: [],
    streak: 0,
    lastExerciseDate: null,
    weeklyGoal: 4
  },
  todos: [],
  quickNotes: [],
  settings: {
    theme: 'dark',
    reminderTime: '20:00'
  }
}

export const useStore = create((set, get) => ({
  ...defaultData,
  ...(loadData() || {}),

  // Persistence
  _save: () => {
    const state = get()
    const data = {}
    for (const key of Object.keys(defaultData)) {
      data[key] = state[key]
    }
    saveData(data)
  },

  // Jobs
  addJob: (job) => set(s => {
    const jobs = [...s.jobs, { ...job, id: Date.now().toString(), createdAt: new Date().toISOString() }]
    return { jobs }
  }),
  updateJob: (id, updates) => set(s => ({
    jobs: s.jobs.map(j => j.id === id ? { ...j, ...updates } : j)
  })),
  deleteJob: (id) => set(s => ({
    jobs: s.jobs.filter(j => j.id !== id)
  })),

  // Interview notes
  addInterviewNote: (note) => set(s => ({
    interviewNotes: [...s.interviewNotes, { ...note, id: Date.now().toString(), createdAt: new Date().toISOString() }]
  })),
  updateInterviewNote: (id, updates) => set(s => ({
    interviewNotes: s.interviewNotes.map(n => n.id === id ? { ...n, ...updates } : n)
  })),
  deleteInterviewNote: (id) => set(s => ({
    interviewNotes: s.interviewNotes.filter(n => n.id !== id)
  })),

  // Creations
  addCreation: (creation) => set(s => ({
    creations: [...s.creations, { ...creation, id: Date.now().toString(), createdAt: new Date().toISOString(), status: 'draft' }]
  })),
  updateCreation: (id, updates) => set(s => ({
    creations: s.creations.map(c => c.id === id ? { ...c, ...updates } : c)
  })),
  deleteCreation: (id) => set(s => ({
    creations: s.creations.filter(c => c.id !== id)
  })),

  // Publish schedule
  addSchedule: (item) => set(s => ({
    publishSchedule: [...s.publishSchedule, { ...item, id: Date.now().toString() }]
  })),
  updateSchedule: (id, updates) => set(s => ({
    publishSchedule: s.publishSchedule.map(i => i.id === id ? { ...i, ...updates } : i)
  })),
  deleteSchedule: (id) => set(s => ({
    publishSchedule: s.publishSchedule.filter(i => i.id !== id)
  })),

  // English
  addWordsLearned: (words) => set(s => {
    const today = new Date().toISOString().split('T')[0]
    const streak = s.english.lastPracticeDate === today ? s.english.streak : (
      s.english.lastPracticeDate === getYesterday() ? s.english.streak + 1 : 1
    )
    return {
      english: {
        ...s.english,
        wordsLearned: [...s.english.wordsLearned, ...words],
        streak,
        lastPracticeDate: today
      }
    }
  }),
  addConversation: (conv) => set(s => ({
    english: { ...s.english, conversations: [...s.english.conversations, { ...conv, id: Date.now().toString(), createdAt: new Date().toISOString() }] }
  })),
  addRecording: (rec) => set(s => ({
    english: { ...s.english, recordings: [...s.english.recordings, { ...rec, id: Date.now().toString(), createdAt: new Date().toISOString() }] }
  })),
  setEnglishDailyTarget: (target) => set(s => ({
    english: { ...s.english, dailyTarget: target }
  })),

  // Reading
  addBook: (book) => set(s => ({
    reading: { ...s.reading, books: [...s.reading.books, { ...book, id: Date.now().toString(), addedAt: new Date().toISOString() }] }
  })),
  updateBook: (id, updates) => set(s => ({
    reading: { ...s.reading, books: s.reading.books.map(b => b.id === id ? { ...b, ...updates } : b) }
  })),
  deleteBook: (id) => set(s => ({
    reading: { ...s.reading, books: s.reading.books.filter(b => b.id !== id) }
  })),
  addReadingNote: (note) => set(s => ({
    reading: { ...s.reading, notes: [...s.reading.notes, { ...note, id: Date.now().toString(), createdAt: new Date().toISOString() }] }
  })),
  addReadingLog: (log) => set(s => ({
    reading: { ...s.reading, readingLogs: [...s.reading.readingLogs, { ...log, id: Date.now().toString(), date: new Date().toISOString() }] }
  })),

  // Calligraphy
  updateStroke: (id, updates) => set(s => ({
    calligraphy: {
      ...s.calligraphy,
      strokes: s.calligraphy.strokes.map(st => {
        if (st.id !== id) return st
        const updated = { ...st, ...updates }
        if (updated.practiced >= 5 && !updated.completed) updated.completed = true
        if (updated.completed) {
          const idx = s.calligraphy.strokes.findIndex(x => x.id === id)
          if (idx < s.calligraphy.strokes.length - 1) {
            const next = s.calligraphy.strokes[idx + 1]
            // unlock next stroke
            return updated
          }
        }
        return updated
      })
    }
  })),
  unlockNextStroke: () => set(s => {
    const strokes = [...s.calligraphy.strokes]
    const completedCount = strokes.filter(st => st.completed).length
    if (completedCount < strokes.length) {
      strokes[completedCount] = { ...strokes[completedCount], unlocked: true }
    }
    return { calligraphy: { ...s.calligraphy, strokes } }
  }),
  addCalligraphyLog: (log) => set(s => {
    const today = new Date().toISOString().split('T')[0]
    const streak = s.calligraphy.lastPracticeDate === today ? s.calligraphy.streak : (
      s.calligraphy.lastPracticeDate === getYesterday() ? s.calligraphy.streak + 1 : 1
    )
    return {
      calligraphy: {
        ...s.calligraphy,
        practiceLogs: [...s.calligraphy.practiceLogs, { ...log, id: Date.now().toString(), createdAt: new Date().toISOString() }],
        streak,
        lastPracticeDate: today
      }
    }
  }),

  // Exercise
  addExerciseLog: (log) => set(s => {
    const today = new Date().toISOString().split('T')[0]
    const streak = s.exercise.lastExerciseDate === today ? s.exercise.streak : (
      s.exercise.lastExerciseDate === getYesterday() ? s.exercise.streak + 1 : 1
    )
    return {
      exercise: {
        ...s.exercise,
        logs: [...s.exercise.logs, { ...log, id: Date.now().toString(), createdAt: new Date().toISOString() }],
        streak,
        lastExerciseDate: today
      }
    }
  }),
  setWeeklyGoal: (goal) => set(s => ({
    exercise: { ...s.exercise, weeklyGoal: goal }
  })),

  // Todos
  addTodo: (todo) => set(s => ({
    todos: [...s.todos, { ...todo, id: Date.now().toString(), createdAt: new Date().toISOString(), completed: false }]
  })),
  toggleTodo: (id) => set(s => ({
    todos: s.todos.map(t => t.id === id ? { ...t, completed: !t.completed } : t)
  })),
  deleteTodo: (id) => set(s => ({
    todos: s.todos.filter(t => t.id !== id)
  })),

  // Quick Notes
  addNote: (note) => set(s => ({
    quickNotes: [...s.quickNotes, { ...note, id: Date.now().toString(), createdAt: new Date().toISOString() }]
  })),
  updateNote: (id, updates) => set(s => ({
    quickNotes: s.quickNotes.map(n => n.id === id ? { ...n, ...updates } : n)
  })),
  deleteNote: (id) => set(s => ({
    quickNotes: s.quickNotes.filter(n => n.id !== id)
  })),

  // Settings
  updateSettings: (updates) => set(s => ({
    settings: { ...s.settings, ...updates }
  })),

  // Export / Import
  exportData: () => {
    const state = get()
    const data = {}
    for (const key of Object.keys(defaultData)) {
      data[key] = state[key]
    }
    return JSON.stringify(data, null, 2)
  },
  importData: (jsonStr) => {
    try {
      const data = JSON.parse(jsonStr)
      set(data)
      saveData(data)
      return true
    } catch (e) {
      return false
    }
  }
}))

function getYesterday() {
  const d = new Date()
  d.setDate(d.getDate() - 1)
  return d.toISOString().split('T')[0]
}

// Auto-save
useStore.subscribe((state) => {
  const data = {}
  for (const key of Object.keys(defaultData)) {
    data[key] = state[key]
  }
  saveData(data)
})
