/** Each language's name, in itself. */
export declare const languageNames: Record<string, string>;
export interface LanguageLinkProps {
    /** The same page in that language. */
    href: string;
    /** The language it leads to: "ar", "en". */
    lang: string;
    /** Its name in itself; "العربية" or "English" by default. */
    label?: string;
    className?: string;
}
export declare function LanguageLink({ href, lang, label, className }: LanguageLinkProps): import("react").JSX.Element;
