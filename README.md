# Arabesque Labs design system

The tokens, CSS, components and rules that Arabesque Labs builds with.
**Accessible** (WCAG 2.2 AA as a floor), **bidirectional** (English and
Arabic, left to right and right to left, from the start), and built for
**efficient interaction**: the fewest steps, actions that say what they do,
and every consequence shown before, during and after.

It's plain CSS custom properties and plain HTML, with no framework and no
runtime dependency. A small Node script builds the outputs from one token
file. The optional JavaScript helpers have no dependencies either.

## What's here

| Path | What |
|---|---|
| `tokens/tokens.json` | The single source of truth (W3C Design Tokens format): primitives, semantic roles, component tokens; dark and Arabic modes |
| `scripts/build.mjs` | Builds `dist/` and `docs/contrast.md` from the tokens |
| `dist/arabesque.css` | Everything in one file, in cascade layers: tokens, base, layout, components, utilities |
| `dist/tokens.css` | The tokens alone, as `--al-*` custom properties, light and dark |
| `dist/tailwind-theme.css` | A Tailwind v4 `@theme` mapping onto the same variables |
| `dist/tokens.json` | Resolved token values per mode, for other tools |
| `dist/icons.svg` | The icon sprite |
| `css/` | The sources: `base.css`, `layout.css`, `utilities.css`, `components/*.css` |
| `js/` | Optional helpers: theme, toast, menu, tabs, tooltip, format, pattern |
| `icons/`, `assets/brand/` | Icon sources; the mark, star and wordmark from the logo pack |
| `docs/` | Foundations, interaction, accessibility, RTL, adoption, component specs, the audit, the contrast report |
| `index.html` | The showcase |

## Build

Requires Node 20 or later. No install step.

```sh
npm run build        # or: node scripts/build.mjs
```

It prints a summary and exits non-zero if any colour pair fails its contrast
minimum. Don't edit `dist/` by hand.

## See the showcase

The sprite needs to be served over HTTP:

```sh
npm run serve        # then open http://127.0.0.1:4900/
```

Switch theme and language at the top; in Arabic, choose Western or
Arabic-Indic digits. All three are remembered.

## Use it in a project

1. **Copy `dist/`** (and `js/` if you want the helpers) into the project at a
   tagged version.
2. **Load the fonts and the CSS:**

   ```html
   <html lang="en" dir="ltr">
   <head>
     <link rel="preconnect" href="https://fonts.googleapis.com">
     <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
     <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Amiri:ital,wght@0,400;0,700;1,400&family=IBM+Plex+Mono&family=IBM+Plex+Sans+Arabic:wght@400;500;600&family=Jost:wght@400;500;600&family=Kufam:wght@400;500;600&family=Newsreader:ital,opsz,wght@0,6..72,400;0,6..72,500;1,6..72,400&display=swap">
     <link rel="stylesheet" href="/dist/arabesque.css">
   ```

   For Arabic, set `lang="ar" dir="rtl"` on `<html>`.
3. **Apply the saved theme before first paint** (avoids a flash):

   ```html
   <script>try { const t = localStorage.getItem("al-theme"); if (t) document.documentElement.dataset.theme = t; } catch {}</script>
   ```

4. **Build with the classes** (`al-button`, `al-field`…), following the
   specs in [`docs/components/`](docs/components/README.md).
5. **Use the helpers** as modules where you need them:

   ```js
   import { toast } from "/js/toast.js";
   import { initMenus } from "/js/menu.js";
   initMenus();
   toast("Process archived", { action: "Undo", onAction: restore });
   ```

Your own CSS, unlayered, always wins over the system's layers, so a project
can move onto it gradually ([`docs/adoption.md`](docs/adoption.md)).

**With Tailwind v4,** import `dist/tokens.css` then `dist/tailwind-theme.css`;
utilities like `bg-surface`, `text-text-muted` and `border-control` resolve to the
system's variables, and switch with the theme.

## Read next

- [Interaction](docs/interaction.md): the main principle, as rules.
- [Accessibility](docs/accessibility.md): what the system guarantees, and a checklist per component.
- [Right to left](docs/rtl.md): mirroring, bidi isolation and digits.
- Foundations: [colour](docs/foundations/colour.md), [typography](docs/foundations/typography.md), [space and shape](docs/foundations/space-and-shape.md), [motion](docs/foundations/motion.md), [iconography](docs/foundations/iconography.md), [layout](docs/foundations/layout.md), [writing](docs/foundations/writing.md).
- [Components](docs/components/README.md).
- [Adoption](docs/adoption.md): moving hunt and arabesquelabs.com onto it.
- [Audit](docs/00-audit.md): where it came from, and the decisions.

## Naming

Every custom property starts `--al-` and every class `al-`, so the system can
sit beside anything. Tokens are named by role (`--al-color-text-muted`), not
by value. Component classes follow `al-block__element--modifier`; state is in
attributes (`aria-*`, `data-state`, `[open]`), not classes.

## Versioning

[Semantic versioning](https://semver.org/), recorded in
[`CHANGELOG.md`](CHANGELOG.md):

- **Major:** a token or class is renamed or removed, or a component's
  markup changes in a way that breaks existing pages.
- **Minor:** something is added (a token, component, variant or helper), or a
  value changes visibly without breaking markup (a colour adjusted for
  contrast).
- **Patch:** fixes that don't change the intended look or markup.

Deprecated names keep working, as aliases, for at least one minor version
before a major removes them. Projects pin a version and update deliberately.
