# البحث

> ترجمة لـ[المواصفات بالإنجليزية](../search.md). إن اختلفت الترجمة عن الأصل، فالإنجليزية هي المرجع.

حقل بحث بتسمية ظاهرة وأيقونة بحث وزر مسح.

**CSS:** [`css/components/search.css`](../../../css/components/search.css). **الأصناف:** `.al-icon`، `.al-input`، `.al-search`، `.al-search__clear`.

## البنية

```html
<form role="search">
  <label class="al-label" for="q">Search items</label>
  <div class="al-search">
    <svg class="al-icon" aria-hidden="true"><use href="dist/icons.svg#al-icon-search"></use></svg>
    <input class="al-input" id="q" type="search" autocomplete="off">
    <button type="button" class="al-search__clear" aria-label="Clear search" hidden>…</button>
  </div>
</form>
```

## الأنواع والأحجام

حجم واحد؛ واقتراحات بعنصر `<datalist>` أصلي للنص الحر البسيط.

## الحالات

لا يظهر زر المسح إلا حين يوجد نص. التحميل: مؤشر دوّار في منطقة النتائج، لا في الحقل. لا نتائج: قل ذلك وما الذي يمكن تجربته. الخطأ: قل إن البحث تعذّر، مع إعادة المحاولة.

## لوحة المفاتيح

مفتاح Escape يمسح الحقل. وEnter يُرسل. ولا تتصرف بناءً على ضغطات المفاتيح أثناء تركيب الحروف بمحرر الإدخال (تحقق من `event.isComposing`).

## ARIA

`role="search"` على النموذج؛ وتُعلَن النتائج عبر منطقة إعلان مهذّبة مع عددها بالكلمات.

## من اليمين إلى اليسار

الأيقونة في البداية وزر المسح في النهاية؛ وينعكس كلاهما.

## افعل

- أبقِ التسمية ظاهرة، حتى لو كانت قصيرة.
- احتفظ بما كُتب حين يتعذر تحميل النتائج.

## لا تفعل

- استخدام النص البديل بوصفه التسمية.
- معاملة datalist كأنها حقل مركب كامل: فهي لا تعرض خيارات غنية ولا تحمّل النتائج أثناء الكتابة.

## الرموز

`--al-border-focus`، `--al-color-focus`، `--al-color-text`، `--al-color-text-muted`، `--al-radius-sm`، `--al-size-control-sm`، `--al-size-icon`، `--al-space-1`، `--al-space-3`
