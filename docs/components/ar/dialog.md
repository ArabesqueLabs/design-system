# مربع الحوار

> ترجمة لـ[المواصفات بالإنجليزية](../dialog.md). إن اختلفت الترجمة عن الأصل، فالإنجليزية هي المرجع.

عنصر `<dialog>` أصلي، لقرار يحتاج انتباه الشخص الآن. ومربعات حوار التأكيد هي فقط لما لا يمكن التراجع عنه.

**CSS:** [`css/components/dialog.css`](../../../css/components/dialog.css). **JS:** [`js/dialog.js`](../../../js/dialog.js) (`openDialog`)، لمربعات الحوار التي فيها حقول. **الأصناف:** `.al-dialog`، `.al-dialog--md`، `.al-dialog__actions`، `.al-dialog__body`، `.al-dialog__discard`، `.al-dialog__inner`، `.al-dialog__title`.

## البنية

```html
<dialog class="al-dialog" id="confirm" aria-labelledby="confirm-title">
  <form method="dialog">
    <h2 class="al-dialog__title" id="confirm-title">Delete your account?</h2>
    <div class="al-dialog__body">
      <p>This deletes your account and everything in it: 12 applications, 3 offers and 40 files. It can't be undone.</p>
      <div class="al-field"><label class="al-label" for="confirm-word">To confirm, type delete</label>
        <input class="al-input" id="confirm-word" autocomplete="off" spellcheck="false"></div>
    </div>
    <div class="al-dialog__actions">
      <button class="al-button" value="cancel" autofocus>Keep my account</button>
      <button class="al-button al-button--danger al-button--primary" value="delete">Delete account and data</button>
    </div>
  </form>
</dialog>
```
افتحه بالدالة `dialog.showModal()`. تحقّق من الكلمة المكتوبة عند الإرسال، وأبقِ مربع الحوار مفتوحًا، مع خطأ بجانب الحقل، حتى تطابق؛ واجعل Enter في الحقل يعني الإجراء الذي وُجد الحقل من أجله (افتراضيًا، يُرسل Enter بالزر الأول، وهو الآمن).

مربع حوار فيه حقول لا ينبغي أن يضيع ما كُتب فيها: افتحه بالدالة `openDialog`، وأعطه شريط تجاهل التغييرات.

```html
<dialog class="al-dialog" id="rename" aria-labelledby="rename-title">
  <form method="dialog">
    <h2 class="al-dialog__title" id="rename-title">Rename item</h2>
    <div class="al-dialog__body">…fields…</div>
    <div class="al-dialog__discard" hidden role="alert">
      <p>Discard your changes?</p>
      <button type="button" class="al-button al-button--sm" data-al-keep>Keep editing</button>
      <button type="button" class="al-button al-button--sm al-button--danger" data-al-discard>Discard changes</button>
    </div>
    <div class="al-dialog__actions">
      <button class="al-button" value="cancel">Cancel</button>
      <button class="al-button al-button--primary" value="save">Save name</button>
    </div>
  </form>
</dialog>
<script type="module">
  import { openDialog } from "./js/dialog.js";
  button.addEventListener("click", () => openDialog(document.getElementById("rename"), { opener: button }));
</script>
```

## الأنواع والأحجام

`--md` (768px) للنماذج والمعاينات؛ والافتراضي 480px.

## الحالات

يُفتح بارتفاع قصير؛ وتُعتّم الخلفية الصفحة. مع `openDialog`، الإغلاق (Escape، إلغاء) بعد أن تغيّر شيء يُظهر شريط تجاهل التغييرات بدلًا من الإغلاق؛ «مواصلة التعديل» تعيد إلى الحقول، و«تجاهل التغييرات» تعيد ضبطها وتُغلق.

## لوحة المفاتيح

ينتقل التركيز إلى داخل مربع الحوار (أول حقل، أو الزر الأقل إتلافًا، مع `autofocus`)؛ ويبقى Tab بداخله؛ ومفتاح Escape يُغلق؛ ويعود التركيز إلى ما فتحه. مع `openDialog`، يُعالَج Escape قبل إغلاق المتصفح نفسه: فالمتصفحات لا تسمح للصفحة إلا برفض أول طلب إغلاق، فلولا ذلك لأغلق Escape الثاني مربع حوار فيه عمل غير محفوظ.

## ARIA

`aria-labelledby` يشير إلى العنوان. والوضع المشروط الأصلي يجعل بقية الصفحة خاملة.

## من اليمين إلى اليسار

تقع الإجراءات في النهاية (اليسار في العربية)، والرئيسي آخرها.

## افعل

- **لا تطلب التأكيد إلا لما لا رجعة فيه**: قل ما سيُفقد، وكم، وأنه لا يمكن التراجع عنه.
- سمِّ الزرين بنتيجتهما: «الإبقاء على حسابي»، «حذف الحساب والبيانات».
- للإجراءات الخطيرة، اطلب إدخالًا متعمَّدًا.

## لا تفعل

- طلب التأكيد لأي شيء يمكن التراجع عنه؛ بل نفّذه واعرض «تراجع».
- فتح مربع حوار من مربع حوار.

## الرموز

`--al-border-hairline`، `--al-color-backdrop`، `--al-color-line`، `--al-color-surface`، `--al-color-text`، `--al-duration-base`، `--al-ease-standard`، `--al-radius-sm`، `--al-size-dialog-md`، `--al-size-dialog-sm`، `--al-space-2`، `--al-space-3`، `--al-space-4`، `--al-space-6`، `--al-text-xl`
