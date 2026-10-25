# التقييم

> ترجمة لـ[المواصفات بالإنجليزية](../rating.md). إن اختلفت الترجمة عن الأصل، فالإنجليزية هي المرجع.

تقييم من واحد إلى خمسة: أزرار اختيار مرسومة بنجمة العلامة، لكل منها اسم بالكلمات («3 من 5»)؛ أو معروضًا، صورةً مسمّاة بقيمتها.

**CSS:** [`css/components/rating.css`](../../../css/components/rating.css). **الأصناف:** `.al-rating`، `.al-rating__star`، `.al-rating__star--on`.

## البنية

```html
<fieldset class="al-fieldset">
  <legend>How was your visit?</legend>
  <div class="al-rating">
    <label class="al-rating__star"><input type="radio" name="visit" value="1"><span class="al-visually-hidden">1 of 5</span></label>
    …
  </div>
</fieldset>

<!-- shown, not asked -->
<span class="al-rating" role="img" aria-label="4 of 5">
  <span class="al-rating__star al-rating__star--on"></span> … <span class="al-rating__star"></span>
</span>
```

وفي React: ‏`Rating` (`legend`، `value`، `onChange`، `max`) و`RatingValue` (`value`، `max`).

## الأنواع والأحجام

مطلوب (أزرار اختيار) أو معروض (`role="img"`). خمسة افتراضيًا؛ أو أي عدد صغير. وكل نجمة هدف قدره 28px.

## الحالات

النجمة المختارة وما قبلها ممتلئة بلون التمييز؛ والبقية حدود بلون عناصر التحكم. والإشارة إلى نجمة (بالفأرة) تملأ حتى تلك النجمة، لتُري ما يعطيه اختيارها. والتركيز يحيط النجمة المركّز عليها بإطار.

## لوحة المفاتيح

كأزرار الاختيار: يصل Tab إلى المجموعة، وتنقل الأسهم وتختار، ويختار Space.

## ARIA

مجموعة حقول يسأل عنوانها السؤال. وكل زر مسمّى «3 من 5»، بأرقام الصفحة، لا بالنجمة. والتقييم المعروض صورة واحدة، مسمّاة بقيمتها؛ ونجومه للعرض فقط.

## من اليمين إلى اليسار

النجمة الأولى في البداية، على اليمين؛ وتمتلئ النجوم من اليمين.

## افعل

- قل قريبًا ما تعنيه الأرقام إن لم يكن واضحًا («1 ضعيف، 5 ممتاز»).
- اذكر عدد التقييمات التي يأتي منها المتوسط.

## لا تفعل

- طلب تقييم حيث يخبرك سؤال بالكلمات بأكثر.
- عرض أنصاف النجوم: قرّب، واذكر القيمة الدقيقة بالكلمات بجانبها.

## الرموز

`--al-border-focus`، `--al-color-accent`، `--al-color-control`، `--al-color-focus`، `--al-radius-sm`
