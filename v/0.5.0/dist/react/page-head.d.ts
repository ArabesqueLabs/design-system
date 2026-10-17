import type { ComponentPropsWithoutRef, ReactNode } from "react";
export interface PageHeadProps extends Omit<ComponentPropsWithoutRef<"div">, "title"> {
    /** The page's <h1>. */
    title: ReactNode;
    /** Beside the title: a badge ("Experimental"). */
    badge?: ReactNode;
    /** On the trailing side: what applies to the whole page (its settings, views, primary action). */
    end?: ReactNode;
    lede?: ReactNode;
}
/** The page's title, and what applies to the whole page. */
export declare function PageHead({ title, badge, end, lede, className, children, ...rest }: PageHeadProps): import("react").JSX.Element;
