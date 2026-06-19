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
    badge: 'Incoming · Summer 2026',
    skills: ['Python', 'AWS Bedrock', 'Lambda', 'DynamoDB', 'Terraform'],
    points: [
      'Designing a multi-step AI agent on AWS Bedrock to validate stored procedure outputs against a 20-point QA checklist — automating a previously manual review process.',
      'Architecting serverless infrastructure (Lambda, API Gateway, S3, DynamoDB, Terraform) for scalable cloud deployments.',
    ],
  },
  {
    title: 'AI & Machine Learning Fellow',
    company: 'Break Through Tech AI Studio',
    org: 'Cornell Tech',
    period: 'Mar 2026 – Mar 2027',
    color: '#e991b0',
    badge: 'Selected from 4,000+ applicants',
    skills: ['Python', 'Pandas', 'Scikit-Learn', 'Matplotlib'],
    points: [
      'Selected nationally from 4,000+ applicants for a rigorous year-long AI Fellowship at Cornell Tech.',
      'Building ML expertise through an accelerated Python bootcamp — data wrangling, predictive modeling, and performance evaluation with Pandas, Scikit-Learn, and Matplotlib.',
      'Leading an AIStudio project with an industry sponsor (Aug 2026–Mar 2027) to ship a deployment-ready ML product presented to senior executive leadership.',
    ],
  },
  {
    title: 'AI & ML Research Intern',
    company: 'CNALab',
    org: 'NJIT',
    period: 'Sept 2025 – May 2026',
    color: '#9d8dd6',
    badge: '1st Place · Honors Research Forum · 40+ teams',
    skills: ['Python', 'OpenCV', 'CNN'],
    points: [
      'Built an AI rehabilitation tool for aquatic therapy — pose estimation via OpenCV and Python with a custom preprocessing pipeline (frame differencing, landmark smoothing) that improved keypoint detection by 35%.',
      'Trained and evaluated CNN architectures on 2,400+ annotated video clips, selecting the best accuracy-latency tradeoff for clinical deployment.',
      'Placed 1st at NJIT\'s Honors Interdisciplinary Research Forum (40+ teams); selected as a Finalist for the Undergraduate Research and Innovation Program.',
    ],
  },
  {
    title: 'UX Research Assistant',
    company: 'Department of Informatics',
    org: 'NJIT',
    period: 'May 2024 – Dec 2024',
    color: '#e8c040',
    skills: ['Figma'],
    points: [
      'Led qualitative research for inclusive interface design — conducted 25+ interviews with older adults to uncover accessibility gaps in digital safety.',
      'Delivered 3 UX storyboard designs and strategy reports; applied persona mapping, segmentation, and journey mapping to influence UI changes for campus-wide platforms.',
    ],
  },
]

const ExperienceCard = ({ title, company, org, period, color, badge, skills, points, delay = 0 }) => {
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
      <div className="exp-left">
        <div className="exp-dot" style={{ background: color, boxShadow: `0 0 12px ${color}60` }} />
        <div className="exp-line" />
      </div>

      <div
        className="exp-body-flip"
        onClick={() => setFlipped(f => !f)}
        title={flipped ? 'Click to flip back' : 'Click to explore knowledge graph'}
      >
        <div className={`exp-body-inner ${flipped ? 'flipped' : ''}`}>

          {/* Front */}
          <div className="exp-body-front">
            <div className="exp-head">
              <div className="exp-head-left">
                <h3 className="exp-title">{title}</h3>
                <p className="exp-sub">
                  {company}
                  <span className="exp-at"> @ </span>
                  <span style={{ color }}>{org}</span>
                </p>
              </div>
              <div className="exp-head-right">
                <span className="exp-period">{period}</span>
                {badge && <span className="exp-badge">{badge}</span>}
              </div>
            </div>

            <ul className="exp-points">
              {points.map((p, i) => <li key={i}>{p}</li>)}
            </ul>

            {skills?.length > 0 && (
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

            <span className="exp-flip-hint">explore knowledge graph ↩</span>
          </div>

          {/* Back */}
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
        </div>
        <div className="exp-list">
          {ROLES.map((r, i) => (
            <ExperienceCard key={r.title} {...r} delay={i * 120} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default Experience
