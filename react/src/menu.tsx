// Actions on one thing, behind a button, in a native popover (js/menu.js):
// arrow keys move, Home and End jump, Escape closes, focus goes back.

import { useEffect, useRef, type ReactNode } from "react";
import { initMenus } from "../../js/menu.js";
import { Icon, type IconName } from "./icon.js";
import { useTooltips } from "./tooltip.js";
import { cx, useStableId } from "./util.js";

export type MenuEntry =
  | { label: ReactNode; onSelect?: () => void; danger?: boolean; disabled?: boolean; /** One of several (menuitemradio): checked or not. */ checked?: boolean }
  | { separator: true }
  | { group: ReactNode };

export interface MenuProps {
  /** The button's text ("Move to…"); with `icon` and no text, its name. */
  label: string;
  /** An icon button ("more"): `label` names it. */
  icon?: IconName;
  /** The menu's name; the label by default. */
  menuLabel?: string;
  items: MenuEntry[];
  id?: string;
  className?: string;
}

export function Menu({ label, icon, menuLabel, items, id, className }: MenuProps) {
  const ref = useRef<HTMLDivElement>(null);
  const menuId = useStableId(id, "menu");
  useEffect(() => { if (ref.current) initMenus(ref.current); }, []);
  useTooltips(!!icon);
  return (
    <div ref={ref} className={className} style={{ display: "contents" }}>
      <button type="button" className={cx("al-button", icon && "al-button--icon")} aria-haspopup="menu" aria-expanded="false" popoverTarget={menuId}
        aria-label={icon ? label : undefined} data-al-tip={icon ? label : undefined}>
        {icon ? <Icon name={icon} /> : <>{label} <Icon name="chevron" size="sm" /></>}
      </button>
      <div className="al-menu" id={menuId} popover="auto" role="menu" aria-label={menuLabel ?? label}>
        {items.map((it, i) => {
          if ("separator" in it) return <hr key={i} className="al-menu__separator" />;
          if ("group" in it) return <p key={i} className="al-menu__label" role="presentation">{it.group}</p>;
          const radio = it.checked !== undefined;
          return (
            <button key={i} type="button" className={cx("al-menu__item", it.danger && "al-menu__item--danger")} role={radio ? "menuitemradio" : "menuitem"}
              aria-checked={radio ? it.checked : undefined} aria-disabled={it.disabled || undefined} onClick={it.disabled ? undefined : it.onSelect}>
              {it.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
