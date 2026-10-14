# قائمة الملخص

> ترجمة لـ[المواصفات بالإنجليزية](../summary-list.md). إن اختلفت الترجمة عن الأصل، فالإنجليزية هي المرجع.

حقائق في أزواج من مفتاح وقيمة، لكلٍّ منها اختياريًا رابط «تغيير»: خطوة «راجع إجاباتك»، أو تفاصيل سجل.

**CSS:** [`css/components/summary-list.css`](../../../css/components/summary-list.css). **الأصناف:** `.al-summary-list`، `.al-summary-list__actions`، `.al-summary-list__key`، `.al-summary-list__row`، `.al-summary-list__row--no-actions`، `.al-summary-list__value`.

## البنية

```html
<dl class="al-summary-list">
  <div class="al-summary-list__row">
    <dt class="al-summary-list__key">Full name</dt>
    <dd class="al-summary-list__value">…</dd>
    <dd class="al-summary-list__actions"><a href="#name">Change<span class="al-visually-hidden"> full name</span></a></dd>
  </div>
  <div class="al-summary-list__row al-summary-list__row--no-actions">…</div>
</dl>
```

## الأنواع والأحجام

صفوف بإجراءات وصفوف للقراءة فقط (`--no-actions`). وتحت نقطة التوقف `sm` يأتي المفتاح فوق القيمة.

## الحالات

ثابتة. وروابط «تغيير» تعيد إلى السؤال مع الإبقاء على الإجابة.

## لوحة المفاتيح

كل رابط «تغيير» محطة Tab.

## ARIA

قائمة تعريفات. ولكل رابط «تغيير» اسم فريد يُقرأ، يكمله نص مخفي بصريًا.

## من اليمين إلى اليسار

تنعكس الأعمدة؛ والقيم التي هي رموز أو عناوين بريد إلكتروني تقع داخل `<bdi>`.

## افعل

- اعرض الإجابات كما أعطاها الشخص بالضبط.
- علّم الحقائق التي للقراءة فقط بحذف الإجراء، لا بتلوينها بالرمادي.

## لا تفعل

- استخدامها لمقارنة القيم بين العناصر؛ فذلك جدول.

## الرموز

`--al-border-hairline`، `--al-color-line`، `--al-space-1`، `--al-space-3`، `--al-space-5`، `--al-weight-medium`
