# الهوية: العلامة، والشعار النصي، والتركيبة

> ترجمة لـ[المواصفات بالإنجليزية](../brand.md). إن اختلفت الترجمة عن الأصل، فالإنجليزية هي المرجع.

العلامة (بلاطة واحدة من النمط، في إطار مربع) بجانب الشعار النصي. مبنية من ملفات SVG في حزمة الشعار (`assets/brand/`)، ولا يُعاد رسمها أبدًا.

**CSS:** [`css/components/brand.css`](../../../css/components/brand.css). **الأصناف:** `.al-lockup`، `.al-lockup__product`، `.al-mark`، `.al-wordmark`.

## البنية

```html
<a class="al-lockup" href="/" aria-label="Arabesque Labs">
  <svg class="al-mark" aria-hidden="true">…assets/brand/mark.svg…</svg>
  <span class="al-wordmark" lang="en">Arabesque Labs</span>
</a>
<!-- with a product -->
<span class="al-lockup"><svg class="al-mark" aria-hidden="true">…</svg><span class="al-wordmark" lang="en">Arabesque Labs</span><span class="al-lockup__product">hunt</span></span>
```
ضمّن `mark.svg` داخل الصفحة مباشرة كي يأخذ `currentColor`؛ وفي `assets/brand/` أيضًا `star.svg` و`wordmark.svg`.

## الأنواع والأحجام

التركيبة (العلامة + الشعار النصي)، والتركيبة مع منتج (· hunt)، والعلامة وحدها (أيقونات المواقع، الصور الرمزية). حدّد الحجم بخاصية `font-size` على التركيبة؛ والعلامة بحجم 1.5em.

## الحالات

لون واحد: لون النص (الحبر على الفاتح، والشاحب على الداكن)؛ ولا يكون لون التمييز أبدًا، ولا تدرّجًا لونيًا أبدًا.

## لوحة المفاتيح

إن كانت رابطًا، فهي تستقبل التركيز.

## ARIA

اسم واحد يُقرأ: «Arabesque Labs»؛ والعلامة `aria-hidden`.

## من اليمين إلى اليسار

لا تنعكس أبدًا. في الصفحات العربية يُكتب الشعار النصي بالعربية، «معامل آرابيسك»، مع `lang="ar"` ودون تباعد بين الحروف (قيمة `--al-tracking-wide` صفر في العربية)؛ وتبقى العلامة كما هي، وتأتي التركيبة في البداية (اليمين). وفي الإنجليزية يُكتب «Arabesque Labs» بتباعد بين الحروف.

## افعل

- اترك حولها مساحة فارغة قدرها ربع حجم العلامة.
- استخدم ملفات SVG كما هي.

## لا تفعل

- إعادة رسم العلامة، أو تدويرها، أو تغيير لونها في كل قسم، أو رسمها بخط محيطي، أو وضعها على خلفية مزدحمة (بما في ذلك النمط بكامل قوته).

## الرموز

`--al-color-text`، `--al-color-text-muted`، `--al-font-display`، `--al-text-lg`، `--al-weight-medium`، `--al-weight-regular`
