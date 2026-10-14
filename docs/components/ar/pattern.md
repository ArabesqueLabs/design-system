# النمط الزخرفي

> ترجمة لـ[المواصفات بالإنجليزية](../pattern.md). إن اختلفت الترجمة عن الأصل، فالإنجليزية هي المرجع.

تبليط بلاطة العلامة، نسيجًا للخلفية. والملف `js/pattern.js` يرسمه بالقاعدة بصيغة SVG.

**CSS:** [`css/components/pattern.css`](../../../css/components/pattern.css). **الأصناف:** `.al-pattern`، `.al-pattern--full`، `.al-pattern__art`.

## البنية

```html
<section class="al-pattern">
  <div class="al-pattern__art" aria-hidden="true" data-pattern></div>
  …content…
</section>
<script type="module">
  import { drawPattern } from "./js/pattern.js";
  for (const el of document.querySelectorAll("[data-pattern]")) drawPattern(el);
</script>
```

## الأنواع والأحجام

المقنّع (الافتراضي: يتلاشى من الجهة الختامية نحو البداية، حيث يبدأ النص) و`--full` (دون قناع: لشريط لا نص عليه).

## الحالات

**القواعد:**
- الهندسة: التبليط 4.8.8 (مثمنات ومربعات)، بطول ضلع `--al-pattern-side` (32px؛ و`--al-pattern-side-narrow`، 22px، تحت نقطة التوقف md)، والخيوط تخرج من منتصف كل ضلع بزاوية التلامس `--al-pattern-contact-angle` (67.5°)، وتلتقي على منصّف كل رأس؛ والتكرار الواحد طوله الضلع × (1+√2). والدالة `drawPattern` تقرأ هذه القيم من الرموز.
- الخط: `--al-pattern-stroke` (1.25px) بلون `--al-color-pattern-line` (أخضر مزرق بنسبة 24% في الفاتح، وأبيض بنسبة 16% في الداكن).
- لا يتحرك أبدًا؛ فهو ساكن بطبيعته عند تقليل الحركة.
- مخفي في وضع الألوان القسرية.

## لوحة المفاتيح

لا شيء.

## ARIA

`aria-hidden="true"`؛ فهو زخرفة.

## من اليمين إلى اليسار

لا تنعكس الهندسة أبدًا؛ أما القناع فينعكس، فيتلاشى النمط خلف جهة البداية في الاتجاهين.

## افعل

- استخدمه في الأقسام الافتتاحية والمساحات الفارغة الكبيرة، متلاشيًا خلف النص.

## لا تفعل

- وضعه خلف نص المتن بكامل قوته، أو تحريكه، أو رسمه يدويًا.

## الرموز

`--al-color-pattern-line`
