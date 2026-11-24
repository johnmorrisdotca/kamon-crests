// The demo page's own script: a catalogue of every crest found by its parts, a glossary of the parts, and a panel that draws
// a crest step by step. Everything is drawn from the package's own built files, as a page that installed it would: the
// tiles and the panel are <kamon-crest> elements, the facts are /manifest's, the search is /search's, the parts are /parts'.
// The page's words are set as text, never as HTML.
import "./dist/element-define.js";
import { crest, crestSteps } from "./dist/load.js";
import { MANIFEST, manifest } from "./dist/manifest.js";
import { ARRANGEMENTS, FRAMES, MOTIFS, TURNS, countName, term } from "./dist/parts.js";
import { stepCaption } from "./dist/animate.js";
import { facets, findCrests } from "./dist/search.js";
import { WORDS } from "./words.js";

const $ = (id) => document.getElementById(id);
const language = familyLanguage({ id: "kamon-crests", words: WORDS, onChange: () => render() });
const say = (key, values) => {
  const word = WORDS[language.lang][key] ?? WORDS.en[key] ?? key;
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
const KINDS = ["plant", "animal", "object", "shape", "sky"];
const FRAME_CHOICES = ["all", "none", "ring", "hexagon", "mokko"];
const reduced = matchMedia("(prefers-reduced-motion: reduce)");

const asked = new URLSearchParams(location.search);
const pick = (value, allowed, fallback) => (allowed.includes(value) ? value : fallback);
const state = {
  tab: pick(asked.get("tab"), ["catalogue", "parts"], "catalogue"),
  query: (asked.get("q") ?? "").slice(0, 80),
  frame: pick(asked.get("frame"), FRAME_CHOICES, "all"),
  kind: pick(asked.get("kind"), ["all", ...KINDS], "all"),
  motif: asked.get("motif") ?? "all",
  count: asked.get("count") ?? "any",
  arrangement: asked.get("arr") ?? "any",
  used: asked.get("used") === "1",
  group: pick(asked.get("group"), ["frame", ...KINDS, "arrangement", "turn"], "plant"),
  open: asked.get("open"),
};
const remember = () => {
  const query = new URLSearchParams(location.search);
  const put = (key, value, plain) => (value === plain || value === "" || value === null || value === false ? query.delete(key) : query.set(key, value === true ? "1" : value));
  put("tab", state.tab, "catalogue");
  put("q", state.query, "");
  put("frame", state.frame, "all");
  put("kind", state.kind, "all");
  put("motif", state.motif, "all");
  put("count", state.count, "any");
  put("arr", state.arrangement, "any");
  put("used", state.used, false);
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

const sayAll = () => {
  for (const node of document.querySelectorAll("[data-say]")) node.textContent = say(node.dataset.say);
  for (const node of document.querySelectorAll("[data-say-label]")) node.setAttribute("aria-label", say(node.dataset.sayLabel));
  for (const node of document.querySelectorAll("[data-say-placeholder]")) node.setAttribute("placeholder", say(node.dataset.sayPlaceholder));
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

const renderCatalogue = () => {
  const found = findCrests(queryOf(null));
  $("search").value = state.query;
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
  const grid = $("grid");
  const wanted = found.map((record) => record.id).join(",");
  grid.dataset.ids = wanted;
  grid.replaceChildren(
    ...found.map((record) => {
      const tile = make("button", { type: "button", className: "tile" });
      tile.dataset.testid = `tile-${record.id}`;
      tile.dataset.id = record.id;
      tile.append(make("span", { className: "pic" }, Object.assign(document.createElement("kamon-crest"), {})), make("span", { className: "label" }, make("span", { className: "name", textContent: nameOf(record) }), make("small", { textContent: ja() ? `${record.name.reading} · ${record.name.romaji}` : `${record.name.ja} · ${record.name.romaji}` })));
      const element = tile.querySelector("kamon-crest");
      element.setAttribute("crest", record.id);
      element.setAttribute("size", "88");
      element.setAttribute("loading", "eager");
      element.setAttribute("label", nameOf(record));
      tile.addEventListener("click", () => openCrest(record.id));
      return make("li", {}, tile);
    }),
  );
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
      const show = make("button", { type: "button", className: "fam-button", textContent: say("show_crests", { n }), disabled: n === 0 });
      show.addEventListener("click", () => {
        state.query = "";
        state.frame = "all";
        state.kind = "all";
        state.motif = "all";
        state.count = "any";
        state.arrangement = "any";
        state.used = false;
        if (state.group === "frame") state.frame = one.id.startsWith("ring-") ? "ring" : one.id;
        else if (state.group === "arrangement") state.arrangement = one.id;
        else if (state.group === "turn") state.query = one.en;
        else state.motif = one.id;
        state.tab = "catalogue";
        refresh();
      });
      card.append(make("span", { className: "part-ja", lang: "ja", textContent: one.ja }), make("strong", { textContent: ja() ? one.reading : one.en }), make("small", { textContent: `${ja() ? one.en : one.reading} · ${one.romaji}` }), make("p", { textContent: ja() ? one.about.ja : one.about.en }), show);

      return card;
    }),
  );
};

const refresh = () => {
  for (const tab of document.querySelectorAll("[data-tab]")) {
    const on = tab.dataset.tab === state.tab;
    tab.setAttribute("aria-selected", String(on));
    $(`${tab.dataset.tab}-panel`).hidden = !on;
  }
  remember();
  if (state.tab === "catalogue") renderCatalogue();
  else renderParts();
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
const detail = { id: null, construction: null, part: null, speed: 1, loop: false, guides: true };

const crestElement = () => $("detail-crest");
const dim = () => {
  const element = crestElement();
  const paths = [...element.querySelectorAll("svg > path")].filter((path) => !/-g\d*(\s|$)/.test(path.getAttribute("class") ?? ""));
  const record = detail.id === null ? null : manifest(detail.id);
  paths.forEach((path, i) => {
    const part = detail.construction?.shapes[i]?.part;
    path.style.opacity = detail.part === null || part === detail.part ? "" : "0.12";
  });
  for (const chip of document.querySelectorAll("#parts-row [data-part]")) chip.setAttribute("aria-pressed", String(chip.dataset.part === detail.part));
  const about = $("part-about");
  const picked = detail.part === null ? null : detail.part === "frame" ? term(record.frame) : term(detail.part);
  about.textContent = picked === null ? say("part_hint") : `${termName(picked)} ${ja() ? `（${picked.reading}）` : `(${picked.reading})`}: ${ja() ? picked.about.ja : picked.about.en}`;
};

const watch = () => {
  clearInterval(timer);
  const caption = $("caption");
  const n = detail.construction.steps.length;
  const tick = () => {
    const at = crestElement().at;
    caption.textContent = at < 0 ? say("drawing") : `${say("step_of", { n: at + 1, total: n })} · ${stepCaption(detail.construction.steps[at], detail.construction, language.lang)}`;
    caption.dataset.step = String(at + 1);
  };
  tick();
  timer = setInterval(tick, 120);
};

const playDetail = async () => {
  const element = crestElement();
  element.setAttribute("speed", String(detail.speed));
  if (detail.loop) element.setAttribute("loop", "");
  else element.removeAttribute("loop");
  if (detail.guides) element.removeAttribute("guides");
  else element.setAttribute("guides", "off");
  element.setAttribute("animate", "");
  if (reduced.matches) {
    $("caption").textContent = say("done");
    await element.play();
    dim();
    return;
  }
  watch();
  const finished = element.play();
  await element.ready;
  dim();
  await finished;
  dim();
};

const fillDetail = async (id, play = true) => {
  const record = manifest(id);
  if (record === null) return;
  detail.id = id;
  detail.part = null;
  state.open = id;
  remember();
  detail.construction = await crestSteps(id);
  $("detail-title").textContent = nameOf(record);
  $("detail-other").textContent = ja() ? `${record.name.en} · ${record.name.reading} · ${record.name.romaji}` : `${record.name.ja} · ${record.name.reading} · ${record.name.romaji}`;
  $("stats").textContent = statsText(record.stats);
  const element = crestElement();
  element.setAttribute("crest", id);
  element.setAttribute("label", nameOf(record));
  // Parts: the frame, then each motif with its count, arrangement and turn.
  const chips = [];
  const chip = (kindKey, one, part, text) => {
    const node = make("button", { type: "button", className: "fam-chip", textContent: `${say(kindKey)}: ${text ?? termName(one)}` });
    node.dataset.part = part;
    node.dataset.kind = kindKey;
    node.addEventListener("click", () => {
      detail.part = detail.part === part ? null : part;
      dim();
    });
    return node;
  };
  chips.push(chip("part_frame", term(record.frame), record.frame === "none" ? "none" : "frame"));
  for (const use of record.motifs) {
    chips.push(chip("part_motif", term(use.motif), use.motif));
    chips.push(chip("part_count", null, use.motif, `${ja() ? countName(use.count, "ja") : use.count} ×`));
    chips.push(chip("part_arrangement", term(use.arrangement), use.motif, termName(term(use.arrangement))));
    if (use.turn !== undefined) chips.push(chip("part_turn", term(use.turn), use.motif, termName(term(use.turn))));
  }
  $("parts-row").replaceChildren(...chips);
  $("construction-note").textContent = ja() ? record.construction.ja : record.construction.en;
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
  if (play) await playDetail();
  else dim();
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
    state.open = null;
    remember();
  });
  $("draw").addEventListener("click", () => void playDetail());
  crestElement().addEventListener("kamon-end", () => {
    clearInterval(timer);
    $("caption").textContent = say("done");
    $("caption").dataset.step = String(detail.construction.steps.length);
  });
  for (const name of ["kamon-play", "kamon-step"]) crestElement().addEventListener(name, watch);
  $("loop").addEventListener("click", (event) => {
    detail.loop = !detail.loop;
    event.currentTarget.setAttribute("aria-pressed", String(detail.loop));
    void playDetail();
  });
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
    const svg = await crest(detail.id, { title: nameOf(manifest(detail.id)) });
    download(`${detail.id}.svg`, new Blob([svg], { type: "image/svg+xml" }));
  });
  $("download-png").addEventListener("click", async () => {
    const size = Number($("png-size").value);
    const svg = await crest(detail.id, { color: "#1f2320", background: "#ffffff" });
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
