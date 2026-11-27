// A small fold: a button that shows and hides a panel, closed to begin with and kept as it was left on this device. The crest card's
// Options and Parts, and the Build page's Options, are all this. (Never a <details>: the page's own button, with aria-expanded.)

/** Whether the first of these keys that holds a value holds "open". Several keys let a fold keep what an older name of it kept. */
export const wasOpen = (...keys) => {
  try {
    const kept = keys.map((key) => localStorage.getItem(key)).find((value) => value !== null);
    return kept === "open";
  } catch {
    return false;
  }
};

export const keepOpen = (key, open) => {
  try {
    localStorage.setItem(key, open ? "open" : "closed");
  } catch {
    // Not remembered, then; it still opens and closes.
  }
};

/** Shows or hides the panel and says so on the button. */
export const showPanel = (button, panel, open) => {
  panel.hidden = !open;
  button.setAttribute("aria-expanded", String(open));
};

/** A fold that opens and closes by its button and keeps its state under `keys[0]` (older names are still read). */
export const mountFold = (button, panel, ...keys) => {
  showPanel(button, panel, wasOpen(...keys));
  button.addEventListener("click", () => {
    const open = panel.hidden;
    showPanel(button, panel, open);
    keepOpen(keys[0], open);
  });
};
