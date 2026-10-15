/** One repeat of the tessellation: an SVG path, and its period in px. */
export function tile(side?: number, angle?: number): { d: string; period: number };
/** Fill an element with the pattern (aria-hidden); the geometry comes from the tokens unless given. */
export function drawPattern(el: Element, options?: { side?: number; angle?: number; stroke?: number }): void;

export interface PatternCell {
  key: string;
  kind: "octagon" | "square";
  cx: number;
  cy: number;
  polygon: string;
  star: string;
}
/** Every cell of the tiling over w × h, with an octagon centred on (ox, oy), as SVG paths. */
export function cells(side: number, angle: number, ox: number, oy: number, w: number, h: number): { cells: PatternCell[]; period: number };
/**
 * Draw the hero pattern (one quiet line, one focal tile in the accent) into a
 * `.al-pattern--hero` section's art, and place its `[data-pattern-caption]`.
 * Redraws when its width changes; call again after changing `dir`. `animate`
 * draws it in once, never under reduced motion.
 */
export function drawHero(el: Element, options?: { side?: number; angle?: number; focal?: boolean; animate?: boolean }): void;
/** One step (1, 2 or 3) of the construction, as a 200 × 200 SVG in `el`. */
export function drawConstruction(el: Element, step: 1 | 2 | 3, options?: { angle?: number; side?: number }): void;
/** Draw every `[data-construction]` figure, and wire its angle slider if it has one. */
export function initConstruction(root?: ParentNode): void;
