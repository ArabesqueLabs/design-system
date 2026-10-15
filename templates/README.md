# Templates

Whole pages assembled from the system, to start a site from.

| Template | What it is |
|---|---|
| [`home.html`](home.html) ([Arabic](ar/home.html)) | The studio homepage, as on arabesquelabs.com: a site header and hero with the drawn pattern and its focal tile, the method with the construction figure, the build stages, contact, and the footer. In React: [`react/home.tsx`](react/home.tsx). |

**In React,** [`react/home.tsx`](react/home.tsx) is the same page, built from the React components (`docs/react.md`), its words in English and Arabic in one place (`copy`). It's the source: `npm run build:react` renders it to `home.html` and `ar/home.html`, which need no React (the helpers in `js/` wire them). Change the `.tsx`, not the HTML.

They link the system's files by relative path (`../dist/arabesque.css`, `../fonts/fonts.css`, `../js/…`), so serve the repository (`npm run serve`) and open `/templates/home.html`. Copy one into a site and point those links at a released version (see the README). Page layout lives in `templates/home.css`; everything else is the system's own components and tokens.
