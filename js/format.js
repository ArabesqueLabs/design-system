// Numbers, money and percentages in the page's language, with the digits
// people chose. Arabic can be written with Western digits (123, the
// default, as on most Arabic sites and in finance) or Arabic-Indic (١٢٣);
// it's a preference, kept with the person's other settings, never inferred.
//
//   formatNumber(108000, { lang: "ar", numerals: "arab" })  → "١٠٨٬٠٠٠"
//   formatMoney(6010, "GBP", { lang: "ar" })                → "£6,010"
//   formatMoney(6010, "GBP", { lang: "ar", numerals: "arab" }) → "£٦٬٠١٠"
//
// Put the result in <bdi> (or .al-ltr) inside running text, so it stays
// whole in right-to-left; where it goes into a string (an aria-label, a
// tooltip), wrap it in U+2066 … U+2069. With Arabic-Indic digits this
// matters more: they don't carry "£" with them as Western digits do.

/** The Intl locale for a language and a numeral system ("latn" | "arab"). */
export function numberLocale(lang = document.documentElement.lang || "en", numerals = "latn") {
  const base = lang === "ar" ? "ar" : "en-GB";
  return `${base}-u-nu-${numerals === "arab" ? "arab" : "latn"}`;
}

export function formatNumber(value, { lang, numerals, ...options } = {}) {
  return new Intl.NumberFormat(numberLocale(lang, numerals), options).format(value);
}

/** The short symbol for a currency: £, $, €; or its code where there's none. */
export function currencySymbol(currency) {
  return new Intl.NumberFormat("en", { style: "currency", currency, currencyDisplay: "narrowSymbol" })
    .formatToParts(0).find((p) => p.type === "currency").value;
}

// Arabic locales spell some symbols out ("UK£") and move them after the
// number; the system writes the short symbol first in both languages, so
// money reads the same and stays one isolated run.
export function formatMoney(value, currency = "GBP", { lang, numerals, maximumFractionDigits = 0, ...options } = {}) {
  const amount = formatNumber(Math.abs(value), { lang, numerals, maximumFractionDigits, minimumFractionDigits: Math.min(maximumFractionDigits, options.minimumFractionDigits ?? 0) });
  return `${value < 0 ? "−" : ""}${currencySymbol(currency)}${amount}`;
}

export function formatPercent(fraction, { lang, numerals, ...options } = {}) {
  return formatNumber(fraction, { lang, numerals, style: "percent", maximumFractionDigits: 0, ...options });
}

/** Read typed numbers in either digit set: "١٠٨٬٠٠٠", "108,000", "108k". */
export function parseNumber(text) {
  const western = String(text)
    .replace(/[٠-٩]/g, (d) => String(d.charCodeAt(0) - 0x0660))
    .replace(/[۰-۹]/g, (d) => String(d.charCodeAt(0) - 0x06f0))
    .replace(/[٬,\s]/g, "")
    .replace(/٫/g, ".");
  const m = western.match(/^(-?\d*\.?\d+)([km])?$/i);
  if (!m) return NaN;
  return Number(m[1]) * ({ k: 1e3, m: 1e6 }[m[2]?.toLowerCase()] ?? 1);
}
