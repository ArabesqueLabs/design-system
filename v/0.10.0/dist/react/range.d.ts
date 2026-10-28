import { type ComponentPropsWithoutRef } from "react";
export interface RangeProps extends Omit<ComponentPropsWithoutRef<"input">, "type" | "value" | "defaultValue" | "onChange"> {
    value?: number;
    defaultValue?: number;
    onChange?: (value: number) => void;
    /** The value as it's shown and read ("40%", "£1,200 a month"); the page's digits by default. */
    format?: (value: number) => string;
}
/** Inside a <Field>, which names it: the slider, and its value in an <output>. */
export declare function Range({ value, defaultValue, onChange, format, min, max, className, ...rest }: RangeProps): import("react").JSX.Element;
