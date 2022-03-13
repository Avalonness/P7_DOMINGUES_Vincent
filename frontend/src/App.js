import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Log from './components/Log/Log'
import StyleGlobal from './utils/styles/StyleGlobal'
import Footer from './components/Footer/index.jsx'
import Home from './pages/Home/index.jsx'
import Post from './pages/Post/index.jsx'
import Profil from './pages/Profil/index.jsx'

function App() {
  return (
    <>
      <Router>
        <StyleGlobal />
        <Routes>
          <Route path="/" element={<Log />} />
          <Route path="/home" element={<Home />} />
          <Route path="/post/:id" element={<Post />} />
          <Route path="/profil/:id" element={<Profil />} />
        </Routes>

        <Footer />
      </Router>
    </>
  )
}

export default App
