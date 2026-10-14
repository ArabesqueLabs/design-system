# علامات التبويب وتنقل الأقسام

> ترجمة لـ[المواصفات بالإنجليزية](../nav.md). إن اختلفت الترجمة عن الأصل، فالإنجليزية هي المرجع.

علامات تبويب بين طرق عرض شيء واحد، وتنقل أقسام بين الصفحات؛ يتشابهان في الشكل ويختلفان في الترميز.

**CSS:** [`css/components/nav.css`](../../../css/components/nav.css). **الأصناف:** `.al-tab`، `.al-tab__count`، `.al-tabpanel`، `.al-tabs`.

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

## الحالات

التمرير: لون النص. الحالية/المحددة: لون النص وخط سفلي بعرض 2px بلون التمييز. التركيز: إطار التركيز في النظام.

## لوحة المفاتيح

تنقل الأقسام: Tab. علامات التبويب: Tab يدخل إلى العلامة المحددة؛ والسهمان الأيسر والأيمن (معكوسان في الكتابة من اليمين إلى اليسار) يتنقلان ويحددان؛ وHome وEnd يقفزان.

## ARIA

`aria-current="page"` للروابط؛ و`tablist`/`tab`/`tabpanel` مع `aria-selected`، و`aria-controls`، و`tabindex` متنقل لعلامات التبويب.

## من اليمين إلى اليسار

يتبع الترتيب اتجاه القراءة؛ وتتبعه مفاتيح الأسهم أيضًا.

## افعل

- استخدم علامات التبويب لطرق عرض الشيء نفسه؛ والروابط لصفحات مختلفة.

## لا تفعل

- استخدام علامات التبويب لخطوات في تسلسل.
- إخفاء معنى العدد: «العروض 3» تُقرأ بشكل طبيعي؛ وأعطِ الرقم المجرد كلمات في `aria-label` إن لزم.

## الرموز

`--al-border-hairline`، `--al-color-accent`، `--al-color-line`، `--al-color-text`، `--al-color-text-muted`، `--al-size-control-md`، `--al-space-1`، `--al-space-1-5`، `--al-space-2`، `--al-space-3`، `--al-space-5`، `--al-text-xs`، `--al-weight-medium`
