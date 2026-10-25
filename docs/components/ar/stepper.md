# مؤشر الخطوات

> ترجمة لـ[المواصفات بالإنجليزية](../stepper.md). إن اختلفت الترجمة عن الأصل، فالإنجليزية هي المرجع.

أين يقف الشخص في مسار من ثلاث إلى ست خطوات: كل خطوة مسمّاة، والمكتملة عليها علامة، والحالية مميّزة، و«الخطوة 2 من 4» بالكلمات.

**CSS:** [`css/components/stepper.css`](../../../css/components/stepper.css). **الأصناف:** `.al-stepper`، `.al-stepper__count`، `.al-stepper__name`، `.al-stepper__num`.

## البنية

```html
<nav class="al-stepper" aria-label="Progress">
  <p class="al-stepper__count">Step 2 of 4</p>
  <ol>
    <li data-done><svg class="al-icon al-icon--sm" aria-hidden="true">…</svg><a href="…"><span class="al-stepper__name">Your details</span><span class="al-visually-hidden"> (done)</span></a></li>
    <li aria-current="step"><span class="al-stepper__num" aria-hidden="true">2</span><span><span class="al-stepper__name">Contact</span></span></li>
    <li><span class="al-stepper__num" aria-hidden="true">3</span><span><span class="al-stepper__name">Payment</span></span></li>
    …
  </ol>
</nav>
```

وفي React: ‏`Stepper` (`steps`، `current`، `href`).

## الأنواع والأحجام

نوع واحد. وقد تكون الخطوات المكتملة روابط للرجوع إليها. وتحت 40rem لا يظهر إلا اسم الخطوة الحالية؛ وتحتفظ البقية بأسمائها لقارئات الشاشة.

## الحالات

المكتملة: شريط بلون التمييز فوقها، وعلامة صح. والحالية: شريط بلون التمييز، والاسم بخط عريض. والقادمة: شريط باهت، ورقم.

## لوحة المفاتيح

لا يستقبل التركيز إلا روابط الرجوع إلى الخطوات المكتملة.

## ARIA

عنصر `nav` باسم «التقدّم»؛ وللخطوة الحالية `aria-current="step"`، والمكتملة تقول «(اكتملت)» بنص مخفي. و«الخطوة 2 من 4» تُقال أولًا.

## من اليمين إلى اليسار

الخطوة الأولى في البداية، على اليمين. والأرقام بأرقام الصفحة.

## افعل

- سمِّ الخطوات بما يُطلب فيها («الدفع»)، باختصار.
- أبقِ الخطوات نفسها من البداية إلى النهاية؛ والخطوة التي قد تُتخطّى تبقى، وتقول ذلك.

## لا تفعل

- استخدامه لعمل طويل أو متشعّب: فتلك قائمة المهام.
- استخدامه لعرض مراحل إنجاز شيء: فتلك «الخطوات».

## الرموز

`--al-color-accent`، `--al-color-line-strong`، `--al-color-text`، `--al-color-text-muted`، `--al-space-1-5`، `--al-space-2`، `--al-text-sm`، `--al-weight-semibold`
