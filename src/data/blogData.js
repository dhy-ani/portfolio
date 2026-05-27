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

export const POSTS = [
  {
    id: 'hello-world',
    title: 'Hello, World — Starting This Blog',
    date: '2025-05-27',
    topic: 'life',
    collection: 'student-life',
    excerpt: 'Everyone starts somewhere. Here is where I am starting — a quick note on what this space will be.',
    content: [
      { type: 'p', text: 'I have been meaning to start writing for a while. Not because I have all the answers — I definitely do not — but because articulating thoughts clearly is a skill I want to build, and the best way to do that is to actually write things down.' },
      { type: 'h2', text: 'Why a Blog?' },
      { type: 'p', text: 'Part portfolio extension, part journal, part way to organize what I am learning. I spend a lot of time reading other people\'s technical blogs and getting real value from them. This is my attempt to contribute something back.' },
      { type: 'h2', text: 'What to Expect' },
      { type: 'ul', items: [
        'Notes on machine learning and computer vision — things I actually built or ran into',
        'Research reflections from CNALab and other projects',
        'Web dev decisions and what I would do differently',
        'The occasional honest student-life post',
      ]},
      { type: 'quote', text: 'The best way to understand something deeply is to try to explain it clearly to someone else.' },
      { type: 'p', text: 'No newsletter pop-ups. No cookie banners. Just writing. See you in the next one.' },
    ],
    readTime: 2,
    tags: ['intro', 'meta'],
  },
  {
    id: 'mediapipe-30fps',
    title: 'What I Learned Running MediaPipe at 30 FPS',
    date: '2025-04-15',
    topic: 'research',
    collection: 'research-lab',
    excerpt: 'Real-time pose estimation for rehabilitation tracking taught me a lot about the gap between research demos and systems that actually work.',
    content: [
      { type: 'p', text: 'At CNALab, my job was to build a system that could track mobility impairment in patients using only a standard webcam. MediaPipe BlazePose seemed like the obvious choice — 33 keypoints, runs in real time, well-documented. And it was the right choice. But not without surprises.' },
      { type: 'h2', text: 'The Problem Nobody Shows in the Demo' },
      { type: 'p', text: 'MediaPipe runs fast on modern hardware. What I did not anticipate was frame-to-frame variance. Keypoint coordinates jitter between frames even when the subject is not moving. For a demo, this is invisible. For clinical-grade analysis of movement patterns, it breaks everything.' },
      { type: 'h2', text: 'Building the Preprocessing Pipeline' },
      { type: 'p', text: 'The fix was a three-stage preprocessing layer before any classification touched the keypoints:' },
      { type: 'ul', items: [
        'Frame differencing — only process frames with meaningful pixel delta, skip near-duplicates',
        'Temporal smoothing — exponential moving average across keypoint positions per frame',
        'Angle normalization — convert raw (x, y) positions to joint angles to remove camera-angle sensitivity',
      ]},
      { type: 'code', text: '# EMA smoothing per keypoint\nsmoothed = alpha * current_kp + (1 - alpha) * prev_smoothed\n\n# Joint angle from two keypoints\nangle = np.degrees(np.arctan2(b[1] - a[1], b[0] - a[0]))' },
      { type: 'p', text: 'After normalization, I evaluated a CNN classifier on 2,400+ labeled video clips. Consistency shot up. The pipeline — not the model architecture — was the difference.' },
      { type: 'h2', text: 'The Actual Lesson' },
      { type: 'quote', text: 'A model that performs at 90% in demo conditions might fall to 60% in the wild. Closing that gap is where the real engineering happens.' },
      { type: 'p', text: 'The project won 1st place at the NJIT Research Forum among 40+ teams. But more than the award, I came out with a framework for thinking about the demo-to-production gap that I use in every ML project now.' },
    ],
    readTime: 5,
    tags: ['mediapipe', 'computer-vision', 'research', 'njit'],
  },
]
