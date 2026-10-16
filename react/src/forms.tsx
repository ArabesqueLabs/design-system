// The rest of a form's parts: the error summary, search, the summary list
// ("check your answers"), and the confirmation.

import { useEffect, useRef, type ComponentPropsWithoutRef, type MouseEvent, type ReactNode } from "react";
import { initSearch } from "../../js/search.js";
import { Icon } from "./icon.js";
import { useArabesque } from "./settings.js";
import { cx, useStableId } from "./util.js";

export interface ErrorSummaryProps {
  /** Each problem, linked to its field (href "#field-id"). */
  errors: { href: string; message: ReactNode }[];
  title?: ReactNode;
  /** Takes focus when it appears, so it's read at once: on by default (off for one shown as an example). */
  autoFocus?: boolean;
  id?: string;
  className?: string;
}

/**
 * When a form is submitted with problems: a list at the top of the form.
 * It takes focus when it appears, so it's read at once.
 */
export function ErrorSummary({ errors, title, autoFocus = true, id, className }: ErrorSummaryProps) {
  const { labels } = useArabesque();
  const base = useStableId(id, "error-summary");
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => { if (autoFocus && errors.length) ref.current?.focus(); }, [autoFocus, errors.length]);
  if (!errors.length) return null;
  return (
    <div ref={ref} className={cx("al-error-summary", className)} tabIndex={-1} role="alert" aria-labelledby={`${base}-title`}>
      <h2 className="al-error-summary__title" id={`${base}-title`}><Icon name="danger" />{title ?? labels.errorTitle}</h2>
      <ul className="al-error-summary__list">{errors.map((e) => <li key={e.href}><a href={e.href}>{e.message}</a></li>)}</ul>
    </div>
  );
}

export interface SearchProps extends Omit<ComponentPropsWithoutRef<"input">, "type"> {
  /** The visible label ("Search items"). */
  label: ReactNode;
  id?: string;
}

/** A search field with a visible label, a search icon and Clear (js/search.js). Results are yours to announce. */
export function Search({ label, id, className, onChange, ...rest }: SearchProps) {
  const { labels } = useArabesque();
  const inputId = useStableId(id, "search");
  const box = useRef<HTMLDivElement>(null);
  const clear = useRef<HTMLButtonElement>(null);
  useEffect(() => { if (box.current?.parentElement) initSearch(box.current.parentElement); }, []);
  // Clear shows only while there's something to clear.
  const sync = (value: string) => { if (clear.current) clear.current.hidden = !value; };
  useEffect(() => { sync(String(rest.value ?? rest.defaultValue ?? "")); });
  return (
    <form role="search" className={className} onSubmit={(e) => e.preventDefault()}>
      <label className="al-label" htmlFor={inputId}>{label}</label>
      <div className="al-search" ref={box}>
        <Icon name="search" />
        <input className="al-input" id={inputId} type="search" autoComplete="off" {...rest} onInput={(e) => sync(e.currentTarget.value)} onChange={onChange} />
        <button type="button" className="al-search__clear" aria-label={labels.clearSearch} hidden ref={clear}><Icon name="close" size="sm" /></button>
      </div>
    </form>
  );
}

export interface SummaryRow {
  key: ReactNode;
  value: ReactNode;
  /** A Change link to where it's answered; its text says what changes, for screen readers. */
  change?: { href: string; what: string; onClick?: (e: MouseEvent<HTMLAnchorElement>) => void };
}

/** Facts as key–value pairs, each optionally with Change. */
export function SummaryList({ rows, className }: { rows: SummaryRow[]; className?: string }) {
  const { labels } = useArabesque();
  const anyActions = rows.some((r) => r.change);
  return (
    <dl className={cx("al-summary-list", className)}>
      {rows.map((r, i) => (
        <div key={i} className={cx("al-summary-list__row", anyActions && !r.change && "al-summary-list__row--no-actions")}>
          <dt className="al-summary-list__key">{r.key}</dt>
          <dd className="al-summary-list__value">{r.value}</dd>
          {r.change && (
            <dd className="al-summary-list__actions">
              <a href={r.change.href} onClick={r.change.onClick}>{labels.change}<span className="al-visually-hidden"> {r.change.what}</span></a>
            </dd>
          )}
        </div>
      ))}
    </dl>
  );
}

export interface ConfirmationProps extends Omit<ComponentPropsWithoutRef<"div">, "title"> {
  title: ReactNode;
  children?: ReactNode;
  /** Takes focus when it appears, so it's read: on by default. */
  autoFocus?: boolean;
}

/** Says something's been done, gives a reference, and what happens next follows it. */
export function Confirmation({ title, children, autoFocus = true, className, ...rest }: ConfirmationProps) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => { if (autoFocus) ref.current?.focus(); }, [autoFocus]);
  return (
    <div ref={ref} className={cx("al-confirmation", className)} tabIndex={-1} {...rest}>
      <h2 className="al-confirmation__title">{title}</h2>
      {children && <div className="al-confirmation__body">{children}</div>}
    </div>
  );
}
