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
        desc: 'Real-time multimodal sentiment analysis pipeline for sales pitch evaluation with live scoring and feedback.',
        tech: ['Python', 'SQLite', 'React'],
        links: [
          { label: '> demo', url: 'https://devpost.com/software/saleslense' },
          { label: '< source', url: 'https://github.com/dhy-ani/SenseLense' },
        ],
        highlight: true,
      },
      {
        title: 'AgentWeave',
        desc: 'AI fashion recommender using CLIP/BLIP embeddings, FAISS clustering, and YOLO body-type matching.',
        tech: ['CLIP', 'FAISS', 'YOLOv5', 'Firebase', 'React'],
        links: [
          { label: '> source', url: 'https://github.com/dhy-ani/agentweave' },
        ],
      },
      {
        title: 'Skincare AI Recommender',
        desc: 'CNN-based skincare classifier with Grad-CAM explainability, FastAPI backend, and webcam input for live suggestions.',
        tech: ['PyTorch', 'FastAPI', 'Firebase'],
        links: [
          { label: '> source', url: 'https://github.com/dhy-ani/prana' },
        ],
      },
      {
        title: 'Nexus',
        desc: 'LinkedIn-style full-stack app with Flask REST API, AI-powered outreach guidance, recruiter mode, conference discovery, and WCAG-compliant keyboard navigation. 96% backend route coverage.',
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
        desc: 'Full-stack academic note-sharing app with JWT auth, Spring Boot API, and AWS S3 file storage.',
        tech: ['Spring Boot', 'PostgreSQL', 'AWS S3', 'React'],
        links: [
          { label: '> source', url: 'https://github.com/dhy-ani/note-sharing-platform' },
        ],
      },
      {
        title: 'Tea & Coffee Accessories',
        desc: 'E-commerce store with CRUD operations, AJAX live inventory updates, and SQL injection protection.',
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
