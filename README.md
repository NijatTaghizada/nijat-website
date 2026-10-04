# nijat-website

Personal site of **Nijat Taghizada**: Stanford Data Science, ML for disaster response.

The hero is a live cellular-automaton wildfire simulation. Move your cursor to start fires, and press `/` anywhere for a terminal.

## Stack

- React 19 + TypeScript, bundled with Vite (Node)
- [Motion](https://motion.dev) for animation
- Canvas 2D for the fire field, hand-drawn SVG for the data visuals
- Deployed to GitHub Pages via GitHub Actions on every push to `main`

## Develop

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build to dist/
```

Content lives in `src/data/profile.ts`. Edit that file to update projects, honors, and stats.
