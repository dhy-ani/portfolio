import { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMoon, faSun, faBookOpen } from '@fortawesome/free-solid-svg-icons'
import './index.scss'

const NAV_LINKS = [
  { label: 'Home',       href: '#hero' },
  { label: 'About',      href: '#about' },
  { label: 'Skills',     href: '#skills' },
  { label: 'Projects',   href: '#projects' },
  { label: 'Experience', href: '#experience' },
  { label: 'Programs',   href: '#programs' },
  { label: 'Contact',    href: '#contact' },
]

const BRAND_LETTERS = 'DHYANI.SONI'.split('')

const Navbar = () => {
  const location   = useLocation()
  const navigate   = useNavigate()
  const isBlog     = location.pathname.startsWith('/blogs')

  const [active,    setActive]    = useState('hero')
  const [scrolled,  setScrolled]  = useState(false)
  const [lightMode, setLightMode] = useState(
    () => localStorage.getItem('theme') !== 'dark'
  )

  useEffect(() => {
    document.body.classList.toggle('light-mode', lightMode)
    localStorage.setItem('theme', lightMode ? 'light' : 'dark')
  }, [lightMode])

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 30)
      const sections = NAV_LINKS.map(l => l.href.slice(1))
      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i])
        if (el && el.getBoundingClientRect().top <= 120) {
          setActive(sections[i])
          break
        }
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const scrollTo = (e, href) => {
    e.preventDefault()
    if (isBlog) {
      // Navigate home first, then let the hash scroll happen
      navigate('/' + href)
      return
    }
    const el = document.getElementById(href.slice(1))
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
      {/* ── Brand ── */}
      <div className="navbar-brand" onClick={() => navigate('/')} role="button" tabIndex={0}>
        <span className="brand-prompt">{'>'}</span>
        <span className="brand-name">
          {BRAND_LETTERS.map((char, i) => (
            <span key={i} className="brand-letter">{char}</span>
          ))}
        </span>
        <span className="brand-cursor">_</span>
      </div>

      {/* ── Nav links — scroll on home, back link on blog ── */}
      {isBlog ? (
        <ul className="navbar-links">
          <li>
            <Link to="/" className="nav-back-link">
              <span className="nav-prompt">{'<'}</span>
              <span className="nav-label">portfolio</span>
            </Link>
          </li>
        </ul>
      ) : (
        <ul className="navbar-links">
          {NAV_LINKS.map(({ label, href }) => (
            <li key={href}>
              <a
                href={href}
                onClick={e => scrollTo(e, href)}
                className={active === href.slice(1) ? 'active' : ''}
              >
                <span className="nav-prompt">{'>'}</span>
                <span className="nav-label">{label}</span>
              </a>
            </li>
          ))}
        </ul>
      )}

      {/* ── Right controls ── */}
      <div className="navbar-right">
        <Link
          to="/blogs"
          className={`blog-tab ${isBlog ? 'active' : ''}`}
        >
          <FontAwesomeIcon icon={faBookOpen} />
          <span>blog</span>
        </Link>

        <button
          className="theme-toggle"
          onClick={() => setLightMode(m => !m)}
          title={lightMode ? 'Switch to dark mode' : 'Switch to light mode'}
        >
          <FontAwesomeIcon icon={lightMode ? faMoon : faSun} />
        </button>
      </div>
    </nav>
  )
}

export default Navbar
