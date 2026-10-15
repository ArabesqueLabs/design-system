# شكل الإنشاء

> ترجمة لـ[المواصفات بالإنجليزية](../construction.md). إن اختلفت الترجمة عن الأصل، فالإنجليزية هي المرجع.

كيف يُصنع النمط، في ثلاث خطوات، تُقرأ كل منها بلغة البرمجيات: تبليط المستوى (الوحدات)، ورسم الخيوط بزاوية ثابتة (الواجهات)، وإزالة السقالة (النظام). كما في arabesquelabs.com. ومنزلق اختياري يعيد رسم الخطوتين 2 و3 بزاوية تلامس أخرى.

**CSS:** [`css/components/construction.css`](../../../css/components/construction.css). **الأصناف:** `.al-construction`، `.al-construction__steps`، `.al-construction__art`، `.al-construction__title`، `.al-construction__num`، `.al-construction__aside`، `.al-construction__control`.

## البنية

```html
<figure class="al-construction" data-construction>
  <ol class="al-construction__steps">
    <li>
      <div class="al-construction__art" data-construction-step="1" role="img" aria-label="مثمنات ومربعات تبلّط مربعًا."></div>
      <p class="al-construction__title"><span class="al-construction__num"><bdi>1</bdi></span> غطِّ المستوى بأشكال بسيطة.</p>
      <p class="al-construction__aside">في البرمجيات: الوحدات.</p>
    </li>
    …الخطوتان 2 و3…
  </ol>
</figure>
<script type="module">
  import { initConstruction } from "./js/pattern.js";
  initConstruction();
</script>
```

## الأنواع والأحجام

دون منزلق (كما في الموقع)، أو به: أضف `.al-construction__control` فيه حقل `<input type="range" min="45" max="78.75" step="0.5" value="67.5" data-construction-angle>` بتسمية، و`<output data-construction-value>`. كل لوح مربع مؤطّر على السطح، بعرض 16rem على الأكثر؛ وتصطف الخطوات جنبًا إلى جنب، وتلتف على الشاشات الضيقة.

## الحالات

**القواعد:**
- الخطوة 1: التبليط بلون `--al-color-pattern-scaffold`.
- الخطوة 2: التبليط، والخيوط بلون `--al-color-accent`.
- الخطوة 3: الخيوط وحدها، بلون `--al-color-text`.
- مع المنزلق، تتبع الخطوتان 2 و3 زاويته؛ والخطوة 1 لا تعتمد عليها. وتبقى العلامة والقسم الافتتاحي على 67.5°.
- الأرقام علامات تسلسل حقيقية، بلون التمييز وبأرقام جدولية.

## لوحة المفاتيح

المنزلق، إن وُجد، حقل نطاق أصلي: تحرّكه الأسهم 0.5°، وPage Up وPage Down أبعد، وHome وEnd إلى طرفيه.

## ARIA

كل لوح `role="img"` مع `aria-label` يصف ما يعرضه. وللمنزلق تسمية ظاهرة، وتُنطق قيمته بالدرجات (`aria-valuetext`).

## من اليمين إلى اليسار

تبدأ الخطوات من اليمين. ولا تنعكس الرسوم أبدًا.

## افعل

- استخدمه مرة واحدة، حيث تشرح الصفحة الاسم أو المنهج.
- اكتب الملاحظات بلغة الصفحة ("في البرمجيات: الوحدات.").

## لا تفعل

- ترقيم ما ليس خطوات به.

## الرموز

`--al-color-pattern-scaffold`، `--al-color-accent`، `--al-color-text`، `--al-color-text-muted`، `--al-color-line`، `--al-color-surface`، `--al-font-serif`، `--al-leading-prose`، `--al-border-hairline`، `--al-space-3`، `--al-space-4`، `--al-space-5`، `--al-space-6`، `--al-space-8`، `--al-size-target-min`
