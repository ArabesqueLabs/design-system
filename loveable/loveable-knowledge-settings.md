# Arabesque Labs — project knowledge
Reference design: index.html (screenshots attached to the first prompt). Where this file says "(beyond the reference)", it is a deliberate improvement on that draft.

## Company facts (never contradict or embellish)
- Arabesque Labs Ltd (arabesquelabs.com) is an independent, one-person software studio. It is in stealth, building its first product.
- There are no products, customers, metrics, testimonials, version numbers, client logos or team members to show. Never invent any, not even as placeholders.
- Contact: hello@arabesquelabs.com
- Tagline: "Structure. Clarity. Craftsmanship."
- Name meaning: Islamic geometric patterns are intricate structures built from simple, repeated rules. We build software the same way: small, well-made modules, clear interfaces, a coherent system.

## Voice
- Calm, precise, plain English. Sentence case everywhere (headings, buttons, nav).
- Say what things are or do; no hype, no superlatives, no "revolutionary", "cutting-edge", "seamless".
- Buttons name the action ("Say hello", "Get notified"), never "Submit" or "Learn more".
- Never show design or internal jargon in the UI (e.g. "tessellation engine", "lattice construct", "studio mark v1").

## Core visual concept: the logo is the tile, the site is the tessellation
- All geometry comes from ONE procedural pattern: Hankin's "polygons in contact" method on the 4.8.8 tiling (regular octagons + squares), contact angle 67.5° by default.
- Rule: from each polygon edge's midpoint, two rays leave at the contact angle to the edge; rays leaning toward the same vertex meet on that vertex's bisector, at distance (side/2)·sin θ / sin(θ + interiorAngle/2) from the vertex.
- The pattern code lives in src/lib/pattern.ts. Reuse it for every pattern, figure and illustration; never hand-draw or approximate pattern paths, and never use image files for the pattern.
- Pattern period = side·(1+√2). Lines must connect seamlessly across cells.
- Scale: polygon side 32px on desktop (≥900px), 22px on mobile; 34px in the explanatory figures (240×240 viewBox).
- Strokes: strands 1.25px at 50% opacity of foreground (42% in dark mode); construction polygons 0.75px, dashed 2/4, 40% while building and 13% once built; figure strands 1.6px, figure construction 0.9px.
- The pattern is background texture. Body copy always sits on a plain ground; the pattern fades out behind the text with a mask (desktop: transparent up to 42% of the width, fully visible from 78%; mobile: visible at the top, fading out between 170px and 300px). Large headlines may overlap the fade.
- Hero focal tile: the octagon at 76% across and 47% down on desktop, centred and 140px from the top on mobile. Once built, it turns primary (2.25px stroke, filled with primary at 9–10% opacity), with a caption beside it: "This tile is our mark. Everything around it follows from the same rule."

## The mark
- The mark is one repeat tile of the pattern, centred on an octagon, cropped by a square frame with the same stroke weight as its lines (3.2 in a 64-unit viewBox). Use the existing SVG component; don't redraw it.
- The mark is always monochrome (currentColor). The teal focal tile in the hero is a pattern cell, not the mark.
- Favicon: the solid 8-point star alone, no frame, switching to the light foreground in dark mode.
- Wordmark: "Arabesque Labs" in Jost 500, letter-spacing 0.05em, beside the mark. Legal name "Arabesque Labs Ltd." only in the footer.

## Colour tokens (single source of truth: the shadcn/ui CSS variables in src/index.css; never hard-code Tailwind palette colours like sky-500 or teal-600)
Light (default):
  background #F1F2EE · card/surface #FAFAF8 · foreground #131A2B
  muted-foreground #555D6C · border #CDD1D4
  primary #0D6B66 · primary-foreground #FFFFFF · ring #0D6B66
  primary-wash rgba(13,107,102,0.09)
Dark:
  background #0D1320 · card/surface #141B2B · foreground #E7E9E3
  muted-foreground #A3AAB6 · border #2A3345
  primary #5CC4B7 · primary-foreground #0D1320 · ring #5CC4B7
  primary-wash rgba(92,196,183,0.10)
- Theme: follow the visitor's system setting (prefers-color-scheme) by default, and update live if it changes. The toggle sets a manual override, which is remembered and applied before first paint (no flash), but only kept while it differs from the system setting: when they match again (the visitor toggles back, or the OS switches), clear the override and follow the system. Light is the design default.
- Primary is an accent, used only for: the primary button, link underlines and text on hover, the focus ring, the hero focal tile and its caption line, hover-highlighted pattern cells, the step-2 figure, and step numbers. Never as large fills or section backgrounds.

## Typography
- Jost 400/500: headings, nav, buttons, captions, UI text. Newsreader (optical sizes; italic for asides): body text. No other families: no Inter, no monospace.
- Scale:
  - H1: clamp(2.5rem, 1.1rem + 4.2vw, 4.75rem), weight 400, line-height 1.02, tracking -0.015em, max-width 8.5em.
  - H2: clamp(2rem, 1.4rem + 2vw, 3rem), weight 400, line-height 1.08, tracking -0.01em.
  - H3: 1.375rem, weight 500, line-height 1.2.
  - Lede: clamp(1.125rem, 1rem + 0.4vw, 1.3125rem), muted-foreground.
  - Body: 19px, line-height 1.6, max ~60ch.
- (beyond the reference) text-wrap: balance on headings; tabular numerals for sequence numbers.

## Layout & components
- Generous whitespace; left-aligned text; max content width 1200px; side gutter clamp(20px, 5vw, 64px); section padding clamp(72px, 11vw, 144px).
- Sections separated by 1px border-coloured hairlines, not cards or background blocks. Stage lists use a 1px foreground-coloured rule above each item.
- Primary button: flat, 3px radius, no shadow. Secondary actions are underlined text links, not outline buttons.
- The theme toggle is an icon-only button in the header nav: a 36px circular hit area with no border, a subtle surface background on hover, and a 20px half-filled disc icon that rotates 180° in dark mode. Never a sun/moon icon (a crescent is off-brand here). Its aria-label and title name the action ("Switch to dark theme").
- Numbered markers only for real sequences (the three figure steps, the four build stages).
- (beyond the reference) A proper mobile menu below 900px instead of wrapping the nav links.

## Motion
- One unprompted motion moment: the hero pattern drawing itself on first load (strands draw outward from the focal tile over ~1.9s; then the construction lines fade and the focal tile and caption appear). Nothing else animates on its own: no scroll-triggered fades or slide-ins, no parallax, no looping animation.
- Motion in response to the visitor is fine and must be quick: hover and interaction feedback 150–300ms (pattern-cell hover highlight 200ms, button and link hover 150ms, theme change and toggle icon rotation 250ms).
- The slower fades that finish the hero sequence (construction lines 1.2s, focal tile 0.6s) apply only while the hero settles, then revert to the fast hover timings.
- prefers-reduced-motion: skip the drawing animation and show the final state; disable smooth scrolling.

## Never
- Pill badges, all-caps eyebrow labels, grids of identical cards, gradients, glows, gold or metallic effects, decorative drop shadows, glassmorphism.
- Mosque, dome, arch, crescent or lantern imagery; Arabic or faux-Arabic lettering; "Arabian nights" styling; circuit-board or code-bracket clichés.
- Stock photos or AI-generated illustrations.

## Quality floor (every change)
- WCAG AA contrast for all text in both themes (check new colour pairs before using them).
- Visible keyboard focus (2px primary outline, 3px offset), a skip link, semantic landmarks; decorative SVGs aria-hidden, explanatory figures role="img" with an aria-label.
- Works from 360px wide up; no horizontal scroll.
- Pattern SVGs stay fast: regenerate only on resize (debounced, and only when the width changes), never every frame.
