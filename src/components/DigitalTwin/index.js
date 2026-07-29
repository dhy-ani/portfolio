import { useState, useRef, useEffect } from 'react'
import useScrollReveal from '../../hooks/useScrollReveal'
import './index.scss'

const API_URL = process.env.REACT_APP_TWIN_API_URL || ''

const SUGGESTIONS = [
  'What are you currently building?',
  'Tell me about your AI research.',
  'What projects are you most proud of?',
  'What\'s your experience with agentic AI?',
]

const DigitalTwin = () => {
  const titleRef  = useScrollReveal(0.2)
  const wrapRef   = useScrollReveal(0.1)
  const bottomRef = useRef(null)

  const [input,    setInput]   = useState('')
  const [messages, setMessages] = useState([])
  const [history,  setHistory]  = useState([])
  const [loading,  setLoading]  = useState(false)
  const [error,    setError]    = useState(null)
  const [active,   setActive]   = useState(false)

  useEffect(() => {
    if (bottomRef.current)
      bottomRef.current.scrollIntoView({ behavior: 'smooth' })
  }, [messages, loading])

  const send = async (text) => {
    const msg = text || input
    if (!msg.trim() || loading) return
    if (!API_URL) {
      setError('Twin API not configured yet. Check back soon.')
      return
    }

    setActive(true)
    setInput('')
    setError(null)
    setMessages(prev => [...prev, { role: 'user', content: msg }])
    setLoading(true)

    try {
      const res = await fetch(`${API_URL}/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: msg, history }),
      })
      if (!res.ok) throw new Error(`Server error ${res.status}`)
      const data = await res.json()
      const reply = data.response
      setMessages(prev => [...prev, { role: 'assistant', content: reply }])
      setHistory(prev => [
        ...prev,
        { role: 'user', content: msg },
        { role: 'assistant', content: reply },
      ])
    } catch (e) {
      setError('Twin is temporarily offline. Try again in a moment.')
    } finally {
      setLoading(false)
    }
  }

  const onKey = e => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send() }
  }

  return (
    <section id="digital-twin" className="twin-section section">
      <div className="section-inner">
        <div className="terminal-label">&gt; digital_twin.exe</div>

        <div ref={titleRef} className="scroll-reveal">
          <h2 className="section-title">Ask Me Anything</h2>
          <p className="twin-intro">
            My AI twin knows my projects, experience, and what I'm building.
            Ask it anything — and if it doesn't know, I'll get a notification to fill in the gap.
          </p>
        </div>

        <div ref={wrapRef} className="scroll-reveal twin-wrap">

          {/* Header */}
          <div className="twin-header">
            <span className="twin-status">
              <span className="twin-dot" />
              TWIN ONLINE
            </span>
            <span className="twin-model">gpt-4o-mini · tool-augmented</span>
          </div>

          {/* Messages */}
          {messages.length > 0 && (
            <div className="twin-messages">
              {messages.map((m, i) => (
                <div key={i} className={`twin-msg twin-msg--${m.role}`}>
                  <span className="twin-msg-prefix">
                    {m.role === 'user' ? '> you' : '> twin'}
                  </span>
                  <p className="twin-msg-text">{m.content}</p>
                </div>
              ))}
              {loading && (
                <div className="twin-msg twin-msg--assistant">
                  <span className="twin-msg-prefix">&gt; twin</span>
                  <span className="twin-typing">
                    <span /><span /><span />
                  </span>
                </div>
              )}
              {error && (
                <div className="twin-error">{error}</div>
              )}
              <div ref={bottomRef} />
            </div>
          )}

          {/* Suggestions (shown before first message) */}
          {messages.length === 0 && !loading && (
            <div className="twin-suggestions">
              {SUGGESTIONS.map(s => (
                <button key={s} className="twin-chip" onClick={() => send(s)}>
                  {s}
                </button>
              ))}
            </div>
          )}

          {/* Input row */}
          <div className="twin-input-row">
            <span className="twin-prompt">{'>'}</span>
            <input
              className="twin-input"
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={onKey}
              onFocus={() => setActive(true)}
              placeholder={active ? 'ask about my work, projects, or background...' : 'ask me anything about Dhyani...'}
              disabled={loading}
              autoComplete="off"
            />
            <button
              className="twin-send"
              onClick={() => send()}
              disabled={loading || !input.trim()}
            >
              send
            </button>
          </div>

        </div>
      </div>
    </section>
  )
}

export default DigitalTwin
