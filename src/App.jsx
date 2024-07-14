import { useState } from 'react'
import './App.css'
import Navbar from './componentes/Navbar'
import Manager from './componentes/Manager'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Navbar/>
      <Manager/>
    </>
  )
}

export default App
