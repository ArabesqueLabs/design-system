// A state in a word, with a dot in its colour; a timeline of what happened;
// a list of things of one kind, one to a row.

import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { Icon, type IconName } from "./icon.js";
import { cx } from "./util.js";

export type StatusTone = "neutral" | "success" | "warning" | "danger" | "info";

export interface StatusProps extends ComponentPropsWithoutRef<"span"> {
  tone?: StatusTone;
  /** Something happening now: the dot pulses. */
  live?: boolean;
  /** The word only for screen readers, the dot alone on screen (in a crowded row where the word is said nearby, or in a tooltip). */
  dotOnly?: boolean;
}

/** A state in a word ("Online"), with a dot before it in the state's colour. */
export function Status({ tone = "neutral", live, dotOnly, className, children, ...rest }: StatusProps) {
  return (
    <span className={cx("al-status", tone !== "neutral" && `al-status--${tone}`, live && "al-status--live", className)} {...rest}>
      {dotOnly ? <span className="al-visually-hidden">{children}</span> : children}
    </span>
  );
}

export interface TimelineEvent {
  /** When: a <time> with its dateTime, written as people say it ("2 hours ago", "4 Jan"). */
  time: ReactNode;
  title: ReactNode;
  body?: ReactNode;
  /** An icon in the marker; a dot without one. */
  icon?: IconName;
  tone?: "accent" | "success" | "warning" | "danger";
}

/** What happened, each event at its time, along a line. */
export function Timeline({ events, className }: { events: TimelineEvent[]; className?: string }) {
  return (
    <ol className={cx("al-timeline", className)}>
      {events.map((e, i) => (
        <li key={i}>
          <span className="al-timeline__marker" data-tone={e.tone} aria-hidden="true">{e.icon && <Icon name={e.icon} size="sm" />}</span>
          <div className="al-timeline__event">
            <span className="al-timeline__time">{e.time}</span>
            <p className="al-timeline__title">{e.title}</p>
            {e.body && <div className="al-timeline__body">{e.body}</div>}
          </div>
        </li>
      ))}
    </ol>
  );
}

export interface ListRow {
  title: ReactNode;
  description?: ReactNode;
  /** Before the text: an <Avatar>, an <Icon>, a <Status dotOnly>. */
  start?: ReactNode;
  /** After it: a value, a time, one small action. */
  end?: ReactNode;
  /** The row opens this: a link from edge to edge. */
  href?: string;
  /** The one open now. */
  current?: boolean;
  disabled?: boolean;
}

export interface ListProps {
  rows: ListRow[];
  /** No border of its own: inside a card, a popover or a menu. */
  flush?: boolean;
  /** The list's name, when nothing on the page says what it is. */
  label?: string;
  className?: string;
}

/** Things of one kind, one to a row, hairlines between. */
export function List({ rows, flush, label, className }: ListProps) {
  return (
    <ul className={cx("al-list", flush && "al-list--flush", className)} aria-label={label} role="list">
      {rows.map((r, i) => {
        const inner = (
          <>
            {r.start}
            <span className="al-list__text">
              <span className="al-list__title">{r.title}</span>
              {r.description && <span className="al-list__description">{r.description}</span>}
            </span>
            {r.end && <span className="al-list__end">{r.end}</span>}
          </>
        );
        return (
          <li key={i}>
            {r.href
              ? <a className="al-list__item" href={r.href} aria-current={r.current ? "page" : undefined} aria-disabled={r.disabled || undefined} tabIndex={r.disabled ? -1 : undefined}>{inner}</a>
              : <div className="al-list__item" aria-current={r.current || undefined}>{inner}</div>}
          </li>
        );
      })}
    </ul>
  );
}
