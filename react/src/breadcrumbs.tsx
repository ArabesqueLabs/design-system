import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { useArabesque } from "./settings.js";
import { cx } from "./util.js";

/** Where a page sits: each level a link; the last is the page itself (a link, or its title without an href). */
export function Breadcrumbs({ items, className }: { items: { label: ReactNode; href?: string }[]; className?: string }) {
  const { labels } = useArabesque();
  return (
    <nav className={cx("al-breadcrumbs", className)} aria-label={labels.breadcrumb}>
      <ol>
        {items.map((it, i) => {
          const current = i === items.length - 1 ? "page" : undefined;
          return <li key={i}>{it.href ? <a href={it.href} aria-current={current}>{it.label}</a> : <span aria-current={current}>{it.label}</span>}</li>;
        })}
      </ol>
    </nav>
  );
}

/** Back to the previous step of a flow. */
export function BackLink({ children, className, ...rest }: ComponentPropsWithoutRef<"a">) {
  const { labels } = useArabesque();
  return <a className={cx("al-back-link", className)} {...rest}>{children ?? labels.back}</a>;
}
