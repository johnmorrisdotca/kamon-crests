// The Build page's script: a reader composes a crest from the package's own drawings, a frame, a motif, how many of it, how they are
// set out and which way it turns, and it draws itself the way every crest here does. The composing is ./compose.js; this is the page:
// the choices in a row of tabs with their chips under, the crest above, its name in the crest grammar, the catalogue's crest with the
// same parts, and the SVG to keep. Nothing is sent anywhere: it all happens in the browser. The page's words are set as text, never as HTML.
import "./dist/element-define.js";
import { paint } from "./dist/index.js";
import { crestSteps } from "./dist/load.js";
import { MANIFEST } from "./dist/manifest.js";
import { ARRANGEMENTS, FRAMES, MOTIFS, TURNS, countName } from "./dist/parts.js";
import { animatedSvg, durationOf, fullBuilt, staticSvg, stepsOf } from "./dist/animate.js";
import { WORDS } from "./words.js";
import { ARRANGEMENT_COUNTS, COUNTS, FRAME_IDS, canBuild, compose, isChiral, nameOf, sameDrawing, sameParts, unitsOf } from "./compose.js";

const $ = (id) => document.getElementById(id);
const language = familyLanguage({ id: "kamon-crests", words: WORDS, onChange: () => render() });
const say = (key, values, lang = language.lang) => {
  const word = WORDS[lang][key] ?? WORDS.en[key] ?? "";
  if (!(key in WORDS.en)) console.error(`The demo has no word for "${key}"`);
  return values === undefined ? word : word.replace(/\{(\w+)\}/g, (whole, name) => String(values[name] ?? ""));
};
const ja = () => language.lang === "ja";
const termName = (one) => (ja() ? one.ja : one.en);
const reduced = matchMedia("(prefers-reduced-motion: reduce)");

const make = (tag, props = {}, ...kids) => {
  const node = Object.assign(document.createElement(tag), props);
  for (const kid of kids) node.append(kid);
  return node;
};

// The motifs that have a drawing to compose from, and the crest that stands for each.
const UNITS = unitsOf(MANIFEST);
const KINDS = ["plant", "animal", "object", "shape", "sky"];
const MOTIF_LIST = MOTIFS.filter((one) => UNITS.has(one.id));
const ARRANGEMENT_LIST = ARRANGEMENTS.filter((one) => one.id in ARRANGEMENT_COUNTS);
const TABS = ["frame", "motif", "count", "arrangement", "turn"];
const TOOLS = { fullBuilt, stepsOf };

const asked = new URLSearchParams(location.search);
const pick = (value, allowed, fallback) => (allowed.includes(value) ? value : fallback);
const state = {
  tab: pick(asked.get("tab"), TABS, "frame"),
  frame: pick(asked.get("frame"), FRAME_IDS, "ring-medium"),
  motif: pick(asked.get("motif"), [...UNITS.keys()], "plum"),
  count: pick(Number(asked.get("count")), COUNTS, 3),
  arrangement: pick(asked.get("arr"), Object.keys(ARRANGEMENT_COUNTS), "ring"),
  mirror: asked.get("turn") === "mirror",
  kind: "plant",
};
const unitOf = () => UNITS.get(state.motif);

// A count and an arrangement that cannot be built together are moved to ones that can: a count of one is a single, and an arrangement
// that has no such count takes the nearest it has.
const settle = (changed) => {
  const counts = ARRANGEMENT_COUNTS[state.arrangement];
  if (changed === "arrangement" && !counts.includes(state.count)) state.count = counts.reduce((best, n) => (Math.abs(n - state.count) < Math.abs(best - state.count) ? n : best), counts[0]);
  if (!canBuild(state.arrangement, state.count)) state.arrangement = state.count === 1 ? "single" : ["ring", "radial", "rows", "facing"].find((id) => canBuild(id, state.count));
  if (!isChiral(unitOf())) state.mirror = false;
};
settle();
state.kind = MOTIFS.find((one) => one.id === state.motif).kind;

const remember = () => {
  const query = new URLSearchParams();
  const put = (key, value, plain) => value !== plain && query.set(key, value);
  put("tab", state.tab, "frame");
  put("frame", state.frame, "ring-medium");
  put("motif", state.motif, "plum");
  put("count", state.count, 3);
  put("arr", state.arrangement, "ring");
  put("turn", state.mirror ? "mirror" : "plain", "plain");
  const text = query.toString();
  history.replaceState(null, "", `${location.pathname}${text === "" ? "" : `?${text}`}`);
};

const sayAll = () => {
  const own = (name) => [...document.querySelectorAll(`[${name}]`)].filter((node) => node.closest("header, footer") === null);
  for (const node of own("data-say")) node.textContent = say(node.dataset.say);
  for (const node of own("data-say-label")) node.setAttribute("aria-label", say(node.dataset.sayLabel));
};

const chip = (label, pressed, onClick, { dataset = {}, ...extra } = {}) => {
  const node = make("button", { type: "button", textContent: label, ...extra });
  Object.assign(node.dataset, dataset);
  node.setAttribute("aria-pressed", String(pressed));
  node.addEventListener("click", onClick);
  return node;
};

const countLabel = (n) => (ja() ? countName(n, "ja") : String(n));
const turnTerms = () => {
  const unit = unitOf();
  const own = unit.motifs[0].turn;
  // A tomoe is named for the way it turns; any other motif that is not the same mirrored is "as drawn" or "mirrored".
  return own === undefined ? [[false, say("bld_turn_plain"), null], [true, say("bld_turn_mirror"), null]] : [[false, termName(TURNS.find((one) => one.id === own)), TURNS.find((one) => one.id === own)], [true, termName(TURNS.find((one) => one.id !== own)), TURNS.find((one) => one.id !== own)]];
};

const values = () => ({
  frame: termName(FRAMES.find((one) => one.id === state.frame)),
  motif: termName(MOTIFS.find((one) => one.id === state.motif)),
  count: countLabel(state.count),
  arrangement: termName(ARRANGEMENTS.find((one) => one.id === state.arrangement)),
  turn: isChiral(unitOf()) ? turnTerms().find(([mirror]) => mirror === state.mirror)[1] : "—",
});

// The tabs, and under them the chips of the one that is open.
const renderControls = () => {
  const shown = values();
  for (const name of TABS) {
    const tab = $(`bld-tab-${name}`);
    tab.setAttribute("aria-selected", String(state.tab === name));
    $(`bld-val-${name}`).textContent = shown[name];
  }
  const host = $("bld-chips");
  host.className = state.tab === "motif" ? "bld-chips bld-motif" : "choices bld-chips";
  const about = $("bld-about");
  about.textContent = "";
  if (state.tab === "frame") {
    host.replaceChildren(...FRAME_IDS.map((id) => chip(termName(FRAMES.find((one) => one.id === id)), state.frame === id, () => change({ frame: id }), { dataset: { value: id } })));
    about.textContent = ja() ? FRAMES.find((one) => one.id === state.frame).about.ja : FRAMES.find((one) => one.id === state.frame).about.en;
  } else if (state.tab === "motif") {
    const kinds = make("div", { className: "choices", role: "group" }, ...KINDS.filter((kind) => MOTIF_LIST.some((one) => one.kind === kind)).map((kind) => chip(say(`kind_${kind}`), state.kind === kind, () => change({ kind }), { dataset: { value: kind } })));
    kinds.setAttribute("aria-label", say("kind"));
    const grid = make("div", { className: "bld-grid" }, ...MOTIF_LIST.filter((one) => one.kind === state.kind).map((one) => motifChip(one)));
    host.replaceChildren(kinds, grid);
    about.textContent = say("bld_from", { name: ja() ? unitOf().name.ja : unitOf().name.en });
  } else if (state.tab === "count") {
    host.replaceChildren(...COUNTS.map((n) => chip(countLabel(n), state.count === n, () => change({ count: n }), { dataset: { value: String(n) } })));
  } else if (state.tab === "arrangement") {
    host.replaceChildren(...ARRANGEMENT_LIST.map((one) => chip(termName(one), state.arrangement === one.id, () => change({ arrangement: one.id }), { dataset: { value: one.id } })));
    const one = ARRANGEMENTS.find((item) => item.id === state.arrangement);
    about.textContent = ja() ? one.about.ja : one.about.en;
  } else {
    const chiral = isChiral(unitOf());
    host.replaceChildren(...turnTerms().map(([mirror, label]) => chip(label, state.mirror === mirror, () => change({ mirror }), { disabled: !chiral && mirror, dataset: { value: mirror ? "mirror" : "plain" } })));
    about.textContent = chiral ? "" : say("bld_turn_same");
  }
  $("bld-how").textContent = say(`bld_how_${state.arrangement}`, { n: countLabel(state.count) });
};

// One motif: the crest that stands for it, small, with its name.
const motifChip = (one) => {
  const picture = make("kamon-crest");
  for (const [name, value] of [["crest", UNITS.get(one.id).id], ["size", "44"], ["loading", "eager"], ["label", termName(one)]]) picture.setAttribute(name, value);
  const node = make("button", { type: "button", className: "bld-motif-chip" }, make("span", { className: "pic" }, picture), make("span", { className: "name", textContent: termName(one) }));
  node.dataset.value = one.id;
  node.setAttribute("aria-pressed", String(state.motif === one.id));
  node.addEventListener("click", () => change({ motif: one.id }));
  return node;
};

// The constructions of the units, each loaded once.
const loaded = new Map();
const constructionOf = (id) => {
  if (!loaded.has(id)) loaded.set(id, crestSteps(id));
  return loaded.get(id);
};

let built = null;
let drawn = 0;
let finished = false;
const draw = () => {
  if (built === null) return;
  const pic = $("bld-pic");
  drawn += 1;
  // The animation runs in about twenty seconds, however many parts the crest has.
  const speed = Math.max(1, durationOf(built) / 22);
  pic.innerHTML = finished || reduced.matches ? staticSvg(built) : animatedSvg(built, { speed, id: `kcb${drawn}` });
  pic.dataset.drawn = String(drawn);
  $("bld-finished").setAttribute("aria-pressed", String(finished || reduced.matches));
};

const housesText = (record) => (record.families.length === 0 ? say("bld_no_houses") : say("bld_houses", { houses: record.families.slice(0, 8).map((one) => (ja() ? one.ja : one.en)).join(ja() ? "、" : ", ") + (record.families.length > 8 ? "…" : "") }));

// The name, in both languages, and the crests of the catalogue that have the same parts.
const spec = () => ({ unit: unitOf(), frame: state.frame, arrangement: state.arrangement, count: state.count, mirror: state.mirror });
const renderName = async (mine) => {
  const names = { en: nameOf(spec(), { motifs: MOTIFS, turns: TURNS }, say, countName, "en"), ja: nameOf(spec(), { motifs: MOTIFS, turns: TURNS }, say, countName, "ja") };
  $("bld-name").textContent = ja() ? names.ja : names.en;
  $("bld-name-other").textContent = ja() ? names.en : names.ja;
  const found = sameParts(MANIFEST, spec()).slice(0, 3);
  // The same parts are the same crest only if they are drawn the same: the catalogue's own drawing is held against the composed one.
  const same = await Promise.all(found.map(async (record) => sameDrawing(built.shapes, (await constructionOf(record.id)).shapes)));
  if (mine !== token) return names;
  const lines = found.map((record, i) => {
    const exact = same[i];
    const link = make("a", { className: "fam-button", href: `../?open=${encodeURIComponent(record.id)}`, textContent: say("bld_match_open") });
    link.dataset.testid = `bld-match-${record.id}`;
    return make("div", { className: "bld-match-one" }, make("p", { textContent: say(exact ? "bld_match_exact" : "bld_match_parts", { name: ja() ? record.name.ja : record.name.en }) }), make("p", { className: "fam-fine", textContent: housesText(record) }), link);
  });
  $("bld-match").dataset.found = found.map((record) => record.id).join(",");
  $("bld-match").dataset.same = same.join(",");
  $("bld-match").replaceChildren(...(lines.length === 0 ? [make("p", { className: "fam-fine", textContent: say("bld_new") })] : lines));
  return names;
};

let token = 0;
let names = { en: "", ja: "" };
const refresh = async () => {
  const mine = (token += 1);
  renderControls();
  remember();
  const construction = await constructionOf(unitOf().id);
  if (mine !== token) return;
  built = compose({ unit: construction, frame: state.frame, arrangement: state.arrangement, count: state.count, mirror: state.mirror }, TOOLS);
  names = await renderName(mine);
  if (mine !== token) return;
  finished = false;
  draw();
  document.querySelector("main").dataset.ready = "true";
};
const render = () => {
  sayAll();
  void refresh();
};

const change = (choice) => {
  const { kind, ...rest } = choice;
  if (kind !== undefined) state.kind = kind;
  Object.assign(state, rest);
  settle(Object.keys(rest)[0]);
  if (rest.motif !== undefined) state.kind = MOTIFS.find((one) => one.id === state.motif).kind;
  void refresh();
};

const download = (name, blob) => {
  const link = make("a", { href: URL.createObjectURL(blob), download: name });
  document.body.append(link);
  link.click();
  link.remove();
  setTimeout(() => URL.revokeObjectURL(link.href), 1000);
};

const init = () => {
  document.querySelector("main").dataset.ready = "false";
  for (const name of TABS) $(`bld-tab-${name}`).addEventListener("click", () => {
    state.tab = name;
    renderControls();
    remember();
  });
  $("bld-draw").addEventListener("click", () => {
    finished = false;
    draw();
  });
  $("bld-finished").addEventListener("click", () => {
    finished = true;
    draw();
  });
  $("bld-download").addEventListener("click", () => {
    if (built === null) return;
    // A file for drawing programs: the colour on screen written in, not currentColor, and a printed size of 100 mm.
    const color = getComputedStyle($("bld-pic")).color || "#000000";
    const svg = paint(staticSvg(built), { title: `${names.en} / ${names.ja}`, color }).replace("<svg ", '<svg width="100mm" height="100mm" ');
    download(`kamon-${[state.frame, state.motif, state.arrangement, state.count, state.mirror ? "mirrored" : ""].filter(Boolean).join("-")}.svg`, new Blob([svg], { type: "image/svg+xml" }));
  });
  render();
};
init();
