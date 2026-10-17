# البطاقة واللوح والإحصائيات والاقتباس

> ترجمة لـ[المواصفات بالإنجليزية](../card.md). إن اختلفت الترجمة عن الأصل، فالإنجليزية هي المرجع.

حاويات. البطاقة سطح بإطار لشيء واحد؛ واللوح قسم من الصفحة يعلوه خط فاصل، وهو كل ما تحتاجه معظم المجموعات؛ والإحصائية رقم مع تسميته، والإحصائيات صف منها، والاقتباس ما قاله أحدهم.

**CSS:** [`css/components/card.css`](../../../css/components/card.css). **الأصناف:** `.al-card`، `.al-card--interactive`، `.al-card--selected`، `.al-card__description`، `.al-card__header`، `.al-panel`، `.al-stat`، `.al-stat__label`، `.al-stat__note`، `.al-stat__value`، `.al-stats`، `.al-quote`، `.al-quote__by`، `.al-quote__name`، `.al-quote__role`.

## البنية

```html
<article class="al-card">
  <header class="al-card__header"><h3>Production Engineer</h3><p class="al-card__description">Meta · saved today</p></header>
  <p>…</p>
  <div class="al-cluster"><a class="al-button al-button--sm" href="…">Open</a></div>
</article>

<section class="al-panel"><h2>About you</h2>…</section>

<div class="al-stat"><span class="al-stat__label">Take-home, a month</span>
  <span class="al-stat__value"><bdi>£10,075</bdi></span><span class="al-stat__note">a year: <bdi>£120,896</bdi></span></div>

<div class="al-stats">
  <div class="al-stat"><span class="al-stat__label">المكوّنات</span><span class="al-stat__value"><bdi>42</bdi></span></div>
  <div class="al-stat"><span class="al-stat__label">أزواج تباين مقيسة</span><span class="al-stat__value"><bdi>112</bdi></span><span class="al-stat__note">لا يفشل أيّ منها</span></div>
</div>
```

## الأنواع والأحجام

`--interactive` (يقوى الإطار عند التمرير؛ ورابط واحد بداخلها يغطي البطاقة)، و`--selected` (إطار ولون خفيف بلون التمييز).

**الإحصائيات**: الأرقام التي تبدأ بها الصفحة أو القسم، متجاورة وأكبر (`--al-text-3xl`)، كلٌّ بعد خط رفيع، ومن دون صندوق؛ بقدر ما يتسع الصف منها بعرض 12rem، وواحدة تحت الأخرى على الهاتف. من اثنتين إلى أربع.

**الاقتباس** (وفي React `Quote`): ما قاله أحدهم، بكلماته، ثم من هو، في `<figure>`: الكلمات في `<blockquote>` (بالخط ذي الذيل، وحولها علامات التنصيص الخاصة باللغة)، والشخص في `<figcaption>`، مع صورته أو حرفيه الأولين ([الصورة الرمزية](tint.md)). ويمكن لـ[عنوان تمهيدي](../../foundations/layout.md) فوقه أن يقول عمّ يتحدث. اثنان أو ثلاثة في شبكة؛ ولا عرض دوّار أبدًا.

```html
<figure class="al-quote">
  <blockquote><p>ما قاله، بكلماته.</p></blockquote>
  <figcaption class="al-quote__by"><span class="al-avatar" data-tint="pink" aria-hidden="true"></span>
    <span><span class="al-quote__name">اسمه</span><span class="al-quote__role">دوره، في مؤسسته</span></span></figcaption>
</figure>
```

## الحالات

التمرير (التفاعلية): الإطار بلون عناصر التحكم. التركيز: على رابط البطاقة. المحددة: لون التمييز. التحميل: هياكل مبدئية بداخلها ([التقدم](progress.md)).

## لوحة المفاتيح

البطاقة نفسها لا تستقبل التركيز؛ بل رابطها أو زرها.

## ARIA

استخدم `article` لعنصر قائم بذاته، و`section` مع عنوان للوح. ولا تلفّ بطاقة فيها أزرار داخل رابط.

## من اليمين إلى اليسار

يتبع المحتوى اتجاه القراءة؛ ولا شيء ينعكس.

## افعل

- فضّل اللوح؛ ولا تلجأ إلى البطاقة إلا حين يكون الشيء وحدة واحدة يتفاعل معها الناس.
- ضع الأرقام في `<bdi>` بأرقام متساوية العرض.
- قل ما يعدّه كل رقم، ومنذ متى، في تسميته أو ملاحظته.

## لا تفعل

- تداخل البطاقات.
- إضافة ظلال.
- اقتباس أحد دون إذنه، أو تعديل كلماته بأكثر من الاختصار.
- استخدام الإحصائيات لأرقام لا يُبنى عليها شيء، أو تقريبها حتى تفقد معناها ("أفضل بعشرة أضعاف").

## الرموز

`--al-border-hairline`، `--al-color-accent`، `--al-color-accent-wash`، `--al-color-control`، `--al-color-line`، `--al-color-line-strong`، `--al-color-surface`، `--al-color-text-muted`، `--al-duration-fast`، `--al-ease-standard`، `--al-font-display`، `--al-font-serif`، `--al-leading-prose`، `--al-leading-tight`، `--al-radius-sm`، `--al-space-1`، `--al-space-2`، `--al-space-3`، `--al-space-4`، `--al-space-5`، `--al-space-6`، `--al-text-2xl`، `--al-text-3xl`، `--al-text-lg`، `--al-text-md`، `--al-text-sm`، `--al-tracking-none`، `--al-weight-medium`
