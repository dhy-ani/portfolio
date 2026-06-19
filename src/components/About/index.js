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
            CS + AI student at NJIT who ended up at the intersection of AI and design
            entirely by following what I found interesting — and just sort of stayed there.
          </p>
          <p>
            I got into coding because I liked making things look good. I stayed because I
            realized you could make things <em>think</em> too. Since then: UX research,
            AI rehabilitation tools that placed <strong>1st at the NJIT Research Forum</strong>,
            and an <strong>AI & ML Fellowship at Cornell Tech</strong> I applied to three days before
            the deadline on a whim (4,000+ applicants, somehow still here).
          </p>
          <p>
            Most of my projects exist because something annoyed me and my first instinct
            was to overengineer a solution. Outside the terminal: museums, strong opinions
            about typography, and an ongoing search for the perfect warm-black background.
            This site is my current best attempt.
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
