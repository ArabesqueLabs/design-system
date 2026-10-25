// A value along a scale, with the value itself beside it.

import { useState, type ComponentPropsWithoutRef } from "react";
import { formatNumber } from "../../js/format.js";
import { useField } from "./field.js";
import { useArabesque } from "./settings.js";
import { cx } from "./util.js";

export interface RangeProps extends Omit<ComponentPropsWithoutRef<"input">, "type" | "value" | "defaultValue" | "onChange"> {
  value?: number;
  defaultValue?: number;
  onChange?: (value: number) => void;
  /** The value as it's shown and read ("40%", "£1,200 a month"); the page's digits by default. */
  format?: (value: number) => string;
}

/** Inside a <Field>, which names it: the slider, and its value in an <output>. */
export function Range({ value, defaultValue, onChange, format, min = 0, max = 100, className, ...rest }: RangeProps) {
  const { lang, numerals } = useArabesque();
  const field = useField(rest);
  const [own, setOwn] = useState(defaultValue ?? Number(min));
  const v = value ?? own;
  const text = format ? format(v) : formatNumber(v, { lang, numerals });
  return (
    <div className={cx("al-range", className)}>
      <input type="range" min={min} max={max} value={v} aria-valuetext={text} {...rest} {...field}
        onChange={(e) => { const next = Number(e.target.value); setOwn(next); onChange?.(next); }} />
      <output htmlFor={field.id} aria-hidden="true">{text}</output>
    </div>
  );
}
