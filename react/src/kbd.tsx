// Keys, and the list of shortcuts that ? opens (js/keys.js for the shortcuts themselves).

import { Fragment, useEffect, useRef, type ComponentPropsWithoutRef, type ReactNode } from "react";
import { renderModifierKeys } from "../../js/keys.js";
import { cx } from "./util.js";

export function Kbd({ className, ...rest }: ComponentPropsWithoutRef<"kbd">) {
  return <kbd className={cx("al-kbd", className)} {...rest} />;
}

export interface Shortcut {
  /** The keys, in order: ["mod", "K"] shows ⌘ K on Apple devices, Ctrl K elsewhere. */
  keys: string[];
  does: ReactNode;
}

export interface ShortcutsProps {
  shortcuts: Shortcut[];
  /** The modifier's name, in the page's language. */
  titles?: { apple: string; other: string };
  className?: string;
}

export function Shortcuts({ shortcuts, titles, className }: ShortcutsProps) {
  const ref = useRef<HTMLDListElement>(null);
  useEffect(() => { if (ref.current) renderModifierKeys(ref.current, titles ? { titles } : undefined); });
  return (
    <dl ref={ref} className={cx("al-shortcuts", className)}>
      {shortcuts.map((s, i) => (
        <Fragment key={i}>
          <dt>{s.keys.map((k, j) => (k === "mod" ? <Kbd key={j} data-al-mod="">Ctrl</Kbd> : <Kbd key={j}>{k}</Kbd>))}</dt>
          <dd>{s.does}</dd>
        </Fragment>
      ))}
    </dl>
  );
}
