export type SyntaxKind = "" | "keyword" | "string" | "number" | "comment" | "function" | "tag" | "attribute";
/** Is there syntax colour for this language? (js, ts, jsx, tsx, html, css, json, sh…) */
export function highlights(language: string | undefined): boolean;
/** The code as [kind, text] runs; kind is "" for plain text. */
export function tokenize(code: string, language: string): [SyntaxKind, string][];
/** Colour the code in every <pre><code class="language-…"> inside root, once. */
export function highlightCode(root?: ParentNode): void;
