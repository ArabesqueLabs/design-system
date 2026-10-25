import type { ComponentProps, ReactNode } from "react";
import { type IconName } from "./icon.js";
export type ButtonVariant = "primary" | "secondary" | "quiet" | "danger" | "danger-primary";
interface Common {
    /** secondary (the default) is outlined; primary is the one main action; danger destroys. */
    variant?: ButtonVariant;
    size?: "sm";
    /** An icon before the text; with no children, an icon button named by `label`. */
    icon?: IconName;
    /** An icon after the text (a chevron for a menu, an arrow onwards). */
    iconEnd?: IconName;
    /** The name of an icon button, said by screen readers and shown as its tooltip. */
    label?: string;
    /** Busy: a spinner, and aria-busy, while the action runs. */
    busy?: boolean;
    children?: ReactNode;
}
type AsButton = Common & ComponentProps<"button"> & {
    href?: undefined;
};
type AsLink = Common & ComponentProps<"a"> & {
    href: string;
};
export type ButtonProps = AsButton | AsLink;
/** An action: a <button>, or an <a> when it has an href. A `ref` reaches the element. */
export declare function Button(props: ButtonProps): import("react").JSX.Element;
export interface ButtonGroupProps extends ComponentProps<"div"> {
    /** What the buttons are for together ("Text alignment"). */
    label: string;
    /** One under another. */
    vertical?: boolean;
}
/** Related buttons joined, one border between each: each still its own button. */
export declare function ButtonGroup({ label, vertical, className, ...rest }: ButtonGroupProps): import("react").JSX.Element;
export {};
