# قائمة المهام

> ترجمة لـ[المواصفات بالإنجليزية](../task-list.md). إن اختلفت الترجمة عن الأصل، فالإنجليزية هي المرجع.

أجزاء عمل طويل، لكلٍّ منها حالته، فيُنجزها الناس بأي ترتيب ويرون ما تبقى.

**CSS:** [`css/components/task-list.css`](../../../css/components/task-list.css). **الأصناف:** `.al-task-list`، `.al-task-list__hint`، `.al-task-list__item`، `.al-task-list__name`، `.al-task-list__status`.

## البنية

```html
<ul class="al-task-list">
  <li class="al-task-list__item">
    <span class="al-task-list__name"><a href="…">Add your details</a></span>
    <span class="al-task-list__status al-badge al-badge--success">Done</span>
  </li>
  <li class="al-task-list__item">
    <span class="al-task-list__name">Review and send</span>
    <span class="al-task-list__hint">Finish the other tasks first</span>
    <span class="al-task-list__status al-badge al-badge--outline">Can't start yet</span>
  </li>
</ul>
```

## الأنواع والأحجام

الحالات: لم تبدأ، قيد التنفيذ، تمت، لا يمكن البدء بعد (مع تلميح يقول لماذا).

## الحالات

المهمة التي لا يمكن البدء بها بعد ليست رابطًا أصلًا، بدل أن تكون رابطًا معطّلًا. والمهام المنجزة تبقى روابط، كي يغيّرها الناس.

## لوحة المفاتيح

كل مهمة متاحة محطة Tab.

## ARIA

الحالة بالكلمات؛ وملخص في الأعلى يقول التقدم بالكلمات («تمت 2 من 4»).

## من اليمين إلى اليسار

الحالة في النهاية وتنعكس.

## افعل

- قل لماذا لا تتاح مهمة ما.
- دع الناس يعودون إلى المهام المنجزة.

## لا تفعل

- الاعتماد على اللون وحده للحالة.
- فرض ترتيب إلا إن اعتمدت مهمة على أخرى حقًا.

## الرموز

`--al-border-hairline`، `--al-color-accent`، `--al-color-line`، `--al-color-surface-sunk`، `--al-color-text-muted`، `--al-space-1`، `--al-space-3`، `--al-space-4`، `--al-text-sm`، `--al-weight-medium`
