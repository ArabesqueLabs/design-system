# النمط الزخرفي

> ترجمة لـ[المواصفات بالإنجليزية](../pattern.md). إن اختلفت الترجمة عن الأصل، فالإنجليزية هي المرجع.

تبليط بلاطة العلامة، مرسومًا بالقاعدة بصيغة SVG (`js/pattern.js`). وله صورتان: **النسيج**، خلف شريط؛ و**القسم الافتتاحي**، عبر أعلى الموقع مع بلاطة محورية واحدة بلون التمييز، كما في arabesquelabs.com.

**CSS:** [`css/components/pattern.css`](../../../css/components/pattern.css). **الأصناف:** `.al-pattern`، `.al-pattern--full`، `.al-pattern--hero`، `.al-pattern--quiet`، `.al-pattern__art`، `.al-pattern__caption`.

## البنية

النسيج:

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

القسم الافتتاحي:

```html
<section class="al-pattern al-pattern--hero">
  <div class="al-pattern__art" aria-hidden="true" data-pattern-hero></div>
  …الترويسة، والعنوان، والمقدمة، والإجراءات…
  <p class="al-pattern__caption" data-pattern-caption>هذه البلاطة هي علامتنا. كل ما حولها ينبع من القاعدة نفسها.</p>
</section>
<script type="module">
  import { drawHero } from "./js/pattern.js";
  for (const el of document.querySelectorAll("[data-pattern-hero]")) drawHero(el, { animate: true });
</script>
```

## الأنواع والأحجام

- **النسيج المقنّع** (الافتراضي): يتلاشى من الجهة الختامية نحو البداية، حيث يبدأ النص.
- **النسيج `--full`**: دون قناع، لشريط لا نص عليه.
- **الهادئ `--quiet`**: دون قناع وأخفت (`--al-color-pattern-quiet`، الحبر بنسبة 14%، والأبيض بنسبة 10% في الداكن)، لمساحة صغيرة لا شيء عليها: حالة فارغة، أو زاوية بطاقة.
- **ملفًّا**: حيث لا يمكن رسم النمط (البريد الإلكتروني، والعروض، والصفحات الثابتة)، يكتب البناء تكرارًا واحدًا متصلًا في `dist/patterns/`: `tile.svg` و`tile-dark.svg` (بلون النسيج، للخلفيات الفاتحة والداكنة)، و`tile-quiet.svg` و`tile-quiet-dark.svg`. استخدم أحدها `background-image`، خلف تلاشٍ حيث يقترب النص.
- **القسم الافتتاحي `--hero`**: للقسم الوحيد الذي يقدّم موقعًا. خط هادئ واحد عبر القسم كله، ومثمن واحد، البلاطة المحورية، على نحو ثلاثة أرباع العرض ومنتصف الارتفاع: نجمته مملوءة ومحددة بلون التمييز، ومثمنه محدد بشفافية أقل. ويقع التعليق تحت البلاطة المحورية، ويبدأ خطه من مركزها. وتحت نقطة التوقف md، حيث يأخذ النص العرض كله، لا بلاطة محورية ولا تعليق.

## الحالات

**القواعد:**
- الهندسة: التبليط 4.8.8 (مثمنات ومربعات)، والخيوط تخرج من منتصف كل ضلع بزاوية التلامس `--al-pattern-contact-angle` (67.5°)، وتلتقي على منصّف كل رأس؛ والتكرار الواحد طوله الضلع × (1+√2). وتقرأ الصورتان هندستهما من الرموز.
- النسيج: الضلع `--al-pattern-side` (32px؛ و`--al-pattern-side-narrow`، 22px، تحت md)، والخط `--al-pattern-stroke` (1.25px).
- القسم الافتتاحي: الضلع `--al-pattern-hero-side` (46px؛ و`--al-pattern-hero-side-narrow`، 30px، تحت md)، والخيوط `--al-pattern-hero-stroke` (1px)، والنجمة المحورية `--al-pattern-focal-stroke` (1.6px) بلون `--al-color-pattern-focal` فوق `--al-color-pattern-focal-fill`.
- ترسم الصورتان خيوطهما بلون `--al-color-pattern-line` (والنسيج الهادئ بلون `--al-color-pattern-quiet`): الحبر بنسبة 26% (والأبيض بنسبة 20% في الداكن)، خفيفًا بما يكفي ليقع عليه عنوان القسم الافتتاحي ومقدمته. وفي القسم الافتتاحي تنخفض إلى خُمس ذلك في جهة البداية، حيث العنوان والمقدمة، وتعود كاملة نحو البلاطة المحورية؛ وتحت md، حيث يأخذ النص العرض كله، تكون بالثلث في كل مكان. وأبقِ نص المتن خارجه.
- النسيج لا يتحرك أبدًا. أما القسم الافتتاحي فقد يرسم نفسه مرة واحدة عند تحميل الصفحة (`animate: true`)، كما يُنشأ: يظهر التبليط سقالةً (`--al-color-pattern-scaffold`)، وتُرسم الخيوط من البلاطة المحورية إلى الخارج خلال 1.8 ثانية، ثم تتلاشى السقالة وتظهر البلاطة المحورية وتعليقها. وهي الحركة الوحيدة التي تجري عند التحميل، ولا تجري أبدًا عند تقليل الحركة.
- تعيد `drawHero` الرسم حين يتغير عرض القسم؛ واستدعها مجددًا بعد تبديل `dir`.
- كلتاهما مخفية في وضع الألوان القسرية.

## لوحة المفاتيح

لا شيء.

## ARIA

الرسم `aria-hidden="true"`؛ فهو زخرفة. أما التعليق فنص عادي بلغة الصفحة.

## من اليمين إلى اليسار

لا تنعكس الهندسة أبدًا؛ أما التخطيط فينعكس. فقناع النسيج يتلاشى خلف جهة البداية في الاتجاهين، وتنتقل البلاطة المحورية في القسم الافتتاحي إلى ربع العرض، ويمتد خط تعليقها نحو الجهة الختامية.

## افعل

- استخدم النسيج في الأشرطة والمساحات الفارغة الكبيرة، متلاشيًا خلف النص.
- استخدم القسم الافتتاحي مرة واحدة، في القسم الذي يقدّم موقعًا أو منتجًا، والعنوان والمقدمة في جهة البداية، والتعليق يقول ما البلاطة الملوّنة.

## لا تفعل

- وضع نص المتن فوق أيٍّ منهما، أو رسمه يدويًا، أو استخدام صورة نقطية للنمط.
- استخدام القسم الافتتاحي أكثر من مرة في الصفحة، أو تحريك النسيج.

## الرموز

`--al-color-pattern-line`، `--al-color-pattern-quiet`، `--al-color-pattern-scaffold`، `--al-color-pattern-focal`، `--al-color-pattern-focal-fill`، `--al-color-accent`، `--al-color-text-muted`، `--al-pattern-side`، `--al-pattern-side-narrow`، `--al-pattern-stroke`، `--al-pattern-contact-angle`، `--al-pattern-hero-side`، `--al-pattern-hero-side-narrow`، `--al-pattern-hero-stroke`، `--al-pattern-focal-stroke`، `--al-space-3`، `--al-space-12`، `--al-text-sm`، `--al-leading-prose`، `--al-border-hairline`، `--al-ease-standard`
