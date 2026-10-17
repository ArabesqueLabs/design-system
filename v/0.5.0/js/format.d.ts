export type Numerals = "latn" | "arab";
export interface NumberOptions extends Intl.NumberFormatOptions { lang?: string; numerals?: Numerals }
export interface MoneyOptions extends NumberOptions { signDisplay?: "auto" | "always" | "exceptZero" | "never" }
/** The Intl locale for a language ("en", "ar", "ar-SA"…) and a numeral system. */
export function numberLocale(lang?: string, numerals?: Numerals): string;
export function formatNumber(value: number, options?: NumberOptions): string;
/** The short symbol for a currency (£, $, €), or its code where there's none. */
export function currencySymbol(currency: string): string;
/** The symbol first, in both languages: "£6,010", "£٦٬٠١٠", "SAR 100". */
export function formatMoney(value: number, currency?: string, options?: MoneyOptions): string;
export function formatPercent(fraction: number, options?: NumberOptions): string;
/** Typed numbers in either digit set, and this module's own output; NaN if it isn't one. */
export function parseNumber(text: string): number;
