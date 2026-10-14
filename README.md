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
| `js/` | Optional helpers, each with its types (`.d.ts`): `theme`, `toast`, `dialog`, `menu`, `tabs`, `tooltip`, `position`, `validate`, `count`, `search`, `keys`, `format`, `chart`, `pattern` |
| `tests/`, `scripts/check-page.mjs` | Unit tests and the system's own rules; the showcase checked in a real browser |
| `icons/`, `assets/brand/` | Icon sources; the mark, star and wordmark from the logo pack |
| `docs/` | Foundations, interaction, accessibility, RTL, adoption, component specs, the audit, the contrast report |
| `index.html` | The showcase |

## Build

Requires Node 20 or later. No install step.

```sh
npm run build        # or: node scripts/build.mjs
```

It prints a summary and exits non-zero if any colour pair fails its contrast
minimum. Don't edit `dist/` by hand; it's committed, so rebuild and commit it
with the sources it comes from.

## Test

```sh
npm test             # unit tests, and the system's rules: logical properties only,
                     # every var() a token, every primitive used, one @keyframes each
npm run check        # build, test, and fail if dist/ wasn't rebuilt

npm i --no-save axe-core@4.10.2
node scripts/check-page.mjs   # in Chrome: the helpers on their own page
                              # (tests/pages/helpers.html), with real key presses;
                              # the showcase with axe in light, dark, English and Arabic
```

All three run on every push and pull request (`.github/workflows/check.yml`).
The build also fails if a component sets a colour on a background the
contrast check doesn't measure, or if `arabesque.css` grows past its size
budget (24 KB gzipped). Before a release, run the
[screen reader checks](docs/screen-readers.md) by hand.

## See the showcase

The sprite needs to be served over HTTP:

```sh
npm run serve        # then open http://127.0.0.1:4900/
```

Switch theme and language at the top; in Arabic, choose Western or
Arabic-Indic digits. All three are remembered.

## Use it in a project

1. **Link a released version,** which never changes, so a site upgrades only
   when it chooses:
   `https://design.arabesquelabs.com/v/0.2.0/dist/arabesque.css` (and
   `…/v/0.2.0/fonts/fonts.css`, `…/v/0.2.0/js/toast.js`). `/dist/` itself is
   the latest build, and changes with every deploy: don't link it from a
   site. Or **copy** `dist/`, `fonts/` (and `js/` for the helpers) into the
   project from a tag (`git checkout v0.2.0`), or install it from git:
   `npm i github:ArabesqueLabs/design-system#v0.2.0` (`prepare` builds it),
   and import `@arabesquelabs/design-system` (the CSS) or
   `@arabesquelabs/design-system/js/toast.js`.
2. **Load the fonts and the CSS:**

   ```html
   <html lang="en" dir="ltr">
   <head>
     <link rel="stylesheet" href="/fonts/fonts.css">
     <link rel="stylesheet" href="/dist/arabesque.css">
   ```

   `fonts/` (copy it beside `dist/`) has every face the system uses, served
   from your own site rather than Google's, so visitors' addresses aren't
   sent to a third party; a browser fetches only the faces and scripts a
   page uses. For Arabic, set `lang="ar" dir="rtl"` on `<html>`.
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

Your own CSS, unlayered, wins over the system's layers, so a project can move
onto it gradually ([`docs/adoption.md`](docs/adoption.md)). One exception, on
purpose: `[hidden]` hides with `!important` from inside a layer, which beats
even an unlayered `!important`, so nothing a project writes can show what's
hidden (`hidden="until-found"` is left to the browser).

**With Tailwind v4,** import `dist/tokens.css` then `dist/tailwind-theme.css`;
utilities like `bg-surface`, `text-text-muted` and `border-control` resolve to the
system's variables, and switch with the theme. The breakpoints (`sm:` 40rem,
`md:` 52rem, `lg:` 64rem) are the system's, and `dark:` follows `data-theme`
as the tokens do: the system's setting unless light is chosen, or a chosen dark.

## Read next

- [Interaction](docs/interaction.md): the main principle, as rules.
- [Accessibility](docs/accessibility.md): what the system guarantees, and a checklist per component; [screen reader checks](docs/screen-readers.md) to run before a release.
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

Before 1.0, a minor version may remove what nothing in the system uses (as
semver allows for 0.x); the changelog lists each removal under **Removed**,
with what to use instead.

## Release

```sh
npm run release -- 0.2.0
```

moves the changelog's **Unreleased** entries under the version, dated, sets
`version` in `package.json`, builds, and copies `dist/`, `fonts/` and `js/` to
`v/0.2.0/`. A released version is never rebuilt or changed (the script
refuses, and CI fails if a file under `v/` is modified), so it's served with a
year's cache (`_headers`). Then:

1. `npm run check`, and commit ("Release 0.2.0").
2. Tag it: `git tag v0.2.0 && git push --tags`.
3. Deploy.
