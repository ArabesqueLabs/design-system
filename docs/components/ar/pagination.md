# ترقيم الصفحات

> ترجمة لـ[المواصفات بالإنجليزية](../pagination.md). إن اختلفت الترجمة عن الأصل، فالإنجليزية هي المرجع.

صفحات قائمة طويلة، روابطَ: «السابقة» و«التالية» بالكلمات، والأرقام حول الصفحة الحالية، والفجوات نقاط حذف.

**CSS:** [`css/components/pagination.css`](../../../css/components/pagination.css). **الأصناف:** `.al-pagination`، `.al-pagination__gap`، `.al-pagination__prev`.

## البنية

```html
<nav class="al-pagination" aria-label="Pagination">
  <ul>
    <li><a class="al-pagination__prev" href="?page=5" rel="prev"><svg class="al-icon al-icon--sm al-mirror" aria-hidden="true">…</svg>Previous</a></li>
    <li><a href="?page=1" aria-label="Page 1">1</a></li>
    <li><span class="al-pagination__gap" aria-hidden="true">…</span></li>
    <li><a href="?page=6" aria-label="Page 6" aria-current="page">6</a></li>
    …
    <li><a class="al-pagination__next" href="?page=7" rel="next">Next<svg class="al-icon al-icon--sm al-mirror" aria-hidden="true">…</svg></a></li>
  </ul>
</nav>
```

وفي React: ‏`Pagination` (`page`، `pages`، `href`، `onNavigate`)؛ وتعطي `pageRange(page, pages)` الأرقام التي يعرضها.

## الأنواع والأحجام

نوع واحد. سبعة أرقام على الأكثر: الأولى، والأخيرة، والصفحة الحالية وواحدة على كل جانب منها، والفجوات نقاط حذف. وإن كانت الصفحات سبعًا أو أقل، فكلها. واذكر عدد النتائج وأيّها فوق القائمة («النتائج من 101 إلى 120 من 240»)، لا في الترقيم.

## الحالات

الصفحة الحالية معكوسة الألوان (النص بلونه خلفيةً)، وتقول ذلك في الترميز. والتمرير على رابط يعطيه السطح الغائر. وفي الصفحة الأولى لا «سابقة»، وفي الأخيرة لا «تالية»: لا رابط معطّل، بل لا رابط.

## لوحة المفاتيح

روابط بالترتيب: يصل Tab إلى كل منها.

## ARIA

عنصر `nav` باسم «ترقيم الصفحات». وكل رقم مسمّى «الصفحة 6»؛ وللحالية `aria-current="page"`. ونقاط الحذف مخفية. و«السابقة» و«التالية» بـ`rel="prev"` و`rel="next"`.

## من اليمين إلى اليسار

يتبع الترتيب اتجاه القراءة: «السابقة» في البداية، على اليمين. وتنعكس الأسهم. والأرقام بأرقام الصفحة.

## افعل

- اجعل لكل صفحة عنوانًا خاصًا بها، ليُربط إليها ويعمل زر الرجوع في المتصفح.
- حين تتغير القائمة في مكانها، انقل التركيز إلى بدايتها وقل ما تغيّر.

## لا تفعل

- استخدامه لقائمة يقرؤها الناس إلى آخرها: حمّل المزيد، أو اعرضها كلها.
- إخفاء «السابقة» و«التالية» خلف أيقونات وحدها.

## الرموز

`--al-color-bg`، `--al-color-surface-sunk`، `--al-color-text`، `--al-color-text-muted`، `--al-radius-sm`، `--al-size-control-sm`، `--al-space-1`، `--al-space-2`، `--al-text-sm`، `--al-weight-semibold`
