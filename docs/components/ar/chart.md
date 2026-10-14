# الرسوم البيانية

> ترجمة لـ[المواصفات بالإنجليزية](../chart.md). إن اختلفت الترجمة عن الأصل، فالإنجليزية هي المرجع.

أعمدة، وشريط منقسم، ومخطط نقطي موجّه، بلغة HTML وCSS فقط. علامات رفيعة بألوان الرسوم البيانية، ومحور قيم واحد، ومفتاح، وتلميح أدوات على كل علامة، والأرقام متاحة نصًا أيضًا.

**CSS:** [`css/components/chart.css`](../../../css/components/chart.css). **JS:** [`js/chart.js`](../../../js/chart.js) (`initChartKeys`)، مع [`js/tooltip.js`](../../../js/tooltip.js). **الأصناف:** `.al-bullet`، `.al-bullet__bar`، `.al-bullet__diff--less`، `.al-bullet__diff--more`، `.al-bullet__label`، `.al-bullet__row`، `.al-bullet__target`، `.al-bullet__track`، `.al-bullet__value`، `.al-chart`، `.al-chart__axis`، `.al-chart__bar`، `.al-chart__grid`، `.al-chart__marker`، `.al-chart__plot`، `.al-chart__seg`، `.al-chart__slot`، `.al-chart__slots`، `.al-chart__stack`، `.al-chart__target`، `.al-key`، `.al-key__item`، `.al-split-bar`، `.al-split-bar__part`، `.al-split-bar__track`، `.al-swatch`، `.al-swatch--line`، `.al-swatch--target`؛ واللون بالخاصية `data-series`.

## البنية

كل علامة `role="img"`، يُسمّيها قيمتها وما هي، بالكلمات نفسها التي في تلميحها. والدالة `initChartKeys` تجعل الرسم البياني محطة Tab واحدة.

الأعمدة (مجمّعة؛ و`.al-chart__stack`/`__seg` للمكدّسة):
```html
<div class="al-chart">
  <div class="al-chart__plot">
    <span class="al-chart__grid" style="inset-block-end: 66.7%" aria-hidden="true"><span>£100k</span></span>
    <div class="al-chart__slots"><div class="al-chart__slot">
      <span class="al-chart__bar" data-series="1" style="block-size: 80.6%" role="img"
            aria-label="£120,900 Offer A, Year 1" data-al-tip="£120,900|Offer A, Year 1"></span>
    </div></div>
    <span class="al-chart__target" style="inset-block-end: 56%" role="img"
          aria-label="£84,000 What you want" data-al-tip="£84,000|What you want"></span>
  </div>
  <div class="al-chart__axis" aria-hidden="true"><span>Year 1</span></div>
  <div class="al-key"><span class="al-key__item"><span class="al-swatch" data-series="1"></span>Offer A</span></div>
</div>
<script type="module">
  import { initChartKeys } from "./js/chart.js";
  initChartKeys(document.querySelector(".al-chart__plot"));
</script>
```
الشريط المنقسم (أجزاء من كل):
```html
<div class="al-split-bar">
  <div class="al-split-bar__track" role="group" aria-label="Where a year's pay goes">
    <span class="al-split-bar__part" data-series="1" style="inline-size: 62%" role="img"
          aria-label="£71,597 · 62% Take-home pay" data-al-tip="£71,597 · 62%|Take-home pay"></span>
  </div>
  <div class="al-key">…</div>
</div>
```
المخطط النقطي الموجّه (كلٌّ مقابل هدف):
```html
<div class="al-bullet"><div class="al-bullet__row">
  <span class="al-bullet__label">Offer A</span>
  <span class="al-bullet__track"><span class="al-bullet__bar" data-series="1" style="inline-size: 84%" role="img"
        aria-label="£10,075 Offer A" data-al-tip="£10,075|Offer A"></span>
    <span class="al-bullet__target" style="inset-inline-start: 58%"></span></span>
  <span class="al-bullet__value"><b>£10,075</b> <span class="al-bullet__diff--more">+£3,075 more</span></span>
</div></div>
```

## الأنواع والأحجام

السلاسل `data-series="1"` إلى `"4"`، بالترتيب. و`data-series="0"` هو المحايد، للمسارات والخلفيات فقط: فهو أفتح من أن يُقرأ بيانات، لذا تأخذ «أخرى» لون السلسلة التالية. والمؤشر (`__marker`) وخط الهدف (`__target`). وعيّنات اللون للخطوط (`--line`) وللأهداف (`--target`). و`.al-bullet__diff--more` و`--less` للفروق (مع إشارة وكلمة).

## الحالات

تُظهر العلامات تلميحها عند التمرير وعند التركيز؛ ويبقى ما دام المؤشر فوقه.

## لوحة المفاتيح

محطة Tab واحدة لكل رسم بياني (`initChartKeys`)؛ ومفاتيح الأسهم تنتقل من علامة إلى علامة، باتجاه القراءة، وHome وEnd إلى الطرفين. وكل علامة تقول قيمتها حين يُوصل إليها.

## ARIA

عنوان في الأعلى، وجملة ملخِّصة مستخلصة من البيانات. وكل علامة `role="img"` اسمها قيمتها وما هي؛ ولا يكرر التلميح ذلك وصفًا. وتسميات الشبكة والمحور `aria-hidden`. ومسار الشريط المنقسم `role="group"` يُسمّيه عنوان الرسم البياني. وما يقارنه الناس عن كثب، أعطِ أرقامه في جدول أيضًا.

## من اليمين إلى اليسار

الفئات والزمن تجري باتجاه القراءة؛ والشريط المنقسم وأشرطة المخطط النقطي تنمو من البداية؛ ويبقى محور القيم عموديًا وتحتفظ الأرقام بترتيبها.

## افعل

- عيّن الألوان بالترتيب الثابت، واحتفظ بها حين تُصفّى السلاسل.
- سمِّ الفروق بالكلمات («أكثر»، «أقل»)، لا باللون وحده.
- اجعل النص بألوان النص، لا بلون السلسلة أبدًا.

## لا تفعل

- محوران للقيم.
- أكثر من أربع سلاسل؛ ضمّ الباقي في «أخرى».
- ألوان الحالات بوصفها سلاسل.
- `data-series="0"` (المحايد) للبيانات.

## الرموز

`--al-border-hairline`، `--al-color-chart-0`، `--al-color-chart-1`، `--al-color-chart-2`، `--al-color-chart-3`، `--al-color-chart-4`، `--al-color-danger`، `--al-color-line`، `--al-color-success`، `--al-color-surface`، `--al-color-text`، `--al-color-text-muted`، `--al-radius-md`، `--al-space-1`، `--al-space-1-5`، `--al-space-2`، `--al-space-3`، `--al-space-4`، `--al-text-sm`، `--al-text-xs`
