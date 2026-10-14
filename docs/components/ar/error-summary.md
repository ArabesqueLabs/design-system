# ملخص الأخطاء

> ترجمة لـ[المواصفات بالإنجليزية](../error-summary.md). إن اختلفت الترجمة عن الأصل، فالإنجليزية هي المرجع.

عند إرسال نموذج فيه مشكلات: قائمة في أعلى النموذج، كل مشكلة فيها رابط إلى حقلها. ويظهر حتى لخطأ واحد.

**CSS:** [`css/components/error-summary.css`](../../../css/components/error-summary.css). **الأصناف:** `.al-error-summary`، `.al-error-summary__list`، `.al-error-summary__title`، `.al-icon`.

## البنية

```html
<div class="al-error-summary" tabindex="-1" role="alert" aria-labelledby="f-error-title">
  <h2 class="al-error-summary__title" id="f-error-title">There is a problem</h2>
  <ul class="al-error-summary__list">
    <li><a href="#name">Enter your full name</a></li>
  </ul>
</div>
```

## الأنواع والأحجام

نوع واحد. والملف `js/validate.js` يبنيه لك، ويبني الأخطاء المقابلة بجانب الحقول.

## الحالات

يظهر عند الإرسال، لا أثناء الكتابة أبدًا. ويُزال عند أول إرسال تالٍ ينجح.

## لوحة المفاتيح

ينتقل التركيز إلى الملخص عند الإرسال. وكل رابط ينقل التركيز إلى حقله ويمرّر الصفحة كي تظهر التسمية.

## ARIA

`role="alert"` واسمه العنوان. ويُضاف «خطأ: » إلى عنوان الصفحة ما دامت الأخطاء ظاهرة. ويحصل كل حقل على `aria-invalid` ورسالته في `aria-describedby`.

## من اليمين إلى اليسار

يتبع اتجاه القراءة.

## افعل

- استخدم الكلمات نفسها في الملخص وبجانب الحقل.
- قل ما يجب فعله («أدخل…»، «اختر…»)، لا ما هو خاطئ.

## لا تفعل

- التحقق عند مغادرة الحقل أو أثناء الكتابة.
- تعطيل زر الإرسال حتى يصبح النموذج صالحًا.

## الرموز

`--al-border-focus`، `--al-border-focus-offset`، `--al-color-danger`، `--al-color-focus`، `--al-color-surface`، `--al-color-text`، `--al-radius-sm`، `--al-space-1`، `--al-space-2`، `--al-space-4`، `--al-space-5`، `--al-text-lg`، `--al-tracking-none`، `--al-weight-medium`
