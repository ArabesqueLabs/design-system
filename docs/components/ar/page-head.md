# رأس الصفحة

> ترجمة لـ[المواصفات بالإنجليزية](../page-head.md). إن اختلفت الترجمة عن الأصل، فالإنجليزية هي المرجع.

عنوان الصفحة، وفي الجهة الختامية ما ينطبق على الصفحة كلها: إعداداتها وطرق عرضها وإجراؤها الرئيسي.

**CSS:** [`css/components/page-head.css`](../../../css/components/page-head.css). **الأصناف:** `.al-page-head`، `.al-page-head__end`، `.al-page-head__lede`.

## البنية

```html
<div class="al-page-head">
  <h1>Take-home pay</h1> <span class="al-badge al-badge--warning">Experimental</span>
  <div class="al-page-head__end">
    <label class="al-label" for="year">Tax year</label> <select class="al-select" id="year">…</select>
  </div>
  <p class="al-page-head__lede">The calculator works out what you'd keep as you type.</p>
</div>
```

## الأنواع والأحجام

مع مقدمة ومجموعة ختامية أو دونهما. وتتبعه علامات التبويب عادةً ([التنقل](nav.md)).

## الحالات

لا شيء خاص به.

## لوحة المفاتيح

الترتيب الطبيعي: العنوان، فالشارة، فعناصر التحكم الختامية.

## ARIA

العنوان هو `h1` الصفحة.

## من اليمين إلى اليسار

تنتقل المجموعة الختامية إلى اليسار في العربية. وتحت `md` تنزل تحت العنوان.

## افعل

- أبقِ الإجراء الرئيسي للصفحة هنا، ولا تطوِه أبدًا.

## لا تفعل

- وضع أكثر من ثلاثة عناصر تحكم في المجموعة الختامية؛ بل انقل الباقي إلى الصفحة.

## الرموز

`--al-border-hairline`، `--al-color-line`، `--al-color-text-muted`، `--al-size-measure`، `--al-space-3`، `--al-space-4`، `--al-space-6`، `--al-text-3xl`
