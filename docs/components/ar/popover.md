# النافذة المنبثقة

> ترجمة لـ[المواصفات بالإنجليزية](../popover.md). إن اختلفت الترجمة عن الأصل، فالإنجليزية هي المرجع.

مزيد عن شيء ما، حين يُطلب: يفتحها زر بجانبه، في popover أصلي، بعنوان وأسطر قليلة.

**CSS:** [`css/components/popover.css`](../../../css/components/popover.css). **الأصناف:** `.al-popover`، `.al-popover__title`.

## البنية

```html
<button class="al-button al-button--sm" popovertarget="tax" aria-expanded="false">What's a tax code?</button>
<div class="al-popover" id="tax" popover role="dialog" aria-labelledby="tax-title">
  <p class="al-popover__title" id="tax-title">Tax code</p>
  <p>It tells your employer how much tax to take from your pay.</p>
  <p><a href="…">Find your tax code</a></p>
</div>
<script type="module">
  import { initPopovers } from "/js/popover.js";
  initPopovers();
</script>
```

وفي React: ‏`Popover` (`label`، `icon`، `title`). ضع النافذة بعد زرها مباشرة، لينتقل Tab من أحدهما إلى الآخر.

## الأنواع والأحجام

يفتحها زر صغير بكلمات، أو زر أيقونة (`info`) مسمّى بعنوانه، بجانب ما يشرحه. وعرضها حتى 20rem.

## الحالات

مفتوحة أو مغلقة. ومفتوحةً تكون تحت زرها، عند بدايته، وتنقلب فوقه إن لم يكن متسع، وتتبعه أثناء تمرير الصفحة.

## لوحة المفاتيح

Enter أو Space على الزر يفتحها ويغلقها. وينتقل Tab إليها وبعدها. ويغلقها Escape، فيعود التركيز إلى الزر.

## ARIA

للزر `aria-expanded`، يبقيه `js/popover.js` صادقًا. والنافذة `dialog` غير مشروط، مسمّى بعنوانه. وتغلقها نقرة خارجها (`popover="auto"`).

## من اليمين إلى اليسار

تُفتح عند حافة بداية الزر، على اليمين.

## افعل

- أسطر قليلة، وربما رابط: ما يحتاجه أحدهم ليجيب عن السؤال الذي بجانبها.
- عنصر إفصاح بدلًا منها حين يكون النص جزءًا من الصفحة.

## لا تفعل

- وضع إجراءات فيها: فتلك قائمة إجراءات، أو مربع حوار.
- فتحها عند التمرير: فذلك تلميح، ولا يحمل إلا اسمًا.

## الرموز

`--al-border-hairline`، `--al-color-line-strong`، `--al-color-surface`، `--al-color-text`، `--al-leading-ui`، `--al-radius-sm`، `--al-space-2`، `--al-space-4`، `--al-text-base`، `--al-text-sm`، `--al-weight-semibold`
