# شريط الإجراءات الجماعية

> ترجمة لـ[المواصفات بالإنجليزية](../bulk-bar.md). إن اختلفت الترجمة عن الأصل، فالإنجليزية هي المرجع.

حين تُحدَّد عناصر: كم عددها، وما يمكن فعله بها كلها، وطريقة لإلغاء التحديد. يلتصق بأسفل العرض.

**CSS:** [`css/components/bulk-bar.css`](../../../css/components/bulk-bar.css). **الأصناف:** `.al-bulk-bar`، `.al-bulk-bar__count`، `.al-button`، `.al-button--quiet`.

## البنية

```html
<div class="al-bulk-bar" role="region" aria-label="3 selected">
  <span class="al-bulk-bar__count">3 selected</span>
  <button type="button" class="al-button al-button--sm">Move 3 to…</button>
  <button type="button" class="al-button al-button--sm">Archive 3</button>
  <button type="button" class="al-button al-button--sm al-button--quiet">Clear selection</button>
</div>
```

## الأنواع والأحجام

نوع واحد. يظهر حين يُحدَّد أول عنصر، ويختفي حين يُلغى التحديد.

## الحالات

تتكيّف الأزرار مع السطح المعكوس.

## لوحة المفاتيح

يُوصل إليه في تسلسل Tab بعد القائمة؛ ومفتاح Escape يلغي التحديد (يربطه التطبيق).

## ARIA

منطقة مسمّاة يتحدّث اسمها مع العدد. أما التحديد نفسه: فمربعات اختيار في الصفوف، أو `aria-selected` على الصفوف.

## من اليمين إلى اليسار

العدد في البداية، والإجراءات في النهاية.

## افعل

- اذكر العدد في كل إجراء («أرشفة 3»).
- اجعل الإجراءات الجماعية قابلة للتراجع بإشعار عابر واحد.

## لا تفعل

- إخفاء الإجراءات الجماعية في قائمة حين تكون ثلاثة أو أقل.

## الرموز

`--al-color-inverse`، `--al-color-on-inverse`، `--al-radius-md`، `--al-space-2`، `--al-space-3`، `--al-space-4`، `--al-weight-semibold`، `--al-z-sticky`
