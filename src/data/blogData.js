// ── Blog data ────────────────────────────────────────────────────────────
// To add a new post: copy a POSTS entry, give it a unique `id`, fill in
// your content blocks, and set the topic / collection / date.
//
// Content block types:
//   { type: 'p',     text: '...' }           — paragraph
//   { type: 'h2',    text: '...' }           — subheading
//   { type: 'code',  text: '...' }           — code block (Courier New)
//   { type: 'quote', text: '...' }           — pull quote
//   { type: 'ul',    items: ['...', '...'] } — bullet list

export const TOPICS = [
  { id: 'all',      label: 'All',              color: '#c4b5fd' },
  { id: 'ml',       label: 'Machine Learning', color: '#f4a0b5' },
  { id: 'research', label: 'Research',         color: '#fde68a' },
  { id: 'dev',      label: 'Web Dev',          color: '#c4b5fd' },
  { id: 'life',     label: 'Student Life',     color: '#7dd3fc' },
]

export const COLLECTIONS = [
  {
    id: 'research-lab',
    name: 'From the Lab',
    description: 'Notes and findings from my AI/ML research at CNALab and beyond.',
    color: '#f4a0b5',
    icon: '◈',
  },
  {
    id: 'building',
    name: 'Building Things',
    description: 'What I learned while building projects — decisions, trade-offs, and breakthroughs.',
    color: '#c4b5fd',
    icon: '◆',
  },
  {
    id: 'student-life',
    name: 'CS Student Life',
    description: 'The honest version of learning computer science as a junior in college.',
    color: '#fde68a',
    icon: '◉',
  },
]

// Add your posts here when ready to publish
export const POSTS = []
