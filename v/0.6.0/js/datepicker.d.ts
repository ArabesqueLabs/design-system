import type { Numerals } from "./format.js";

/** A date-only value: "YYYY-MM-DD". */
export type IsoDate = string;
type Live<T> = T | (() => T);

export interface DatePickerLabels {
  /** The previous-month button's name; default "Previous month". */
  previous?: string;
  /** The next-month button's name; default "Next month". */
  next?: string;
}
export interface DatePickerOptions {
  /** Labels in the page's language; a function is read each time it draws. */
  labels?: Live<DatePickerLabels>;
  /** Western ("latn", the default) or Arabic-Indic ("arab") digits. */
  numerals?: Live<Numerals>;
  /** The language; by default the input's nearest lang. */
  lang?: Live<string>;
}
export interface DatePicker {
  readonly input: HTMLInputElement;
  /** The chosen date, or null if none (or what's typed isn't a date). */
  value: IsoDate | null;
  open(): void;
  close(): void;
  /** Draw again in the current language and digits. */
  refresh(): void;
  /** Take the picker away; the input keeps its value and name. */
  destroy(): void;
}

/** Every input[data-al-date-picker] under root becomes a date picker. */
export function initDatePickers(root?: ParentNode, options?: DatePickerOptions): DatePicker[];
/** A typed date, day first, in either digit set; null if it isn't a date that exists. */
export function parseDate(text: string): IsoDate | null;
/** A date as it's written in the language and digits: "30/11/2026", "٣٠‏/١١‏/٢٠٢٦". */
export function formatDate(iso: IsoDate, options?: { lang?: string; numerals?: Numerals }): string;
/** The week's first day where the language is used, as JS counts days (0 Sunday … 6 Saturday). */
export function weekStart(lang?: string): number;
/** A month (0–11) as weeks of 7 dates, null outside the month. */
export function monthGrid(year: number, month: number, weekStart?: number): (IsoDate | null)[][];
/** Where a key moves the focused date; null if it doesn't. */
export function step(iso: IsoDate, key: string, options?: { rtl?: boolean; shift?: boolean; start?: number }): IsoDate | null;
/** Today, where the person is. */
export function today(): IsoDate;
