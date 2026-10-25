// More about something, when it's asked for: a button opens it beside
// itself, in a native popover (js/popover.js).

import { useEffect, useRef, type ReactNode } from "react";
import { initPopovers } from "../../js/popover.js";
import { Icon, type IconName } from "./icon.js";
import { useTooltips } from "./tooltip.js";
import { cx, useStableId } from "./util.js";

export interface PopoverProps {
  /** The button's text ("What's this?"); with `icon`, its name. */
  label: string;
  /** An icon button ("info"), named by `label`. */
  icon?: IconName;
  /** The popover's title, which names it. */
  title: ReactNode;
  children: ReactNode;
  id?: string;
  className?: string;
}

export function Popover({ label, icon, title, children, id, className }: PopoverProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const popId = useStableId(id, "popover");
  useEffect(() => { if (ref.current) initPopovers(ref.current); }, []);
  useTooltips(!!icon);
  return (
    <span ref={ref} className={className} style={{ display: "contents" }}>
      <button type="button" className={cx("al-button", icon ? "al-button--icon" : "al-button--sm")} popoverTarget={popId} aria-expanded="false"
        aria-label={icon ? label : undefined} data-al-tip={icon ? label : undefined}>
        {icon ? <Icon name={icon} /> : label}
      </button>
      <div className="al-popover" id={popId} popover="auto" role="dialog" aria-labelledby={`${popId}-title`}>
        <p className="al-popover__title" id={`${popId}-title`}>{title}</p>
        {typeof children === "string" ? <p>{children}</p> : children}
      </div>
    </span>
  );
}
