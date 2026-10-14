# الزر

> ترجمة لـ[المواصفات بالإنجليزية](../button.md). إن اختلفت الترجمة عن الأصل، فالإنجليزية هي المرجع.

إجراء. العنصر `<button>` ينفّذ شيئًا؛ والعنصر `<a href>` ينقل إلى مكان ما، ويُنسَّق بالشكل نفسه حين يكون رابطًا يشبه الإجراء («افتح الحاسبة»).

**CSS:** [`css/components/button.css`](../../../css/components/button.css). **الأصناف:** `.al-button`، `.al-button--danger`، `.al-button--icon`، `.al-button--primary`، `.al-button--quiet`، `.al-button--sm`.

## البنية

```html
<button type="button" class="al-button al-button--primary">Save offer</button>
<button type="button" class="al-button">Compare offers</button>
<button type="button" class="al-button al-button--quiet">Add a step</button>
<button type="button" class="al-button al-button--danger">Delete offer</button>
<button type="button" class="al-button al-button--icon" aria-label="Edit offer">
  <svg class="al-icon" aria-hidden="true"><use href="dist/icons.svg#al-icon-edit"></use></svg>
</button>
```
تسمية، وقبلها أيقونة اختياريًا (أو سهم ختامي في «نقل إلى…»). وأزرار الأيقونة وحدها مربعة.

## الأنواع والأحجام

| النوع | الصنف | الاستخدام |
|---|---|---|
| رئيسي | `--primary` | الإجراء الوحيد الذي وُجد العرض أو مربع الحوار من أجله. واحد في كل عرض |
| ثانوي | (بلا صنف) | الإجراءات الأخرى، بإطار |
| هادئ | `--quiet` | الإجراءات الثانوية والمتكررة في هيئة نص: تعديل، إضافة خطوة، مسح. يحل محل `.link-button` و`.app-add` في hunt |
| خطر | `--danger` | يتلف شيئًا: ثانوي أو هادئ؛ و`--danger --primary` فقط في الخطوة الأخيرة من تأكيد |
| أيقونة | `--icon` | أيقونة وحدها، مع `aria-label` وتلميح أدوات |

**الأحجام:** الافتراضي (40px) و`--sm` (32px). وتحتفظ الأزرار الهادئة بهدف نقر لا يقل عن 24px في الحجمين.

## الحالات

| الحالة | الشكل |
|---|---|
| التمرير | خلفية غائرة، والإطار بلون النص (والرئيسي يغمق)؛ والأزرار الهادئة يظهر تحتها خط |
| التركيز | إطار التركيز في النظام (2px، بإزاحة 2px) |
| الضغط | ينزل 1px |
| غير متاح | `aria-disabled="true"` (يبقى قابلًا للتركيز؛ والسبب بجانبه أو في `aria-describedby`)؛ و`disabled` فقط داخل النماذج حيث لا يمكن شرح السبب |
| قيد العمل | `aria-busy="true"`: تبقى التسمية ويتبعها مؤشر دوّار؛ ويُتجاهل النقر، لكن مفتاحي Enter والمسافة لا يُتجاهلان، لذا يتحقق المعالج من `aria-busy` أولًا ويعود |

## لوحة المفاتيح

مفتاحا Enter والمسافة يفعّلانه (سلوك أصلي). وترتيب التركيز يتبع ترتيب DOM.

## ARIA

الاسم من التسمية؛ وأزرار الأيقونة تحتاج `aria-label`. وأزرار التبديل تستخدم `aria-pressed`. وأزرار القوائم: `aria-haspopup="menu"` و`aria-expanded` (انظر [القائمة](menu.md)).

## من اليمين إلى اليسار

الأيقونات التي قبل التسمية تبقى قبلها (على اليمين في العربية). والأيقونات الاتجاهية (السهم، علامة الاتجاه) تأخذ `.al-mirror`.

## افعل

- اذكر الإجراء وموضوعه: «حفظ العرض»، «أرشفة 3».
- ضع الزر الرئيسي في آخر صف إجراءات مربع الحوار، وفي أول صف إجراءات الصفحة.
- اشرح سبب عدم إتاحة شيء ما، بجانبه.

## لا تفعل

- «موافق»، «إرسال»، «نعم»، «انقر هنا».
- زرّان رئيسيان في عرض واحد.
- تعطيل زر للدلالة على «قيد العمل».
- استخدام زر خطر لشيء يمكن التراجع عنه؛ بل نفّذه واعرض «تراجع».

## الرموز

`--al-border-hairline`، `--al-button-height`، `--al-button-height-sm`، `--al-button-padding-inline`، `--al-button-radius`، `--al-color-accent`، `--al-color-control`، `--al-color-danger`، `--al-color-on-accent`، `--al-color-surface-sunk`، `--al-color-text`، `--al-duration-fast`، `--al-ease-standard`، `--al-font-sans`، `--al-size-target-min`، `--al-size-target-touch`، `--al-space-1`، `--al-space-2`، `--al-space-3`، `--al-text-base`، `--al-text-sm`، `--al-weight-medium`
