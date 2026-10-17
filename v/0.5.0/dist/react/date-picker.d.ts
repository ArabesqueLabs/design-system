import { type IsoDate } from "../../js/datepicker.js";
import { type FieldProps } from "./field.js";
export interface DatePickerProps extends Omit<FieldProps, "children" | "onChange"> {
    /** The hidden field's name, for a form. */
    name?: string;
    /** The date it starts with. */
    defaultValue?: IsoDate;
    /** The first and last dates that can be chosen. */
    min?: IsoDate;
    max?: IsoDate;
    /** Told the chosen date, or null when what's typed isn't one. */
    onChange?: (value: IsoDate | null) => void;
}
export declare function DatePicker({ name, defaultValue, min, max, onChange, ...field }: DatePickerProps): import("react").JSX.Element;
/** "For example, 30/11/2026", written as the picker writes dates (put it in the hint). */
export declare function DateExample({ date }: {
    date: IsoDate;
}): import("react").JSX.Element;
