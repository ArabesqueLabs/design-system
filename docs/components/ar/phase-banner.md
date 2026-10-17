# شريط المرحلة

> ترجمة لـ[المواصفات بالإنجليزية](../phase-banner.md). إن اختلفت الترجمة عن الأصل، فالإنجليزية هي المرجع.

يخبر الناس أن الخدمة جديدة أو تجريبية، وأين يقولون رأيهم. والإعلان، فوق كل شيء، يحمل سطرًا واحدًا من الأخبار.

**CSS:** [`css/components/phase-banner.css`](../../../css/components/phase-banner.css). **الأصناف:** `.al-phase-banner`، `.al-phase-banner__text`، `.al-announcement`، `.al-announcement__text`، `.al-announcement__dismiss`. **JS:** [`js/announcement.js`](../../../js/announcement.js) (`initAnnouncements()` و`forgetDismissal()`).

## البنية

```html
<div class="al-phase-banner">
  <span class="al-badge al-badge--warning">Experimental</span>
  <p class="al-phase-banner__text">This is new. <a href="…">Tell us what you think</a>.</p>
</div>
```

## الأنواع والأحجام

نوع واحد: شارة وجملة، تحت الترويسة.

**الإعلان** (وفي React `Announcement`): فوق الترويسة، سطر واحد من الأخبار مع رابطه («صار لكتل الشيفرة تلوين للصياغة. اطّلع على الجديد»)، في الوسط على الأرضية المعكوسة، مع زر إغلاق في النهاية. ويُتذكَّر إغلاقه بمعرّفه `data-announcement` في كل صفحة؛ والرسالة الجديدة تحتاج إلى معرّف جديد. وحيث لا يُسمح بالتخزين، يختفي من تلك الصفحة فقط.

```html
<div class="al-announcement" data-announcement="syntax-colour" role="region" aria-label="إعلان">
  <p class="al-announcement__text">صار لكتل الشيفرة تلوين للصياغة. <a href="…">اطّلع على الجديد</a></p>
  <button type="button" class="al-button al-button--icon al-button--quiet al-button--sm al-announcement__dismiss" data-dismiss aria-label="إغلاق">…الإغلاق…</button>
</div>
```

## الحالات

ثابت.

## لوحة المفاتيح

لا يستقبل التركيز إلا الرابط. ويأتي زر إغلاق الإعلان بعد رابطه؛ وبعد إغلاقه ينتقل التركيز إلى ما بعده.

## ARIA

كلمة الشارة هي التي تحمل المعنى، لا لونها. والإعلان منطقة باسم «إعلان»، فيمكن العثور عليها وتخطيها.

## من اليمين إلى اليسار

الشارة في البداية.

## افعل

- قل ما تعنيه المرحلة للناس (قد تتغير الخدمة، وقد تُعاد البيانات إلى البداية).
- اربطه بوجهة حقيقية لتلقي الآراء، أو احذف الرابط.

## لا تفعل

- إبقاؤه بعد أن تستقر الخدمة.
- استخدامه لرسائل تسويقية.
- استخدام الإعلان لأي أمر عاجل، أو عرض أكثر من إعلان؛ فقد يُغلق ولا يُرى مجددًا.

## الرموز

`--al-border-focus`، `--al-border-hairline`، `--al-color-focus-on-inverse`، `--al-color-inverse`، `--al-color-line`، `--al-color-on-inverse`، `--al-color-text-muted`، `--al-size-target-min`، `--al-space-1`، `--al-space-2`، `--al-space-3`، `--al-text-sm`
