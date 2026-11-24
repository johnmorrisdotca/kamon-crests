// The Coverage page's script: every named crest the crest books list, by chapter and family, each a tile that is either our drawing
// (linked to the catalogue) or a dashed placeholder. The list is the page's own JSON, written by scripts/site.mjs from
// docs/coverage/kamon.json and the built package; the drawings are <kamon-crest> elements, as in the catalogue.
// The page's words are set as text, never as HTML.
import "./dist/element-define.js";
import { WORDS } from "./words.js";

const $ = (id) => document.getElementById(id);
const language = familyLanguage({ id: "kamon-crests", words: WORDS, onChange: () => render() });
const say = (key, values) => {
  const word = WORDS[language.lang][key] ?? WORDS.en[key] ?? "";
  if (!(key in WORDS.en)) console.error(`The demo has no word for "${key}"`);
  return values === undefined ? word : word.replace(/\{(\w+)\}/g, (whole, name) => String(values[name] ?? ""));
};
const ja = () => language.lang === "ja";
const number = (n) => n.toLocaleString("en-US");

// The entries, with the short keys scripts/site.mjs wrote them with.
const CHAPTERS = ["plants", "animals", "nature", "objects", "buildings", "patterns", "characters"];
const ENTRIES = JSON.parse($("coverage-data").textContent).map((one) => ({
  ja: one.j,
  reading: one.r,
  romaji: one.o,
  en: one.e,
  chapter: one.c,
  family: one.f,
  familyEn: one.fe,
  tier: one.t,
  have: one.h,
  extra: one.x === 1,
  key: `${one.c}/${one.f}`,
}));
const CHAPTER_ORDER = Object.fromEntries(CHAPTERS.map((id, at) => [id, at]));
const FIRST_FAMILIES = 24;

const asked = new URLSearchParams(location.search);
const pick = (value, allowed, fallback) => (allowed.includes(value) ? value : fallback);
const state = {
  chapter: pick(asked.get("ch"), ["all", ...CHAPTERS], "all"),
  family: asked.get("fam"),
  status: pick(asked.get("status"), ["all", "drawn", "missing"], "all"),
  tier: pick(asked.get("tier"), ["any", "1", "2", "3"], "any"),
  allFamilies: false,
};
const remember = () => {
  const query = new URLSearchParams(location.search);
  const put = (key, value, plain) => (value === plain || value === null || value === "" ? query.delete(key) : query.set(key, value));
  put("ch", state.chapter, "all");
  put("fam", state.family, null);
  put("status", state.status, "all");
  put("tier", state.tier, "any");
  const text = query.toString();
  history.replaceState(null, "", `${location.pathname}${text === "" ? "" : `?${text}`}`);
};

const make = (tag, props = {}, ...kids) => {
  const node = Object.assign(document.createElement(tag), props);
  for (const kid of kids) node.append(kid);
  return node;
};
const button = (label, pressed, onClick, extra = {}) => {
  const node = make("button", { type: "button", textContent: label, ...extra });
  node.setAttribute("aria-pressed", String(pressed));
  node.addEventListener("click", onClick);
  return node;
};
const bar = (have, total) => {
  const fill = make("i");
  fill.style.width = `${total === 0 ? 0 : (100 * have) / total}%`;

  return make("span", { className: "meter" }, fill);
};
const percent = (have, total) => `${total === 0 ? 0 : Math.round((100 * have) / total)}%`;
// A chapter's name in both languages, the page's own first.
const chapterName = (id) => (ja() ? `${WORDS.ja[`cov_ch_${id}`]} · ${WORDS.en[`cov_ch_${id}`]}` : `${WORDS.en[`cov_ch_${id}`]} · ${WORDS.ja[`cov_ch_${id}`]}`);

const tally = (list) => ({ have: list.filter((one) => one.have !== 0).length, total: list.length });
// Every family with its counts, the ones with the most still to draw first.
const familiesOf = (list) => {
  const found = new Map();
  for (const one of list) found.set(one.key, [...(found.get(one.key) ?? []), one]);

  return [...found.entries()]
    .map(([key, own]) => ({ key, chapter: own[0].chapter, family: own[0].family, en: own[0].familyEn, ...tally(own) }))
    .sort((a, b) => b.total - b.have - (a.total - a.have) || a.have - b.have || CHAPTER_ORDER[a.chapter] - CHAPTER_ORDER[b.chapter] || a.key.localeCompare(b.key, "ja"));
};
const choiceRow = (host, choices, current, onPick) => {
  host.replaceChildren(
    ...choices.map(([value, label, n]) => {
      const node = button(label, current === value, () => onPick(value));
      if (n !== undefined) node.append(make("span", { className: "n", textContent: String(n) }));

      return node;
    }),
  );
};

const render = () => {
  if (state.family !== null && !ENTRIES.some((one) => one.key === state.family)) state.family = null;
  if (state.family !== null && state.chapter !== "all" && !state.family.startsWith(`${state.chapter}/`)) state.family = null;
  if (state.family !== null && state.chapter === "all") state.chapter = state.family.split("/")[0];
  remember();

  const all = tally(ENTRIES);
  $("total-text").textContent = say("cov_total", { have: number(all.have), total: number(all.total) });
  $("total-percent").textContent = percent(all.have, all.total);
  $("total-bar").replaceChildren(bar(all.have, all.total));

  // One bar for each chapter: its name, what is drawn of it, and a press to list only it.
  $("bars").replaceChildren(
    ...CHAPTERS.map((id) => {
      const own = tally(ENTRIES.filter((one) => one.chapter === id));
      const node = button("", state.chapter === id, () => {
        state.chapter = state.chapter === id ? "all" : id;
        state.family = null;
        state.allFamilies = false;
        render();
      });
      node.dataset.testid = `chapter-${id}`;
      node.className = "cov-chapter";
      node.append(make("span", { className: "cov-name", textContent: chapterName(id) }), make("span", { className: "cov-have", textContent: `${number(own.have)} / ${number(own.total)} · ${percent(own.have, own.total)}` }), bar(own.have, own.total));

      return make("li", {}, node);
    }),
  );

  // The families of the chapter, or of every chapter, the thinnest first.
  const inChapter = ENTRIES.filter((one) => state.chapter === "all" || one.chapter === state.chapter);
  const families = familiesOf(inChapter);
  const shown = state.allFamilies ? families : families.filter((one, at) => at < FIRST_FAMILIES || one.key === state.family);
  $("families-title").textContent = state.chapter === "all" ? say("cov_families") : say("cov_families_in", { chapter: WORDS[language.lang][`cov_ch_${state.chapter}`] });
  $("families").replaceChildren(
    ...shown.map((one) => {
      const node = button("", state.family === one.key, () => {
        state.family = state.family === one.key ? null : one.key;
        render();
      });
      node.dataset.testid = `family-${one.key}`;
      node.className = "cov-family";
      node.append(
        make("span", { className: "cov-name", textContent: ja() ? one.family : one.en || one.family }),
        make("small", { textContent: ja() ? one.en : one.family }),
        make("span", { className: "cov-have", textContent: `${one.have} / ${one.total}` }),
        bar(one.have, one.total),
      );

      return make("li", {}, node);
    }),
  );
  const more = $("families-more");
  more.hidden = families.length <= FIRST_FAMILIES;
  more.textContent = state.allFamilies ? say("cov_families_fewer") : say("cov_families_all", { n: families.length });
  more.setAttribute("aria-pressed", String(state.allFamilies));

  const statusCount = (value) => inChapter.filter((one) => (state.family === null || one.key === state.family) && (value === "all" || (value === "drawn") === (one.have !== 0))).length;
  choiceRow($("status-row"), ["all", "drawn", "missing"].map((value) => [value, say(`cov_status_${value}`), statusCount(value)]), state.status, (value) => {
    state.status = value;
    render();
  });
  choiceRow($("tier-row"), [["any", say("cov_tier_any"), undefined], ...["1", "2", "3"].map((tier) => [tier, tier, inChapter.filter((one) => one.tier === Number(tier)).length])], state.tier, (value) => {
    state.tier = value;
    render();
  });

  const order = Object.fromEntries(families.map((one, at) => [one.key, at]));
  const found = ENTRIES.filter((one) => (state.chapter === "all" || one.chapter === state.chapter) && (state.family === null || one.key === state.family) && (state.status === "all" || (state.status === "drawn") === (one.have !== 0)) && (state.tier === "any" || one.tier === Number(state.tier)))
    .sort((a, b) => CHAPTER_ORDER[a.chapter] - CHAPTER_ORDER[b.chapter] || order[a.key] - order[b.key] || (a.have === 0) - (b.have === 0) || (a.tier ?? 0) - (b.tier ?? 0) || a.reading.localeCompare(b.reading, "ja"));
  $("count").textContent = say("shown", { n: number(found.length), total: number(ENTRIES.length) });
  $("empty").hidden = found.length > 0;
  $("empty").textContent = say("cov_empty");
  $("grid").replaceChildren(...found.map(tile));
  $("clear").disabled = state.chapter === "all" && state.family === null && state.status === "all" && state.tier === "any";
  familyHelp?.refresh?.();
  const main = document.querySelector("main");
  main.dataset.ready = "false";
  Promise.all([...document.querySelectorAll("#grid kamon-crest")].map((element) => element.ready)).then(() => requestAnimationFrame(() => (main.dataset.ready = "true")));
};

// A crest of ours: its drawing, linked to the catalogue. A crest still to draw: a dashed circle where the drawing will be.
const tile = (one) => {
  const drawn = one.have !== 0;
  const name = ja() ? one.ja : one.en;
  const other = ja() ? one.en : one.ja;
  const lines = [
    make("span", { className: "name", textContent: name }),
    make("small", { textContent: other }),
    make("small", { textContent: `${one.reading} · ${one.romaji}` }),
    make("small", { className: "tier", textContent: one.extra ? say("cov_not_listed") : say("cov_tier_n", { n: one.tier }) }),
  ];
  let pic;
  if (drawn) {
    pic = Object.assign(document.createElement("kamon-crest"), {});
    pic.setAttribute("crest", one.have);
    pic.setAttribute("size", "88");
    pic.setAttribute("loading", "eager");
    pic.setAttribute("label", name);
  } else pic = make("span", { className: "ghost" });
  const node = drawn ? make("a", { className: "tile drawn", href: `../?open=${encodeURIComponent(one.have)}`, title: say("cov_open") }) : make("div", { className: "tile missing", title: say("cov_missing") });
  node.dataset.testid = drawn ? `cov-tile-${one.have}` : `cov-missing-${one.romaji.replace(/\s+/g, "-")}`;
  node.append(make("span", { className: "pic" }, pic), make("span", { className: "label" }, ...lines));

  return make("li", {}, node);
};

$("clear").addEventListener("click", () => {
  Object.assign(state, { chapter: "all", family: null, status: "all", tier: "any", allFamilies: false });
  render();
});
$("families-more").addEventListener("click", () => {
  state.allFamilies = !state.allFamilies;
  render();
});
render();
