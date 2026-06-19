import { useRef, useEffect } from 'react'
import './index.scss'

const PROGRAMS = [
  {
    name: 'WISER Quantum + AI Optimization Program',
    org: 'Cornell Tech',
    period: 'Summer 2026',
    color: '#a78bfa',
    tag: '6-week intensive',
    desc: 'A rigorous 6-week training program unifying three computing paradigms — classical algorithms, quantum computing, and AI — applied to real-world optimization challenges in drug discovery, energy grids, financial markets, and machine learning. Learn how they compare, where each hits its limits, and how combining them unlocks solutions none could reach alone.',
    skills: ['Quantum Computing', 'Classical Algorithms', 'AI Optimization'],
  },
  {
    name: 'Intermediate Technical Interview Prep · Adaptive',
    org: 'CodePath',
    period: 'Completed',
    color: '#34d399',
    tag: 'Technical Training',
    desc: 'Selective intermediate-level course focused on problem-solving patterns, algorithm design, and coding interview fluency — with an adaptive curriculum that adjusts to your current level.',
    skills: ['Data Structures', 'Algorithms', 'Problem Solving', 'Interview Prep'],
  },
]

const ProgramCard = ({ name, org, period, color, tag, desc, skills, delay = 0 }) => {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) { el.classList.add('scroll-revealed'); obs.unobserve(el) }
      },
      { threshold: 0.12 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      className="program-card scroll-reveal"
      style={{ transitionDelay: `${delay}ms`, '--p-color': color }}
    >
      <div className="prog-accent" style={{ background: color }} />
      <div className="prog-body">
        <div className="prog-head">
          <div>
            <h3 className="prog-name">{name}</h3>
            <p className="prog-org">
              {org}
              <span className="prog-sep"> · </span>
              <span className="prog-period">{period}</span>
            </p>
          </div>
          <span className="prog-tag" style={{ color, borderColor: color }}>{tag}</span>
        </div>
        <p className="prog-desc">{desc}</p>
        <div className="prog-skills">
          {skills.map(s => (
            <span key={s} className="prog-skill" style={{ color, borderColor: `${color}55` }}>{s}</span>
          ))}
        </div>
      </div>
    </div>
  )
}

const Programs = () => {
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
    <section id="programs" className="programs-section section">
      <div className="section-inner">
        <div className="terminal-label">&gt; load_programs()</div>
        <div ref={titleRef} className="scroll-reveal">
          <h2 className="section-title">Programs</h2>
          <p className="programs-sub">Selective programs I've participated in beyond coursework.</p>
        </div>
        <div className="programs-list">
          {PROGRAMS.map((p, i) => (
            <ProgramCard key={p.name} {...p} delay={i * 120} />
          ))}
        </div>
      </div>
    </section>
  )
}

export default Programs
