import { type ComponentPropsWithoutRef, type ReactNode } from "react";
/** The id, description and validity a control inside a <Field> takes. */
export declare function useField(own?: {
    id?: string;
    "aria-describedby"?: string;
    "aria-invalid"?: ComponentPropsWithoutRef<"input">["aria-invalid"];
}): {
    id: string | undefined;
    "aria-describedby": string | undefined;
    "aria-invalid": "false" | "grammar" | "spelling" | "true" | boolean | undefined;
};
export interface FieldProps extends Omit<ComponentPropsWithoutRef<"div">, "children"> {
    label: ReactNode;
    /** The control's id; one is made if it's not given. */
    id?: string;
    hint?: ReactNode;
    /** The error, under the control; the control is marked invalid while there is one. */
    error?: ReactNode;
    /** Marks the label "(optional)"; required fields aren't marked. */
    optional?: boolean;
    /** What the label adds in a lighter weight, in place of "(optional)": "(before tax)". */
    labelNote?: ReactNode;
    /** Changed and not yet saved: says so under the control. */
    changed?: ReactNode;
    children: ReactNode;
}
export declare function Field({ label, id, hint, error, optional, labelNote, changed, className, children, ...rest }: FieldProps): import("react").JSX.Element;
/** An inline error: a danger icon, and "Error:" for screen readers. */
export declare function ErrorMessage({ className, children, ...rest }: ComponentPropsWithoutRef<"p">): import("react").JSX.Element;
export interface InputProps extends ComponentPropsWithoutRef<"input"> {
    /** A number or an amount: tabular, left to right, a decimal keypad. */
    number?: boolean;
}
export declare function Input({ number, className, ...rest }: InputProps): import("react").JSX.Element;
export declare function Select({ className, ...rest }: ComponentPropsWithoutRef<"select">): import("react").JSX.Element;
export declare function Textarea({ className, ...rest }: ComponentPropsWithoutRef<"textarea">): import("react").JSX.Element;
/** A control with what goes before or after it: a currency, a period ("a year"). */
export declare function Affix({ className, ...rest }: ComponentPropsWithoutRef<"div">): import("react").JSX.Element;
export declare function AffixText({ className, ...rest }: ComponentPropsWithoutRef<"span">): import("react").JSX.Element;
export interface FieldsetProps extends ComponentPropsWithoutRef<"fieldset"> {
    legend: ReactNode;
}
/** Related fields, and every group of radios, under one legend. */
export declare function Fieldset({ legend, className, children, ...rest }: FieldsetProps): import("react").JSX.Element;
export declare function Hint({ className, ...rest }: ComponentPropsWithoutRef<"span">): import("react").JSX.Element;
