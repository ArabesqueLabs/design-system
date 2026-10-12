// The showcase: renders the token specimens, wires the examples to the
// system's helpers, and switches English ↔ Arabic (with dir) and light ↔
// dark. Arabic is a catalogue keyed by each English text, as hunt does it.

import { setTheme, currentTheme } from "./js/theme.js";
import { toast } from "./js/toast.js";
import { initMenus } from "./js/menu.js";
import { initTabs } from "./js/tabs.js";
import { initTooltips } from "./js/tooltip.js";
import { drawPattern } from "./js/pattern.js";
import { formatMoney, formatNumber, formatPercent } from "./js/format.js";

const html = document.documentElement;
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const el = (tag, attrs = {}, ...kids) => {
  const e = document.createElement(tag);
  for (const [k, v] of Object.entries(attrs)) {
    if (k === "class") e.className = v;
    else if (k === "style") e.style.cssText = v;
    else if (k.startsWith("on")) e.addEventListener(k.slice(2), v);
    else e.setAttribute(k, v);
  }
  e.append(...kids.flat().filter((x) => x != null));
  return e;
};
const icon = (name, cls = "") => {
  const s = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  s.setAttribute("class", `al-icon ${cls}`.trim());
  s.setAttribute("aria-hidden", "true");
  const u = document.createElementNS("http://www.w3.org/2000/svg", "use");
  u.setAttribute("href", `dist/icons.svg#al-icon-${name}`);
  s.append(u);
  return s;
};

// ---- Arabic ------------------------------------------------------------------------------

const AR = {
  "Arabesque Labs design system": "نظام تصميم Arabesque Labs",
  "Skip to content": "انتقل إلى المحتوى",
  "Design system": "نظام التصميم",
  "Sections": "الأقسام",
  "Foundations": "الأسس",
  "Components": "المكوّنات",
  "Patterns": "الأنماط",
  "Language": "اللغة",
  "Switch to dark theme": "التبديل إلى المظهر الداكن",
  "Switch to light theme": "التبديل إلى المظهر الفاتح",
  "One tile, a whole system.": "بلاطة واحدة، ونظام كامل.",
  "The tokens, foundations and components that Arabesque Labs builds with: accessible to WCAG 2.2 AA, and written for left-to-right and right-to-left alike. Every value here comes from the tokens; change one, and everything that uses it follows.": "الرموز والأسس والمكوّنات التي تبني بها Arabesque Labs: متاحة وفق WCAG 2.2 AA، ومكتوبة للكتابة من اليسار إلى اليمين ومن اليمين إلى اليسار على السواء. كل قيمة هنا مصدرها الرموز؛ غيّر واحدًا، فيتبعه كل ما يستخدمه.",
  "See the components": "اطّلع على المكوّنات",
  "Start with the foundations": "ابدأ بالأسس",
  "Colour, type, space, shape, motion and icons: the decisions everything else is made of.": "اللون والخط والمسافات والشكل والحركة والأيقونات: القرارات التي يُبنى منها كل ما عداها.",
  "Colour": "اللون",
  "Roles, not hues: each name says what the colour is for. The accent is for actions and focus, and for success with an icon and a word. Every pair the system relies on is measured at build time (docs/contrast.md).": "أدوار لا درجات: كل اسم يقول ما وُجد اللون من أجله. لون التمييز للإجراءات والتركيز، وللنجاح مع أيقونة وكلمة. وكل زوج من الألوان يعتمد عليه النظام يُقاس عند البناء (docs/contrast.md).",
  "Type": "الخط",
  "Jost for the interface and headings, Newsreader for reading. Arabic falls through to IBM Plex Sans Arabic, Kufam and Amiri, set a little larger, with more line height, and no letter-spacing.": "Jost للواجهة والعناوين، وNewsreader للقراءة. والعربية تُكتب بخطوط IBM Plex Sans Arabic وKufam وAmiri، بحجم أكبر قليلًا، وتباعد أسطر أوسع، ودون تباعد بين الحروف.",
  "Reading text": "نص القراءة",
  "Islamic geometric patterns are intricate structures built from simple, repeated rules. We build software the same way: small, well-made modules, clear interfaces, a coherent system.": "الزخارف الهندسية الإسلامية بنى متقنة تقوم على قواعد بسيطة متكررة. ونحن نبني البرمجيات بالطريقة نفسها: وحدات صغيرة متقنة، وواجهات واضحة، ونظام متماسك.",
  "Numbers inside a sentence": "أرقام داخل جملة",
  "The offer pays": "يدفع العرض",
  "a year, and": "سنويًا، و",
  "in shares over 4 years.": "أسهمًا على مدى 4 سنوات.",
  "Space and shape": "المسافة والشكل",
  "A 4px step for everything spatial. Corners are crisp (2px); depth comes from borders and surface steps, never shadows.": "خطوة من 4 بكسل لكل ما هو مكاني. الزوايا حادة (2 بكسل)؛ والعمق يأتي من الحدود ودرجات الأسطح، لا من الظلال أبدًا.",
  "Motion": "الحركة",
  "Quick, and only in answer to something done: 150ms for feedback, 250ms for disclosure and themes. With reduced motion, things change at once.": "سريعة، ولا تكون إلا استجابة لفعل: 150 جزءًا من الثانية للاستجابة، و250 للطيّ والمظاهر. ومع تقليل الحركة، يتغيّر كل شيء فورًا.",
  "Try a change": "جرّب تغييرًا",
  "Icons": "الأيقونات",
  "Line icons on a 24-unit grid. Those that point along the reading direction mirror in right-to-left.": "أيقونات خطية على شبكة من 24 وحدة. وما يشير منها في اتجاه القراءة ينعكس في الكتابة من اليمين إلى اليسار.",
  "Each does one job, says what it does, and shows what it changed.": "كلٌّ منها يؤدي مهمة واحدة، ويقول ما يفعله، ويُظهر ما غيّره.",
  "Buttons": "الأزرار",
  "One primary per view. Labels name the action and its object. Busy and unavailable look different.": "زر رئيسي واحد في كل عرض. والتسميات تذكر الإجراء وموضوعه. ويختلف شكل «قيد العمل» عن «غير متاح».",
  "Save offer": "احفظ العرض",
  "Compare offers": "قارن العروض",
  "Add a step": "أضف خطوة",
  "Delete offer": "احذف العرض",
  "Edit offer": "عدّل العرض",
  "Save": "احفظ",
  "Cancel": "إلغاء",
  "Saving offer": "جارٍ حفظ العرض",
  "Save two offers to compare them.": "احفظ عرضين لتقارن بينهما.",
  "Form fields": "حقول النماذج",
  "A visible label, the control, a hint, and an error that says how to fix it. Optional fields say so.": "تسمية ظاهرة، ثم الحقل، ثم تلميح، ثم خطأ يقول كيف يُصلح. والحقول الاختيارية تقول ذلك.",
  "Offer name": "اسم العرض",
  "Gross salary": "إجمالي الراتب",
  "(before tax)": "(قبل الضريبة)",
  "Currency": "العملة",
  "a year": "سنويًا",
  "Type 108000, 108k or ١٠٨٬٠٠٠.": "اكتب 108000 أو 108k أو ١٠٨٬٠٠٠.",
  "Company": "الشركة",
  "(optional)": "(اختياري)",
  "Choose, or type a new one": "اختر، أو اكتب شركة جديدة",
  "A new name is added to your companies when you save.": "الاسم الجديد يُضاف إلى شركاتك عند الحفظ.",
  "Start date": "تاريخ البدء",
  "Tax code": "الرمز الضريبي",
  "A tax code is like 1257L, K475 or BR. Check your payslip.": "الرمز الضريبي يشبه 1257L أو K475 أو BR. راجع قسيمة راتبك.",
  "Bonus, a year": "المكافأة، سنويًا",
  "Changed, not saved": "تغيّر، ولم يُحفظ",
  "Note": "ملاحظة",
  "Refreshers are reviewed each year.": "تُراجع منح التجديد كل عام.",
  "Choices": "الخيارات",
  "Student loans": "قروض الطلاب",
  "Plan 2": "الخطة 2",
  "Postgraduate loan": "قرض الدراسات العليا",
  "6% of income over £21,000": "6% من الدخل فوق \u2066£21,000\u2069",
  "Employment type": "نوع التوظيف",
  "Employee (PAYE)": "موظف (PAYE)",
  "Contractor inside IR35": "متعاقد داخل IR35",
  "Contractor outside IR35": "متعاقد خارج IR35",
  "Show grants": "أظهر المنح",
  "Compact tables": "جداول مضغوطة",
  "Start from": "ابدأ من",
  "Gross pay offered": "إجمالي الأجر المعروض",
  "Desired take-home pay": "صافي الأجر المرغوب",
  "Disclosure": "الطيّ",
  "What's secondary, folded away, with what's chosen inside shown beside its name.": "ما هو ثانوي مطويّ، وما اختير داخله ظاهر بجانب اسمه.",
  "Workplace pension": "معاش مكان العمل",
  "5%, salary sacrifice": "5%، بالتنازل عن الراتب",
  "Your contribution (% of pay)": "مساهمتك (% من الأجر)",
  "Repaid at 9% of income over the plan's threshold.": "يُسدَّد بنسبة 9% من الدخل فوق حدّ الخطة.",
  "Cards, panels and figures": "البطاقات والألواح والأرقام",
  "Meta · saved today": "Meta · حُفظ اليوم",
  "£108,000 salary, a 15% bonus, and RSUs vesting quarterly over 4 years.": "راتب \u2066£108,000\u2069، ومكافأة 15%، ووحدات أسهم تستحق كل ثلاثة أشهر على مدى 4 سنوات.",
  "Open": "افتح",
  "Edit": "عدّل",
  "Take-home, a month": "صافي الأجر، شهريًا",
  "a year:": "سنويًا:",
  "About you": "عنك",
  "A panel is a rule above a group: most groupings need no box.": "اللوح خطٌّ فوق مجموعة: فمعظم المجموعات لا تحتاج إلى صندوق.",
  "Page head and tabs": "رأس الصفحة وعلامات التبويب",
  "Take-home pay": "صافي الأجر",
  "Experimental": "تجريبية",
  "Tax year": "السنة الضريبية",
  "Calculator": "الحاسبة",
  "Offers": "العروض",
  "The calculator works out what you'd keep as you type.": "تحسب الحاسبة ما يبقى لك وأنت تكتب.",
  "Your saved offers, side by side.": "عروضك المحفوظة، جنبًا إلى جنب.",
  "Sidebar": "الشريط الجانبي",
  "Sections (example)": "الأقسام (مثال)",
  "Tracking board": "لوحة المتابعة",
  "Calendar": "التقويم",
  "Files": "الملفات",
  "Settings": "الإعدادات",
  "Collapse sidebar": "طيّ الشريط الجانبي",
  "Expand sidebar": "توسيع الشريط الجانبي",
  "The main column.": "العمود الرئيسي.",
  "Table": "الجدول",
  "Take-home pay, by period": "صافي الأجر، حسب الفترة",
  "What": "البند",
  "Year": "السنة",
  "Month": "الشهر",
  "Week": "الأسبوع",
  "Gross pay": "إجمالي الأجر",
  "Income tax": "ضريبة الدخل",
  "National Insurance": "التأمين الوطني",
  "Employer's National Insurance": "التأمين الوطني على صاحب العمل",
  "Badges and tags": "الشارات والوسوم",
  "Archived": "مؤرشف",
  "Active": "نشط",
  "Passed": "نجح",
  "Overdue": "متأخر",
  "New": "جديد",
  "3 unread": "3 غير مقروءة",
  "Dream job": "وظيفة الأحلام",
  "Remove tag Dream job": "أزل وسم وظيفة الأحلام",
  "Fintech": "التقنية المالية",
  "Remove tag Fintech": "أزل وسم التقنية المالية",
  "Notices": "الإشعارات",
  "Rates for 2026/27": "معدلات 2026/27",
  "Worked out at HMRC's rates for the tax year chosen.": "محسوب بمعدلات HMRC للسنة الضريبية المختارة.",
  "Saved": "حُفظ",
  "Your offer is saved, and in the comparison.": "حُفظ عرضك، وهو في المقارنة.",
  "Check your tax code": "راجع رمزك الضريبي",
  "0T taxes all of your pay. These figures would give 507T.": "الرمز 0T يُخضع أجرك كله للضريبة. وهذه الأرقام تعطي 507T.",
  "Use 507T": "استخدم 507T",
  "Couldn't work it out": "تعذّر الحساب",
  "There's no exchange rate for that currency today. Try again, or use pounds.": "لا يوجد سعر صرف لتلك العملة اليوم. حاول مجددًا، أو استخدم الجنيه.",
  "Toasts, dialogs, menus and tooltips": "الإشعارات العابرة والحوارات والقوائم والتلميحات",
  "Reversible actions happen at once, with Undo. Only what can't be undone asks first, and says why.": "ما يمكن التراجع عنه يتم فورًا، مع «تراجع». ولا يسأل أولًا إلا ما لا رجعة فيه، ويقول لماذا.",
  "Archive process": "أرشف العملية",
  "Delete account…": "احذف الحساب…",
  "Move to…": "انقل إلى…",
  "Move to": "انقل إلى",
  "Applied": "قُدِّم الطلب",
  "Interviewing": "المقابلات",
  "Offer": "العرض",
  "Archive": "أرشف",
  "Copy link": "انسخ الرابط",
  "Copy link|to this offer": "انسخ الرابط|إلى هذا العرض",
  "Delete your account?": "أتحذف حسابك؟",
  "This deletes your account and everything in it: 12 applications, 3 offers and 40 files. It can't be undone.": "يحذف هذا حسابك وكل ما فيه: 12 طلبًا و3 عروض و40 ملفًا. ولا يمكن التراجع عنه.",
  "Type your email address to confirm": "اكتب بريدك الإلكتروني للتأكيد",
  "Keep my account": "أبقِ حسابي",
  "Delete account and data": "احذف الحساب والبيانات",
  "Pending changes and side effects": "التغييرات المعلّقة والآثار الجانبية",
  "What's changed, whether it's kept, and what else it touched: shown where it happens.": "ما تغيّر، وهل حُفظ، وما الذي مسّه أيضًا: يظهر حيث يحدث.",
  "Daily rate": "الأجر اليومي",
  "Changing the rate also updates": "تغيير الأجر يحدّث أيضًا",
  "2 saved offers": "عرضين محفوظين",
  "Save, and fail": "احفظ، وأخفق",
  "Discard changes": "تجاهل التغييرات",
  "Working out again…": "جارٍ الحساب من جديد…",
  "Take-home, a month:": "صافي الأجر، شهريًا:",
  "Bulk actions": "الإجراءات الجماعية",
  "3 selected": "3 محدّدة",
  "Move 3 to…": "انقل 3 إلى…",
  "Archive 3": "أرشف 3",
  "Clear selection": "امسح التحديد",
  "Empty and loading": "الفراغ والتحميل",
  "No offers yet": "لا عروض بعد",
  "Work one out in the calculator, then save it to compare it with others.": "احسب عرضًا في الحاسبة، ثم احفظه لتقارنه بغيره.",
  "Open the calculator": "افتح الحاسبة",
  "Loading offers": "جارٍ تحميل العروض",
  "Importing, 60%": "جارٍ الاستيراد، 60%",
  "Keyboard shortcuts": "اختصارات لوحة المفاتيح",
  "New application": "طلب جديد",
  "Search": "بحث",
  "Show the shortcuts": "أظهر الاختصارات",
  "Charts": "الرسوم البيانية",
  "Take-home pay, year by year": "صافي الأجر، سنةً بسنة",
  "Where the pay goes": "أين يذهب الأجر",
  "Against what you want, a month": "مقارنةً بما تريده، شهريًا",
  "The mark and the pattern": "الشعار والنمط",
  "The mark is one tile; every surface is its tessellation. Drawn by rule, never by hand.": "الشعار بلاطة واحدة؛ وكل سطح هو تكرارها. يُرسم بالقاعدة، لا باليد أبدًا.",
  "Lockups": "تركيبات الشعار",
  "The 4.8.8 tessellation, contact angle 67.5°": "تبليط 4.8.8، بزاوية تلامس 67.5°",
  "Interaction": "التفاعل",
  "Accessibility": "إتاحة الوصول",
  "Right to left": "من اليمين إلى اليسار",
  "© 2026 Arabesque Labs Ltd. Structure. Clarity. Craftsmanship.": "© 2026 Arabesque Labs Ltd. بنية. وضوح. إتقان.",
  // Made by this script.
  "Light": "فاتح", "Dark": "داكن",
  "The page": "الصفحة", "Cards, panels, inputs": "البطاقات والألواح والحقول", "Wells, hover, info": "الآبار والتمرير والمعلومات",
  "Body text": "نص المتن", "Secondary text": "النص الثانوي", "Hairlines": "الخطوط الرفيعة", "Control borders": "حدود عناصر التحكم",
  "Actions, focus, success": "الإجراءات والتركيز والنجاح", "Text on accent": "النص على لون التمييز", "Errors, destroying": "الأخطاء والحذف",
  "Needs attention": "يحتاج انتباهًا", "Information": "معلومات", "Toasts, tooltips": "الإشعارات العابرة والتلميحات",
  "Chart, first series": "الرسم، السلسلة الأولى", "Chart, second series": "الرسم، السلسلة الثانية", "Chart, third series": "الرسم، السلسلة الثالثة", "Chart, fourth series": "الرسم، السلسلة الرابعة",
  "The quick offer": "العرض السريع", "Process archived": "أُرشفت العملية", "Undo": "تراجع", "Process restored": "استُعيدت العملية",
  "Unsaved changes": "تغييرات غير محفوظة", "Saving…": "جارٍ الحفظ…", "Couldn't save": "تعذّر الحفظ", "Retry": "أعد المحاولة",
  "Changes discarded": "تُجوهلت التغييرات",
  "An optimistic change, rolled back": "تحديث استباقي، أُعيد كما كان",
  "Archive, and fail": "أرشف، وأخفق",
  "Archived {name}": "أُرشف {name}",
  "Couldn't archive {name}: the server didn't answer. It's back where it was.": "تعذّرت أرشفة {name}: لم يُجب الخادم. وقد عاد إلى مكانه.",
  "Numerals": "الأرقام",
  "Arabic-Indic numerals": "الأرقام الهندية", "Account deleted (not really: this is an example)": "حُذف الحساب (ليس فعلًا: هذا مثال)",
  "Take-home pay": "صافي الأجر", "Cash pay": "الأجر النقدي", "Shares vesting": "الأسهم المستحقة", "What you want": "ما تريده",
  "Tax, NI and loans": "الضرائب والتأمين والقروض", "Your pension": "معاشك", "Other": "أخرى", "more": "زيادة", "short": "نقصًا",
  "Year 1": "السنة 1", "Year 2": "السنة 2", "Year 3": "السنة 3", "Year 4": "السنة 4",
  "Offer A": "العرض أ", "Offer B": "العرض ب", "Offer C": "العرض ج",
};
const original = new WeakMap();
const ATTRS = ["aria-label", "placeholder", "title", "data-al-tip"];
let lang = html.lang === "ar" ? "ar" : "en";
// Arabic's digits are a preference: Western (the default) or Arabic-Indic.
let numerals = "latn";
try { numerals = localStorage.getItem("al-showcase-numerals") === "arab" ? "arab" : "latn"; } catch {}
const INDIC = "٠١٢٣٤٥٦٧٨٩";
const digits = (s) => (lang === "ar" && numerals === "arab" ? s.replace(/\d/g, (d) => INDIC[d]).replace(/(\d|[٠-٩]),(?=[\d٠-٩])/g, "$1٬").replace(/([٠-٩])\.(?=[٠-٩])/g, "$1٫") : s);
const T = (s) => (lang === "ar" ? AR[s] ?? s : s);

/** Put the page in a language: text, attributes, lang and dir. */
function translate(root = document.body) {
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
    acceptNode: (n) => (n.parentElement?.closest('[lang="en"], [lang="ar"]:not(html), script, style, kbd, code') ? NodeFilter.FILTER_REJECT : NodeFilter.FILTER_ACCEPT),
  });
  for (let n = walker.nextNode(); n; n = walker.nextNode()) {
    if (!original.has(n)) original.set(n, n.textContent);
    const en = original.get(n);
    const key = en.trim();
    if (!key) continue;
    const text = lang === "ar" && AR[key] ? en.replace(key, AR[key]) : en;
    // Figures (in <bdi> or a numeric cell) take the chosen digits.
    const figure = n.parentElement.closest("bdi, .al-num, .al-stat__value") && !n.parentElement.closest("[data-numerals]");
    n.textContent = figure ? digits(text) : text;
  }
  for (const e of root.querySelectorAll(ATTRS.map((a) => `[${a}]`).join(","))) {
    if (e.closest('[lang="en"]')) continue;
    for (const a of ATTRS) {
      if (!e.hasAttribute(a)) continue;
      // data-al-en-aria-label and so on: the English, kept to switch back.
      const k = `alEn${a.replace(/(^|-)(\w)/g, (_, __, c) => c.toUpperCase())}`;
      if (!e.dataset[k]) e.dataset[k] = e.getAttribute(a);
      const en = e.dataset[k];
      e.setAttribute(a, lang === "ar" ? AR[en] ?? en : en);
    }
  }
  document.title = T("Arabesque Labs design system");
}
function setLanguage(next) {
  lang = next;
  html.lang = next;
  html.dir = next === "ar" ? "rtl" : "ltr";
  try { localStorage.setItem("al-showcase-lang", next); } catch {}
  for (const b of $$("[data-lang]")) b.setAttribute("aria-pressed", String(b.dataset.lang === next));
  translate();
  drawCharts();
}

// ---- theme --------------------------------------------------------------------------------

const themeButton = $("[data-theme-toggle]");
const drawThemeButton = () => {
  const en = currentTheme() === "dark" ? "Switch to light theme" : "Switch to dark theme";
  themeButton.dataset["alEnAriaLabel"] = en;
  themeButton.setAttribute("aria-label", T(en));
};
themeButton.addEventListener("click", () => { setTheme(currentTheme() === "dark" ? "light" : "dark"); drawThemeButton(); });

// ---- specimens ----------------------------------------------------------------------------

const ROLES = [
  ["bg", "The page"], ["surface", "Cards, panels, inputs"], ["surface-sunk", "Wells, hover, info"],
  ["text", "Body text"], ["text-muted", "Secondary text"], ["line", "Hairlines"], ["control", "Control borders"],
  ["accent", "Actions, focus, success"], ["on-accent", "Text on accent"], ["danger", "Errors, destroying"],
  ["warning", "Needs attention"], ["info", "Information"], ["inverse", "Toasts, tooltips"],
  ["chart-1", "Chart, first series"], ["chart-2", "Chart, second series"], ["chart-3", "Chart, third series"], ["chart-4", "Chart, fourth series"],
];
$("[data-swatches]").append(...ROLES.map(([name, role]) => el("div", { class: "sc-swatch" },
  el("span", { class: "sc-swatch__chip", style: `background: var(--al-color-${name})` }),
  el("code", { class: "sc-swatch__name", lang: "en" }, `--al-color-${name}`),
  el("span", { class: "sc-swatch__role" }, role))));

const SAMPLE = { en: "Know where every application stands", ar: "اعرف أين يقف كل طلب" };
const typeRows = () => ["display", "3xl", "2xl", "xl", "lg", "md", "base", "sm", "xs"].map((step) => el("div", { class: "sc-type__row" },
  el("code", { lang: "en" }, step),
  el("span", { style: `font-size: var(--al-text-${step}); font-family: var(--al-font-${["display", "3xl", "2xl", "xl"].includes(step) ? "display" : step === "md" ? "serif" : "sans"})` },
    el("span", { lang: "en" }, SAMPLE.en), " · ", el("span", { lang: "ar", dir: "rtl" }, SAMPLE.ar))));
$("[data-type-scale]").append(...typeRows());

$("[data-space-scale]").append(...["1", "2", "3", "4", "5", "6", "8", "12", "16"].map((n) => el("div", { class: "sc-space__row" },
  el("code", { lang: "en" }, `--al-space-${n}`),
  el("span", { class: "sc-space__bar", style: `inline-size: var(--al-space-${n})` }))));

const ICONS = ["check", "close", "chevron", "arrow", "plus", "minus", "info", "success", "warning", "danger", "undo", "retry", "more", "search", "external", "edit", "trash", "menu", "sidebar", "theme", "calendar", "settings", "file", "board"];
const MIRRORED = new Set(["chevron", "arrow", "undo", "retry", "external", "sidebar"]);
$("[data-icons]").append(...ICONS.map((n) => el("li", {}, icon(n, MIRRORED.has(n) ? "al-mirror" : ""), el("span", { lang: "en" }, n))));

$("[data-motion-demo]").addEventListener("click", () => $("[data-motion-target]").classList.toggle("is-moved"));

// ---- brand --------------------------------------------------------------------------------

fetch("assets/brand/mark.svg").then((r) => r.text()).then((svg) => {
  const clean = svg.replace(/<title[^>]*>[\s\S]*?<\/title>|<desc[^>]*>[\s\S]*?<\/desc>/g, "").replace(/role="img"|aria-labelledby="[^"]*"/g, "").replace(/width="64" height="64"/, 'width="100%" height="100%" aria-hidden="true" focusable="false"');
  for (const m of $$('[data-brand="mark"]')) m.innerHTML = clean;
});
for (const p of $$("[data-pattern]")) drawPattern(p);

// ---- feedback examples ----------------------------------------------------------------------

$("[data-toast]").addEventListener("click", () => toast(T("Process archived"), { action: T("Undo"), onAction: () => toast(T("Process restored")) }));
const confirmDialog = $("#confirm");
$('[data-dialog-open="confirm"]').addEventListener("click", () => confirmDialog.showModal());
confirmDialog.addEventListener("close", () => { if (confirmDialog.returnValue === "delete") toast(T("Account deleted (not really: this is an example)")); });

// The sidebar's collapse.
const shell = $("[data-sidebar-demo]");
$("[data-collapse]").addEventListener("click", (e) => {
  const collapsed = shell.dataset.sidebar !== "collapsed";
  if (collapsed) shell.dataset.sidebar = "collapsed"; else delete shell.dataset.sidebar;
  const b = e.currentTarget;
  b.setAttribute("aria-expanded", String(!collapsed));
  const label = b.querySelector(".al-sidebar__label");
  const en = collapsed ? "Expand sidebar" : "Collapse sidebar";
  label.textContent = T(en);
  original.set(label.firstChild, en);
  for (const a of $$(".al-sidebar__link", shell)) {
    const name = a.querySelector(".al-sidebar__label")?.textContent;
    if (collapsed && name) a.setAttribute("title", name); else a.removeAttribute("title");
  }
});

// Pending: unsaved → saving → saved, or failed with Retry; the figure stale meanwhile.
const state = $("[data-save-state]");
const figure = $("[data-stale-figure]");
const staleNote = $("[data-stale-note]");
const setState = (s, text) => {
  state.dataset.state = s;
  state.replaceChildren(document.createTextNode(T(text)));
  original.set(state.firstChild, text);
};
$("[data-pending-input]").addEventListener("input", () => {
  setState("unsaved", "Unsaved changes");
  figure.classList.add("al-stale");
  staleNote.hidden = false;
  clearTimeout(figure.timer);
  figure.timer = setTimeout(() => { figure.classList.remove("al-stale"); staleNote.hidden = true; }, 900);
});
const save = (ok) => {
  setState("saving", "Saving…");
  setTimeout(() => {
    if (ok) { setState("saved", "Saved"); return; }
    setState("failed", "Couldn't save");
    state.append(" ", el("button", { type: "button", class: "al-button al-button--quiet al-button--sm", onclick: () => save(true) }, T("Retry")));
  }, 900);
};
$("[data-save]").addEventListener("click", () => save(true));
$("[data-save-fail]").addEventListener("click", () => save(false));
$("[data-discard]").addEventListener("click", () => { $("[data-pending-input]").value = "550"; setState("saved", "Saved"); toast(T("Changes discarded"), { action: T("Undo"), onAction: () => setState("unsaved", "Unsaved changes") }); });

// An optimistic archive: the row goes at once, with Undo; if the server
// says no, it comes back where it was, marked, with why and Retry.
const archive = (li, fails) => {
  const list = li.parentElement;
  const next = li.nextElementSibling;
  li.querySelector(".al-rollback-note")?.remove();
  li.classList.remove("al-rolled-back");
  li.remove();
  const name = li.querySelector("span").textContent;
  if (!fails) {
    toast(T("Archived {name}").replace("{name}", name), { action: T("Undo"), onAction: () => list.insertBefore(li, next) });
    return;
  }
  setTimeout(() => {
    list.insertBefore(li, next);
    li.classList.add("al-rolled-back");
    const note = el("p", { class: "al-rollback-note", role: "alert" }, icon("danger", "al-icon--sm"),
      el("span", {}, T("Couldn't archive {name}: the server didn't answer. It's back where it was.").replace("{name}", name)),
      el("button", { type: "button", class: "al-button al-button--sm", onclick: () => archive(li, false) }, T("Retry")));
    li.append(note);
    note.querySelector("button").focus();
  }, 900);
};
for (const b of $$("[data-archive], [data-archive-fail]")) b.addEventListener("click", () => archive(b.closest("li"), b.hasAttribute("data-archive-fail")));

// ---- charts --------------------------------------------------------------------------------

// Amounts go into text and attributes, so they're isolated as strings
// (LRI … PDI, what <bdi> does in markup): with Arabic-Indic digits, "£"
// would otherwise drift to the far side of the number.
const iso = (s) => `\u2066${s}\u2069`;
const money = (v) => iso(formatMoney(v, "GBP", { lang, numerals }));
const k = (v) => iso(`£${formatNumber(Math.round(v / 1000), { lang, numerals })}k`);
function drawCharts() {
  // Columns: take-home a year for three offers, four years, against a target.
  const years = ["Year 1", "Year 2", "Year 3", "Year 4"];
  const series = [["Offer A", "al-c1", [120900, 107600, 107600, 107600]], ["Offer B", "al-c2", [92600, 92600, 92600, 92600]], ["Offer C", "al-c3", [98000, 101000, 104000, 107000]]];
  const want = 84000;
  const top = 150000;
  const pc = (v) => `${(100 * v) / top}%`;
  $("[data-chart-columns]").replaceChildren(el("div", { class: "al-chart" },
    el("div", { class: "al-chart__plot" },
      [0, 50000, 100000, 150000].map((v) => el("span", { class: "al-chart__grid", style: `inset-block-end: ${pc(v)}` }, el("span", {}, k(v)))),
      el("div", { class: "al-chart__slots" }, years.map((y, i) => el("div", { class: "al-chart__slot" },
        series.map(([name, c, values]) => el("span", { class: `al-chart__bar ${c}`, style: `block-size: ${pc(values[i])}`, tabindex: "0", "data-al-tip": `${money(values[i])}|${T(name)}, ${T(y)}` }))))),
      el("span", { class: "al-chart__target", style: `inset-block-end: ${pc(want)}`, tabindex: "0", "data-al-tip": `${money(want)}|${T("What you want")}` })),
    el("div", { class: "al-chart__axis" }, years.map((y) => el("span", {}, digits(T(y))))),
    el("div", { class: "al-key" },
      series.map(([name, c]) => el("span", { class: "al-key__item" }, el("span", { class: `al-swatch ${c}` }), T(name))),
      el("span", { class: "al-key__item" }, el("span", { class: "al-swatch al-swatch--target" }), `${T("What you want")}: ${money(want)}`))));

  // Split: where a year's pay goes.
  const parts = [["Take-home pay", "al-c1", 71597], ["Tax, NI and loans", "al-c2", 36402], ["Your pension", "al-c3", 5400], ["Other", "al-c0", 1200]];
  const total = parts.reduce((a, p) => a + p[2], 0);
  const pct = (v) => formatPercent(v / total, { lang, numerals });
  $("[data-chart-split]").replaceChildren(el("div", { class: "al-split-bar" },
    el("div", { class: "al-split-bar__track", role: "img", "aria-label": parts.map(([n, , v]) => `${T(n)} ${pct(v)}`).join(", ") },
      parts.map(([n, c, v]) => el("span", { class: `al-split-bar__part ${c}`, style: `inline-size: ${(100 * v) / total}%`, tabindex: "0", "data-al-tip": `${money(v)} · ${pct(v)}|${T(n)}` }))),
    el("div", { class: "al-key" }, parts.map(([n, c, v]) => el("span", { class: "al-key__item" }, el("span", { class: `al-swatch ${c}` }), `${T(n)} `, el("b", {}, pct(v)))))));

  // Bullet: each offer's take-home a month against what you want.
  const rows = [["Offer A", "al-c1", 10075], ["Offer B", "al-c2", 7718], ["Offer C", "al-c3", 8167]];
  const target = 7000;
  const max = 12000;
  $("[data-chart-bullet]").replaceChildren(el("div", { class: "al-bullet" },
    rows.map(([n, c, v]) => {
      const diff = v - target;
      return el("div", { class: "al-bullet__row" },
        el("span", { class: "al-bullet__label" }, T(n)),
        el("span", { class: "al-bullet__track" },
          el("span", { class: `al-bullet__bar ${c}`, style: `inline-size: ${(100 * v) / max}%`, tabindex: "0", "data-al-tip": `${money(v)}|${T(n)}` }),
          el("span", { class: "al-bullet__target", style: `inset-inline-start: ${(100 * target) / max}%` })),
        el("span", { class: "al-bullet__value" }, el("b", {}, money(v)), " ",
          el("span", { class: diff >= 0 ? "al-more" : "al-less" }, `${iso(`${diff >= 0 ? "+" : "−"}${formatMoney(Math.abs(diff), "GBP", { lang, numerals })}`)} ${T(diff >= 0 ? "more" : "short")}`)));
    }),
    el("div", { class: "al-key" }, el("span", { class: "al-key__item" }, el("span", { class: "al-swatch al-swatch--target" }), `${T("What you want")}: ${money(target)}`))));
}

// ---- start ---------------------------------------------------------------------------------

for (const b of $$("[data-lang]")) b.addEventListener("click", () => setLanguage(b.dataset.lang));
const drawNumerals = () => { for (const b of $$("[data-numerals]")) b.setAttribute("aria-pressed", String(b.dataset.numerals === numerals)); };
for (const b of $$("[data-numerals]")) b.addEventListener("click", () => {
  numerals = b.dataset.numerals;
  try { localStorage.setItem("al-showcase-numerals", numerals); } catch {}
  drawNumerals();
  translate();
  drawCharts();
});
drawNumerals();
drawCharts();
drawThemeButton();
initMenus();
initTabs();
initTooltips();
setLanguage(lang);
