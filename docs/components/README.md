# Components

Each spec covers anatomy, variants and sizes, states, keyboard, ARIA, right to left, do and don't, and the tokens it uses (listed from its CSS). See them working in `index.html`, and in React, a page each, in [`examples/`](../../examples/index.html) ([`docs/react.md`](../react.md)).

Every spec is also in Arabic, in [`ar/`](ar/README.md); the showcase's spec reader opens those when the page is in Arabic. The English is the reference: change a spec and its translation together (a test fails if a spec has no translation, or a link in either is broken).

| Component | What it is |
|---|---|
| [Button](button.md) | An action. |
| [Field](field.md) | A form control with its label, hint and error. |
| [Checkbox, radio and switch](choice.md) | Native checkboxes and radios in the accent colour, and a switch for settings that take effect at once. |
| [Segmented control](segmented.md) | One of two to five short options, all visible at once. |
| [Disclosure](disclosure.md) | A native `<details>` for what's secondary, optionally showing what's chosen inside it while closed (the fold with a summary value). |
| [Card, panel and stat](card.md) | Containers. |
| [Page head](page-head.md) | The page's title, and on the trailing side what applies to the whole page: its settings, views and primary action. |
| [Tabs and section nav](nav.md) | Tabs between views of one thing, and section navigation between pages; they look the same, and differ in markup. |
| [Site header](site-header.md) | A website's top bar: the lockup, the sections, language and theme; a menu under md. |
| [Sidebar](sidebar.md) | The app's sections in a column, collapsible to icons; a scrolling bar along the top under the `md` breakpoint. |
| [Footer](footer.md) | Who made it, where to go next, and the legal line; quiet, and the same on every page. |
| [Steps](steps.md) | A numbered sequence: the stages of how something is done. |
| [Table](table.md) | For comparing values: numbers line up, the total stands out, asides recede. |
| [Badge and tag](badge.md) | A badge is a short status beside something ("Active", "Experimental", a count). |
| [Notice and side-effect note](notice.md) | A notice is a message in the page, in four kinds. |
| [Toast](toast.md) | Says what just happened, briefly, without blocking; offers Undo when it can be undone. |
| [Dialog](dialog.md) | A native `<dialog>`, for a decision that needs the person's attention now. |
| [Menu](menu.md) | Actions on one thing, behind a button ("More", "Move to…"), in a native popover. |
| [Tooltip](tooltip.md) | A short label for an icon button or a chart mark, on hover and focus. |
| [Empty state](empty-state.md) | Why there's nothing here, and the next action. |
| [Loading and progress](progress.md) | Progress shown where the work happens: a spinner in the busy control or region, a skeleton where content will appear, a bar when progress can be measured. |
| [Pending changes: save state, changed field, rollback, stale](save-state.md) | Whether a change is kept, what's changed but not saved, an optimistic change that failed and was put back, and a result that no longer matches its inputs. |
| [Bulk action bar](bulk-bar.md) | Once things are selected: how many, what can be done to all of them, and a way to clear. |
| [Keyboard keys and shortcuts](kbd.md) | Keys, and the list of shortcuts that `?` opens. |
| [Charts](chart.md) | Columns, a split bar and a bullet chart, in plain HTML and CSS. |
| [Brand: mark, wordmark, lockup](brand.md) | The mark (one tile of the pattern, in a square frame) beside the wordmark. |
| [Pattern](pattern.md) | The tessellation of the mark's tile: as texture behind a band, or across a hero with its focal tile, drawn in on load. |
| [Construction figure](construction.md) | How the pattern is made, in three steps read as software. |
| [Icon](icon.md) | Line icons from the sprite. |
| [Breadcrumbs and back link](breadcrumbs.md) | Breadcrumbs show where a page sits in the hierarchy; a back link returns to the previous step of a flow. |
| [Confirmation](confirmation.md) | Says that something has been done, gives a reference when there is one, and says what happens next. |
| [Character count](character-count.md) | A limit on a text field, said as what's left and, once over, by how much. |
| [Date input](date-input.md) | Three fields for a date people already know (a birthday, an issue date). |
| [Date picker](date-picker.md) | A date near today, typed or chosen from a calendar in the page's language. |
| [Error summary](error-summary.md) | When a form is submitted with problems: a list at the top of the form, each problem a link to its field. |
| [Phase banner](phase-banner.md) | Tells people a service is new or experimental, and where to say what they think. |
| [Search](search.md) | A search field with a visible label, a search icon and a Clear button. |
| [Summary list](summary-list.md) | Facts as key–value pairs, each optionally with a Change link: the "check your answers" step, or a record's details. |
| [Task list](task-list.md) | The parts of a long job, each with its status, so people can do them in any order and see what's left. |
| [Tints: highlight, tag and avatar](tint.md) | Soft colour washes for emphasis and identity. |
