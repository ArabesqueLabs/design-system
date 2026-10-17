export interface CountOptions {
  /** The message for what's left (left ≥ 0) or how far over (left < 0). */
  words?: (left: number) => string;
  /** The static description of the limit, read with the field. */
  limit?: (max: number) => string;
}
/** Character counts for every [data-al-maxlength] under root; returns a function that redraws them. */
export function initCharacterCounts(root?: ParentNode, options?: CountOptions): () => void;
