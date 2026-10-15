// Native checkboxes and radios, and a switch for a setting that takes effect at once.

import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { cx } from "./util.js";

export interface ChoiceProps extends Omit<ComponentPropsWithoutRef<"input">, "type" | "role"> {
  label: ReactNode;
  /** A line under the label, in the label (so it's read with it). */
  hint?: ReactNode;
}

function Choice({ label, hint, type, role, className, ...rest }: ChoiceProps & { type: "checkbox" | "radio"; role?: "switch" }) {
  return (
    <label className="al-choice">
      <input type={type} role={role} className={cx(role === "switch" && "al-switch", className)} {...rest} />{" "}
      <span className="al-choice__text">{label}{hint && <> <span className="al-choice__hint">{hint}</span></>}</span>
    </label>
  );
}

export const Checkbox = (props: ChoiceProps) => <Choice type="checkbox" {...props} />;
export const Radio = (props: ChoiceProps) => <Choice type="radio" {...props} />;
/** On or off, at once: no Save. Its label says what's on, not "Enable…". */
export const Switch = (props: ChoiceProps) => <Choice type="checkbox" role="switch" {...props} />;

/** Checkboxes or radios one under another, or in a row with `inline`. */
export function Choices({ inline, className, ...rest }: ComponentPropsWithoutRef<"div"> & { inline?: boolean }) {
  return <div className={cx("al-choices", inline && "al-choices--inline", className)} {...rest} />;
}
