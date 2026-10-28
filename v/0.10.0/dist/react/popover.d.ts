import { type ReactNode } from "react";
import { type IconName } from "./icon.js";
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
export declare function Popover({ label, icon, title, children, id, className }: PopoverProps): import("react").JSX.Element;
