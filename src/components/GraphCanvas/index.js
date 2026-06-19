import { useEffect, useRef, useReducer, useState } from 'react'
import { GRAPHS, NODE_TYPES } from '../../data/resumeGraph'

// SVG coordinate space for the card-back canvas
const VW = 340
const VH = 240

// Truncate long labels so they fit inside the small canvas
const trunc = (s, n = 17) => (s.length > n ? s.slice(0, n - 1) + '…' : s)

export default function GraphCanvas({ graphKey }) {
  const graph = GRAPHS[graphKey]

  const svgRef       = useRef(null)
  const posRef       = useRef(null)   // { [nodeId]: {x, y} }
  const velRef       = useRef(null)   // { [nodeId]: {vx, vy} }
  const dragRef      = useRef(null)   // nodeId being dragged, or null
  const frameRef     = useRef(null)
  const hasDraggedRef = useRef(false)  // true if pointer moved during drag

  // useReducer just as a bump() to trigger re-renders from the rAF loop
  const [, bump] = useReducer(n => n + 1, 0)
  // Hovered node id — drives the full-label tooltip
  const [hovNode, setHovNode] = useState(null)

  // ── Initialise positions in a circle when graphKey changes ──────────
  useEffect(() => {
    if (!graph) return
    const pos = {}, vel = {}
    graph.nodes.forEach((n, i) => {
      const a = (i / graph.nodes.length) * Math.PI * 2 - Math.PI / 2
      pos[n.id] = { x: VW / 2 + Math.cos(a) * 78, y: VH / 2 + Math.sin(a) * 64 }
      vel[n.id] = { vx: 0, vy: 0 }
    })
    posRef.current = pos
    velRef.current = vel
  }, [graphKey, graph])

  // ── Force simulation tick (stored in ref so rAF callback is always current) ──
  const tickRef = useRef(null)
  tickRef.current = () => {
    const pos = posRef.current
    const vel = velRef.current
    if (!pos || !vel || !graph) return

    graph.nodes.forEach(n => {
      // Dragged node: freeze it in place
      if (dragRef.current === n.id) {
        vel[n.id].vx = 0
        vel[n.id].vy = 0
        return
      }

      let fx = 0, fy = 0

      // Repulsion between every pair of nodes
      graph.nodes.forEach(m => {
        if (m.id === n.id) return
        const dx = pos[n.id].x - pos[m.id].x
        const dy = pos[n.id].y - pos[m.id].y
        const d  = Math.sqrt(dx * dx + dy * dy) || 0.1
        // cap force so distant nodes don't explode
        fx += (dx / d) * Math.min(650 / (d * d), 35)
        fy += (dy / d) * Math.min(650 / (d * d), 35)
      })

      // Spring attraction along connected edges (target 80 px)
      graph.edges.forEach(({ from, to }) => {
        const other = from === n.id ? to : to === n.id ? from : null
        if (!other || !pos[other]) return
        const dx = pos[other].x - pos[n.id].x
        const dy = pos[other].y - pos[n.id].y
        const d  = Math.sqrt(dx * dx + dy * dy) || 0.1
        const f  = (d - 80) * 0.036
        fx += (dx / d) * f
        fy += (dy / d) * f
      })

      // Gentle gravity toward centre
      fx += (VW / 2 - pos[n.id].x) * 0.018
      fy += (VH / 2 - pos[n.id].y) * 0.018

      // Integrate with damping
      vel[n.id].vx = (vel[n.id].vx + fx) * 0.76
      vel[n.id].vy = (vel[n.id].vy + fy) * 0.76
      pos[n.id].x  = Math.max(16, Math.min(VW - 16, pos[n.id].x + vel[n.id].vx))
      pos[n.id].y  = Math.max(16, Math.min(VH - 16, pos[n.id].y + vel[n.id].vy))
    })

    // Check if the graph has settled
    const moving = graph.nodes.some(
      n => Math.abs(vel[n.id].vx) + Math.abs(vel[n.id].vy) > 0.1
    )

    bump() // trigger a React re-render with fresh positions

    frameRef.current =
      moving || dragRef.current
        ? requestAnimationFrame(() => tickRef.current?.())
        : null
  }

  // ── Start / stop the simulation loop ───────────────────────────────
  useEffect(() => {
    if (!graph) return
    // Tiny delay so init positions are written before the first tick
    const t = setTimeout(() => {
      frameRef.current = requestAnimationFrame(() => tickRef.current?.())
    }, 20)
    return () => {
      clearTimeout(t)
      if (frameRef.current) cancelAnimationFrame(frameRef.current)
      frameRef.current = null
    }
  }, [graphKey, graph])

  // ── SVG coordinate helpers ──────────────────────────────────────────
  const toSVGPos = (clientX, clientY) => {
    const svg = svgRef.current
    if (!svg) return { x: 0, y: 0 }
    const r = svg.getBoundingClientRect()
    return {
      x: (clientX - r.left) * VW / r.width,
      y: (clientY - r.top)  * VH / r.height,
    }
  }

  const onNodeDown = (e, id) => {
    e.preventDefault()
    e.stopPropagation()
    hasDraggedRef.current = false   // reset on every new press
    dragRef.current = id
    // Re-start simulation if it had settled
    if (!frameRef.current)
      frameRef.current = requestAnimationFrame(() => tickRef.current?.())
  }

  const onSVGMove = e => {
    if (!dragRef.current) return
    hasDraggedRef.current = true    // pointer actually moved while dragging
    const { x, y } = toSVGPos(e.clientX, e.clientY)
    posRef.current[dragRef.current] = { x, y }
    velRef.current[dragRef.current] = { vx: 0, vy: 0 }
  }

  const onSVGUp = () => { dragRef.current = null }

  // Stop the card-flip click from firing after a drag gesture
  const onSVGClick = e => {
    if (hasDraggedRef.current) {
      e.stopPropagation()
      hasDraggedRef.current = false
    }
  }

  if (!graph || !posRef.current) return null

  const pos = posRef.current

  return (
    <svg
      ref={svgRef}
      viewBox={`0 0 ${VW} ${VH}`}
      width="100%"
      height="100%"
      style={{ display: 'block', cursor: 'default' }}
      onMouseMove={onSVGMove}
      onMouseUp={onSVGUp}
      onMouseLeave={onSVGUp}
      onClick={onSVGClick}
    >
      {/* Edges */}
      {graph.edges.map((edge, i) => {
        const a = pos[edge.from], b = pos[edge.to]
        if (!a || !b) return null
        return (
          <line key={i}
            x1={a.x} y1={a.y} x2={b.x} y2={b.y}
            stroke="rgba(196,181,253,0.18)" strokeWidth="0.75"
          />
        )
      })}

      {/* Nodes */}
      {graph.nodes.map(node => {
        const p = pos[node.id]
        if (!p) return null
        const { color, glow } = NODE_TYPES[node.type] ?? NODE_TYPES.tool
        const isDragging = dragRef.current === node.id
        const isHov = hovNode === node.id

        // Estimate tooltip width from label length
        const tooltipW = Math.max(node.label.length * 5.5 + 12, 40)
        const tooltipX = Math.max(6, Math.min(VW - tooltipW - 6, p.x - tooltipW / 2))

        return (
          <g key={node.id}
            style={{ cursor: isDragging ? 'grabbing' : 'grab' }}
            onMouseDown={e => onNodeDown(e, node.id)}
            onMouseEnter={() => setHovNode(node.id)}
            onMouseLeave={() => setHovNode(null)}
          >
            {(isDragging || isHov) && (
              <circle cx={p.x} cy={p.y} r={16}
                fill="none" stroke={color} strokeWidth="0.8" opacity="0.3"
              />
            )}
            <circle
              cx={p.x} cy={p.y} r={9}
              fill={isDragging ? color : 'rgba(18,12,36,0.95)'}
              stroke={color}
              strokeWidth={isDragging || isHov ? 2 : 1.1}
              style={{
                transition: 'fill 0.12s',
                filter: isDragging || isHov ? `drop-shadow(0 0 5px ${glow})` : 'none',
              }}
            />
            {/* Always show truncated label below; full label tooltip appears on hover */}
            <text
              x={p.x} y={p.y + 18}
              textAnchor="middle"
              fill={isHov ? color : '#5a5278'}
              fontSize="6.5"
              fontFamily="Courier New"
              style={{ pointerEvents: 'none', userSelect: 'none', transition: 'fill 0.12s' }}
            >
              {trunc(node.label)}
            </text>

            {/* Full-label tooltip on hover */}
            {isHov && (
              <g style={{ pointerEvents: 'none' }}>
                <rect
                  x={tooltipX} y={p.y - 28}
                  width={tooltipW} height={13}
                  rx="3"
                  fill="rgba(12,8,28,0.96)" stroke={color} strokeWidth="0.7"
                />
                <text
                  x={tooltipX + tooltipW / 2} y={p.y - 19}
                  textAnchor="middle"
                  fill={color}
                  fontSize="7"
                  fontFamily="Courier New"
                  fontWeight="600"
                  style={{ userSelect: 'none' }}
                >
                  {node.label}
                </text>
              </g>
            )}
          </g>
        )
      })}
    </svg>
  )
}
