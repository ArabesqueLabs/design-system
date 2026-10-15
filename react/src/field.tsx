// A form control with its label, hint and error, in that order: label →
// control → hint → error. The control inside a <Field> takes its id,
// aria-describedby and aria-invalid from it, so they can't disagree.

import { createContext, useContext, type ComponentPropsWithoutRef, type ReactNode } from "react";
import { Icon } from "./icon.js";
import { useArabesque } from "./settings.js";
import { cx, useStableId } from "./util.js";

interface FieldContext { id: string; describedBy?: string; invalid: boolean }
const FieldCtx = createContext<FieldContext | null>(null);

/** The id, description and validity a control inside a <Field> takes. */
export function useField(own: { id?: string; "aria-describedby"?: string; "aria-invalid"?: ComponentPropsWithoutRef<"input">["aria-invalid"] } = {}) {
  const f = useContext(FieldCtx);
  return {
    id: own.id ?? f?.id,
    "aria-describedby": cx(own["aria-describedby"], f?.describedBy),
    "aria-invalid": own["aria-invalid"] ?? (f?.invalid ? true : undefined),
  };
}

export interface FieldProps extends Omit<ComponentPropsWithoutRef<"div">, "children"> {
  label: ReactNode;
  /** The control's id; one is made if it's not given. */
  id?: string;
  hint?: ReactNode;
  /** The error, under the control; the control is marked invalid while there is one. */
  error?: ReactNode;
  /** Marks the label "(optional)"; required fields aren't marked. */
  optional?: boolean;
  /** What the label adds in a lighter weight, in place of "(optional)": "(before tax)". */
  labelNote?: ReactNode;
  /** Changed and not yet saved: says so under the control. */
  changed?: ReactNode;
  children: ReactNode;
}

export function Field({ label, id, hint, error, optional, labelNote, changed, className, children, ...rest }: FieldProps) {
  const { labels } = useArabesque();
  const controlId = useStableId(id, "field");
  const hintId = hint ? `${controlId}-hint` : undefined;
  const errorId = error ? `${controlId}-error` : undefined;
  const note = labelNote ?? (optional ? labels.optional : null);
  return (
    <div className={cx("al-field", className)} data-changed={changed ? "" : undefined} {...rest}>
      <label className="al-label" htmlFor={controlId}>{label}{note && <> <span className="al-label__optional">{note}</span></>}</label>
      <FieldCtx.Provider value={{ id: controlId, describedBy: cx(hintId, errorId), invalid: !!error }}>{children}</FieldCtx.Provider>
      {hint && <p className="al-hint" id={hintId}>{hint}</p>}
      {error && <ErrorMessage id={errorId}>{error}</ErrorMessage>}
      {changed && <p className="al-field__changed">{changed}</p>}
    </div>
  );
}

/** An inline error: a danger icon, and "Error:" for screen readers. */
export function ErrorMessage({ className, children, ...rest }: ComponentPropsWithoutRef<"p">) {
  const { labels } = useArabesque();
  return (
    <p className={cx("al-error", className)} {...rest}>
      <Icon name="danger" size="sm" />
      <span className="al-visually-hidden">{labels.errorPrefix} </span>
      {children}
    </p>
  );
}

export interface InputProps extends ComponentPropsWithoutRef<"input"> {
  /** A number or an amount: tabular, left to right, a decimal keypad. */
  number?: boolean;
}
export function Input({ number, className, ...rest }: InputProps) {
  const field = useField(rest);
  return <input className={cx("al-input", number && "al-input--number", className)} inputMode={number ? "decimal" : undefined} {...rest} {...field} />;
}

export function Select({ className, ...rest }: ComponentPropsWithoutRef<"select">) {
  const field = useField(rest);
  return <select className={cx("al-select", className)} {...rest} {...field} />;
}

export function Textarea({ className, ...rest }: ComponentPropsWithoutRef<"textarea">) {
  const field = useField(rest);
  return <textarea className={cx("al-textarea", className)} {...rest} {...field} />;
}

/** A control with what goes before or after it: a currency, a period ("a year"). */
export function Affix({ className, ...rest }: ComponentPropsWithoutRef<"div">) {
  return <div className={cx("al-affix", className)} {...rest} />;
}
export function AffixText({ className, ...rest }: ComponentPropsWithoutRef<"span">) {
  return <span className={cx("al-affix__text", className)} {...rest} />;
}

export interface FieldsetProps extends ComponentPropsWithoutRef<"fieldset"> {
  legend: ReactNode;
}
/** Related fields, and every group of radios, under one legend. */
export function Fieldset({ legend, className, children, ...rest }: FieldsetProps) {
  return (
    <fieldset className={cx("al-fieldset", className)} {...rest}>
      <legend>{legend}</legend>
      {children}
    </fieldset>
  );
}

export function Hint({ className, ...rest }: ComponentPropsWithoutRef<"span">) {
  return <span className={cx("al-hint", className)} {...rest} />;
}
