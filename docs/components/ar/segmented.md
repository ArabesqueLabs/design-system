# عنصر التحكم المقسم

> ترجمة لـ[المواصفات بالإنجليزية](../segmented.md). إن اختلفت الترجمة عن الأصل، فالإنجليزية هي المرجع.

خيار واحد من بين خيارين إلى خمسة خيارات قصيرة، ظاهرة كلها معًا.

**CSS:** [`css/components/segmented.css`](../../../css/components/segmented.css). **الأصناف:** `.al-segmented`، `.al-segmented--fill`.

## البنية

اختيارًا في نموذج (أزرار اختيار):
```html
<fieldset class="al-fieldset"><legend>Start from</legend>
  <div class="al-segmented">
    <label><input type="radio" name="from" checked> Gross pay offered</label>
    <label><input type="radio" name="from"> Desired take-home pay</label>
  </div>
</fieldset>
```
مبدّلًا لطريقة العرض (أزرار):
```html
<div class="al-segmented" role="group" aria-label="Language">
  <button type="button" aria-pressed="true">English</button>
  <button type="button" aria-pressed="false" lang="ar">العربية</button>
</div>
```

## الأنواع والأحجام

الافتراضي (بقدر محتواه) و`--fill` (يمتد، بأجزاء متساوية). حجم واحد (32px).

## الحالات

التمرير: خلفية غائرة. المختار: معبّأ بلون النص (لا بلون التمييز، كي لا ينافس الإجراء الرئيسي). التركيز: الإطار حول الجزء.

## لوحة المفاتيح

أزرار الاختيار: مفاتيح الأسهم تتنقل وتختار. الأزرار: Tab إلى كل منها، ثم المسافة أو Enter.

## ARIA

أزرار اختيار في مجموعة حقول بعنوان؛ أو أزرار مع `aria-pressed` داخل `role="group"` مع `aria-label`.

## من اليمين إلى اليسار

تتبع الأجزاء ترتيب القراءة.

## افعل

- استخدمه لطرق العرض وللخيارات القصيرة التي ينفي بعضها بعضًا.

## لا تفعل

- استخدامه لأكثر من خمسة خيارات أو لتسميات طويلة؛ بل استخدم قائمة اختيار.
- استخدامه للإجراءات؛ فالأجزاء تختار، ولا تنفّذ.

## الرموز

`--al-border-focus`، `--al-border-hairline`، `--al-color-bg`، `--al-color-control`، `--al-color-focus`، `--al-color-surface`، `--al-color-surface-sunk`، `--al-color-text`، `--al-color-text-muted`، `--al-radius-sm`، `--al-size-control-sm`، `--al-space-3`، `--al-text-sm`، `--al-weight-medium`
