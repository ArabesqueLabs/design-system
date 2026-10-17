# دعوة إلى الفعل

> ترجمة لـ[المواصفات بالإنجليزية](../cta.md). إن اختلفت الترجمة عن الأصل، فالإنجليزية هي المرجع.

كلمة الصفحة الأخيرة: سطر واحد، ثم ما يُفعل.

**CSS:** [`css/components/cta.css`](../../../css/components/cta.css). **الأصناف:** `.al-cta`، `.al-cta__title`، `.al-cta__lede`، `.al-cta__actions`.

## البنية

```html
<section class="al-cta al-pattern al-pattern--quiet" aria-labelledby="cta-h">
  <div class="al-pattern__art" aria-hidden="true"></div>
  <h2 class="al-cta__title" id="cta-h">صفحتك القادمة، مبنية من البلاطة نفسها.</h2>
  <p class="al-lede al-cta__lede">ابدأ من القالب، أو خذ الأجزاء التي تحتاجها فقط.</p>
  <div class="al-cta__actions">
    <a class="al-button al-button--primary" href="…">افتح القالب</a>
    <a class="al-button" href="…">اقرأ طريقة الاستخدام</a>
    <div class="al-command al-command--prompt">…npm run build…</div>
  </div>
</section>
```

وفي React: `CallToAction` (`heading` و`lede` و`actions` و`pattern`).

## الأنواع والأحجام

مع [النمط](pattern.md)، هادئًا، خلفه (الافتراضي)، أو من دونه. والإجراءات: إجراء رئيسي واحد، وإجراء أهدأ واحد على الأكثر، و[أمر](code.md) إن كان هناك شيء واحد يُشغَّل.

## الحالات

لا حالات خاصة به.

## لوحة المفاتيح

يصل Tab إلى كل إجراء بالترتيب: الرئيسي أولًا.

## ARIA

عنصر `section` يسمّيه عنوانه (`h2`).

## من اليمين إلى اليسار

في الوسط؛ وتتبع الإجراءات اتجاه القراءة، فيقع الرئيسي على اليمين في العربية.

## افعل

- قل ما سيحصل عليه الناس، في سطر («صفحتك القادمة، مبنية من البلاطة نفسها»)، لا «ابدأ اليوم!».
- استخدمها مرة واحدة، في آخر الصفحة.

## لا تفعل

- عرض أكثر من زرين.
- تكرار كلمات القسم الافتتاحي.

## الرموز

`--al-border-hairline`، `--al-color-line`، `--al-color-surface-sunk`، `--al-font-display`، `--al-leading-heading`، `--al-space-3`، `--al-space-4`، `--al-space-5`، `--al-space-section`، `--al-text-3xl`، `--al-tracking-tight`، `--al-weight-regular`
