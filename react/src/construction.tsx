// How the pattern is made, in three steps read as software (js/pattern.js):
// tile the plane (modules), draw the strands at a fixed angle (interfaces),
// remove the scaffolding (the system).

import { useEffect, useRef, type ReactNode } from "react";
import { formatNumber } from "../../js/format.js";
import { initConstruction } from "../../js/pattern.js";
import { useArabesque } from "./settings.js";
import { cx, useStableId } from "./util.js";

export interface ConstructionStep {
  /** What the drawing shows, for screen readers. */
  alt: string;
  title: ReactNode;
  aside?: ReactNode;
}

const STEPS: Record<"en" | "ar", ConstructionStep[]> = {
  en: [
    { alt: "Octagons and squares tiling a square.", title: "Tile the plane with simple shapes.", aside: "In software: modules." },
    { alt: "The same tiling, with two lines drawn from each edge's midpoint at the contact angle; where they meet, stars form.", title: "From each edge's midpoint, draw two lines at a fixed angle.", aside: "In software: interfaces." },
    { alt: "Only the stars remain: the pattern.", title: "Remove the scaffolding. The pattern holds.", aside: "In software: the system." },
  ],
  ar: [
    { alt: "مثمنات ومربعات تبلّط مربعًا.", title: "غطِّ المستوى بأشكال بسيطة.", aside: "في البرمجيات: الوحدات." },
    { alt: "التبليط نفسه، ومن منتصف كل ضلع خطان بزاوية التلامس؛ وحيث يلتقيان تتكوّن النجوم.", title: "من منتصف كل ضلع، ارسم خطين بزاوية ثابتة.", aside: "في البرمجيات: الواجهات." },
    { alt: "لا يبقى إلا النجوم: النمط.", title: "أزِل السقالة. يبقى النمط قائمًا.", aside: "في البرمجيات: النظام." },
  ],
};

export interface ConstructionFigureProps {
  /** A slider that redraws steps 2 and 3 at another contact angle. */
  adjustable?: boolean;
  /** Your own words for the three steps; the system's, in the page's language, by default. */
  steps?: [ConstructionStep, ConstructionStep, ConstructionStep];
  className?: string;
  id?: string;
}

export function ConstructionFigure({ adjustable, steps, className, id }: ConstructionFigureProps) {
  const { lang, numerals, labels } = useArabesque();
  const ref = useRef<HTMLElement>(null);
  const angleId = useStableId(id, "construction-angle");
  const list = steps ?? STEPS[/^ar\b/i.test(lang) ? "ar" : "en"];
  useEffect(() => { if (ref.current?.parentNode) initConstruction(ref.current.parentNode); }, []);
  return (
    <figure ref={ref} className={cx("al-construction", className)} data-construction="">
      <ol className="al-construction__steps">
        {list.map((s, i) => (
          <li key={i}>
            <div className="al-construction__art" data-construction-step={i + 1} role="img" aria-label={s.alt} />
            <p className="al-construction__title"><span className="al-construction__num"><bdi>{formatNumber(i + 1, { lang, numerals })}</bdi></span> {s.title}</p>
            {s.aside && <p className="al-construction__aside">{s.aside}</p>}
          </li>
        ))}
      </ol>
      {adjustable && (
        <div className="al-construction__control">
          <label className="al-label" htmlFor={angleId}>{labels.contactAngle}</label>
          <input type="range" id={angleId} min="45" max="78.75" step="0.5" defaultValue="67.5" data-construction-angle="" />
          <output htmlFor={angleId} data-construction-value="">67.5°</output>
        </div>
      )}
    </figure>
  );
}
