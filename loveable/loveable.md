# Working with Lovebale for Arabesque Labs Website

Not as it stands. Lovable is a website builder: it writes a React/Tailwind app and doesn't do brand exploration or image
mockups the way ChatGPT and Gemini do. If you paste the prompt in unchanged, it will probably skip the logo images and
the written guide and go straight to building a site.

It is good at the part that follows, though. I'd split the work like this:

1. ChatGPT or Gemini: run the prompt you have, pick a direction, and get the logo concepts, SVG code and tokens.

1. ChatGPT or Gemini: run the prompt you have, pick a direction, and get the logo concepts, SVG code and tokens.
2. Lovable: build the real site from those results.

An option that uses Lovable's strength: your logo is pure geometry, so it can be drawn in code instead of generated as a
picture. You could ask Lovable to build a comparison page with the three directions shown as real, working pages rather
than images. The logos would come out exact, and you'd see the dark mode and pattern tiling for real. If you want to try
it, here's the prompt:

Build a single-page "brand explorer" for my company, Arabesque Labs Ltd (arabesquelabs.com), a one-person software
company that builds and sells its own products. Don't build the real website yet.

CONCEPT: Great software architecture is like an arabesque: intricate, beautiful structure from simple, rigorous,
repeated rules. The logo is ONE geometric tile (Islamic-geometry style, compass-and-straightedge construction, 8-fold or
6-fold symmetry). The website is its tessellation: the same tile repeated as a subtle, low-contrast background pattern.

BUILD: A page with a switcher between three design directions. Each direction is a full, realistic homepage hero + a
"Products" card section + footer, with a light/dark toggle (light is primary): A) Minimalist tech: maximum restraint,
Linear/Vercel cleanliness, geometric sans. B) Blueprint: faint construction lines visible, fine linework, draughtsman
precision. C) Editorial craft: warm sand and muted copper, serif display type, architecture-studio feel.

LOGO RULES (each direction gets its own symbol):

- Draw each symbol as an inline SVG React component, built mathematically (compute points with trig, don't hand-type
approximate paths). Consistent stroke weights, exact angles.
- Not a plain 8-pointed star. Give it a subtle software twist, e.g. interlacing strands with an over-under weave that
read as connected modules.
- It must still read at 16px. Show it at 16px, 32px and 128px in a small strip under each hero.
- The same symbol must tile seamlessly as the background pattern (use an SVG <pattern>), at ~4–6% opacity.
- Wordmark text: exactly "ARABESQUE LABS", with wide tracking on "LABS".
- Flat only: no gradients, glows, gold or 3D. No mosques, arches, crescents, lanterns, Arabic script or faux-Arabic
letters, and no circuit-board clichés.

THEME: Start from navy #0F172A, teal #0D9488, sand #F5F5F4, optional muted copper; adjust per direction. Define all
colours as theme CSS variables (light + dark), not hard-coded classes, and meet WCAG AA contrast. Google Fonts only, max
2 families + 1 monospace per direction. Respect prefers-reduced-motion; one subtle line-drawing reveal of the logo on
load, ≤ 300 ms.

Tagline placeholder: "Structure. Clarity. Craftsmanship." Use tasteful placeholder product names.

Once you've picked a direction, follow up with something like: "Delete directions A and C. Make B the real site: home,
products, about, contact. Keep the theme variables as the single source of truth and export the logo as a standalone SVG
file."

Tips for working in Lovable:

- Save the brand rules once: paste the "LOGO RULES" and "THEME" sections into the project's Knowledge settings, so they
apply to every later prompt without repeating them.
- Discuss before building: use Chat mode to talk through changes without editing code. Each build prompt uses up
credits.
- Change one thing per prompt, e.g. "make the pattern smaller" or "try a different serif". Big prompts that change
several things tend to cause regressions.
- Expect to redo the logo geometry a couple of times. An AI writing SVG maths is more exact than image generation, but
it still makes mistakes. If a symbol looks off, ask it to explain its construction and fix a specific part.
- Check the Tailwind setup first. Lovable projects use shadcn/ui with CSS theme variables. If you bring in tokens from
ChatGPT or Gemini, ask Lovable to map them onto its existing theme variables instead of adding a separate Tailwind v4
@theme block, because the project may not be on v4.

## Build the website for Arabesque Labs Ltd (arabesquelabs.com)

The attached screenshots show the current best draft. Keep its concept and structure, and raise the craft. Do not fall
back to a generic SaaS template.

## Company (real facts only; invent nothing)

- An independent, one-person software studio, currently in stealth, building its first product. There are no products,
customers, metrics, testimonials, version numbers or team members to show. Don't invent any.
- Name meaning: Islamic geometric patterns are intricate structures built from simple, repeated rules. We build software
the same way: small, well-made modules, clear interfaces, a coherent system.
- Voice: calm, precise, plain English, sentence case, no hype. Contact: <hello@arabesquelabs.com>

## Core concept: the logo is the tile; the site is the tessellation

- Generate the pattern in code (no image files): Hankin's "polygons in contact" method on the 4.8.8 tiling (regular
octagons + squares), contact angle 67.5°. From each polygon edge's midpoint, two rays leave at the contact angle to the
edge; rays leaning toward the same vertex meet on that vertex's bisector, at distance (side/2)·sin θ / sin(θ +
interiorAngle/2) from the vertex.
- Port the reference implementation below into a typed util (src/lib/pattern.ts) and use it for everything: hero,
figures, mark.
- The mark is one repeat tile of the pattern (period = side·(1+√2)), centred on an octagon, cropped by a square frame of
the same stroke weight. Favicon = the solid 8-point star alone. Reuse the exact SVG below.

[PASTE the pattern:start…pattern:end code and the <symbol id="mark"> SVG from index-3.html]

## Structure (one page with anchor nav; proper mobile menu)

1. Hero: a full-bleed SVG pattern. On first load: faint dashed construction polygons appear, then the strands draw
outward from a focal octagon (about 2 s, once only); then the scaffolding fades and the focal tile turns the accent
colour, with the caption "This tile is our mark. Everything around it follows from the same rule." The pattern fades out
behind the headline. With a fine pointer, hovering highlights the cell under the cursor. H1: "Intricate software from
simple, rigorous rules." Lede: "Arabesque Labs is an independent software studio. We're building our first product now,
carefully, one well-made part at a time." Primary button "Say hello" (to #contact); text link "See how we build".
2. "The name is the method": two short paragraphs, plus a 3-step figure: (1) Tile the plane with simple shapes →
modules. (2) From each edge's midpoint, draw two lines at a fixed angle → interfaces. (3) Remove the scaffolding; the
pattern holds → the system.
3. "How we build": Discover / Design / Build / Refine, one paragraph each (copy in the screenshots).
4. "Building quietly, for now": one line about the product being in the works, the contact email shown large, and a "Get
notified at launch" email field stored in the backend, with clear success and error messages.
5. Footer: mark, "Structure. Clarity. Craftsmanship.", © 2026 Arabesque Labs Ltd.

## Push beyond the draft (this is what "better" means)

- Interlace: render hero strands as woven bands (a double outline) with true over-under at every crossing, as in real
girih work. If clean over-under isn't achievable, use plain double-line bands with no weave; never ship a broken weave.
- Make step 2 of the figure interactive: a slider for the contact angle (45°–78.75°, default 67.5°) that redraws the
pattern live, showing how changing one rule changes the whole system.
- Typographic finish: text-wrap: balance on headings, hanging punctuation where supported, tabular numerals for the step
numbers, fluid type with clamp().

## Design tokens (keep exactly; map onto the shadcn/ui CSS variables in index.css, never hard-coded Tailwind colours)

Light: background #F1F2EE, surface #FAFAF8, foreground #131A2B, muted-foreground #555D6C, border #CDD1D4, primary
# 0D6B66, primary-foreground #FFFFFF Dark:  background #0D1320, surface #141B2B, foreground #E7E9E3, muted-foreground
# A3AAB6, border #2A3345, primary #5CC4B7, primary-foreground #0D1320 Light is the default; follow prefers-color-scheme,
plus a toggle that is remembered. Fonts (Google): Jost 400/500 for display and UI; Newsreader for body text (italic for
asides). No Inter, no monospace.

## Don'ts

- No pill badges, all-caps eyebrow labels, identical card grids, gradients, glows, gold, drop shadows used as
decoration, fake products or version tags, or design jargon in the UI.
- No mosque, arch, crescent or lantern imagery; no Arabic or faux-Arabic lettering.
- Every text/background pair must meet WCAG AA in both themes. Respect prefers-reduced-motion by showing the final state
with no drawing animation. Visible keyboard focus. Must work at 360px wide.

Tips for Lovable:

- Save the rules once: put the "Design tokens" and "Don'ts" sections in the project's Knowledge settings, so later
prompts can't drift from them.
- Build in steps: check the hero first, then ask for the interlace, then the angle slider, as separate prompts. The
over-under weave is the part most likely to go wrong.
- Hosting will change: your site is currently static HTML on GitHub Pages (via the CNAME file), but Lovable produces a
React app. You'd either host it on Lovable, or sync it to GitHub and deploy the built files to Pages.

