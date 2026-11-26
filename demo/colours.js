// The colour row of a drawing: the ink the crest is drawn in and the paper behind it, each a few swatches and a colour of one's own
// (the browser's own colour field), and a reset. It does not draw: it keeps what was chosen, tells the page, and the page's CSS paints it
// (the --crest-ink and --crest-paper custom properties on the box that holds the crest). "" is no choice: the page's own colours.

const INKS = [["#1f2320", "colour_black"], ["#8a1c1c", "colour_red"], ["#1d3a6b", "colour_indigo"], ["#2f5d4a", "colour_green"], ["#8a6a12", "colour_gold"]];
const PAPERS = [["#ffffff", "colour_white"], ["#f3efe4", "colour_cream"], ["#e6d3a3", "colour_tan"], ["#1f2320", "colour_black"], ["#1d3a6b", "colour_indigo"]];

const make = (tag, props = {}, ...kids) => {
  const node = Object.assign(document.createElement(tag), props);
  node.append(...kids);
  return node;
};

/**
 * @param {object} options
 * @param {HTMLElement} options.container Where the row is put.
 * @param {string} options.idPrefix Makes the ids and test ids of the row's parts, so that two pages (or one page twice) never share one.
 * @param {(key: string) => string} options.say The page's words.
 * @param {(colours: { ink: string, paper: string }) => void} options.onChange Called after every change, and after a reset.
 */
export const mountColours = ({ container, idPrefix, say, onChange }) => {
  const chosen = { ink: "", paper: "" };
  const rows = {};
  const group = make("div", { className: "colours", role: "group", id: `${idPrefix}colours-group` });
  group.dataset.testid = `${idPrefix}colours`;
  group.dataset.sayLabel = "colours";

  const row = (which, list, ...more) => {
    const label = make("span", { className: "fam-label", id: `${idPrefix}${which}-label` });
    label.dataset.say = which;
    const swatches = make("span", { className: "swatches", role: "group" });
    swatches.setAttribute("aria-labelledby", label.id);
    const buttons = list.map(([hex, name]) => {
      const node = make("button", { type: "button", className: "swatch" });
      node.dataset.value = hex;
      node.dataset.name = name;
      node.dataset.testid = `${idPrefix}${which}-${hex.slice(1)}`;
      node.style.setProperty("--swatch", hex);
      node.addEventListener("click", () => set(which, hex));
      return node;
    });
    const field = make("input", { type: "color", className: "swatch-field", value: list[0][0] });
    field.dataset.testid = `${idPrefix}${which}-field`;
    field.dataset.sayLabel = `${which}_pick`;
    field.addEventListener("input", () => set(which, field.value));
    swatches.append(...buttons, field);
    rows[which] = { buttons, field };
    return make("div", { className: "colour-row" }, label, swatches, ...more);
  };

  const reset = make("button", { type: "button", className: "fam-button", id: `${idPrefix}colours-reset` });
  reset.dataset.testid = `${idPrefix}colours-reset`;
  reset.dataset.say = "colours_reset";
  reset.addEventListener("click", () => {
    chosen.ink = chosen.paper = "";
    paint();
    onChange({ ...chosen });
  });
  group.append(row("ink", INKS), row("paper", PAPERS, reset));
  container.replaceChildren(group);

  const set = (which, hex) => {
    chosen[which] = hex;
    paint();
    onChange({ ...chosen });
  };
  // The words, the swatch that is chosen, and the colour field showing the colour that is on the crest.
  const paint = () => {
    for (const which of ["ink", "paper"]) {
      for (const node of rows[which].buttons) {
        node.setAttribute("aria-pressed", String(chosen[which] === node.dataset.value));
        node.setAttribute("aria-label", say(node.dataset.name));
        node.title = say(node.dataset.name);
      }
      if (chosen[which] !== "") rows[which].field.value = chosen[which];
      rows[which].field.dataset.chosen = String(chosen[which] !== "" && !rows[which].buttons.some((node) => node.dataset.value === chosen[which]));
    }
    reset.disabled = chosen.ink === "" && chosen.paper === "";
    for (const node of group.querySelectorAll("[data-say]")) node.textContent = say(node.dataset.say);
    for (const node of group.querySelectorAll("[data-say-label]")) node.setAttribute("aria-label", say(node.dataset.sayLabel));
  };
  paint();

  return {
    /** What is chosen: a colour, or "" for the page's own. */
    get ink() {
      return chosen.ink;
    },
    get paper() {
      return chosen.paper;
    },
    /** The words again, after the page's language changes. */
    refresh: paint,
  };
};
