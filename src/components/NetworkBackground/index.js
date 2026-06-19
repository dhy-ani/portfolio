import { useEffect, useRef } from 'react'
import './index.scss'

// Warm gold dust motes — like particles caught in museum gallery lighting
const NetworkBackground = () => {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    let animId

    const resize = () => {
      canvas.width  = window.innerWidth
      canvas.height = window.innerHeight
    }
    resize()
    window.addEventListener('resize', resize)

    const makeMotes = () => Array.from({ length: 90 }, () => ({
      x:     Math.random() * canvas.width,
      y:     Math.random() * canvas.height,
      r:     Math.random() ** 2.2 * 1.8 + 0.3,
      baseA: 0.06 + Math.random() * 0.22,
      speed: 0.003 + Math.random() * 0.009,
      phase: Math.random() * Math.PI * 2,
      driftX: (Math.random() - 0.5) * 0.18,
      driftY: -0.04 - Math.random() * 0.12,  // very slow upward drift
      wobble: (Math.random() - 0.5) * 0.008,
      // warm palette: gold, amber, or faint burgundy
      warm: Math.random() < 0.12,
    }))

    let motes = makeMotes()
    const onResize = () => { resize(); motes = makeMotes() }
    window.addEventListener('resize', onResize)

    const tick = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      motes.forEach(m => {
        m.phase  += m.speed
        m.x      += m.driftX + Math.sin(m.phase * 0.7) * m.wobble * 30
        m.y      += m.driftY

        // wrap
        if (m.y < -4)                m.y = canvas.height + 4
        if (m.x < -4)                m.x = canvas.width  + 4
        if (m.x > canvas.width  + 4) m.x = -4

        const alpha = m.baseA * (0.5 + 0.5 * Math.sin(m.phase))

        const [r, g, b] = m.warm
          ? [160, 30, 40]     // faint burgundy accent
          : [210, 165, 60]    // warm gold

        if (m.r > 1.1) {
          // soft glow for larger motes
          const grd = ctx.createRadialGradient(m.x, m.y, 0, m.x, m.y, m.r * 5)
          grd.addColorStop(0,   `rgba(${r},${g},${b},${alpha * 0.55})`)
          grd.addColorStop(0.4, `rgba(${r},${g},${b},${alpha * 0.15})`)
          grd.addColorStop(1,   `rgba(${r},${g},${b},0)`)
          ctx.beginPath()
          ctx.arc(m.x, m.y, m.r * 5, 0, Math.PI * 2)
          ctx.fillStyle = grd
          ctx.fill()
        }

        ctx.beginPath()
        ctx.arc(m.x, m.y, m.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${r},${g},${b},${alpha})`
        ctx.fill()
      })

      animId = requestAnimationFrame(tick)
    }

    animId = requestAnimationFrame(tick)

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', resize)
      window.removeEventListener('resize', onResize)
    }
  }, [])

  return <canvas ref={canvasRef} className="network-bg" />
}

export default NetworkBackground
