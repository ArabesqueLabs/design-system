// One of two to five short options, all visible at once: radios in a form,
// or pressed buttons for a view setting that applies at once.

import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { cx } from "./util.js";

export interface SegmentedOption<V extends string> {
  value: V;
  label: ReactNode;
  /** The option's own language, when it's written in it ("العربية"). */
  lang?: string;
  /** Its name, when the label is a symbol or digits. */
  ariaLabel?: string;
}

interface Common<V extends string> {
  options: SegmentedOption<V>[];
  value: V;
  /** Fills the row, each option an equal share. */
  fill?: boolean;
  className?: string;
}

export interface SegmentedProps<V extends string> extends Common<V> {
  /** The radios' name, for a form. */
  name: string;
  onChange?: (value: V) => void;
}

/** Radios: for a form. Put it in a <Fieldset> with a legend. */
export function Segmented<V extends string>({ options, value, name, onChange, fill, className }: SegmentedProps<V>) {
  return (
    <div className={cx("al-segmented", fill && "al-segmented--fill", className)}>
      {options.map((o) => (
        <label key={o.value} lang={o.lang}>
          <input type="radio" name={name} value={o.value} aria-label={o.ariaLabel}
            {...(onChange ? { checked: o.value === value, onChange: () => onChange(o.value) } : { defaultChecked: o.value === value })} /> {o.label}
        </label>
      ))}
    </div>
  );
}

export interface SegmentedButtonsProps<V extends string> extends Common<V>, Omit<ComponentPropsWithoutRef<"div">, "onChange" | "children"> {
  /** The group's name ("Language"). */
  label: string;
  onChange: (value: V) => void;
}

/** Pressed buttons: for a setting that applies at once (language, theme, a view). */
export function SegmentedButtons<V extends string>({ options, value, label, onChange, fill, className, ...rest }: SegmentedButtonsProps<V>) {
  return (
    <div className={cx("al-segmented", fill && "al-segmented--fill", className)} role="group" aria-label={label} {...rest}>
      {options.map((o) => (
        <button key={o.value} type="button" aria-pressed={o.value === value} lang={o.lang} aria-label={o.ariaLabel} onClick={() => onChange(o.value)}>{o.label}</button>
      ))}
    </div>
  );
}
