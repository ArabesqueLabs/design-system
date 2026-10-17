# Arabesque Labs design system

The tokens, CSS, components and rules that Arabesque Labs builds with.
**Accessible** (WCAG 2.2 AA as a floor), **bidirectional** (English and
Arabic, left to right and right to left, from the start), and built for
**efficient interaction**: the fewest steps, actions that say what they do,
and every consequence shown before, during and after.

It's plain CSS custom properties and plain HTML, with no framework and no
runtime dependency. A small Node script builds the outputs from one token
file. The optional JavaScript helpers have no dependencies either.

The source is on GitHub: [ArabesqueLabs/design-system](https://github.com/ArabesqueLabs/design-system).

## What's here

| Path | What |
|---|---|
| `tokens/tokens.json` | The single source of truth (W3C Design Tokens format): primitives, semantic roles, component tokens; dark and Arabic modes |
| `scripts/build.mjs` | Builds `dist/` and `docs/contrast.md` from the tokens |
| `scripts/build-react.mjs` | Builds `dist/react/`, the examples and the homepage template from `react/`, `examples/src/` and `templates/react/`; and a page beside each document (`README.html`, `docs/…/*.html`) |
| `dist/arabesque.css` | Everything in one file, in cascade layers: tokens, base, layout, components, utilities |
| `dist/tokens.css` | The tokens alone, as `--al-*` custom properties, light and dark |
| `dist/tailwind-theme.css` | A Tailwind v4 `@theme` mapping onto the same variables |
| `dist/tokens.json` | Resolved token values per mode, for other tools |
| `dist/icons.svg` | The icon sprite |
| `dist/brand/`, `dist/patterns/` | The mark, star and favicon in fixed inks, and pattern tiles, for email, slides and documents |
| `dist/react/` | The React components, with their types ([`docs/react.md`](docs/react.md)) |
| `css/` | The sources: `base.css`, `layout.css`, `utilities.css`, `components/*.css` |
| `react/src/` | The React components' sources: one module per spec, writing the same markup and using the helpers |
| `js/` | Optional helpers, each with its types (`.d.ts`): `theme`, `toast`, `dialog`, `menu`, `tabs`, `tooltip`, `position`, `validate`, `count`, `search`, `keys`, `format`, `chart`, `datepicker`, `pattern`, `site-header` |
| `tests/`, `scripts/check-page.mjs` | Unit tests and the system's own rules; the showcase checked in a real browser |
| `icons/`, `assets/brand/` | Icon sources; the mark, star and wordmark from the logo pack |
| `docs/` | Foundations, interaction, accessibility, RTL, adoption, component specs, the audit, the contrast report |
| `index.html` | The showcase: every demo on one page, generated from `examples/src/` |
| `examples/` | Every component working, in React, a page each, in English and Arabic ([`examples/index.html`](examples/index.html)) |
| `templates/` | Whole pages to start a site from: the studio homepage, in English and Arabic, in HTML and in React ([`templates/README.md`](templates/README.md)) |

## Build

Requires Node 20 or later. The CSS, tokens and icons need no install step;
the React components, their examples and the homepage template need
`npm install` (esbuild, TypeScript, React) first.

```sh
node scripts/build.mjs        # dist/: the CSS, tokens and sprite, and docs/contrast.md
npm run build:react           # dist/react/, examples/, templates/home.html, the documents' pages
npm run build                 # both
```

It prints a summary and exits non-zero if any colour pair fails its contrast
minimum, a type is wrong, or an example has a sentence with no Arabic. Don't
edit `dist/`, `examples/*.html` or the template's HTML by hand; they're
committed, so rebuild and commit them with the sources they come from.

## Test

```sh
npm test             # unit tests, and the system's rules: logical properties only,
                     # every var() a token, every primitive used, one @keyframes each
npm run check        # build, test, and fail if dist/, the examples or the template weren't rebuilt

npm i --no-save axe-core@4.10.2
node scripts/check-page.mjs   # in Chrome: the helpers on their own page
                              # (tests/pages/helpers.html), with real key presses;
                              # the showcase with axe in light, dark, English and Arabic;
                              # every example page, and the template, the same way
```

All three run on every push and pull request (`.github/workflows/check.yml`).
The build also fails if a component sets a colour on a background the
contrast check doesn't measure, or if `arabesque.css` grows past its size
budget (27 KB gzipped). Before a release, run the
[screen reader checks](docs/screen-readers.md) by hand.

## See the showcase

The sprite needs to be served over HTTP:

```sh
npm run serve        # then open http://127.0.0.1:4900/
```

Switch theme and language at the top; in Arabic, choose Western or
Arabic-Indic digits. All three are remembered. The showcase is built from the
same demos as the example pages (`examples/src/showcase.tsx`): `index.html`
is generated, so change the demos, not it. Every document, this one
included, is also a page of its own: `README.html`, `docs/react.html` and so
on, in English and, where there's a translation, Arabic.

The same components in React, a page each, are at
`http://127.0.0.1:4900/examples/`: each in English, then in Arabic, right to
left.

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
   specs in [`docs/components/`](docs/components/README.md); or, in a React
   app, with the components (`@arabesquelabs/design-system/react`), which
   write the same markup: see [`docs/react.md`](docs/react.md).
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
- [Components](docs/components/README.md), and [in Arabic](docs/components/ar/README.md).
- [React](docs/react.md): the components in React, and how to change them.
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

Deprecated names keep working, as aliases, for at least one released
version, and say which version removes them ("kept until X.Y"); a test
fails if one outlives it. From 1.0, only a major removes them. Projects pin
a version and update deliberately.

Before 1.0 (as semver allows for 0.x), a minor version may remove: what
nothing in the system uses, and what the previous minor deprecated. The
changelog lists each removal under **Removed**, with what to use instead.

## Release

Releases are a pull request. After every push to `main`,
`.github/workflows/release-pr.yml` works out the next version from the
changelog's **Unreleased** section (`scripts/next-version.mjs`):

| Unreleased has | Next version |
|---|---|
| **Removed** | major (minor before 1.0) |
| **Added**, **Changed**, **Deprecated** | minor |
| only **Fixed** or **Security** | patch |
| nothing | no release |

It cuts that release on the `release/next` branch with
`npm run release -- <version>`, which moves the Unreleased entries under the
version, dated, sets `version` in `package.json`, builds, and copies `dist/`,
`fonts/` and `js/` to `v/<version>/`; the font files themselves go once into
`v/_fonts/<hash>/`, shared by every release with the same faces, and the
release's `fonts/fonts.css` points there. Then it opens a **Release x.y.z** PR, or
updates the open one. To choose a different version, label the PR
`release:major`, `release:minor` or `release:patch`; it takes effect on the
next push to `main` (or run the workflow by hand).

**Merging it is releasing.** `.github/workflows/tag-release.yml` tags
`v<version>`, and the next deploy serves `v/<version>/`. A released version is
never rebuilt or changed (the script refuses, and CI fails if a file under
`v/` is modified), so it's served with a year's cache (`_headers`).

So: write each change's entry under **Unreleased** in the change itself, and
only for what ships (tokens, CSS, helpers, docs). An entry is what makes a
release, so changes to the repository alone (CI, scripts) leave the changelog
as it is.

Setup, once: a `RELEASE_TOKEN` secret, a fine-grained token (or a GitHub
App's) with contents and pull requests read and write. With the default
token, the release PR wouldn't start `check.yml`.

By hand, the same steps: `npm run release -- 0.3.0`, `npm run check`, commit
("Release 0.3.0"), and merge; the tag follows.
