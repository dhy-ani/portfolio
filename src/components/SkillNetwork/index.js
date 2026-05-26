import { useState, useEffect, useRef } from 'react'
import './index.scss'

// ── Skill data ─────────────────────────────────────────────────────────
const ORIGIN = [
  { id: 'html',  label: 'HTML / CSS',      color: '#e34f26', proof: 'Built all web frontends; structured and styled every project from scratch.' },
  { id: 'python', label: 'Python',          color: '#3776ab', proof: 'Entry point to programming; now primary language for ML pipelines and research.' },
  { id: 'java',  label: 'Java',             color: '#ed8b00', proof: 'OOP fundamentals at NJIT; backend architecture for NoteShare Platform.' },
  { id: 'dsa',   label: 'Data Structures',  color: '#9d8dd6', proof: 'Core CS foundation — trees, graphs, heaps used in research and system design.' },
  { id: 'algo',  label: 'Algorithms',       color: '#8b82a8', proof: '1st Place NJIT Research Forum; algorithm analysis informs every ML architecture choice.' },
  { id: 'git',   label: 'Git / GitHub',     color: '#d0501b', proof: 'All 8+ projects version-controlled; collaborative repos maintained on GitHub.' },
  { id: 'sql',   label: 'SQL',              color: '#336791', proof: 'PostgreSQL for NoteShare; MySQL + injection protection for e-commerce store.' },
]

const CURRENT = [
  { id: 'react',   label: 'React.js',          color: '#61dafb', proof: 'Built ADPVerse real-time dashboard, AgentWeave UI, NoteShare frontend, and this portfolio.' },
  { id: 'pytorch', label: 'PyTorch',            color: '#ee4c2c', proof: 'CNN skincare classifier with Grad-CAM explainability; live webcam inference via FastAPI.' },
  { id: 'ml',      label: 'Machine Learning',   color: '#f4a0b5', proof: 'AI/ML Fellow at Cornell Tech (4,000+ applicants); CNALab research improved accuracy +35%.' },
  { id: 'docker',  label: 'Docker',             color: '#1d63ed', proof: 'Containerized AI microservices for consistent, reproducible deployment environments.' },
  { id: 'spring',  label: 'Spring Boot',        color: '#6db33f', proof: 'REST API for NoteShare: JWT auth, role-based access control, AWS S3 integration.' },
  { id: 'cv',      label: 'Computer Vision',    color: '#ff8c5a', proof: 'MediaPipe pose estimation at CNALab; YOLO body-type detection in AgentWeave.' },
  { id: 'nlp',     label: 'NLP / BERT',         color: '#c4b5fd', proof: 'RAISE-25: BERT + t-SNE pipeline surfacing public concerns from large text datasets.' },
  { id: 'apis',    label: 'REST APIs',           color: '#fde68a', proof: 'FastAPI for skincare AI; Spring Boot APIs; ElevenLabs + LLM integrations.' },
  { id: 'linux',   label: 'Linux / CLI',         color: '#f5a623', proof: 'Primary dev environment; bash scripting for data pipelines on research servers.' },
]

const GOALS = [
  { id: 'cloud',     label: 'Cloud (AWS/GCP)',    color: '#ff9900', proof: 'Used AWS S3 for NoteShare. Goal: architect cloud-native ML infrastructure at scale.' },
  { id: 'llm',       label: 'LLMs + Fine-tuning', color: '#74b9ff', proof: 'Built on LLM APIs. Goal: custom fine-tuning, RLHF pipelines, and evaluation frameworks.' },
  { id: 'mlops',     label: 'MLOps',              color: '#a29bfe', proof: 'Goal: production ML with CI/CD, model monitoring, and automated versioning.' },
  { id: 'sysdesign', label: 'System Design',      color: '#fd79a8', proof: 'Goal: design distributed systems — load balancers, caching, microservices end-to-end.' },
  { id: 'k8s',       label: 'Kubernetes',         color: '#326ce5', proof: 'Goal: orchestrate containerized ML workloads and auto-scale inference in production.' },
]

const EDGES = [
  // Foundation → Current (solid)
  { from: 'html',   to: 'react',     dash: false },
  { from: 'python', to: 'pytorch',   dash: false },
  { from: 'python', to: 'ml',        dash: false },
  { from: 'python', to: 'cv',        dash: false },
  { from: 'python', to: 'nlp',       dash: false },
  { from: 'python', to: 'apis',      dash: false },
  { from: 'java',   to: 'spring',    dash: false },
  { from: 'dsa',    to: 'ml',        dash: false },
  { from: 'algo',   to: 'cv',        dash: false },
  { from: 'git',    to: 'docker',    dash: false },
  { from: 'sql',    to: 'apis',      dash: false },
  { from: 'sql',    to: 'spring',    dash: false },
  // Current → Goals (dashed)
  { from: 'pytorch', to: 'llm',       dash: true },
  { from: 'pytorch', to: 'mlops',     dash: true },
  { from: 'ml',      to: 'llm',       dash: true },
  { from: 'ml',      to: 'mlops',     dash: true },
  { from: 'docker',  to: 'k8s',       dash: true },
  { from: 'docker',  to: 'cloud',     dash: true },
  { from: 'spring',  to: 'sysdesign', dash: true },
  { from: 'spring',  to: 'cloud',     dash: true },
  { from: 'nlp',     to: 'llm',       dash: true },
  { from: 'cv',      to: 'mlops',     dash: true },
  { from: 'apis',    to: 'cloud',     dash: true },
  { from: 'linux',   to: 'cloud',     dash: true },
]

// Pre-compute positions — explicit top/bot padding per tier so nodes never
// overlap the tier label row (y≈27) or the column rect top (y=38)
const TIER_BOUNDS = {
  origin:  { topY: 62, botY: 528 },
  current: { topY: 76, botY: 524 },
  goal:    { topY: 92, botY: 502 },
}

const placeNodes = (arr, x, tierKey) => {
  const { topY, botY } = TIER_BOUNDS[tierKey]
  const span = botY - topY
  return arr.map((s, i, a) => ({
    ...s, x,
    y: a.length === 1 ? (topY + botY) / 2 : topY + (i / (a.length - 1)) * span,
    tier: tierKey,
  }))
}

const ALL_NODES = [
  ...placeNodes(ORIGIN,  165, 'origin'),
  ...placeNodes(CURRENT, 500, 'current'),
  ...placeNodes(GOALS,   835, 'goal'),
]

const NODE_MAP = Object.fromEntries(ALL_NODES.map(n => [n.id, n]))

// ── Component ──────────────────────────────────────────────────────────
const SkillNetwork = () => {
  const sectionRef = useRef(null)
  const titleRef   = useRef(null)
  const [phase, setPhase]     = useState(0)
  const [hovered, setHovered] = useState(null)

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return
        setPhase(1)
        setTimeout(() => setPhase(2), 600)
        setTimeout(() => setPhase(3), 1000)
        setTimeout(() => setPhase(4), 1600)
        setTimeout(() => setPhase(5), 2000)
        setTimeout(() => setPhase(6), 2500)
        obs.unobserve(el)
      },
      { threshold: 0.1 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  useEffect(() => {
    const el = titleRef.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([e]) => { if (e.isIntersecting) { el.classList.add('scroll-revealed'); obs.unobserve(el) } },
      { threshold: 0.2 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  const nodeVis = tier =>
    (tier === 'origin' && phase >= 1) ||
    (tier === 'current' && phase >= 3) ||
    (tier === 'goal' && phase >= 5)

  const hovNode = NODE_MAP[hovered]

  // Set of node IDs connected to the hovered node
  const connSet = hovered
    ? new Set(EDGES.filter(e => e.from === hovered || e.to === hovered).flatMap(e => [e.from, e.to]))
    : null

  const visibleCount = ALL_NODES.filter(n => nodeVis(n.tier)).length

  return (
    <section id="skills" className="skills-section section">
      <div className="section-inner">
        <div className="terminal-label">&gt; map_skills()</div>

        <div ref={titleRef} className="scroll-reveal">
          <h2 className="section-title">Skill Network</h2>
          <p className="section-sub">
            {phase >= 5
              ? `${ALL_NODES.length} nodes · foundation → current → goals`
              : `mapping ${visibleCount} / ${ALL_NODES.length} nodes...`}
          </p>
        </div>

        <div ref={sectionRef} className="skill-network-wrap">
          <svg viewBox="0 0 1000 560" className="skill-svg" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <filter id="sk-glow">
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
              </filter>
            </defs>

            {/* Tier background columns */}
            {[
              { x: 165, label: '[ foundation ]', bg: 'rgba(139,130,168,0.05)', lc: '#8b82a8' },
              { x: 500, label: '[ current ]',    bg: 'rgba(196,181,253,0.07)', lc: '#c4b5fd' },
              { x: 835, label: '[ goals ]',      bg: 'rgba(244,160,181,0.05)', lc: '#f4a0b5' },
            ].map(({ x, label, bg, lc }) => (
              <g key={label}>
                <rect x={x - 82} y={38} width={164} height={510} rx="10" fill={bg} />
                <text x={x} y={27} textAnchor="middle" fill={lc}
                  fontSize="9.5" fontFamily="Courier New" fontWeight="700" letterSpacing="1.8">
                  {label}
                </text>
              </g>
            ))}

            {/* Edges */}
            {EDGES.map((e, i) => {
              const a = NODE_MAP[e.from], b = NODE_MAP[e.to]
              if (!a || !b) return null
              const solidVis = !e.dash && phase >= 2
              const dashVis  = e.dash  && phase >= 4
              if (!solidVis && !dashVis) return null

              const isHov = hovered && (e.from === hovered || e.to === hovered)
              const fromColor = NODE_MAP[e.from]?.color ?? '#c4b5fd'

              return (
                <line key={i}
                  x1={a.x} y1={a.y} x2={b.x} y2={b.y}
                  strokeDasharray={e.dash ? '5,3.5' : 'none'}
                  filter={isHov ? 'url(#sk-glow)' : undefined}
                  style={{
                    stroke: isHov ? fromColor : 'var(--skill-edge-color, rgba(196,181,253,0.22))',
                    strokeWidth: isHov ? 1.6 : 0.75,
                    opacity: isHov ? 0.9 : (e.dash ? 0.5 : 0.7),
                    transition: 'stroke 0.2s, stroke-width 0.2s, opacity 0.2s',
                  }}
                />
              )
            })}

            {/* Nodes */}
            {ALL_NODES.map((node, idx) => {
              const vis   = nodeVis(node.tier)
              const isHov = hovered === node.id
              const isConn = connSet?.has(node.id) && !isHov
              const r = node.tier === 'current' ? 12 : 10

              // Origin labels → left; Current & Goal labels → right
              const labelX      = node.tier === 'origin' ? node.x - r - 6 : node.x + r + 6
              const labelAnchor = node.tier === 'origin' ? 'end' : 'start'

              return (
                <g key={node.id}
                  style={{
                    opacity: vis ? 1 : 0,
                    transform: vis ? 'scale(1)' : 'scale(0.15)',
                    transformBox: 'fill-box',
                    transformOrigin: 'center',
                    transition: `opacity 0.4s ${idx * 0.03}s ease, transform 0.45s ${idx * 0.03}s cubic-bezier(0.34,1.56,0.64,1)`,
                    cursor: 'pointer',
                  }}
                  onMouseEnter={() => setHovered(node.id)}
                  onMouseLeave={() => setHovered(null)}
                >
                  {/* Pulse / connected ring */}
                  {(isHov || isConn) && (
                    <circle cx={node.x} cy={node.y} r={r + 7}
                      fill="none" stroke={node.color} strokeWidth="1"
                      opacity={isHov ? 0.45 : 0.2}
                    />
                  )}

                  {/* Main circle */}
                  <circle
                    cx={node.x} cy={node.y} r={r}
                    fill={
                      node.tier === 'goal'
                        ? `${node.color}22`
                        : (isHov || isConn) ? node.color : 'rgba(18,12,36,0.92)'
                    }
                    stroke={node.color}
                    strokeWidth={node.tier === 'current' ? (isHov ? 2.5 : 1.8) : (isHov ? 2 : 1.5)}
                    strokeDasharray={node.tier === 'goal' ? '3,2.5' : 'none'}
                    style={{ transition: 'fill 0.2s, stroke-width 0.2s' }}
                    filter={isHov ? 'url(#sk-glow)' : undefined}
                  />

                  {/* Label */}
                  <text
                    x={labelX} y={node.y + 4}
                    textAnchor={labelAnchor}
                    fontSize={isHov ? '10.5' : '9.5'}
                    fontFamily="Courier New"
                    fontWeight={isHov ? '700' : '500'}
                    style={{
                      fill: isHov || isConn
                        ? 'var(--skill-label-active, #ffffff)'
                        : 'var(--skill-label-rest, #7e769c)',
                      transition: 'fill 0.2s',
                      pointerEvents: 'none',
                      userSelect: 'none',
                    }}
                  >
                    {node.label}
                  </text>
                </g>
              )
            })}

            {/* Flowing particles along solid edges once fully loaded */}
            {phase >= 6 && EDGES.filter(e => !e.dash).slice(0, 10).map((e, i) => {
              const a = NODE_MAP[e.from], b = NODE_MAP[e.to]
              if (!a || !b) return null
              return (
                <circle key={`p-${i}`} r="2.2" fill={NODE_MAP[e.from]?.color ?? '#c4b5fd'} opacity="0.55">
                  <animateMotion
                    dur={`${3 + i * 0.22}s`}
                    repeatCount="indefinite"
                    begin={`${i * 0.38}s`}
                    path={`M ${a.x} ${a.y} L ${b.x} ${b.y}`}
                  />
                </circle>
              )
            })}
          </svg>

          {/* Proof card — slides in on hover */}
          {hovNode && (
            <div className="skill-proof-card" style={{ borderColor: hovNode.color }}>
              <span className="proof-skill-name" style={{ color: hovNode.color }}>
                {'> '}{hovNode.label}
                <span className="proof-tier-tag" style={{ color: hovNode.color }}>
                  {'  '}[ {hovNode.tier} ]
                </span>
              </span>
              <p className="proof-text">{hovNode.proof}</p>
            </div>
          )}

          {/* Mobile fallback */}
          <div className="skill-list-mobile">
            {ALL_NODES.map(skill => (
              <div key={skill.id} className="skill-list-item" style={{ '--c': skill.color }}>
                <span className="skill-dot" style={{ background: skill.color }} />
                <div>
                  <span className="skill-name">{skill.label}</span>
                  <span className="skill-tip">{skill.proof}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

export default SkillNetwork
