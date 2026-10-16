// The repository, public on GitHub: linked from the showcase, the example
// pages and the documents' pages.

export const REPO = "https://github.com/ArabesqueLabs/design-system";

/** A file in the repository, on GitHub, as it is on main. */
export const onGitHub = (path: string): string => `${REPO}/blob/main/${path}`;
