# الجدول

> ترجمة لـ[المواصفات بالإنجليزية](../table.md). إن اختلفت الترجمة عن الأصل، فالإنجليزية هي المرجع.

لمقارنة القيم: الأرقام تصطف، والإجمالي يبرز، والملاحظات الجانبية تتراجع. والجدول العريض يتمرر داخل منطقته الخاصة، لا الصفحة أبدًا.

**CSS:** [`css/components/table.css`](../../../css/components/table.css). **الأصناف:** `.al-table`، `.al-table__num`، `.al-table__row--aside`، `.al-table__row--sub`، `.al-table__row--total`، `.al-table--compact`، `.al-table--interactive`، `.al-table-wrap`.

## البنية

```html
<div class="al-table-wrap" role="region" aria-label="Take-home pay, by period" tabindex="0">
  <table class="al-table">
    <thead><tr><th scope="col">What</th><th scope="col" class="al-table__num">Year</th><th scope="col" class="al-table__num">Month</th></tr></thead>
    <tbody>
      <tr><th scope="row">Gross pay</th><td class="al-table__num">£108,000</td><td class="al-table__num">£9,000</td></tr>
      <tr><th scope="row">Income tax</th><td class="al-table__num">−£32,232</td><td class="al-table__num">−£2,686</td></tr>
      <tr class="al-table__row--total"><th scope="row">Take-home pay</th><td class="al-table__num">£71,597</td><td class="al-table__num">£5,966</td></tr>
      <tr class="al-table__row--aside"><th scope="row">Employer's National Insurance</th><td class="al-table__num">£15,450</td><td class="al-table__num">£1,288</td></tr>
    </tbody>
  </table>
</div>
```

## الأنواع والأحجام

| الصنف | الاستخدام |
|---|---|
| `.al-table__num` | الخلايا الرقمية وعناوينها: محاذاة إلى النهاية، وأرقام متساوية العرض، ودون التفاف |
| `.al-table__row--sub` | مجموع فرعي |
| `.al-table__row--total` | الإجمالي: وزن شبه عريض، ولون خفيف بلون التمييز، وخط فوقه |
| `.al-table__row--aside` | سياق ليس جزءًا من المجموع: باهت، وأصغر |
| `--compact` | صفوف أضيق للبيانات الكثيفة |
| `--interactive` | تبرز الصفوف عند التمرير (صفوف تفتح شيئًا) |
| `aria-selected` على `tr` | الصفوف المحددة، مع شريط الإجراءات الجماعية |

لا يظهر سهم العمود القابل للفرز إلا بعد فرزه (`aria-sort="ascending"` أو `"descending"`)، لا مع `"none"`.

## الحالات

التمرير (التفاعلي): غائر. المحدد: لون خفيف بلون التمييز. المفروز: `aria-sort` على `th`، وسهم على زره. التركيز: الغلاف (للتمرير) وأي عناصر تحكم. التحميل: صفوف هيكلية مبدئية.

## لوحة المفاتيح

Tab يصل إلى منطقة التمرير (ومفاتيح الأسهم تمرّرها) وإلى أي عناصر تحكم. وأزرار الفرز بالمفتاح Enter أو المسافة.

## ARIA

`<th scope>` للعناوين؛ و`<caption>` أو `aria-label` المنطقة. والعناوين القابلة للفرز أزرار داخل `th`، مع `aria-sort` على `th`.

## من اليمين إلى اليسار

تجري الأعمدة من اليمين إلى اليسار؛ وتحتفظ الأرقام بترتيبها من اليسار إلى اليمين وتُحاذى إلى النهاية (اليسار في العربية).

## افعل

- استخدم علامة الطرح (−) للخصومات.
- ضع الوحدات في العنوان («السنة»)، لا في كل خلية.

## لا تفعل

- استخدام جدول للتخطيط.
- اقتطاع الأرقام.

## الرموز

`--al-border-focus`، `--al-border-hairline`، `--al-color-accent-wash`، `--al-color-focus`، `--al-color-line`، `--al-color-line-strong`، `--al-color-surface-sunk`، `--al-color-text-muted`، `--al-size-target-min`، `--al-space-1`، `--al-space-1-5`، `--al-space-2`، `--al-space-3`، `--al-text-base`، `--al-text-sm`، `--al-text-xs`، `--al-weight-medium`، `--al-weight-regular`، `--al-weight-semibold`
