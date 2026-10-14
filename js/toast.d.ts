export interface ToastOptions {
  /** The action's label ("Undo"). A toast with an action stays until it's used or dismissed. */
  action?: string;
  onAction?: () => void;
  /** Milliseconds; without an action, 4000 by default. */
  timeout?: number;
  /** The accessible name of the dismiss button, in the page's language. */
  dismissLabel?: string;
}
/** Show a toast; returns a function that dismisses it. */
export function toast(message: string, options?: ToastOptions): () => void;
