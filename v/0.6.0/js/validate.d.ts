export interface Check {
  /** A selector inside the form, or the field itself. */
  field: string | HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement;
  /** The error message, or "" when the value is fine. */
  check: (value: string, input: HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement) => string;
}
type Text = string | (() => string);
export interface ValidateOptions { onValid?: (form: HTMLFormElement) => void; title?: Text; prefix?: Text; sprite?: string }
/** Check on submit, with an error summary and inline errors. Throws at once if a field isn't there. */
export function validateOnSubmit(form: HTMLFormElement, checks: Check[], options?: ValidateOptions): { clear: () => void };
