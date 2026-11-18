# nijat-website

Personal site of **Nijat Taghizada**, a Stanford student (Data Science / CS).

## Stack

- React 19 + TypeScript, bundled with Vite (Node)
- A one-page intro that types itself out on load
- Dark 60-30-10 palette (warm near-black, coral, gold) with an animated silk-wave canvas and soft glows
- Deployed to GitHub Pages via GitHub Actions on every push to `main`

## Develop

```bash
npm install
npm run dev      # http://localhost:5173
npm run build    # production build to dist/
```

Content lives in `src/data/profile.ts`. Edit that file to update the intro, the short lines under it, and the links.
