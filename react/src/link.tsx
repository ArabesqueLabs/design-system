// A link that stands on its own: underlined in the accent; an arrow on to a
// next step; an icon, a new tab and a word for screen readers to another site.

import type { ComponentProps } from "react";
import { Icon } from "./icon.js";
import { useArabesque } from "./settings.js";
import { cx } from "./util.js";

export interface TextLinkProps extends ComponentProps<"a"> {
  /** On to a next step: an arrow along the reading direction. */
  arrow?: boolean;
  /** To another site: opens in a new tab, with its icon, and says so. */
  external?: boolean;
  /** For footers and legal lines. */
  muted?: boolean;
}

export function TextLink({ arrow, external, muted, className, children, ...rest }: TextLinkProps) {
  const { labels } = useArabesque();
  return (
    <a className={cx("al-link", arrow && "al-link--arrow", muted && "al-link--muted", className)} {...(external ? { target: "_blank", rel: "noopener" } : {})} {...rest}>
      {children}
      {arrow && <Icon name="arrow" />}
      {external && <><Icon name="external" /><span className="al-visually-hidden"> {labels.newTab}</span></>}
    </a>
  );
}
