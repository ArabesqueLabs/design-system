# الشريط الجانبي

> ترجمة لـ[المواصفات بالإنجليزية](../sidebar.md). إن اختلفت الترجمة عن الأصل، فالإنجليزية هي المرجع.

أقسام التطبيق في عمود يمكن طيّه إلى أيقونات. وتحت نقطة التوقف `md` يصير شريطًا في الأعلى، فيه اسم القسم الحالي وزر القائمة؛ وتنزل الأقسام والأسفل تحته، كما تفعل قائمة [ترويسة الموقع](site-header.md). يُستخدم داخل `.al-shell` ([التخطيط](../../foundations/layout.md)، بالإنجليزية).

**CSS:** [`css/components/sidebar.css`](../../../css/components/sidebar.css). **JS:** [`js/sidebar.js`](../../../js/sidebar.js) (`initSidebars()`). **الأصناف:** `.al-icon`، `.al-sidebar`، `.al-sidebar__bar`، `.al-sidebar__here`، `.al-sidebar__toggle`، `.al-sidebar__menu`، `.al-sidebar__collapse`، `.al-sidebar__foot`، `.al-sidebar__label`، `.al-sidebar__link`، `.al-sidebar__nav`.

## البنية

```html
<div class="al-shell" data-sidebar="">
  <aside class="al-sidebar">
    <div class="al-sidebar__bar">
      <span class="al-sidebar__here">Tracking board</span>
      <button type="button" class="al-button al-button--icon al-button--quiet al-sidebar__toggle" data-sidebar-menu-toggle aria-controls="sidebar-menu" aria-expanded="false" aria-label="Menu">
        <svg class="al-icon al-sidebar__open" aria-hidden="true">…menu…</svg><svg class="al-icon al-sidebar__close" aria-hidden="true">…close…</svg>
      </button>
    </div>
    <div class="al-sidebar__menu" id="sidebar-menu">
      <nav class="al-sidebar__nav" aria-label="Sections">
        <a class="al-sidebar__link" href="/board" aria-current="page"><svg class="al-icon" aria-hidden="true">…</svg><span class="al-sidebar__label">Tracking board</span></a>
      </nav>
      <div class="al-sidebar__foot">
        <button type="button" class="al-sidebar__link al-sidebar__collapse" aria-expanded="true">
          <svg class="al-icon al-mirror" aria-hidden="true">…sidebar…</svg><span class="al-sidebar__label">Collapse sidebar</span></button>
      </div>
    </div>
  </aside>
  <main>…</main>
</div>
<script type="module">
  import { initSidebars } from "./js/sidebar.js";
  initSidebars();
</script>
```

لا يظهر الشريط إلا تحت `md`؛ وفوقها يتنحّى `.al-sidebar__menu` (`display: contents`)، فيبقى التنقل والأسفل في العمود كما كانا. وضع اسم القسم الحالي في `.al-sidebar__here`، ليعرف من يستخدم الهاتف أين هو دون أن يفتح القائمة.

## الأنواع والأحجام

الكامل (224px) والمطويّ (`data-sidebar="collapsed"` على الغلاف، 60px). واحفظ اختيار كل شخص. وتحت `md` شكل واحد: تُظهر القائمة كل الأسماء، مطويًّا كان أم لا، ويُخفى زر الطيّ.

## الحالات

التمرير: لون النص، وسطح فاتح. الحالي: السطح، ووزن متوسط، وحافة وأيقونة بلون التمييز. التركيز: إطار التركيز في النظام.

وتحت `md`، مغلقًا: الشريط وحده. مفتوحًا: الأقسام، كلٌّ في صف أعلى ليسهل لمسه، ثم الأسفل تحت خطه؛ وتصير أيقونة زر القائمة علامة إغلاق. والقائمة الطويلة تُمرَّر، ويبقى الشريط في أعلاها.

## لوحة المفاتيح

Tab بين الروابط؛ وزر الطيّ يقلب بالمفتاح Enter أو المسافة. وتحت `md` يفتح زر القائمة القائمة ويغلقها بالمفتاح Enter أو المسافة؛ وEscape يغلقها ويعيد التركيز إلى الزر؛ واختيار رابط يغلقها.

## ARIA

عنصر `nav` مسمّى؛ و`aria-current="page"`. وعند الطيّ، تُخفى التسميات بصريًا لكنها تبقى مقروءة؛ وأضف تلميح أدوات (`title` أو `data-al-tip`) بالاسم. ولزر الطيّ `aria-expanded` وتسمية تقول ما الذي سيفعله. ولزر القائمة `aria-expanded` و`aria-controls`؛ ويبقى اسمه «القائمة»، وتقول حالته إن كانت مفتوحة.

## من اليمين إلى اليسار

على اليمين في العربية، وحافته وعلامة العنصر الحالي في جهة البداية؛ وتنعكس أيقونة الطيّ.

## افعل

- اقتصر على سبعة أقسام أو أقل، والإعدادات في الأسفل.
- حمّل `js/sidebar.js`: فبدونه تبقى القائمة مغلقة على الهاتف.

## لا تفعل

- إخفاء اسم قسم دون تلميح أدوات.

## الرموز

`--al-border-hairline`، `--al-color-accent`، `--al-color-line`، `--al-color-surface`، `--al-color-surface-sunk`، `--al-color-text`، `--al-color-text-muted`، `--al-radius-sm`، `--al-size-control-md`، `--al-size-control-sm`، `--al-space-0-5`، `--al-space-1`، `--al-space-2`، `--al-space-3`، `--al-space-5`، `--al-space-6`، `--al-weight-medium`، `--al-z-sticky`
