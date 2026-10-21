import { useLayoutEffect } from "react";
/** Class names, the falsy ones left out. */
export declare const cx: (...names: (string | false | null | undefined)[]) => string | undefined;
/** The id given, or one made that's the same on the server and in the browser, readable in markup ("menu-r1"). */
export declare function useStableId(given: string | undefined, prefix: string): string;
/** An effect that runs before paint in the browser, and quietly not at all on the server. */
export declare const useBrowserLayoutEffect: typeof useLayoutEffect;
