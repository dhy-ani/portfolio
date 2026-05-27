import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { POSTS, TOPICS, COLLECTIONS } from '../../data/blogData'
import './index.scss'

const fmt = iso =>
  new Date(iso).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })

const Blogs = () => {
  const navigate = useNavigate()
  const [activeTopic,      setActiveTopic]      = useState('all')
  const [activeCollection, setActiveCollection] = useState(null)
  const [sortDesc,         setSortDesc]         = useState(true)

  // Scroll to top on mount
  useEffect(() => { window.scrollTo(0, 0) }, [])

  const filtered = POSTS
    .filter(p => {
      if (activeCollection) return p.collection === activeCollection
      if (activeTopic !== 'all') return p.topic === activeTopic
      return true
    })
    .sort((a, b) => {
      const d = new Date(b.date) - new Date(a.date)
      return sortDesc ? d : -d
    })

  const getTopicMeta = id => TOPICS.find(t => t.id === id) ?? TOPICS[0]
  const getCollection = id => COLLECTIONS.find(c => c.id === id)

  const handleCollectionClick = id => {
    setActiveCollection(activeCollection === id ? null : id)
    setActiveTopic('all')
  }

  return (
    <div className="blog-page">
      {/* ── Page header ── */}
      <div className="blog-header">
        <p className="blog-terminal-label">{'> blog.init()'}</p>
        <h1 className="blog-title">My Blog</h1>
        <p className="blog-subtitle">
          Notes on machine learning, things I built, and what I'm learning along the way.
        </p>
      </div>

      <div className="blog-body">

        {/* ── Collections ── */}
        <section className="blog-collections">
          <p className="blog-section-label">{'// collections'}</p>
          <div className="collections-grid">
            {COLLECTIONS.map(col => {
              const count = POSTS.filter(p => p.collection === col.id).length
              const isActive = activeCollection === col.id
              return (
                <button
                  key={col.id}
                  className={`collection-card ${isActive ? 'active' : ''}`}
                  style={{ '--col-color': col.color }}
                  onClick={() => handleCollectionClick(col.id)}
                >
                  <span className="col-icon">{col.icon}</span>
                  <div className="col-body">
                    <span className="col-name">{col.name}</span>
                    <span className="col-desc">{col.description}</span>
                    <span className="col-count">{count} {count === 1 ? 'post' : 'posts'}</span>
                  </div>
                </button>
              )
            })}
          </div>
        </section>

        {/* ── Filters ── */}
        <section className="blog-filters">
          <div className="topic-tabs">
            {TOPICS.map(t => (
              <button
                key={t.id}
                className={`topic-tab ${activeTopic === t.id && !activeCollection ? 'active' : ''}`}
                style={{ '--t-color': t.color }}
                onClick={() => { setActiveTopic(t.id); setActiveCollection(null) }}
              >
                {t.label}
              </button>
            ))}
          </div>
          <button
            className={`sort-btn ${sortDesc ? '' : 'asc'}`}
            onClick={() => setSortDesc(d => !d)}
          >
            {sortDesc ? '↓ Newest' : '↑ Oldest'}
          </button>
        </section>

        {/* ── Post grid ── */}
        <section className="blog-posts">
          <p className="blog-section-label">
            {'// '}
            {activeCollection
              ? `collection: ${getCollection(activeCollection)?.name}`
              : activeTopic === 'all' ? 'all posts' : activeTopic}
            {' · '}{filtered.length} {filtered.length === 1 ? 'post' : 'posts'}
          </p>

          {filtered.length === 0 ? (
            <div className="blog-empty">
              <span className="empty-prompt">{'>'}</span>
              <span> no posts found. check back soon.</span>
            </div>
          ) : (
            <div className="posts-grid">
              {filtered.map(post => {
                const topic = getTopicMeta(post.topic)
                return (
                  <article
                    key={post.id}
                    className="post-card"
                    onClick={() => navigate(`/blogs/${post.id}`)}
                  >
                    <div className="post-card-top">
                      <span className="post-topic-tag" style={{ color: topic.color, borderColor: topic.color + '55' }}>
                        ● {topic.label}
                      </span>
                      <span className="post-date">{fmt(post.date)}</span>
                    </div>
                    <h2 className="post-card-title">{post.title}</h2>
                    <p className="post-card-excerpt">{post.excerpt}</p>
                    <div className="post-card-footer">
                      <span className="post-read-time">{post.readTime} min read</span>
                      <span className="post-read-more">Read →</span>
                    </div>
                  </article>
                )
              })}
            </div>
          )}
        </section>
      </div>
    </div>
  )
}

export default Blogs
