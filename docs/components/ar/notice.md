# الإشعار وملاحظة الأثر الجانبي

> ترجمة لـ[المواصفات بالإنجليزية](../notice.md). إن اختلفت الترجمة عن الأصل، فالإنجليزية هي المرجع.

الإشعار رسالة داخل الصفحة، بأربعة أنواع. وملاحظة الأثر الجانبي تقول ما الذي سيغيّره الإجراء أيضًا، قبل تنفيذه.

**CSS:** [`css/components/notice.css`](../../../css/components/notice.css). **الأصناف:** `.al-icon`، `.al-notice`، `.al-notice--danger`، `.al-notice--success`، `.al-notice--warning`، `.al-notice__actions`، `.al-notice__body`، `.al-notice__title`، `.al-side-effect`.

## البنية

```html
<div class="al-notice al-notice--warning" role="status">
  <svg class="al-icon" aria-hidden="true">…warning…</svg>
  <div class="al-notice__body">
    <p class="al-notice__title">Check your tax code</p>
    <p>0T taxes all of your pay. These figures would give 507T.</p>
    <div class="al-notice__actions"><button type="button" class="al-button al-button--sm">Use 507T</button></div>
  </div>
</div>

<p class="al-side-effect"><svg class="al-icon al-icon--sm" aria-hidden="true">…info…</svg>
  <span>Changing the rate also updates <strong>2 saved offers</strong>.</span></p>
```

## الأنواع والأحجام

| النوع | الأيقونة | الاستخدام |
|---|---|---|
| معلومات (الافتراضي) | info | سياق: ما المعدلات المستخدمة |
| `--success` | success | شيء ما تم ويبقى صحيحًا |
| `--warning` | warning | يحتاج انتباهًا، لكنه لا يعيق |
| `--danger` | danger | خطأ؛ وللأخطاء فقط |

## الحالات

ثابت؛ وقد يحمل إجراءات.

## لوحة المفاتيح

إجراءاته في تسلسل Tab.

## ARIA

`role="status"` للأخبار التي تصل؛ و`role="alert"` فقط للأخطاء التي تعيق. وما يظهر عند التحميل: لا يحتاج دورًا.

## من اليمين إلى اليسار

حافة الحالة والأيقونة في البداية.

## افعل

- ابدأ بعنوان يسمّي الوضع.
- اعرض الإصلاح إجراءً داخل الإشعار.
- ضع ملاحظات الأثر الجانبي بجانب العنصر الذي يسببها، مع الأعداد.

## لا تفعل

- استخدام لون الخطر لغير الأخطاء.
- رصّ أكثر من إشعارين فوق بعضهما؛ بل ادمجهما.

## الرموز

`--al-color-danger`، `--al-color-danger-wash`، `--al-color-info`، `--al-color-info-wash`، `--al-color-line-strong`، `--al-color-success`، `--al-color-success-wash`، `--al-color-text`، `--al-color-text-muted`، `--al-color-warning`، `--al-color-warning-wash`، `--al-radius-sm`، `--al-space-1`، `--al-space-2`، `--al-space-3`، `--al-space-4`، `--al-text-sm`، `--al-weight-medium`، `--al-weight-semibold`
