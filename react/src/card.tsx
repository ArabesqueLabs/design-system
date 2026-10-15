// Containers: a card for one thing among several, a panel for a part of a
// page, a stat for one figure.

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

export function Stat({ label, value, note, className, ...rest }: StatProps) {
  return (
    <div className={cx("al-stat", className)} {...rest}>
      <span className="al-stat__label">{label}</span>
      <span className="al-stat__value"><bdi>{value}</bdi></span>
      {note && <span className="al-stat__note">{note}</span>}
    </div>
  );
}
