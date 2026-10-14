# الحقل

> ترجمة لـ[المواصفات بالإنجليزية](../field.md). إن اختلفت الترجمة عن الأصل، فالإنجليزية هي المرجع.

عنصر إدخال في نموذج، مع تسميته وتلميحه وخطئه. يشمل النص، والأرقام والمبالغ (مع العملة)، وقائمة الاختيار، والحقل المركب (`datalist`)، والتاريخ، ومساحة النص، ومجموعة الحقول وعنوانها.

**CSS:** [`css/components/field.css`](../../../css/components/field.css). **الأصناف:** `.al-affix`، `.al-affix__text`، `.al-error`، `.al-field`، `.al-field__changed`، `.al-fieldset`، `.al-hint`، `.al-input`، `.al-input--number`، `.al-label`، `.al-label__optional`، `.al-select`، `.al-textarea`.

## البنية

```html
<div class="al-field">
  <label class="al-label" for="salary">Gross salary <span class="al-label__optional">(before tax)</span></label>
  <div class="al-affix">
    <select class="al-select" aria-label="Currency"><option>GBP</option></select>
    <input class="al-input al-input--number" id="salary" inputmode="decimal" aria-describedby="salary-hint" value="108,000">
    <span class="al-affix__text">a year</span>
  </div>
  <p class="al-hint" id="salary-hint">Type 108000, 108k or ١٠٨٬٠٠٠.</p>
</div>
```
التسمية ← عنصر الإدخال ← التلميح ← الخطأ، بهذا الترتيب. ويأتي الخطأ تحت عنصر الإدخال:
```html
<input class="al-input" id="code" aria-invalid="true" aria-describedby="code-error">
<p class="al-error" id="code-error"><svg class="al-icon al-icon--sm" aria-hidden="true">…danger…</svg>A tax code is like 1257L, K475 or BR. Check your payslip.</p>
```

## الأنواع والأحجام

| العنصر | الترميز |
|---|---|
| النص | `<input class="al-input">` |
| الأرقام والمبالغ | `.al-input--number` (أرقام متساوية العرض، من اليسار إلى اليمين)، و`inputmode="decimal"`، داخل `.al-affix` مع قائمة عملات أو رمز عملة وفترة زمنية |
| قائمة الاختيار | `<select class="al-select">` |
| الحقل المركب | `<input class="al-input" list="companies">` + `<datalist>`؛ ويقول التلميح ما يحدث لقيمة جديدة |
| التاريخ | [منتقي التاريخ](date-picker.md) لتاريخ قريب من اليوم؛ و[حقل التاريخ](date-input.md) لتاريخ يعرفه الناس. ولا يُستخدم `<input type="date">` إلا حيث لا تكون الصفحة بالعربية أبدًا: فتقويمه يتبع لغة المتصفح |
| مساحة النص | `<textarea class="al-textarea">`، يتغير حجمها عموديًا |
| مجموعة الحقول | `<fieldset class="al-fieldset"><legend>…` حول الحقول المترابطة وكل مجموعات أزرار الاختيار |
| الاختياري | `<span class="al-label__optional">(optional)</span>` داخل التسمية؛ ولا تُعلَّم الحقول المطلوبة |
| متغيّر، غير محفوظ | `data-changed` على `.al-field`، و`<p class="al-field__changed">Changed, not saved</p>` |

**الأحجام:** 40px، و44px مع مؤشرات اللمس.

## الحالات

| الحالة | الشكل |
|---|---|
| التمرير | الإطار بلون النص |
| التركيز | الإطار وإطار خارجي بعرض 2px بلون التركيز، مع أي تركيز (فالكتابة تُظهر دائمًا أين) |
| غير الصالح | `aria-invalid="true"`: إطار بلون الخطر، أسمك في جهة البداية، إضافة إلى نص الخطأ |
| المعطّل | `disabled`: باهت. وفضّل `readonly` (خلفية غائرة) للقيم التي ينبغي أن يراها الناس وينسخوها |
| المتغيّر | حافة بلون التحذير في جهة البداية و«تغيّر، ولم يُحفظ» |
| التحميل | ليس على الحقل: أظهره بجانب النموذج ([حالة الحفظ](save-state.md)) |

## لوحة المفاتيح

أصلي. ترتيب Tab يتبع الترتيب البصري؛ ويجري التحقق عند مغادرة الحقل أو عند الإرسال، ولا يجري أبدًا مع كل ضغطة مفتاح أثناء الكتابة أول مرة.

## ARIA

`<label for>` دائمًا. والخاصية `aria-describedby` تذكر معرّفي التلميح والخطأ. و`aria-invalid` فقط حين يوجد خطأ. وقائمة الاختيار داخل الإضافة تحتاج `aria-label` خاصًا بها. واستخدم قيم `autocomplete` (`email`، `given-name`) حيث تنطبق.

## من اليمين إلى اليسار

تبقى الأرقام والتواريخ من اليسار إلى اليمين داخل الحقل (`direction: ltr`)، محاذاةً إلى النهاية في العربية فتقع حيث تتوقعها العين. وتتبادل الإضافات جهتيها مع التخطيط. واقبل الأرقام الهندية العربية وفواصلها (`parseNumber` في `js/format.js`).

## افعل

- أبقِ التسمية ظاهرة؛ ولا تستخدم النص البديل إلا مثالًا.
- قل كيف يُصلح الخطأ، بلغة الشخص.
- اجمع المبلغ مع عملته وفترته، فلا يكون «108,000» ملتبسًا أبدًا.

## لا تفعل

- تعليم الحقول المطلوبة بنجمة؛ بل علّم الاختيارية.
- مسح ما كُتب عند إظهار خطأ.
- استخدام قائمة اختيار لأقل من أربعة خيارات؛ بل استخدم أزرار الاختيار أو عنصر التحكم المقسم.

## الرموز

`--al-border-focus`، `--al-border-hairline`، `--al-color-control`، `--al-color-danger`، `--al-color-focus`، `--al-color-surface`، `--al-color-surface-sunk`، `--al-color-text`، `--al-color-text-muted`، `--al-color-warning`، `--al-duration-fast`، `--al-ease-standard`، `--al-field-height`، `--al-field-padding-inline`، `--al-field-radius`، `--al-leading-ui`، `--al-size-target-touch`، `--al-space-1`، `--al-space-1-5`، `--al-space-2`، `--al-space-3`، `--al-text-base`، `--al-text-sm`، `--al-text-xs`، `--al-weight-medium`، `--al-weight-regular`
