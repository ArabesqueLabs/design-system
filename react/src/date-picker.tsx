// A date near today, typed or chosen from a calendar in the page's
// language (js/datepicker.js). The value is an ISO date in a hidden field
// with the input's name.

import { useEffect, useRef } from "react";
import { initDatePickers, type DatePicker as Picker, type IsoDate } from "../../js/datepicker.js";
import { Field, useField, type FieldProps } from "./field.js";
import { Icon } from "./icon.js";
import { useArabesque } from "./settings.js";

export interface DatePickerProps extends Omit<FieldProps, "children" | "onChange"> {
  /** The hidden field's name, for a form. */
  name?: string;
  /** The date it starts with. */
  defaultValue?: IsoDate;
  /** The first and last dates that can be chosen. */
  min?: IsoDate;
  max?: IsoDate;
  /** Told the chosen date, or null when what's typed isn't one. */
  onChange?: (value: IsoDate | null) => void;
}

export function DatePicker({ name, defaultValue, min, max, onChange, ...field }: DatePickerProps) {
  const settings = useArabesque();
  const live = useRef(settings);
  live.current = settings;
  const changed = useRef(onChange);
  changed.current = onChange;
  const wrap = useRef<HTMLDivElement>(null);
  const picker = useRef<Picker | null>(null);

  useEffect(() => {
    const el = wrap.current;
    if (!el) return;
    const [p] = initDatePickers(el, {
      lang: () => live.current.lang,
      numerals: () => live.current.numerals,
      labels: () => ({ previous: live.current.labels.previousMonth, next: live.current.labels.nextMonth }),
    });
    picker.current = p ?? null;
    const report = () => changed.current?.(picker.current?.value ?? null);
    p?.input.addEventListener("change", report);
    return () => { p?.input.removeEventListener("change", report); p?.destroy(); picker.current = null; };
  }, []);
  // A new language or digits: drawn again in them.
  useEffect(() => { picker.current?.refresh(); }, [settings.lang, settings.numerals]);

  return (
    <Field {...field}>
      <div className="al-date-picker" ref={wrap}>
        <DateInputControl name={name} defaultValue={defaultValue} min={min} max={max} />
        <button type="button" className="al-button al-button--icon al-date-picker__toggle" aria-label={settings.labels.chooseDate}>
          <Icon name="calendar" />
        </button>
      </div>
    </Field>
  );
}

function DateInputControl({ name, defaultValue, min, max }: { name?: string; defaultValue?: string; min?: string; max?: string }) {
  const field = useField();
  return <input className="al-input" name={name} defaultValue={defaultValue} data-min={min} data-max={max} data-al-date-picker="" autoComplete="off" {...field} />;
}

/** "For example, 30/11/2026", written as the picker writes dates (put it in the hint). */
export function DateExample({ date }: { date: IsoDate }) {
  return <span data-al-date-example={date}>{date}</span>;
}
