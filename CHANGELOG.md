# Changelog

All notable changes to the design system. The format follows
[Keep a Changelog](https://keepachangelog.com/en/1.1.0/), and versions follow
[semantic versioning](https://semver.org/) as described in the README.

## [Unreleased]

## [0.1.0] - 2026-10-12

The first version.

### Added

- **Tokens** (`tokens/tokens.json`, W3C DTCG): primitives, semantic roles and
  component tokens, with dark and Arabic modes. 142 tokens.
- **Build** (`scripts/build.mjs`, no dependencies): `dist/tokens.css`,
  `dist/tailwind-theme.css` (Tailwind v4), `dist/tokens.json`,
  `dist/arabesque.css` (everything, in cascade layers), `dist/icons.svg`, and
  `docs/contrast.md`; fails if any of the 70 measured colour pairs is short of
  its WCAG minimum.
- **CSS:** base (reset, type, focus, reduced motion, forced colours, more
  contrast, `:lang(ar)`), layout primitives, utilities, and 26 components.
- **JavaScript helpers** (optional, no dependencies): theme, toast, menu, tabs,
  tooltip, positioning, number formatting with an Arabic-Indic choice, and
  the pattern.
- **24 icons** and the brand mark, star and wordmark from the logo pack.
- **Docs:** the audit, foundations, interaction, accessibility, right to left,
  adoption, and a spec for every component.
- **Showcase** (`index.html`): every token and component in light and dark,
  English and Arabic, with the pending states working.
