# التذييل

> ترجمة لـ[المواصفات بالإنجليزية](../footer.md). إن اختلفت الترجمة عن الأصل، فالإنجليزية هي المرجع.

من صنعه، وإلى أين بعد ذلك، والسطر القانوني؛ هادئ، ومتطابق في كل صفحة.

**CSS:** [`css/components/footer.css`](../../../css/components/footer.css). **الأصناف:** `.al-footer`، `.al-footer__legal`، `.al-footer__links`، `.al-footer__attribution`.

## البنية

```html
<footer class="al-footer">
  <a class="al-lockup" href="/">…</a>
  <ul class="al-footer__links"><li><a href="/privacy">Privacy</a></li></ul>
  <p class="al-footer__legal">© 2026 Arabesque Labs Ltd. Structure. Clarity. Craftsmanship.</p>
</footer>
```

## الأنواع والأحجام

نوع واحد.

بلا التركيبة (وفي React ‏`lockup={false}`) حين تحملها ترويسة الصفحة: فيحلّ السطر القانوني محلّها، أولًا، في صف الروابط ومتوسّطًا معها. وتحت السطر القانوني، نسبة المنتج (`.al-footer__attribution`، وفي React ‏`attribution`): [سطر النسبة](attribution.md)، المكوّن أو صورته الملائمة للمظهر.

## الحالات

الروابط: باهتة، وبلون التمييز مع خط سفلي عند التمرير.

## لوحة المفاتيح

الترتيب الطبيعي.

## ARIA

العنصر `<footer>` على مستوى الصفحة هو معلم contentinfo؛ ويمكن أن تقع قائمة الروابط داخل `nav` باسم خاص بها.

## من اليمين إلى اليسار

ينعكس مع التخطيط.

## افعل

- اجعله قصيرًا.

## لا تفعل

- تكرار التنقل الرئيسي كاملًا.

## الرموز

`--al-border-hairline`، `--al-color-accent`، `--al-color-line`، `--al-color-text-muted`، `--al-space-2`، `--al-space-4`، `--al-space-5`، `--al-space-8`، `--al-text-sm`، `--al-text-xs`
