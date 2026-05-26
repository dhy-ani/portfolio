# Dhyani Soni's Portfolio

A single-page developer portfolio built with React. Features a terminal-boot hero, an animated knowledge-graph skill map, flip-card projects with embedded force-directed graphs, and a constellation background — with full dark / light mode support.

**Live site → [dhy-ani.github.io/portfolio](https://dhy-ani.github.io/portfolio)**

---

## Features

- **Terminal boot sequence** — hero section animates through a system-init sequence on load
- **Interactive letters** — individual characters in the headline and navbar brand jump and glow pink on hover
- **Skill Network** — SVG knowledge graph rendered in three tiers (foundation → current → goals) with phase-based staggered reveal, live edge highlighting, and flowing particles
- **Flip-card projects** — cards flip to reveal a live force-directed graph of tools, concepts, and outcomes for each project
- **Constellation background** — canvas-drawn starfield with power-law star distribution, drift animation, and constellation lines
- **Build progress bar** — scroll-driven progress indicator with waypoint markers
- **Dark / light mode** — persisted in localStorage; smooth transition across all components
- **Scroll-reveal animations** — IntersectionObserver-driven fade-in on every section

---

## Tech Stack

| Layer | Tools |
|---|---|
| Framework | React 19 |
| Styling | SCSS (Sass), animate.css |
| Icons | FontAwesome (solid + brands) |
| Animation | CSS keyframes, SVG `animateMotion`, canvas rAF |
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
│   ├── Navbar/          # Fixed nav with per-letter interactive brand
│   ├── Hero/            # Boot sequence, headline, 3D spinning cube
│   ├── About/           # Bio, stat cards
│   ├── SkillNetwork/    # SVG knowledge graph (3-tier)
│   ├── Projects/        # Flip cards + embedded GraphCanvas
│   ├── Experience/      # Timeline with flip-card detail view
│   ├── Contact/         # Links + final terminal prompt
│   ├── BuildProgress/   # Scroll-driven progress bar
│   ├── GraphCanvas/     # Force-directed graph (used inside cards)
│   └── NetworkBackground/ # Canvas constellation
├── data/
│   └── resumeGraph.js   # Node/edge data for every project & experience card
├── hooks/
│   ├── useScrollProgress.js
│   └── useScrollReveal.js
├── App.js
├── App.scss             # Global tokens, ambient glows, light-mode overrides
└── index.css
```
## Deployment
The site deploys to GitHub Pages from the build/ folder.

npm run deploy
This runs npm run build automatically (via the predeploy script) then pushes to the gh-pages branch.

## Customisation
| What | Where |
|---|---|
| Projects & graph data | src/data/resumeGraph.js |
| Skill nodes & edges | src/components/SkillNetwork/index.js |
| Experience bullets | src/components/Experience/index.js |
| Colour tokens | src/App.scss (top SCSS variables) |
| Resume PDF | public/resume.pdf |

## License
MIT — feel free to fork and adapt.
