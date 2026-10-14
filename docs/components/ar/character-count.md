# عداد الحروف

> ترجمة لـ[المواصفات بالإنجليزية](../character-count.md). إن اختلفت الترجمة عن الأصل، فالإنجليزية هي المرجع.

حدّ على حقل نصي، يُعبَّر عنه بما تبقى («تبقّى لك 12 حرفًا»)، وبمقدار التجاوز حين يُتجاوز («لديك 8 أحرف زائدة»). الكتابة بعد الحد مسموحة، فلا يُقتطع النص الملصق؛ بل يُظهر الحقل الخطأ بدلًا من ذلك.

**CSS:** [`css/components/character-count.css`](../../../css/components/character-count.css). **JS:** [`js/count.js`](../../../js/count.js) (`initCharacterCounts`). **الأصناف:** `.al-character-count__message` (يُنشئه المساعد).

## البنية

```html
<div class="al-field">
  <label class="al-label" for="desc">Description</label>
  <span class="al-hint" id="desc-hint">A sentence or two is enough.</span>
  <textarea class="al-textarea" id="desc" data-al-maxlength="120" aria-describedby="desc-hint"></textarea>
</div>
<script type="module">
  import { initCharacterCounts } from "./js/count.js";
  const redraw = initCharacterCounts(document, {
    words: (left) => left >= 0 ? `You have ${left} characters remaining` : `You have ${-left} characters too many`,
    limit: (max) => `You can enter up to ${max} characters`,
  });
  // after a language change: redraw();
</script>
```

يضيف المساعد بعد الحقل: الرسالة الظاهرة (`aria-hidden`، لأنها تتغير مع كل ضغطة مفتاح)، ومنطقة إعلان مهذّبة، ووصفًا مخفيًا بصريًا للحد ينضم إلى `aria-describedby` الخاص بالحقل.

## الأنواع والأحجام

على مساحة نص أو حقل نصي. والخياران `words` و`limit` يعطيان الرسائل بلغة الصفحة (وأرقامها)؛ والقيم الافتراضية إنجليزية.

## الحالات

تحت الحد: لون باهت. فوقه: الرسالة بلون الخطر، والحقل `aria-invalid="true"` بإطار الخطأ. ولا يزيل المساعد `aria-invalid` إلا إن كان هو من وضعها، فيبقى خطأ التحقق الصادر عن `js/validate.js`.

## لوحة المفاتيح

لا شيء خاص به.

## ARIA

يوصف الحقل بتلميحه وبالحد («يمكنك إدخال ما يصل إلى 120 حرفًا»)، ويُقرأ ذلك مرة واحدة عند التركيز. ويُعلَن ما تبقى بعد ثانية من توقف الكتابة، عبر منطقة الإعلان، فلا يتكلم فوق كل ضغطة مفتاح.

## من اليمين إلى اليسار

يتبع اتجاه القراءة؛ والأرقام بأرقام الصفحة.

## افعل

- اذكر الحد في التلميح أيضًا، إن كان مهمًا قبل أن يبدأ الناس.
- احسب ما يحسبه الخادم (الحروف، لا البايتات).

## لا تفعل

- استخدام `maxlength`: فهي تقتطع النص الملصق دون تنبيه.
- الإعلان مع كل ضغطة مفتاح.

## الرموز

`--al-color-danger`، `--al-color-text-muted`، `--al-text-sm`، `--al-weight-medium`
