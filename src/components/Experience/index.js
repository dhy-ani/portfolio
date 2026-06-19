import { useState, useRef, useEffect } from 'react'
import GraphCanvas from '../GraphCanvas'
import { NODE_TYPES } from '../../data/resumeGraph'
import { TECH_ICON_MAP } from '../../data/techIcons'
import './index.scss'

const ROLES = [
  {
    title: 'Agentic AI Engineering Intern',
    company: 'Tata Consultancy Services',
    org: 'TCS',
    period: 'May 2026 – Aug 2026',
    color: '#7dd3fc',
    badge: 'Industry Internship · Incoming',
    skills: ['Python', 'AWS Bedrock', 'Lambda', 'DynamoDB', 'Terraform', 'AI Agents'],
    metrics: [
      { value: '20pt', label: 'QA Checklist' },
      { value: 'AWS', label: 'Serverless' },
    ],
    points: [
      'Designing a multi-step AI agent on AWS Bedrock that validates stored procedure outputs against a 20-point requirements report checklist, flagging data inaccuracies and automating a previously manual QA process.',
      'Architecting serverless infrastructure using Lambda, API Gateway, S3, DynamoDB, and Terraform to support scalable cloud deployments.',
    ],
  },
  {
    title: 'AI & Machine Learning Fellow',
    company: 'Break Through Tech AI Studio',
    org: 'Cornell Tech',
    period: 'Mar 2026 – Mar 2027',
    color: '#e991b0',
    badge: 'Selected from 4,000+ applicants',
    skills: ['Python', 'Pandas', 'Scikit-Learn', 'Matplotlib', 'Predictive Modeling'],
    metrics: [
      { value: '4K+', label: 'Applicants' },
      { value: '1 yr', label: 'Fellowship' },
    ],
    points: [
      'Selected nationally from 4,000+ applicants for a rigorous year-long AI Fellowship at Cornell Tech.',
      'Developing hands-on ML expertise through an accelerated Python bootcamp and advanced coursework in data wrangling, predictive modeling, and performance evaluation — applying Pandas, Scikit-Learn, and Matplotlib.',
      'Scheduled to lead an AIStudio project with an industry sponsor (Aug 2026–Mar 2027), managing a cross-functional team to ship a deployment-ready ML product and deliver final outcomes to senior executive leadership.',
    ],
  },
  {
    title: 'AI & ML Research Intern',
    company: 'CNALab',
    org: 'NJIT',
    period: 'Sept 2025 – May 2026',
    color: '#9d8dd6',
    badge: '1st Place — Honors Interdisciplinary Research Forum',
    skills: ['Python', 'OpenCV', 'Pose Estimation', 'Image Enhancement', 'CNN'],
    metrics: [
      { value: '+35%', label: 'Accuracy' },
      { value: '#1', label: 'of 40+ Teams' },
      { value: 'Finalist', label: 'URIP' },
    ],
    points: [
      'Won 1st Place at NJIT\'s Honors Interdisciplinary Research Forum (40+ competitors) by delivering a research presentation clearly connecting methods to real-world impact; also selected as a Finalist for the Undergraduate Research and Innovation Program.',
      'Developed an AI-powered rehabilitation tool for patient mobility tracking in aquatic therapy by implementing pose estimation with OpenCV and Python; built a custom preprocessing pipeline with image enhancement.',
      'Improved keypoint detection by 35% and reduced labeling errors in the training dataset, increasing joint torque and acceleration analysis accuracy underwater.',
    ],
  },
  {
    title: 'UX Research Assistant',
    company: 'Department of Informatics',
    org: 'NJIT',
    period: 'May 2024 – Dec 2024',
    color: '#e8c040',
    skills: ['User Research', 'UX Strategy', 'Journey Mapping', 'Persona Dev', 'Segmentation'],
    metrics: [
      { value: '25+', label: 'Interviews' },
      { value: '3', label: 'UX Designs' },
    ],
    points: [
      'Led qualitative UX research for inclusive interface design; conducted and analyzed 25+ interviews with older adults to uncover accessibility gaps in digital safety.',
      'Converted behavioral insights into actionable recommendations via 3 designs of UX storyboards and strategy reports.',
      'Applied market research techniques like user personas, segmentation analysis, and journey mapping to inform CX and product strategies, influencing inclusive UI changes for campus-wide platforms.',
    ],
  },
]

const ExperienceCard = ({ title, company, org, period, color, badge, skills, metrics, points, delay = 0 }) => {
  const ref = useRef(null)
  const [flipped, setFlipped] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) { el.classList.add('scroll-revealed'); obs.unobserve(el) }
      },
      { threshold: 0.1 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      className="exp-card scroll-reveal"
      style={{ transitionDelay: `${delay}ms`, '--accent': color }}
    >
      {/* Timeline column */}
      <div className="exp-left">
        <div className="exp-dot" style={{ background: color, boxShadow: `0 0 14px ${color}70` }} />
        <div className="exp-line" />
      </div>

      {/* Flippable body */}
      <div
        className="exp-body-flip"
        onClick={() => setFlipped(f => !f)}
        title={flipped ? 'Click to flip back' : 'Click to explore knowledge graph'}
      >
        <div className={`exp-body-inner ${flipped ? 'flipped' : ''}`}>

          {/* ── Front ── */}
          <div className="exp-body-front">
            <div className="exp-card-header">
              {badge && <div className="exp-badge">{badge}</div>}
              <h3 className="exp-title">{title}</h3>
              <div className="exp-meta">
                <span className="exp-company">{company}</span>
                <span className="exp-at">@</span>
                <span className="exp-org" style={{ color }}>{org}</span>
                <span className="exp-sep">·</span>
                <span className="exp-period">{period}</span>
              </div>
            </div>

            {metrics && metrics.length > 0 && (
              <div className="exp-metrics">
                {metrics.map(m => (
                  <div key={m.label} className="exp-metric" style={{ '--m-color': color }}>
                    <span className="metric-value">{m.value}</span>
                    <span className="metric-label">{m.label}</span>
                  </div>
                ))}
              </div>
            )}

            <ul className="exp-points">
              {points.map((p, i) => <li key={i}>{p}</li>)}
            </ul>

            {skills && skills.length > 0 && (
              <div className="exp-skills">
                {skills.map(s => {
                  const Icon = TECH_ICON_MAP[s]
                  return (
                    <span key={s} className="exp-skill-tag" style={{ '--s-color': color }}>
                      {Icon && <Icon className="skill-icon" aria-hidden="true" />}
                      {s}
                    </span>
                  )
                })}
              </div>
            )}

            <span className="exp-flip-hint">click to explore graph ↩</span>
          </div>

          {/* ── Back: knowledge graph ── */}
          <div className="exp-body-back">
            <div className="exp-back-header">
              <span className="exp-back-title" style={{ color }}>{'> '}{title}</span>
              <span className="exp-back-hint">drag nodes · click to flip</span>
            </div>
            <div className="exp-back-canvas">
              {flipped && <GraphCanvas graphKey={title} />}
            </div>
            <div className="exp-back-legend">
              {Object.entries(NODE_TYPES).map(([type, { color: c }]) => (
                <span key={type} className="legend-item">
                  <span className="legend-dot" style={{ background: c }} />
                  {type}
                </span>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

const Experience = () => {
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
    <section id="experience" className="experience-section section">
      <div className="section-inner">
        <div className="terminal-label">&gt; run_experience()</div>

        <div ref={titleRef} className="scroll-reveal">
          <h2 className="section-title">Experience</h2>
          <p className="exp-section-sub">
            Researcher · Fellow · Builder — across academia and industry
          </p>
        </div>

        <div className="exp-list">
          {ROLES.map((r, i) => (
            <ExperienceCard key={r.title} {...r} delay={i * 140} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default Experience
