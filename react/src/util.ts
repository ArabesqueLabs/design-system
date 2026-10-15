// Small things the components share.

import { useEffect, useId, useLayoutEffect } from "react";

/** Class names, the falsy ones left out. */
export const cx = (...names: (string | false | null | undefined)[]): string | undefined => names.filter(Boolean).join(" ") || undefined;

/** The id given, or one made that's the same on the server and in the browser, readable in markup ("menu-r1"). */
export function useStableId(given: string | undefined, prefix: string): string {
  const made = useId().replace(/[^\w-]/g, "");
  return given ?? `${prefix}-${made}`;
}

/** An effect that runs before paint in the browser, and quietly not at all on the server. */
export const useBrowserLayoutEffect = typeof document === "undefined" ? useEffect : useLayoutEffect;
