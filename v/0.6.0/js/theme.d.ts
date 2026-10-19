export type Theme = "light" | "dark";
/** The stored choice, or null when following the system. */
export function chosenTheme(): Theme | null;
export function currentTheme(): Theme;
export function applyTheme(): void;
export function setTheme(theme: Theme): void;
export function toggleTheme(): void;
