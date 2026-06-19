import { useState, useEffect, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faReact }      from '@fortawesome/free-brands-svg-icons/faReact'
import { faPython }     from '@fortawesome/free-brands-svg-icons/faPython'
import { faJava }       from '@fortawesome/free-brands-svg-icons/faJava'
import { faCss3 }       from '@fortawesome/free-brands-svg-icons'
import { faGit }        from '@fortawesome/free-brands-svg-icons/faGit'
import { faDocker }     from '@fortawesome/free-brands-svg-icons/faDocker'
import './index.scss'

const HEADLINE = 'Building ideas into'

const BOOT_LINES = [
  '> initializing dhyani.soni...',
  '> found: cs student · ai/ml fellow · researcher',
  '> found: tennis · crochet · paint · travel',
  '> found: food · languages · curiosity',
  '> full self: loaded.',
]


const Hero = () => {
  const navigate = useNavigate()
  const [lines, setLines]       = useState([])
  const [bootDone, setBootDone] = useState(false)
  const [visible, setVisible]   = useState(false)
  const booted                  = useRef(false)

  // Guard against React StrictMode double-invoking effects
  useEffect(() => {
    if (booted.current) return
    booted.current = true

    BOOT_LINES.forEach((line, i) => {
      setTimeout(() => {
        setLines(prev => [...prev, line])
        if (i === BOOT_LINES.length - 1) {
          setTimeout(() => {
            setBootDone(true)
            setTimeout(() => setVisible(true), 100)
          }, 400)
        }
      }, i * 520 + 300)
    })
  }, [])

  const scrollTo = id => {
    const el = document.getElementById(id)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section id="hero" className="hero-section">
      <div className="hero-content">

        {/* Boot sequence */}
        <div className="boot-sequence" aria-hidden="true">
          {lines.map((line, i) => (
            <div
              key={i}
              className={`boot-line ${i === lines.length - 1 && !bootDone ? 'typing' : ''}`}
            >
              {line}
            </div>
          ))}
        </div>

        {/* Main headline */}
        <div className={`hero-headline ${visible ? 'visible' : ''}`}>
          <p className="hero-intro-headline">
            Not just a candidate. A full story.
          </p>
          <p className="hero-label">{'> load_full_profile()'}</p>
          <h1>
            {HEADLINE.split('').map((char, i) =>
              char === ' '
                ? <span key={i} className="hero-letter-space">{' '}</span>
                : <span key={i} className="hero-letter">{char}</span>
            )}
            <br />
            <span className="headline-accent">interactive systems.</span>
          </h1>

          <div className="hero-buttons">
            <a
              href="/portfolio/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-terminal"
            >
              <span className="resume-icon">{'▶'}</span>
              {'[ run_resume ]'}
            </a>
            <a
              href="https://github.com/dhy-ani"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-terminal secondary"
            >
              {'[ github ]'}
            </a>
            <button className="btn-terminal secondary" onClick={() => scrollTo('contact')}>
              {'[ send_message ]'}
            </button>
            <button className="btn-terminal blog" onClick={() => navigate('/blogs')}>
              {'[ checkout_blogs ]'}
            </button>
          </div>

          <div className="hero-status">
            <span className="status-dot" />
            <span>status: online</span>
            <span className="status-sep">|</span>
            <span>build progress: initializing</span>
          </div>
        </div>
      </div>

      {/* Spinning cube — system core */}
      <div className={`hero-cube-area ${visible ? 'visible' : ''}`}>
        <p className="cube-label">{'// system_core'}</p>
        <div className="stage-cube-cont">
          <div className="cubespinner">
            <div className="face1"><FontAwesomeIcon icon={faReact} /></div>
            <div className="face2"><FontAwesomeIcon icon={faPython} /></div>
            <div className="face3"><FontAwesomeIcon icon={faJava} /></div>
            <div className="face4"><FontAwesomeIcon icon={faCss3} /></div>
            <div className="face5"><FontAwesomeIcon icon={faDocker} /></div>
            <div className="face6"><FontAwesomeIcon icon={faGit} /></div>
          </div>
        </div>
        <div className="orbit-labels">
          {['Python','Java','JS','React','HTML','CSS','SQL'].map((l, i) => (
            <span key={l} className={`orbit-label ol-${i}`}>{l}</span>
          ))}
        </div>
      </div>

      {/* Scroll hint */}
      <div className="scroll-hint">
        <span>scroll to build</span>
        <div className="scroll-arrow" />
      </div>
    </section>
  )
}

export default Hero
