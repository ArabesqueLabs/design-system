// Three fields for a date people already know: a birthday, an issue date.

import type { ReactNode } from "react";
import { useArabesque } from "./settings.js";
import { cx, useStableId } from "./util.js";

export interface DateInputProps {
  legend: ReactNode;
  hint?: ReactNode;
  /** The fields' names and ids start with this: dob → dob-day, dob-month, dob-year. */
  id?: string;
  /** Autocomplete for a birthday (bday-day, bday-month, bday-year). */
  birthday?: boolean;
  defaultValue?: { day?: string; month?: string; year?: string };
  className?: string;
}

export function DateInput({ legend, hint, id, birthday, defaultValue = {}, className }: DateInputProps) {
  const { labels } = useArabesque();
  const base = useStableId(id, "date");
  const hintId = hint ? `${base}-hint` : undefined;
  const part = (key: "day" | "month" | "year", label: string) => (
    <div className={cx("al-field", key === "year" && "al-date-input__year")}>
      <label className="al-label" htmlFor={`${base}-${key}`}>{label}</label>
      <input className="al-input" id={`${base}-${key}`} name={`${base}-${key}`} inputMode="numeric" autoComplete={birthday ? `bday-${key}` : undefined} defaultValue={defaultValue[key]} />
    </div>
  );
  return (
    <fieldset className={cx("al-fieldset", className)} role="group" aria-describedby={hintId}>
      <legend>{legend}</legend>
      {hint && <span className="al-hint" id={hintId}>{hint}</span>}
      <div className="al-date-input">
        {part("day", labels.day)}
        {part("month", labels.month)}
        {part("year", labels.year)}
      </div>
    </fieldset>
  );
}
