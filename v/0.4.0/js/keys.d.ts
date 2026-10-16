export function isApple(): boolean;
/** "⌘" on Apple devices, "Ctrl" elsewhere. */
export function modifierLabel(): string;
export function renderModifierKeys(root?: ParentNode, options?: { titles?: { apple: string; other: string } }): void;
/** Whether single-key shortcuts are on. */
export function shortcutsEnabled(): boolean;
/** Turn single-key shortcuts on or off (WCAG 2.1.4); remembered. */
export function setShortcutsEnabled(on: boolean): void;
/** combo: "mod+k", "mod+shift+z", "?", "/", "escape". Returns a function that removes it. */
export function onShortcut(combo: string, handler: (event: KeyboardEvent) => void, options?: { target?: EventTarget }): () => void;
