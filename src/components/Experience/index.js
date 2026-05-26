import { useState, useRef, useEffect } from 'react'
import GraphCanvas from '../GraphCanvas'
import { NODE_TYPES } from '../../data/resumeGraph'
import './index.scss'

const ROLES = [
  {
    title: 'AI & Machine Learning Fellow',
    company: 'Break Through Tech @ Cornell Tech',
    period: 'Mar 2026 – Present',
    color: '#e991b0',
    badge: 'Selected from 4,000+ applicants',
    points: [
      'Developing ML expertise through Python bootcamp and advanced coursework.',
      'Coursework in data wrangling, predictive modeling, and applied machine learning.',
    ],
  },
  {
    title: 'AI & ML Research Intern',
    company: 'CNALab @ NJIT',
    period: 'Sept 2025 – Present',
    color: '#9d8dd6',
    badge: '1st Place — Honors Interdisciplinary Research Forum',
    points: [
      'Designed an AI rehabilitation tool for patient mobility tracking — ingesting live video at 30 FPS, extracting 33 skeletal keypoints per frame using MediaPipe pose estimation + OpenCV.',
      'Built a custom preprocessing pipeline (frame differencing, landmark smoothing, joint-angle normalization) that improved keypoint detection accuracy by 35% over the baseline model.',
      'Trained and evaluated CNN architectures (ResNet variants + a lightweight custom model) on 2,400+ annotated video clips, selecting the model that best balanced accuracy and inference latency.',
      'Presented research findings at the NJIT Interdisciplinary Research Forum — placed 1st among 40+ competing teams spanning engineering, computing, and science.',
      'Collaborated with interdisciplinary teams to translate research insights into actionable recommendations for clinical applications.',
    ],
  },
  {
    title: 'UX Research Assistant',
    company: 'Department of Informatics @ NJIT',
    period: 'May 2024 – Dec 2024',
    color: '#e8c040',
    points: [
      'Conducted 25+ interviews with older adults to surface usability insights.',
      'Produced UX storyboards and strategy reports using personas, segmentation analysis, and journey mapping.',
    ],
  },
]

const ExperienceCard = ({ title, company, period, color, badge, points, delay = 0 }) => {
  const ref = useRef(null)
  const [flipped, setFlipped] = useState(false)

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
    <div
      ref={ref}
      className="exp-card scroll-reveal"
      style={{ transitionDelay: `${delay}ms`, '--accent': color }}
    >
      {/* Timeline marker — always visible */}
      <div className="exp-left">
        <div className="exp-dot" style={{ background: color, boxShadow: `0 0 12px ${color}60` }} />
        <div className="exp-line" />
      </div>

      {/* Body — flips on click */}
      <div
        className="exp-body-flip"
        onClick={() => setFlipped(f => !f)}
        title={flipped ? 'Click to flip back' : 'Click to explore knowledge graph'}
      >
        <div className={`exp-body-inner ${flipped ? 'flipped' : ''}`}>

          {/* Front */}
          <div className="exp-body-front">
            {badge && <div className="exp-badge">{badge}</div>}
            <h3 className="exp-title">{title}</h3>
            <div className="exp-meta">
              <span className="exp-company">{company}</span>
              <span className="exp-sep">·</span>
              <span className="exp-period">{period}</span>
            </div>
            <ul className="exp-points">
              {points.map((p, i) => <li key={i}>{p}</li>)}
            </ul>
            <span className="exp-flip-hint">click to explore graph ↩</span>
          </div>

          {/* Back — graph */}
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
            <ExperienceCard key={r.title} {...r} delay={i * 130} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default Experience
