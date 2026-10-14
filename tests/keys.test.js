import { test } from "node:test";
import assert from "node:assert/strict";
import { onShortcut, isApple, setShortcutsEnabled } from "../js/keys.js";

// A keydown, as the browser sends it.
const press = (target, init) => {
  const e = new Event("keydown", { cancelable: true });
  const { target: on = null, ...keys } = init;
  Object.assign(e, { key: "", code: "", metaKey: false, ctrlKey: false, shiftKey: false, altKey: false, repeat: false, isComposing: false, ...keys });
  // The browser sets target; here it's what's being typed in, if anything.
  Object.defineProperty(e, "target", { value: on });
  target.dispatchEvent(e);
  return e;
};
const mod = isApple() ? { metaKey: true } : { ctrlKey: true };

test("mod+z doesn't fire for mod+shift+z (redo)", () => {
  const t = new EventTarget();
  let n = 0;
  onShortcut("mod+z", () => n++, { target: t });
  press(t, { key: "z", code: "KeyZ", ...mod });
  press(t, { key: "Z", code: "KeyZ", shiftKey: true, ...mod });
  assert.equal(n, 1);
});

test("mod+shift+z fires only with Shift", () => {
  const t = new EventTarget();
  let n = 0;
  onShortcut("mod+shift+z", () => n++, { target: t });
  press(t, { key: "z", code: "KeyZ", ...mod });
  press(t, { key: "Z", code: "KeyZ", shiftKey: true, ...mod });
  assert.equal(n, 1);
});

test("symbols typed with Shift don't need it named", () => {
  const t = new EventTarget();
  let n = 0;
  onShortcut("?", () => n++, { target: t });
  press(t, { key: "?", code: "Slash", shiftKey: true });
  assert.equal(n, 1);
});

test("on an Arabic layout, the key is matched by its position", () => {
  const t = new EventTarget();
  let k = 0;
  let slash = 0;
  onShortcut("mod+k", () => k++, { target: t });
  onShortcut("/", () => slash++, { target: t });
  press(t, { key: "ن", code: "KeyK", ...mod });
  press(t, { key: "ظ", code: "Slash" });
  assert.equal(k, 1);
  assert.equal(slash, 1);
});

test("on a Latin layout, the character wins over the position", () => {
  const t = new EventTarget();
  let n = 0;
  onShortcut("mod+k", () => n++, { target: t });
  // Dvorak: the key in K's place types "t".
  press(t, { key: "t", code: "KeyK", ...mod });
  assert.equal(n, 0);
});

test("nothing fires while composing, or on repeat", () => {
  const t = new EventTarget();
  let n = 0;
  onShortcut("n", () => n++, { target: t });
  press(t, { key: "n", code: "KeyN", isComposing: true });
  press(t, { key: "n", code: "KeyN", repeat: true });
  press(t, { key: "n", code: "KeyN" });
  assert.equal(n, 1);
});

test("single-key shortcuts can be turned off; mod ones stay", () => {
  const t = new EventTarget();
  let single = 0;
  let withMod = 0;
  onShortcut("n", () => single++, { target: t });
  onShortcut("mod+k", () => withMod++, { target: t });
  setShortcutsEnabled(false);
  press(t, { key: "n", code: "KeyN" });
  press(t, { key: "k", code: "KeyK", ...mod });
  setShortcutsEnabled(true);
  press(t, { key: "n", code: "KeyN" });
  assert.equal(single, 1);
  assert.equal(withMod, 1);
});

test("single keys don't fire while typing in a field", () => {
  const t = new EventTarget();
  let n = 0;
  onShortcut("n", () => n++, { target: t });
  press(t, { key: "n", code: "KeyN", target: { tagName: "INPUT" } });
  assert.equal(n, 0);
});
