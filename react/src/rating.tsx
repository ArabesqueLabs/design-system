// A rating, one to five, as radios drawn as the mark's star; and a rating
// shown, as a picture named with its value.

import { formatNumber } from "../../js/format.js";
import { fill, useArabesque } from "./settings.js";
import { cx, useStableId } from "./util.js";

export interface RatingProps {
  /** The question ("How was your visit?"): the fieldset's legend. */
  legend: string;
  /** The radios' name; one is made if it's not given. */
  name?: string;
  value?: number;
  defaultValue?: number;
  onChange?: (value: number) => void;
  /** Out of: 5 by default. */
  max?: number;
  className?: string;
}

/** One to five, chosen: radios, each named "3 of 5". */
export function Rating({ legend, name, value, defaultValue, onChange, max = 5, className }: RatingProps) {
  const { labels, lang, numerals } = useArabesque();
  const group = useStableId(name, "rating");
  const n = (v: number) => formatNumber(v, { lang, numerals });
  return (
    <fieldset className={cx("al-fieldset", className)}>
      <legend>{legend}</legend>
      <div className="al-rating">
        {Array.from({ length: max }, (_, i) => i + 1).map((v) => (
          <label key={v} className="al-rating__star">
            <input type="radio" name={group} value={v} checked={value === undefined ? undefined : value === v} defaultChecked={defaultValue === undefined ? undefined : defaultValue === v}
              onChange={() => onChange?.(v)} />
            <span className="al-visually-hidden">{fill(labels.ratingOf, { n: n(v), max: n(max) })}</span>
          </label>
        ))}
      </div>
    </fieldset>
  );
}

/** A rating shown, not asked: the stars, named "4 of 5". */
export function RatingValue({ value, max = 5, className }: { value: number; max?: number; className?: string }) {
  const { labels, lang, numerals } = useArabesque();
  const n = (v: number) => formatNumber(v, { lang, numerals });
  return (
    <span className={cx("al-rating", className)} role="img" aria-label={fill(labels.ratingOf, { n: n(value), max: n(max) })}>
      {Array.from({ length: max }, (_, i) => <span key={i} className={cx("al-rating__star", i < Math.round(value) && "al-rating__star--on")} />)}
    </span>
  );
}
