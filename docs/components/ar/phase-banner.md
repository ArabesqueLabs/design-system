# شريط المرحلة

> ترجمة لـ[المواصفات بالإنجليزية](../phase-banner.md). إن اختلفت الترجمة عن الأصل، فالإنجليزية هي المرجع.

يخبر الناس أن الخدمة جديدة أو تجريبية، وأين يقولون رأيهم.

**CSS:** [`css/components/phase-banner.css`](../../../css/components/phase-banner.css). **الأصناف:** `.al-phase-banner`، `.al-phase-banner__text`.

## البنية

```html
<div class="al-phase-banner">
  <span class="al-badge al-badge--warning">Experimental</span>
  <p class="al-phase-banner__text">This is new. <a href="…">Tell us what you think</a>.</p>
</div>
```

## الأنواع والأحجام

نوع واحد: شارة وجملة، تحت الترويسة.

## الحالات

ثابت.

## لوحة المفاتيح

لا يستقبل التركيز إلا الرابط.

## ARIA

كلمة الشارة هي التي تحمل المعنى، لا لونها.

## من اليمين إلى اليسار

الشارة في البداية.

## افعل

- قل ما تعنيه المرحلة للناس (قد تتغير الخدمة، وقد تُعاد البيانات إلى البداية).
- اربطه بوجهة حقيقية لتلقي الآراء، أو احذف الرابط.

## لا تفعل

- إبقاؤه بعد أن تستقر الخدمة.
- استخدامه لرسائل تسويقية.

## الرموز

`--al-border-hairline`، `--al-color-line`، `--al-color-text-muted`، `--al-space-1`، `--al-space-2`، `--al-space-3`، `--al-text-sm`
