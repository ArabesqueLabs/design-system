# React

The system's components as React components: `@arabesquelabs/design-system/react`
(`dist/react/`, from `react/src/`). They write the same markup the specs
describe, so `dist/arabesque.css` styles them, and they use the same
helpers (`js/`) for what they do. The CSS stays the system; React is one
way to write its markup. hunt and any page without React use the classes
and the helpers directly, as before.

See them working, in English and Arabic, light and dark, in
[`examples/`](../examples/index.html) (serve the repository, then open
`/examples/`). The studio homepage template is built from them:
[`templates/react/home.tsx`](../templates/react/home.tsx).

## Use it

React 19 or later. Link the CSS and fonts as for any page (README, "Use it
in a project"), serve `dist/icons.svg` from the same origin as the page (an
SVG `<use>` can't reach across origins), then:

```tsx
import { ArabesqueProvider, Button, Field, Input, SiteHeader, useToast } from "@arabesquelabs/design-system/react";

export function App() {
  return (
    <ArabesqueProvider lang="en" sprite="/dist/icons.svg">
      <SiteHeader links={[{ label: "The idea", href: "#idea" }]} />
      <Field label="Full name" hint="As it is on your passport">
        <Input autoComplete="name" />
      </Field>
      <Button variant="primary">Save changes</Button>
    </ArabesqueProvider>
  );
}
```

`ArabesqueProvider` says, once, what every component needs to know about the
page. Without one, the components take the language of `<html lang>` in the
browser; on the server there's no `<html>` to read, so a page rendered there
in Arabic needs the provider.

| Setting | What | Default |
|---|---|---|
| `lang` | The page's language: the components' own words (Menu, Clear search, Retry…) and how they write numbers | `"en"` |
| `numerals` | In Arabic, Western (`"latn"`) or Arabic-Indic (`"arab"`) digits | `"latn"` |
| `sprite` | The icon sprite's URL | `"/dist/icons.svg"` |
| `labels` | Your own words for any built-in label | the language's |

For Arabic, set `lang="ar" dir="rtl"` on `<html>` as well, and
`<ArabesqueProvider lang="ar">`: the components' labels, digits, date picker
and construction figure follow it. A part of a page in the other language
takes its own provider and its own `lang` and `dir`, as the examples do.

## What there is

One module per spec, named after it:

| Module | Components | Spec |
|---|---|---|
| `button` | `Button` (`variant`, `size`, `icon`, `iconEnd`, `label`, `busy`; an `<a>` with `href`), `ButtonGroup` (`label`, `vertical`) | [Button](components/button.md) |
| `link`, `language` | `TextLink` (`arrow`, `external`, `muted`), `LanguageLink` | [Text link](components/link.md), [Language link](components/language-switch.md) |
| `field`, `range` | `Field`, `Input` (`icon`, `number`), `Range`, `Select`, `Textarea`, `Affix`, `AffixText`, `Fieldset`, `ErrorMessage`, `Hint` | [Field](components/field.md) |
| `choice` | `Checkbox` (`indeterminate`), `Radio`, `Switch`, `Choices` | [Checkbox, radio and switch](components/choice.md) |
| `segmented` | `Segmented` (radios), `SegmentedButtons` (pressed buttons) | [Segmented control](components/segmented.md) |
| `character-count`, `date-input`, `date-picker` | `CharacterCount`, `DateInput`, `DatePicker`, `DateExample` | [Character count](components/character-count.md), [Date input](components/date-input.md), [Date picker](components/date-picker.md) |
| `forms` | `ErrorSummary`, `Search`, `SummaryList`, `Confirmation` | [Error summary](components/error-summary.md), [Search](components/search.md), [Summary list](components/summary-list.md), [Confirmation](components/confirmation.md) |
| `disclosure`, `card`, `table`, `steps`, `task-list` | `Disclosure`, `Card` (`footer`, `ribbon`), `Panel`, `Stat`, `Table`, `Steps`, `TaskList` | [Disclosure](components/disclosure.md), [Card](components/card.md), [Table](components/table.md), [Steps](components/steps.md), [Task list](components/task-list.md) |
| `badge`, `tint` | `Badge`, `Tag`, `Highlight`, `Avatar` (`size`, `square`), `AvatarStack` | [Badge and tag](components/badge.md), [Tints](components/tint.md) |
| `page-head`, `nav`, `site-header`, `sidebar`, `footer`, `breadcrumbs` | `PageHead`, `Tabs`, `SectionNav`, `SiteHeader` (`language`, `sticky`, `skipTo`), `ThemeToggle`, `Shell`, `Footer`, `Breadcrumbs`, `BackLink` | [Page head](components/page-head.md), [Tabs](components/nav.md), [Site header](components/site-header.md), [Sidebar](components/sidebar.md), [Footer](components/footer.md), [Breadcrumbs](components/breadcrumbs.md) |
| `notice`, `phase-banner`, `toast`, `dialog`, `menu`, `tooltip` | `Notice` (`onDismiss`; its kind's word as the title by default), `SideEffect`, `PhaseBanner`, `useToast`, `Dialog`, `Menu`, `useTooltips` | [Notice](components/notice.md), [Phase banner](components/phase-banner.md), [Toast](components/toast.md), [Dialog](components/dialog.md), [Menu](components/menu.md), [Tooltip](components/tooltip.md) |
| `empty-state`, `progress`, `save-state`, `bulk-bar`, `kbd` | `EmptyState`, `Spinner` (the star; `label` when nothing beside it says what's happening), `Skeleton`, `Progress`, `SaveState`, `RollbackNote`, `Stale`, `StaleNote`, `BulkBar`, `Kbd`, `Shortcuts` | [Empty state](components/empty-state.md), [Loading](components/progress.md), [Pending changes](components/save-state.md), [Bulk bar](components/bulk-bar.md), [Keys](components/kbd.md) |
| `pagination`, `stepper`, `status`, `rating`, `popover` | `Pagination` (`page`, `pages`, `href`, `onNavigate`), `pageRange`, `Stepper` (`steps`, `current`, `href`), `Status` (`tone`, `live`, `dotOnly`), `Timeline`, `List`, `Rating`, `RatingValue`, `Popover` (`label`, `icon`, `title`) | [Pagination](components/pagination.md), [Stepper](components/stepper.md), [Status](components/status.md), [Timeline](components/timeline.md), [List](components/list.md), [Rating](components/rating.md), [Popover](components/popover.md) |
| `chart` | `ChartFigure`, `ColumnChart`, `SplitBar`, `BulletChart` | [Charts](components/chart.md) |
| `brand`, `pattern`, `construction`, `icon` | `Mark`, `ArabesqueMark`, `Star`, `Wordmark`, `Lockup` (`stacked`, `product`, `name`, `mark`), `Pattern` (`full`, `quiet`), `Hero`, `HeroCaption`, `ConstructionFigure`, `Icon` | [Brand](components/brand.md), [Pattern](components/pattern.md), [Construction figure](components/construction.md), [Icon](components/icon.md) |
| `layout` | `Page`, `Section` (`heading`, `lede`), `Stack`, `Cluster`, `Grid`, `Split`, `VisuallyHidden`, `SkipLink` | [Layout](foundations/layout.md) |

Every prop is typed (`dist/react/*.d.ts`), with what it's for.

## How they work

- **Same markup.** A component writes what its spec's Anatomy shows, with
  the same classes and ARIA. If the two ever differ, the spec is right.
- **The helpers do the behaviour.** Tabs, menus, the site header's menu,
  dialogs, the date picker, the character count, tooltips, chart keys and
  the pattern are wired by the helpers in `js/`, from an effect. They're
  imported from `js/` where they are (never bundled in), so the date picker
  and validation still find the sprite at `../dist/icons.svg`.
- **Ids are made for you.** A field's id, its hint's and its error's are
  made with `useId` and joined up (`aria-describedby`, `aria-invalid`), so
  they can't disagree. Give an `id` when something outside needs it: an
  error summary's link, say.
- **Server rendering** works: nothing touches `document` until an effect.
  The homepage template is rendered on the server, and wired in the page by
  the helpers alone (see its script).
- **Focus.** `Dialog` returns focus to `returnFocusTo` when it closes, or to
  what had focus when it opened. Pass `returnFocusTo`: Safari doesn't focus
  a button when it's clicked.

## Change them

Each component is in `react/src/<spec>.tsx`. Then:

```sh
npm install
npm run build:react   # dist/react, the examples, and the homepage template; type-checked
npm test              # includes tests/react.test.js
node scripts/check-page.mjs   # every example page in Chrome, with axe, light and dark
```

- **A component** changes with its CSS and its spec, in the same change.
  `tests/react.test.js` fails if a CSS component has no React component
  writing it, if the mark or the icons drift from `assets/` and `icons/`,
  or if the English and Arabic labels have different keys.
- **An example** is a function in [`examples/src/demos.tsx`](../examples/src/demos.tsx),
  written in English, with each sentence through `t()`. Its Arabic comes from
  the site's Arabic catalogue (`showcase-ar.js`), or `examples/src/ar.ts` for a
  new sentence; the build fails on a sentence with no Arabic. Each demo is
  shown twice on its page, in English and in Arabic, so it mustn't give
  fixed ids to its elements: let the components make them, or use `useId`.
- **The homepage** is [`templates/react/home.tsx`](../templates/react/home.tsx):
  its words, in English and Arabic, are in `copy`. The build writes
  `templates/home.html` and `templates/ar/home.html` from it; don't edit
  those.

`dist/react/`, `examples/` and the template's HTML are committed, as `dist/`
is: the site serves the repository as it is. CI rebuilds them and fails if
they differ.
