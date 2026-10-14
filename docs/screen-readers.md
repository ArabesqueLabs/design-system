# Screen reader checks

axe and `scripts/check-page.mjs` check the markup and the behaviour; neither
can say what a screen reader actually announces, or when. These are the
parts of the system where that's most delicate. Run them on the showcase
before a release, in both languages, and record what you heard below.

## Setups

| Screen reader | Browser | Start | Read next / previous | Interact |
|---|---|---|---|---|
| VoiceOver (macOS) | Safari | ⌘F5 | VO (⌃⌥) + → / ← | Tab, Space, Return |
| NVDA (Windows) | Firefox | ⌃⌥N | ↓ / ↑ (browse mode) | Tab; Insert+Space switches to focus mode |
| VoiceOver (iOS), optional | Safari | Settings → Accessibility | swipe right / left | double-tap |

For Arabic, switch the showcase to Arabic first. VoiceOver picks its Arabic
voice from `lang="ar"`; for NVDA, install an Arabic voice (Windows OneCore,
or eSpeak) and turn on automatic language switching in Speech settings.

## The checks

Each check says what to do and what you should hear. "Hears" means the
words, in about that order: names, roles and states will be phrased in each
screen reader's own way.

**Dialog that keeps work** (Dialog → Rename)
1. Open it. Hears: "Rename item, dialog", then the field: "Name, edit text, Item one".
2. Change the name, press Escape. Hears the bar as an alert: "Discard your changes?", and focus is on "Keep editing".
3. Escape again. The dialog stays; nothing is lost.
4. Discard changes. The dialog closes, and focus is back on "Rename".

**Character count** (Textarea and character count → Description)
1. Focus the field. Hears its label, then "You can enter up to 120 characters".
2. Type a word and stop. After a moment, hears "You have … characters remaining", once, not on every key.
3. Paste past the limit. Hears "You have … characters too many", and the field is announced as invalid.

**Toast with an action** (Toast → Archive item)
1. Archive item. Hears "Process archived" without focus moving.
2. Press F6. Focus moves to "Undo". Use it; focus returns to the button you were on.
3. Undo's own toast ("Process restored") is announced once, and isn't left in the reading order after it goes.

**Tooltip** (Tooltip)
1. Tab to it. Hears its name, then the tip as its description.
2. Escape hides the tip; focus stays.

**Charts** (Column chart, Split bar, Bullet chart)
1. Tab into a chart: one stop. Hears the first mark: its value and what it is, then "image".
2. Arrow keys move mark to mark (in Arabic, → goes back); Home and End to the ends. Tab leaves the chart.
3. The split bar is one image, named with all its parts.

**Live and busy states**
1. Save state, changes and stale results: saving and saved are announced, once each.
2. Button → "Saving changes" is announced as busy, and pressing it does nothing.
3. Stale figure: "Working out again…" is read with the figure, not only shown as dimmed.

**Error summary** (Ask, check, confirm → Continue, with the fields empty)
1. Focus moves to the summary; hears its title, then its list of problems.
2. Each link moves to its field, which is announced with its error.

**Right to left** (in Arabic)
1. Amounts and numbers with a currency are read as one number, in the right order.
2. An English phrase inside Arabic is read in the English voice (`lang="en"`).

## Results

Record each run: who, when, the setup and its versions, and anything that
didn't sound right (with the check's name). An issue found here gets a fix
and, where it can, a check in `scripts/check-page.mjs`.

| Date | Who | Setup | Language | Result |
|---|---|---|---|---|
| | | | | |
