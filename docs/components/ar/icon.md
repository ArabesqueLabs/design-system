# الأيقونة

> ترجمة لـ[المواصفات بالإنجليزية](../icon.md). إن اختلفت الترجمة عن الأصل، فالإنجليزية هي المرجع.

أيقونات خطية من ملف الأيقونات المجمّع. انظر [الأيقونات](../../foundations/iconography.md) (بالإنجليزية).

**CSS:** [`css/components/icon.css`](../../../css/components/icon.css). **الأصناف:** `.al-icon`، `.al-icon--lg`، `.al-icon--sm`.

## البنية

```html
<svg class="al-icon" aria-hidden="true"><use href="dist/icons.svg#al-icon-check"></use></svg>
```

## الأنواع والأحجام

الافتراضي (18px)، و`--sm` (16px)، و`--lg` (24px). و`.al-mirror` للأيقونات الاتجاهية.

المجموعة: arrow، arrow-up، board، calendar، check، chevron، chevron-down، close، copy، danger، edit، external، file، info، language، mail، menu، minus، more، plus، retry، search، settings، sidebar، success، theme، trash، undo، warning. و`copy` للنسخ (رابط، أو رقم مرجعي)؛ و`mail` لعنوان بريد إلكتروني أو لإرسال رسالة؛ و`language` بجانب رابط اللغة، حيث لا تكفي الكلمة وحدها؛ و`chevron-down` لما يُفتح إلى الأسفل (قائمة اختيار، أو عنصر قابل للطي). و`arrow-up` للعودة إلى أعلى الصفحة (العودة إلى الأعلى)؛ يشير إلى الأعلى في الاتجاهين، فلا ينعكس.

## الحالات

تأخذ لون نصها.

## لوحة المفاتيح

لا تستقبل التركيز.

## ARIA

`aria-hidden="true"`؛ والعنصر أو النص الذي بجانبها يحمل الاسم.

## من اليمين إلى اليسار

علامة الاتجاه، والسهم، والتراجع، وإعادة المحاولة، والرابط الخارجي، والشريط الجانبي تنعكس (`.al-mirror`)؛ والبقية لا.

## افعل

- اقرن أيقونات الحالة بالكلمات.

## لا تفعل

- استخدام أيقونة وحدها دون اسم يُقرأ على عنصرها.

## الرموز

`--al-size-icon`
