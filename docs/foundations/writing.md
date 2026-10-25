# Writing

The interface talks like a capable colleague: plainly, briefly, in the second
person, without fuss. Arabic copy is written, not machine-translated, in
Modern Standard Arabic.

## Principles

- **Say what it is or does.** "Save offer", not "Submit". "3 offers saved",
  not "Success!".
- **Sentence case** for everything: titles, buttons, tabs, labels.
- **Short words, short sentences.** Cut "please", "simply", "just",
  "successfully".
- **Numbers as numerals** ("3 offers"), money with its symbol ("£108,000"),
  dates unambiguous ("4 January 2027", not "04/01/27").
- **No jargon the person didn't bring.** "Take-home pay", not "net
  remuneration"; but "IR35" and "tax code" when they're the person's words.
  Nor the system's own: "tessellation", "lattice", "focal tile" belong in
  these docs, never on a page.
- **Never invent facts.** No made-up products, customers, figures,
  testimonials or team members, not even as placeholders: where a slot
  needs a name, write "Product name". Example data on the Elements page is
  plainly an example ("Item one", "Offer A").
- **No hype.** Not "revolutionary", "cutting-edge", "seamless", "next-gen";
  no exclamation marks, no emoji.

## Headings

- **A plain claim.** A heading says what's true, or what people get: "Code
  reads left to right, in either language", not "Code, reimagined".
- **A lead-in, then the rest, quieter.** For a section's heading, a short
  claim and then the sentence that bears it out, in the muted colour:
  `<h2>How we build. <span class="al-muted">Small parts, one rule, repeated
  with care.</span></h2>`. Both are the heading; screen readers read it whole.
- **An eyebrow is a few words**, in sentence case, that say which part of the
  page this is ("Who we are"), never a second headline.
- **A closing line says what people will have**: "Your next page, built from
  the same tile", not "Get started today".

## Labels for actions

- **Verb + object:** "Save offer", "Archive 3 processes", "Delete account and
  data". Never "OK", "Yes", "Submit", "Confirm".
- **Count what's affected** in bulk actions: "Archive 3".
- **An ellipsis (…)** means the action asks something more before it acts:
  "Move to…", "Delete account…".
- **The destructive button names what it destroys**, in full, in its dialog:
  "Delete account and data".
- **Cancel, Keep or Close** for the way out, naming what's kept when it helps:
  "Keep my account".

## Messages

| Kind | Say | Example |
|---|---|---|
| Done | What happened, past tense; offer Undo if possible | "Process archived. Undo" |
| Pending | What's happening, with an ellipsis | "Saving…", "Working out again…" |
| Unsaved | That it isn't kept yet | "Unsaved changes" |
| Error | What went wrong, why if known, and what to do | "Couldn't save: you're offline. Retry" |
| Side effect | What else changes, before it does | "Changing the rate also updates 2 saved offers." |
| Empty | Why there's nothing, and the next action | "No offers yet. Work one out in the calculator…" |
| Destructive | What goes, how much, and that it's permanent | "This deletes your account and everything in it: 12 applications… It can't be undone." |

Errors never blame ("You entered an invalid code") and never apologise
emptily ("Oops!"). They say how to fix it: "A tax code is like 1257L, K475 or
BR. Check your payslip."

## Names

- **The design system is Arabesque**, with a capital A and nothing around
  it: not "the Arabesque design system", "Arabesque DS" or "the Arabesque
  Labs design system". Where a reader may not know it, the first mention
  says what it is ("Arabesque, the Arabesque Labs design system"); after
  that, "Arabesque". In Arabic: «آرابيسك»
  («آرابيسك، نظام تصميم معامل آرابيسك» the first time).
- **The company is Arabesque Labs**, in full: never "Arabesque" alone, which
  is the design system's name.
- **An arabesque**, lowercase, is the kind of pattern the brand draws on, not
  a name; prefer "the pattern" in these docs, so the two don't meet.

## Arabic

- Modern Standard Arabic, in the same plain register, written as Arabic:
  what a person would write, not the English word for word.
- Arabic punctuation (، ؛ ؟) in Arabic sentences.
- Latin names, codes and amounts stay as they are, isolated (see
  [`../rtl.md`](../rtl.md)): "الرمز 0T", "Arabesque Labs".
- Imperatives for actions ("احفظ العرض", "أرشف 3"), past tense for what's done
  ("حُفظ").
