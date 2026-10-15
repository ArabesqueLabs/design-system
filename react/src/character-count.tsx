// A limit on a text field, said as what's left and, once over, by how much
// (js/count.js). Goes inside a <Field>, in place of a <Textarea>.

import { useEffect, useRef, type ComponentPropsWithoutRef } from "react";
import { initCharacterCounts } from "../../js/count.js";
import { formatNumber } from "../../js/format.js";
import { useField } from "./field.js";
import { fill, useArabesque } from "./settings.js";
import { cx } from "./util.js";

export interface CharacterCountProps extends Omit<ComponentPropsWithoutRef<"textarea">, "maxLength"> {
  /** The limit. Over it, the field is invalid, but what's typed is kept. */
  max: number;
}

export function CharacterCount({ max, className, ...rest }: CharacterCountProps) {
  const settings = useArabesque();
  const live = useRef(settings);
  live.current = settings;
  const field = useField(rest);
  const ref = useRef<HTMLTextAreaElement>(null);
  const redraw = useRef<() => void>(() => {});

  useEffect(() => {
    const parent = ref.current?.parentElement;
    if (!parent) return;
    const n = (v: number) => formatNumber(v, { lang: live.current.lang, numerals: live.current.numerals });
    redraw.current = initCharacterCounts(parent, {
      words: (left) => {
        const l = live.current.labels;
        const one = Math.abs(left) === 1;
        return fill(left >= 0 ? (one ? l.countLeftOne : l.countLeft) : one ? l.countOverOne : l.countOver, { n: n(Math.abs(left)) });
      },
      limit: (m) => fill(live.current.labels.countLimit, { n: n(m) }),
    });
  }, []);
  useEffect(() => { redraw.current(); }, [settings.lang, settings.numerals, settings.labels]);

  return <textarea ref={ref} className={cx("al-textarea", className)} data-al-maxlength={max} {...rest} {...field} />;
}
