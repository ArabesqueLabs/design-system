// What every component needs to know about the page it's on: its language
// (for built-in labels and digits), its digits, and where the icon sprite is.
// Set once, near the root, with <ArabesqueProvider>. Without one, a component
// takes the language of <html lang> (in the browser; English on the server),
// Western digits, and the sprite at /dist/icons.svg.

import { createContext, useContext, type ReactNode } from "react";
import type { Numerals } from "../../js/format.js";

/** The components' own words: names of icon buttons, status text, counts. */
export interface Labels {
  menu: string;
  sections: string;
  switchToDark: string;
  switchToLight: string;
  skipToContent: string;
  clearSearch: string;
  chooseDate: string;
  previousMonth: string;
  nextMonth: string;
  breadcrumb: string;
  back: string;
  collapseSidebar: string;
  expandSidebar: string;
  dismiss: string;
  close: string;
  cancel: string;
  discardQuestion: string;
  keepEditing: string;
  discardChanges: string;
  optional: string;
  change: string;
  loading: string;
  newTab: string;
  noticeInfo: string;
  noticeSuccess: string;
  noticeWarning: string;
  noticeDanger: string;
  errorPrefix: string;
  errorTitle: string;
  day: string;
  month: string;
  year: string;
  unsaved: string;
  saving: string;
  saved: string;
  failed: string;
  retry: string;
  clearSelection: string;
  workingOut: string;
  contactAngle: string;
  heroCaption: string;
  announcement: string;
  onThisPage: string;
  backToTop: string;
  copy: string;
  copied: string;
  copyFailed: string;
  /** "{name}" is the tag's text. */
  removeTag: string;
  /** "{n}" is the count, in the page's digits. */
  selected: string;
  /** Character count: "{n}" is the number, in the page's digits. */
  countLeftOne: string;
  countLeft: string;
  countOverOne: string;
  countOver: string;
  countLimit: string;
}

export const englishLabels: Labels = {
  menu: "Menu",
  sections: "Sections",
  switchToDark: "Switch to dark theme",
  switchToLight: "Switch to light theme",
  skipToContent: "Skip to content",
  clearSearch: "Clear search",
  chooseDate: "Choose date",
  previousMonth: "Previous month",
  nextMonth: "Next month",
  breadcrumb: "Breadcrumb",
  back: "Back",
  collapseSidebar: "Collapse sidebar",
  expandSidebar: "Expand sidebar",
  dismiss: "Dismiss",
  close: "Close",
  cancel: "Cancel",
  discardQuestion: "Discard your changes?",
  keepEditing: "Keep editing",
  discardChanges: "Discard changes",
  optional: "(optional)",
  change: "Change",
  loading: "Loading",
  newTab: "(opens in a new tab)",
  noticeInfo: "Note",
  noticeSuccess: "Done",
  noticeWarning: "Warning",
  noticeDanger: "Error",
  errorPrefix: "Error:",
  errorTitle: "There is a problem",
  day: "Day",
  month: "Month",
  year: "Year",
  unsaved: "Unsaved changes",
  saving: "Saving…",
  saved: "Saved",
  failed: "Couldn't save",
  retry: "Retry",
  clearSelection: "Clear selection",
  workingOut: "Working out again…",
  contactAngle: "Contact angle",
  heroCaption: "This tile is our mark. Everything around it follows from the same rule.",
  announcement: "Announcement",
  onThisPage: "On this page",
  backToTop: "Back to top",
  copy: "Copy",
  copied: "Copied",
  copyFailed: "Couldn't copy. The text is selected, so you can copy it yourself.",
  removeTag: "Remove tag {name}",
  selected: "{n} selected",
  countLeftOne: "You have {n} character remaining",
  countLeft: "You have {n} characters remaining",
  countOverOne: "You have {n} character too many",
  countOver: "You have {n} characters too many",
  countLimit: "You can enter up to {n} characters",
};

/** As the showcase says them (showcase-ar.js). */
export const arabicLabels: Labels = {
  menu: "القائمة",
  sections: "الأقسام",
  switchToDark: "التبديل إلى المظهر الداكن",
  switchToLight: "التبديل إلى المظهر الفاتح",
  skipToContent: "انتقل إلى المحتوى",
  clearSearch: "مسح البحث",
  chooseDate: "اختر التاريخ",
  previousMonth: "الشهر السابق",
  nextMonth: "الشهر التالي",
  breadcrumb: "مسار التنقل",
  back: "رجوع",
  collapseSidebar: "طيّ الشريط الجانبي",
  expandSidebar: "توسيع الشريط الجانبي",
  dismiss: "إغلاق",
  close: "إغلاق",
  cancel: "إلغاء",
  discardQuestion: "هل تريد تجاهل تغييراتك؟",
  keepEditing: "متابعة التعديل",
  discardChanges: "تجاهل التغييرات",
  optional: "(اختياري)",
  change: "تغيير",
  loading: "جارٍ التحميل",
  newTab: "(يُفتح في تبويب جديد)",
  noticeInfo: "ملاحظة",
  noticeSuccess: "تم",
  noticeWarning: "تنبيه",
  noticeDanger: "خطأ",
  errorPrefix: "خطأ:",
  errorTitle: "توجد مشكلة",
  day: "اليوم",
  month: "الشهر",
  year: "السنة",
  unsaved: "تغييرات غير محفوظة",
  saving: "جارٍ الحفظ…",
  saved: "حُفظ",
  failed: "تعذّر الحفظ",
  retry: "أعد المحاولة",
  clearSelection: "امسح التحديد",
  workingOut: "جارٍ الحساب من جديد…",
  contactAngle: "زاوية التلامس",
  heroCaption: "هذه البلاطة هي علامتنا. كل ما حولها ينبع من القاعدة نفسها.",
  announcement: "إعلان",
  onThisPage: "في هذه الصفحة",
  backToTop: "العودة إلى الأعلى",
  copy: "انسخ",
  copied: "نُسخ",
  copyFailed: "تعذّر النسخ. النص محدّد لتنسخه بنفسك.",
  removeTag: "أزل وسم {name}",
  selected: "{n} محدّدة",
  countLeftOne: "تبقّى لك حرف واحد",
  countLeft: "تبقّى لك {n} حرفًا",
  countOverOne: "تجاوزت الحد بحرف واحد",
  countOver: "تجاوزت الحد بـ{n} حرفًا",
  countLimit: "يمكنك إدخال {n} حرفًا كحد أقصى",
};

export interface Settings {
  /** The page's language: "en", "ar", "ar-SA"… */
  lang: string;
  /** Western ("latn") or Arabic-Indic ("arab") digits, where the language is Arabic. */
  numerals: Numerals;
  /** The icon sprite's URL (dist/icons.svg, served from the same origin as the page). */
  sprite: string;
  labels: Labels;
}

const defaults: Settings = { lang: "en", numerals: "latn", sprite: "/dist/icons.svg", labels: englishLabels };
const Context = createContext<Settings | null>(null);
const arabicDefaults: Settings = { ...defaults, lang: "ar", labels: arabicLabels };

export interface ArabesqueProviderProps {
  lang?: string;
  numerals?: Numerals;
  sprite?: string;
  /** Your own words for any of the components' labels; the rest follow the language. */
  labels?: Partial<Labels>;
  children?: ReactNode;
}

/** The page's language, digits and sprite, for every component inside it. */
export function ArabesqueProvider({ lang = "en", numerals = "latn", sprite = defaults.sprite, labels, children }: ArabesqueProviderProps) {
  const base = /^ar\b/i.test(lang) ? arabicLabels : englishLabels;
  return <Context.Provider value={{ lang, numerals: /^ar\b/i.test(lang) ? numerals : "latn", sprite, labels: { ...base, ...labels } }}>{children}</Context.Provider>;
}

/**
 * The page's settings: from the nearest <ArabesqueProvider>, or else from
 * <html lang>. On the server there's no <html> to read, so a page rendered
 * there in Arabic needs the provider (or it renders in English, and React
 * finds a mismatch in the browser).
 */
export function useArabesque(): Settings {
  const given = useContext(Context);
  if (given) return given;
  const lang = typeof document === "undefined" ? "" : document.documentElement.lang;
  return /^ar\b/i.test(lang) ? { ...arabicDefaults, lang } : defaults;
}

/** A label with its placeholders filled: fill("{n} selected", { n: "3" }). */
export const fill = (label: string, values: Record<string, string>): string => label.replace(/\{(\w+)\}/g, (m, k: string) => values[k] ?? m);
