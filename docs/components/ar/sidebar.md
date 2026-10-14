# الشريط الجانبي

> ترجمة لـ[المواصفات بالإنجليزية](../sidebar.md). إن اختلفت الترجمة عن الأصل، فالإنجليزية هي المرجع.

أقسام التطبيق في عمود يمكن طيّه إلى أيقونات؛ وشريط قابل للتمرير في الأعلى تحت نقطة التوقف `md`. يُستخدم داخل `.al-shell` ([التخطيط](../../foundations/layout.md)، بالإنجليزية).

**CSS:** [`css/components/sidebar.css`](../../../css/components/sidebar.css). **الأصناف:** `.al-icon`، `.al-sidebar`، `.al-sidebar__collapse`، `.al-sidebar__foot`، `.al-sidebar__label`، `.al-sidebar__link`، `.al-sidebar__nav`.

## البنية

```html
<div class="al-shell" data-sidebar="">
  <aside class="al-sidebar">
    <nav class="al-sidebar__nav" aria-label="Sections">
      <a class="al-sidebar__link" href="/board" aria-current="page"><svg class="al-icon" aria-hidden="true">…</svg><span class="al-sidebar__label">Tracking board</span></a>
    </nav>
    <div class="al-sidebar__foot">
      <button type="button" class="al-sidebar__link al-sidebar__collapse" aria-expanded="true">
        <svg class="al-icon al-mirror" aria-hidden="true">…sidebar…</svg><span class="al-sidebar__label">Collapse sidebar</span></button>
    </div>
  </aside>
  <main>…</main>
</div>
```

## الأنواع والأحجام

الكامل (224px) والمطويّ (`data-sidebar="collapsed"` على الغلاف، 60px). واحفظ اختيار كل شخص.

## الحالات

التمرير: لون النص، وسطح فاتح. الحالي: السطح، ووزن متوسط، وحافة وأيقونة بلون التمييز. التركيز: إطار التركيز في النظام.

## لوحة المفاتيح

Tab بين الروابط؛ وزر الطيّ يقلب بالمفتاح Enter أو المسافة.

## ARIA

عنصر `nav` مسمّى؛ و`aria-current="page"`. وعند الطيّ، تُخفى التسميات بصريًا لكنها تبقى مقروءة؛ وأضف تلميح أدوات (`title` أو `data-al-tip`) بالاسم. ولزر الطيّ `aria-expanded` وتسمية تقول ما الذي سيفعله.

## من اليمين إلى اليسار

على اليمين في العربية، وحافته وعلامة العنصر الحالي في جهة البداية؛ وتنعكس أيقونة الطيّ.

## افعل

- اقتصر على سبعة أقسام أو أقل، والإعدادات في الأسفل.

## لا تفعل

- إخفاء اسم قسم دون تلميح أدوات.

## الرموز

`--al-border-hairline`، `--al-color-accent`، `--al-color-line`، `--al-color-surface`، `--al-color-surface-sunk`، `--al-color-text`، `--al-color-text-muted`، `--al-radius-sm`، `--al-size-control-sm`، `--al-space-0-5`، `--al-space-1`، `--al-space-2`، `--al-space-3`، `--al-space-5`، `--al-space-6`، `--al-weight-medium`، `--al-z-sticky`
