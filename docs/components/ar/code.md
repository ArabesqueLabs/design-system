# الشيفرة والأمر

> ترجمة لـ[المواصفات بالإنجليزية](../code.md). إن اختلفت الترجمة عن الأصل، فالإنجليزية هي المرجع.

شيفرة تُقرأ أو تُنسخ، بلغة واحدة أو بعدة لغات، من اليسار إلى اليمين دائمًا؛ وأمر، سطر واحد يُلصق في الطرفية.

**CSS:** [`css/components/code.css`](../../../css/components/code.css). **JS:** [`js/copy.js`](../../../js/copy.js) (`initCopy()`)، و[`js/highlight.js`](../../../js/highlight.js) (`highlightCode()` و`tokenize()`)، و[`js/tabs.js`](../../../js/tabs.js) لعدة لغات. **الأصناف:** `.al-code`، `.al-code__bar`، `.al-code__caption`، `.al-code__tabs`، `.al-code__tab`، `.al-code__copy`، `.al-code__copy-idle`، `.al-code__copy-done`، `.al-code__pre`، `.al-code__line`، `.al-code__line--mark`، `.al-command`، `.al-command--prompt`، `.al-syntax-keyword`، `.al-syntax-string`، `.al-syntax-number`، `.al-syntax-comment`، `.al-syntax-function`، `.al-syntax-tag`، `.al-syntax-attribute`.

## البنية

```html
<div class="al-code">
  <div class="al-code__bar">
    <span class="al-code__caption">css/components/code.css</span>
    <button type="button" class="al-button al-button--quiet al-button--sm al-code__copy" data-copy
      data-label-copy="انسخ" data-label-copied="نُسخ" data-label-failed="تعذّر النسخ. النص محدّد لتنسخه بنفسك.">
      <svg class="al-icon al-code__copy-idle" aria-hidden="true">…النسخ…</svg><svg class="al-icon al-code__copy-done" aria-hidden="true">…علامة الصح…</svg>
      <span data-copy-label>انسخ</span>
    </button>
  </div>
  <pre class="al-code__pre" dir="ltr" tabindex="0"><code><span class="al-code__line">.al-code__pre {</span>
<mark class="al-code__line al-code__line--mark">  direction: ltr;</mark>
<span class="al-code__line">}</span></code></pre>
  <span class="al-visually-hidden" role="status" data-copy-status></span>
</div>

<div class="al-command al-command--prompt">
  <code dir="ltr">npm run build</code>
  <button type="button" class="al-button al-button--quiet al-button--sm al-code__copy" data-copy …>…</button>
  <span class="al-visually-hidden" role="status" data-copy-status></span>
</div>
<script type="module">
  import { initCopy } from "./js/copy.js";
  import { highlightCode } from "./js/highlight.js";
  highlightCode(); // every <pre><code class="language-css">…
  initCopy();
</script>
```

وفي React: `CodeBlock` (`code` و`language` و`mark` و`caption`؛ أو `samples` و`label` لعدة لغات) و`Command`.

## الأنواع والأحجام

- **عيّنة واحدة**، مع تسمية (اسم الملف، أو ما هي الشيفرة) أو من دونها.
- **عدة لغات**: الشيفرة نفسها في تبويبات على الشريط ("HTML" و"React")، مع `role="tablist"` مسمّى بما تختار بينه، وكل عيّنة في `tabpanel` خاص بها ([التبويبات](nav.md)).
- **أسطر مُعلَّمة**: عنصر `<mark>` حول كل سطر ينبغي أن ينظر إليه القارئ، مع شريط بلون التمييز في بدايته ولون التمييز الخفيف خلفه. علّم السطرين أو الثلاثة التي يتحدث عنها النص حولها.
- **من دون زر نسخ**، لشيفرة تُقرأ فقط.
- **تلوين الصياغة**: أعطِ الشيفرة لغتها (`class="language-tsx"`، أو `language` في React) فيأخذ كل نوع من الكلمات لونه: الكلمات المحجوزة، والنصوص، والأرقام (و`true` و`false` و`null`)، والتعليقات (مائلة أيضًا)، والدوال، والوسوم (وسوم HTML وJSX، والأنواع، والمكوّنات)، والسمات (أسماء السمات والخصائص وخصائص CSS). وتبقى علامات الترقيم وسائر الأسماء بلون النص. يقرأ `js/highlight.js` لغات JavaScript وTypeScript وJSX، وHTML (مع نصوصها البرمجية وأنماطها)، وCSS، وJSON، والطرفية؛ وتبقى اللغات الأخرى بلا تلوين.
- **الأمر**: سطر واحد، ضمن النص، قبله `$` (`--prompt`) يظهر ولا يُنسخ ولا يُقرأ أبدًا. للشيء الوحيد الذي يُشغَّل: تثبيت أو بناء.

## الحالات

يعرض زر النسخ علامة صح و"نُسخ" لثانيتين، وتقولها منطقة الحالة أيضًا. وإن رفض المتصفح الحافظة، تُحدَّد الشيفرة بدلًا من ذلك، ويقول الزر ذلك، لتُنسخ يدويًا. التبويبات: المحدد (سطح وإطار)، والتمرير، والتركيز.

## لوحة المفاتيح

يصل Tab إلى التبويبات (محطة واحدة: تنتقل الأسهم بينها، ويقفز Home وEnd)، ثم زر النسخ، ثم الشيفرة نفسها، التي تُمرَّر بالأسهم حين تكون أعرض من صندوقها.

## ARIA

صندوق الشيفرة يستقبل التركيز (`tabindex="0"`)، ليُمرَّر من دون فأرة. والأسطر المعلّمة عناصر `<mark>`، يمكن لقارئات الشاشة أن تعلن أنها مميَّزة. ويبقى لزر النسخ اسمه الظاهر؛ وما حدث يُقال في منطقة `role="status"`، تُعلَن من دون نقل التركيز. وتتبع التبويبات نمط التبويبات.

## من اليمين إلى اليسار

الشيفرة من اليسار إلى اليمين دائمًا (`dir="ltr"` على `pre`، وعلى `code` في الأمر)، في الصفحة العربية أيضًا؛ ويتبع الشريط والصندوق حولها الصفحة، فيقع زر النسخ في النهاية، على اليسار. ويقع شريط السطر المعلّم في بداية الشيفرة، على اليسار.

## افعل

- ضع زر نسخ على كل ما يُراد للناس أن يلصقوه.
- أعطِ كل عيّنة لغتها، ليكون للنوع نفسه من الكلمات اللون نفسه في كل صفحة.
- اجعل العيّنة قصيرة بما يكفي لتُقرأ: الجزء المهم، و`…` لما تبقّى.
- اجعل اللغة التي سيلصق فيها الناس أول تبويب.

## لا تفعل

- ترجمة الشيفرة، أو عكسها، في الصفحة العربية.
- تعليم أكثر من أسطر قليلة؛ فلا يبرز شيء حينها.
- تلوين الشيفرة بغير ألوان الصياغة: اللون في الشيفرة يعني نوع الكلمة، ولا شيء غيره.
- وضع صورة للشيفرة حيث تكفي الشيفرة نفسها.

## الرموز

`--al-border-focus`، `--al-border-hairline`، `--al-color-accent`، `--al-color-accent-wash`، `--al-color-focus`، `--al-color-line`، `--al-color-line-strong`، `--al-color-success`، `--al-color-surface`، `--al-color-surface-sunk`، `--al-color-syntax-attribute`، `--al-color-syntax-comment`، `--al-color-syntax-function`، `--al-color-syntax-keyword`، `--al-color-syntax-number`، `--al-color-syntax-string`، `--al-color-syntax-tag`، `--al-color-text`، `--al-color-text-muted`، `--al-font-mono`، `--al-radius-sm`، `--al-size-control-md`، `--al-space-1`، `--al-space-2`، `--al-space-3`، `--al-space-4`، `--al-text-sm`، `--al-text-xs`
