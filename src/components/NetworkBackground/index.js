import { useEffect, useRef } from 'react'
import './index.scss'

const PALETTE = [
  [244, 160, 181],  // pink
  [196, 181, 253],  // lavender
  [107, 216, 107],  // green
  [196, 149, 106],  // terracotta
  [253, 230, 138],  // butter
]

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

    const W = () => canvas.width
    const H = () => canvas.height

    // Generate stars — power-law size distribution for realism
    const makeStars = () => Array.from({ length: 200 }, (_, i) => ({
      x:           Math.random() * W(),
      y:           Math.random() * H(),
      r:           Math.random() ** 2.8 * 3.2 + 0.25,  // mostly tiny, few big
      base:        0.35 + Math.random() * 0.55,          // base brightness
      speed:       0.005 + Math.random() * 0.018,
      phase:       Math.random() * Math.PI * 2,
      vx:          (Math.random() - 0.5) * 0.055,
      vy:          (Math.random() - 0.5) * 0.055,
      isColored:   Math.random() < 0.12,
      colorIdx:    i % PALETTE.length,
    }))

    let stars = makeStars()

    // Rebuild on resize so stars fill the new canvas
    const onResize = () => { resize(); stars = makeStars() }
    window.addEventListener('resize', onResize)

    const CONNECT_DIST = 120

    const tick = () => {
      ctx.clearRect(0, 0, W(), H())

      // Update positions
      stars.forEach(s => {
        s.phase += s.speed
        s.x += s.vx
        s.y += s.vy
        if (s.x < -10)      s.x = W() + 10
        if (s.x > W() + 10) s.x = -10
        if (s.y < -10)      s.y = H() + 10
        if (s.y > H() + 10) s.y = -10
      })

      // Constellation lines — drawn FIRST (below stars)
      for (let i = 0; i < stars.length; i++) {
        for (let j = i + 1; j < stars.length; j++) {
          const dx = stars[i].x - stars[j].x
          const dy = stars[i].y - stars[j].y
          const d  = Math.hypot(dx, dy)
          if (d < CONNECT_DIST) {
            // Only connect if both stars are reasonably bright
            const alpha = (1 - d / CONNECT_DIST) * 0.12 * Math.min(stars[i].base, stars[j].base)
            ctx.beginPath()
            ctx.moveTo(stars[i].x, stars[i].y)
            ctx.lineTo(stars[j].x, stars[j].y)
            ctx.strokeStyle = `rgba(210,205,240,${alpha})`
            ctx.lineWidth   = 0.35
            ctx.stroke()
          }
        }
      }

      // Stars
      stars.forEach(s => {
        const alpha = s.base * (0.55 + 0.45 * Math.sin(s.phase))

        if (s.isColored) {
          const [r, g, b] = PALETTE[s.colorIdx]
          ctx.fillStyle = `rgba(${r},${g},${b},${alpha})`
        } else {
          // Blue-white star color — natural starfield
          ctx.fillStyle = `rgba(220,218,245,${alpha})`
        }

        ctx.beginPath()
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2)
        ctx.fill()

        // Diffuse glow for the larger stars
        if (s.r > 1.8) {
          const glow = ctx.createRadialGradient(s.x, s.y, 0, s.x, s.y, s.r * 4.5)
          const gc = s.isColored ? PALETTE[s.colorIdx] : [220, 218, 245]
          glow.addColorStop(0,   `rgba(${gc[0]},${gc[1]},${gc[2]},${alpha * 0.3})`)
          glow.addColorStop(1,   `rgba(${gc[0]},${gc[1]},${gc[2]},0)`)
          ctx.beginPath()
          ctx.arc(s.x, s.y, s.r * 4.5, 0, Math.PI * 2)
          ctx.fillStyle = glow
          ctx.fill()
        }
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
