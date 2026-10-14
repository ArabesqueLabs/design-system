# القائمة

> ترجمة لـ[المواصفات بالإنجليزية](../menu.md). إن اختلفت الترجمة عن الأصل، فالإنجليزية هي المرجع.

إجراءات على شيء واحد، خلف زر («المزيد»، «نقل إلى…»)، في نافذة منبثقة أصلية. والملف `js/menu.js` (`initMenus()`) ينفّذ نمط زر القائمة في ARIA APG.

**CSS:** [`css/components/menu.css`](../../../css/components/menu.css). **الأصناف:** `.al-menu`، `.al-menu__item`، `.al-menu__item--danger`، `.al-menu__label`، `.al-menu__separator`.

## البنية

```html
<button type="button" class="al-button" aria-haspopup="menu" aria-expanded="false" popovertarget="move-menu">Move to… <svg class="al-icon al-mirror" aria-hidden="true">…chevron…</svg></button>
<div class="al-menu" id="move-menu" popover role="menu" aria-label="Move to">
  <button type="button" class="al-menu__item" role="menuitem">Applied</button>
  <button type="button" class="al-menu__item" role="menuitem">Interviewing</button>
  <hr class="al-menu__separator">
  <button type="button" class="al-menu__item al-menu__item--danger" role="menuitem">Archive</button>
</div>
```

## الأنواع والأحجام

العناصر، و`menuitemradio`/`menuitemcheckbox` مع `aria-checked` (علامة صح في النهاية)، وتسميات المجموعات (`__label`)، والفواصل، وعناصر الخطر (في الآخر).

## الحالات

التمرير والتركيز: خلفية غائرة؛ ويضيف التركيز إطارًا داخليًا. تُفتح تحت زرها (وفوقه إن لم يتسع المكان)، وتتبعه ما دامت مفتوحة.

## لوحة المفاتيح

Enter أو المسافة أو السهم السفلي يفتحها وينقل التركيز إلى أول عنصر؛ والسهمان العلوي والسفلي يتنقلان، وHome وEnd يقفزان؛ وEnter يختار؛ وEscape يُغلق ويعيد التركيز إلى الزر؛ وTab يُغلق.

## ARIA

الزر: `aria-haspopup="menu"`، و`aria-expanded`. القائمة: `role="menu"`، مسمّاة. العناصر: `role="menuitem"`.

## من اليمين إلى اليسار

تُحاذى إلى حافة بداية الزر (اليمين في العربية).

## افعل

- ضع عناصر الإتلاف في الآخر، بعد فاصل.
- استخدم «نقل إلى…» للنقل بخطوة واحدة بدل نموذج تعديل.

## لا تفعل

- إخفاء الإجراء الرئيسي في قائمة.
- استخدام قائمة للتنقل؛ بل استخدم الروابط.

## الرموز

`--al-border-focus`، `--al-border-hairline`، `--al-color-accent`، `--al-color-danger`، `--al-color-focus`، `--al-color-line`، `--al-color-surface`، `--al-color-surface-sunk`، `--al-color-text`، `--al-color-text-muted`، `--al-radius-sm`، `--al-size-control-sm`، `--al-space-1`، `--al-space-1-5`، `--al-space-2`، `--al-space-3`، `--al-text-xs`
