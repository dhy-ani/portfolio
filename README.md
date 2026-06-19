# Dhyani Soni — Portfolio

A single-page portfolio built with React. Features a MET museum-inspired dark theme, rose editorial light mode, interactive animations, flip-card projects with embedded force-directed graphs, and full dark / light mode support (light is default).

**Live site → [dhy-ani.github.io/portfolio](https://dhy-ani.github.io/portfolio)**

---

## Features

- **Gold dust background** — canvas-drawn warm amber motes drift slowly upward; no stars, no lines
- **Cursor spotlight** — warm gold radial glow trails the cursor like a museum lamp (hidden on touch)
- **Terminal boot sequence** — hero section animates through a system-init sequence on load
- **Interactive letters** — individual characters in the headline jump and glow on hover
- **Skill Network** — SVG knowledge graph with phase-based staggered reveal and live edge highlighting
- **Flip-card projects** — cards flip to reveal a live force-directed knowledge graph per project
- **Section title glint** — gold shimmer sweeps across section headings every 10 seconds
- **Build progress bar** — scroll-driven progress indicator with waypoint markers
- **Dark / light mode** — light mode is default; rose editorial palette; persisted in localStorage
- **Scroll-reveal animations** — IntersectionObserver-driven fade-in on every section

---

## Tech Stack

| Layer | Tools |
|---|---|
| Framework | React 19 |
| Styling | SCSS Modules, global CSS custom properties |
| Icons | FontAwesome (solid + brands), react-icons |
| Animation | CSS keyframes, canvas requestAnimationFrame, SVG |
| Deployment | GitHub Pages via `gh-pages` |

---

## Getting Started

```bash
# 1. Clone
git clone https://github.com/dhy-ani/portfolio.git
cd portfolio

# 2. Install
npm install

# 3. Run locally
npm start
# → http://localhost:3000/portfolio
```

## Project Structure

```
src/
├── components/
│   ├── Navbar/              # Fixed nav with per-letter interactive brand
│   ├── Hero/                # Boot sequence, headline, 3D spinning cube, GitHub button
│   ├── About/               # Bio, stat cards with float animation
│   ├── SkillNetwork/        # SVG knowledge graph (3-tier)
│   ├── Projects/            # Flip cards + embedded GraphCanvas
│   ├── Experience/          # Timeline with flip-card detail view
│   ├── Programs/            # Certifications and fellowships
│   ├── Contact/             # Links + final terminal prompt
│   ├── BuildProgress/       # Scroll-driven progress bar
│   ├── CursorGlow/          # Museum spotlight cursor effect
│   ├── GraphCanvas/         # Force-directed graph (used inside cards)
│   └── NetworkBackground/   # Canvas gold dust motes
├── data/
│   └── resumeGraph.js       # Node/edge data for every project & experience card
├── hooks/
│   ├── useScrollProgress.js
│   └── useScrollReveal.js
├── App.js
├── App.scss                 # Global tokens, ambient glows, rose light-mode palette
└── index.css
```

## Deployment

```bash
npm run deploy
```

Runs `npm run build` automatically (via the `predeploy` script) then pushes to the `gh-pages` branch.

## Customisation

| What | Where |
|---|---|
| Projects & graph data | `src/data/resumeGraph.js` |
| Skill nodes & edges | `src/components/SkillNetwork/index.js` |
| Experience bullets | `src/components/Experience/index.js` |
| Colour tokens | `src/App.scss` (CSS custom properties) |
| Resume PDF | `public/resume.pdf` |

## License

MIT — feel free to fork and adapt.
