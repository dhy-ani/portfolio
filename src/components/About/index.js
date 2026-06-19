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
            CS and AI student at NJIT, international student. Done UX research, built AI
            rehabilitation tools that <a href="https://news.njit.edu/150-honors-scholars-showcase-findings-interdisciplinary-research-forum" target="_blank" rel="noopener noreferrer" className="about-inline-link">placed first at the NJIT Honors Research Forum</a>,
            and landed an <strong>AI/ML Fellowship at Cornell Tech</strong>. Heading to <strong>TCS</strong> this summer to build agentic AI systems.
          </p>
          <p>
            Right now I'm building a <strong>digital twin</strong> that'll live on this page.
            Once it's up, ask it anything about me and it'll actually know.
            Also building <strong>StockSense</strong>, an AI tool that reads market data,
            news sentiment, and social signals. Meant to feel like a thinking partner, not a dashboard.
          </p>
          <p>
            Also learning French. Not consistently, but genuinely.
          </p>
        </div>

        <div className="stat-cards">
          {STATS.map(({ icon, label, desc, link }, i) => (
            <StatCard key={label} icon={icon} label={label} desc={desc} link={link} delay={i * 150} />
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
