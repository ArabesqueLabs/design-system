import { type ComponentPropsWithoutRef, type ReactNode } from "react";
export declare function Kbd({ className, ...rest }: ComponentPropsWithoutRef<"kbd">): import("react").JSX.Element;
export interface Shortcut {
    /** The keys, in order: ["mod", "K"] shows ⌘ K on Apple devices, Ctrl K elsewhere. */
    keys: string[];
    does: ReactNode;
}
export interface ShortcutsProps {
    shortcuts: Shortcut[];
    /** The modifier's name, in the page's language. */
    titles?: {
        apple: string;
        other: string;
    };
    className?: string;
}
export declare function Shortcuts({ shortcuts, titles, className }: ShortcutsProps): import("react").JSX.Element;
