# Pending changes: save state, changed field, rollback, stale

Whether a change is kept, what's changed but not saved, an optimistic change that failed and was put back, and a result that no longer matches its inputs. See [interaction](../interaction.md) §5–7.

**CSS:** [`css/components/save-state.css`](../../css/components/save-state.css). **Classes:** `.al-icon`, `.al-rollback-note`, `.al-rolled-back`, `.al-save-state`, `.al-stale`, `.al-stale-note`.

## Anatomy

Save state, beside the form's title or Save button:
```html
<span class="al-save-state" role="status" data-state="unsaved">Unsaved changes</span>
<!-- saving → "Saving…", saved → "Saved", failed → -->
<span class="al-save-state" role="status" data-state="failed">Couldn't save <button class="al-button al-button--quiet al-button--sm">Retry</button></span>
```
Changed field: `data-changed` on `.al-field` with `<p class="al-field__changed">Changed, not saved</p>` ([field](field.md)).

Rolled back (an optimistic change that failed):
```html
<li class="al-rolled-back">Meta
  <p class="al-rollback-note" role="alert"><svg class="al-icon al-icon--sm" aria-hidden="true">…danger…</svg>
    <span>Couldn't archive Meta: the server didn't answer. It's back where it was.</span>
    <button class="al-button al-button--sm">Retry</button></p></li>
```
Stale result:
```html
<p class="al-stale-note"><span class="al-spinner" aria-hidden="true"></span>Working out again…</p>
<p class="al-stale">Take-home, a month: <strong><bdi>£6,010</bdi></strong></p>
```

## Variants and sizes

| `data-state` | Shows | Colour |
|---|---|---|
| `unsaved` | "Unsaved changes", a dot | warning |
| `saving` | "Saving…", a spinner | muted |
| `saved` | "Saved", a check | success |
| `failed` | "Couldn't save" + Retry | danger |

## States

As above. Under reduced motion the saving spinner is a still dotted ring. The stale figure dims and the note says why.

## Keyboard

Retry is a button; after a rollback, focus moves to it (the control that started the action is gone).

## ARIA

The save state is `role="status"` (polite). The rollback note is `role="alert"`. The stale note is text, so dimming isn't the only signal.

## Right to left

Icons and edges on the start side.

## Do

- Always words, never a coloured dot alone.
- Keep failed and rolled-back messages until the person acts.
- Say which input changed a recalculated figure when it isn't obvious.

## Don't

- Silently replace a figure.
- Put a rollback in a toast that disappears.
- Use optimistic updates for slow or irreversible work.

## Tokens

`--al-border-focus`, `--al-color-danger`, `--al-color-danger-wash`, `--al-color-success`, `--al-color-text-muted`, `--al-color-warning`, `--al-duration-fast`, `--al-ease-standard`, `--al-size-target-min`, `--al-space-1-5`, `--al-space-3`, `--al-text-sm`
