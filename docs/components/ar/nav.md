# علامات التبويب وتنقل الأقسام

> ترجمة لـ[المواصفات بالإنجليزية](../nav.md). إن اختلفت الترجمة عن الأصل، فالإنجليزية هي المرجع.

علامات تبويب بين طرق عرض شيء واحد، وتنقل أقسام بين الصفحات؛ يتشابهان في الشكل ويختلفان في الترميز.

**CSS:** [`css/components/nav.css`](../../../css/components/nav.css). **الأصناف:** `.al-tab`، `.al-tab__count`، `.al-tabpanel`، `.al-tabs`، `.al-feature-tabs`، `.al-feature-tabs__list`، `.al-feature-tabs__panel`، `.al-feature-tab`، `.al-feature-tab__name`، `.al-feature-tab__about`.

## البنية

روابط بين الصفحات:
```html
<nav aria-label="Offers"><div class="al-tabs">
  <a class="al-tab" href="/calc" aria-current="page">Calculator</a>
  <a class="al-tab" href="/offers">Offers <span class="al-tab__count">3</span></a>
</div></nav>
```
علامات تبويب داخل الصفحة (`js/tabs.js`، `initTabs()`):
```html
<div class="al-tabs" role="tablist" aria-label="Take-home pay">
  <button class="al-tab" role="tab" id="t1" aria-controls="p1" aria-selected="true">Calculator</button>
  <button class="al-tab" role="tab" id="t2" aria-controls="p2" aria-selected="false" tabindex="-1">Offers</button>
</div>
<div class="al-tabpanel" role="tabpanel" id="p1" aria-labelledby="t1">…</div>
```

## الأنواع والأحجام

مع الأعداد (`__count`). وتتمرر أفقيًا حين تكثر فلا تتسع.

**تبويبات الميزات** (`.al-feature-tabs`؛ وفي React `FeatureTabs`): عمود من التبويبات، لكلٍّ اسم وسطر عنه، بجانب اللوح الذي يعرضه المختار منها: عيّنة شيفرة، أو صورة له وهو يعمل، أو بضعة أرقام. لقسم «ما يفعله» في صفحة منتج، من ثلاثة إلى ستة. وقائمة التبويبات `aria-orientation="vertical"`؛ وللتبويب المختار شريط بلون التمييز في بدايته والسطح الغائر. وتحت md يقع العمود فوق اللوح.

```html
<div class="al-feature-tabs">
  <div class="al-feature-tabs__list" role="tablist" aria-label="ما يفعله" aria-orientation="vertical">
    <button class="al-feature-tab" role="tab" id="f1" aria-controls="fp1" aria-selected="true" aria-labelledby="f1-name" aria-describedby="f1-about">
      <span class="al-feature-tab__name" id="f1-name">من اليمين إلى اليسار</span>
      <span class="al-feature-tab__about" id="f1-about">الخصائص المنطقية تنعكس مع الصفحة.</span>
    </button>
    …
  </div>
  <div class="al-feature-tabs__panel" role="tabpanel" id="fp1" aria-labelledby="f1-name">…</div>
</div>
```

## الحالات

التمرير: لون النص. الحالية/المحددة: لون النص وخط سفلي بعرض 2px بلون التمييز. التركيز: إطار التركيز في النظام.

## لوحة المفاتيح

تنقل الأقسام: Tab. علامات التبويب: Tab يدخل إلى العلامة المحددة؛ والسهمان الأيسر والأيمن (معكوسان في الكتابة من اليمين إلى اليسار) يتنقلان ويحددان؛ وHome وEnd يقفزان. تبويبات الميزات: السهمان العلوي والسفلي يتنقلان ويحددان.

## ARIA

`aria-current="page"` للروابط؛ و`tablist`/`tab`/`tabpanel` مع `aria-selected`، و`aria-controls`، و`tabindex` متنقل لعلامات التبويب.

## من اليمين إلى اليسار

يتبع الترتيب اتجاه القراءة؛ وتتبعه مفاتيح الأسهم أيضًا.

## افعل

- استخدم علامات التبويب لطرق عرض الشيء نفسه؛ والروابط لصفحات مختلفة.
- أعطِ كل تبويب ميزة سطرًا يقول ما يفعله للناس، لا ما اسمه.

## لا تفعل

- استخدام علامات التبويب لخطوات في تسلسل.
- إخفاء معنى العدد: «العروض 3» تُقرأ بشكل طبيعي؛ وأعطِ الرقم المجرد كلمات في `aria-label` إن لزم.

## الرموز

`--al-border-focus`، `--al-border-hairline`، `--al-color-accent`، `--al-color-focus`، `--al-color-line`، `--al-color-surface-sunk`، `--al-color-text`، `--al-color-text-muted`، `--al-size-control-md`، `--al-space-1`، `--al-space-1-5`، `--al-space-2`، `--al-space-3`، `--al-space-4`، `--al-space-5`، `--al-space-8`، `--al-text-sm`، `--al-text-xs`، `--al-weight-medium`
