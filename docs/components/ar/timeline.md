# الخط الزمني

> ترجمة لـ[المواصفات بالإنجليزية](../timeline.md). إن اختلفت الترجمة عن الأصل، فالإنجليزية هي المرجع.

ما جرى، كل حدث في وقته، على امتداد خط عند حافة البداية: تاريخ سجلّ أو موجز نشاط.

**CSS:** [`css/components/timeline.css`](../../../css/components/timeline.css). **الأصناف:** `.al-timeline`، `.al-timeline__body`، `.al-timeline__event`، `.al-timeline__marker`، `.al-timeline__time`، `.al-timeline__title`.

## البنية

```html
<ol class="al-timeline">
  <li>
    <span class="al-timeline__marker" data-tone="success" aria-hidden="true"><svg class="al-icon al-icon--sm">…</svg></span>
    <div class="al-timeline__event">
      <span class="al-timeline__time"><time datetime="2026-10-25T09:40">Today, 09:40</time></span>
      <p class="al-timeline__title">Request approved</p>
      <div class="al-timeline__body">By Lina Haddad. The team can start.</div>
    </div>
  </li>
  …
</ol>
```

وفي React: ‏`Timeline` (`events`: ‏`time`، `title`، `body`، `icon`، `tone`).

## الأنواع والأحجام

علامة بأيقونة، أو (فارغة) نقطة. ولونها: باهت افتراضيًا، أو `data-tone` بإحدى القيم `accent`، `success`، `warning`، `danger`، وهي تكرر ما يقوله العنوان.

## الحالات

ثابت.

## لوحة المفاتيح

لا يستقبل التركيز إلا ما داخل الحدث (رابط).

## ARIA

قائمة مرتّبة. والعلامة زخرفة، مخفية؛ والعنوان يقول ما جرى، فلا يكون اللون أبدًا العلامة الوحيدة عليه. وكل وقت عنصر `<time>` مع `datetime`.

## من اليمين إلى اليسار

الخط والعلامات في البداية، على اليمين.

## افعل

- الأحدث أولًا، ما لم يكن ترتيب الأحداث هو المقصود.
- الأوقات كما يقولها الناس («أمس، 16:05»)، والوقت الدقيق في `datetime`.

## لا تفعل

- استخدامه لخطوات لم تأتِ بعد: فذلك مؤشر الخطوات أو قائمة المهام.

## الرموز

`--al-border-hairline`، `--al-color-accent`، `--al-color-danger`، `--al-color-line-strong`، `--al-color-success`، `--al-color-surface`، `--al-color-text-muted`، `--al-color-warning`، `--al-radius-full`، `--al-space-1`، `--al-space-3`، `--al-space-6`، `--al-text-sm`، `--al-weight-medium`
