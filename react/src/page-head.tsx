import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { cx } from "./util.js";

export interface PageHeadProps extends Omit<ComponentPropsWithoutRef<"div">, "title"> {
  /** The page's <h1>. */
  title: ReactNode;
  /** Beside the title: a badge ("Experimental"). */
  badge?: ReactNode;
  /** On the trailing side: what applies to the whole page (its settings, views, primary action). */
  end?: ReactNode;
  lede?: ReactNode;
}

/** The page's title, and what applies to the whole page. */
export function PageHead({ title, badge, end, lede, className, children, ...rest }: PageHeadProps) {
  return (
    <div className={cx("al-page-head", className)} {...rest}>
      <h1>{title}</h1>
      {badge && <> {badge}</>}
      {end && <div className="al-page-head__end">{end}</div>}
      {lede && <p className="al-page-head__lede">{lede}</p>}
      {children}
    </div>
  );
}
