import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { Lockup } from "./brand.js";
import { cx } from "./util.js";

export interface FooterProps extends ComponentPropsWithoutRef<"footer"> {
  /** In place of the lockup; false for none. */
  lockup?: ReactNode;
  links?: { label: ReactNode; href: string }[];
  /** The legal line: the company, its number, ©. */
  legal?: ReactNode;
  /** Under the legal line: the product's attribution (an <Attribution>). */
  attribution?: ReactNode;
}

/** Who made it, where to go next, and the legal line: quiet, and the same on every page. */
export function Footer({ lockup, links, legal, attribution, className, children, ...rest }: FooterProps) {
  // With no lockup, the legal line takes its place: first, beside the links.
  const first = lockup === false;
  const legalLine = legal && <p className="al-footer__legal">{legal}</p>;
  return (
    <footer className={cx("al-footer", className)} {...rest}>
      {first ? legalLine : lockup ?? <Lockup />}
      {children}
      {links && links.length > 0 && <ul className="al-footer__links">{links.map((l) => <li key={l.href}><a href={l.href}>{l.label}</a></li>)}</ul>}
      {!first && legalLine}
      {attribution && <div className="al-footer__attribution">{attribution}</div>}
    </footer>
  );
}
