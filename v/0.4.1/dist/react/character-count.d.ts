import { type ComponentPropsWithoutRef } from "react";
export interface CharacterCountProps extends Omit<ComponentPropsWithoutRef<"textarea">, "maxLength"> {
    /** The limit. Over it, the field is invalid, but what's typed is kept. */
    max: number;
}
export declare function CharacterCount({ max, className, ...rest }: CharacterCountProps): import("react").JSX.Element;
