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

/** Arabesque's mark: four of the mark's tiles, two by two (assets/brand/arabesque-mark.svg; a test checks they agree). */
export const ARABESQUE_MARK_PATH = "M4.69 -4.69L2.75 0L4.69 4.69L0 2.75L-4.69 4.69L-2.75 0L-4.69 -4.69L0 -2.75L4.69 -4.69Z M4.69 27.31L2.75 32L4.69 36.69L0 34.75L-4.69 36.69L-2.75 32L-4.69 27.31L0 29.25L4.69 27.31Z M4.69 59.31L2.75 64L4.69 68.69L0 66.75L-4.69 68.69L-2.75 64L-4.69 59.31L0 61.25L4.69 59.31Z M36.69 -4.69L34.75 0L36.69 4.69L32 2.75L27.31 4.69L29.25 0L27.31 -4.69L32 -2.75L36.69 -4.69Z M32 16L24 19.31L27.31 27.31L19.31 24L16 32L12.69 24L4.69 27.31L8 19.31L0 16L8 12.69L4.69 4.69L12.69 8L16 0L19.31 8L27.31 4.69L24 12.69L32 16Z M36.69 27.31L34.75 32L36.69 36.69L32 34.75L27.31 36.69L29.25 32L27.31 27.31L32 29.25L36.69 27.31Z M32 48L24 51.31L27.31 59.31L19.31 56L16 64L12.69 56L4.69 59.31L8 51.31L0 48L8 44.69L4.69 36.69L12.69 40L16 32L19.31 40L27.31 36.69L24 44.69L32 48Z M36.69 59.31L34.75 64L36.69 68.69L32 66.75L27.31 68.69L29.25 64L27.31 59.31L32 61.25L36.69 59.31Z M68.69 -4.69L66.75 0L68.69 4.69L64 2.75L59.31 4.69L61.25 0L59.31 -4.69L64 -2.75L68.69 -4.69Z M64 16L56 19.31L59.31 27.31L51.31 24L48 32L44.69 24L36.69 27.31L40 19.31L32 16L40 12.69L36.69 4.69L44.69 8L48 0L51.31 8L59.31 4.69L56 12.69L64 16Z M68.69 27.31L66.75 32L68.69 36.69L64 34.75L59.31 36.69L61.25 32L59.31 27.31L64 29.25L68.69 27.31Z M64 48L56 51.31L59.31 59.31L51.31 56L48 64L44.69 56L36.69 59.31L40 51.31L32 48L40 44.69L36.69 36.69L44.69 40L48 32L51.31 40L59.31 36.69L56 44.69L64 48Z M68.69 59.31L66.75 64L68.69 68.69L64 66.75L59.31 68.69L61.25 64L59.31 59.31L64 61.25L68.69 59.31Z";

/** Arabesque's mark, in the current colour: where the design system stands alone. Decoration beside its name; alone, give it a `title`. */
export function ArabesqueMark({ title, className, ...rest }: ComponentPropsWithoutRef<"svg"> & { title?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" className={cx("al-mark", className)} role={title ? "img" : undefined} aria-hidden={title ? undefined : true} aria-label={title} focusable="false" {...rest}>
      <g fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinejoin="miter">
        <path d={ARABESQUE_MARK_PATH} />
        <rect x="1.2" y="1.2" width="61.6" height="61.6" />
      </g>
    </svg>
  );
}

/** The star at the mark's centre (assets/brand/star.svg). */
export const STAR_PATH = MARK_PATHS[1]!;

/** The mark's star alone, solid: for 16–24px, where the frame would clog. */
export function Star({ title, className, ...rest }: ComponentPropsWithoutRef<"svg"> & { title?: string }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64" className={cx("al-mark", className)} role={title ? "img" : undefined} aria-hidden={title ? undefined : true} aria-label={title} focusable="false" {...rest}>
      <path d={STAR_PATH} fill="currentColor" />
    </svg>
  );
}

export interface LockupProps extends ComponentPropsWithoutRef<"a"> {
  /** The mark over the wordmark: for a splash or print. */
  stacked?: boolean;
  /** A product's name after the wordmark ("hunt", "Design system"). */
  product?: ReactNode;
  /** In place of the wordmark: the company's legal name in a footer, say. */
  name?: ReactNode;
  /** In place of the mark: `<ArabesqueMark />` for the design system's own lockup. */
  mark?: ReactNode;
}

/** The mark beside the wordmark: a link with an href, otherwise just the lockup. */
export function Lockup({ product, name, mark, stacked, href, className, ...rest }: LockupProps) {
  const inner = (
    <>
      {mark ?? <Mark />}
      {name ?? <Wordmark />}
      {product && <span className="al-lockup__product">{product}</span>}
    </>
  );
  const classes = cx("al-lockup", stacked && "al-lockup--stacked", className);
  return href ? <a className={classes} href={href} {...rest}>{inner}</a> : <span className={classes}>{inner}</span>;
}
