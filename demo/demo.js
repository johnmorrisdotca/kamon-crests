// The demo page's own script: a catalogue of every crest found by its parts, a glossary of the parts, and a panel that draws
// a crest step by step. Everything is drawn from the package's own built files, as a page that installed it would: the
// tiles and the panel are <kamon-crest> elements, the facts are /manifest's, the search is /search's, the parts are /parts'.
// The page's words are set as text, never as HTML.
import "./dist/element-define.js";
import { crest, crestConstruction, crestSteps } from "./dist/load.js";
import { MANIFEST, manifest, motifFamily, variantsOf } from "./dist/manifest.js";
import { ARRANGEMENTS, FRAMES, MOTIFS, TURNS, countName, term } from "./dist/parts.js";
import { fullBuilt, isolated, staticSvg, stepCaption } from "./dist/animate.js";
import { GRADES, facets, findCrests, rankCrests } from "./dist/search.js";
import { WORDS } from "./words.js";

const $ = (id) => document.getElementById(id);
const language = familyLanguage({ id: "kamon-crests", words: WORDS, onChange: () => render() });
const say = (key, values) => {
  // A key is never shown: a word the language lacks is said in English, and one English lacks too is an error the demo's tests fail on.
  const word = WORDS[language.lang][key] ?? WORDS.en[key] ?? "";
  if (!(key in WORDS.en)) console.error(`The demo has no word for "${key}"`);
  return values === undefined ? word : word.replace(/\{(\w+)\}/g, (whole, name) => String(values[name] ?? ""));
};
const ja = () => language.lang === "ja";
const nameOf = (record) => (ja() ? record.name.ja : record.name.en);
const termName = (one) => (ja() ? one.ja : one.en);
const COUNTS = ["circles", "lines", "arcs", "steps", "widths", "fills"];
// A crest's counts in words: 円 12・直線 6・手順 23・コンパス幅 3種.
const statsText = (stats, keys = [...COUNTS, "symmetry"]) =>
  keys
    .map((key) => {
      if (key !== "symmetry") return `${say(`stat_${key}`)} ${stats[key]}${key === "widths" && ja() ? "種" : ""}`;
      const bits = [stats.symmetry.turns === 0 ? say("sym_any") : stats.symmetry.turns > 1 ? say("sym_turns", { n: stats.symmetry.turns }) : "", stats.symmetry.mirror ? say("sym_mirror") : ""].filter(Boolean);
      return `${say("stat_symmetry")} ${bits.length === 0 ? say("sym_none") : bits.join(ja() ? "・" : ", ")}`;
    })
    .join(ja() ? "・" : " · ");
// A crest's complexity in words: Complexity 59 · Moderate.
const complexityText = (stats) => `${say("complexity")} ${stats.meter}${ja() ? "・" : " · "}${termName(GRADES[stats.grade - 1])}`;
const KINDS = ["plant", "animal", "object", "shape", "sky"];
const FRAME_CHOICES = ["all", "none", "ring", "hexagon", "mokko"];
const reduced = matchMedia("(prefers-reduced-motion: reduce)");

const asked = new URLSearchParams(location.search);
const pick = (value, allowed, fallback) => (allowed.includes(value) ? value : fallback);
const state = {
  tab: pick(asked.get("tab"), ["catalogue", "complexity", "parts"], "catalogue"),
  by: pick(asked.get("by"), ["score", ...COUNTS], "score"),
  order: pick(asked.get("order"), ["asc", "desc"], "asc"),
  query: (asked.get("q") ?? "").slice(0, 80),
  frame: pick(asked.get("frame"), FRAME_CHOICES, "all"),
  kind: pick(asked.get("kind"), ["all", ...KINDS], "all"),
  motif: asked.get("motif") ?? "all",
  count: asked.get("count") ?? "any",
  arrangement: asked.get("arr") ?? "any",
  used: asked.get("used") === "1",
  grouped: asked.get("grouped") === "1",
  group: pick(asked.get("group"), ["frame", ...KINDS, "arrangement", "turn"], "plant"),
  open: asked.get("open"),
};
const remember = () => {
  const query = new URLSearchParams(location.search);
  const put = (key, value, plain) => (value === plain || value === "" || value === null || value === false ? query.delete(key) : query.set(key, value === true ? "1" : value));
  put("tab", state.tab, "catalogue");
  put("by", state.by, "score");
  put("order", state.order, "asc");
  put("q", state.query, "");
  put("frame", state.frame, "all");
  put("kind", state.kind, "all");
  put("motif", state.motif, "all");
  put("count", state.count, "any");
  put("arr", state.arrangement, "any");
  put("used", state.used, false);
  put("grouped", state.grouped, false);
  put("group", state.group, "plant");
  put("open", state.open, null);
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

// The query a set of choices makes, leaving out one facet so that its own chips can show how many each would find.
const queryOf = (skip) => ({
  ...(state.query.trim() === "" ? {} : { text: state.query }),
  ...(skip !== "frame" && state.frame !== "all" ? (state.frame === "ring" ? { ring: true } : { frame: state.frame }) : {}),
  ...(skip !== "kind" && state.kind !== "all" ? { motifKind: state.kind } : {}),
  ...(skip !== "motif" && state.motif !== "all" ? { motif: state.motif } : {}),
  ...(skip !== "count" && state.count !== "any" ? { count: Number(state.count) } : {}),
  ...(skip !== "arrangement" && state.arrangement !== "any" ? { arrangement: state.arrangement } : {}),
  ...(skip !== "used" && state.used ? { usedBy: true } : {}),
});

// The family's header and footer are left alone: `familyLanguage` has filled them, from the family's own words and the page's.
const sayAll = () => {
  const own = (name) => [...document.querySelectorAll(`[${name}]`)].filter((node) => node.closest("header, footer") === null);
  for (const node of own("data-say")) node.textContent = say(node.dataset.say);
  for (const node of own("data-say-label")) node.setAttribute("aria-label", say(node.dataset.sayLabel));
  for (const node of own("data-say-placeholder")) node.setAttribute("placeholder", say(node.dataset.sayPlaceholder));
};

const choiceRow = (host, choices, current, onPick) => {
  host.replaceChildren(
    ...choices.map(([value, label, number]) => {
      const node = button(label, current === value, () => onPick(value), { disabled: number === 0 && current !== value });
      if (number !== undefined) node.append(make("span", { className: "n", textContent: String(number) }));

      return node;
    }),
  );
};

// The catalogue, and the same crests ranked by a count for the Complexity tab, each with its counts under it.
const renderCatalogue = () => {
  const ranked = state.tab === "complexity";
  const found = ranked ? rankCrests({ by: state.by, order: state.order }, findCrests(queryOf(null))) : findCrests(queryOf(null));
  $("search").value = state.query;
  $("blurb").textContent = say(ranked ? "blurb_complexity" : "blurb_catalogue");
  $("catalogue-panel").setAttribute("aria-labelledby", `tab-${state.tab}`);
  $("sort-row").parentElement.hidden = !ranked;
  $("order-row").parentElement.hidden = !ranked;
  choiceRow($("sort-row"), ["score", ...COUNTS].map((key) => [key, say(`stat_${key}`), undefined]), state.by, (value) => {
    state.by = value;
    refresh();
  });
  choiceRow($("order-row"), ["asc", "desc"].map((value) => [value, say(`order_${value}`), undefined]), state.order, (value) => {
    state.order = value;
    refresh();
  });
  const counts = {
    frame: facets(findCrests(queryOf("frame"))),
    kind: findCrests(queryOf("kind")),
    motif: facets(findCrests(queryOf("motif"))),
    count: facets(findCrests(queryOf("count"))),
    arrangement: facets(findCrests(queryOf("arrangement"))),
    used: findCrests({ ...queryOf("used"), usedBy: true }).length,
  };
  const ringTotal = Object.entries(counts.frame.frames).filter(([id]) => id.startsWith("ring-")).reduce((sum, [, n]) => sum + n, 0);
  const frameLabel = { all: say("frame_all"), none: say("frame_none"), ring: say("frame_ring"), hexagon: say("frame_hexagon"), mokko: say("frame_mokko") };
  const frameCount = { all: undefined, none: counts.frame.frames.none ?? 0, ring: ringTotal, hexagon: counts.frame.frames.hexagon ?? 0, mokko: counts.frame.frames.mokko ?? 0 };
  choiceRow($("frame-row"), FRAME_CHOICES.filter((id) => frameCount[id] !== 0 || state.frame === id).map((id) => [id, frameLabel[id], frameCount[id]]), state.frame, (value) => {
    state.frame = value;
    refresh();
  });
  choiceRow($("kind-row"), [["all", say("kind_all"), undefined], ...KINDS.map((kind) => [kind, say(`kind_${kind}`), counts.kind.filter((record) => record.motifs.some((use) => MOTIFS.find((m) => m.id === use.motif)?.kind === kind)).length])], state.kind, (value) => {
    state.kind = value;
    if (state.motif !== "all" && value !== "all" && MOTIFS.find((m) => m.id === state.motif)?.kind !== value) state.motif = "all";
    refresh();
  });
  $("motif-row").parentElement.hidden = state.kind === "all";
  const motifs = MOTIFS.filter((one) => (state.kind === "all" || one.kind === state.kind) && ((counts.motif.motifs[one.id] ?? 0) > 0 || state.motif === one.id));
  choiceRow($("motif-row"), [["all", say("frame_all"), undefined], ...motifs.map((one) => [one.id, termName(one), counts.motif.motifs[one.id] ?? 0])], state.motif, (value) => {
    state.motif = value;
    refresh();
  });
  const numbers = [...new Set(MANIFEST.flatMap((record) => record.motifs.map((use) => use.count)))].sort((a, b) => a - b);
  choiceRow($("count-row"), [["any", say("count_any"), undefined], ...numbers.map((n) => [String(n), ja() ? countName(n, "ja") : String(n), counts.count.counts[String(n)] ?? 0])], state.count, (value) => {
    state.count = value;
    refresh();
  });
  choiceRow($("arrangement-row"), [["any", say("count_any"), undefined], ...ARRANGEMENTS.filter((one) => (counts.arrangement.arrangements[one.id] ?? 0) > 0 || state.arrangement === one.id).map((one) => [one.id, termName(one), counts.arrangement.arrangements[one.id] ?? 0])], state.arrangement, (value) => {
    state.arrangement = value;
    refresh();
  });
  choiceRow($("used-row"), [["any", say("used_any"), undefined], ["yes", say("used_yes"), counts.used]], state.used ? "yes" : "any", (value) => {
    state.used = value === "yes";
    refresh();
  });
  $("count").textContent = say("shown", { n: found.length, total: MANIFEST.length });
  $("empty").hidden = found.length > 0;
  $("empty").textContent = say("none_found");
  $("grouped-row").parentElement.hidden = ranked;
  choiceRow($("grouped-row"), [["motif", say("group_motif"), undefined]], !ranked && state.grouped ? "motif" : "", () => {
    state.grouped = !state.grouped;
    refresh();
  });
  paintGrid(found, ranked, !ranked && state.grouped);
};

// One crest's tile: its drawing and name, its catalogue number in the corner, and, where the frame variants are grouped under it, how many.
const crestTile = (record, ranked, inFrames = 0) => {
  const redrawing = ranked && record.redrawing === true;
  const tile = make("button", { type: "button", className: redrawing ? "tile redrawing" : "tile" });
  tile.dataset.testid = `tile-${record.id}`;
  tile.dataset.id = record.id;
  tile.append(make("span", { className: "pic" }, Object.assign(document.createElement("kamon-crest"), {})), make("span", { className: "label" }, make("span", { className: "name", textContent: nameOf(record) }), make("small", { textContent: ja() ? `${record.name.reading} · ${record.name.romaji}` : `${record.name.ja} · ${record.name.romaji}` })));
  tile.append(make("span", { className: "no", textContent: say("no_label", { n: record.no }) }));
  if (inFrames > 0) tile.append(make("span", { className: "in-frames", textContent: say("frames_badge", { n: inFrames }) }));
  if (ranked && !redrawing) {
    const bar = make("span", { className: "meter" }, make("i"));
    bar.firstChild.style.width = `${record.stats.meter}%`;
    tile.querySelector(".label").append(bar, make("small", { className: "grade", textContent: complexityText(record.stats) }));
  }
  if (ranked && !redrawing) tile.querySelector(".label").append(make("small", { className: "counts", textContent: statsText(record.stats, [...new Set(["score", state.by, "circles", "lines", "arcs", "steps"])]) }));
  if (redrawing) tile.querySelector(".label").append(make("small", { className: "note", textContent: say("being_redrawn") }));
  const element = tile.querySelector("kamon-crest");
  element.setAttribute("crest", record.id);
  element.setAttribute("size", "88");
  element.setAttribute("loading", "eager");
  element.setAttribute("label", nameOf(record));
  tile.addEventListener("click", () => openCrest(record.id));

  return make("li", {}, tile);
};

// With the frame variants grouped, a crest that is only another crest in a frame is counted on the tile of the crest without the frame, if that is in the list.
// Nothing else is ever left out: a crest that differs in its count, its arrangement or its motifs always has its own tile.
const groupFrames = (found) => {
  const present = new Set(found.map((record) => record.id));
  const inFrames = new Map();
  const shown = found.filter((record) => {
    if (record.variantKind !== "frame" || !present.has(record.base)) return true;
    inFrames.set(record.base, (inFrames.get(record.base) ?? 0) + 1);

    return false;
  });

  return { shown, inFrames };
};

// A chapter's name in both languages, the page's own first.
const chapterName = (id) => (ja() ? `${WORDS.ja[`cov_ch_${id}`]} · ${WORDS.en[`cov_ch_${id}`]}` : `${WORDS.en[`cov_ch_${id}`]} · ${WORDS.ja[`cov_ch_${id}`]}`);
// A family's header, as the books open one: its name in both languages, its reading, and how many crests it has (of how many, when a choice has narrowed it).
const familyHeader = (family, n, total) =>
  make(
    "header",
    { className: "family-head" },
    make("h4", { className: "family-name" }, make("span", { textContent: ja() ? `${family.ja}（${family.reading}）` : family.en }), make("small", { className: "family-other", textContent: ja() ? family.en : `${family.ja}（${family.reading}）` })),
    make("span", { className: "family-count", textContent: n === total ? say(n === 1 ? "crest_one" : "crests_with", { n }) : say("shown", { n, total }) }),
  );

// The grid: in the books' order, family by family under their chapters, each family with its header and nothing folded away; ranked by a count, or
// found by a word (which puts a family's crests first), the crests are one list in that order.
const paintGrid = (found, ranked, grouped) => {
  const grid = $("grid");
  grid.dataset.ids = found.map((record) => record.id).join(",");
  const book = !ranked && state.query.trim() === "";
  if (!book) {
    const { shown, inFrames } = grouped ? groupFrames(found) : { shown: found, inFrames: new Map() };
    grid.replaceChildren(make("ul", { className: "grid" }, ...shown.map((record) => crestTile(record, ranked, inFrames.get(record.id) ?? 0))));
    return;
  }
  const families = [];
  for (const record of found) {
    if (families.at(-1)?.id !== record.family) families.push({ id: record.family, records: [] });
    families.at(-1).records.push(record);
  }
  const nodes = [];
  let chapter = null;
  let list = null;
  for (const one of families) {
    const family = motifFamily(one.id);
    if (family.chapter !== chapter) {
      chapter = family.chapter;
      nodes.push(make("h3", { className: "chapter-head", textContent: chapterName(chapter) }), (list = make("div", { className: "family-list" })));
    }
    const { shown, inFrames } = grouped ? groupFrames(one.records) : { shown: one.records, inFrames: new Map() };
    const section = make("section", { className: "family" }, familyHeader(family, one.records.length, MANIFEST.filter((record) => record.family === one.id).length), make("ul", { className: "grid" }, ...shown.map((record) => crestTile(record, ranked, inFrames.get(record.id) ?? 0))));
    section.dataset.testid = `family-${one.id}`;
    list.append(section);
  }
  grid.replaceChildren(...nodes);
};

// The glossary: a kind of part, then each part of it as a card that finds the crests with it.
const renderParts = () => {
  const groups = [["frame", FRAMES], ...KINDS.map((kind) => [kind, MOTIFS.filter((one) => one.kind === kind)]), ["arrangement", ARRANGEMENTS], ["turn", TURNS]];
  choiceRow($("group-row"), groups.map(([id]) => [id, say(`parts_group_${id}`), undefined]), state.group, (value) => {
    state.group = value;
    refresh();
  });
  const list = groups.find(([id]) => id === state.group)?.[1] ?? [];
  const all = facets();
  $("parts-grid").replaceChildren(
    ...list.map((one) => {
      const key = state.group === "frame" ? "frames" : state.group === "arrangement" ? "arrangements" : "motifs";
      const n = state.group === "turn" ? MANIFEST.filter((record) => record.motifs.some((use) => use.turn === one.id)).length : state.group === "frame" && one.id.startsWith("ring-") ? all.frames[one.id] ?? 0 : all[key][one.id] ?? 0;
      const card = make("li", { className: "part-card" });
      card.dataset.testid = `part-${one.id}`;
      const show = make("button", { type: "button", className: "fam-button", textContent: n === 1 ? say("show_crest_one") : say("show_crests", { n }), disabled: n === 0 });
      show.addEventListener("click", () => showWith(state.group === "frame" ? { frame: one.id.startsWith("ring-") ? "ring" : one.id } : state.group === "arrangement" ? { arrangement: one.id } : state.group === "turn" ? { query: one.en } : { motif: one.id }));
      card.append(make("span", { className: "part-ja", lang: "ja", textContent: one.ja }), make("strong", { textContent: ja() ? one.reading : one.en }), make("small", { textContent: `${ja() ? one.en : one.reading} · ${one.romaji}` }), make("p", { textContent: ja() ? one.about.ja : one.about.en }), show);

      return card;
    }),
  );
};

const refresh = () => {
  for (const tab of document.querySelectorAll("[data-tab]")) tab.setAttribute("aria-selected", String(tab.dataset.tab === state.tab));
  $("catalogue-panel").hidden = state.tab === "parts";
  $("parts-panel").hidden = state.tab !== "parts";
  remember();
  if (state.tab === "parts") renderParts();
  else renderCatalogue();
  familyHelp?.refresh?.();
};
// `main[data-ready="true"]` says the page is drawn: every crest on screen has its SVG. The pictures in the README wait on it.
const markReady = () => {
  const main = document.querySelector("main");
  main.dataset.ready = "false";
  Promise.all([...document.querySelectorAll("#grid kamon-crest")].map((element) => element.ready)).then(() => requestAnimationFrame(() => (main.dataset.ready = "true")));
};
const render = () => {
  sayAll();
  refresh();
  markReady();
  if (state.open !== null && $("detail").open) fillDetail(state.open, false);
};

// ---- The panel that draws one crest ----
let timer = null;
const detail = { id: null, construction: null, view: null, part: null, playing: false, speed: 1, loop: false, guides: true };
// The switches beside Guides: the centre dots, the compass-width numbers, the fill, the compass arm, the widths key, the pen's ink, and every place built in full
// (the one that is off to begin with). The page starts with the key and the pen's ink on, though the element has them off unless asked. Kept for the session, where the browser lets it.
const SWITCHES = ["centres", "widths", "fill", "compass-arm", "widths-key", "ink-draw", "full-build"];
const switches = { centres: true, widths: true, fill: true, "compass-arm": true, "widths-key": true, "ink-draw": true, "full-build": false };
const isOn = (name) => (name === "full-build" ? switches[name] === true : switches[name] !== false);
try {
  Object.assign(switches, JSON.parse(sessionStorage.getItem("kamon-switches") ?? "{}"));
} catch {
  // A private window: the switches start on.
}
// The widths key (a ruler, the width the compass is set to marked on it) goes to the right of the drawing where the card has room (a desk or the whole window), and below it otherwise.
const keyPlace = () => (matchMedia("(min-width: 900px)").matches && ($("detail").hasAttribute("data-full") || view === "s") ? "on" : "below");
const setSwitches = () => {
  for (const name of SWITCHES) {
    $(name).setAttribute("aria-pressed", String(isOn(name)));
    // Each switch is an attribute of the crest: `off` for the first four, and for the last three, `on` (the key is `on` or `below`), and none when they are off.
    const value = !isOn(name) ? (["widths-key", "ink-draw", "full-build"].includes(name) ? null : "off") : name === "widths-key" ? keyPlace() : name === "ink-draw" || name === "full-build" ? "on" : null;
    if (crestElement().getAttribute(name) !== value) {
      if (value === null) crestElement().removeAttribute(name);
      else crestElement().setAttribute(name, value);
    }
  }
};
// The steps the card counts and captions are the crest's, with every place built in full when that is on.
const seen = () => (isOn("full-build") ? fullBuilt(detail.view ?? detail.construction) : (detail.view ?? detail.construction));
// The drawing's size on the card (small, medium or large), kept for the session like the switches; the whole window is not kept.
let view = "s";
try {
  view = pick(sessionStorage.getItem("kamon-view"), ["s", "m", "l"], "s");
} catch {
  // A private window: the drawing starts small.
}
const setView = () => {
  $("detail").dataset.view = view;
  for (const node of document.querySelectorAll("#view button")) node.setAttribute("aria-pressed", String(node.dataset.value === view));
  setSwitches();
};
const setFull = (on) => {
  $("detail").toggleAttribute("data-full", on);
  $("full").setAttribute("aria-pressed", String(on));
  setSwitches();
};
// The finished crest as the switches have it: line art when the fill is off, the crest's own outlines.
const finishedSvg = async (options) => (switches.fill === false ? staticSvg(await crestSteps(detail.id), { fill: false }).replace("<svg ", `<svg${options.color === undefined ? "" : ` style="color:${options.color};background:${options.background}"`} `) : crest(detail.id, options));

const crestElement = () => $("detail-crest");
// A crest still traced from the book has no construction to play: its card shows it finished, with a note.
const redrawn = () => manifest(detail.id)?.redrawing === true;
const pressed = () => [...document.querySelectorAll("#parts-row [data-key]")].find((chip) => chip.dataset.key === detail.part) ?? null;
// What a chip finds in the catalogue: the choices that show every crest with its part.
const filterOf = ({ kind, term: id }) => (kind === "part_frame" ? { frame: id.startsWith("ring-") ? "ring" : id } : kind === "part_motif" ? { kind: MOTIFS.find((one) => one.id === id).kind, motif: id } : kind === "part_count" ? { count: id } : kind === "part_arrangement" ? { arrangement: id } : { query: term(id).en });
const showWith = (filter) => {
  Object.assign(state, { query: "", frame: "all", kind: "all", motif: "all", count: "any", arrangement: "any", used: false, tab: "catalogue" }, filter);
  refresh();
};
// The chips, the words under them and the two actions, for the part shown alone (or none).
const paintPart = () => {
  const chip = pressed();
  for (const one of document.querySelectorAll("#parts-row [data-key]")) one.setAttribute("aria-pressed", String(one === chip));
  $("part-actions").hidden = chip === null;
  if (chip === null) {
    $("part-about").textContent = say("part_hint");
    return;
  }
  const { part, kind, term: id } = chip.dataset;
  const shapes = detail.construction.shapes.filter((shape) => shape.part === part);
  const turned = shapes.some((shape) => shape.turn !== undefined);
  const picked = term(id);
  $("part-about").textContent =
    kind === "part_count"
      ? say(id === "1" ? "about_one" : turned ? "about_count" : "about_whole", { n: ja() ? countName(Number(id), "ja") : id, motif: termName(term(part)) })
      : `${termName(picked)} ${ja() ? `（${picked.reading}）` : `(${picked.reading})`}: ${ja() ? picked.about.ja : picked.about.en}${kind === "part_arrangement" ? ` ${say(turned ? "about_axes" : "about_no_axes")}` : ""}`;
  $("draw-part").disabled = shapes.length === 0;
  const names = { frame: "frame", kind: "kind", motif: "motif", count: "count", arrangement: "arr", query: "q" };
  $("more-part").href = `?${new URLSearchParams(Object.entries(filterOf(chip.dataset)).map(([key, value]) => [names[key], value]))}`;
};
// Shows the pressed chip's part alone in the crest, or the whole crest when none is pressed.
const rest = async () => {
  const chip = pressed();
  const show = { part_count: "count", part_arrangement: "arrangement" }[chip?.dataset.kind];
  detail.view = chip === null ? null : isolated(detail.construction, chip.dataset.part, show);
  await (chip === null ? crestElement().clear() : crestElement().isolate(chip.dataset.part, show));
};
// A chip toggles: a second press, or Esc, shows the whole crest again.
const pickPart = async (key) => {
  detail.part = key === detail.part ? null : key;
  paintPart();
  await rest();
};

// The caption keeps the height of the crest's longest step, so the buttons under it never move as the steps go by.
let captionTexts = [];
const captionFor = { shown: null, lang: null };
const fitCaption = () => {
  const caption = $("caption");
  const width = caption.clientWidth;
  if (width === 0) return;
  const probe = caption.cloneNode(false);
  probe.removeAttribute("id");
  probe.removeAttribute("data-testid");
  probe.removeAttribute("aria-live");
  probe.style.cssText = `position:absolute;visibility:hidden;left:-9999px;top:0;width:${width}px;min-height:0`;
  caption.after(probe);
  let tallest = 0;
  for (const text of captionTexts) {
    probe.textContent = text;
    tallest = Math.max(tallest, probe.getBoundingClientRect().height);
  }
  probe.remove();
  caption.style.minHeight = `${Math.ceil(tallest)}px`;
};
// Measured again when the card's width changes (a turned phone, the window resized), not when only its height does.
let captionWidth = 0;
new ResizeObserver(() => {
  if ($("caption").clientWidth === captionWidth) return;
  captionWidth = $("caption").clientWidth;
  // On the next frame: setting the caption's height inside the observer would resize what it observes, a loop Safari warns of.
  requestAnimationFrame(fitCaption);
}).observe($("caption"));

const watch = () => {
  clearInterval(timer);
  const caption = $("caption");
  const shown = seen();
  const n = shown.steps.length;
  const fitted = () => {
    // Measured once for each crest, view and language, not at every step.
    if (captionFor.shown === shown && captionFor.lang === language.lang) return;
    Object.assign(captionFor, { shown, lang: language.lang });
    captionTexts = [say("drawing"), say("done"), say("redrawing_note"), ...shown.steps.map((step, i) => `${say("step_of", { n: i + 1, total: n })} · ${stepCaption(step, shown, language.lang)}`)];
    fitCaption();
  };
  $("scrub").max = String(n);
  const tick = () => {
    fitted();
    const at = crestElement().at;
    $("scrub").value = String(detail.playing || crestElement().paused ? at + 1 : n);
    caption.textContent = n === 0 ? "" : at < 0 || at >= n ? say("drawing") : `${say("step_of", { n: at + 1, total: n })} · ${stepCaption(shown.steps[at], shown, language.lang)}`;
    caption.dataset.step = String(at + 1);
  };
  tick();
  timer = setInterval(tick, 120);
};

const playDetail = async () => {
  const element = crestElement();
  if (detail.part !== null) await pickPart(detail.part);
  element.setAttribute("speed", String(detail.speed));
  if (detail.loop) element.setAttribute("loop", "");
  else element.removeAttribute("loop");
  if (detail.guides) element.removeAttribute("guides");
  else element.setAttribute("guides", "off");
  element.setAttribute("animate", "");
  if (redrawn() || reduced.matches) {
    clearInterval(timer);
    $("caption").textContent = say(redrawn() ? "redrawing_note" : "done");
    await element.play();
    return;
  }
  watch();
  await element.play();
};

const fillDetail = async (id, play = true) => {
  const record = manifest(id);
  if (record === null) return;
  detail.id = id;
  detail.part = null;
  detail.view = null;
  state.open = id;
  remember();
  const [steps, text] = await Promise.all([crestSteps(id), crestConstruction(id)]);
  detail.construction = steps;
  setSwitches();
  $("detail-title").textContent = nameOf(record);
  $("detail-other").textContent = ja() ? `${record.name.en} · ${record.name.reading} · ${record.name.romaji}` : `${record.name.ja} · ${record.name.reading} · ${record.name.romaji}`;
  // Its catalogue number and its family, and the family's crests as a row of small tiles in the books' order, this one marked: a tap shows another without closing the card.
  const family = motifFamily(record.family);
  $("detail-family").textContent = `${say("no_label", { n: record.no })} · ${ja() ? `${family.ja}（${family.reading}）· ${family.en}` : `${family.en} · ${family.ja}（${family.reading}）`}`;
  const kin = variantsOf(id);
  $("variants-block").hidden = kin.length < 2;
  $("variants").replaceChildren(
    ...kin.map((one) => {
      const tile = make("button", { type: "button", className: "vtile", title: nameOf(one) });
      tile.dataset.testid = `variant-${one.id}`;
      tile.dataset.id = one.id;
      tile.setAttribute("aria-pressed", String(one.id === id));
      if (one.id === id) tile.setAttribute("aria-current", "true");
      const picture = document.createElement("kamon-crest");
      for (const [name, value] of [["crest", one.id], ["size", "52"], ["loading", "eager"], ["label", nameOf(one)]]) picture.setAttribute(name, value);
      tile.append(make("span", { className: "pic" }, picture), make("span", { className: "name", textContent: nameOf(one) }));
      tile.addEventListener("click", () => void (one.id === detail.id ? null : fillDetail(one.id, true)));

      return tile;
    }),
  );
  $("stats").textContent = record.redrawing === true ? say("redrawing_counts") : `${complexityText(record.stats)}${ja() ? "・" : " · "}${statsText(record.stats)}`;
  $("detail").toggleAttribute("data-redrawing", record.redrawing === true);
  const element = crestElement();
  element.setAttribute("crest", id);
  element.setAttribute("label", nameOf(record));
  // Parts: the frame, then each motif with its count, arrangement and turn.
  const chips = [];
  // A chip names its sort (`kind`), the shapes it shows alone (`part`: the frame's, or a motif's) and what it is (`term`).
  const chip = (kindKey, id, part, text) => {
    const node = make("button", { type: "button", className: "fam-chip", textContent: `${say(kindKey)}: ${text ?? termName(term(id))}` });
    Object.assign(node.dataset, { part, kind: kindKey, term: id, key: `${kindKey}:${part}` });
    node.addEventListener("click", () => void pickPart(node.dataset.key));
    return node;
  };
  chips.push(chip("part_frame", record.frame, "frame"));
  for (const use of record.motifs) {
    chips.push(chip("part_motif", use.motif, use.motif));
    chips.push(chip("part_count", String(use.count), use.motif, `${ja() ? countName(use.count, "ja") : use.count} ×`));
    chips.push(chip("part_arrangement", use.arrangement, use.motif));
    if (use.turn !== undefined) chips.push(chip("part_turn", use.turn, use.motif));
  }
  $("parts-row").replaceChildren(...chips);
  $("construction-note").textContent = ja() ? text.ja : text.en;
  // A crest that carries a note (the manji) says it under its construction, in the language of the page.
  $("crest-note").hidden = record.note === undefined;
  $("crest-note").textContent = record.note === undefined ? "" : ja() ? record.note.ja : record.note.en;
  $("families").replaceChildren(...(record.families.length === 0 ? [make("li", { textContent: say("no_families") })] : record.families.map((family) => make("li", { textContent: ja() ? `${family.ja}${family.reading ? `（${family.reading}）` : ""}` : `${family.en} · ${family.ja}` }))));
  const users = $("used-by");
  users.replaceChildren(
    ...(record.usedBy.length === 0
      ? [make("li", { textContent: say("no_used_by") })]
      : record.usedBy.map((user) => {
          const item = make("li", {});
          item.dataset.testid = "user";
          item.append(make("strong", { textContent: ja() ? user.name.ja : user.name.en }), make("span", { className: "fam-badge", textContent: `${say(`kind_${user.kind}`)} · ${say(`rel_${user.relation === "logo-derived" ? "logo" : user.relation}`)}` }), make("p", { textContent: ja() ? user.note.ja : user.note.en }));
          const links = make("p", { className: "fam-fine" });
          for (const source of user.sources) links.append(make("a", { href: source.url, textContent: source.title, rel: "noopener" }), document.createTextNode(` (${say("read_on", { date: source.read })}) `));
          item.append(links);

          return item;
        })),
  );
  const embed = [`<kamon-crest crest="${id}" size="96" animate></kamon-crest>`, `import svg from "@johnmorrisdotca/kamon-crests/crests/${id}";`, `const svg = await crest("${id}");   // from "@johnmorrisdotca/kamon-crests/load"`, `const steps = await crestSteps("${id}");   // the construction`];
  $("embed").replaceChildren(...embed.map((line) => make("code", { textContent: line })));
  $("embed-copy").dataset.text = embed[0];
  paintPart();
  if (play) await playDetail();
};

const openCrest = async (id) => {
  const dialog = $("detail");
  if (!dialog.open) dialog.showModal();
  await fillDetail(id, true);
};

const download = (name, blob) => {
  const link = make("a", { href: URL.createObjectURL(blob), download: name });
  document.body.append(link);
  link.click();
  link.remove();
  setTimeout(() => URL.revokeObjectURL(link.href), 1000);
};

const init = () => {
  sayAll();
  $("search").addEventListener("input", (event) => {
    state.query = event.target.value;
    refresh();
  });
  $("clear").addEventListener("click", () => {
    Object.assign(state, { query: "", frame: "all", kind: "all", motif: "all", count: "any", arrangement: "any", used: false });
    refresh();
  });
  for (const tab of document.querySelectorAll("[data-tab]")) {
    tab.addEventListener("click", () => {
      state.tab = tab.dataset.tab;
      refresh();
    });
  }
  $("detail").addEventListener("close", () => {
    clearInterval(timer);
    setFull(false);
    state.open = null;
    remember();
  });
  $("draw").addEventListener("click", () => void playDetail());
  $("draw-part").addEventListener("click", async () => {
    await crestElement().step(-1);
    await crestElement().play();
  });
  $("more-part").addEventListener("click", (event) => {
    event.preventDefault();
    const filter = filterOf(pressed().dataset);
    $("detail").close();
    showWith(filter);
  });
  // Esc leaves the whole window, then shows the whole crest again, before it closes the panel.
  $("detail").addEventListener("cancel", (event) => {
    if (!$("detail").hasAttribute("data-full") && detail.part === null) return;
    event.preventDefault();
    if ($("detail").hasAttribute("data-full")) setFull(false);
    else void pickPart(detail.part);
  });
  setView();
  for (const node of document.querySelectorAll("#view button")) {
    node.addEventListener("click", () => {
      view = node.dataset.value;
      try {
        sessionStorage.setItem("kamon-view", view);
      } catch {
        // Not kept, then.
      }
      setView();
    });
  }
  $("full").addEventListener("click", () => setFull(!$("detail").hasAttribute("data-full")));
  crestElement().addEventListener("kamon-end", () => {
    clearInterval(timer);
    $("caption").textContent = say(redrawn() ? "redrawing_note" : "done");
    $("caption").dataset.step = String(seen().steps.length);
    // A part drawn alone goes back to its still picture, with its guides.
    if (detail.part !== null) void rest();
  });
  for (const name of ["kamon-play", "kamon-step"]) crestElement().addEventListener(name, () => redrawn() || watch());
  // The player: play and pause, a step back and forward, and a scrubber with one stop for each step (the first is the empty page).
  const playing = (on) => {
    detail.playing = on;
    $("play-pause").textContent = on ? "Ⅱ" : "▶";
    $("play-pause").setAttribute("aria-label", say(on ? "player_pause" : "player_play"));
  };
  playing(false);
  for (const name of ["kamon-play", "kamon-pause", "kamon-step", "kamon-end"]) crestElement().addEventListener(name, () => playing(name === "kamon-play"));
  $("play-pause").addEventListener("click", () => (detail.playing ? crestElement().pause() : void crestElement().play()));
  $("step-back").addEventListener("click", () => void crestElement().step(crestElement().at - 1));
  $("step-forward").addEventListener("click", () => void crestElement().step(crestElement().at + 1));
  $("scrub").addEventListener("input", (event) => void crestElement().step(Number(event.target.value) - 1));
  $("loop").addEventListener("click", (event) => {
    detail.loop = !detail.loop;
    event.currentTarget.setAttribute("aria-pressed", String(detail.loop));
    void playDetail();
  });
  setSwitches();
  matchMedia("(min-width: 900px)").addEventListener("change", setSwitches);
  for (const name of SWITCHES) {
    $(name).addEventListener("click", () => {
      switches[name] = !isOn(name);
      try {
        sessionStorage.setItem("kamon-switches", JSON.stringify(switches));
      } catch {
        // Not kept, then.
      }
      setSwitches();
      // A drawing that is playing, or has played, takes the switch at once; a still one is drawn again. The key, the ink and the places change the drawing's size or pace, and the element draws them again itself, from where it was or from the start.
      const element = crestElement();
      if (["widths-key", "ink-draw", "full-build"].includes(name)) {
        if (name === "full-build") void playDetail();
        return;
      }
      if (element.paused || element.querySelector("svg style") === null) void element.step(element.paused ? element.at : Infinity);
    });
  }
  $("guides").addEventListener("click", (event) => {
    detail.guides = !detail.guides;
    event.currentTarget.setAttribute("aria-pressed", String(detail.guides));
    void playDetail();
  });
  for (const node of document.querySelectorAll("#speed button")) {
    node.addEventListener("click", () => {
      detail.speed = Number(node.dataset.value);
      for (const other of document.querySelectorAll("#speed button")) other.setAttribute("aria-pressed", String(other === node));
      void playDetail();
    });
  }
  $("embed-copy").addEventListener("click", async (event) => {
    await navigator.clipboard?.writeText(event.currentTarget.dataset.text ?? "").catch(() => {});
    $("copied").textContent = say("copied");
    setTimeout(() => ($("copied").textContent = ""), 1500);
  });
  $("download-svg").addEventListener("click", async () => {
    // A file for drawing programs (Illustrator, Inkscape, Affinity): the colour on screen written in, not currentColor, and a printed size of 100 mm.
    const color = getComputedStyle(crestElement()).color || "#000000";
    const svg = (await finishedSvg({ title: nameOf(manifest(detail.id)), color })).replace(/currentColor/g, color).replace("<svg ", '<svg width="100mm" height="100mm" ');
    download(`${detail.id}.svg`, new Blob([svg], { type: "image/svg+xml" }));
  });
  $("download-png").addEventListener("click", async () => {
    const size = Number($("png-size").value);
    const svg = await finishedSvg({ color: "#1f2320", background: "#ffffff" });
    const image = new Image();
    image.onload = () => {
      const canvas = Object.assign(document.createElement("canvas"), { width: size, height: size });
      canvas.getContext("2d").drawImage(image, 0, 0, size, size);
      canvas.toBlob((blob) => blob && download(`${detail.id}-${size}.png`, blob), "image/png");
    };
    image.src = `data:image/svg+xml;base64,${btoa(unescape(encodeURIComponent(svg)))}`;
  });
  render();
  if (state.open !== null && manifest(state.open) !== null) void openCrest(state.open);
};
init();
