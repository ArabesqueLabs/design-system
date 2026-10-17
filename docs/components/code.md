# Code and command

Code to read or copy, in one language or several, always left to right; and a command, one line to paste into a terminal.

**CSS:** [`css/components/code.css`](../../css/components/code.css). **JS:** [`js/copy.js`](../../js/copy.js) (`initCopy()`), [`js/highlight.js`](../../js/highlight.js) (`highlightCode()`, `tokenize()`), and [`js/tabs.js`](../../js/tabs.js) for several languages. **Classes:** `.al-code`, `.al-code__bar`, `.al-code__caption`, `.al-code__tabs`, `.al-code__tab`, `.al-code__copy`, `.al-code__copy-idle`, `.al-code__copy-done`, `.al-code__pre`, `.al-code__line`, `.al-code__line--mark`, `.al-command`, `.al-command--prompt`, `.al-syntax-keyword`, `.al-syntax-string`, `.al-syntax-number`, `.al-syntax-comment`, `.al-syntax-function`, `.al-syntax-tag`, `.al-syntax-attribute`.

## Anatomy

```html
<div class="al-code">
  <div class="al-code__bar">
    <span class="al-code__caption">css/components/code.css</span>
    <button type="button" class="al-button al-button--quiet al-button--sm al-code__copy" data-copy
      data-label-copy="Copy" data-label-copied="Copied" data-label-failed="Couldn't copy. The text is selected, so you can copy it yourself.">
      <svg class="al-icon al-code__copy-idle" aria-hidden="true">…copy…</svg><svg class="al-icon al-code__copy-done" aria-hidden="true">…check…</svg>
      <span data-copy-label>Copy</span>
    </button>
  </div>
  <pre class="al-code__pre" dir="ltr" tabindex="0"><code><span class="al-code__line">.al-code__pre {</span>
<mark class="al-code__line al-code__line--mark">  direction: ltr;</mark>
<span class="al-code__line">}</span></code></pre>
  <span class="al-visually-hidden" role="status" data-copy-status></span>
</div>

<div class="al-command al-command--prompt">
  <code dir="ltr">npm run build</code>
  <button type="button" class="al-button al-button--quiet al-button--sm al-code__copy" data-copy …>…</button>
  <span class="al-visually-hidden" role="status" data-copy-status></span>
</div>
<script type="module">
  import { initCopy } from "./js/copy.js";
  import { highlightCode } from "./js/highlight.js";
  highlightCode(); // every <pre><code class="language-css">…
  initCopy();
</script>
```

In React, `CodeBlock` (`code`, `language`, `mark`, `caption`; or `samples` and `label` for several languages) and `Command`.

## Variants and sizes

- **One sample**, with a caption (the file's name, or what it is) or none.
- **Several languages**: the same code as tabs in the bar ("HTML", "React"), with a `role="tablist"` named for what they choose between, each sample in its own `tabpanel` ([tabs](nav.md)).
- **Marked lines**: a `<mark>` around each line the reader should look at, with an accent bar at its start and the accent wash behind it. Mark the two or three lines the text around it talks about.
- **Without a copy button**, for code that's only to read.
- **Syntax colour**: give the code its language (`class="language-tsx"`, or `language` in React) and each kind of word takes its colour: keywords, strings, numbers (and `true`, `false`, `null`), comments (italic too), functions, tags (HTML and JSX tags, types, components) and attributes (attribute, property and CSS property names). Punctuation and other names stay in the text colour. `js/highlight.js` reads JavaScript, TypeScript and JSX, HTML (with its scripts and styles), CSS, JSON and the shell; other languages stay plain.
- **Command**: one line, inline, with a `$` before it (`--prompt`) that's shown, never copied or read out. For the one thing to run: an install, a build.

## States

The copy button shows a tick and "Copied" for two seconds, and the status region says it too. If the browser refuses the clipboard, the code is selected instead, and the button says so, so it can be copied by hand. Tabs: selected (surface and border), hover, focus.

## Keyboard

Tab reaches the tabs (one stop: arrow keys move between them, Home and End jump), the copy button, then the code itself, which scrolls with the arrow keys when it's wider than its box.

## ARIA

The code box is focusable (`tabindex="0"`), so it can be scrolled without a mouse. Marked lines are `<mark>`, which screen readers can announce as highlighted. The copy button keeps its visible name; what happened is said in a `role="status"` region, which is announced without moving focus. Tabs follow the tabs pattern.

## Right to left

Code is always left to right (`dir="ltr"` on the `pre`, and on a command's `code`), in an Arabic page too; the bar and the box around it follow the page, so the copy button sits at the end, on the left. The marked line's bar is at the code's start, on the left.

## Do

- Put a copy button on anything people are meant to paste.
- Give every sample its language, so the same kind of word has the same colour on every page.
- Keep a sample short enough to read: the part that matters, with `…` for the rest.
- Use the language people will paste into as the first tab.

## Don't

- Translate code, or reverse it, in an Arabic page.
- Mark more than a few lines; then nothing stands out.
- Colour code with anything but the syntax roles: a colour in code means what kind of word it is, and nothing else.
- Put a screenshot of code where the code itself would do.

## Tokens

`--al-border-focus`, `--al-border-hairline`, `--al-color-accent`, `--al-color-accent-wash`, `--al-color-focus`, `--al-color-line`, `--al-color-line-strong`, `--al-color-success`, `--al-color-surface`, `--al-color-surface-sunk`, `--al-color-syntax-attribute`, `--al-color-syntax-comment`, `--al-color-syntax-function`, `--al-color-syntax-keyword`, `--al-color-syntax-number`, `--al-color-syntax-string`, `--al-color-syntax-tag`, `--al-color-text`, `--al-color-text-muted`, `--al-font-mono`, `--al-radius-sm`, `--al-size-control-md`, `--al-space-1`, `--al-space-2`, `--al-space-3`, `--al-space-4`, `--al-text-sm`, `--al-text-xs`
