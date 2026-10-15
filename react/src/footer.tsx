import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { Lockup } from "./brand.js";
import { cx } from "./util.js";

export interface FooterProps extends ComponentPropsWithoutRef<"footer"> {
  /** In place of the lockup. */
  lockup?: ReactNode;
  links?: { label: ReactNode; href: string }[];
  /** The legal line: the company, its number, ©. */
  legal?: ReactNode;
}

/** Who made it, where to go next, and the legal line: quiet, and the same on every page. */
export function Footer({ lockup, links, legal, className, children, ...rest }: FooterProps) {
  return (
    <footer className={cx("al-footer", className)} {...rest}>
      {lockup ?? <Lockup />}
      {children}
      {links && links.length > 0 && <ul className="al-footer__links">{links.map((l) => <li key={l.href}><a href={l.href}>{l.label}</a></li>)}</ul>}
      {legal && <p className="al-footer__legal">{legal}</p>}
    </footer>
  );
}
