# ciel pith

React + Vite studio website. The existing composition, fixed wordmark/navigation sizes, and Paper002 Three.js background are preserved.

## Run locally

```sh
npm install
npm run dev
```

Open the Local URL printed by Vite (normally http://127.0.0.1:8080). Stop the old Python server first if it is still using port 8080. CSS and component edits update live.

## Build

```sh
npm run build
npm run preview
```

The production site is generated in `dist/`, including the existing work and journal pages.

## Edit

- `src/App.jsx`: home, about, and contact sections.
- `src/components/Artwork.jsx`: shared abstract artwork.
- `src/components/Navigation.jsx`: navigation links.
- `src/components/Gallery.jsx`: ten uploaded work screens.
- `src/components/PaperBackground.jsx`: the original PBR material, with React lifecycle cleanup.
- `home.css`: layout and typography.

See `ASSETS.md` for image names. Update the imports in `src/components/Gallery.jsx` when replacing work screens.
