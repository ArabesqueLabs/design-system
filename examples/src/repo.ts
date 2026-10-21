// The repository, public on GitHub: linked from the showcase, the example
// pages and the documents' pages.

export const REPO = "https://github.com/ArabesqueLabs/design-system";

declare const __RELEASE__: { version: string; changelog: string };
/** The version released last, and the id of its section in the changelog (the build sets them, from package.json). */
export const RELEASE = __RELEASE__;

/** A file in the repository, on GitHub, as it is on main. */
export const onGitHub = (path: string): string => `${REPO}/blob/main/${path}`;
