# الدرجات اللونية: التمييز والوسم والصورة الرمزية

> ترجمة لـ[المواصفات بالإنجليزية](../tint.md). إن اختلفت الترجمة عن الأصل، فالإنجليزية هي المرجع.

ألوان خفيفة للإبراز والهوية: عبارة مميّزة، ولون وسم، وخلفية صورة رمزية. الدرجات اللونية تزيّن؛ ولا تحمل معنى وحدها أبدًا.

**CSS:** [`css/components/tint.css`](../../../css/components/tint.css). **الأصناف:** `.al-highlight`، `.al-tag`، `.al-avatar`، `.al-avatar--lg`، `.al-avatar--sm`، `.al-avatar--xl`، `.al-avatar--square`، `.al-avatars`، `.al-badge`؛ واللون يُحدَّد بالخاصية `data-tint`.

## البنية

```html
<mark class="al-highlight" data-tint="teal">accessible</mark>
<span class="al-avatar" data-tint="yellow" aria-hidden="true">MI</span>
```

## الأنواع والأحجام

واحد لكل قيمة من قيم `data-tint` المعروضة في قسم الدرجات اللونية في صفحة العناصر.

والصور الرمزية بأربعة أحجام: `--sm` ‏(24px)، والافتراضي (32px)، و`--lg` ‏(48px)، و`--xl` ‏(64px)؛ وفي React ‏`size`. و`--square` لمؤسسة أو مساحة عمل، لا لشخص. و`<img class="al-avatar" alt="">` صورة، تُقصّ لتملأ. ومكدّسةً، في `.al-avatars` (وفي React ‏`AvatarStack`)، تتداخل، ولكل منها حلقة بلون الأرضية التي هي عليها (`--al-avatars-ring`، والسطح افتراضيًا)، ثم عدد البقية («+3»)؛ وتقول المجموعة مَن هم بنص مخفي بصريًا («مشارَك مع لينا وسام ويوسف و3 آخرين»).

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

`--al-avatars-ring`، `--al-color-surface`، `--al-color-surface-sunk`، `--al-color-text`، `--al-color-tint-blue-bg`، `--al-color-tint-blue-ink`، `--al-color-tint-cyan-bg`، `--al-color-tint-cyan-ink`، `--al-color-tint-green-bg`، `--al-color-tint-green-ink`، `--al-color-tint-orange-bg`، `--al-color-tint-orange-ink`، `--al-color-tint-pink-bg`، `--al-color-tint-pink-ink`، `--al-color-tint-purple-bg`، `--al-color-tint-purple-ink`، `--al-color-tint-teal-bg`، `--al-color-tint-teal-ink`، `--al-color-tint-yellow-bg`، `--al-color-tint-yellow-ink`، `--al-radius-full`، `--al-radius-sm`، `--al-text-lg`، `--al-text-sm`، `--al-text-xl`، `--al-text-xs`، `--al-weight-semibold`
