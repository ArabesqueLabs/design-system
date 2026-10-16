// The same page in the other language: named in that language, marked with
// its lang and hreflang. Never a flag.

import { cx } from "./util.js";

/** Each language's name, in itself. */
export const languageNames: Record<string, string> = { en: "English", ar: "العربية" };

export interface LanguageLinkProps {
  /** The same page in that language. */
  href: string;
  /** The language it leads to: "ar", "en". */
  lang: string;
  /** Its name in itself; "العربية" or "English" by default. */
  label?: string;
  className?: string;
}

export function LanguageLink({ href, lang, label, className }: LanguageLinkProps) {
  return <a className={cx("al-language", className)} href={href} hrefLang={lang} lang={lang}>{label ?? languageNames[lang.split("-")[0]!] ?? lang}</a>;
}
