import { Routes, Route } from 'react-router-dom'
import NetworkBackground from './components/NetworkBackground'
import Navbar            from './components/Navbar'
import Hero              from './components/Hero'
import About             from './components/About'
import SkillNetwork      from './components/SkillNetwork'
import Projects          from './components/Projects'
import Experience        from './components/Experience'
import Programs          from './components/Programs'
import Contact           from './components/Contact'
import BuildProgress     from './components/BuildProgress'
import Blogs             from './components/Blogs'
import BlogPost          from './components/BlogPost'
import './App.scss'

function App() {
  return (
    <div className="app-root">
      <NetworkBackground />
      <Navbar />
      <Routes>
        <Route path="/" element={
          <>
            <BuildProgress />
            <main>
              <Hero />
              <About />
              <SkillNetwork />
              <Projects />
              <Experience />
              <Programs />
              <Contact />
            </main>
          </>
        } />
        <Route path="/blogs"     element={<Blogs />} />
        <Route path="/blogs/:id" element={<BlogPost />} />
      </Routes>
    </div>
  )
}

export default App
