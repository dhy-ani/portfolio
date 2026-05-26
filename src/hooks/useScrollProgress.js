import { useState, useEffect } from 'react'

const useScrollProgress = () => {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    let frameId = null

    const compute = () => {
      const el  = document.documentElement
      const top = el.scrollTop || document.body.scrollTop
      const h   = el.scrollHeight - el.clientHeight
      // Round to integers so React skips re-renders when value hasn't changed
      const pct = h > 0 ? Math.round(Math.min((top / h) * 100, 100)) : 0
      setProgress(pct)
      frameId = null
    }

    const handler = () => {
      if (frameId) return          // already queued — skip
      frameId = requestAnimationFrame(compute)
    }

    window.addEventListener('scroll', handler, { passive: true })
    compute() // initial value
    return () => {
      window.removeEventListener('scroll', handler)
      if (frameId) cancelAnimationFrame(frameId)
    }
  }, [])

  return progress
}

export default useScrollProgress
