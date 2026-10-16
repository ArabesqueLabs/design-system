// The foundations, shown: colour roles, tints, the type scale, space,
// motion. Each reads the tokens' custom properties, so it shows what the
// CSS has, in either theme.

import { useState } from "react";
import { Card, Grid, Tint, tints, useArabesque } from "../../react/src/index.js";
import type { DemoProps } from "./demos.js";

const ROLES: [string, string][] = [
  ["bg", "The page"], ["surface", "Cards, panels, inputs"], ["surface-sunk", "Wells, hover, info"],
  ["text", "Body text"], ["text-muted", "Secondary text"], ["line", "Hairlines"], ["control", "Control borders"],
  ["accent", "Actions, focus, success"], ["on-accent", "Text on accent"], ["danger", "Errors, destroying"],
  ["warning", "Needs attention"], ["info", "Information"], ["inverse", "Toasts, tooltips"],
  ["chart-1", "Chart, first series"], ["chart-2", "Chart, second series"], ["chart-3", "Chart, third series"], ["chart-4", "Chart, fourth series"],
];

export function ColourDemo({ t }: DemoProps) {
  return (
    <div className="ex-swatches">
      {ROLES.map(([name, role]) => (
        <div key={name} className="ex-swatch">
          <span className="ex-swatch__chip" style={{ background: `var(--al-color-${name})` }} />
          <code className="ex-swatch__name" lang="en" dir="ltr">{`--al-color-${name}`}</code>
          <span className="ex-swatch__role">{t(role)}</span>
        </div>
      ))}
    </div>
  );
}

/** Each tint's ink on its ground, as a tag shows them. */
export function TintsDemo() {
  return (
    <div className="ex-swatches">
      {tints.map((tint: Tint) => (
        <div key={tint} className="ex-swatch">
          <span className="ex-swatch__chip" style={{ background: `var(--al-color-tint-${tint}-bg)`, color: `var(--al-color-tint-${tint}-ink)` }}>Aa</span>
          <code className="ex-swatch__name" lang="en" dir="ltr">{`data-tint="${tint}"`}</code>
        </div>
      ))}
    </div>
  );
}

// Google Fonts' sample sentence for each script (its "tester" text, from the
// Universal Declaration of Human Rights), so the faces read as they do there.
const SAMPLE = {
  en: "Whereas disregard and contempt for human rights have resulted",
  ar: "ولما كان تناسي حقوق الإنسان وازدراؤها قد أفضيا إلى أعمال همجية",
};
const STEPS = ["display", "3xl", "2xl", "xl", "lg", "md", "base", "sm", "xs"];

export function TypeDemo({ t }: DemoProps) {
  const { lang, numerals } = useArabesque();
  const ar = /^ar\b/.test(lang);
  const n = (v: string) => (ar && numerals === "arab" ? v.replace(/\d/g, (d) => "٠١٢٣٤٥٦٧٨٩"[Number(d)]!) : v);
  return (
    <>
      <div className="ex-type">
        {STEPS.map((step) => (
          <div key={step} className="ex-type__row">
            <code lang="en" dir="ltr">{step}</code>
            <span style={{ fontSize: `var(--al-text-${step})`, fontFamily: `var(--al-font-${["display", "3xl", "2xl", "xl"].includes(step) ? "display" : step === "md" ? "serif" : "sans"})` }}>
              <span lang={ar ? "ar" : "en"} dir={ar ? "rtl" : "ltr"}>{ar ? SAMPLE.ar : SAMPLE.en}</span>
            </span>
          </div>
        ))}
      </div>
      <Grid>
        <Card><p className="ex-label">{t("Reading text")}</p><p className="al-prose">{t("Islamic geometric patterns are intricate structures built from simple, repeated rules. We build software the same way: small, well-made modules, clear interfaces, a coherent system.")}</p></Card>
        <Card><p className="ex-label">{t("Numbers inside a sentence")}</p><p>{t("It costs")} <bdi className="al-tabular">{n("£12")}</bdi> {t("a month for each person, or")} <bdi className="al-tabular">{n("$1,440")}</bdi> {t("a year for 10 people.").replace("10", n("10"))}</p></Card>
      </Grid>
    </>
  );
}

export function SpaceDemo() {
  return (
    <div className="ex-space">
      {["1", "2", "3", "4", "5", "6", "8", "12", "16"].map((s) => (
        <div key={s} className="ex-space__row">
          <code lang="en" dir="ltr">{`--al-space-${s}`}</code>
          <span className="ex-space__bar" style={{ inlineSize: `var(--al-space-${s})` }} />
        </div>
      ))}
    </div>
  );
}

export function MotionDemo({ t }: DemoProps) {
  const [moved, setMoved] = useState(false);
  return (
    <div className="al-cluster">
      <button type="button" className="al-button" onClick={() => setMoved(!moved)}>{t("Try a change")}</button>
      <span className={`ex-motion${moved ? " is-moved" : ""}`} aria-hidden="true" />
    </div>
  );
}
