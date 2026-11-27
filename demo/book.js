import "./dist/element-define.js";
import { WORDS } from "./words.js";

const $ = (id) => document.getElementById(id);
const { cells, families } = JSON.parse($("book-data").textContent);
const frames = [...new Set(cells.map((cell) => cell.frame))];
const pageKey = ({ frame, page }) => `${frame}${page}`;
const pages = new Set(cells.map(pageKey));
const statuses = ["drawn", "missing", "held"];
const lookup = (text) => text.normalize("NFKC").toLowerCase().replace(/[ァ-ヶ]/gu, (kana) => String.fromCharCode(kana.charCodeAt(0) - 0x60));
const searchable = new Map(cells.map((cell) => [cell, [cell.label, cell.name, cell.reading, cell.nameEn].filter(Boolean).map(lookup)]));
const incoming = new URLSearchParams(location.search);
const askedFrame = Number(incoming.get("frame"));
const askedFamily = incoming.get("family");
const askedStatus = incoming.get("status");
const state = {
  frame: frames.includes(askedFrame) ? askedFrame : frames[0],
  page: incoming.get("page") === "L" ? "L" : "R",
  family: families.some(({ ja }) => ja === askedFamily) ? askedFamily : "",
  status: statuses.includes(askedStatus) ? askedStatus : "",
  query: (incoming.get("q") ?? "").slice(0, 80),
};

const language = familyLanguage({ id: "kamon-crests", words: WORDS, onChange: () => {
  setWords();
  render();
} });
const say = (key, values = {}) => language.word(key).replace(/\{(\w+)\}/g, (_, name) => String(values[name] ?? ""));
const number = (value) => value.toLocaleString(language.lang);
const ndl = (frame) => `https://dl.ndl.go.jp/pid/780550/1/${frame}`;
const make = (tag, props, ...children) => {
  const node = Object.assign(document.createElement(tag), props);
  node.append(...children);
  return node;
};
const option = (value, text, lang = "") => make("option", { value, textContent: text, lang });
const pageButtons = [...$("book-pages").querySelectorAll("button")];
const frameButtons = new Map(frames.map((frame) => [
  frame, make("button", { type: "button", className: "fam-button", textContent: frame }),
]));

function setWords() {
  document.title = `Kamon Crests 家紋 — ${say("pageBook")}`;
  $("book-family").replaceChildren(
    option("", say("book_all_families")),
    ...families.map(({ ja, en }) => {
      const english = en ?? WORDS.en[`book_family_${ja}`];
      return language.lang === "ja" || english === undefined ? option(ja, ja, "ja") : option(ja, english);
    }),
  );
  $("book-status").replaceChildren(option("", say("cov_status_all")), ...statuses.map((status) => option(status, say(`book_status_${status}`))));
  $("book-family").value = state.family;
  $("book-status").value = state.status;
  for (const [frame, button] of frameButtons) button.setAttribute("aria-label", say("book_frame_n", { frame }));
}

function matchingCells() {
  const terms = lookup(state.query.trim()).split(/\s+/u).filter(Boolean);
  return cells.filter((cell) =>
    (state.family === "" || cell.family === state.family) &&
    (state.status === "" || cell.status === state.status) &&
    terms.every((term) => searchable.get(cell).some((text) => text.includes(term))),
  );
}

function selectPage(frame, preferredPage) {
  state.frame = frame;
  state.page = pages.has(pageKey({ frame, page: preferredPage })) ? preferredPage : preferredPage === "R" ? "L" : "R";
}

function showFirstMatch(matches) {
  if (matches.length > 0 && !matches.some((cell) => pageKey(cell) === pageKey(state))) {
    selectPage(matches[0].frame, matches[0].page);
  }
}

function remember(clearCell) {
  const url = new URL(location.href);
  url.searchParams.set("frame", state.frame);
  url.searchParams.set("page", state.page);
  for (const [key, value] of [["family", state.family], ["status", state.status], ["q", state.query]]) {
    if (value === "") url.searchParams.delete(key);
    else url.searchParams.set(key, value);
  }
  if (clearCell) url.hash = "";
  history.replaceState(null, "", url);
}

function tile(cell) {
  const { frame, page, row, col, label, ourId, name, reading, nameEn, status } = cell;
  const item = make("li", { className: "book-cell", id: `cell-${frame}-${page}-${row}-${col}` });
  Object.assign(item.dataset, { row, col, status });
  if (location.hash === `#${item.id}`) {
    item.tabIndex = -1;
    item.setAttribute("aria-current", "location");
  }
  const picture = make("div", { className: "book-picture" });
  if (ourId === null) {
    picture.append(make("span", { className: "book-placeholder" }));
    picture.setAttribute("aria-hidden", "true");
  } else {
    const crest = document.createElement("kamon-crest");
    crest.setAttribute("crest", ourId);
    crest.setAttribute("loading", "eager");
    crest.setAttribute("size", "48");
    crest.setAttribute("aria-hidden", "true");
    const query = new URLSearchParams({ open: ourId, lang: language.lang });
    const href = `../?${query}`;
    const title = language.lang === "ja" ? name ?? label : nameEn ?? name ?? label;
    const link = make("a", { className: "book-crest-link", href }, crest);
    link.setAttribute("aria-label", say("book_open_crest", { name: title }));
    picture.append(link);
  }

  item.append(picture, make("strong", { className: "book-label", lang: "ja", textContent: label }));
  if (status !== "held") {
    item.append(make("span", { className: "book-name", lang: "ja", textContent: name }));
    item.append(make("span", { className: "book-reading", lang: "ja", textContent: reading }));
    if (language.lang === "en" && nameEn !== null) item.append(make("span", { className: "book-reading", textContent: nameEn }));
  }
  const place = say("book_place", { frame, page: say(`book_page_${page}`), row, col: say(`book_col_${col}`) });
  const source = make("a", { className: "book-cell-source", href: ndl(frame), target: "_blank", rel: "noopener", textContent: place });
  item.append(make("span", { className: "book-status", textContent: say(`book_status_${status}`) }), source);
  return item;
}

function render(clearCell = false) {
  const matches = matchingCells();
  const view = matches.filter((cell) => pageKey(cell) === pageKey(state));
  const foundFrames = new Set(matches.map((cell) => cell.frame));
  for (const [frame, button] of frameButtons) {
    button.setAttribute("aria-pressed", String(state.frame === frame));
    button.tabIndex = state.frame === frame ? 0 : -1;
    button.classList.toggle("book-frame-empty", !foundFrames.has(frame));
  }
  for (const button of pageButtons) {
    const { bookPage } = button.dataset;
    button.disabled = !pages.has(pageKey({ frame: state.frame, page: bookPage }));
    button.setAttribute("aria-pressed", String(bookPage === state.page));
  }
  const count = (status) => number(matches.filter((cell) => cell.status === status).length);
  $("book-totals").textContent = say("book_totals", {
    cells: number(matches.length), drawn: count("drawn"), missing: count("missing"), held: count("held"), shown: number(view.length),
  });
  $("book-source").href = ndl(state.frame);
  remember(clearCell);
  $("book-grid").replaceChildren(...view.map(tile));
  $("book-grid").hidden = view.length === 0;
  $("book-empty").hidden = view.length > 0;
  const strip = $("book-frames");
  const button = frameButtons.get(state.frame);
  if (button.offsetLeft < strip.scrollLeft) strip.scrollLeft = button.offsetLeft;
  else if (button.offsetLeft + button.offsetWidth > strip.scrollLeft + strip.clientWidth) {
    strip.scrollLeft = button.offsetLeft + button.offsetWidth - strip.clientWidth + 4;
  }
}

function changeFrame(frame) {
  const matching = matchingCells().filter((cell) => cell.frame === frame);
  const alternate = matching.some((cell) => cell.page === state.page) ? state.page : matching[0]?.page;
  selectPage(frame, alternate ?? state.page);
  render(true);
}

for (const [frame, button] of frameButtons) {
  button.addEventListener("click", () => changeFrame(frame));
  $("book-frames").append(button);
}
$("book-frames").addEventListener("keydown", (event) => {
  const current = frames.indexOf(state.frame);
  const next = {
    ArrowLeft: frames[Math.max(0, current - 1)],
    ArrowRight: frames[Math.min(frames.length - 1, current + 1)],
    Home: frames[0],
    End: frames.at(-1),
  }[event.key];
  if (next === undefined) return;
  event.preventDefault();
  changeFrame(next);
  frameButtons.get(next).focus();
});
for (const button of pageButtons) {
  button.addEventListener("click", () => {
    selectPage(state.frame, button.dataset.bookPage);
    render(true);
  });
}
for (const [id, key, event] of [["book-search", "query", "input"], ["book-family", "family", "change"], ["book-status", "status", "change"]]) {
  $(id).addEventListener(event, () => {
    state[key] = $(id).value;
    showFirstMatch(matchingCells());
    render(true);
  });
}

$("book-search").value = state.query;
selectPage(state.frame, state.page);
if (!frames.includes(askedFrame)) showFirstMatch(matchingCells());
setWords();
render();
const linkedCell = location.hash.startsWith("#cell-") ? $(location.hash.slice(1)) : null;
if (linkedCell !== null) {
  linkedCell.scrollIntoView({ block: "nearest" });
  linkedCell.focus({ preventScroll: true });
}
