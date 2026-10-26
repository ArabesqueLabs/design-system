# Introduction

Arabesque is the Arabesque Labs design system: the tokens, CSS, components
and rules its products are built with. These documents are its reference.
They say what each part is for, how it behaves, and why, so a page built
with it is accessible, reads in Arabic as well as English, and takes people
the fewest steps.

To use it in a project, start with the README's
[Use it in a project](../README.md#use-it-in-a-project): link a released
version of the CSS and fonts, then build with the classes, or with the
React components. To see everything working first, the
[Elements page](../elements/index.html) has every component on one page,
and the [examples](../examples/index.html) have each on its own, in English
and Arabic.

## What's here

| | |
|---|---|
| **Guides** | The rules everything else follows. [Principles](principles.md) first: what every interface holds to. Then [interaction](interaction.md), the [patterns](patterns.md) that combine components, [accessibility](accessibility.md) and its [screen reader checks](screen-readers.md), [right to left](rtl.md), and [React](react.md). |
| **Foundations** | The values every component is made of: [colour](foundations/colour.md), [typography](foundations/typography.md), [space and shape](foundations/space-and-shape.md), [layout](foundations/layout.md), [iconography](foundations/iconography.md), [motion](foundations/motion.md), and [writing](foundations/writing.md). |
| **Components** | A [spec for each](components/README.md), in English and Arabic: its anatomy, variants, states, keyboard, ARIA, right to left, what to do and not, and the tokens it uses, with the component working above it. |
| **Reference** | Every [token](tokens.md), every [JavaScript helper](helpers.md), and the [contrast](contrast.md) of every colour pair, generated from the sources. |
| **Project** | How Arabesque Labs' sites [move onto it](adoption.md), and the [audit](00-audit.md) it was built from. |

## How to read a spec

Each component's spec has the same sections, in the same order, so you can
go straight to the one you need:

- **Anatomy:** the markup, as the CSS expects it. Copy it; the classes and
  the elements both matter.
- **Variants and sizes:** the modifier classes, and when to use each.
- **States:** hover, focus, unavailable, busy, invalid: how each looks, and
  what sets it.
- **Keyboard** and **ARIA:** what it does from the keyboard, and what a
  screen reader is told. Native elements first; ARIA only where they fall
  short.
- **Right to left:** what mirrors in Arabic, and what doesn't.
- **Do and don't:** the rules, as examples.
- **Tokens:** every token its CSS uses, so you know what a change to one
  will touch.

If a spec and what you see disagree, [say so](https://github.com/ArabesqueLabs/design-system/issues).

## Versions

Arabesque is experimental until 1.0: any release may rename or remove
tokens, classes and components. These documents describe the latest
release; what each release changed is in the [changelog](../CHANGELOG.md).
Read it before you upgrade.
