// Containers: a card for one thing among several, a panel for a part of a
// page, a stat for one figure, and stats, a row of them.

import type { ComponentPropsWithoutRef, ElementType, ReactNode } from "react";
import { cx } from "./util.js";

export interface CardProps extends Omit<ComponentPropsWithoutRef<"article">, "title"> {
  title?: ReactNode;
  /** The title's heading level, as the page's outline needs it. */
  level?: 2 | 3 | 4;
  description?: ReactNode;
  /** The whole card is one link or button (hover and focus on the card). */
  interactive?: boolean;
  selected?: boolean;
}

export function Card({ title, level = 3, description, interactive, selected, className, children, ...rest }: CardProps) {
  const H = `h${level}` as ElementType;
  return (
    <article className={cx("al-card", interactive && "al-card--interactive", selected && "al-card--selected", className)} {...rest}>
      {(title || description) && (
        <header className="al-card__header">
          {title && <H>{title}</H>}
          {description && <p className="al-card__description">{description}</p>}
        </header>
      )}
      {children}
    </article>
  );
}

export function Panel<T extends ElementType = "section">({ as, className, ...rest }: { as?: T } & Omit<ComponentPropsWithoutRef<T>, "as">) {
  const C = as ?? "section";
  return <C className={cx("al-panel", className)} {...rest} />;
}

export interface StatProps extends ComponentPropsWithoutRef<"div"> {
  label: ReactNode;
  /** The figure, kept whole in either direction. */
  value: ReactNode;
  note?: ReactNode;
}

export interface QuoteProps extends Omit<ComponentPropsWithoutRef<"figure">, "children" | "role"> {
  /** What they said: one paragraph, or several <p>s. The language's own quotation marks go around it. */
  children: ReactNode;
  name: ReactNode;
  /** Their role, and where. */
  role?: ReactNode;
  /** Their picture or initials: an <Avatar>, or an <img alt="">. */
  avatar?: ReactNode;
  /** Above the quote: what it's about, as an eyebrow. */
  eyebrow?: ReactNode;
}

/** What someone said, in their words, then who they are. */
export function Quote({ children, name, role, avatar, eyebrow, className, ...rest }: QuoteProps) {
  const said = typeof children === "string" ? <p>{children}</p> : children;
  return (
    <figure className={cx("al-quote", className)} {...rest}>
      {eyebrow && <p className="al-eyebrow">{eyebrow}</p>}
      <blockquote>{said}</blockquote>
      <figcaption className="al-quote__by">
        {avatar}
        <span><span className="al-quote__name">{name}</span>{role && <span className="al-quote__role">{role}</span>}</span>
      </figcaption>
    </figure>
  );
}

/** Stats side by side, large, a hairline before each: the figures a page leads with. */
export function Stats({ className, ...rest }: ComponentPropsWithoutRef<"div">) {
  return <div className={cx("al-stats", className)} {...rest} />;
}

export function Stat({ label, value, note, className, ...rest }: StatProps) {
  return (
    <div className={cx("al-stat", className)} {...rest}>
      <span className="al-stat__label">{label}</span>
      <span className="al-stat__value"><bdi>{value}</bdi></span>
      {note && <span className="al-stat__note">{note}</span>}
    </div>
  );
}
