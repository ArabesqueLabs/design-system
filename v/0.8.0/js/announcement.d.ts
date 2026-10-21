/** Hide the announcements already dismissed, and wire each [data-dismiss] button inside root. */
export function initAnnouncements(root?: ParentNode): void;
/** Show an announcement again on the next load. */
export function forgetDismissal(id: string): void;
