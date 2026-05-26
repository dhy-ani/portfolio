import NetworkBackground from './components/NetworkBackground'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import SkillNetwork from './components/SkillNetwork'
import Projects from './components/Projects'
import Experience from './components/Experience'
import Contact from './components/Contact'
import BuildProgress from './components/BuildProgress'
import './App.scss'

function App() {
  return (
    <div className="app-root">
      <NetworkBackground />
      <BuildProgress />
      <Navbar />
      <main>
        <Hero />
        <About />
        <SkillNetwork />
        <Projects />
        <Experience />
        <Contact />
      </main>
    </div>
  )
}

export default App
