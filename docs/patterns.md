# Patterns

How components combine for common jobs. Each is shown working in `index.html`.

## Ask, check, confirm

For anything sent, or hard to take back.

1. **Ask.** One form, `novalidate`, checked on submit with
   [`js/validate.js`](../js/validate.js): an [error summary](components/error-summary.md),
   inline errors, and "Error: " in the page title.
2. **Check.** A [summary list](components/summary-list.md) of the answers,
   each with a Change link that returns to the field with the answer kept.
3. **Confirm.** A [confirmation](components/confirmation.md) with what happens
   next. Disable the send action once pressed.

Never put answers in the address (no `GET` forms for personal data). Move focus
to each step's heading or panel as it appears.

## Pending changes

See [save state](components/save-state.md).

- Keep the **saved value** (the baseline) apart from the **draft**.
- Number each edit. A save that completes marks "Saved" only if no edit has
  happened since it started; otherwise the state stays "Unsaved changes".
- Ignore responses that arrive out of order.
- **Discard** returns to the baseline and offers **Undo**, which restores the
  exact draft that was discarded.
- On failure, keep the draft, say it couldn't save, and offer **Retry**, which
  saves the current draft.
- Figures worked out from the value are marked stale until the latest
  calculation returns; an older result never clears the stale mark.

## Optimistic changes and rollback

Do the change at once with Undo. If the server refuses, put the thing back
where it was, mark it, say why in words, and offer Retry. Move focus to Retry.

## Destructive changes

If it can be undone, do it and offer Undo. If it can't, use a
[dialog](components/dialog.md): name the thing and what goes with it, give the
safer action first focus, and, for the most serious cases, ask for a typed
confirmation that is checked before the dialog can close. Return focus to the
trigger afterwards.

## Empty, loading, error and offline

- **Empty:** why there's nothing, and the next action ([empty state](components/empty-state.md)).
- **Loading:** progress where the work happens ([loading](components/progress.md)); keep the layout stable.
- **Error:** what failed, in words, what was kept, and Retry.
- **Offline:** say changes are kept on this device and will be sent when the
  connection returns, only if that's true; otherwise say they can't be saved yet.
