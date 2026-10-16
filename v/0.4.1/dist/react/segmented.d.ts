import type { ComponentPropsWithoutRef, ReactNode } from "react";
export interface SegmentedOption<V extends string> {
    value: V;
    label: ReactNode;
    /** The option's own language, when it's written in it ("العربية"). */
    lang?: string;
    /** Its name, when the label is a symbol or digits. */
    ariaLabel?: string;
}
interface Common<V extends string> {
    options: SegmentedOption<V>[];
    value: V;
    /** Fills the row, each option an equal share. */
    fill?: boolean;
    className?: string;
}
export interface SegmentedProps<V extends string> extends Common<V> {
    /** The radios' name, for a form. */
    name: string;
    onChange?: (value: V) => void;
}
/** Radios: for a form. Put it in a <Fieldset> with a legend. */
export declare function Segmented<V extends string>({ options, value, name, onChange, fill, className }: SegmentedProps<V>): import("react").JSX.Element;
export interface SegmentedButtonsProps<V extends string> extends Common<V>, Omit<ComponentPropsWithoutRef<"div">, "onChange" | "children"> {
    /** The group's name ("Language"). */
    label: string;
    onChange: (value: V) => void;
}
/** Pressed buttons: for a setting that applies at once (language, theme, a view). */
export declare function SegmentedButtons<V extends string>({ options, value, label, onChange, fill, className, ...rest }: SegmentedButtonsProps<V>): import("react").JSX.Element;
export {};
