import type { ReactNode } from "react";
export interface DateInputProps {
    legend: ReactNode;
    hint?: ReactNode;
    /** The fields' names and ids start with this: dob → dob-day, dob-month, dob-year. */
    id?: string;
    /** Autocomplete for a birthday (bday-day, bday-month, bday-year). */
    birthday?: boolean;
    defaultValue?: {
        day?: string;
        month?: string;
        year?: string;
    };
    className?: string;
}
export declare function DateInput({ legend, hint, id, birthday, defaultValue, className }: DateInputProps): import("react").JSX.Element;
