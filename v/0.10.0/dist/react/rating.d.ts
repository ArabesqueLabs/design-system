export interface RatingProps {
    /** The question ("How was your visit?"): the fieldset's legend. */
    legend: string;
    /** The radios' name; one is made if it's not given. */
    name?: string;
    value?: number;
    defaultValue?: number;
    onChange?: (value: number) => void;
    /** Out of: 5 by default. */
    max?: number;
    className?: string;
}
/** One to five, chosen: radios, each named "3 of 5". */
export declare function Rating({ legend, name, value, defaultValue, onChange, max, className }: RatingProps): import("react").JSX.Element;
/** A rating shown, not asked: the stars, named "4 of 5". */
export declare function RatingValue({ value, max, className }: {
    value: number;
    max?: number;
    className?: string;
}): import("react").JSX.Element;
