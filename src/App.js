import { Route, Routes } from 'react-router-dom'
import Home from './components/Home'
import Projects from './components/Projects'
import AboutAndContact from './components/Contact'
import Layout from './components/Layout'
import './App.scss'

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/contact" element={<AboutAndContact />} />
 
        </Route>
      </Routes>
    </>
  )
}

export default App