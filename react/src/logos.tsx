// Who uses it: their marks in one colour, as many to a row as fit.

import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { cx } from "./util.js";

export interface LogosProps extends Omit<ComponentPropsWithoutRef<"ul">, "children"> {
  /** What the list is ("Who builds with it"): its name, for screen readers, when no heading names it. */
  label?: string;
  /** Each logo: an <img alt="Their name">, an SVG with a <title>, or a <LogoWordmark>. */
  logos: ReactNode[];
}

export function Logos({ label, logos, className, ...rest }: LogosProps) {
  return (
    <ul className={cx("al-logos", className)} aria-label={label} {...rest}>
      {logos.map((logo, i) => <li key={i}>{logo}</li>)}
    </ul>
  );
}

/** A name set in type, with an icon if you like: for a logo you don't have as a file. */
export function LogoWordmark({ className, ...rest }: ComponentPropsWithoutRef<"span">) {
  return <span className={cx("al-logos__wordmark", className)} {...rest} />;
}
