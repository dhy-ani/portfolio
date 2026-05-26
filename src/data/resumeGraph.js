// Knowledge-graph data for every project and experience.
// Every entry has nodes in all four categories:
//   tool    (lavender) — technologies, frameworks, software used
//   concept (pink)     — methods, approaches, techniques applied
//   outcome (butter)   — measurable results, deliverables, awards
//   context (sky blue) — where / when / for whom

export const NODE_TYPES = {
  tool:    { color: '#c4b5fd', glow: 'rgba(196,181,253,0.6)' },
  concept: { color: '#f4a0b5', glow: 'rgba(244,160,181,0.6)' },
  outcome: { color: '#fde68a', glow: 'rgba(253,230,138,0.6)' },
  context: { color: '#7dd3fc', glow: 'rgba(125,211,252,0.5)' },
}

export const GRAPHS = {

  /* ── PROJECTS ─────────────────────────────────────────── */

  ADPVerse: {
    nodes: [
      { id: 'python',     label: 'Python',              type: 'tool' },
      { id: 'react',      label: 'React',               type: 'tool' },
      { id: 'sqlite',     label: 'SQLite',              type: 'tool' },
      { id: 'elevenlabs', label: 'ElevenLabs API',      type: 'tool' },
      { id: 'sentiment',  label: 'Sentiment Analysis',  type: 'concept' },
      { id: 'multimodal', label: 'Multimodal AI',       type: 'concept' },
      { id: 'pipeline',   label: 'Real-time Pipeline',  type: 'concept' },
      { id: 'award',      label: '🏆 Best AI Analytics', type: 'outcome' },
      { id: 'scoring',    label: 'Live Pitch Scoring',  type: 'outcome' },
      { id: 'hackathon',  label: 'HackHers Hackathon',  type: 'context' },
    ],
    edges: [
      { from: 'python',     to: 'sentiment'  },
      { from: 'python',     to: 'pipeline'   },
      { from: 'elevenlabs', to: 'multimodal' },
      { from: 'react',      to: 'pipeline'   },
      { from: 'sqlite',     to: 'pipeline'   },
      { from: 'sentiment',  to: 'multimodal' },
      { from: 'pipeline',   to: 'scoring'    },
      { from: 'scoring',    to: 'award'      },
      { from: 'hackathon',  to: 'award'      },
    ],
  },

  AgentWeave: {
    nodes: [
      { id: 'clip',    label: 'CLIP Embeddings',    type: 'tool' },
      { id: 'faiss',   label: 'FAISS Clustering',   type: 'tool' },
      { id: 'yolo',    label: 'YOLOv5',             type: 'tool' },
      { id: 'firebase',label: 'Firebase',           type: 'tool' },
      { id: 'react',   label: 'React',              type: 'tool' },
      { id: 'scraping',label: 'Pinterest Scraping', type: 'concept' },
      { id: 'embed',   label: 'Visual Embeddings',  type: 'concept' },
      { id: 'body',    label: 'Body-type Matching', type: 'concept' },
      { id: 'fashion', label: 'Fashion Recommender',type: 'outcome' },
      { id: 'dataset', label: 'Image Dataset',      type: 'outcome' },
      { id: 'personal',label: 'Personal Project',   type: 'context' },
    ],
    edges: [
      { from: 'clip',    to: 'embed'   },
      { from: 'faiss',   to: 'embed'   },
      { from: 'yolo',    to: 'body'    },
      { from: 'scraping',to: 'clip'    },
      { from: 'scraping',to: 'dataset' },
      { from: 'embed',   to: 'fashion' },
      { from: 'body',    to: 'fashion' },
      { from: 'firebase',to: 'fashion' },
      { from: 'react',   to: 'fashion' },
      { from: 'personal',to: 'fashion' },
    ],
  },

  'Skincare AI Recommender': {
    nodes: [
      { id: 'pytorch', label: 'PyTorch',           type: 'tool' },
      { id: 'fastapi', label: 'FastAPI',           type: 'tool' },
      { id: 'gradcam', label: 'Grad-CAM',          type: 'tool' },
      { id: 'firebase',label: 'Firebase',          type: 'tool' },
      { id: 'cnn',     label: 'CNN Classifier',    type: 'concept' },
      { id: 'explain', label: 'Explainability',    type: 'concept' },
      { id: 'webcam',  label: 'Live Webcam Input', type: 'concept' },
      { id: 'skincare',label: 'Skincare AI Tool',  type: 'outcome' },
      { id: 'deploy',  label: 'Live Deployment',   type: 'outcome' },
      { id: 'njit',    label: 'NJIT AI Coursework',type: 'context' },
    ],
    edges: [
      { from: 'pytorch', to: 'cnn'      },
      { from: 'gradcam', to: 'explain'  },
      { from: 'cnn',     to: 'explain'  },
      { from: 'fastapi', to: 'webcam'   },
      { from: 'webcam',  to: 'skincare' },
      { from: 'explain', to: 'skincare' },
      { from: 'firebase',to: 'deploy'   },
      { from: 'skincare',to: 'deploy'   },
      { from: 'njit',    to: 'skincare' },
    ],
  },

  'NoteShare Platform': {
    nodes: [
      { id: 'spring',   label: 'Spring Boot',       type: 'tool' },
      { id: 'pg',       label: 'PostgreSQL',        type: 'tool' },
      { id: 'aws',      label: 'AWS S3',            type: 'tool' },
      { id: 'jwt',      label: 'JWT',               type: 'tool' },
      { id: 'react',    label: 'React',             type: 'tool' },
      { id: 'api',      label: 'REST API',          type: 'concept' },
      { id: 'auth',     label: 'Authentication',    type: 'concept' },
      { id: 'storage',  label: 'Cloud File Storage',type: 'concept' },
      { id: 'platform', label: 'Academic Platform', type: 'outcome' },
      { id: 'fullstack',label: 'Full-Stack Deploy', type: 'outcome' },
      { id: 'njit',     label: 'NJIT Course Project',type: 'context' },
    ],
    edges: [
      { from: 'spring', to: 'api'       },
      { from: 'jwt',    to: 'auth'      },
      { from: 'pg',     to: 'platform'  },
      { from: 'aws',    to: 'storage'   },
      { from: 'api',    to: 'platform'  },
      { from: 'auth',   to: 'platform'  },
      { from: 'storage',to: 'fullstack' },
      { from: 'react',  to: 'platform'  },
      { from: 'platform',to: 'fullstack'},
      { from: 'njit',   to: 'platform'  },
    ],
  },

  'Tea & Coffee Accessories': {
    nodes: [
      { id: 'mysql', label: 'MySQL',       type: 'tool' },
      { id: 'php',   label: 'PHP',         type: 'tool' },
      { id: 'ajax',  label: 'AJAX',        type: 'tool' },
      { id: 'js',    label: 'JavaScript',  type: 'tool' },
      { id: 'crud',  label: 'CRUD Ops',    type: 'concept' },
      { id: 'live',  label: 'Live Inventory Updates', type: 'concept' },
      { id: 'sec',   label: 'SQL Injection Protection', type: 'concept' },
      { id: 'ecom',  label: 'E-commerce Store',  type: 'outcome' },
      { id: 'secure',label: 'Secure Backend',    type: 'outcome' },
      { id: 'it202', label: 'NJIT IT202',         type: 'context' },
    ],
    edges: [
      { from: 'mysql', to: 'crud'   },
      { from: 'mysql', to: 'sec'    },
      { from: 'php',   to: 'crud'   },
      { from: 'ajax',  to: 'live'   },
      { from: 'js',    to: 'live'   },
      { from: 'crud',  to: 'ecom'   },
      { from: 'live',  to: 'ecom'   },
      { from: 'sec',   to: 'secure' },
      { from: 'secure',to: 'ecom'   },
      { from: 'it202', to: 'ecom'   },
    ],
  },

  'LinkedIn Redesign': {
    nodes: [
      { id: 'figma',   label: 'Figma',                   type: 'tool' },
      { id: 'react',   label: 'React',                   type: 'tool' },
      { id: 'css',     label: 'CSS / SCSS',              type: 'tool' },
      { id: 'ux',      label: 'UX Design',               type: 'concept' },
      { id: 'ia',      label: 'Information Architecture', type: 'concept' },
      { id: 'wire',    label: 'Wireframing',             type: 'concept' },
      { id: 'proto',   label: 'Prototyping',             type: 'concept' },
      { id: 'visual',  label: 'Visual Design System',    type: 'concept' },
      { id: 'result',  label: 'Redesigned Interface',    type: 'outcome' },
      { id: 'usability',label: 'Improved Usability',     type: 'outcome' },
      { id: 'linkedin',label: 'LinkedIn Platform',       type: 'context' },
    ],
    edges: [
      { from: 'figma',    to: 'wire'      },
      { from: 'figma',    to: 'proto'     },
      { from: 'ux',       to: 'ia'        },
      { from: 'ia',       to: 'wire'      },
      { from: 'wire',     to: 'proto'     },
      { from: 'proto',    to: 'result'    },
      { from: 'visual',   to: 'result'    },
      { from: 'css',      to: 'visual'    },
      { from: 'react',    to: 'result'    },
      { from: 'result',   to: 'usability' },
      { from: 'linkedin', to: 'result'    },
    ],
  },

  /* ── EXPERIENCE ───────────────────────────────────────── */

  'AI & Machine Learning Fellow': {
    nodes: [
      { id: 'python',  label: 'Python Bootcamp',     type: 'tool' },
      { id: 'sklearn', label: 'Scikit-learn',        type: 'tool' },
      { id: 'jupyter', label: 'Jupyter Notebooks',   type: 'tool' },
      { id: 'ml',      label: 'Machine Learning',    type: 'concept' },
      { id: 'wrangle', label: 'Data Wrangling',      type: 'concept' },
      { id: 'pred',    label: 'Predictive Modeling', type: 'concept' },
      { id: 'fellow',  label: 'AI/ML Fellowship',    type: 'outcome' },
      { id: 'sel',     label: 'Selected / 4,000+ Applicants', type: 'outcome' },
      { id: 'cornell', label: 'Cornell Tech',        type: 'context' },
    ],
    edges: [
      { from: 'python',  to: 'ml'      },
      { from: 'python',  to: 'wrangle' },
      { from: 'sklearn', to: 'pred'    },
      { from: 'jupyter', to: 'wrangle' },
      { from: 'wrangle', to: 'pred'    },
      { from: 'ml',      to: 'pred'    },
      { from: 'pred',    to: 'fellow'  },
      { from: 'cornell', to: 'fellow'  },
      { from: 'fellow',  to: 'sel'     },
    ],
  },

  'AI & ML Research Intern': {
    nodes: [
      { id: 'python',   label: 'Python',               type: 'tool' },
      { id: 'opencv',   label: 'OpenCV',               type: 'tool' },
      { id: 'mediapipe',label: 'MediaPipe',            type: 'tool' },
      { id: 'pose',     label: 'Pose Estimation',      type: 'concept' },
      { id: 'keypoint', label: 'Keypoint Detection',   type: 'concept' },
      { id: 'rehab',    label: 'AI Rehabilitation',    type: 'concept' },
      { id: 'tracking', label: 'Mobility Tracking',    type: 'concept' },
      { id: 'accuracy', label: '35% Accuracy Gain',    type: 'outcome' },
      { id: 'award',    label: '🏆 1st Place Research Forum', type: 'outcome' },
      { id: 'cnalab',   label: 'CNALab @ NJIT',        type: 'context' },
    ],
    edges: [
      { from: 'python',    to: 'opencv'   },
      { from: 'opencv',    to: 'pose'     },
      { from: 'mediapipe', to: 'keypoint' },
      { from: 'pose',      to: 'keypoint' },
      { from: 'keypoint',  to: 'accuracy' },
      { from: 'keypoint',  to: 'tracking' },
      { from: 'tracking',  to: 'rehab'    },
      { from: 'rehab',     to: 'award'    },
      { from: 'accuracy',  to: 'award'    },
      { from: 'cnalab',    to: 'award'    },
    ],
  },

  'UX Research Assistant': {
    nodes: [
      { id: 'figma',      label: 'Figma',               type: 'tool' },
      { id: 'miro',       label: 'Miro',                type: 'tool' },
      { id: 'forms',      label: 'Survey Tools',        type: 'tool' },
      { id: 'interviews', label: '25+ User Interviews', type: 'concept' },
      { id: 'usability',  label: 'Usability Analysis',  type: 'concept' },
      { id: 'personas',   label: 'Personas',            type: 'concept' },
      { id: 'segment',    label: 'Segmentation Analysis',type: 'concept' },
      { id: 'journey',    label: 'Journey Mapping',     type: 'concept' },
      { id: 'storyboard', label: 'UX Storyboards',      type: 'outcome' },
      { id: 'strategy',   label: 'Strategy Reports',    type: 'outcome' },
      { id: 'njit',       label: 'NJIT Informatics Dept',type: 'context' },
    ],
    edges: [
      { from: 'figma',      to: 'storyboard' },
      { from: 'miro',       to: 'journey'    },
      { from: 'forms',      to: 'interviews' },
      { from: 'interviews', to: 'usability'  },
      { from: 'usability',  to: 'personas'   },
      { from: 'personas',   to: 'segment'    },
      { from: 'segment',    to: 'journey'    },
      { from: 'journey',    to: 'storyboard' },
      { from: 'storyboard', to: 'strategy'   },
      { from: 'njit',       to: 'strategy'   },
    ],
  },
}
