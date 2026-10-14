// The tessellation: Hankin's "polygons in contact" on the 4.8.8 tiling
// (regular octagons and squares). From each edge's midpoint two strands
// leave at the contact angle θ (67.5° by default); the strands leaning
// towards a vertex meet on its bisector, at (side/2)·sin θ / sin(θ + α/2)
// from it, α being the polygon's interior angle. One repeat is side·(1+√2)
// square, centred on a square, with a quarter octagon in each corner; the
// mark is the same tile centred on an octagon.

/** The strands of one repeat tile, as an SVG path, and its period. */
export function tile(side = 32, angle = 67.5) {
  const a = side * (1 + Math.SQRT2);
  const theta = (angle * Math.PI) / 180;
  const octagon = (cx, cy) => {
    const r = a / 2;
    const h = side / 2;
    return [[cx + h, cy - r], [cx + r, cy - h], [cx + r, cy + h], [cx + h, cy + r], [cx - h, cy + r], [cx - r, cy + h], [cx - r, cy - h], [cx - h, cy - r]];
  };
  const square = (cx, cy) => {
    const d = side / Math.SQRT2;
    return [[cx, cy - d], [cx + d, cy], [cx, cy + d], [cx - d, cy]];
  };
  const polygons = [octagon(0, 0), octagon(a, 0), octagon(0, a), octagon(a, a), square(a / 2, a / 2)];
  const r = (n) => Math.round(n * 100) / 100;
  let d = "";
  for (const p of polygons) {
    const n = p.length;
    const interior = ((n - 2) * Math.PI) / n;
    const cx = p.reduce((s, v) => s + v[0], 0) / n;
    const cy = p.reduce((s, v) => s + v[1], 0) / n;
    const reach = ((side / 2) * Math.sin(theta)) / Math.sin(theta + interior / 2);
    // Where a vertex's two strands meet: on its bisector, towards the centre.
    const meet = ([x, y]) => {
      const len = Math.hypot(cx - x, cy - y);
      return [x + ((cx - x) / len) * reach, y + ((cy - y) / len) * reach];
    };
    for (let i = 0; i < n; i++) {
      const v = p[i];
      const w = p[(i + 1) % n];
      const m = [(v[0] + w[0]) / 2, (v[1] + w[1]) / 2];
      const [p1, p2] = [meet(v), meet(w)];
      d += `M${r(p1[0])} ${r(p1[1])}L${r(m[0])} ${r(m[1])}L${r(p2[0])} ${r(p2[1])}`;
    }
  }
  return { d, period: a };
}

let count = 0;
/**
 * Fill an element with the pattern (it's decoration: aria-hidden). The
 * geometry comes from the tokens (--al-pattern-side, -side-narrow under the
 * md breakpoint, -stroke, -contact-angle), unless it's given here.
 */
export function drawPattern(el, { side, angle, stroke } = {}) {
  const style = getComputedStyle(el);
  const token = (name, fallback) => parseFloat(style.getPropertyValue(`--al-pattern-${name}`)) || fallback;
  const narrow = matchMedia("(max-width: 52rem)").matches;
  const s = side ?? (narrow ? token("side-narrow", 22) : token("side", 32));
  angle ??= token("contact-angle", 67.5);
  stroke ??= token("stroke", 1.25);
  const { d, period } = tile(s, angle);
  const id = `al-pattern-${++count}`;
  el.setAttribute("aria-hidden", "true");
  el.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" focusable="false"><defs><pattern id="${id}" width="${period}" height="${period}" patternUnits="userSpaceOnUse"><path d="${d}" fill="none" stroke="currentColor" stroke-width="${stroke}" stroke-linejoin="miter" stroke-linecap="square"/></pattern></defs><rect width="100%" height="100%" fill="url(#${id})"/></svg>`;
}
