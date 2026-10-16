# نظام تصميم معامل آرابيسك

> ترجمة لـ[الملف بالإنجليزية](../README.md). إن اختلفت الترجمة عن الأصل، فالإنجليزية هي المرجع.

الرموز وCSS والمكوّنات والقواعد التي تبني بها معامل آرابيسك.
**متاح للجميع** (معيار WCAG 2.2 AA حدًّا أدنى)، و**ثنائي الاتجاه** (الإنجليزية
والعربية، من اليسار إلى اليمين ومن اليمين إلى اليسار، منذ البداية)، ومبني
**لتفاعل فعّال**: أقل عدد من الخطوات، وإجراءات تقول ما تفعل، وكل عاقبة تظهر
قبل الإجراء وأثناءه وبعده.

إنه خصائص CSS مخصّصة عادية وHTML عادي، دون إطار عمل ودون أي اعتماد وقت
التشغيل. ونص برمجي صغير بلغة Node يبني المخرجات من ملف رموز واحد. والمساعدات
الاختيارية بلغة JavaScript ليس لها اعتمادات أيضًا.

## ما في المستودع

| المسار | ما هو |
|---|---|
| `tokens/tokens.json` | المصدر الوحيد للحقيقة (بصيغة W3C Design Tokens): الرموز الأولية، والأدوار الدلالية، ورموز المكوّنات؛ مع الوضع الداكن ووضع العربية |
| `scripts/build.mjs` | يبني `dist/` و`docs/contrast.md` من الرموز |
| `scripts/build-react.mjs` | يبني `dist/react/` والأمثلة وقالب الصفحة الرئيسية من `react/` و`examples/src/` و`templates/react/`؛ وصفحةً بجانب كل مستند (`README.html`، `docs/…/*.html`) |
| `dist/arabesque.css` | كل شيء في ملف واحد، في طبقات متتالية: الرموز، والأساس، والتخطيط، والمكوّنات، والأدوات المساعدة |
| `dist/tokens.css` | الرموز وحدها، خصائصَ مخصّصة `--al-*`، فاتحة وداكنة |
| `dist/tailwind-theme.css` | ربط `@theme` لإصدار Tailwind الرابع على المتغيرات نفسها |
| `dist/tokens.json` | قيم الرموز محسوبة لكل وضع، للأدوات الأخرى |
| `dist/icons.svg` | ملف الأيقونات المجمّع |
| `dist/brand/`، `dist/patterns/` | العلامة والنجمة وأيقونة الموقع بألوان ثابتة، وبلاطات النمط، للبريد الإلكتروني والعروض والمستندات |
| `dist/react/` | مكوّنات React، مع أنواعها ([`docs/react.md`](../docs/react.md)، بالإنجليزية) |
| `css/` | المصادر: `base.css`، و`layout.css`، و`utilities.css`، و`components/*.css` |
| `react/src/` | مصادر مكوّنات React: وحدة لكل مواصفة، تكتب الترميز نفسه وتستخدم المساعدات |
| `js/` | مساعدات اختيارية، لكل منها أنواعه (`.d.ts`): `theme`، `toast`، `dialog`، `menu`، `tabs`، `tooltip`، `position`، `validate`، `count`، `search`، `keys`، `format`، `chart`، `datepicker`، `pattern`، `site-header` |
| `tests/`، `scripts/check-page.mjs` | اختبارات الوحدات وقواعد النظام نفسه؛ وصفحة العرض مفحوصة في متصفح حقيقي |
| `icons/`، `assets/brand/` | مصادر الأيقونات؛ والعلامة والنجمة والشعار النصي من حزمة الشعار |
| `docs/` | الأسس، والتفاعل، وإتاحة الوصول، والكتابة من اليمين إلى اليسار، والتبنّي، ومواصفات المكوّنات، والتدقيق، وتقرير التباين |
| `index.html` | صفحة العرض: كل الأمثلة في صفحة واحدة، مولَّدة من `examples/src/` |
| `examples/` | كل مكوّن يعمل، بـReact، في صفحة لكل منها، بالإنجليزية والعربية ([`examples/index.html`](../examples/index.html)) |
| `templates/` | صفحات كاملة يُبدأ منها موقع: الصفحة الرئيسية للاستوديو، بالإنجليزية والعربية، بـHTML وبـReact ([`templates/README.md`](../templates/README.md)) |

## البناء

يتطلب Node 20 أو أحدث. لا تحتاج الأنماط والرموز والأيقونات إلى خطوة تثبيت؛ أما
مكوّنات React وأمثلتها وقالب الصفحة الرئيسية فتحتاج إلى `npm install` أولًا
(esbuild وTypeScript وReact).

```sh
node scripts/build.mjs        # dist/: the CSS, tokens and sprite, and docs/contrast.md
npm run build:react           # dist/react/, examples/, templates/home.html, the documents' pages
npm run build                 # both
```

يطبع ملخصًا، وينتهي بخطأ إن قصّر أي زوج ألوان عن الحد الأدنى للتباين، أو كان
نوع خاطئًا، أو كان في مثال جملة بلا ترجمة عربية. لا تعدّل `dist/` ولا
`examples/*.html` ولا HTML القالب يدويًا؛ فهي محفوظة في المستودع، لذا أعد
بناءها واحفظها مع المصادر التي تأتي منها.

## الاختبار

```sh
npm test             # unit tests, and the system's rules: logical properties only,
                     # every var() a token, every primitive used, one @keyframes each
npm run check        # build, test, and fail if dist/, the examples or the template weren't rebuilt

npm i --no-save axe-core@4.10.2
node scripts/check-page.mjs   # in Chrome: the helpers on their own page
                              # (tests/pages/helpers.html), with real key presses;
                              # the showcase with axe in light, dark, English and Arabic;
                              # every example page, and the template, the same way
```

تعمل الثلاثة مع كل دفع وكل طلب دمج (`.github/workflows/check.yml`). ويفشل
البناء أيضًا إن وضع مكوّن لونًا على خلفية لا يقيسها فحص التباين، أو إن تجاوز
`arabesque.css` ميزانية حجمه (26 KB مضغوطًا). وقبل كل إصدار، نفّذ
[فحوص قارئ الشاشة](../docs/screen-readers.md) (بالإنجليزية) يدويًا.

## مشاهدة صفحة العرض

يجب تقديم ملف الأيقونات عبر HTTP:

```sh
npm run serve        # then open http://127.0.0.1:4900/
```

بدّل السمة واللغة من الأعلى؛ وفي العربية، اختر الأرقام الغربية أو الهندية
العربية. وتُحفظ الاختيارات الثلاثة. وصفحة العرض مبنية من أمثلة صفحات الأمثلة
نفسها (`examples/src/showcase.tsx`): فـ`index.html` مولَّد، فغيّر الأمثلة لا هو. وكل مستند، وهذا منها، صفحةٌ قائمة بذاتها
أيضًا: `README.html`، و`docs/react.html`، وغيرهما، بالإنجليزية، وبالعربية حيث
توجد ترجمة.

والمكوّنات نفسها بـReact، في صفحة لكل منها، على
`http://127.0.0.1:4900/examples/`: كل منها بالإنجليزية، ثم بالعربية من اليمين
إلى اليسار.

## استخدامه في مشروع

1. **اربط بإصدار منشور،** لا يتغير أبدًا، فلا يترقّى الموقع إلا حين يختار:
   `https://design.arabesquelabs.com/v/0.2.0/dist/arabesque.css` (و
   `…/v/0.2.0/fonts/fonts.css`، و`…/v/0.2.0/js/toast.js`). أما `/dist/` نفسه
   فهو أحدث بناء، ويتغير مع كل نشر: لا تربطه من موقع. أو **انسخ** `dist/`
   و`fonts/` (و`js/` للمساعدات) إلى المشروع من وسم (`git checkout v0.2.0`)،
   أو ثبّته من git:
   `npm i github:ArabesqueLabs/design-system#v0.2.0` (والأمر `prepare` يبنيه)،
   واستورد `@arabesquelabs/design-system` (ملف CSS) أو
   `@arabesquelabs/design-system/js/toast.js`.
2. **حمّل الخطوط وملف CSS:**

   ```html
   <html lang="en" dir="ltr">
   <head>
     <link rel="stylesheet" href="/fonts/fonts.css">
     <link rel="stylesheet" href="/dist/arabesque.css">
   ```

   في `fonts/` (انسخه بجانب `dist/`) كل خط يستخدمه النظام، يُقدَّم من موقعك
   لا من Google، فلا تُرسل عناوين الزوار إلى طرف ثالث؛ ولا يجلب المتصفح إلا
   الخطوط والأبجديات التي تستخدمها الصفحة. وللعربية، ضع `lang="ar" dir="rtl"`
   على `<html>`.
3. **طبّق السمة المحفوظة قبل أول رسم** (يمنع الوميض):

   ```html
   <script>try { const t = localStorage.getItem("al-theme"); if (t) document.documentElement.dataset.theme = t; } catch {}</script>
   ```

4. **ابنِ بالأصناف** (`al-button`، `al-field`…)، متّبعًا المواصفات في
   [`docs/components/ar/`](../docs/components/ar/README.md)؛ أو، في تطبيق
   React، بالمكوّنات (`@arabesquelabs/design-system/react`)، التي تكتب
   الترميز نفسه: انظر [`docs/react.md`](../docs/react.md) (بالإنجليزية).
5. **استخدم المساعدات** وحداتٍ حيث تحتاجها:

   ```js
   import { toast } from "/js/toast.js";
   import { initMenus } from "/js/menu.js";
   initMenus();
   toast("Process archived", { action: "Undo", onAction: restore });
   ```

يغلب ملف CSS الخاص بك، خارج الطبقات، طبقات النظام، فيمكن للمشروع أن ينتقل
إليه تدريجيًا ([`docs/adoption.md`](../docs/adoption.md)، بالإنجليزية). مع
استثناء واحد مقصود: `[hidden]` يخفي بـ`!important` من داخل طبقة، وهذا يغلب حتى
`!important` خارج الطبقات، فلا شيء يكتبه المشروع يمكنه إظهار ما هو مخفي
(ويُترك `hidden="until-found"` للمتصفح).

**مع Tailwind v4،** استورد `dist/tokens.css` ثم `dist/tailwind-theme.css`؛
فتؤول أدوات مثل `bg-surface` و`text-text-muted` و`border-control` إلى
متغيرات النظام، وتتبدل مع السمة. ونقاط التوقف (`sm:` ‏40rem، و`md:` ‏52rem،
و`lg:` ‏64rem) هي نقاط النظام، و`dark:` يتبع `data-theme` كما تتبعه الرموز:
إعداد النظام ما لم يُختر الفاتح، أو الداكن إن اختير.

## اقرأ بعد ذلك

هذه المستندات بالإنجليزية، إلا مواصفات المكوّنات.

- [التفاعل](../docs/interaction.md): المبدأ الرئيسي، في صورة قواعد.
- [إتاحة الوصول](../docs/accessibility.md): ما يضمنه النظام، وقائمة تحقق لكل مكوّن؛ و[فحوص قارئ الشاشة](../docs/screen-readers.md) قبل كل إصدار.
- [من اليمين إلى اليسار](../docs/rtl.md): الانعكاس، وعزل الاتجاه، والأرقام.
- الأسس: [اللون](../docs/foundations/colour.md)، و[الخط](../docs/foundations/typography.md)، و[المسافة والشكل](../docs/foundations/space-and-shape.md)، و[الحركة](../docs/foundations/motion.md)، و[الأيقونات](../docs/foundations/iconography.md)، و[التخطيط](../docs/foundations/layout.md)، و[الكتابة](../docs/foundations/writing.md).
- [المكوّنات](../docs/components/ar/README.md)، بالعربية.
- [React](../docs/react.md): المكوّنات بـReact، وكيف تُغيَّر.
- [التبنّي](../docs/adoption.md): نقل hunt وarabesquelabs.com إليه.
- [التدقيق](../docs/00-audit.md): من أين جاء، والقرارات.

## التسمية

تبدأ كل خاصية مخصّصة بـ`--al-` وكل صنف بـ`al-`، فيمكن للنظام أن يجاور أي
شيء. وتُسمّى الرموز بأدوارها (`--al-color-text-muted`)، لا بقيمها. وتتبع أصناف
المكوّنات النمط `al-block__element--modifier`؛ والحالة في الخصائص (`aria-*`،
`data-state`، `[open]`)، لا في الأصناف.

## الإصدارات

[الإصدار الدلالي](https://semver.org/)، مسجّلًا في
[`CHANGELOG.md`](../CHANGELOG.md) (بالإنجليزية):

- **رئيسي:** إعادة تسمية رمز أو صنف أو حذفه، أو تغيّر ترميز مكوّن بطريقة تكسر
  الصفحات الموجودة.
- **فرعي:** إضافة شيء (رمز، أو مكوّن، أو نوع، أو مساعد)، أو تغيّر قيمة بشكل
  ظاهر دون كسر الترميز (لون عُدّل من أجل التباين).
- **تصحيح:** إصلاحات لا تغيّر الشكل المقصود ولا الترميز.

تبقى الأسماء المهجورة عاملةً، أسماءً بديلة، لإصدار منشور واحد على الأقل، وتقول
أي إصدار يحذفها ("kept until X.Y")؛ ويفشل اختبار إن بقي أحدها بعد موعده. ومن
الإصدار 1.0، لا يحذفها إلا إصدار رئيسي. وتثبّت المشاريع إصدارًا وتترقى عن قصد.

قبل 1.0 (كما يسمح الإصدار الدلالي في 0.x)، يجوز لإصدار فرعي أن يحذف: ما لا
يستخدمه شيء في النظام، وما هجره الإصدار الفرعي السابق. ويذكر سجل التغييرات كل
حذف تحت **Removed**، مع ما يُستخدم بدلًا منه.

## الإصدار

الإصدارات طلب دمج. بعد كل دفع إلى `main`، يحسب
`.github/workflows/release-pr.yml` الإصدار التالي من قسم **Unreleased** في سجل
التغييرات (`scripts/next-version.mjs`):

| في Unreleased | الإصدار التالي |
|---|---|
| **Removed** | رئيسي (فرعي قبل 1.0) |
| **Added**، **Changed**، **Deprecated** | فرعي |
| **Fixed** أو **Security** فقط | تصحيح |
| لا شيء | لا إصدار |

ويُعدّ ذلك الإصدار على الفرع `release/next` بالأمر `npm run release -- <version>`،
الذي ينقل مدخلات Unreleased تحت الإصدار، مؤرّخة، ويضبط `version` في
`package.json`، ويبني، وينسخ `dist/` و`fonts/` و`js/` إلى `v/<version>/`؛ أما ملفات
الخطوط نفسها فتُنسخ مرة واحدة إلى `v/_fonts/<hash>/`، تشترك فيها كل الإصدارات
التي لها الخطوط نفسها، ويشير إليها `fonts/fonts.css` في الإصدار. ثم يفتح
طلب دمج **Release x.y.z**، أو يحدّث المفتوح منه. ولاختيار إصدار آخر، ضع على
الطلب الوسم `release:major` أو `release:minor` أو `release:patch`؛ فيسري مع
الدفع التالي إلى `main` (أو شغّل سير العمل يدويًا).

**دمجه هو الإصدار.** يضع `.github/workflows/tag-release.yml` الوسم
`v<version>`، ويقدّم النشر التالي `v/<version>/`. ولا يُعاد بناء إصدار منشور ولا
يُغيَّر أبدًا (يرفض النص البرمجي ذلك، ويفشل CI إن عُدّل ملف تحت `v/`)، لذا
يُقدَّم مع تخزين مؤقت لسنة (`_headers`).

لذا: اكتب مدخل كل تغيير تحت **Unreleased** في التغيير نفسه، ولما يُنشر فقط
(الرموز، وCSS، والمساعدات، والمستندات). فالمدخل هو ما يصنع الإصدار، والتغييرات
التي تخص المستودع وحده (CI، النصوص البرمجية) لا تمس سجل التغييرات.

الإعداد، مرة واحدة: سرّ باسم `RELEASE_TOKEN`، رمز دقيق الصلاحيات (أو رمز تطبيق
GitHub) بصلاحية القراءة والكتابة على المحتويات وطلبات الدمج. فبالرمز الافتراضي،
لا يشغّل طلب الإصدار `check.yml`.

يدويًا، الخطوات نفسها: `npm run release -- 0.3.0`، ثم `npm run check`، ثم احفظ
التغييرات ("Release 0.3.0")، وادمج؛ ويتبع الوسم.
