import { useEffect, useRef, type ReactNode } from "react";
import { initAnnouncements } from "../../js/announcement.js";
import { Icon } from "./icon.js";
import { useArabesque } from "./settings.js";
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

export interface AnnouncementProps {
  /** Names it, so its dismissal is remembered (js/announcement.js); a new message needs a new id. */
  id: string;
  /** One line of news, with its link. */
  children: ReactNode;
  className?: string;
}

/** Above everything: one line of news, dismissed for good with its button. */
export function Announcement({ id, children, className }: AnnouncementProps) {
  const { labels } = useArabesque();
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => { if (ref.current) initAnnouncements(ref.current.parentNode ?? document); }, []);
  return (
    <div ref={ref} className={cx("al-announcement", className)} data-announcement={id} role="region" aria-label={labels.announcement}>
      <p className="al-announcement__text">{children}</p>
      <button type="button" className="al-button al-button--icon al-button--quiet al-button--sm al-announcement__dismiss" data-dismiss="" aria-label={labels.dismiss}>
        <Icon name="close" />
      </button>
    </div>
  );
}
