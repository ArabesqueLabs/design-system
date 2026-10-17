# الطيّ

> ترجمة لـ[المواصفات بالإنجليزية](../disclosure.md). إن اختلفت الترجمة عن الأصل، فالإنجليزية هي المرجع.

عنصر `<details>` أصلي لما هو ثانوي، يعرض اختياريًا ما اختير بداخله وهو مطويّ (الطيّة مع قيمة ملخصة).

**CSS:** [`css/components/disclosure.css`](../../../css/components/disclosure.css). **الأصناف:** `.al-disclosure`، `.al-disclosure__body`، `.al-disclosure__value`، `.al-disclosure-group`.

## البنية

```html
<details class="al-disclosure">
  <summary>Workplace pension <span class="al-disclosure__value">5%, salary sacrifice</span></summary>
  <div class="al-disclosure__body">…fields…</div>
</details>
```

## الأنواع والأحجام

بسيط (دون قيمة) ومع `__value`. ضع عدة عناصر فوق بعضها دون فراغ: كل منها يرسم خطًا فوقه. وفي `.al-disclosure-group` (وفي React `DisclosureGroup`) يرسم آخرها خطًا تحته أيضًا: لـ[الأسئلة والأجوبة](../../patterns.md#questions-and-answers).

## الحالات

التمرير: يأخذ الملخص لون التمييز. التركيز: إطار التركيز في النظام على الملخص. المفتوح: تتجه علامة الاتجاه إلى الأسفل.

## لوحة المفاتيح

مفتاح Enter أو المسافة على الملخص يفتحه ويطويه (سلوك أصلي).

## ARIA

أصلي؛ لا شيء يُضاف. والقيمة داخل الملخص، فتُقرأ مع الاسم.

## من اليمين إلى اليسار

تشير علامة الاتجاه إلى جهة القراءة (اليسار في العربية) وتتجه إلى الأسفل عند الفتح؛ والقيمة في النهاية.

## افعل

- أظهر القيمة الحالية في الملخص، كي يمكن التحقق منها دون فتحه.
- اطوِ التفاصيل والإعدادات التي نادرًا ما تتغير.

## لا تفعل

- طيّ الإجراء الرئيسي، أو خطأ.
- تداخل عناصر الطيّ لأكثر من مستوى واحد.

## الرموز

`--al-border-hairline`، `--al-color-accent`، `--al-color-line`، `--al-color-text-muted`، `--al-duration-fast`، `--al-ease-standard`، `--al-size-target-min`، `--al-space-2`، `--al-space-3`، `--al-space-4`، `--al-text-sm`، `--al-weight-medium`، `--al-weight-regular`
