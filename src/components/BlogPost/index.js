import { useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { POSTS, TOPICS, COLLECTIONS } from '../../data/blogData'
import './index.scss'

const fmt = iso =>
  new Date(iso).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })

const ContentBlock = ({ block }) => {
  switch (block.type) {
    case 'h2':    return <h2 className="bp-h2">{block.text}</h2>
    case 'quote': return <blockquote className="bp-quote">{block.text}</blockquote>
    case 'code':  return <pre className="bp-code"><code>{block.text}</code></pre>
    case 'ul':    return (
      <ul className="bp-ul">
        {block.items.map((item, i) => <li key={i}>{item}</li>)}
      </ul>
    )
    default:      return <p className="bp-p">{block.text}</p>
  }
}

const BlogPost = () => {
  const { id }   = useParams()
  const navigate = useNavigate()

  const post  = POSTS.find(p => p.id === id)
  const idx   = POSTS.findIndex(p => p.id === id)
  const prev  = POSTS[idx - 1] ?? null
  const next  = POSTS[idx + 1] ?? null

  const topic      = TOPICS.find(t => t.id === post?.topic)
  const collection = COLLECTIONS.find(c => c.id === post?.collection)

  useEffect(() => { window.scrollTo(0, 0) }, [id])

  if (!post) return (
    <div className="bp-not-found">
      <p className="blog-terminal-label">{'> error: post_not_found'}</p>
      <button className="bp-back-btn" onClick={() => navigate('/blogs')}>← back to blog</button>
    </div>
  )

  return (
    <article className="bp-page">

      {/* ── Back ── */}
      <button className="bp-back-btn" onClick={() => navigate('/blogs')}>
        ← back to blog
      </button>

      {/* ── Post header ── */}
      <header className="bp-header">
        <div className="bp-meta-row">
          {topic && (
            <span className="bp-topic-tag" style={{ color: topic.color, borderColor: topic.color + '55' }}>
              ● {topic.label}
            </span>
          )}
          {collection && (
            <span className="bp-collection-tag" style={{ color: collection.color }}>
              {collection.icon} {collection.name}
            </span>
          )}
          <span className="bp-date">{fmt(post.date)}</span>
          <span className="bp-read-time">{post.readTime} min read</span>
        </div>

        <h1 className="bp-title">{post.title}</h1>
        <p className="bp-excerpt">{post.excerpt}</p>
      </header>

      {/* ── Divider ── */}
      <div className="bp-divider" />

      {/* ── Content ── */}
      <div className="bp-content">
        {post.content.map((block, i) => (
          <ContentBlock key={i} block={block} />
        ))}
      </div>

      {/* ── Tags ── */}
      {post.tags?.length > 0 && (
        <div className="bp-tags">
          {post.tags.map(tag => (
            <span key={tag} className="bp-tag">#{tag}</span>
          ))}
        </div>
      )}

      {/* ── Prev / Next ── */}
      <div className="bp-nav">
        {prev ? (
          <button className="bp-nav-btn prev" onClick={() => navigate(`/blogs/${prev.id}`)}>
            <span className="bp-nav-label">← Previous</span>
            <span className="bp-nav-title">{prev.title}</span>
          </button>
        ) : <div />}
        {next ? (
          <button className="bp-nav-btn next" onClick={() => navigate(`/blogs/${next.id}`)}>
            <span className="bp-nav-label">Next →</span>
            <span className="bp-nav-title">{next.title}</span>
          </button>
        ) : <div />}
      </div>

    </article>
  )
}

export default BlogPost
