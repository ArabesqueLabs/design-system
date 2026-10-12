# Interaction

The system's main principle: **the fewest steps to get something done, actions
that say exactly what they do, and every consequence visible**: before it
happens, while it's pending, and after.

Each rule below has a component that makes it easy to follow.

## 1. Minimal hops

**Count the steps.** For every common task, write down the clicks and keys it
takes today and design for fewer. A step that only confirms what the person
already said is a step to remove.

| Rule | Do | Don't |
|---|---|---|
| Edit in place where it's safe | "Add a step" on the timeline, saving on Enter | Put the whole page into an Edit mode to change one thing |
| Update as people type | Figures recalculate on input, marked stale meanwhile ([save-state](components/save-state.md)) | A "Calculate" button |
| Save settings on change | A switch or select that applies at once, with "Saved" beside it | Group → Edit → change → Save |
| Default sensibly, remember choices | The last-used currency, period and tax year | Ask every time |
| Act on many at once | Select, then "Archive 3" in the [bulk bar](components/bulk-bar.md) | Archive one at a time |
| Give everything a keyboard path | `n` new, `/` search, `?` the shortcut list ([kbd](components/kbd.md)) | Mouse-only drag as the only way to move something |
| Never leave a dead end | Every empty and error state offers the next action ([empty-state](components/empty-state.md)) | "No results." and nothing else |
| Disclose progressively | Fold detail into a [disclosure](components/disclosure.md) that shows its value when closed | Fold away the primary action |
| Go straight there | A toast's "Compare" link opens the comparison with the new offer in it | "Saved. Go to Offers, then tick it." |

## 2. Clear actions

- **Verb + object.** "Save offer", "Archive 3 processes", "Delete account and
  data". Never "OK", "Submit", "Yes", "Done" (see [writing](foundations/writing.md)).
- **One primary action per view or dialog**, in `.al-button--primary`. If two
  actions compete, one of them isn't primary.
- **Destructive actions look different** (`.al-button--danger`) and name what
  they destroy. In a menu they come last, after a separator.
- **An ellipsis** ("Move to…") means more input follows; no ellipsis means it
  acts at once.
- **Busy isn't disabled.** A button that's working shows `aria-busy` and a
  spinner, and keeps its label ("Saving offer"); a button that isn't
  available is `aria-disabled`, and the reason is shown next to it ("Save two
  offers to compare them"). Prefer explaining over disabling.

## 3. Side effects, before

**Say what else will change before it changes**, next to the control that
causes it, with an [`.al-side-effect`](components/notice.md) note:

> Changing the rate also updates **2 saved offers**.
> A new name is added to your companies when you save.

Count and name: "2 saved offers", not "related items". If nothing else
changes, say nothing.

## 4. Undo, not "Are you sure?"

| The action | Do |
|---|---|
| Can be undone (archive, move, delete something with a bin, change a setting) | Do it at once. Show a [toast](components/toast.md) with **Undo** for at least 6 seconds |
| Can't be undone (delete an account, replace everything with an import, send an email) | Confirm in a [dialog](components/dialog.md) that says what will be lost, how much, and that it's permanent; the confirming button names it ("Delete account and data") |
| Can't be undone and is severe | Also ask for a deliberate input (type the email address) |

A confirmation people see ten times a day stops being read. Keep them rare,
so they're read.

## 5. Pending, saved, failed

Show the state of a change **where the change is**, in words:

- **A changed field** that isn't saved yet is marked: `data-changed` on the
  `.al-field`, with "Changed, not saved" under it.
- **A form's save state** sits beside its title or its Save button:
  `Unsaved changes` → `Saving…` → `Saved`, or `Couldn't save` with **Retry**
  ([save-state](components/save-state.md)). It's a polite live region, so
  screen readers hear it.
- **Leaving with unsaved changes** asks first, offering to save or discard,
  never losing the work silently.
- **Discarding** is itself undoable from its toast.

## 6. Optimistic updates, and rolling back

For quick, likely-to-succeed actions (archive, move, toggle), **show the result
at once** and send the request behind it. If it fails:

1. Put the thing back where it was.
2. Mark it (`.al-rolled-back`) with what didn't happen and why:
   "Couldn't archive Meta: the server didn't answer. It's back where it was."
3. Offer **Retry** right there, and move focus to it.
4. Keep the message until the person acts; never in a toast that disappears.

Don't use optimistic updates for anything slow, costly or irreversible
(payments, imports, sending): show progress instead.

## 7. Recalculated and stale results

When inputs change and a result is being worked out again:

- Mark the old result as stale (`.al-stale`), with "Working out again…"
  (`.al-stale-note`); don't blank it and don't swap it silently.
- When the new value arrives, say which input changed it if that's not
  obvious ("Up £120 a month, from the pension change").
- If it fails, keep the stale value marked, with the reason and Retry.

## 8. Progress where it happens

Async work shows progress **in the place it affects**: a spinner in the button
that started it, a skeleton where the list will appear, a bar for an import
with a count. A page-wide spinner is only for the first load. Busy regions get
`aria-busy="true"`.
