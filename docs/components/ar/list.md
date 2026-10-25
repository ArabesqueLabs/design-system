# القائمة

> ترجمة لـ[المواصفات بالإنجليزية](../list.md). إن اختلفت الترجمة عن الأصل، فالإنجليزية هي المرجع.

أشياء من نوع واحد، كل منها في صف، بينها خطوط رفيعة: إشعارات، وصندوق وارد، ونتائج، وملفات سجلّ.

**CSS:** [`css/components/list.css`](../../../css/components/list.css). **الأصناف:** `.al-list`، `.al-list--flush`، `.al-list__description`، `.al-list__end`، `.al-list__item`، `.al-list__text`، `.al-list__title`.

## البنية

```html
<ul class="al-list" role="list" aria-label="Notifications">
  <li>
    <a class="al-list__item" href="…">
      <span class="al-status al-status--info"><span class="al-visually-hidden">Unread</span></span>
      <span class="al-list__text">
        <span class="al-list__title">Lina approved your request</span>
        <span class="al-list__description">The team can start on Monday.</span>
      </span>
      <span class="al-list__end">2 min</span>
    </a>
  </li>
</ul>
```

وفي React: ‏`List` (`rows`: ‏`title`، `description`، `start`، `end`، `href`، `current`، `disabled`؛ و`flush`، `label`).

## الأنواع والأحجام

بإطار (الافتراضية)، أو `--flush`، بلا إطار خاص بها، داخل بطاقة أو نافذة منبثقة أو قائمة إجراءات. والصف رابط (`a.al-list__item`) أو لا (`div.al-list__item`). وقد يبدأ بصورة رمزية أو أيقونة أو حالة، وينتهي بقيمة أو وقت أو إجراء صغير واحد.

## الحالات

الصف المرتبط: السطح الغائر عند التمرير، وإطار التركيز داخل حافته. والمفتوح منها: شريط بلون التمييز في بدايته، على غسلة التمييز، و`aria-current`. وغير المتاح: باهت، ولا يُوصل إليه (اذكر السبب قريبًا).

## لوحة المفاتيح

كل صف مرتبط محطة تبويب واحدة؛ ولا شيء داخله يستقبل التركيز وحده.

## ARIA

قائمة (`role="list"`، إذ تُسقطها بعض قارئات الشاشة حين تُزال النقاط بالتنسيق)، مسمّاة حين لا يقول شيء قريب ما هي. ونص الصف المرتبط هو اسمه، فاجعله قصيرًا؛ ويُقرأ الوصف بعده. والحالة بلا كلمة ظاهرة تقولها بنص مخفي.

## من اليمين إلى اليسار

تتبع اتجاه القراءة: عنصر البداية على اليمين، وعنصر النهاية على اليسار؛ وشريط الصف الحالي على اليمين.

## افعل

- سطر واحد للعنوان، وسطر للوصف؛ ويُقتطع الوصف.
- جدول حين يقارن الناس القيم عبر الصفوف.

## لا تفعل

- وضع عدة إجراءات في صف: افتحه، وتصرّف هناك، أو استخدم قائمة إجراءات في نهايته.
- خلط أنواع من الأشياء في قائمة واحدة.

## الرموز

`--al-border-focus`، `--al-border-hairline`، `--al-color-accent`، `--al-color-accent-wash`، `--al-color-line`، `--al-color-surface`، `--al-color-surface-sunk`، `--al-color-text`، `--al-color-text-muted`، `--al-radius-sm`، `--al-size-control-md`، `--al-space-0-5`، `--al-space-3`، `--al-space-4`، `--al-text-sm`، `--al-weight-medium`
