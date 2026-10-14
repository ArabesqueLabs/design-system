# الشارة والوسم

> ترجمة لـ[المواصفات بالإنجليزية](../badge.md). إن اختلفت الترجمة عن الأصل، فالإنجليزية هي المرجع.

الشارة حالة قصيرة بجانب شيء ما («نشط»، «تجريبي»، عدد). والوسم تسمية يضيفها الناس ويزيلونها.

**CSS:** [`css/components/badge.css`](../../../css/components/badge.css). **الأصناف:** `.al-badge`، `.al-badge--accent`، `.al-badge--count`، `.al-badge--danger`، `.al-badge--info`، `.al-badge--outline`، `.al-badge--success`، `.al-badge--warning`، `.al-tag`، `.al-tag__remove`.

## البنية

```html
<span class="al-badge al-badge--warning">Experimental</span>
<span class="al-badge al-badge--count">3<span class="al-visually-hidden"> unread</span></span>
<span class="al-tag" style="--al-tag-color: var(--al-color-chart-1)">Dream job
  <button type="button" class="al-tag__remove" aria-label="Remove tag Dream job">×</button></span>
```

## الأنواع والأحجام

الشارات: المحايدة (الافتراضية)، و`--accent`، و`--success`، و`--warning`، و`--danger`، و`--info`، و`--outline`، و`--count`. ويأخذ الوسم لون نقطته من `--al-tag-color` (أحد ألوان الرسوم البيانية).

## الحالات

الشارات ثابتة. أما زر إزالة الوسم: فبلون الخطر عند التمرير، وبالإطار عند التركيز، وبهدف نقر قدره 24px.

## لوحة المفاتيح

لا يستقبل التركيز إلا زر إزالة الوسم.

## ARIA

الكلمات هي الحالة؛ والعدد يذكر اسم المعدود في نص مخفي بصريًا (فالخاصية `aria-label` على عنصر `span` لا تُقرأ: إذ لا دور للعنصر `span` حتى يُسمّى). وزر الإزالة يذكر اسم وسمه.

## من اليمين إلى اليسار

تتبع اتجاه القراءة؛ ونقطة الوسم في البداية.

## افعل

- استخدم حالة الجملة، بكلمة أو كلمتين.
- استخدم «تجريبي» للميزات التي قد تتغير، مع جملة قريبة تشرح معنى ذلك.

## لا تفعل

- الأحرف الكبيرة.
- الاعتماد على اللون وحده للتمييز بين الشارات؛ فالكلمة هي المعنى.

## الرموز

`--al-border-focus`، `--al-border-hairline`، `--al-color-accent`، `--al-color-accent-wash`، `--al-color-chart-0`، `--al-color-danger`، `--al-color-danger-wash`، `--al-color-focus`، `--al-color-info`، `--al-color-info-wash`، `--al-color-line`، `--al-color-line-strong`، `--al-color-success`، `--al-color-success-wash`، `--al-color-surface`، `--al-color-surface-sunk`، `--al-color-text`، `--al-color-text-muted`، `--al-color-warning`، `--al-color-warning-wash`، `--al-radius-sm`، `--al-size-target-min`، `--al-space-1`، `--al-space-1-5`، `--al-space-2`، `--al-tag-color`، `--al-text-sm`، `--al-text-xs`، `--al-weight-medium`
