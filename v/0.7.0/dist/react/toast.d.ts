import { toast, type ToastOptions } from "../../js/toast.js";
export { toast, type ToastOptions };
/** Says what just happened; with an action ("Undo") it stays until it's used or dismissed. */
export declare function useToast(): (message: string, options?: ToastOptions) => () => void;
