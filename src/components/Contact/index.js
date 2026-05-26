import { useRef, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faGithub }   from '@fortawesome/free-brands-svg-icons/faGithub'
import { faLinkedin } from '@fortawesome/free-brands-svg-icons/faLinkedin'
import { faEnvelope } from '@fortawesome/free-solid-svg-icons'
import './index.scss'

const LINKS = [
  { icon: faEnvelope,  label: 'email_me',   href: 'mailto:dhyanisoni05@gmail.com', color: '#28f0f0' },
  { icon: faGithub,    label: 'github',      href: 'https://github.com/dhy-ani',    color: '#ffffff' },
  { icon: faLinkedin,  label: 'linkedin',    href: 'https://www.linkedin.com/in/dhyani-soni', color: '#0a66c2' },
]

const RevealBlock = ({ children, delay = 0 }) => {
  const ref = useRef(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) { el.classList.add('scroll-revealed'); obs.unobserve(el) }
      },
      { threshold: 0.15 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])
  return (
    <div ref={ref} className="scroll-reveal" style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </div>
  )
}

const Contact = () => (
  <section id="contact" className="contact-section section">
    <div className="section-inner contact-inner">

      <RevealBlock delay={0}>
        <div className="terminal-label">&gt; open_contact_channel()</div>
        <h2 className="section-title">Open Contact Channel</h2>
        <p className="contact-sub">
          Have an opportunity, idea, or project in mind? Let's connect.
        </p>
      </RevealBlock>

      <RevealBlock delay={200}>
        <div className="contact-links">
          {LINKS.map(({ icon, label, href, color }) => (
            <a
              key={label}
              href={href}
              className="contact-btn"
              target="_blank"
              rel="noopener noreferrer"
            >
              <FontAwesomeIcon icon={icon} style={{ color }} />
              <span>{`[ ${label} ]`}</span>
            </a>
          ))}
          <a
            href="/portfolio/resume.pdf"
            className="contact-btn"
            target="_blank"
            rel="noopener noreferrer"
          >
            <span className="resume-icon">{'▶'}</span>
            <span>{'[ run_resume ]'}</span>
          </a>
        </div>
      </RevealBlock>

      <RevealBlock delay={400}>
        <div className="final-command">
          <span className="final-prompt">&gt; </span>
          <span className="final-text">ready_for_next_opportunity</span>
          <span className="final-cursor">█</span>
        </div>
        <p className="final-sub">system build complete</p>
      </RevealBlock>

    </div>
  </section>
)

export default Contact
