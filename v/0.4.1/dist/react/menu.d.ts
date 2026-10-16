import { type ReactNode } from "react";
import { type IconName } from "./icon.js";
export type MenuEntry = {
    label: ReactNode;
    onSelect?: () => void;
    danger?: boolean;
    disabled?: boolean; /** One of several (menuitemradio): checked or not. */
    checked?: boolean;
} | {
    separator: true;
} | {
    group: ReactNode;
};
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
export declare function Menu({ label, icon, menuLabel, items, id, className }: MenuProps): import("react").JSX.Element;
