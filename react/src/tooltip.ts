// Tooltips (js/tooltip.js): a short label for an icon button or a chart
// mark, on hover and focus, from its data-al-tip ("Label|second line").
// Icon buttons, menus and charts turn them on themselves; for your own
// [data-al-tip] elements, call useTooltips() once.

import { useEffect } from "react";
import { initTooltips } from "../../js/tooltip.js";

export function useTooltips(on = true): void {
  useEffect(() => { if (on) initTooltips(document); }, [on]);
}
