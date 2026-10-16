import { type ComponentPropsWithoutRef, type ReactNode } from "react";
export interface ChoiceProps extends Omit<ComponentPropsWithoutRef<"input">, "type" | "role"> {
    label: ReactNode;
    /** A line under the label, in the label (so it's read with it). */
    hint?: ReactNode;
    /** Mixed (a checkbox only): a "Select all" whose items are some checked and some not. */
    indeterminate?: boolean;
}
export declare const Checkbox: (props: ChoiceProps) => import("react").JSX.Element;
export declare const Radio: (props: ChoiceProps) => import("react").JSX.Element;
/** On or off, at once: no Save. Its label says what's on, not "Enable…". */
export declare const Switch: (props: ChoiceProps) => import("react").JSX.Element;
/** Checkboxes or radios one under another, or in a row with `inline`. */
export declare function Choices({ inline, className, ...rest }: ComponentPropsWithoutRef<"div"> & {
    inline?: boolean;
}): import("react").JSX.Element;
