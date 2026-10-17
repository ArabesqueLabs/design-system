# Phase banner

Tells people a service is new or experimental, and where to say what they think. An announcement, above everything, carries one line of news.

**CSS:** [`css/components/phase-banner.css`](../../css/components/phase-banner.css). **Classes:** `.al-phase-banner`, `.al-phase-banner__text`, `.al-announcement`, `.al-announcement__text`, `.al-announcement__dismiss`. **JS:** [`js/announcement.js`](../../js/announcement.js) (`initAnnouncements()`, `forgetDismissal()`).

## Anatomy

```html
<div class="al-phase-banner">
  <span class="al-badge al-badge--warning">Experimental</span>
  <p class="al-phase-banner__text">This is new. <a href="…">Tell us what you think</a>.</p>
</div>
```

## Variants and sizes

One: a badge and a sentence, under the header.

**Announcement** (React `Announcement`): above the header, one line of news with its link ("Code blocks now have syntax colour. See what's new"), centred on the inverse ground, with a dismiss button at the end. Dismissing it is remembered by its `data-announcement` id on every page; a new message needs a new id. Where storage isn't allowed, it's gone for that page only.

```html
<div class="al-announcement" data-announcement="syntax-colour" role="region" aria-label="Announcement">
  <p class="al-announcement__text">Code blocks now have syntax colour. <a href="…">See what's new</a></p>
  <button type="button" class="al-button al-button--icon al-button--quiet al-button--sm al-announcement__dismiss" data-dismiss aria-label="Dismiss">…close…</button>
</div>
```

## States

Static.

## Keyboard

Only the link is focusable. An announcement's dismiss button comes after its link; once it's dismissed, focus moves on to what came after it.

## ARIA

The badge's word carries the meaning, not its colour. An announcement is a region named "Announcement", so it can be found and skipped.

## Right to left

The badge sits at the start.

## Do

- Say what the phase means for people (it may change, data may be reset).
- Link to a real feedback destination, or leave the link out.

## Don't

- Keep it once the service is stable.
- Use it for marketing messages.
- Use an announcement for anything urgent, or show more than one; it can be dismissed and never seen again.

## Tokens

`--al-border-focus`, `--al-border-hairline`, `--al-color-focus-on-inverse`, `--al-color-inverse`, `--al-color-line`, `--al-color-on-inverse`, `--al-color-text-muted`, `--al-size-target-min`, `--al-space-1`, `--al-space-2`, `--al-space-3`, `--al-text-sm`
