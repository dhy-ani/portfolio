import { useState, useEffect, useRef } from 'react'
import GraphCanvas from '../GraphCanvas'
import { NODE_TYPES } from '../../data/resumeGraph'
import { TECH_ICON_MAP } from '../../data/techIcons'
import './index.scss'

const PROJECTS = [
  {
    category: 'AI / ML',
    items: [
      {
        title: 'SenseLense',
        badge: '🏆 Best AI Analytics — HackHers',
        desc: 'No one tells you how you actually come across when you pitch — SenseLense does. It watches you live, reads your voice, words, and facial expressions together, and scores your confidence and delivery in real time. Built in 24 hours at HackHers.',
        tech: ['Python', 'SQLite', 'React'],
        links: [
          { label: '> demo', url: 'https://devpost.com/software/saleslense' },
          { label: '< source', url: 'https://github.com/dhy-ani/SenseLense' },
        ],
        highlight: true,
      },
      {
        title: 'AgentWeave',
        desc: 'Most fashion apps recommend what\'s trending — AgentWeave looks at what actually fits you. It reads your body type from a photo first, then matches outfits accordingly. Built because "algorithmically popular" and "genuinely flattering" are almost never the same thing.',
        tech: ['CLIP', 'FAISS', 'YOLOv5', 'Firebase', 'React'],
        links: [
          { label: '> source', url: 'https://github.com/dhy-ani/agentweave' },
        ],
      },
      {
        title: 'Skincare AI Recommender',
        desc: 'Skincare is a guessing game that costs money every time you guess wrong — this cuts the guesswork. Point your webcam at your face, get your skin type classified, and see exactly which part of your face it\'s reading to make that call. Transparent, not just confident.',
        tech: ['PyTorch', 'FastAPI', 'Firebase'],
        links: [
          { label: '> source', url: 'https://github.com/dhy-ani/prana' },
        ],
      },
      {
        title: 'Nexus',
        desc: 'LinkedIn works great if you already have a network — Nexus is built for everyone else. A professional platform for students breaking in, with AI-assisted outreach, a recruiter mode, and conference discovery so you find the right people, not just the most visible ones.',
        tech: ['React', 'Flask', 'SQLite', 'JavaScript'],
        links: [
          { label: '> demo', url: 'https://drive.google.com/file/d/1AkS57aSHBQzu35NG06gR52sXLA4e0DH7/view?usp=sharing' },
          { label: '< source', url: 'https://github.com/krishishah05/linkedin-redesign' },
        ],
        highlight: false,
      },
    ],
  },
  {
    category: 'Full-Stack',
    items: [
      {
        title: 'NoteShare Platform',
        desc: 'Students hoard notes on their drives while classmates struggle through the same material — NoteShare fixes that. Upload, browse, and find course notes organized by subject. Built because a Discord channel full of unnamed PDFs is not a system.',
        tech: ['Spring Boot', 'PostgreSQL', 'AWS S3', 'React'],
        links: [
          { label: '> source', url: 'https://github.com/dhy-ani/note-sharing-platform' },
        ],
      },
      {
        title: 'Tea & Coffee Accessories',
        desc: 'A real e-commerce store, not a tutorial — browse products, manage a cart, and check out with inventory that updates live. Built to understand what it actually takes to ship a working storefront from scratch, not just follow a guide.',
        tech: ['MySQL', 'PHP', 'AJAX', 'JavaScript'],
        links: [
          { label: '> source', url: 'https://github.com/dhy-ani/ds2338-IT202-Project' },
        ],
      },
    ],
  },
]

// ── Card with 3-D flip ───────────────────────────────────────────────
const AssemblyCard = ({ title, badge, desc, tech, links = [], highlight = false, delay = 0 }) => {
  const ref = useRef(null)
  const [stage, setStage]   = useState(0)
  const [flipped, setFlipped] = useState(false)

  // 4-stage scroll-triggered assembly animation
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => setStage(1), delay)
          setTimeout(() => setStage(2), delay + 280)
          setTimeout(() => setStage(3), delay + 520)
          setTimeout(() => setStage(4), delay + 760)
          obs.unobserve(el)
        }
      },
      { threshold: 0.12 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [delay])

  return (
    <div
      ref={ref}
      className={`assembly-card stage-${stage} ${highlight ? 'highlight' : ''}`}
      onClick={() => setFlipped(f => !f)}
      title={flipped ? 'Click to flip back' : 'Click to explore knowledge graph'}
    >
      <div className={`card-inner ${flipped ? 'flipped' : ''}`}>

        {/* ── Front face ── */}
        <div className="card-front">
          <div className="card-front-bar" />
          {badge && <div className="card-badge">{badge}</div>}
          <div className="card-title-row">
            <h3 className="card-title">{title}</h3>
          </div>
          <p className="card-desc">{desc}</p>
          <div className="card-tech">
            {tech.map(t => {
              const Icon = TECH_ICON_MAP[t]
              return (
                <span key={t} className="tech-tag">
                  {Icon && <Icon className="tech-icon" aria-hidden="true" />}
                  {t}
                </span>
              )
            })}
          </div>
          <div className="card-footer">
            <div className="card-links">
              {links.map(({ label, url }) => (
                <a
                  key={label}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="card-link"
                  onClick={e => e.stopPropagation()}
                >
                  {label}
                </a>
              ))}
            </div>
            <span className="card-flip-hint">flip for graph ↩</span>
          </div>
        </div>

        {/* ── Back face — interactive knowledge graph ── */}
        <div className="card-back">
          <div className="card-back-header">
            <span className="card-back-title">{'> '}{title}</span>
            <span className="card-back-hint">drag nodes · click to flip</span>
          </div>

          {/* Only mount GraphCanvas when flipped (saves CPU for all other cards) */}
          <div className="card-back-canvas">
            {flipped && <GraphCanvas graphKey={title} />}
          </div>

          <div className="card-back-legend">
            {Object.entries(NODE_TYPES).map(([type, { color }]) => (
              <span key={type} className="legend-item">
                <span className="legend-dot" style={{ background: color }} />
                {type}
              </span>
            ))}
          </div>
        </div>

      </div>
    </div>
  )
}

// ── Section ──────────────────────────────────────────────────────────
const Projects = () => {
  const titleRef = useRef(null)

  useEffect(() => {
    const el = titleRef.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) { el.classList.add('scroll-revealed'); obs.unobserve(el) }
      },
      { threshold: 0.2 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  return (
    <section id="projects" className="projects-section section">
      <div className="section-inner">
        <div className="terminal-label">&gt; assemble_projects()</div>

        <div ref={titleRef} className="scroll-reveal">
          <h2 className="section-title">Projects Assembled</h2>
          <p className="section-sub-meta">
            projects rendered: {PROJECTS.reduce((a, c) => a + c.items.length, 0)} · click any card to explore its knowledge graph
          </p>
        </div>

        {PROJECTS.map(({ category, items }) => (
          <div key={category} className="project-group">
            <div className="group-label">
              <span className="group-slash">{'// '}</span>{category}
            </div>
            <div className="project-grid">
              {items.map((p, i) => (
                <AssemblyCard key={p.title} {...p} delay={i * 100} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

export default Projects
