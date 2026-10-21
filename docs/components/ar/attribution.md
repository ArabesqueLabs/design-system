# الإسناد

> ترجمة لـ[المواصفات بالإنجليزية](../attribution.md). إن اختلفت الترجمة عن الأصل، فالإنجليزية هي المرجع.

السطر الذي يحمله كل منتج من منتجات الشركة: «من منتجات معامل آرابيسك»، أو «من معامل آرابيسك»، بعد العلامة. في تذييل المنتج، وصفحة «عنّا»، وملف README الخاص به.

**CSS:** [`css/components/attribution.css`](../../../css/components/attribution.css). **الأصناف:** `.al-attribution`، `.al-attribution--plain`، `.al-attribution--lg`، `.al-attribution--star`، `.al-attribution__name`. **الصور:** `dist/brand/badges/` (يصنعها `npm run badges`).

## البنية

```html
<a class="al-attribution" href="https://arabesquelabs.com/ar/">
  <svg class="al-mark" viewBox="0 0 64 64" aria-hidden="true">…assets/brand/mark.svg…</svg>
  <span>من منتجات <span class="al-attribution__name" lang="ar">معامل آرابيسك</span></span>
</a>
```

في React: ‏`<Attribution />`: ‏`wording="product"` (الافتراضي) أو `"by"`، و`plain`، و`large`، و`star`، و`href` (موقع الشركة ما لم يُذكر غيره: موقعها العربي، بالعربية).

العلامة هي علامة الشركة بإطارها، بحجم ‎2em: ‏26px في الحجم الافتراضي، ولا تصغر أبدًا عن 24px التي تشترطها صفحة [الهوية](brand.md). وحيث يلزم أن يكون السطر أصغر من ذلك، يضع شكل النجمة (`.al-attribution--star`، وفي React ‏`star`) النجمة وحدها، مصمتة، مكانها، بحجم ‎1.25em، كما تفعل أيقونة الموقع.

## الأشكال والأحجام

| الشكل | الاستخدام |
|---|---|
| «من منتجات معامل آرابيسك» (`wording="product"`) | منتج له اسمه الخاص: hunt، في تذييله أو صفحة «عنّا» |
| «من معامل آرابيسك» (`wording="by"`) | حيث يضيق المكان، أو حين يكون الشيء أصغر من منتج: أداة، أو قالب، أو محاضرة |
| الكبسولة (الافتراضي) | وحدها: في زاوية التذييل، أو صفحة «عنّا»، أو تحت عنوان ملف README |
| بلا إطار (`.al-attribution--plain`) | داخل سطر من النص، أو تذييل له أسطره الخاصة |
| كبيرة (`.al-attribution--lg`) | صفحة «عنّا»، أو شاشة افتتاحية |
| النجمة (`.al-attribution--star`) | حيث يصغر السطر: تذييل مزدحم، أو شريط حالة، أو حجم أصغر من `--al-text-xs` |

حجمها بحجم النص: `--al-text-xs`، أو `--al-text-sm` في الكبيرة؛ والعلامة ‎2em، والنجمة ‎1.25em.

### صورةً

لملف README، أو صفحة حزمة أو متجر، أو بريد، أو شريحة، حيث لا يصل المكوّن: ‏`dist/brand/badges/`، كل صيغة بالإنجليزية والعربية، للخلفيات الفاتحة والداكنة، بالعلامة أو بالنجمة، بدقة 1x و2x، على خلفية شفافة.

| الملف | |
|---|---|
| `product-of-en-light.png`، `…@2x.png` | «A product of Arabesque Labs»، لخلفية فاتحة |
| `product-of-en-dark.png`، `…@2x.png` | الشيء نفسه، لخلفية داكنة |
| `by-en-light.png`، `by-en-dark.png` (و`@2x`) | «By Arabesque Labs» |
| `product-of-ar-…`، `by-ar-…` | بالعربية: «من منتجات معامل آرابيسك»، «من معامل آرابيسك» |
| `…-star.png`، `…-star@2x.png` (`product-of-ar-light-star.png`، …) | كلٌّ منها بالنجمة مكان العلامة |

في GitHub، يعرض `<picture>` ما يناسب مظهر القارئ:

```html
<a href="https://arabesquelabs.com/ar/">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="dist/brand/badges/product-of-ar-dark@2x.png">
    <img src="dist/brand/badges/product-of-ar-light@2x.png" alt="من منتجات معامل آرابيسك" height="41">
  </picture>
</a>
```

يرسمها المكوّن نفسه، في Chrome بلا واجهة، بخطوط النظام: شغّل `npm run badges` بعد `npm run build` حين يتغيّر.

## الحالات

رابطًا: عند التمرير يغمق إطاره ويُسطّر الاسم؛ وللتركيز حلقة التركيز.

## لوحة المفاتيح

رابطًا، يمكن التركيز عليه.

## ARIA

نصه هو اسمه («من منتجات معامل آرابيسك»)؛ والعلامة `aria-hidden`. وصورةً، يقول `alt` الشيء نفسه.

## من اليمين إلى اليسار

بالعربية يُقرأ «من منتجات معامل آرابيسك» أو «من معامل آرابيسك»، والعلامة في البداية (يمينًا)، ويربط بموقع الشركة العربي. والعلامة نفسها لا تنعكس أبدًا.

## افعل

- ضعه مرة واحدة، حيث يبحث الناس عمّن صنع الشيء: التذييل، أو صفحة «عنّا».
- اربطه بموقع الشركة.

## لا تفعل

- لا تغيّر لونه، ولا تضعه على خلفية مزدحمة.
- لا تُصغّر العلامة عن 24px: هناك، استخدم النجمة.
- لا تضع الصيغتين في صفحة واحدة.

## الرموز

`--al-border-focus`، `--al-border-hairline`، `--al-color-focus`، `--al-color-line-strong`، `--al-color-surface`، `--al-color-text`، `--al-color-text-muted`، `--al-font-display`، `--al-font-sans`، `--al-radius-full`، `--al-text-sm`، `--al-text-xs`، `--al-tracking-wide`، `--al-weight-medium`
