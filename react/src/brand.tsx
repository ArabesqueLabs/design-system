// The mark (one tile of the pattern, in a square frame), the wordmark, and
// the lockup of the two. The mark's geometry is assets/brand/mark.svg's (a
// test checks they agree).

import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { useArabesque } from "./settings.js";
import { cx } from "./util.js";

export const MARK_PATHS = [
  "M9.37 -9.37L5.49 0L9.37 9.37L0 5.49L-9.37 9.37L-5.49 0L-9.37 -9.37L0 -5.49Z M73.37 -9.37L69.49 0L73.37 9.37L64 5.49L54.63 9.37L58.51 0L54.63 -9.37L64 -5.49Z M9.37 54.63L5.49 64L9.37 73.37L0 69.49L-9.37 73.37L-5.49 64L-9.37 54.63L0 58.51Z M73.37 54.63L69.49 64L73.37 73.37L64 69.49L54.63 73.37L58.51 64L54.63 54.63L64 58.51Z",
  "M64 32L48 38.63L54.63 54.63L38.63 48L32 64L25.37 48L9.37 54.63L16 38.63L0 32L16 25.37L9.37 9.37L25.37 16L32 0L38.63 16L54.63 9.37L48 25.37Z",
];

/** The mark, in the current colour. Decoration beside the wordmark; alone, give it a `title`. */
export function Mark({ title, className, ...rest }: ComponentPropsWithoutRef<"svg"> & { title?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" className={cx("al-mark", className)} role={title ? "img" : undefined} aria-hidden={title ? undefined : true} aria-label={title} focusable="false" {...rest}>
      <g fill="none" stroke="currentColor" strokeWidth="3.2" strokeLinejoin="miter">
        {MARK_PATHS.map((d) => <path key={d} d={d} />)}
        <rect x="1.6" y="1.6" width="60.8" height="60.8" />
      </g>
    </svg>
  );
}

/** The name, in the page's language: "Arabesque Labs", or "معامل آرابيسك" in Arabic. */
export function Wordmark({ className }: { className?: string }) {
  const { lang } = useArabesque();
  const ar = /^ar\b/i.test(lang);
  return <span className={cx("al-wordmark", className)} lang={ar ? "ar" : "en"}>{ar ? "معامل آرابيسك" : "Arabesque Labs"}</span>;
}

export interface LockupProps extends ComponentPropsWithoutRef<"a"> {
  /** A product's name after the wordmark ("hunt", "Design system"). */
  product?: ReactNode;
  /** In place of the wordmark: the company's legal name in a footer, say. */
  name?: ReactNode;
}

/** The mark beside the wordmark: a link with an href, otherwise just the lockup. */
export function Lockup({ product, name, href, className, ...rest }: LockupProps) {
  const inner = (
    <>
      <Mark />
      {name ?? <Wordmark />}
      {product && <span className="al-lockup__product">{product}</span>}
    </>
  );
  return href ? <a className={cx("al-lockup", className)} href={href} {...rest}>{inner}</a> : <span className={cx("al-lockup", className)}>{inner}</span>;
}
