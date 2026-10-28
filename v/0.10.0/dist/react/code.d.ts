import { type ReactNode } from "react";
export interface CodeSample {
    id: string;
    /** The tab's name: the language ("TypeScript"). */
    label: ReactNode;
    code: string;
    /** Lines to mark, counted from 1. */
    mark?: number[];
    /** Its language, for syntax colour (js, ts, tsx, html, css, json, sh) and as language-{language} on the <code>. */
    language?: string;
}
export interface CodeBlockProps {
    /** The code, in one language; or samples, for several. */
    code?: string;
    mark?: number[];
    language?: string;
    /** The same code in several languages, one tab each, in place of code. */
    samples?: CodeSample[];
    /** What the tabs choose between ("Language"); needed with samples. */
    label?: string;
    /** In the bar: the file's name, or what the code is. */
    caption?: ReactNode;
    /** A copy button in the bar; on by default. */
    copy?: boolean;
    id?: string;
    className?: string;
}
/** A code sample, with its caption or language tabs, and a copy button. */
export declare function CodeBlock({ code, mark, language, samples, label, caption, copy, id, className }: CodeBlockProps): import("react").JSX.Element;
export interface CommandProps {
    /** The command, as it's typed. */
    children: string;
    /** A "$" before it, shown but never copied or read out; on by default. */
    prompt?: boolean;
    className?: string;
}
/** One line to paste into a terminal, with its copy button. */
export declare function Command({ children, prompt, className }: CommandProps): import("react").JSX.Element;
