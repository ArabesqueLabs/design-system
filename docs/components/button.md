# Button

An action. A `<button>` does something; an `<a href>` goes somewhere, styled the same when it's an action-like link ("Open the calculator").

**CSS:** [`css/components/button.css`](../../css/components/button.css). **Classes:** `.al-button`, `.al-button--danger`, `.al-button--icon`, `.al-button--primary`, `.al-button--quiet`, `.al-button--sm`.

## Anatomy

```html
<button type="button" class="al-button al-button--primary">Save offer</button>
<button type="button" class="al-button">Compare offers</button>
<button type="button" class="al-button al-button--quiet">Add a step</button>
<button type="button" class="al-button al-button--danger">Delete offer</button>
<button type="button" class="al-button al-button--icon" aria-label="Edit offer">
  <svg class="al-icon" aria-hidden="true"><use href="dist/icons.svg#al-icon-edit"></use></svg>
</button>
```
Label, optionally with an icon before it (or a trailing chevron for "Move to…"). Icon-only buttons are square.

## Variants and sizes

| Kind | Class | Use |
|---|---|---|
| Primary | `--primary` | The one action the view or dialog is for. One per view |
| Secondary | (none) | Other actions, bordered |
| Quiet | `--quiet` | Secondary and repeated actions in text: Edit, Add a step, Clear. Replaces hunt's `.link-button` and `.app-add` |
| Danger | `--danger` | Destroys something: secondary or quiet; `--danger --primary` only as the last step of a confirmation |
| Icon | `--icon` | Icon alone, with `aria-label` and a tooltip |

**Sizes:** default (40px) and `--sm` (32px). Quiet buttons keep a 24px minimum target in both.

## States

| State | How |
|---|---|
| Hover | Sunk background, border to text colour (primary darkens); quiet buttons underline |
| Focus | The system outline (2px, offset 2px) |
| Active | Nudged down 1px |
| Unavailable | `aria-disabled="true"` (stays focusable; the reason is next to it or in `aria-describedby`); `disabled` only inside forms where it can't be explained |
| Busy | `aria-busy="true"`: the label stays, a spinner follows it; clicks are ignored |

## Keyboard

Enter and Space activate (native). Focus order follows the DOM.

## ARIA

Name from the label; icon buttons need `aria-label`. Toggle buttons use `aria-pressed`. Menu buttons: `aria-haspopup="menu"` and `aria-expanded` (see [menu](menu.md)).

## Right to left

Icons before the label stay before it (on the right in Arabic). Directional icons (arrow, chevron) take `.al-mirror`.

## Do

- Name the action and its object: "Save offer", "Archive 3".
- Put the primary last in a dialog's action row, first in a page's.
- Explain why something's unavailable, beside it.

## Don't

- "OK", "Submit", "Yes", "Click here".
- Two primary buttons in one view.
- Disable a button to mean "busy".
- Use a danger button for something that can be undone; do it and offer Undo.

## Tokens

`--al-border-hairline`, `--al-button-height`, `--al-button-height-sm`, `--al-button-padding-inline`, `--al-button-radius`, `--al-color-accent`, `--al-color-control`, `--al-color-danger`, `--al-color-on-accent`, `--al-color-surface-sunk`, `--al-color-text`, `--al-duration-fast`, `--al-ease-standard`, `--al-font-sans`, `--al-size-target-min`, `--al-size-target-touch`, `--al-space-1`, `--al-space-2`, `--al-space-3`, `--al-text-base`, `--al-text-sm`, `--al-weight-medium`
