import { useState } from 'react'
import './App.css'
import Dashboard from './pages/dashboard'
import Sidebar from './components/sidebar'


function App() {
  const [count, setCount] = useState(0)

  return (
    <Dashboard />
  )
}

export default App
