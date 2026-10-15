import type { ReactNode } from "react";
import { cx } from "./util.js";

export interface PhaseBannerProps {
  /** The phase, as a badge: <Badge tone="warning">Experimental</Badge>. */
  phase: ReactNode;
  /** What it means, and where to say what they think. */
  children: ReactNode;
  className?: string;
}

/** Tells people a service is new or experimental, and where to say what they think. */
export function PhaseBanner({ phase, children, className }: PhaseBannerProps) {
  return (
    <div className={cx("al-phase-banner", className)}>
      {phase}
      <p className="al-phase-banner__text">{children}</p>
    </div>
  );
}
