# الدرجات اللونية: التمييز والوسم والصورة الرمزية

> ترجمة لـ[المواصفات بالإنجليزية](../tint.md). إن اختلفت الترجمة عن الأصل، فالإنجليزية هي المرجع.

ألوان خفيفة للإبراز والهوية: عبارة مميّزة، ولون وسم، وخلفية صورة رمزية. الدرجات اللونية تزيّن؛ ولا تحمل معنى وحدها أبدًا.

**CSS:** [`css/components/tint.css`](../../../css/components/tint.css). **الأصناف:** `.al-highlight`، `.al-tag`، `.al-avatar`، `.al-avatar--lg`، `.al-badge`؛ واللون يُحدَّد بالخاصية `data-tint`.

## البنية

```html
<mark class="al-highlight" data-tint="teal">accessible</mark>
<span class="al-avatar" data-tint="yellow" aria-hidden="true">MI</span>
```

## الأنواع والأحجام

واحد لكل قيمة من قيم `data-tint` المعروضة في قسم الدرجات اللونية في صفحة العرض. والصور الرمزية بحجمين: الافتراضي و`--lg`.

## الحالات

ثابتة.

## لوحة المفاتيح

لا تستقبل التركيز.

## ARIA

`<mark>` للتمييز. والصورة الرمزية بجانب اسم ظاهر تكون `aria-hidden`؛ وإن كانت وحدها، فأعطها اسم الشخص.

## من اليمين إلى اليسار

تتبع اتجاه القراءة.

## افعل

- اقرن كل درجة لونية بالكلمات.
- أبقِ النص على الدرجة اللونية بالتباين المقيس في `docs/contrast.md`.

## لا تفعل

- استخدام درجة لونية بوصفها حالة؛ بل استخدم كلمة الشارة.
- تمييز أكثر من بضع عبارات في الصفحة.

## الرموز

`--al-color-surface-sunk`، `--al-color-text`، `--al-color-tint-blue-bg`، `--al-color-tint-blue-ink`، `--al-color-tint-cyan-bg`، `--al-color-tint-cyan-ink`، `--al-color-tint-green-bg`، `--al-color-tint-green-ink`، `--al-color-tint-orange-bg`، `--al-color-tint-orange-ink`، `--al-color-tint-pink-bg`، `--al-color-tint-pink-ink`، `--al-color-tint-purple-bg`، `--al-color-tint-purple-ink`، `--al-color-tint-teal-bg`، `--al-color-tint-teal-ink`، `--al-color-tint-yellow-bg`، `--al-color-tint-yellow-ink`، `--al-radius-full`، `--al-radius-sm`، `--al-text-lg`، `--al-text-sm`، `--al-weight-semibold`. (وفي الداخل، يضبط `[data-tint]` قيمتي `--_tint-bg` و`--_tint-ink`، الخاصتين بالمكوّن.)
