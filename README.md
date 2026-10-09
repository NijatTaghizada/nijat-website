# nijat-website

Personal site of **Nijat Taghizada**, a Stanford student (Data Science / CS).

It includes a small cellular-automaton wildfire simulation you can click to start fires.

## Stack

- React 19 + TypeScript, bundled with Vite (Node)
- Canvas 2D for the wildfire simulation
- Light and dark themes via `prefers-color-scheme`
- Deployed to GitHub Pages via GitHub Actions on every push to `main`

## Develop

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build to dist/
```

Content lives in `src/data/profile.ts`. Edit that file to update projects, experience, honors, and skills.
