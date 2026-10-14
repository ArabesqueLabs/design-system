/** One repeat of the tessellation: an SVG path, and its period in px. */
export function tile(side?: number, angle?: number): { d: string; period: number };
/** Fill an element with the pattern (aria-hidden); the geometry comes from the tokens unless given. */
export function drawPattern(el: Element, options?: { side?: number; angle?: number; stroke?: number }): void;
