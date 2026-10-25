// Where a person is in a flow of a few steps: each named, the done ones
// ticked, the current one marked, and "Step 2 of 4".

import type { ReactNode } from "react";
import { formatNumber } from "../../js/format.js";
import { Icon } from "./icon.js";
import { fill, useArabesque } from "./settings.js";
import { cx } from "./util.js";

export interface StepperProps {
  /** The steps' names, in order. */
  steps: ReactNode[];
  /** The current step, from 1; those before it are done. */
  current: number;
  /** A done step's address, to go back to it. */
  href?: (step: number) => string | undefined;
  className?: string;
}

export function Stepper({ steps, current, href, className }: StepperProps) {
  const { labels, lang, numerals } = useArabesque();
  const n = (v: number) => formatNumber(v, { lang, numerals });
  return (
    <nav className={cx("al-stepper", className)} aria-label={labels.progress}>
      <p className="al-stepper__count">{fill(labels.stepOf, { n: n(current), total: n(steps.length) })}</p>
      <ol>
        {steps.map((name, i) => {
          const step = i + 1;
          const done = step < current;
          const to = done ? href?.(step) : undefined;
          const label = <><span className="al-stepper__name">{name}</span>{done && <span className="al-visually-hidden"> {labels.stepDone}</span>}</>;
          return (
            <li key={i} data-done={done ? "" : undefined} aria-current={step === current ? "step" : undefined}>
              {done ? <Icon name="check" size="sm" /> : <span className="al-stepper__num" aria-hidden="true">{n(step)}</span>}
              {to ? <a href={to}>{label}</a> : <span>{label}</span>}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
