// Character count, the GOV.UK way: what's left, said in words, and how far
// over once it's over; typing past the limit is allowed (a paste isn't
// cut), and the message turns into an error. The visible message updates
// at once; screen readers hear it after a pause, through a polite region.
//
//   <div class="al-field">
//     <label class="al-label" for="desc">Description</label>
//     <textarea class="al-textarea" id="desc" data-al-maxlength="200"></textarea>
//   </div>
//   initCharacterCounts(document, { words: (left) => left >= 0 ? `You have ${left} characters remaining` : `You have ${-left} characters too many` });

const defaults = (left) => {
  const n = Math.abs(left);
  const unit = n === 1 ? "character" : "characters";
  return left >= 0 ? `You have ${n} ${unit} remaining` : `You have ${n} ${unit} too many`;
};

export function initCharacterCounts(root = document, { words = defaults } = {}) {
  const updates = [];
  for (const input of root.querySelectorAll("[data-al-maxlength]")) {
    if (input.dataset.alCount) continue;
    input.dataset.alCount = "on";
    const max = Number(input.dataset.alMaxlength);
    const message = document.createElement("p");
    message.className = "al-hint al-character-count__message";
    message.id = `${input.id}-count`;
    message.setAttribute("aria-hidden", "true");
    const live = document.createElement("p");
    live.className = "al-visually-hidden";
    live.setAttribute("aria-live", "polite");
    input.after(message, live);
    input.setAttribute("aria-describedby", [input.getAttribute("aria-describedby"), `${input.id}-count-static`].filter(Boolean).join(" "));
    // A static description of the limit, for when the field is reached.
    const staticText = document.createElement("span");
    staticText.id = `${input.id}-count-static`;
    staticText.className = "al-visually-hidden";
    live.after(staticText);
    let timer;
    const update = (announce) => {
      const left = max - [...input.value].length;
      message.textContent = words(left);
      staticText.textContent = words(max);
      if (left < 0) message.dataset.over = ""; else delete message.dataset.over;
      input.toggleAttribute("aria-invalid", left < 0);
      clearTimeout(timer);
      if (announce) timer = setTimeout(() => { live.textContent = words(left); }, 1000);
    };
    input.addEventListener("input", () => update(true));
    update(false);
    updates.push(() => update(false));
  }
  // Call to redraw the messages (after a language change).
  return () => updates.forEach((u) => u());
}
