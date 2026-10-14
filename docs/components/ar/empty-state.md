# الحالة الفارغة

> ترجمة لـ[المواصفات بالإنجليزية](../empty-state.md). إن اختلفت الترجمة عن الأصل، فالإنجليزية هي المرجع.

لماذا لا يوجد شيء هنا، والإجراء التالي. ولا تكون طريقًا مسدودًا أبدًا.

**CSS:** [`css/components/empty-state.css`](../../../css/components/empty-state.css). **الأصناف:** `.al-empty`، `.al-empty__text`، `.al-empty__title`.

## البنية

```html
<div class="al-empty">
  <p class="al-empty__title">No offers yet</p>
  <p class="al-empty__text">Work one out in the calculator, then save it to compare it with others.</p>
  <a class="al-button al-button--primary" href="/calc">Open the calculator</a>
</div>
```

## الأنواع والأحجام

الاستخدام الأول (اشرح وادعُ)، ولا نتائج (قل ما بُحث عنه واعرض مسح عوامل التصفية)، وأُنجز كل شيء («تم كل شيء»).

## الحالات

لا شيء.

## لوحة المفاتيح

الإجراء هو المحطة التالية.

## ARIA

محتوى عادي؛ وأعلن «لا نتائج» عبر منطقة حالة حين تأتي بعد بحث.

## من اليمين إلى اليسار

تنعكس.

## افعل

- اعرض إجراءً تاليًا واحدًا بالضبط.

## لا تفعل

- إظهار رسم توضيحي بدل الشرح.

## الرموز

`--al-border-hairline`، `--al-color-line-strong`، `--al-color-text-muted`، `--al-radius-sm`، `--al-size-measure`، `--al-space-3`، `--al-space-5`، `--al-space-8`، `--al-text-lg`، `--al-tracking-none`، `--al-weight-medium`
