# الحالة

> ترجمة لـ[المواصفات بالإنجليزية](../status.md). إن اختلفت الترجمة عن الأصل، فالإنجليزية هي المرجع.

حالة بكلمة («متصل»، «متراجع الأداء»، «متوقف»)، تسبقها نقطة بلون الحالة. الكلمة هي المعنى؛ والنقطة تكرّره.

**CSS:** [`css/components/status.css`](../../../css/components/status.css). **الأصناف:** `.al-status`، `.al-status--danger`، `.al-status--info`، `.al-status--live`، `.al-status--success`، `.al-status--warning`.

## البنية

```html
<span class="al-status al-status--success">Online</span>
<span class="al-status al-status--info al-status--live">Deploying</span>
<!-- the dot alone, the word for screen readers -->
<span class="al-status al-status--success"><span class="al-visually-hidden">Online</span></span>
```

وفي React: ‏`Status` (`tone`، `live`، `dotOnly`).

## الأنواع والأحجام

المحايدة (الافتراضية، باهتة)، و`--success`، و`--warning`، و`--danger`، و`--info`. و`--live` تجعل النقطة تنبض، لشيء يحدث الآن. حجم واحد، بالنص الصغير.

## الحالات

ثابتة؛ و`--live` تنبض، وتسكن مع تقليل الحركة.

## لوحة المفاتيح

لا تستقبل التركيز.

## ARIA

الكلمة هي الحالة. ومع النقطة وحدها، تُخفى الكلمة بصريًا داخلها، فتُقرأ في مكانها. وإن تغيّرت الحالة والصفحة مفتوحة وكان ذلك مهمًا الآن، فقله في منطقة حيّة أيضًا (إشعار عابر، أو `role="status"` للمنطقة نفسها).

## من اليمين إلى اليسار

النقطة في البداية، على اليمين.

## افعل

- كلمة أو كلمتان: ما هو عليه الآن، لا ما حدث.
- الشارة لتسمية على شيء («تجريبي»)؛ والحالة لحال شيء يعمل.

## لا تفعل

- استخدام النقطة وحدها حيث لا كلمة قريبة، أو في تلميح، لتقولها.
- جعل أكثر من شيء واحد ينبض في الصفحة.

## الرموز

`--al-color-danger`، `--al-color-info`، `--al-color-success`، `--al-color-text-muted`، `--al-color-warning`، `--al-ease-standard`، `--al-radius-full`، `--al-space-1-5`، `--al-text-sm`
