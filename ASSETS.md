# Asset slots

The website now uses React and Vite. Edit the section components in `src/App.jsx`, the shared components in `src/components/`, and layout/typography in `home.css`.

- `assets/studio-art.png`: abstract artwork shared by the hero, about strips, and contact section. The existing rotation, mirroring, and cropping are preserved in CSS.
- Work screens: `amyg.png`, `h.png`, `clear.png`, `mm.png`, `spectacular.png`, `sensual_replace.png`, `gleann.png`, `apologies.png`, `foolproof.png`, and `replaceluxury.png`. These are imported directly in `src/components/Gallery.jsx` and displayed without cropping.
- `assets/Paper002_2K-JPG/`: the installed Paper002 material. The React background uses its Color, NormalGL, and Roughness maps. The color map remains the CSS fallback without WebGL.

Navigation scrolls to page sections, and contact opens an email to cielpith@gmail.com.

The works section uses `src/components/ui/hero-parallax.jsx` and its companion CSS for scroll-driven rows, perspective, and opacity. All twelve work screens appear once, including `watch.png` and `fig_preferred.png`. Mobile and reduced-motion layouts use a static grid.

Run `npm run dev` and open the Local URL printed by Vite.
