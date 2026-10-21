// Back to top: on a long page, a link back up, in the corner, once the page
// has scrolled two screens (js/back-to-top.js).

import { useEffect, useRef, type ReactNode } from "react";
import { initBackToTop } from "../../js/back-to-top.js";
import { Icon } from "./icon.js";
import { useArabesque } from "./settings.js";
import { cx } from "./util.js";

export interface BackToTopProps {
  /** Where it goes; "#top", the top of the page, by default. */
  href?: string;
  /** Its words; "Back to top" by default, in the page's language. */
  children?: ReactNode;
  className?: string;
}

/** Put it once, last in the page, after the footer. */
export function BackToTop({ href = "#top", children, className }: BackToTopProps) {
  const { labels } = useArabesque();
  const ref = useRef<HTMLAnchorElement>(null);
  useEffect(() => { if (ref.current) initBackToTop(ref.current.parentNode ?? document); }, []);
  return (
    <a ref={ref} className={cx("al-back-to-top", className)} href={href}>
      <Icon name="arrow-up" />
      {children ?? labels.backToTop}
    </a>
  );
}
