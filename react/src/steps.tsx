import type { ElementType, ReactNode } from "react";
import { formatNumber } from "../../js/format.js";
import { useArabesque } from "./settings.js";
import { cx } from "./util.js";

export interface Step { title: ReactNode; body?: ReactNode }

export interface StepsProps {
  steps: Step[];
  /** The titles' heading level, as the page's outline needs it. */
  level?: 2 | 3 | 4;
  className?: string;
}

/** A numbered sequence: the stages of how something is done. Only for real sequences. */
export function Steps({ steps, level = 3, className }: StepsProps) {
  const { lang, numerals } = useArabesque();
  const H = `h${level}` as ElementType;
  return (
    <ol className={cx("al-steps", className)}>
      {steps.map((s, i) => (
        <li key={i}>
          <p className="al-steps__num"><bdi>{formatNumber(i + 1, { lang, numerals })}</bdi></p>
          <H className="al-steps__title">{s.title}</H>
          {s.body && <p className="al-steps__body">{s.body}</p>}
        </li>
      ))}
    </ol>
  );
}
