import { useEffect, useRef } from 'react'
import './index.scss'

const CursorGlow = () => {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    let x = window.innerWidth / 2
    let y = window.innerHeight / 2
    let cx = x, cy = y
    let id

    const onMove = e => { x = e.clientX; y = e.clientY }
    window.addEventListener('mousemove', onMove, { passive: true })

    // Lerp so it trails smoothly instead of snapping
    const tick = () => {
      cx += (x - cx) * 0.08
      cy += (y - cy) * 0.08
      el.style.transform = `translate(${cx}px, ${cy}px)`
      id = requestAnimationFrame(tick)
    }
    id = requestAnimationFrame(tick)

    return () => {
      window.removeEventListener('mousemove', onMove)
      cancelAnimationFrame(id)
    }
  }, [])

  return <div ref={ref} className="cursor-glow" aria-hidden="true" />
}

export default CursorGlow
