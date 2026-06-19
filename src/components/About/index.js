import useScrollReveal from '../../hooks/useScrollReveal'
import './index.scss'

const STATS = [
  { icon: '◈', label: 'GPA 3.62',          desc: 'Albert Dorman Honors College @ NJIT' },
  { icon: '◉', label: 'AI/ML Fellow',       desc: 'Break Through Tech @ Cornell' },
  { icon: '◇', label: '1st Place',          desc: 'NJIT Research Forum 2025', link: 'https://news.njit.edu/150-honors-scholars-showcase-findings-interdisciplinary-research-forum' },
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
            CS and AI student at NJIT, international student, and someone who's done
            UX research, AI rehabilitation work that won first place at the NJIT Honors
            Research Forum, and landed an <strong>AI/ML Fellowship at Cornell Tech</strong>.
            Currently incoming at <strong>TCS</strong> this summer building agentic AI systems.
            Most of my projects started as something that annoyed me.
          </p>
          <p>
            Working on a few things right now: a <strong>digital twin</strong> that'll live
            right here on this page — once it's up, you'll be able to ask it anything about
            me and it'll actually know. Also building <strong>StockSense</strong>, an AI tool
            that pulls from market data, tracks news sentiment and social signals, and surfaces
            pattern-based insights for retail investors who are tired of guessing. It's meant
            to feel less like a dashboard and more like a thinking partner.
          </p>
          <p>
            Also learning French. Not consistently, but genuinely working on it. Outside the
            terminal: museums, strong opinions about typography, and the endless search for
            the perfect warm-black background. This site is the current best attempt.
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

const StatCard = ({ icon, label, desc, link, delay }) => {
  const ref = useScrollReveal(0.2)
  return (
    <div ref={ref} className="scroll-reveal stat-card" style={{ transitionDelay: `${delay}ms` }}>
      <span className="stat-icon">{icon}</span>
      <span className="stat-label">{label}</span>
      <span className="stat-desc">
        {link
          ? <a href={link} target="_blank" rel="noopener noreferrer">{desc}</a>
          : desc}
      </span>
    </div>
  )
}

export default About
