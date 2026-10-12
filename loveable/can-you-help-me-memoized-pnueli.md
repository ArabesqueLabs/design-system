# ChatGPT prompt: Arabesque Labs visual identity

## Context
arabesquelabs.com is still a "Coming Soon" placeholder: an Unsplash photo of lamps, no logo, no palette. Two earlier attempts left material we can use:
- ChatGPT gave a solid seed: an 8-fold star built from repeated modules, flat colours, navy/teal/sand with copper, "Structure. Clarity. Craftsmanship.".
- Gemini wrote a long, generic research report. Its useful points: geometry comes from reflection and rotation of one unit, the style is non-figurative, and patterns extend without end.

User decisions: a **micro-ISV** (own products, so the brand is an umbrella), **explore 3 directions first**, **light primary with a full dark mode**, and deliverables of **logo images, a written style guide, website mockups and CSS/Tailwind tokens**.

How the prompt is designed:
- It runs in two phases with a stop in between. Asking ChatGPT for everything in one turn gives shallow results and degrades the images.
- It gives ChatGPT one central concept so the output isn't generic: *the logo is one tile, and the website is the tessellation.*
- It lists hard constraints: works at 16px, works in one colour, avoids religious and orientalist clichés, uses exact spelling in rendered text.
- It asks for SVG code of the symbol, because image generation can't produce true vectors.

## Deliverable: the prompt (paste into ChatGPT with image generation enabled)

```
You are a senior brand identity designer who specialises in geometric marks for software companies (think Pentagram, Koto or Collins-level rigour). Help me create the visual identity and website theme for my company. We'll work in two phases. Do Phase 1 only, then stop and wait for me to choose.

## The company
- Name: Arabesque Labs Ltd. Domain: arabesquelabs.com (currently a placeholder).
- A one-person software company (micro-ISV) that builds and sells its own software products. The brand is an umbrella/studio mark: it must sit comfortably above future product names ("Arabesque Labs · <Product>") without competing with them.
- Meaning of the name: great software architecture is like an arabesque. Intricate, beautiful structure comes from simple, rigorous, repeated rules. Beauty and function are the same thing when the structure is right.
- Personality: precise, calm, crafted, quietly confident. Not flashy, not "startup hype", not ornamental.
- Candidate tagline (feel free to propose better): "Structure. Clarity. Craftsmanship."

## The core idea (build every direction on this)
In Islamic geometric art, an infinite pattern comes from one small tile repeated by rotation, reflection and translation, all drawn with compass and straightedge. Software is built the same way: small, well-designed modules compose into large systems.
So: THE LOGO IS THE TILE; THE WEBSITE IS THE TESSELLATION. The symbol should be one repeat unit that, when tiled, generates a pattern used on the website (hero background, section dividers, loading states), shown subtly and at low contrast.

## Hard constraints for the symbol
- Geometrically constructed: built on a clear grid (e.g. 8-fold or 6-fold symmetry, girih-style or khatam-style), with consistent stroke weights and exact angles. Explain the construction in 2–3 sentences.
- Distinctive: a plain 8-pointed star (Rub el Hizb) is too generic and overused. Give it a twist that ties it to software, e.g. interlacing strands that read as connected modules or nodes, a star built from repeated bracket-like segments, or an interlace with a deliberate "over-under" weave. Keep it subtle, and don't use literal code symbols unless they are beautifully integrated.
- Must work at 16×16 px (favicon) and 1024 px, in full colour, single colour black, and single colour reversed on dark.
- Flat vector style: no gradients, bevels, glows, 3D or metallic gold effects.
- Avoid: mosque domes, arches, crescents, lanterns, Arabic calligraphy or script (including faux-Arabic Latin letters), "Arabian nights" or orientalist tropes, circuit-board clichés, generic tech swooshes.
- Wordmark: "ARABESQUE LABS", spelled EXACTLY like that in every image. The wordmark should feel architectural: a refined geometric sans or a restrained high-contrast serif, with generous tracking on "LABS".

## Theme requirements
- Light mode is primary, with a complete dark mode too. Give both palettes with hex codes and check WCAG AA contrast for body text and UI.
- Palette starting point (challenge it if you have a better idea): deep navy #0F172A, teal #0D9488, soft sand #F5F5F4, with an optional muted copper accent used sparingly.
- Typography: 2 families max (plus a monospace for code), all free on Google Fonts. Say which is for display, which for body and which for code.

## PHASE 1: three distinct directions (do this now)
Create three genuinely different directions, for example:
  A) Minimalist tech: maximum restraint; the geometry reduced to its essential lines; Linear/Vercel-level cleanliness.
  B) Blueprint / constructed: the construction lines are part of the aesthetic; a draughtsman's precision; fine linework.
  C) Refined craft / editorial: warmer, studio-like, serif display type, sand and copper, like a high-end architecture practice.
For EACH direction give:
  1. Name + a one-paragraph rationale (how it expresses "beautiful, functional architecture").
  2. ONE image: the symbol and horizontal lockup ("ARABESQUE LABS") on a plain light background, flat vector style, centred, generous whitespace, no mockup props.
  3. Palette (light + dark hex), font pairing, and a one-line description of how the tessellated pattern would be used on the site.
Then stop and ask me which direction to take forward (or what to combine).

## PHASE 2: after I choose (don't do this yet)
For the chosen direction, deliver:
  1. Logo system images: symbol alone; horizontal lockup; stacked lockup; favicon at small size; mono black; reversed on navy; an example sub-brand lockup "Arabesque Labs · Product".
  2. Clean SVG code for the symbol, built mathematically (use code/Python if helpful so the geometry is exact), plus SVG code for the repeating background tile.
  3. Two website mockup images, desktop homepage hero + one product card section, in light mode, then the same hero in dark mode. Realistic, restrained, readable text; the pattern subtle in the background.
  4. A concise style guide: logo usage and clear space, minimum sizes, do/don't list, palette with roles (bg, surface, text, muted, border, primary, accent, success/warn/error), type scale, spacing scale, radius, shadows, pattern opacity rules, motion principles (e.g. line-drawing reveal of the tile, ≤ 300 ms, respects prefers-reduced-motion), voice & tone in 5 bullets.
  5. Design tokens as (a) CSS custom properties with :root for light and [data-theme="dark"] plus a prefers-color-scheme fallback, and (b) a Tailwind v4 @theme block. Include the Google Fonts import.

Keep the writing tight. I want designer decisions with brief reasons, not a research essay.
```

## How to use it
1. In ChatGPT, enable image generation (GPT-4o / the default image model) and paste the prompt.
2. Choose a direction and reply with something like: "Go with B, but use A's wordmark. Proceed to Phase 2."
3. Image models often misspell text. If a lockup comes back wrong, reply: "Regenerate; the text must read exactly ARABESQUE LABS."
4. Treat the generated images as concepts. The final logo should come from the SVG code (or be redrawn in Figma/Inkscape) so the geometry is exact.

## Verification
- Check Phase 1 for three visibly different directions, correct spelling, and no banned motifs.
- In Phase 2, render the SVG in a browser at 16 px and 512 px. Tile the pattern SVG and make sure it repeats seamlessly.
- Paste the palette hex pairs into a contrast checker (e.g. webaim.org/resources/contrastchecker) to confirm they pass AA.
