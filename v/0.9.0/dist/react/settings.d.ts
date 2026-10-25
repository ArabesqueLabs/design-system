import { type ReactNode } from "react";
import type { Numerals } from "../../js/format.js";
/** The components' own words: names of icon buttons, status text, counts. */
export interface Labels {
    menu: string;
    sections: string;
    switchToDark: string;
    switchToLight: string;
    skipToContent: string;
    clearSearch: string;
    chooseDate: string;
    previousMonth: string;
    nextMonth: string;
    breadcrumb: string;
    back: string;
    collapseSidebar: string;
    expandSidebar: string;
    dismiss: string;
    close: string;
    cancel: string;
    discardQuestion: string;
    keepEditing: string;
    discardChanges: string;
    optional: string;
    change: string;
    loading: string;
    newTab: string;
    noticeInfo: string;
    noticeSuccess: string;
    noticeWarning: string;
    noticeDanger: string;
    errorPrefix: string;
    errorTitle: string;
    day: string;
    month: string;
    year: string;
    unsaved: string;
    saving: string;
    saved: string;
    failed: string;
    retry: string;
    clearSelection: string;
    workingOut: string;
    contactAngle: string;
    heroCaption: string;
    announcement: string;
    onThisPage: string;
    backToTop: string;
    copy: string;
    copied: string;
    copyFailed: string;
    pagination: string;
    previousPage: string;
    nextPage: string;
    /** "{n}" is the page's number, in the page's digits. */
    page: string;
    progress: string;
    /** "{n}" and "{total}", in the page's digits. */
    stepOf: string;
    stepDone: string;
    /** A rating: "{n}" of "{max}", in the page's digits. */
    ratingOf: string;
    /** "{name}" is the tag's text. */
    removeTag: string;
    /** "{n}" is the count, in the page's digits. */
    selected: string;
    /** Character count: "{n}" is the number, in the page's digits. */
    countLeftOne: string;
    countLeft: string;
    countOverOne: string;
    countOver: string;
    countLimit: string;
}
export declare const englishLabels: Labels;
/** As the showcase says them (showcase-ar.js). */
export declare const arabicLabels: Labels;
export interface Settings {
    /** The page's language: "en", "ar", "ar-SA"… */
    lang: string;
    /** Western ("latn") or Arabic-Indic ("arab") digits, where the language is Arabic. */
    numerals: Numerals;
    /** The icon sprite's URL (dist/icons.svg, served from the same origin as the page). */
    sprite: string;
    labels: Labels;
}
export interface ArabesqueProviderProps {
    lang?: string;
    numerals?: Numerals;
    sprite?: string;
    /** Your own words for any of the components' labels; the rest follow the language. */
    labels?: Partial<Labels>;
    children?: ReactNode;
}
/** The page's language, digits and sprite, for every component inside it. */
export declare function ArabesqueProvider({ lang, numerals, sprite, labels, children }: ArabesqueProviderProps): import("react").JSX.Element;
/**
 * The page's settings: from the nearest <ArabesqueProvider>, or else from
 * <html lang>. On the server there's no <html> to read, so a page rendered
 * there in Arabic needs the provider (or it renders in English, and React
 * finds a mismatch in the browser).
 */
export declare function useArabesque(): Settings;
/** A label with its placeholders filled: fill("{n} selected", { n: "3" }). */
export declare const fill: (label: string, values: Record<string, string>) => string;
