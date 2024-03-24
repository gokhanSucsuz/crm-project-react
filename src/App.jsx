import './App.css'
import Navbar from './components/Navbar'
import { Routes, Route } from "react-router-dom"
import Home from './pages/Home'
import ListDetail from './pages/ListDetail'

function App() {

  return (
    <>
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/list-detail' element={<ListDetail />} />
      </Routes>
    </>
  )
}

export default App
