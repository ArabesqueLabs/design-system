# البطاقة واللوح والإحصائية

> ترجمة لـ[المواصفات بالإنجليزية](../card.md). إن اختلفت الترجمة عن الأصل، فالإنجليزية هي المرجع.

حاويات. البطاقة سطح بإطار لشيء واحد؛ واللوح قسم من الصفحة يعلوه خط فاصل، وهو كل ما تحتاجه معظم المجموعات؛ والإحصائية رقم مع تسميته.

**CSS:** [`css/components/card.css`](../../../css/components/card.css). **الأصناف:** `.al-card`، `.al-card--interactive`، `.al-card--selected`، `.al-card__description`، `.al-card__header`، `.al-panel`، `.al-stat`، `.al-stat__label`، `.al-stat__note`، `.al-stat__value`.

## البنية

```html
<article class="al-card">
  <header class="al-card__header"><h3>Production Engineer</h3><p class="al-card__description">Meta · saved today</p></header>
  <p>…</p>
  <div class="al-cluster"><a class="al-button al-button--sm" href="…">Open</a></div>
</article>

<section class="al-panel"><h2>About you</h2>…</section>

<div class="al-stat"><span class="al-stat__label">Take-home, a month</span>
  <span class="al-stat__value"><bdi>£10,075</bdi></span><span class="al-stat__note">a year: <bdi>£120,896</bdi></span></div>
```

## الأنواع والأحجام

`--interactive` (يقوى الإطار عند التمرير؛ ورابط واحد بداخلها يغطي البطاقة)، و`--selected` (إطار ولون خفيف بلون التمييز).

## الحالات

التمرير (التفاعلية): الإطار بلون عناصر التحكم. التركيز: على رابط البطاقة. المحددة: لون التمييز. التحميل: هياكل مبدئية بداخلها ([التقدم](progress.md)).

## لوحة المفاتيح

البطاقة نفسها لا تستقبل التركيز؛ بل رابطها أو زرها.

## ARIA

استخدم `article` لعنصر قائم بذاته، و`section` مع عنوان للوح. ولا تلفّ بطاقة فيها أزرار داخل رابط.

## من اليمين إلى اليسار

يتبع المحتوى اتجاه القراءة؛ ولا شيء ينعكس.

## افعل

- فضّل اللوح؛ ولا تلجأ إلى البطاقة إلا حين يكون الشيء وحدة واحدة يتفاعل معها الناس.
- ضع الأرقام في `<bdi>` بأرقام متساوية العرض.

## لا تفعل

- تداخل البطاقات.
- إضافة ظلال.

## الرموز

`--al-border-hairline`، `--al-color-accent`، `--al-color-accent-wash`، `--al-color-control`، `--al-color-line`، `--al-color-line-strong`، `--al-color-surface`، `--al-color-text-muted`، `--al-duration-fast`، `--al-ease-standard`، `--al-font-display`، `--al-leading-tight`، `--al-radius-sm`، `--al-space-1`، `--al-space-3`، `--al-space-4`، `--al-space-5`، `--al-text-2xl`، `--al-text-lg`، `--al-text-sm`، `--al-tracking-none`، `--al-weight-medium`
