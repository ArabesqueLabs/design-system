# مربع الاختيار وزر الاختيار ومفتاح التبديل

> ترجمة لـ[المواصفات بالإنجليزية](../choice.md). إن اختلفت الترجمة عن الأصل، فالإنجليزية هي المرجع.

مربعات اختيار وأزرار اختيار أصلية بلون التمييز، ومفتاح تبديل للإعدادات التي تسري فورًا.

**CSS:** [`css/components/choice.css`](../../../css/components/choice.css). **الأصناف:** `.al-choice`، `.al-choice__hint`، `.al-choice__text`، `.al-choices`، `.al-choices--inline`، `.al-switch`.

## البنية

```html
<fieldset class="al-fieldset">
  <legend>Student loans</legend>
  <div class="al-choices">
    <label class="al-choice"><input type="checkbox" checked> <span class="al-choice__text">Plan 2</span></label>
    <label class="al-choice"><input type="checkbox">
      <span class="al-choice__text">Postgraduate loan <span class="al-choice__hint">6% of income over £21,000</span></span></label>
  </div>
</fieldset>
<label class="al-choice"><input type="checkbox" role="switch" class="al-switch" checked> <span class="al-choice__text">Show grants</span></label>
```

## الأنواع والأحجام

| النوع | الاستخدام |
|---|---|
| مربع الاختيار | خيارات نعم/لا مستقلة، في نموذج يُحفظ |
| زر الاختيار | واحد من عدة خيارات، دائمًا داخل `fieldset` مع `legend`؛ ويُختار أحدها افتراضيًا حيث يوجد خيار معقول |
| مفتاح التبديل | إعداد يسري لحظة قلبه (دون زر حفظ) |

`.al-choices` يرصّها فوق بعضها؛ و`.al-choices--inline` يضع القصيرة منها في صف.

## الحالات

التمرير يتبع العنصر الأصلي. التركيز: إطار التركيز في النظام. المحدد: تعبئة بلون التمييز (مفتاح التبديل: مسار بلون التمييز، والمقبض إلى النهاية). المعطّل: `disabled`، باهت، والسبب قريب منه. غير الصالح: تحصل المجموعة على `.al-error` تحت عنوانها.

## لوحة المفاتيح

مفتاح المسافة يقلب مربع الاختيار أو مفتاح التبديل؛ ومفاتيح الأسهم تنتقل بين أزرار الاختيار في المجموعة (سلوك أصلي).

## ARIA

العنصر `<label>` يلفّ حقل الإدخال، فيكون الصف كله هدف النقر (24px على الأقل). ومفتاح التبديل هو `<input type="checkbox" role="switch">`. والتلميحات داخل التسمية، فتُقرأ معها.

## من اليمين إلى اليسار

يقع عنصر التحكم في البداية (اليمين في العربية)؛ ويتحرك مقبض مفتاح التبديل نحو النهاية (اليسار في العربية)، باستخدام الإزاحات المنطقية.

## افعل

- لا تستخدم مفتاح التبديل إلا حين يسري التغيير فورًا، وأظهر «تم الحفظ» بجانبه.
- اكتب التسميات بصيغة عبارات («إظهار المنح»)، لا أسئلة.

## لا تفعل

- استخدام مفتاح تبديل في نموذج يحتاج زر حفظ.
- استخدام مربع اختيار واحد للاختيار بين خيارين مسمَّيين؛ بل استخدم أزرار الاختيار.

## الرموز

`--al-border-hairline`، `--al-color-accent`، `--al-color-control`، `--al-color-on-accent`، `--al-color-surface-sunk`، `--al-color-text-muted`، `--al-duration-fast`، `--al-ease-standard`، `--al-radius-full`، `--al-size-target-min`، `--al-space-0-5`، `--al-space-1`، `--al-space-2`، `--al-space-5`، `--al-text-base`، `--al-text-sm`
