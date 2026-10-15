// Toasts are imperative (js/toast.js): useToast gives one in the page's
// language, its Dismiss named in it.

import { useCallback } from "react";
import { toast, type ToastOptions } from "../../js/toast.js";
import { useArabesque } from "./settings.js";

export { toast, type ToastOptions };

/** Says what just happened; with an action ("Undo") it stays until it's used or dismissed. */
export function useToast(): (message: string, options?: ToastOptions) => () => void {
  const { labels } = useArabesque();
  return useCallback((message, options = {}) => toast(message, { dismissLabel: labels.dismiss, ...options }), [labels.dismiss]);
}
