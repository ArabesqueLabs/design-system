# التغييرات المعلّقة: حالة الحفظ، والحقل المتغيّر، والتراجع التلقائي، والنتائج القديمة

> ترجمة لـ[المواصفات بالإنجليزية](../save-state.md). إن اختلفت الترجمة عن الأصل، فالإنجليزية هي المرجع.

هل حُفظ التغيير، وما الذي تغيّر ولم يُحفظ، وتغيير متفائل فشل فأُعيد إلى ما كان، ونتيجة لم تعد تطابق مدخلاتها. انظر [التفاعل](../../interaction.md) (بالإنجليزية) §5–7.

**CSS:** [`css/components/save-state.css`](../../../css/components/save-state.css). **الأصناف:** `.al-icon`، `.al-rollback-note`، `.al-rolled-back`، `.al-save-state`، `.al-stale`، `.al-stale-note`.

## البنية

حالة الحفظ، بجانب عنوان النموذج أو زر الحفظ:
```html
<span class="al-save-state" role="status" data-state="unsaved">Unsaved changes</span>
<!-- saving → "Saving…", saved → "Saved", failed → -->
<span class="al-save-state" role="status" data-state="failed">Couldn't save <button class="al-button al-button--quiet al-button--sm">Retry</button></span>
```
الحقل المتغيّر: `data-changed` على `.al-field` مع `<p class="al-field__changed">Changed, not saved</p>` ([الحقل](field.md)).

المُعاد إلى ما كان (تغيير متفائل فشل):
```html
<li class="al-rolled-back">Meta
  <p class="al-rollback-note" role="alert"><svg class="al-icon al-icon--sm" aria-hidden="true">…danger…</svg>
    <span>Couldn't archive Meta: the server didn't answer. It's back where it was.</span>
    <button class="al-button al-button--sm">Retry</button></p></li>
```
النتيجة القديمة:
```html
<p class="al-stale-note"><span class="al-spinner" aria-hidden="true"></span>Working out again…</p>
<p class="al-stale">Take-home, a month: <strong><bdi>£6,010</bdi></strong></p>
```

## الأنواع والأحجام

| `data-state` | يُظهر | اللون |
|---|---|---|
| `unsaved` | «تغييرات غير محفوظة»، ونقطة | التحذير |
| `saving` | «جارٍ الحفظ…»، ومؤشر دوّار | باهت |
| `saved` | «تم الحفظ»، وعلامة صح | النجاح |
| `failed` | «تعذّر الحفظ» + إعادة المحاولة | الخطر |

## الحالات

كما سبق. وعند تقليل الحركة، يصبح مؤشر الحفظ الدوّار حلقة منقّطة ساكنة. ويخفت الرقم القديم وتقول الملاحظة لماذا.

## لوحة المفاتيح

«إعادة المحاولة» زر؛ وبعد الإعادة إلى ما كان، ينتقل التركيز إليه (فالعنصر الذي بدأ الإجراء قد زال).

## ARIA

حالة الحفظ `role="status"` (مهذّبة). وملاحظة الإعادة `role="alert"`. وملاحظة القِدَم نص، فلا يكون الخفوت الإشارة الوحيدة.

## من اليمين إلى اليسار

الأيقونات والحواف في جهة البداية.

## افعل

- الكلمات دائمًا، ولا نقطة ملوّنة وحدها أبدًا.
- أبقِ رسائل الفشل والإعادة حتى يتصرف الشخص.
- قل أي مُدخل غيّر الرقم المعاد حسابه حين لا يكون ذلك واضحًا.

## لا تفعل

- استبدال رقم دون تنبيه.
- وضع رسالة الإعادة في إشعار عابر يختفي.
- استخدام التحديثات المتفائلة لعمل بطيء أو لا رجعة فيه.

## الرموز

`--al-border-focus`، `--al-color-danger`، `--al-color-danger-wash`، `--al-color-success`، `--al-color-text-muted`، `--al-color-warning`، `--al-duration-fast`، `--al-ease-standard`، `--al-size-target-min`، `--al-space-1-5`، `--al-space-3`، `--al-text-sm`
