import { useEffect } from 'react'
import { POSTS, COLLECTIONS } from '../../data/blogData'
import './index.scss'

const Blogs = () => {
  useEffect(() => { window.scrollTo(0, 0) }, [])

  const hasPosts = POSTS.length > 0

  return (
    <div className="blog-page">
      <div className="blog-header">
        <p className="blog-terminal-label">{'> blog.init()'}</p>
        <h1 className="blog-title">My Blog</h1>
        <p className="blog-subtitle">
          Notes on machine learning, things I built, and what I'm learning along the way.
        </p>
      </div>

      {!hasPosts && (
        <div className="blog-coming-soon">
          <div className="cs-glow" aria-hidden="true" />
          <p className="cs-label">{'> status: drafting'}</p>
          <h2 className="cs-heading">Coming Soon</h2>
          <p className="cs-sub">First posts dropping shortly. Check back soon.</p>
          <div className="cs-dots">
            <span /><span /><span />
          </div>
        </div>
      )}

      {hasPosts && (
        <div className="blog-body">
          <section className="blog-collections">
            <p className="blog-section-label">{'// collections'}</p>
            <div className="collections-grid">
              {COLLECTIONS.map(col => {
                const count = POSTS.filter(p => p.collection === col.id).length
                return (
                  <div key={col.id} className="collection-card" style={{ '--col-color': col.color }}>
                    <span className="col-icon">{col.icon}</span>
                    <div className="col-body">
                      <span className="col-name">{col.name}</span>
                      <span className="col-desc">{col.description}</span>
                      <span className="col-count">{count} {count === 1 ? 'post' : 'posts'}</span>
                    </div>
                  </div>
                )
              })}
            </div>
          </section>

          <section className="blog-posts">
            <p className="blog-section-label">{'// all posts · '}{POSTS.length} posts</p>
            <div className="posts-grid">
              {POSTS.map(post => (
                <article key={post.id} className="post-card">
                  <h2 className="post-card-title">{post.title}</h2>
                  <p className="post-card-excerpt">{post.excerpt}</p>
                </article>
              ))}
            </div>
          </section>
        </div>
      )}
    </div>
  )
}

export default Blogs
