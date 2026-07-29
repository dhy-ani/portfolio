import { useState, useRef, useEffect } from 'react'
import useScrollReveal from '../../hooks/useScrollReveal'
import './index.scss'

const API_URL = process.env.REACT_APP_TWIN_API_URL || ''

const SUGGESTIONS = [
  'What are you currently building?',
  'Tell me about your AI research.',
  'What projects are you most proud of?',
  "What's your experience with agentic AI?",
]

const DigitalTwin = () => {
  const titleRef  = useScrollReveal(0.2)
  const wrapRef   = useScrollReveal(0.1)
  const bottomRef = useRef(null)
  const inputRef  = useRef(null)

  const [input,    setInput]    = useState('')
  const [messages, setMessages] = useState([])
  const [history,  setHistory]  = useState([])
  const [loading,  setLoading]  = useState(false)
  const [error,    setError]    = useState(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages, loading])

  const send = async (text) => {
    const msg = (text || input).trim()
    if (!msg || loading) return
    if (!API_URL) {
      setError('Twin API is being set up. Check back soon.')
      return
    }

    setInput('')
    setError(null)
    setMessages(prev => [...prev, { role: 'user', content: msg }])
    setLoading(true)
    inputRef.current?.focus()

    try {
      const res = await fetch(`${API_URL}/chat`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: msg, history }),
      })
      if (!res.ok) throw new Error(res.status)
      const data = await res.json()
      setMessages(prev => [...prev, { role: 'assistant', content: data.response }])
      setHistory(prev => [
        ...prev,
        { role: 'user', content: msg },
        { role: 'assistant', content: data.response },
      ])
    } catch {
      setError('Twin is temporarily offline. Try again in a moment.')
      setMessages(prev => prev.slice(0, -1))
    } finally {
      setLoading(false)
    }
  }

  const onKey = e => {
    if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); send() }
  }

  const hasChat = messages.length > 0 || loading

  return (
    <section id="digital-twin" className="twin-section section">
      <div className="section-inner">
        <div className="terminal-label">&gt; digital_twin.exe</div>

        <div ref={titleRef} className="scroll-reveal">
          <h2 className="section-title">Ask Me Anything</h2>
          <p className="twin-intro">
            My AI twin knows my background, projects, and what I'm building.
            Ask it anything — unknown questions ping me directly so I can fill the gap.
          </p>
        </div>

        <div ref={wrapRef} className="scroll-reveal twin-wrap">

          {/* Header */}
          <div className="twin-header">
            <div className="twin-identity">
              <span className="twin-avatar-sm">◈</span>
              <span className="twin-name">dhyani.twin</span>
            </div>
            <span className="twin-status">
              <span className="twin-dot" />
              online
            </span>
          </div>

          {/* Chat body */}
          <div className={`twin-body ${hasChat ? 'twin-body--active' : ''}`}>

            {/* Welcome state */}
            {!hasChat && (
              <div className="twin-welcome">
                <div className="twin-avatar-lg">◈</div>
                <p className="twin-welcome-text">
                  Hey there. I'm Dhyani's digital twin. Ask me about her work,
                  projects, research, or what she's building next.
                </p>
                <div className="twin-suggestions">
                  {SUGGESTIONS.map(s => (
                    <button key={s} className="twin-chip" onClick={() => send(s)}>
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Messages */}
            {hasChat && (
              <div className="twin-messages">
                {messages.map((m, i) => (
                  <div key={i} className={`twin-msg twin-msg--${m.role}`}>
                    <span className="twin-msg-label">
                      {m.role === 'user' ? 'you' : '◈ twin'}
                    </span>
                    <p className="twin-msg-text">{m.content}</p>
                  </div>
                ))}

                {loading && (
                  <div className="twin-msg twin-msg--assistant">
                    <span className="twin-msg-label">◈ twin</span>
                    <span className="twin-typing"><span /><span /><span /></span>
                  </div>
                )}

                {error && <p className="twin-error">{error}</p>}
                <div ref={bottomRef} />
              </div>
            )}
          </div>

          {/* Input row */}
          <div className="twin-input-row">
            <input
              ref={inputRef}
              className="twin-input"
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={onKey}
              placeholder="ask about my work, projects, or background..."
              disabled={loading}
              autoComplete="off"
            />
            <button
              className="twin-send"
              onClick={() => send()}
              disabled={loading || !input.trim()}
              title="Send (Enter)"
            >
              ↵
            </button>
          </div>

        </div>
      </div>
    </section>
  )
}

export default DigitalTwin
