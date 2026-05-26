import useScrollProgress from '../../hooks/useScrollProgress'
import './index.scss'

const WAYPOINTS = [
  { pct: 0,   label: 'Booting' },
  { pct: 20,  label: 'Loading Skills' },
  { pct: 45,  label: 'Mapping Nodes' },
  { pct: 70,  label: 'Assembling Projects' },
  { pct: 95,  label: 'System Ready' },
]

const BuildProgress = () => {
  const progress = useScrollProgress()

  const activeLabel = [...WAYPOINTS]
    .reverse()
    .find(w => progress >= w.pct)?.label ?? 'Booting'

  return (
    <div className="build-progress">
      <div className="bp-inner">
        <span className="bp-label-top">build</span>

        <div className="bp-track">
          <div className="bp-fill" style={{ width: `${progress}%` }} />

          {WAYPOINTS.map(({ pct, label }) => (
            <div
              key={label}
              className={`bp-waypoint ${progress >= pct ? 'reached' : ''}`}
              style={{ left: `${pct}%` }}
              title={label}
            >
              <div className="bp-dot" />
              <span className="bp-wp-label">{label}</span>
            </div>
          ))}
        </div>

        <span className="bp-pct">{Math.round(progress)}%</span>
        <span className="bp-status">{activeLabel}</span>
      </div>
    </div>
  )
}

export default BuildProgress
