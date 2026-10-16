# ترويسة الموقع

> ترجمة لـ[المواصفات بالإنجليزية](../site-header.md). إن اختلفت الترجمة عن الأصل، فالإنجليزية هي المرجع.

الشريط العلوي للموقع: التركيبة (الصفحة الرئيسية)، وأقسام الصفحة، وأدوات اللغة والمظهر. وتحت نقطة التوقف md تُطوى الأقسام في قائمة تنسدل تحت الشريط. كما في arabesquelabs.com. أما للتطبيقات فاستخدم [الشريط الجانبي](sidebar.md).

**CSS:** [`css/components/site-header.css`](../../../css/components/site-header.css). **JS:** [`js/site-header.js`](../../../js/site-header.js) (`initSiteHeaders()`). **الأصناف:** `.al-site-header`، `.al-site-header--sticky`، `.al-site-header__bar`، `.al-site-header__lockup`، `.al-site-header__end`، `.al-site-header__nav`، `.al-site-header__tools`، `.al-site-header__toggle`، `.al-site-header__menu`.

## البنية

```html
<header class="al-site-header">
  <div class="al-page al-site-header__bar">
    <a class="al-lockup al-site-header__lockup" href="/ar/"><svg class="al-mark" aria-hidden="true">…</svg><span class="al-wordmark" lang="ar">معامل آرابيسك</span></a>
    <div class="al-site-header__end">
      <nav class="al-site-header__nav" aria-label="الأقسام"><ul><li><a href="#idea">الفكرة</a></li>…</ul></nav>
      <div class="al-site-header__tools">
        <a class="al-language" href="/" hreflang="en" lang="en">English</a>
        <button type="button" class="al-button al-button--icon al-button--quiet" data-theme-toggle aria-label="التبديل إلى المظهر الداكن">…</button>
        <button type="button" class="al-button al-button--icon al-button--quiet al-site-header__toggle" data-site-menu-toggle aria-controls="site-menu" aria-expanded="false" aria-label="القائمة">…</button>
      </div>
    </div>
  </div>
  <nav class="al-page al-site-header__menu" id="site-menu" aria-label="الأقسام" hidden><ul>…الروابط نفسها…</ul></nav>
</header>
<script type="module">
  import { initSiteHeaders } from "./js/site-header.js";
  initSiteHeaders();
</script>
```

## الأنواع والأحجام

نوع واحد. بارتفاع 5rem، و4rem تحت md. ضعها داخل قسم `.al-pattern--hero` لتقع على نمط القسم الافتتاحي. و`--sticky` يبقيها في أعلى النافذة أثناء تمرير الصفحة، على خلفية الصفحة وتحتها خط رفيع (لا فوق القسم الافتتاحي).

وتنطوي بحسب عرضها هي، لا عرض النافذة (استعلام حاوية): في شريط جانبي أو معاينة ضيقة، يظهر زر قائمتها هناك أيضًا.

## الحالات

**القواعد:**
- روابط الأقسام بلون `--al-color-text-muted`، و`--al-color-text` عند التمرير. والصفحة أو القسم الحالي (`aria-current`) بلون `--al-color-text`، وتحته خط بلون التمييز.
- رابط اللغة ([رابط اللغة](language-switch.md)) يسمّي اللغة الأخرى بلغتها، مع `lang` و`hreflang`؛ ولكل لغة عنوانها.
- زر المظهر يسمّي ما يفعله ("التبديل إلى المظهر الداكن")، ويتغير اسمه عند الضغط (`js/theme.js`). ويدور قرصه نصف المملوء في المظهر الداكن.
- تحت md، تُخفى روابط الأقسام ويظهر زر القائمة؛ وتعرض القائمة الروابط نفسها، أكبر، رابطًا في كل سطر.

## لوحة المفاتيح

يصل Tab إلى التركيبة، فكل رابط قسم، فرابط اللغة، فزر المظهر، ثم زر القائمة تحت md. ويفتح Enter أو Space القائمة ويغلقها؛ ويغلقها Escape ويعيد التركيز إلى الزر؛ واختيار رابط يغلقها.

## ARIA

الشريط معلم `header` فيه `nav` باسم "الأقسام" (وتتشارك القائمتان الاسم: لا تظهر إلا واحدة في كل مرة). ولزر القائمة `aria-expanded` و`aria-controls`؛ ويبقى اسمه "القائمة"، وتقول حالته إن كانت مفتوحة.

## من اليمين إلى اليسار

تقع التركيبة في البداية (اليمين)، والأدوات في النهاية؛ ولا تنعكس التركيبة نفسها. وفي الصفحات العربية يُكتب الشعار النصي "معامل آرابيسك" ([من اليمين إلى اليسار](../../rtl.md)).

## افعل

- اكتفِ بثلاثة أقسام أو أربعة.
- ضع رابط التخطي قبلها (في `SiteHeader` بـReact رابط منه).

## لا تفعل

- وضع إجراءات غير اللغة والمظهر في الشريط؛ فالإجراء الرئيسي للصفحة مكانه القسم الافتتاحي.

## الرموز

`--al-color-text`، `--al-color-text-muted`، `--al-color-accent`، `--al-color-bg`، `--al-color-line`، `--al-z-sticky`، `--al-duration-base`، `--al-text-lg`، `--al-border-hairline`، `--al-duration-fast`، `--al-ease-standard`، `--al-space-2`، `--al-space-4`، `--al-space-6`، `--al-space-8`
