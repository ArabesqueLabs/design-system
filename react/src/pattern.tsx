// The tessellation of the mark's tile (js/pattern.js): as texture behind a
// band, or across a hero with its focal tile, drawn in on load.

import { useEffect, useRef, type ComponentPropsWithoutRef, type ReactNode } from "react";
import { drawHero, drawPattern } from "../../js/pattern.js";
import { useArabesque } from "./settings.js";
import { cx } from "./util.js";

export interface PatternProps extends ComponentPropsWithoutRef<"section"> {
  /** No mask: for a band with no text on it. */
  full?: boolean;
  /** Fainter, with no mask: for a small area with nothing on it (an empty state, a card). */
  quiet?: boolean;
}

/** Texture behind a band: masked away behind the text at the start. */
export function Pattern({ full, quiet, className, children, ...rest }: PatternProps) {
  const art = useRef<HTMLDivElement>(null);
  useEffect(() => { if (art.current) drawPattern(art.current); }, []);
  return (
    <section className={cx("al-pattern", full && "al-pattern--full", quiet && "al-pattern--quiet", className)} {...rest}>
      <div className="al-pattern__art" aria-hidden="true" ref={art} />
      {children}
    </section>
  );
}

export interface HeroProps extends ComponentPropsWithoutRef<"section"> {
  /** Draw in once on load (never under reduced motion). */
  animate?: boolean;
}

/**
 * The hero: one quiet line across the section, one focal tile in the
 * accent, and its caption (<HeroCaption>, wherever the layout puts it).
 * Redrawn, without the animation, when the page's language changes.
 */
export function Hero({ animate = true, className, children, ...rest }: HeroProps) {
  const { lang } = useArabesque();
  const art = useRef<HTMLDivElement>(null);
  const drawn = useRef(false);
  useEffect(() => {
    if (!art.current) return;
    drawHero(art.current, { animate: animate && !drawn.current });
    drawn.current = true;
  }, [lang, animate]);
  return (
    <section className={cx("al-pattern al-pattern--hero", className)} {...rest}>
      <div className="al-pattern__art" aria-hidden="true" data-pattern-hero="" ref={art} />
      {children}
    </section>
  );
}

/** What the focal tile is; placed by the hero beside it. */
export function HeroCaption({ children, className }: { children?: ReactNode; className?: string }) {
  const { labels } = useArabesque();
  return <p className={cx("al-pattern__caption", className)} data-pattern-caption="">{children ?? labels.heroCaption}</p>;
}
