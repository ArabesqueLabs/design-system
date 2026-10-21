/** Wire `button` to open and close `menu`: aria-expanded, Escape, closing on a link. `show(open)` does any other showing. */
export function wireNavMenu(button: HTMLElement, menu: HTMLElement, show?: (open: boolean) => void): void;
