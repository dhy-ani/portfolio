import useScrollReveal from '../../hooks/useScrollReveal'
import './index.scss'

const STATS = [
  { icon: '◈', label: 'GPA 3.62',          desc: 'Albert Dorman Honors College @ NJIT' },
  { icon: '◉', label: 'AI/ML Fellow',       desc: 'Break Through Tech @ Cornell' },
  { icon: '◇', label: '1st Place',          desc: 'NJIT Research Forum 2025' },
  { icon: '◆', label: 'URI Award',          desc: 'Undergraduate Research and Innovation Seed Grant Finalist' },
]

const About = () => {
  const titleRef = useScrollReveal(0.2)
  const textRef  = useScrollReveal(0.2)

  return (
    <section id="about" className="about-section section">
      <div className="section-inner">

        <div className="terminal-label">&gt; load_about()</div>

        <div ref={titleRef} className="scroll-reveal">
          <h2 className="section-title">About the Builder</h2>
        </div>

        <div ref={textRef} className="scroll-reveal about-text">
          <p>
            I'm a Computer Science student with an AI Minor at <strong>the New Jersey Institute of Technology</strong>,
            passionate about building systems that bridge data and human experience.
          </p>
          <p>
            Selected as an <strong>AI & ML Fellow at Cornell Tech</strong> from 4,000+ applicants,
            and currently conducting AI rehabilitation research at CNALab, where my work improved
            keypoint detection accuracy by 35%.
          </p>
          <p>
            I like experimenting with layouts, animations, and logic: turning curiosity into
            things that actually work.
          </p>
        </div>

        <div className="stat-cards">
          {STATS.map(({ icon, label, desc }, i) => (
            <StatCard key={label} icon={icon} label={label} desc={desc} delay={i * 150} />
          ))}
        </div>

      </div>
    </section>
  )
}

const StatCard = ({ icon, label, desc, delay }) => {
  const ref = useScrollReveal(0.2)
  return (
    <div ref={ref} className="scroll-reveal stat-card" style={{ transitionDelay: `${delay}ms` }}>
      <span className="stat-icon">{icon}</span>
      <span className="stat-label">{label}</span>
      <span className="stat-desc">{desc}</span>
    </div>
  )
}

export default About
