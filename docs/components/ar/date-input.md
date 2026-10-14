# حقل التاريخ

> ترجمة لـ[المواصفات بالإنجليزية](../date-input.md). إن اختلفت الترجمة عن الأصل، فالإنجليزية هي المرجع.

ثلاثة حقول لتاريخ يعرفه الناس مسبقًا (تاريخ ميلاد، تاريخ إصدار). أما التاريخ القريب من اليوم الذي يختاره الناس، فاستخدم له [منتقي التاريخ](date-picker.md).

**CSS:** [`css/components/date-input.css`](../../../css/components/date-input.css). **الأصناف:** `.al-date-input`، `.al-date-input__year`، `.al-field`، `.al-input`.

## البنية

```html
<fieldset class="al-fieldset" role="group" aria-describedby="dob-hint">
  <legend>Date of birth</legend>
  <span class="al-hint" id="dob-hint">For example, 27 3 1990</span>
  <div class="al-date-input">
    <div class="al-field"><label class="al-label" for="dob-day">Day</label>
      <input class="al-input" id="dob-day" inputmode="numeric" autocomplete="bday-day"></div>
    <div class="al-field"><label class="al-label" for="dob-month">Month</label>
      <input class="al-input" id="dob-month" inputmode="numeric" autocomplete="bday-month"></div>
    <div class="al-field al-date-input__year"><label class="al-label" for="dob-year">Year</label>
      <input class="al-input" id="dob-year" inputmode="numeric" autocomplete="bday-year"></div>
  </div>
</fieldset>
```

## الأنواع والأحجام

نوع واحد. حقل السنة أعرض (`.al-date-input__year`).

## الحالات

غير الصالح: خطأ واحد للمجموعة، فوق الحقول، و`aria-invalid` على الحقول الخاطئة وحدها.

## لوحة المفاتيح

ثلاث محطات Tab، بترتيب القراءة. لا تنقل التركيز تلقائيًا بين الحقول.

## ARIA

مجموعة حقول بعنوان؛ ولكل حقل تسميته الظاهرة. والتلميح على المجموعة.

## من اليمين إلى اليسار

يتبع الترتيب اللغة لا الاتجاه: اليوم، فالشهر، فالسنة في الإنجليزية (البريطانية) والعربية كلتيهما. وينعكس الترتيب البصري للصف.

## افعل

- تحقّق من أن التاريخ موجود (لا 31 أبريل) وقل أي جزء خاطئ.
- خزّن قيم التاريخ وحده تواريخَ، لا منتصف ليل في منطقة زمنية.

## لا تفعل

- استخدامه للتواريخ القريبة من اليوم، حيث يفيد التقويم: فذلك [منتقي التاريخ](date-picker.md).
- استخدام `type="number"`: فهو يضيف أزرار زيادة ونقصان ويحذف الأصفار البادئة.

## الرموز

`--al-space-3`
